// https://vite-pwa-org.netlify.app/guide/inject-manifest.html
import {
  cleanupOutdatedCaches,
  precacheAndRoute
  // createHandlerBoundToURL
} from "workbox-precaching"
// import { NavigationRoute, registerRoute } from "workbox-routing"

declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

////// Events //////
// https://web.dev/service-worker-lifecycle/

// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/install_event
// install is only called once per service worker, and won't fire again until it's updated
self.addEventListener("install", event => {
  console.log("Service worker installing...")
  // https://web.dev/service-worker-lifecycle/#skip-the-waiting-phase
  self.skipWaiting()
})

// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/activate_event
self.addEventListener("activate", event => {
  console.log("Service worker activated")
  // take control of non-controlled pages
  event.waitUntil(self.clients.claim())
})

// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/fetch_event
self.addEventListener("fetch", event => {
  // console.log(`Handling fetch event for ${event.request.url}`)
})

// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/message_event
self.addEventListener("message", event => {
  console.log(`The service worker sent me a message: ${event.data.message}`)

  if (event.data) {
    if (event.data.type === "SKIP_WAITING") self.skipWaiting()

    if (event.data.action === "showNotification") {
      self.registration.showNotification(event.data.title, {
        body: event.data.message
      })
    }
  }

  // event.source?.postMessage("Hi client")
})

// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/push_event
self.addEventListener("push", event => {
  const options = {
    body: "Ceci est une notification",
    icon: "/icons/icon_144x144.png"
  }

  event.waitUntil(
    self.registration.showNotification("Notification Locale", options)
  )
})

// to allow work offline
// registerRoute(new NavigationRoute(createHandlerBoundToURL("/")))
