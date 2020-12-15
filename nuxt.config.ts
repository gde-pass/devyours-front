export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'DevYours',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/neumorphism'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~/plugins/persistedState.client.ts' }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
    '@nuxtjs/eslint-module',
    '@nuxtjs/apollo',
    '@nuxtjs/fontawesome',
  ],

  fontawesome: {
    icons: {
      solid: [
        'faSignOutAlt',
        'faSignInAlt',
        'faQuestion',
        'faEnvelope',
        'faUnlockAlt',
        'faUser',
      ],
      brands: ['faTwitter', 'faFacebookF', 'faGithub'],
    },
  },

  // Config apollo client
  apollo: {
    clientConfigs: {
      default: '~/gql/apollo-config.js',
    },
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },
}
