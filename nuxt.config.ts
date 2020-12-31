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

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['nuxt-i18n'],

  // Config apollo client
  apollo: {
    clientConfigs: {
      default: '~/gql/apollo-config.ts',
    },
  },

  // Config Storybook
  storybook: {
    stories: ['~/stories/**/*.storie.*'],
  },

  // Config i18n traductions
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'fr',
        iso: 'fr-fr',
        name: 'Français',
        file: 'fr.json',
      },
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
    lazy: true,
    langDir: 'locales/',
    vueI18n: {
      fallbackLocale: ['en', 'fr'], // choose which language to use when your preferred language lacks a translation.
      messages: {
        en: require('./locales/en.json'),
        fr: require('./locales/fr.json'),
      },
    },
  },

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
