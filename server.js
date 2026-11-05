// Production-ready, zero-dependency HTTP server with Disk Model Cache for NasInfinity AI
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Persistent Local Disk Cache Directory for In-Browser WebGPU Models
// Survives Incognito window closes and eliminates repeated model downloads.
const MODEL_CACHE_DIR = path.join(__dirname, '.model_cache');
if (!fs.existsSync(MODEL_CACHE_DIR)) {
  try {
    fs.mkdirSync(MODEL_CACHE_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to initialize model cache directory:', err);
  }
}

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
  '.wasm': 'application/wasm',
  '.bin': 'application/octet-stream',
  '.model': 'application/octet-stream'
};

// In-flight download tracker to avoid redundant parallel downloads
const inFlightDownloads = new Map();

/**
 * Downloads a resource from an upstream URL, following redirects,
 * and writes it to a temporary file before atomically renaming to target destination.
 */
function fetchWithRedirects(url, dest, callback, maxRedirects = 5) {
  if (maxRedirects <= 0) {
    return callback(new Error('Exceeded maximum redirect limit'));
  }

  const client = url.startsWith('https:') ? https : http;
  const req = client.get(
    url,
    {
      headers: {
        'User-Agent': 'NasInfinity-AI-Model-Cache/1.0',
        'Accept': '*/*'
      }
    },
    (res) => {
      // Follow HTTP 3xx redirects (Hugging Face CDN uses 302 redirects)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const nextUrl = new URL(res.headers.location, url).href;
        return fetchWithRedirects(nextUrl, dest, callback, maxRedirects - 1);
      }

      if (res.statusCode !== 200) {
        return callback(new Error(`Upstream returned HTTP ${res.statusCode}`));
      }

      const dir = path.dirname(dest);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const tempFile = dest + '.part-' + Date.now();
      const writeStream = fs.createWriteStream(tempFile);

      res.pipe(writeStream);

      writeStream.on('finish', () => {
        writeStream.close(() => {
          try {
            fs.renameSync(tempFile, dest);
            callback(null);
          } catch (renameErr) {
            try { if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile); } catch (e) {}
            callback(renameErr);
          }
        });
      });

      writeStream.on('error', (err) => {
        try { if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile); } catch (e) {}
        callback(err);
      });
    }
  );

  req.on('error', (err) => {
    callback(err);
  });
}

/**
 * Serves a locally cached file with HTTP Range support and CORS headers.
 */
function serveCachedFile(req, res, filePath, cacheStatus) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (!res.headersSent) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
      }
      return;
    }

    const totalSize = stats.size;
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const baseHeaders = {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Accept-Ranges': 'bytes',
      'X-Cache-Status': cacheStatus,
      'Cache-Control': 'public, max-age=31536000, immutable'
    };

    const rangeHeader = req.headers.range;
    if (rangeHeader) {
      const parts = rangeHeader.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

      if (isNaN(start) || start >= totalSize || end >= totalSize || start > end) {
        res.writeHead(416, {
          ...baseHeaders,
          'Content-Range': `bytes */${totalSize}`
        });
        res.end();
        return;
      }

      res.writeHead(206, {
        ...baseHeaders,
        'Content-Range': `bytes ${start}-${end}/${totalSize}`,
        'Content-Length': (end - start) + 1
      });

      if (req.method === 'HEAD') {
        res.end();
        return;
      }

      const stream = fs.createReadStream(filePath, { start, end });
      stream.on('error', () => {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('500 Internal Server Error');
        }
      });
      stream.pipe(res);
    } else {
      res.writeHead(200, {
        ...baseHeaders,
        'Content-Length': totalSize
      });

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
    }
  });
}

/**
 * Handles fetching, caching, and serving model weights and binary files.
 */
function handleModelProxy(req, res, targetUrl, localDest) {
  // Check if file is already on local disk
  if (fs.existsSync(localDest)) {
    return serveCachedFile(req, res, localDest, 'HIT_LOCAL_DISK');
  }

  // If another request is currently fetching this exact file, await it
  if (inFlightDownloads.has(localDest)) {
    inFlightDownloads.get(localDest).then(
      () => serveCachedFile(req, res, localDest, 'HIT_CONCURRENT_CACHE'),
      (err) => {
        if (!res.headersSent) {
          res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Upstream download failed: ' + err.message);
        }
      }
    );
    return;
  }

  console.log(`[Model Cache] ⏳ First-time download: ${path.basename(localDest)} -> caching to host disk...`);

  // Start fresh download
  const downloadPromise = new Promise((resolve, reject) => {
    fetchWithRedirects(targetUrl, localDest, (err) => {
      inFlightDownloads.delete(localDest);
      if (err) {
        console.error(`[Model Cache] ❌ Download failed for ${path.basename(localDest)}:`, err.message);
        reject(err);
      } else {
        console.log(`[Model Cache] ✅ Cached to host disk: ${path.basename(localDest)}`);
        resolve();
      }
    });
  });

  inFlightDownloads.set(localDest, downloadPromise);

  downloadPromise.then(
    () => {
      serveCachedFile(req, res, localDest, 'MISS_FETCHED_AND_CACHED');
    },
    (err) => {
      if (!res.headersSent) {
        res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Upstream fetch failed: ' + err.message);
      }
    }
  );
}

/**
 * Returns diagnostic statistics of models currently saved on disk.
 */
