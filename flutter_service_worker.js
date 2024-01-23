'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"manifest.json": "2d6ed8bfa2da031bccf871fdd0dd67cc",
"index.html": "b062ea1c548db1a7a50ff5fa0754e45c",
"/": "b062ea1c548db1a7a50ff5fa0754e45c",
"assets/AssetManifest.bin": "0fe78678591527f4402f3d8a823e914a",
"assets/images/cults.png": "1ceeff7c4da4f7eb55d9fc1486b726f8",
"assets/images/EtsyDark.png": "985fefae31b98f3be4b1515a72f2f1dc",
"assets/images/bambu.png": "a99dd81c056447206db8b26c6631279c",
"assets/images/YouTube_dark_logo_(2017).png": "59bd27bfebaf8c9f4533420888314941",
"assets/images/3dPrinter.png": "c8ddeab066563ca49c9de71b4de7594b",
"assets/images/Etsy.png": "eaa128f6ab1a1a99ae7da5ad5ed3a49b",
"assets/images/Youtube.png": "684cf6d1551d4f000503e049963b1453",
"assets/images/PayPal.png": "e67480531490f08ca3e7d021d188bdff",
"assets/images/GeddesWorksCutout.png": "8cdb080e49c4de813cfc7455ebdc42a9",
"assets/images/authorizedsellerbadge.png": "55ead554583079dbfacc44fdfb1b79f6",
"assets/images/venmo-logo-1024x269.webp": "46d83ad17e93ea094652d3eddc937641",
"assets/images/welcomeImages/2.jpeg": "ebf4b4b6d7314304ebcda45aa5603aca",
"assets/images/welcomeImages/1.jpeg": "327f2a2b878a64b12afd07dae7e220ce",
"assets/images/welcomeImages/3.jpeg": "4561a3eee4802221a3c4ac67d1c44ecc",
"assets/images/welcomeImages/4.jpeg": "f37fc1b7c8cfa9c2f1525d61ec2798da",
"assets/images/welcomeImages/5.jpeg": "cbcd17e2ac16dc37004c7677c0be6b45",
"assets/images/linked.png": "1b18d461ce75c75fdb4d7b6ec08b3e65",
"assets/images/EtsySquare.png": "a2f23feeb7c19e04140b305287bc02d1",
"assets/images/github-mark.png": "43ce87609eb221d09d4832a9c0e709d0",
"assets/images/GeddesWorks.png": "c026d4c762393870695977cfbaad934a",
"assets/images/cash-app-logo-512x512.png": "31d037a802d0978aac0052d313a8aa56",
"assets/images/accentBanner1.png": "1e454ef2199a4658b5bce5202835c29f",
"assets/fonts/MaterialIcons-Regular.otf": "8f6d8b0b4ac1b41e4d7e72067aa1454c",
"assets/assets/Resume-12-23-web.pdf": "11d1b6ecf72f12bfc1e34af017bc0737",
"assets/AssetManifest.bin.json": "935d4c8d369fd65dc4f23159defdb2d7",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/NOTICES": "2a631c835f50c2ebe01224862b2a689c",
"assets/AssetManifest.json": "456c2e632bd738c6dc0d3cdca4b54eaa",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"favicon.png": "6cdcdabd3b6c3e9f256a8263b3a24318",
"main.dart.js": "a12d4f3dcbddac64f40009ba32cdb573",
"version.json": "1a6bb4b9d97f356f1d95ab549c3bb621",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"icons/Icon-512.png": "badd3a7046cf6dbbccd1424587df14ef",
"icons/Icon-192.png": "a88d6a50f9fea94ae03dc0cb1a9303b7",
"icons/Icon-maskable-192.png": "a88d6a50f9fea94ae03dc0cb1a9303b7",
"icons/Icon-maskable-512.png": "badd3a7046cf6dbbccd1424587df14ef"};
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
