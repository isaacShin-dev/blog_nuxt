// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: 'https://devinsight.kr',
  },
  sitemap: {
    hostname: 'https://devinsight.kr',
    gzip: true,
    sitemaps: [
      {
        path: '/sitemap.xml',
        gzip: true
      },
    ]
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
      ]
    }
  },
  app: {
    baseURL: '/',
    buildAssetsDir: 'public',
  },
  modules: [
    '@nuxtjs/color-mode',
    '@invictus.codes/nuxt-vuetify',
    '@pinia/nuxt',
    'nuxt-simple-sitemap',
    '@nuxtjs/google-adsense',

  ],

  'google-adsense': {
    id: 'ca-pub-6048277531996552'
  },
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


