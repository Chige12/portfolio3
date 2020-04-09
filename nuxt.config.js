// import { Configuration } from '@nuxt/types'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['ress'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/style-resources', 'nuxt-webfontloader', '@nuxtjs/svg'],
  styleResources: {
    scss: ['~/assets/style/variables.scss', '~/assets/style/mixins.scss'],
    less: [],
    stylus: []
  },
  webfontloader: {
    // add Google Fonts as "custom" | workaround required
    custom: {
      families: ['Noto Sans JP:n4,n7', 'Roboto:n5i,n9i'],
      urls: [
        'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500;1,900&display=swap'
      ]
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    postcss: {
      'postcss-cssnext': {
        browsers: ['last 2 versions', 'ie >= 11', 'Android >= 4']
      },
      preset: {
        autoprefixer: {
          grid: true
        }
      }
    },
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}

// module.exports = nuxtConfig
