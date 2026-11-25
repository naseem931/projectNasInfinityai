// Production-ready, zero-dependency HTTP server for NasInfinity AI v2.0.0
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const APP_VERSION = '2.0.0';
const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'development';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX, 10) || 30;
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 60000;
const MAX_CHAT_BODY_BYTES = 2 * 1024 * 1024; // 2 MB
const ROOT_DIR = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.wasm': 'application/wasm'
};

const COMPRESSIBLE_EXTS = new Set(['.html', '.js', '.css', '.json', '.webmanifest', '.txt', '.svg']);

const BLOCKED_EXACT = new Set([
  '/server.js',
  '/package.json',
  '/package-lock.json',
  '/dockerfile'
]);

const BLOCKED_PREFIXES = ['/tests', '/scratch', '/node_modules'];

function isBlockedPath(pathname) {
  const lower = pathname.toLowerCase();
  // Block any hidden dotfiles / dot-directories (e.g. /.git, /.env, /.gitignore)
  if (lower.split('/').some(seg => seg.startsWith('.'))) return true;
  if (BLOCKED_EXACT.has(lower)) return true;
  return BLOCKED_PREFIXES.some(prefix => lower === prefix || lower.startsWith(prefix + '/'));
}

// Lightweight in-memory sliding-window rate limiter (zero dependencies)
const rateLimitStore = new Map();

function checkRateLimit(clientIp) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (rateLimitStore.get(clientIp) || []).filter(ts => ts > windowStart);

  if (timestamps.length >= RATE_LIMIT_MAX) {
    const oldest = timestamps[0];
    const retryAfterSec = Math.max(1, Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000));
    rateLimitStore.set(clientIp, timestamps);
    return { allowed: false, retryAfterSec };
  }

  timestamps.push(now);
  rateLimitStore.set(clientIp, timestamps);
  return { allowed: true, retryAfterSec: 0 };
}

// Periodic cleanup of stale rate-limit entries to prevent unbounded memory growth
const cleanupTimer = setInterval(() => {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS;
  for (const [ip, timestamps] of rateLimitStore.entries()) {
    const active = timestamps.filter(ts => ts > cutoff);
    if (active.length === 0) rateLimitStore.delete(ip);
    else rateLimitStore.set(ip, active);
  }
}, RATE_LIMIT_WINDOW_MS);
cleanupTimer.unref();

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function buildSecurityHeaders(req, extraHeaders = {}) {
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://www.gstatic.com https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://text.pollinations.ai https://generativelanguage.googleapis.com https://api.openai.com https://en.wikipedia.org https://cdn.jsdelivr.net",
    "worker-src 'self' blob:",
    "frame-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'self'"
  ].join('; ');

  const headers = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '0',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'microphone=(self)',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Content-Security-Policy': csp,
    ...extraHeaders
  };

  if (req.headers['x-forwarded-proto'] === 'https') {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains';
  }

  return headers;
}

function sendJson(req, res, statusCode, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, buildSecurityHeaders(req, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Cache-Control': 'no-store',
    ...extraHeaders
  }));
  res.end(body);
}

