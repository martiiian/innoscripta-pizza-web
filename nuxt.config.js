if (process.env.NODE_ENV !== 'production') require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Crazy Pizza store',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Crazy Piza store for you and your family Wabba Labba Dub Dub!'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'orange' },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles/_core.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/dotenv', '@nuxtjs/auth'],

  /*
   ** Axios module config
   */
  axios: {
    baseURL: process.env.API_URL
  },

  /**
   * Auth config
   */
  auth: {
    strategies: {
      registration: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: '/auth/registration',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          },
          user: {
            url: '/auth/me',
            method: 'post',
            propertyName: 'data'
          }
        }
      },
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          },
          user: {
            url: '/auth/me',
            method: 'post',
            propertyName: 'data'
          }
        },
        tokenType: 'bearer'
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
