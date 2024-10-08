// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],

  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: '0.0.0.0',
      },
    },
  },

  compatibilityDate: '2024-10-04',
})