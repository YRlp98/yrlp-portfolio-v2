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
  data() {
    return {
      activeLocale: "fa",
    };
  },
};
</script>