import fs from "fs-extra"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    https: {
      key: fs.readFileSync("localhost-key.pem").toString(),
      cert: fs.readFileSync("localhost.pem").toString()
    }
  },
  ssr: false,
  devtools: { enabled: true },
  typescript: {
    shim: false
  },
  modules: ["@vite-pwa/nuxt"],
  // https://github.com/vite-pwa/vite-plugin-pwa/blob/31ccaa89bb18b7d39f8d150435b26d33dfee04dd/src/types.ts#L48
  pwa: {
    manifest: {
      name: "Push Notifications",
      short_name: "PushTest",
      description: "Testing Push Notifications in PWA",
      icons: [
        {
          src: "icons/icon_144x144.png",
          sizes: "144x144",
          type: "image/png"
        }
      ]
    },
    workbox: {
      navigateFallback: "/"
    },
    devOptions: {
      enabled: true,
      type: "module"
    }
  }
})