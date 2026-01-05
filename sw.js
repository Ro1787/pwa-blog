const CACHE_NAME = 'v1_blog_cache';

// Se ejecuta al instalar: guarda lo básico en memoria
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(['./'])
          .then(() => self.skipWaiting());
      })
  );
});

// Permite que la app funcione sin internet si ya se cargó antes
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) return res;
        return fetch(e.request);
      })
  );
});
