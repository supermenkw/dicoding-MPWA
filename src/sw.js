import "regenerator-runtime";
import { precacheAndRoute } from "workbox-precaching/precacheAndRoute.mjs";
import { registerRoute } from "workbox-routing/registerRoute.mjs";
import { StaleWhileRevalidate } from "workbox-strategies/StaleWhileRevalidate.mjs";
import { clientsClaim } from "workbox-core/clientsClaim.mjs";

clientsClaim();

registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    new StaleWhileRevalidate({
        cacheName: "api-response"
    })
);

precacheAndRoute(self.__WB_MANIFEST || []);

// Notification Section
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