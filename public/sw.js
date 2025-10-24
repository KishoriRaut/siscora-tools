const CACHE_NAME = 'siscora-tools-v1';
const urlsToCache = [
  '/',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/tools/email-signature',
  '/tools/base64-encoder',
  '/tools/calculator',
  '/tools/color-picker',
  '/tools/hash-generator',
  '/tools/password-generator',
  '/tools/qr-generator',
  '/tools/image-converter',
  '/tools/json-formatter',
  '/tools/text-case-converter',
  '/tools/unit-converter',
  '/tools/uuid-generator',
  '/tools/url-shortener',
  '/tools/text-counter',
  '/tools/text-diff-checker',
  '/tools/text-binary-converter',
  '/tools/string-length-calculator',
  '/tools/password-strength-checker',
  '/tools/percentage-calculator',
  '/tools/percentage-to-gpa',
  '/tools/gpa-to-percentage',
  '/tools/lorem-ipsum-generator',
  '/tools/html-encoder-decoder',
  '/tools/jwt-decoder',
  '/tools/color-palette-generator',
  '/tools/css-gradient-generator',
  '/manifest.json',
  '/icon-192x192.svg',
  '/icon-512x512.svg'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
