/* eslint-disable nuxt/no-cjs-in-config */
module.exports = {
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'server',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        titleTemplate: '%s - Relinks',
        title: 'Relinks' || '',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: 'Relinks website' || '',
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    /*
     ** Global CSS
     */
    css: ['~/scss/main.scss'],
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        { src: '@/plugins/clickOutside', ssr: false },
        { src: '@/plugins/infiniteLoading', ssr: false },
        { src: '@/plugins/vueCookies', ssr: false },
    ],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/style-resources',
        '@nuxtjs/fontawesome', ['@nuxtjs/html-minifier', { log: 'once', logHtml: true }],
    ],
    fontawesome: {
        components: 'fa',
        icons: {
            solid: true,
            brands: true,
        },
    },
    /*
     ** Nuxt.js modules
     */
    modules: ['nuxt-webfontloader', '@nuxtjs/svg', '@nuxtjs/axios'],
    webfontloader: {
        custom: {
            families: [
                'Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap',
                'Roboto&display=swap',
                'Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
                'Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700&display=swap',
                'Poppins:wght@400;500;600;700;800&display=swap',
            ],
            urls: [
                'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap',
                'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
                'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700&display=swap',
                'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap',
            ],
        },
    },
    /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
    vuetify: {
        font: {
            family: 'Poppins',
        },
        customVariables: ['~/scss/variables.scss', '~/scss/main.scss'],
    },
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {
        // extractCSS: true,
        optimization: {
            minimize: true,
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.(css|vue)$/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
        },
    },
    router: {
        linkExactActiveClass: 'exact-active-link',
    },
    serverMiddleware: ['~/api/server.js'],
    axios: {
        baseURL: '139.180.213.253',
        proxy: true,
    },
    render: {
        bundleRenderer: {
            shouldPreload: (file, type) => {
                return ['script', 'style', 'font'].includes(type);
            },
        },
    },
};
