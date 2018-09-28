module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-gmaps',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: false,

  css: [
    '@/assets/css/main.css'
  ],

  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa'
  ],

  plugins: [
    { src: "~plugins/vue2-google-maps.js", ssr: true },
    { src: "~plugins/vue-markdown.js", ssr: true },
    { src: "~plugins/vue-moment.js", ssr: true },
    { src: "~plugins/vue-star-rating.js", ssr: true }
  ],

  loading: { color: '#3B8070' },

  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['vue2-google-maps']
  }
}