// Helper for Backend AI Chat Proxy (Zero-dependency, resilient online AI)
async function handleChatProxy({ prompt = '', messages = [], systemPrompt = '' }) {
  const timeoutMs = 28000;
  const safePrompt = typeof prompt === 'string' ? prompt.slice(0, 32000) : '';
  const safeSystem = typeof systemPrompt === 'string' ? systemPrompt.slice(0, 8000) : '';
  const safeMessages = Array.isArray(messages)
    ? messages
        .slice(-30)
        .filter(m => m && typeof m.role === 'string' && typeof m.content === 'string')
        .map(m => ({ role: m.role, content: m.content.slice(0, 32000) }))
    : [];

  if (!safePrompt && safeMessages.length === 0) {
    throw new Error('Prompt or messages required');
  }

  // Strategy 1: Pollinations POST with full conversation history
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const postRes = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          ...(safeSystem ? [{ role: 'system', content: safeSystem }] : []),
          ...(safeMessages.length > 0 ? safeMessages : [{ role: 'user', content: safePrompt }])
        ],
        seed: Math.floor(Math.random() * 1000000)
      }),
      signal: controller.signal
    });
    clearTimeout(timer);
    if (postRes.ok) {
      const text = await postRes.text();
      if (text && text.trim().length > 0 && !text.includes('Free limit reached')) {
        return text.trim();
      }
    }
  } catch (e) {
    // Fall through to Strategy 2
  }

  // Strategy 2: Direct GET prompt fallback
  if (safePrompt) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 20000);
      const encoded = encodeURIComponent(safePrompt);
      const getRes = await fetch(`https://text.pollinations.ai/${encoded}?seed=${Math.floor(Math.random() * 100000)}`, {
        signal: controller.signal
      });
      clearTimeout(timer);
      if (getRes.ok) {
        const text = await getRes.text();
        if (text && text.trim().length > 0 && !text.includes('Free limit reached')) {
          return text.trim();
        }
      }
    } catch (e) {
      // Fall through
    }
  }

  throw new Error('AI backend services temporarily busy');
}

