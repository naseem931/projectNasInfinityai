// =========================================================================
// NasInfinity AI v2.0.0 - Progressive Web App Service Worker (sw.js)
// Network-first with ETag revalidation when online, cache fallback offline
// =========================================================================

const CACHE_NAME = 'nasinfinity-cache-v2.0.0-r6';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css?v=2.0.0&rev=6',
  '/manifest.json',
  '/favicon.svg',
  '/js/periodic-table.js?v=2.0.0&rev=6',
  '/js/game.js?v=2.0.0&rev=6',
  '/js/nlp.js?v=2.0.0&rev=6',
  '/js/code-generators.js?v=2.0.0&rev=6',
  '/js/coding-tutor.js?v=2.0.0&rev=6',
  '/js/code-writer.js?v=2.0.0&rev=6',
  '/js/conversational-ai.js?v=2.0.0&rev=6',
  '/js/document-processor.js?v=2.0.0&rev=6',
  '/js/python-runner.js?v=2.0.0&rev=6',
  '/js/app.js?v=2.0.0&rev=6',
  '/assets/avatars/woman-3d-avatar.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.all(
        STATIC_ASSETS.map(async (assetUrl) => {
          try {
            const req = new Request(assetUrl, { cache: 'reload' });
            const res = await fetch(req);
            if (res && res.ok) await cache.put(assetUrl, res);
          } catch (e) {}
        })
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Let browser handle non-GET (POST streaming, etc.) and cross-origin requests natively
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Network-first for dynamic AI & health APIs
  if (url.pathname.startsWith('/api/') || url.pathname === '/health') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ error: 'Offline: API unavailable' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // Network-first for HTML, JS & CSS so updates take effect immediately while staying offline-ready
  if (
    event.request.mode === 'navigate' ||
    url.pathname === '/' ||
    url.pathname === '/index.html' ||
    url.pathname.startsWith('/js/') ||
    url.pathname.endsWith('.css')
  ) {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for static media & icons
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});
