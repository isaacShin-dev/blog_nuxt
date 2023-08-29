// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/',
    buildAssetsDir: 'public',
  },
  modules: [
    '@nuxtjs/color-mode',
    '@invictus.codes/nuxt-vuetify',
    '@pinia/nuxt',

  ],
  routes: [
    {
      name: 'Detail',
      path: '/Detail',
      component: 'pages/Detail.vue',
      query: {
        page: '1' // 기본 값
      }
    }
  ],
  css: ['@/assets/main.css'],
  })


