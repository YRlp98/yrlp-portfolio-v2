const siteUrl = 'https://yrlp.ir'

const seoContent = {
  home: {
    en: {
      title: 'Yousef Roshandel | Front-End Developer & UI/UX Designer',
      description:
        'Yousef Roshandel (YRlp / YRlp98) is a front-end developer and UI/UX designer creating modern, accessible web experiences.',
    },
    fa: {
      title: 'یوسف روشندل | توسعه‌دهنده فرانت‌اند و طراح UI/UX',
      description:
        'یوسف روشندل (YRlp و YRlp98)، توسعه‌دهنده فرانت‌اند و طراح UI/UX است که تجربه‌های وب مدرن و کاربرپسند خلق می‌کند.',
    },
  },
  projects: {
    en: {
      title: 'Yousef Roshandel Projects | YRlp',
      description:
        'Explore web development, front-end, UI/UX, and software projects by Yousef Roshandel (YRlp98).',
    },
    fa: {
      title: 'پروژه‌های یوسف روشندل | YRlp',
      description:
        'نمونه پروژه‌های توسعه وب، فرانت‌اند، UI/UX و نرم‌افزار یوسف روشندل (YRlp98) را ببینید.',
    },
  },
  blog: {
    en: {
      title: 'Yousef Roshandel Blog | YRlp',
      description:
        'Read articles and notes about front-end development, web technologies, UI/UX design, and software by Yousef Roshandel.',
    },
    fa: {
      title: 'بلاگ یوسف روشندل | YRlp',
      description:
        'مقالات و یادداشت‌های یوسف روشندل درباره توسعه فرانت‌اند، فناوری‌های وب، طراحی UI/UX و نرم‌افزار.',
    },
  },
}

const keywords = {
  en: 'YRlp, YRlp98, Yousef, Roshandel, Yousef Roshandel, YR, Y.R, Developer, Designer, Front-end Developer, Frontend Developer, Web Developer, Web Designer, UI/UX Designer, JavaScript Developer, Vue.js Developer, Nuxt.js Developer, Node.js Developer, Software Engineer, Responsive Web Design, Web Portfolio, Developer Portfolio, Iran Developer, Arak Developer',
  fa: 'YRlp, YRlp98, YR, Y.R, یوسف, روشندل, یوسف روشندل, توسعه‌دهنده, طراح, توسعه‌دهنده فرانت‌اند, برنامه‌نویس فرانت‌اند, توسعه‌دهنده وب, طراح وب, طراح UI/UX, برنامه‌نویس جاوااسکریپت, برنامه‌نویس Vue.js, برنامه‌نویس Nuxt.js, برنامه‌نویس Node.js, مهندس نرم‌افزار, طراحی وب واکنش‌گرا, نمونه کار, رزومه برنامه‌نویس, توسعه‌دهنده ایران, توسعه‌دهنده اراک',
}

export const useSiteSeo = (page) => {
  const route = useRoute()
  const { locale } = useI18n()
  const currentLocale = computed(() => (locale.value === 'en' ? 'en' : 'fa'))
  const currentContent = computed(() => seoContent[page][currentLocale.value])
  const canonicalPath = computed(() => {
    const path = route.path.replace(/^\/en(?=\/|$)/, '')
    return path || '/'
  })
  const canonicalUrl = computed(() => `${siteUrl}${canonicalPath.value}`)
  const englishUrl = computed(() => `${siteUrl}/en${canonicalPath.value === '/' ? '' : canonicalPath.value}`)
  const farsiUrl = computed(() => `${siteUrl}${canonicalPath.value}`)

  useHead(() => ({
    title: currentContent.value.title,
    meta: [
      { name: 'description', content: currentContent.value.description },
      { name: 'keywords', content: keywords[currentLocale.value] },
      { name: 'author', content: 'Yousef Roshandel' },
      { name: 'creator', content: 'Yousef Roshandel' },
      { name: 'publisher', content: 'YRlp' },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow, max-image-preview:large' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: currentContent.value.title },
      { property: 'og:description', content: currentContent.value.description },
      { property: 'og:url', content: canonicalUrl.value },
      { property: 'og:site_name', content: 'YRlp | Yousef Roshandel' },
      { property: 'og:locale', content: currentLocale.value === 'en' ? 'en_US' : 'fa_IR' },
      { property: 'og:locale:alternate', content: currentLocale.value === 'en' ? 'fa_IR' : 'en_US' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: currentContent.value.title },
      { name: 'twitter:description', content: currentContent.value.description },
      { name: 'twitter:creator', content: '@YRlp98' },
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl.value },
      { rel: 'alternate', hreflang: 'fa', href: farsiUrl.value },
      { rel: 'alternate', hreflang: 'en', href: englishUrl.value },
      { rel: 'alternate', hreflang: 'x-default', href: farsiUrl.value },
    ],
  }))
}