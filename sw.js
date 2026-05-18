const CACHE_NAME = "nojom-follow-v1";
const urlsToCache = [
  "/MillionFolloweresApp-B/",
  "/MillionFolloweresApp-B/index.html",
  "https://nourddine90.github.io/MillionFolloweresApp-B/icon-192.png",
  "https://nourddine90.github.io/MillionFolloweresApp-B/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});
