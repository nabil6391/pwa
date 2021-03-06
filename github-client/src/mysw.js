
(function() {
  'use strict';

  var staticCacheName = 'pwa-client';

  self.addEventListener('install', function(event) {
    console.log('Service worker installing...');
    event.waitUntil(
      caches.open(staticCacheName)
        .then(function(cache) {
          console.log('Installed cache ', cache)
        })
    );
    self.skipWaiting();
  });

  self.addEventListener('activate', function(event) {
    console.log('Service worker activating...');
  });

  // self.addEventListener('sync', function (event) {
  //   console.log('On sync event');
  //   if (event.tag === 'comment-issue') {
  //     const outdb = indexedDB.open('outbox', 1)
  //     outdb.onsuccess = function () {
  //       var db = outdb.result
  //       var tx = db.transaction('outbox', 'readwrite')
  //       var store = tx.objectStore('outbox')
  //       console.log('New transaction to outbox ', tx)
  //
  //       store.openCursor().onsuccess = function (ev) {
  //         var cursor = ev.target.result
  //         if (cursor) {
  //           var found = cursor.key
  //           if (found) {
  //             event.waitUntil(
  //               // fetch(
  //               // 'htpps://api.github.com/repos/' + cursor.value.content.owner + '/' + cursor.value.content.repo + '/issues/' + cursor.value.content.number + '/comments', {
  //               //   method: cursor.value.content.method,
  //               //   body: cursor.value.content.body,
  //               //
  //               // })
  //
  //             ).then(function () {
  //               console.log('Finished and delivered comment.');
  //             })
  //           }
  //         }
  //       }
  //     }
  //   }
  // })

  self.addEventListener('fetch', function(event) {
    console.log('Fetching:', event.request.url);
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          if (response.status === 401) {
            return fetch(event.request).then(function (response) {
              // TODO 5 - Respond with custom 404 page
              if (event.request.url === 'https://api.github.com/notifications?all=true') {
                console.log('Request for notifications issued, going to the network. URL: ', event.request.url);
                return response;
              }
              return caches.open(staticCacheName).then(function (cache) {
                if (event.request.url.indexOf('test') < 0) {
                  cache.put(event.request.url, response.clone());
                  console.log('Cached request for ', event.request.url)
                }
                return response;
              });
            })
          }
          console.log('Found ', event.request.url, ' in cache.');
          var fetchPromise = fetch(event.request).then(function (networkResponse) {
            caches.open(staticCacheName).then(function (cache) {
              cache.put(event.request.url, networkResponse.clone());
              console.log('Network request for ' + event.request.url + ' and saved it in cache.')
            })
            return networkResponse;
          })
          return response || fetchPromise;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request).then(function (response) {
          // TODO 5 - Respond with custom 404 page

          if (event.request.url === 'https://api.github.com/notifications?all=true') {
            console.log('Request for notifications issued, going to the network. URL: ', event.request.url);
            return response;
          }

          return caches.open(staticCacheName).then(function (cache) {
            if (event.request.url.indexOf('test') < 0) {
              cache.put(event.request.url, response.clone());
              console.log('Cached request for ', event.request.url)
            }
            return response;
          });
        })
      }).catch(function (error) {
        // TODO 6 - Respond with custom offline page
      })
    )
  });
})();