function getModelCacheStats() {
  const result = { totalBytes: 0, models: [] };
  if (!fs.existsSync(MODEL_CACHE_DIR)) return result;

  const entries = fs.readdirSync(MODEL_CACHE_DIR, { withFileTypes: true });
  for (const entry of entries) {
    const itemPath = path.join(MODEL_CACHE_DIR, entry.name);
    if (entry.isDirectory()) {
      const files = [];
      let modelSize = 0;
      function scanDir(dir, prefix = '') {
        try {
          const items = fs.readdirSync(dir, { withFileTypes: true });
          for (const it of items) {
            const fullP = path.join(dir, it.name);
            if (it.isDirectory()) {
              scanDir(fullP, prefix ? `${prefix}/${it.name}` : it.name);
            } else if (it.isFile() && !it.name.includes('.part-')) {
              const sz = fs.statSync(fullP).size;
              modelSize += sz;
              files.push({ name: prefix ? `${prefix}/${it.name}` : it.name, size: sz });
            }
          }
        } catch (e) {}
      }
      scanDir(itemPath);
      result.models.push({
        name: entry.name,
        fileCount: files.length,
        totalBytes: modelSize,
        files
      });
      result.totalBytes += modelSize;
    } else if (entry.isFile() && !entry.name.includes('.part-')) {
      const sz = fs.statSync(itemPath).size;
      result.totalBytes += sz;
      result.models.push({
        name: entry.name,
        fileCount: 1,
        totalBytes: sz,
        files: [{ name: entry.name, size: sz }]
      });
    }
  }
  return result;
}

const server = http.createServer((req, res) => {
  // Handle CORS preflight for all endpoints
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Max-Age': '86400'
    });
    res.end();
    return;
  }

  // Only accept GET and HEAD requests
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('405 Method Not Allowed');
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Diagnostic Endpoint: Model Cache Status
  if (pathname === '/api/model-cache/status') {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(getModelCacheStats(), null, 2));
    return;
  }

  // Route: /api/launch-webgpu-browser -> 1-Click Launch Edge with WebGPU override
  if (pathname === '/api/launch-webgpu-browser') {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    try {
      const { exec } = require('child_process');
      const edgePaths = [
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      ];
      let chosen = 'msedge.exe';
      for (const p of edgePaths) {
        if (fs.existsSync(p)) { chosen = p; break; }
      }
      const cmd = `start "" "${chosen}" --enable-unsafe-webgpu http://localhost:${PORT}`;
      exec(cmd, (err) => {
        if (err) console.error('Failed to launch browser with WebGPU:', err);
      });
      res.end(JSON.stringify({ success: true, message: 'Browser launched with WebGPU override' }));
    } catch (e) {
      res.end(JSON.stringify({ success: false, error: e.message }));
    }
    return;
  }

  // Route: /models/web-llm.esm.js -> Cache standalone ESM runtime
  if (pathname === '/models/web-llm.esm.js') {
    const localDest = path.join(MODEL_CACHE_DIR, 'web-llm.esm.js');
    const upstreamUrl = 'https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.73/+esm';
    handleModelProxy(req, res, upstreamUrl, localDest);
    return;
  }

  // Route: /models/wasm/:wasmFile -> Cache WASM binaries from MLC GitHub repository
  if (pathname.startsWith('/models/wasm/')) {
    const wasmFile = pathname.slice('/models/wasm/'.length);
    if (!wasmFile || wasmFile.includes('..') || wasmFile.includes('/') || wasmFile.includes('\\')) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('400 Bad Request: Invalid wasm filename');
      return;
    }

    const localDest = path.join(MODEL_CACHE_DIR, 'wasm', wasmFile);
    let upstreamUrl = parsedUrl.searchParams.get('src');
    if (!upstreamUrl) {
      upstreamUrl = `https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_48/${wasmFile}`;
    }
    handleModelProxy(req, res, upstreamUrl, localDest);
    return;
  }

  // Route: /models/:modelId/... -> Cache model weights, shards, and configs from Hugging Face
  if (pathname.startsWith('/models/')) {
    const rest = pathname.slice('/models/'.length);
    const parts = rest.split('/').filter(Boolean);
    if (parts.length === 0) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('400 Bad Request: Model ID required');
      return;
    }

    const modelId = parts[0];
    let fileParts = parts.slice(1);
    // Strip redundant resolve/main if present in path
    if (fileParts.length >= 2 && fileParts[0] === 'resolve' && fileParts[1] === 'main') {
      fileParts = fileParts.slice(2);
    }

    if (fileParts.length === 0) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('400 Bad Request: File path required');
      return;
    }

    // Path traversal guard
    for (const part of fileParts) {
      if (part === '..' || part.includes('/') || part.includes('\\')) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('403 Forbidden');
        return;
      }
    }

    const relFilePath = fileParts.join('/');
    const localDest = path.join(MODEL_CACHE_DIR, modelId, ...fileParts);

    // Double-check path traversal bounds
    if (!localDest.startsWith(MODEL_CACHE_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('403 Forbidden');
      return;
    }

    const upstreamUrl = `https://huggingface.co/mlc-ai/${modelId}/resolve/main/${relFilePath}`;
    handleModelProxy(req, res, upstreamUrl, localDest);
    return;
  }

  // Default: Static File Serving for NasInfinity AI application
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
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
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
  console.log(`🚀 NasInfinity AI Server is Running!`);
  console.log(`🌐 Local URL:         http://localhost:${PORT}`);
  console.log(`💾 Host Disk Cache:   ${MODEL_CACHE_DIR}`);
  console.log(`🔒 Incognito Cache:   Active (0 redownloads on window close)`);
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
