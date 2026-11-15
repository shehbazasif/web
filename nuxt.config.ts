import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['@fontsource-variable/sora', '@fontsource-variable/geist', '@fontsource-variable/geist-mono', '~/assets/css/main.css'],
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
      ],
    },
  },
  nitro: { prerender: { crawlLinks: true, routes: ['/'] } },
})
