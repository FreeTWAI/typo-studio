/* TYPO STUDIO service worker — network-first with cache fallback.
   Always serves fresh code when online; keeps the app usable offline. */
const CACHE = "typo-studio-v2.2.0";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./vendor/react.min.js",
  "./vendor/react-dom.min.js",
  "./vendor/app.compiled.js",
  "./assets/icon.png",
  "./assets/icon-mac.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // Google Fonts etc. go straight to network
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() =>
        caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match("./index.html"))
      )
  );
});
