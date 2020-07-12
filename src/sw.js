import { precacheAndRoute } from "workbox-precaching/precacheAndRoute.mjs";
import { registerRoute } from "workbox-routing/registerRoute.mjs";
import { NetworkFirst } from "workbox-strategies/NetworkFirst.mjs";
import { StaleWhileRevalidate } from "workbox-strategies/StaleWhileRevalidate.mjs";
/* importScripts("workbox-sw.js"); */

/* workbox.routing.registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    workbox.strategies.staleWhileRevalidate({
        cacheName: "api-response",
    })
); */

registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    new StaleWhileRevalidate({
        cacheName: "api-response"
    })
);

precacheAndRoute(self.__WB_MANIFEST);

/* precacheAndRoute([
    {url: "/icon/icon-72" , revision: 1},
    {url: "/icon/icon-96" , revision: 1},
    {url: "/icon/icon-128" , revision: 1},
    {url: "/icon/icon-144" , revision: 1},
    {url: "/icon/icon-152" , revision: 1},
    {url: "/icon/icon-192" , revision: 1},
    {url: "/icon/icon-384" , revision: 1},
    {url: "/icon/icon-512" , revision: 1},
    {url: "/svg/back.svg" , revision: 1},
    {url: "/svg/no-emblem.svg" , revision: 1},
    {url: "/svg/person.svg" , revision: 1},
    {url: "/svg/rsz_logo.svg" , revision: 1},
    {url: "/svg/favorite.svg" , revision: 1},
    {url: "/svg/unfavorite.svg" , revision: 1},
    {url: "/favicon.ico" , revision: 1},
    {url: "/manifest.json" , revision: 1},

]); */

self.addEventListener("notificationclick", (event) => {

    switch (event.action) {
        case 'yes-gotofav':
            clients.openWindow('index.html#favorite');
            break;
        case 'no-gotofav':
            event.notification.close();
            break;
    }
})

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});