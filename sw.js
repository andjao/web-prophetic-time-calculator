const cacheName = 'v1';
const staticAssets = [
  './',
  './index.html',
  './index.js',
  './manifest.json',
  './sw.js',
  './css',
  './css/paper.min.css',
  './css/styles.css',
  './fonts',
  './fonts/Prophecy.otf',
  './icons',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  './img',
  './img/arrowL.svg',
  './img/arrowR.svg',
  './img/copy.svg',
  './img/en-US.svg',
  './img/es-ES.svg',
  './img/pt-BR.svg',
  './img/pt-BR.svg',
  './js',
  './js/script.js',
  './js/textsLanguage.js',
  './lang',
  './lang/en.json',
  './lang/es.json',
  './lang/pt.json',
];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
