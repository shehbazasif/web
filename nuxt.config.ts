import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Shehbaz Asif — UI/UX Designer',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Shehbaz Asif designs product interfaces — research, interaction design and design systems for web and mobile.' },
        { name: 'theme-color', content: '#ECEBF3' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Sora:wght@300..800&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap' },
      ],
    },
  },
  nitro: { prerender: { crawlLinks: true, routes: ['/'] } },
})
