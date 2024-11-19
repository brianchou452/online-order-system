// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-vuefire'],
  // nitro: {
  //   preset: 'cloudflare-pages',
  // },
  // experimental: {
  //   payloadExtraction: false
  // },
  // build: {
  //   transpile: ['lucide-vue-next', 'unenv'],
  // },
  // ssr: false,
  vuefire: {
    emulators: {
      // uncomment this line to run the application in production mode without emulators during dev
      // enabled: false,
      auth: {
        options: {
          disableWarnings: true,
        },
      },
    },
    auth: {
      enabled: true
    },
    config: {
      apiKey: "AIzaSyCJp-4e5jzP9WaWT7O_w1Ghy-whp4FL4E4",
      authDomain: "ipad-pos-dev.firebaseapp.com",
      projectId: "ipad-pos-dev",
      storageBucket: "ipad-pos-dev.firebasestorage.app",
      messagingSenderId: "250070852575",
      appId: "1:250070852575:web:7931ee8c3341bca34e5a6a",
      measurementId: "G-PMNQQ3BS4B"
    },
  },
})