<template>
  <div class="wave"></div>
</template>

<script>
export default {
  name: "WaveBackground",
};
</script>

<style lang="scss" scoped>
.wave {
  position: absolute;
  z-index: 100;
  height: 200px;
  width: 100%;
  background: url("../../assets/images/wave2.svg");
  background-repeat: no-repeat;
  background-size: cover;
}

:global(html[data-theme="light"] .wave) {
  background-image: url("../../assets/images/wave2-light.svg");
}
</style>