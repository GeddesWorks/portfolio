'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"manifest.json": "2d6ed8bfa2da031bccf871fdd0dd67cc",
"favicon.png": "6cdcdabd3b6c3e9f256a8263b3a24318",
"index.html": "47ce38f15562587db8fd542a29d752eb",
"/": "47ce38f15562587db8fd542a29d752eb",
"main.dart.js": "c9489940249e8c178848098cf6c40a90",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.json": "0e77bd287957ea83b8d79b70a524e510",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/AssetManifest.bin": "c4a7b66d4dcd592dd25a5fef6f6f908d",
"assets/assets/Resume-12-23-web.pdf": "11d1b6ecf72f12bfc1e34af017bc0737",
"assets/images/linked.png": "1b18d461ce75c75fdb4d7b6ec08b3e65",
"assets/images/GeddesWorksCutout.png": "8cdb080e49c4de813cfc7455ebdc42a9",
"assets/images/PayPal.png": "e67480531490f08ca3e7d021d188bdff",
"assets/images/welcomeImages/5.jpeg": "cbcd17e2ac16dc37004c7677c0be6b45",
"assets/images/welcomeImages/1.jpeg": "327f2a2b878a64b12afd07dae7e220ce",
"assets/images/welcomeImages/4.jpeg": "f37fc1b7c8cfa9c2f1525d61ec2798da",
"assets/images/welcomeImages/2.jpeg": "ebf4b4b6d7314304ebcda45aa5603aca",
"assets/images/welcomeImages/3.jpeg": "4561a3eee4802221a3c4ac67d1c44ecc",
"assets/images/cults.png": "1ceeff7c4da4f7eb55d9fc1486b726f8",
"assets/images/Youtube.png": "684cf6d1551d4f000503e049963b1453",
"assets/images/YouTube_dark_logo_(2017).png": "59bd27bfebaf8c9f4533420888314941",
"assets/images/cash-app-logo-512x512.png": "31d037a802d0978aac0052d313a8aa56",
"assets/images/authorizedsellerbadge.png": "55ead554583079dbfacc44fdfb1b79f6",
"assets/images/3dPrinter.png": "2935721c1173d1d451ab76fffb73b2e5",
"assets/images/accentBanner1.png": "1e454ef2199a4658b5bce5202835c29f",
"assets/images/github-mark.png": "43ce87609eb221d09d4832a9c0e709d0",
"assets/images/GeddesWorks.png": "c026d4c762393870695977cfbaad934a",
"assets/images/venmo-logo-1024x269.webp": "46d83ad17e93ea094652d3eddc937641",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/fonts/MaterialIcons-Regular.otf": "40056e38e90db66cf6805be5682186fd",
"assets/NOTICES": "82b94fd7485632d14ce6fb57c3bac356",
"assets/AssetManifest.bin.json": "80dcb9b4558a738c663515f22c23db1d",
"version.json": "1a6bb4b9d97f356f1d95ab549c3bb621",
"canvaskit/skwasm.js.symbols": "c37c57bf1a5a958e3144da7df44254b0",
"canvaskit/canvaskit.wasm": "2db534eaad9e980f5028f0bcb8c54756",
"canvaskit/skwasm.wasm": "883abde2920007bba715d8ff470ccf8c",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/chromium/canvaskit.wasm": "d44c5e0a275d8cb84acff28ef31fa06a",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.js.symbols": "0b594584ac3722580082cd02b6da9033",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.js.symbols": "77cdc19fcc63a442fb89bc32e8a6c886",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"icons/Icon-512.png": "badd3a7046cf6dbbccd1424587df14ef",
"icons/Icon-maskable-512.png": "badd3a7046cf6dbbccd1424587df14ef",
"icons/Icon-192.png": "a88d6a50f9fea94ae03dc0cb1a9303b7",
"icons/Icon-maskable-192.png": "a88d6a50f9fea94ae03dc0cb1a9303b7",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
