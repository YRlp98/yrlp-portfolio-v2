<template>
  <svg class="wave" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path d="M0 88C128 120 240 32 384 52S584 128 736 92S928 16 1056 40S1272 136 1440 88V160H0Z" fill="currentColor" />
  </svg>
</template>

<script>
export default {
  name: "WaveBackground",
};
</script>

<style scoped>
.wave {
  display: block;
  width: 100%;
  height: clamp(4rem, 6dvw, 10rem);
  color: var(--color-section-surface);
  pointer-events: none;
}

@media (forced-colors: active) {
  .wave {
    display: none;
  }
}
</style>
