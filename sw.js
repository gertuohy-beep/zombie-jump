// Zombie Jump — Service Worker
// Caches all game files for offline play

const CACHE_NAME = 'zombie-jump-v1';
const ASSETS = [
  './',
  './play.html',
  './zombie_jump_godaddy.html',
  './manifest.json',
  './zombie_jump_images/hero_small.png',
  './zombie_jump_images/hero_splash.png',
  './zombie_jump_images/hero_run.png',
  './zombie_jump_images/hero_run2.png',
  './zombie_jump_images/hero_jump1.png',
  './zombie_jump_images/hero_jump2.png',
  './zombie_jump_images/hero_flip.png',
  './zombie_jump_images/fall1.png',
  './zombie_jump_images/fall2.png',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
];

// Install: cache everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