const server = http.createServer((req, res) => {
  let parsedUrl;
  try {
    parsedUrl = new URL(req.url, 'http://localhost');
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request');
    return;
  }

  const pathname = parsedUrl.pathname;

  // Handle CORS preflight for all endpoints
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    });
    res.end();
    return;
  }

  // Readiness & Health Probe Endpoint
  if (pathname === '/api/health' || pathname === '/health') {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('405 Method Not Allowed');
      return;
    }
    const mem = process.memoryUsage();
    const healthPayload = {
      status: 'ok',
      name: 'NasInfinity AI',
      version: APP_VERSION,
      environment: NODE_ENV,
      uptimeSeconds: Math.round(process.uptime()),
      memoryRssMB: Math.round((mem.rss / (1024 * 1024)) * 10) / 10,
      nodeVersion: process.version,
      timestamp: new Date().toISOString()
    };
    if (req.method === 'HEAD') {
      res.writeHead(200, buildSecurityHeaders(req, { 'Content-Type': 'application/json; charset=utf-8' }));
      res.end();
      return;
    }
    sendJson(req, res, 200, healthPayload);
    return;
  }

  // API Version Endpoint
  if (pathname === '/api/version') {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('405 Method Not Allowed');
      return;
    }
    sendJson(req, res, 200, {
      name: 'NasInfinity AI',
      version: APP_VERSION,
      status: 'online',
      timestamp: new Date().toISOString()
    });
    return;
  }

  // API Chat Endpoint with Rate Limiting & Payload Guards
  if (pathname === '/api/chat') {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('405 Method Not Allowed');
      return;
    }

    const clientIp = getClientIp(req);
    const rate = checkRateLimit(clientIp);
    if (!rate.allowed) {
      sendJson(req, res, 429, {
        success: false,
        error: 'Rate limit exceeded. Please wait before sending more requests.'
      }, { 'Retry-After': String(rate.retryAfterSec) });
      return;
    }

    const chunks = [];
    let totalBytes = 0;
    let payloadTooLarge = false;

    req.on('data', chunk => {
      if (payloadTooLarge) return;
      totalBytes += chunk.length;
      if (totalBytes > MAX_CHAT_BODY_BYTES) {
        payloadTooLarge = true;
        sendJson(req, res, 413, { success: false, error: 'Payload Too Large (max 2MB)' });
        req.resume();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', async () => {
      if (payloadTooLarge) return;

      let payload;
      try {
        const rawBody = Buffer.concat(chunks).toString('utf8');
        payload = JSON.parse(rawBody || '{}');
      } catch (parseErr) {
        sendJson(req, res, 400, { success: false, error: 'Invalid JSON request body' });
        return;
      }

      if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
        sendJson(req, res, 400, { success: false, error: 'Request body must be a JSON object' });
        return;
      }

      try {
        const responseText = await handleChatProxy(payload);
        sendJson(req, res, 200, { success: true, text: responseText });
      } catch (err) {
        const status = err.message === 'Prompt or messages required' ? 400 : 502;
        sendJson(req, res, status, { success: false, error: err.message || 'Chat Proxy Error' });
      }
    });
    return;
  }

  // Only accept GET and HEAD requests for static assets
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('405 Method Not Allowed');
    return;
  }

  // Decode URL pathname safely
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request');
    return;
  }

  const targetPath = decodedPath === '/' ? '/index.html' : decodedPath;

  // Reject path traversal & sensitive/internal files
  if (targetPath.includes('..') || isBlockedPath(targetPath)) {
    res.writeHead(403, buildSecurityHeaders(req, { 'Content-Type': 'text/plain; charset=utf-8' }));
    res.end('403 Forbidden');
    return;
  }

  const normalizedRel = path.normalize(targetPath).replace(/^([/\\])+/, '');
  const filePath = path.resolve(ROOT_DIR, normalizedRel);

  if (filePath !== ROOT_DIR && !filePath.startsWith(ROOT_DIR + path.sep)) {
    res.writeHead(403, buildSecurityHeaders(req, { 'Content-Type': 'text/plain; charset=utf-8' }));
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, buildSecurityHeaders(req, { 'Content-Type': 'text/plain; charset=utf-8' }));
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const etag = `W/"${stats.size.toString(16)}-${Math.floor(stats.mtimeMs).toString(16)}"`;

    // Tiered caching: HTML & Service Worker revalidate; versioned assets & media cache cleanly
    const isHtmlOrSw = ext === '.html' || path.basename(filePath) === 'sw.js';
    const hasVersionQuery = parsedUrl.searchParams.has('v');
    const cacheControl = isHtmlOrSw
      ? 'no-cache, must-revalidate'
      : (hasVersionQuery ? 'public, max-age=86400, stale-while-revalidate=3600' : 'public, max-age=3600');

    const headers = buildSecurityHeaders(req, {
      'Content-Type': contentType,
      'ETag': etag,
      'Cache-Control': cacheControl,
      'Vary': 'Accept-Encoding'
    });

    // Honor conditional ETag validation
    const ifNoneMatch = req.headers['if-none-match'];
    if (ifNoneMatch && ifNoneMatch === etag) {
      res.writeHead(304, headers);
      res.end();
      return;
    }

    const acceptEncoding = String(req.headers['accept-encoding'] || '');
    const shouldGzip = COMPRESSIBLE_EXTS.has(ext) && stats.size >= 1024 && /\bgzip\b/i.test(acceptEncoding);

    if (shouldGzip) {
      headers['Content-Encoding'] = 'gzip';
    } else {
      headers['Content-Length'] = stats.size;
    }

    res.writeHead(200, headers);

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Internal Server Error');
      } else {
        res.destroy();
      }
    });

    if (shouldGzip) {
      const gzip = zlib.createGzip({ level: zlib.constants.Z_DEFAULT_COMPRESSION });
      gzip.on('error', () => res.destroy());
      stream.pipe(gzip).pipe(res);
    } else {
      stream.pipe(res);
    }
  });
});

// Production Socket & Timeout Tuning
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;
server.requestTimeout = 35000;

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️ Port ${PORT} is already in use. Open http://localhost:${PORT}`);
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(`🚀 NasInfinity AI v${APP_VERSION} Server (${NODE_ENV}) Running!`);
  console.log(`🌐 Local URL:         http://localhost:${PORT}`);
  console.log(`❤️ Health Endpoint:   http://localhost:${PORT}/api/health`);
  console.log(`📡 Version Endpoint:  http://localhost:${PORT}/api/version`);
  console.log(`Press Ctrl+C to stop the server.`);
  console.log(`====================================================`);
});

function gracefulShutdown(signal) {
  console.log(`\nReceived ${signal}. Closing server gracefully...`);
  server.close(() => {
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 5000).unref();
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
