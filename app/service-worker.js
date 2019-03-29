/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/codebymick.com.html","f8a24d63b4c1b93c5a0b8053f60c7d36"],["/css/app.css","f903f2598f9fc352d1d121407c008763"],["/css/app.min.css","f903f2598f9fc352d1d121407c008763"],["/data/inspiration.json","3cac928e21125ef9f2b339b87f9fd335"],["/images/icons/close.svg","24acfa63b6818fb0106f41e06d65a265"],["/images/icons/icon-128x128.png","d25359a77bedddb94204d7b910583bb1"],["/images/icons/icon-144x144.png","0b2758744cb9342e6b55e02bdc67cf46"],["/images/icons/icon-152x152.png","4892a7b48ee537c8a1b7993134f3fb1c"],["/images/icons/icon-192x192.png","06e1b10515e3e5351e0e49f4d4a16b2f"],["/images/icons/icon-256x256.png","3a8212952831c6c5c5478c149deff1cf"],["/images/icons/icon-32x32.png","1a0c40362e290953879364b83ca21415"],["/images/icons/icon_reload.svg","f335e79828d92afbb64be2863f53372a"],["/images/icons/logo.svg","5178a9a8f7a54108be975ab4ad585b50"],["/images/inspiration/allnations.jpg","150d9318126c6478569168754e9ba83c"],["/images/inspiration/allnations_tn.jpg","eebe451d45dcf1b0757fe2981d724407"],["/images/inspiration/code-stats1.jpg","2a74b7e5d9eb21a0b6a095762ee48b9c"],["/images/inspiration/code-stats2.jpg","2aabd4d70b3aa29fab2c70c6458f6272"],["/images/inspiration/code-stats3.jpg","2143c87414b62dccaef44935a1f730b6"],["/images/inspiration/code-stats4.jpg","b6a2e908cc54f3325a3464a36d7458ba"],["/images/inspiration/codeBack.jpg","126733446653a9bb4531638e009ab661"],["/images/inspiration/codeBack_tn.jpg","eabf637c9194d389a33dc10426189931"],["/images/inspiration/fmd.jpg","4b1ad39db7d52871c49861fcb02b2ba5"],["/images/inspiration/fmd_tn.jpg","293ff672d7d75521f557bd591cc014cd"],["/images/inspiration/git.jpg","5afdc526241608c69fd8b26dd97a6ac2"],["/images/inspiration/git_tn.jpg","5afdc526241608c69fd8b26dd97a6ac2"],["/images/inspiration/headshot.jpg","959f4e30e03e7448f9a1eb05476cdc6e"],["/images/inspiration/horaserweg.jpg","56a9bb8e8532dceeb8dbfc736f7f1eea"],["/images/inspiration/horaserweg_tn.jpg","4aff38d038ee889f5691da8ea33f2025"],["/images/inspiration/kameleon.jpg","975f196ed73ee10d19b74baf79315dac"],["/images/inspiration/kameleonSCN.png","acb54b9856d484cf24be1332c0a3b46d"],["/images/inspiration/kameleon_tn.jpg","114b20abbfa8e5d6d5a8743722d32979"],["/images/inspiration/macbookPro.jpg","1409d5e6bffe2f58650c31d11fa18ee5"],["/images/inspiration/macbookPro_tn.jpg","2be10015d47cc4dde886cc5f8488e9b9"],["/images/inspiration/pfl.jpg","4e72a211f516e1dc0f08ee632aa03bf2"],["/images/inspiration/pfl_tn.jpg","ad6b6769f72c64bb34be54e15c68a7b4"],["/images/inspiration/r3fresh.jpg","85fa048614d22bae99552f356be37a72"],["/images/inspiration/r3fresh_tn.jpg","6f1fb911240f986379687a239df7322d"],["/images/inspiration/spaceinvaders.jpg","3ddbcccf5989ab486e87771058565725"],["/images/inspiration/spaceinvaders_tn.jpg","a07bc3fdfb3259ded852f1e2d649b476"],["/images/inspiration/tansom.jpg","6218263745bdd66c61abcde60e6d01aa"],["/images/inspiration/tansom_tn.jpg","3e27ac02c155bcb74f14f373d2827717"],["/images/logo.png","4fc07866763e192ef7b5855d6fdb8bbb"],["/index.html","ca28311d1bc9a87891191273730bb1d4"],["/js/app.js","e0272e42adc4d8baa1392ab978698ef1"],["/manifest.json","73ade7107cfd61d191611927c841427e"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







