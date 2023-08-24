// https://vite-pwa-org.netlify.app/guide/inject-manifest.html
import {
  cleanupOutdatedCaches,
  precacheAndRoute,
  createHandlerBoundToURL
} from "workbox-precaching"
import { NavigationRoute, registerRoute } from "workbox-routing"

declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

self.addEventListener("install", event => {
  console.log("Service worker installed")
})

self.addEventListener("activate", event => {
  // Je n'ai pas encore compris qd le serviceWorker était activé
  console.log("Service worker activated")
})

self.addEventListener("message", event => {
  // Comment déclencher cet évènement ?
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting()
})

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL("/")))
