<template>
  <div class="default-container">
    <AppLoader />
    <NavbarMobile />
    <Navbar />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script>
import NavbarMobile from "~/components/NavbarMobile.vue";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

export default {
  components: {
    NavbarMobile,
    Navbar,
    Footer,
  },
  setup() {
    const { locale } = useI18n();

    useHead(() => ({
      htmlAttrs: {
        lang: locale.value === "fa" ? "fa" : "en",
        dir: locale.value === "en" ? "ltr" : undefined,
        'data-locale': locale.value,
      },
      script: [
        {
          key: 'person-schema',
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Yousef Roshandel',
            alternateName: ['YRlp', 'YRlp98', 'Yousef', 'Roshandel', 'YR', 'Y.R'],
            url: 'https://yrlp.ir',
            jobTitle: 'Front-End Developer and UI/UX Designer',
            knowsAbout: [
              'Front-end development',
              'Web development',
              'Web design',
              'Responsive web design',
              'UI/UX design',
              'JavaScript',
              'Vue.js',
              'Nuxt.js',
              'Node.js',
              'Software engineering',
            ],
            sameAs: [
              'https://www.linkedin.com/in/yrlp98/',
              'https://github.com/YRlp98',
              'https://dribbble.com/YRlp98',
              'https://www.behance.net/yrlp98',
              'https://x.com/YRlp98',
            ],
          }),
        },
        {
          key: 'website-schema',
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'YRlp | Yousef Roshandel',
            alternateName: ['YRlp', 'YRlp98', 'YR', 'Y.R'],
            url: 'https://yrlp.ir',
            inLanguage: ['fa', 'en'],
            publisher: {
              '@type': 'Person',
              name: 'Yousef Roshandel',
            },
          }),
        },
      ],
    }));
  },
};
</script>