// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/icon', '@pinia/nuxt'],
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit', 'better-auth/vue'],
    },
  },
  runtimeConfig: {
    // Private keys (server-only)
    dbPath: process.env.NUXT_DB_PATH || 'mydb.sqlite',

    public: {
      // Public keys (exposed to client)
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      betterAuthUrl: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
    },
  },
});
