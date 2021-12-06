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
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/img/favicon/apple-touch-icon.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/img/favicon/favicon-32x32.png'
            },
            {
                rel: "mask-icon",
                href: "/safari-pinned-tab.svg",
                color: "#5bbad5"
            },

            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/img/favicon/favicon-16x16.png'
            },
            {
                rel: 'manifest',
                href: '/img/favicon/site.webmanifest'
            }
        ]
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
        { src: '~plugins/vue-feather', ssr: false },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],
    router: {
        middleware: 'router-auth'
    },
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