// Kleines Hintergrund-Skript: macht die Seite als App installierbar und nimmt „Teilen → Stammbaum“ entgegen.
// Immer zuerst aus dem Internet laden (damit Änderungen sofort ankommen), nur ohne Netz die gespeicherte Version.
const CACHE = 'stammbaum-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Geteilte Inhalte (Text, Link oder Bild) annehmen und an die App weiterreichen
  if (e.request.method === 'POST' && url.pathname.endsWith('/share-target')) {
    e.respondWith((async () => {
      const form = await e.request.formData();
      const q = new URLSearchParams();
      ['share_title', 'share_text', 'share_url'].forEach(k => { const v = form.get(k); if (v) q.set(k, v); });
      const file = form.get('image');
      if (file && file.size) {
        const c = await caches.open('stammbaum-share');
        await c.put(new URL('shared-image', self.registration.scope).href, new Response(file, { headers: { 'content-type': file.type || 'image/jpeg' } }));
        q.set('share_image', '1');
      }
      return Response.redirect(new URL('./?' + q.toString(), self.registration.scope).href, 303);
    })());
    return;
  }
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
