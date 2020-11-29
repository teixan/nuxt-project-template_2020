const { TITLE } = process.env

export default {
  ssr: false,

  head: {
    title: process.env.TITLE,

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  router: {
    middleware: ['reloadCredential'],
  },

  css: ['@/assets/scss/style.scss'],

  plugins: ['~/plugins/firebase.ts'],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/moment',
  ],

  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv'],

  moment: {
    locales: ['ja'],
  },

  axios: {},

  build: {},

  env: {
    TITLE,
  },
}
