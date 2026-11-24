// =========================================================================
// NasInfinity AI v1.2.0 - Progressive Web App Service Worker (sw.js)
// Cache-first strategy for instant offline loading of studios & games
// =========================================================================

const CACHE_NAME = 'nasinfinity-cache-v1.2.0';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/js/periodic-table.js?v=1.2.0',
  '/js/game.js?v=1.2.0',
  '/js/nlp.js?v=1.2.0',
  '/js/code-generators.js?v=1.2.0',
  '/js/coding-tutor.js?v=1.2.0',
  '/js/code-writer.js?v=1.2.0',
  '/js/conversational-ai.js?v=1.2.0',
  '/js/document-processor.js?v=1.2.0',
  '/js/python-runner.js?v=1.2.0',
  '/js/app.js?v=1.2.0',
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

  // Network-first for dynamic AI APIs
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ error: 'Offline: API unavailable' }), {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // Cache-first for all static assets
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
