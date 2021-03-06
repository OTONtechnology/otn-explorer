import allowedLangs from './langs/allowedLangs';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'otn-explorer',
    htmlAttrs: {
      lang: 'en'
    },
    script: [
      { src: 'https://cdn.amcharts.com/lib/5/index.js', preload: true },
      { src: 'https://cdn.amcharts.com/lib/5/map.js', preload: true },
      {
        src: 'https://cdn.amcharts.com/lib/5/themes/Animated.js',
        preload: true
      },
      {
        src: 'https://cdn.amcharts.com/lib/5/geodata/worldLow.js',
        preload: true
      },
      { src: 'https://cdn.jsdelivr.net/npm/d3-array@3', preload: true },
      { src: 'https://cdn.jsdelivr.net/npm/d3-geo@3', preload: true },
      { src: 'https://cdn.jsdelivr.net/npm/d3-geo-projection@4', preload: true }
    ],
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, minimum-scale=1, initial-scale=1'
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/favicon/site.webmanifest' },
      {
        rel: 'mask-icon',
        type: 'image/x-icon',
        href: '/favicon/safari-pinned-tab.svg',
        color: '#5bbad5'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/normalize.css', '~/assets/styles/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/toast'
  ],

  styleResources: {
    stylus: './assets/styles/vars.styl'
  },

  svgSprite: {
    input: '~/assets/svg/'
  },

  toast: {
    position: 'bottom-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  i18n: {
    locales: allowedLangs.map(lang => ({
      code: lang,
      file: `${lang}.js`
    })),
    defaultLocale: 'en',
    fallbackLocale: 'en',
    langDir: 'langs/dist',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true // recommended
    },
    vueI18n: '~/i18n.js'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-i18n',
    'nuxt-clipboard2'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL
    // baseURL: 'https://explorer-dev.108dev.ru/api/v1'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    API_SOCKET_BASE_URL: process.env.API_SOCKET_BASE_URL
  }
};
