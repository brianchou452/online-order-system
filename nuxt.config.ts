// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-vuefire'],
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
      apiKey: "written in the .env file",
      authDomain: "written in the .env file",
      projectId: "written in the .env file",
      storageBucket: "written in the .env file",
      messagingSenderId: "written in the .env file",
      appId: "written in the .env file",
      measurementId: "written in the .env file"
    },
  },
})