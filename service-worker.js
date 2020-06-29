const CACHE_NAME = "SurabayTours v-1.1.2";
var urlsToCache = [
    "/",
    "/index.html",
    "/assets/templates/nav.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/tours.html",
    "/assets/css/materialize.min.css",
    "/assets/css/style.css",
    "/assets/icons/fontawesome/css/all.min.css",
    "/assets/icons/fontawesome/webfonts/fa-solid-900.woff2",
    "/assets/css/responsive.css",
    "/assets/js/materialize.min.js",
    "/assets/js/nav.js",
    "/assets/image/hutan-bambu.jpg",
    "/assets/image/jembatan-suramadu.jpg",
    "/assets/image/jumbotron-img.jpg",
    "/assets/image/kebun-bibit.png",
    "/assets/image/kebun-binatang-surabaya.jpg",
    "/assets/image/tugu-pahlawan.jpg"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});