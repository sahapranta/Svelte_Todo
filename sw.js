let CACHE_NAME = "cache_" + new Date().toLocaleDateString();
let urlsToCache = [
  "/",
  "/index.html",
  "/todo.png",
  "/manifest.json",
  "/global.css",
  "/bundle.css",
  "/bundle.css.map",
  "/bundle.js",
  "/bundle.js.map"
];
self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return Promise.all(
          urlsToCache.map(url => {
            return cache.add(url).catch(err => {
              console.error(`Error caching ${url}: ${err.message}`);
            });
          })
        );
      })
      .catch(err => {
        console.error(err.stack);
      })
      .then(() => {
        console.log(`cached ${urlsToCache.length} urls`);
        self.skipWaiting();
      })
  );
});

self.addEventListener("activate", event => {
  //   console.log("activating service worker");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      ).then(() => self.clients.claim());
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.open("mysite-dynamic").then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return (
          response ||
          fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          })
        );
      });
    })
  );
});
