// import { Configuration } from '@nuxt/types'

require('dotenv').config()
const { FB_OWNER_UID } = process.env

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
  loading: { color: '#48a290' },
  /*
   ** Global CSS
   */
  css: ['ress'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/mixin-common-methods', '@/plugins/firebase'],
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
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
    '@nuxtjs/svg'
  ],
  styleResources: {
    scss: [
      '~/assets/style/variables.scss',
      '~/assets/style/z-index.scss',
      '~/assets/style/mixins.scss'
    ]
  },
  webfontloader: {
    // add Google Fonts as "custom" | workaround required
    custom: {
      families: ['Noto Sans JP:n4,n7', 'Roboto:n5i,n7i'],
      urls: [
        'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500;1,700&display=swap'
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
      preset: {
        autoprefixer: { grid: 'autoplace' }
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
  },
  env: {
    FB_OWNER_UID
  }
}

// export default config
