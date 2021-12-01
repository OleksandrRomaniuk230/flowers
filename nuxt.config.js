require('dotenv').config();


export default {
    loaders: {
        sass: {
            implementation: require('sass'),
        },
        scss: {
            implementation: require('sass'),
        },
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'auth-flowers',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: ''
            },
            {
                name: 'format-detection',
                content: 'telephone=no'
            }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['normalize.css/normalize.css',

        '~/assets/scss/common.scss',
    ],
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~plugins/nuxt-api', ssr: false },
        { src: "~plugins/vue-select", ssr: false },
        { src: "~plugins/vee-validate", ssr: false },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
        ['@nuxtjs/dotenv', {
            path: '',
            systemvars: true
        }],
        ['cookie-universal-nuxt', {
            alias: 'cookies'
        }],

    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    ssr: false,

}