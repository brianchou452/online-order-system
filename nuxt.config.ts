// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-vuefire'],
  vuefire: {
    config: {
      apiKey: '...',
      authDomain: '...',
      projectId: '...',
      appId: '...',
      // there could be other properties depending on the project
    },
  },
})