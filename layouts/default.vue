<template>
  <div class="default-container">
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
    }));
  },
};
</script>