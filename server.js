// Production-ready, zero-dependency HTTP server for NasInfinity AI
const http = require('http');
const fs = require('fs');
const path = require('path');

const APP_VERSION = '1.0.0';
const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.wasm': 'application/wasm'
};

// Helper for Backend AI Chat Proxy (Zero-dependency, resilient online AI)
async function handleChatProxy({ prompt, messages = [], systemPrompt = '' }) {
  const timeoutMs = 28000;

  // Strategy 1: Pollinations POST with full conversation history
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const postRes = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          ...(Array.isArray(messages) && messages.length > 0 ? messages : [{ role: 'user', content: prompt }])
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
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    const encoded = encodeURIComponent(prompt);
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

  throw new Error('AI backend services temporarily busy');
}

const server = http.createServer((req, res) => {
  // Handle CORS preflight for all endpoints
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Max-Age': '86400'
    });
    res.end();
    return;
  }

  // API Version Endpoint
  if (req.url === '/api/version') {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({
      name: 'NasInfinity AI',
      version: APP_VERSION,
      status: 'online',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // API Chat Endpoint for robust zero-CORS online AI conversation
  if (req.url === '/api/chat') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
        if (body.length > 2e6) req.destroy(); // 2MB limit
      });
      req.on('end', async () => {
        try {
          const payload = JSON.parse(body || '{}');
          const responseText = await handleChatProxy(payload);
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ success: true, text: responseText }));
        } catch (err) {
          res.writeHead(500, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ success: false, error: err.message || 'Chat Proxy Error' }));
        }
      });
      return;
    }
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('405 Method Not Allowed');
    return;
  }

  // Only accept GET and HEAD requests for static assets
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('405 Method Not Allowed');
    return;
  }

  // Static File Serving for NasInfinity AI application
  let reqPath = req.url === '/' ? '/index.html' : req.url;
  let safePath = path.normalize(reqPath.split('?')[0]).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePath);

  // Path Traversal Security Guard
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Production Security Headers
    const headers = {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'microphone=(self)',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    };

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
      }
    });
    stream.pipe(res);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️ Port ${PORT} is already in use. If another server instance is running, open http://localhost:${PORT}`);
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(`🚀 NasInfinity AI v${APP_VERSION} Server is Running!`);
  console.log(`🌐 Local URL:         http://localhost:${PORT}`);
  console.log(`📡 Version Endpoint:  http://localhost:${PORT}/api/version`);
  console.log(`Press Ctrl+C to stop the server.`);
  console.log(`====================================================`);
});

// Graceful Shutdown
process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
