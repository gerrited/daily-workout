self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('workout-cache-v1').then((cache) => {
        return cache.addAll([
          '/',
          '/styles.css',
          '/logo.png',
          '/manifest.json',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  