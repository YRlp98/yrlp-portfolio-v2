// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-01',

  app: {
    head: {
      title: 'Yousef Roshandel | Front-End Developer & UI/UX Designer',
      htmlAttrs: {
        lang: 'fa',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Yousef Roshandel is a passionate Front-End Developer and UI/UX Designer creating modern, user-friendly websites. یوسف روشندل، توسعه‌دهنده فرانت‌اند و طراح UI/UX با اشتیاق برای خلق تجربه‌های دیجیتال مدرن و کاربرپسند.',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#131313' },
        { name: 'apple-mobile-web-app-title', content: 'YRlp' },
        {
          property: 'og:title',
          content: 'Yousef Roshandel | Front-End Developer & UI/UX Designer',
        },
        {
          property: 'og:description',
          content:
            'Yousef Roshandel is a passionate Front-End Developer and UI/UX Designer creating modern, user-friendly websites. یوسف روشندل، توسعه‌دهنده فرانت‌اند و طراح UI/UX با اشتیاق برای خلق تجربه‌های دیجیتال مدرن و کاربرپسند.',
        },
        { property: 'og:url', content: 'https://yrlp.ir' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
      ],
      script: [
        {
          innerHTML: `(function () {
            try {
              var savedTheme = localStorage.getItem('theme');
              var theme = savedTheme === 'light' || savedTheme === 'dark'
                ? savedTheme
                : 'dark';
              document.documentElement.dataset.theme = theme;
              document.documentElement.style.colorScheme = theme;
              var themeColor = document.querySelector('meta[name="theme-color"]');
              if (themeColor) themeColor.setAttribute('content', theme === 'light' ? '#f7f9f6' : '#131313');
            } catch (error) {}
          })();`,
        },
      ],
    },
  },

  // Global CSS
  css: ['@/assets/css/main.scss'],

  // Plugins
  plugins: [
    // gsap.client.js is automatically client-only due to .client suffix
  ],

  // Auto import components
  components: true,

  // Modules
  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxtjs/i18n', '@vercel/speed-insights'],

  // Vite: inject SCSS mixins globally (replaces @nuxtjs/style-resources)
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/query.scss" as *;',
        },
      },
    },
  },

  // i18n (v9)
  i18n: {
    strategy: 'prefix_except_default',
    langDir: '',
    locales: [
      { code: 'fa', language: 'fa-FA', name: 'Farsi', file: 'fa.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'fa',
    detectBrowserLanguage: false,
    baseUrl: 'https://yrlp.ir',
    vueI18n: './i18n.config.js',
    compilation: {
      strictMessage: false,
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  // Sitemap (v6+)
  sitemap: {
    siteUrl: 'https://yrlp.ir',
    urls: ['/', '/en', '/projects', '/en/projects', '/blog', '/en/blog'],
  },

  // Robots (v5+)
  robots: {
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
      },
    ],
    sitemap: ['https://yrlp.ir/sitemap.xml'],
  },

  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },
})