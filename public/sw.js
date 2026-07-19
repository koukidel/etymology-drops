// Minimal offline support: precache the shell + the judging lexicon, serve
// cache-first for static assets, network-first for pages.
const CACHE = "minamoto-v1";
const PRECACHE = ["/", "/lexicon/words.txt", "/manifest.json", "/icon-192.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;

  // Static assets + the lexicon: cache-first (immutable between deploys).
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/lexicon/") || url.pathname.match(/\.(png|svg|ico)$/)) {
    e.respondWith(
      caches.match(e.request).then((hit) =>
        hit ?? fetch(e.request).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
      )
    );
    return;
  }

  // Pages: network-first with cache fallback (so offline reopening works).
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request).then((hit) => hit ?? caches.match("/")))
  );
});
