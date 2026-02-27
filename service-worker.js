const CACHE_NAME = 'expense-tracker-v1';
const ASSETS_TO_CACHE = [
    './index.html',
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js'
];

// Install the Service Worker and Cache Files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching app assets...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Serve files from Cache when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Return cached version if found, otherwise fetch from internet
            return response || fetch(event.request);
        })
    );
});