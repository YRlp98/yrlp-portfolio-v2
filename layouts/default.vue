<template>
  <div class="default-container">
    <AppLoader />
    <NavbarMobile />
    <Navbar />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script>
import { profileImage, siteUrl } from "~/utils/site";
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
            '@id': `${siteUrl}/#person`,
            name: 'Yousef Roshandel',
            alternateName: ['یوسف روشندل', 'YRlp', 'YRlp98', 'YR', 'Y.R'],
            url: `${siteUrl}/`,
            image: profileImage,
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
            '@id': `${siteUrl}/#website`,
            name: 'YRlp | Yousef Roshandel',
            alternateName: ['YRlp', 'YRlp98', 'YR', 'Y.R'],
            url: `${siteUrl}/`,
            inLanguage: ['fa', 'en'],
            publisher: {
              '@id': `${siteUrl}/#person`,
            },
          }),
        },
      ],
    }));
  },
};
</script>
