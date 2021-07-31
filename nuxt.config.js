export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'fire-tic-tac-toe',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/@csstools/normalize.css' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // 'nuxt-vite',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/firebase'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  firebase: {
    // options
    config: {
      apiKey: 'AIzaSyDtWw1nR426v6p3M-BMCKwizqimI7tnPmI',
      authDomain: 'tic-tac-toe-8037e.firebaseapp.com',
      projectId: 'tic-tac-toe-8037e',
      storageBucket: 'tic-tac-toe-8037e.appspot.com',
      messagingSenderId: '1041126153009',
      appId: '1:1041126153009:web:408ad7d0b28b18d701ee10',
    },
    services: { firestore: true, auth: true },
  },
}
