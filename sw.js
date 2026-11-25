// =========================================================================
// NasInfinity AI v2.0.0 - Progressive Web App Service Worker (sw.js)
// Network-first for HTML navigation, cache-first for versioned static assets
// =========================================================================

const CACHE_NAME = 'nasinfinity-cache-v2.0.0-r4';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css?v=2.0.0',
  '/manifest.json',
  '/favicon.svg',
  '/js/periodic-table.js?v=2.0.0',
  '/js/game.js?v=2.0.0',
  '/js/nlp.js?v=2.0.0',
  '/js/code-generators.js?v=2.0.0',
  '/js/coding-tutor.js?v=2.0.0',
  '/js/code-writer.js?v=2.0.0',
  '/js/conversational-ai.js?v=2.0.0',
  '/js/document-processor.js?v=2.0.0',
  '/js/python-runner.js?v=2.0.0',
  '/js/app.js?v=2.0.0',
  '/assets/avatars/woman-3d-avatar.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
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

  // Network-first for HTML document navigation so UI updates apply immediately
  if (event.request.mode === 'navigate' || url.pathname === '/' || url.pathname === '/index.html') {
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

  // Cache-first for versioned static assets
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
