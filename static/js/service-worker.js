var CACHE_NAME = 'BiciMadrid';
var urlsToCache = [
  '/',
  '/static/images/markers/stop.png',
  '/static/images/pin.png',
  '/static/images/markers/deactivated.png',
  '/static/images/markers/go.png',
  '/static/images/markers/fire.png',
  '/static/images/markers/1.png',
  '/static/images/markers/2.png',
  '/static/images/markers/3.png',
  '/static/images/markers/4.png',
  '/static/images/markers/5.png',
  '/static/images/markers/6.png',
  '/static/images/markers/7.png',
  '/static/images/markers/8.png',
  '/static/images/markers/9.png',
  '/static/images/maskable/favicon.ico',
  '/static/images/maskable/apple-touch-icon.png',
  '/static/images/maskable/android-chrome-192x192.png',
  '/static/images/maskable/android-chrome-512x512.png',
  '/static/images/maps_64dp.png',
  '/static/images/maskable/maskable_icon.png',
  '/static/images/maskable/maskable_icon_x144.png',
  '/static/images/maskable/maskable_icon_x384.png',
  '/static/images/maskable/maskable_icon_x512.png',
  '/static/images/maskable/maskable_icon_x128.png',
  '/static/images/maskable/maskable_icon_x192.png',
  '/static/images/maskable/maskable_icon_x48.png',
  '/static/images/maskable/maskable_icon_x72.png',
  '/static/images/maskable/maskable_icon_x96.png',
  '/static/images/AppImages/windows11/SmallTile.scale-100.png',
  '/static/images/AppImages/windows11/SmallTile.scale-125.png',
  '/static/images/AppImages/windows11/SmallTile.scale-150.png',
  '/static/images/AppImages/windows11/SmallTile.scale-200.png',
  '/static/images/AppImages/windows11/SmallTile.scale-400.png',
  '/static/images/AppImages/windows11/Square150x150Logo.scale-100.png',
  '/static/images/AppImages/windows11/Square150x150Logo.scale-125.png',
  '/static/images/AppImages/windows11/Square150x150Logo.scale-150.png',
  '/static/images/AppImages/windows11/Square150x150Logo.scale-200.png',
  '/static/images/AppImages/windows11/Square150x150Logo.scale-400.png',
  '/static/images/AppImages/windows11/Wide310x150Logo.scale-100.png',
  '/static/images/AppImages/windows11/Wide310x150Logo.scale-125.png',
  '/static/images/AppImages/windows11/Wide310x150Logo.scale-150.png',
  '/static/images/AppImages/windows11/Wide310x150Logo.scale-200.png',
  '/static/images/AppImages/windows11/Wide310x150Logo.scale-400.png',
  '/static/images/AppImages/windows11/LargeTile.scale-100.png',
  '/static/images/AppImages/windows11/LargeTile.scale-125.png',
  '/static/images/AppImages/windows11/LargeTile.scale-150.png',
  '/static/images/AppImages/windows11/LargeTile.scale-200.png',
  '/static/images/AppImages/windows11/LargeTile.scale-400.png',
  '/static/images/AppImages/windows11/Square44x44Logo.scale-100.png',
  '/static/images/AppImages/windows11/Square44x44Logo.scale-125.png',
  '/static/images/AppImages/windows11/Square44x44Logo.scale-150.png',
  '/static/images/AppImages/windows11/Square44x44Logo.scale-200.png',
  '/static/images/AppImages/windows11/Square44x44Logo.scale-400.png',
  '/static/images/AppImages/windows11/StoreLogo.scale-100.png',
  '/static/images/AppImages/windows11/StoreLogo.scale-125.png',
  '/static/images/AppImages/windows11/StoreLogo.scale-150.png',
  '/static/images/AppImages/windows11/StoreLogo.scale-200.png',
  '/static/images/AppImages/windows11/StoreLogo.scale-400.png',
  '/static/images/AppImages/windows11/SplashScreen.scale-100.png',
  '/static/images/AppImages/windows11/SplashScreen.scale-125.png',
  '/static/images/AppImages/windows11/SplashScreen.scale-150.png',
  '/static/images/AppImages/windows11/SplashScreen.scale-200.png',
  '/static/images/AppImages/windows11/SplashScreen.scale-400.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-16.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-20.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-24.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-30.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-32.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-36.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-40.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-44.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-48.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-60.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-64.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-72.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-80.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-96.png',
  '/static/images/AppImages/windows11/Square44x44Logo.targetsize-256.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-16.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-20.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-24.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-30.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-32.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-36.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-40.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-44.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-48.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-60.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-64.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-72.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-80.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-96.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-256.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png',
  '/static/images/AppImages/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png',
  '/static/images/AppImages/android/android-launchericon-512-512.png',
  '/static/images/AppImages/android/android-launchericon-192-192.png',
  '/static/images/AppImages/android/android-launchericon-144-144.png',
  '/static/images/AppImages/android/android-launchericon-96-96.png',
  '/static/images/AppImages/android/android-launchericon-72-72.png',
  '/static/images/AppImages/android/android-launchericon-48-48.png',
  '/static/images/AppImages/ios/16.png',
  '/static/images/AppImages/ios/20.png',
  '/static/images/AppImages/ios/29.png',
  '/static/images/AppImages/ios/32.png',
  '/static/images/AppImages/ios/40.png',
  '/static/images/AppImages/ios/50.png',
  '/static/images/AppImages/ios/57.png',
  '/static/images/AppImages/ios/58.png',
  '/static/images/AppImages/ios/60.png',
  '/static/images/AppImages/ios/64.png',
  '/static/images/AppImages/ios/72.png',
  '/static/images/AppImages/ios/76.png',
  '/static/images/AppImages/ios/80.png',
  '/static/images/AppImages/ios/87.png',
  '/static/images/AppImages/ios/100.png',
  '/static/images/AppImages/ios/114.png',
  '/static/images/AppImages/ios/120.png',
  '/static/images/AppImages/ios/128.png',
  '/static/images/AppImages/ios/144.png',
  '/static/images/AppImages/ios/152.png',
  '/static/images/AppImages/ios/167.png',
  '/static/images/AppImages/ios/180.png',
  '/static/images/AppImages/ios/192.png',
  '/static/images/AppImages/ios/256.png',
  '/static/images/AppImages/ios/512.png',
  '/static/images/AppImages/ios/1024.png',
  'static/js/install.js',
  'static/js/index.js',
  'static/js/darkmode.js',
  'static/js/jquery-3.7.0.js',
  'static/js/service-worker.js',
  'static/css/bootstrap.min.css',
  'static/css/bootstrap.min.css.map',
  'static/css/index.css',
  'static/css/install.css',
];


self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Clone the request to avoid mutating it
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Clone the response to avoid mutating it
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          })
          .catch(function (error) {
            console.error('Error fetching from network:', error);
            throw error;
          });
      })
  );
});
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Clone the request to avoid mutating it
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Clone the response to avoid mutating it
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          })
          .catch(function (error) {
            console.error('Error fetching from network:', error);
            return caches.match('/');
          });
      })
  );
});
