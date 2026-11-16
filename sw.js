// Kleines Hintergrund-Skript: macht die Seite als App installierbar (nötig für „Teilen → Stammbaum“).
// Immer zuerst aus dem Internet laden (damit Änderungen sofort ankommen), nur ohne Netz die gespeicherte Version.
const CACHE = 'stammbaum-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
