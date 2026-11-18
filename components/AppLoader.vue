<template>
  <Transition name="app-loader">
    <div v-if="isVisible" class="app-loader">
      <div class="app-loader__content">
        <AppImage class="app-loader__logo" src="/images/yr-logo-transparent.svg" alt="" width="136" height="81" />

        <div class="app-loader__identity" dir="ltr" aria-hidden="true">
          <span>YRLP</span>
          <span class="app-loader__separator"></span>
          <span>PORTFOLIO</span>
        </div>

        <progress class="app-loader__track" :aria-label="$t('loading')"></progress>

        <p class="app-loader__label">{{ $t("loading") }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const isVisible = ref(false);

const ROUTE_DELAY = 140;
const ROUTE_MINIMUM = 320;

let shownAt = 0;
let showTimer;
let hideTimer;
let removeLoadingStartHook;
let removeLoadingEndHook;
let removeErrorHook;

function setDocumentBusy(isBusy) {
  if (!import.meta.client) return;

  if (isBusy) {
    document.getElementById("main-content")?.setAttribute("aria-busy", "true");
  } else {
    document.getElementById("main-content")?.removeAttribute("aria-busy");
  }
}

function showLoader() {
  window.clearTimeout(hideTimer);

  window.clearTimeout(showTimer);
  showTimer = window.setTimeout(() => {
    shownAt = window.performance.now();
    isVisible.value = true;
    setDocumentBusy(true);
  }, ROUTE_DELAY);
}

function hideLoader() {
  window.clearTimeout(showTimer);

  if (!isVisible.value) return;

  const elapsed = window.performance.now() - shownAt;

  window.clearTimeout(hideTimer);
  hideTimer = window.setTimeout(() => {
    isVisible.value = false;
    setDocumentBusy(false);
  }, Math.max(0, ROUTE_MINIMUM - elapsed));
}

onMounted(() => {
  removeLoadingStartHook = nuxtApp.hook("page:loading:start", showLoader);
  removeLoadingEndHook = nuxtApp.hook("page:loading:end", hideLoader);

  removeErrorHook = nuxtApp.hook("app:error", hideLoader);
});

onBeforeUnmount(() => {
  window.clearTimeout(showTimer);
  window.clearTimeout(hideTimer);
  removeLoadingStartHook?.();
  removeLoadingEndHook?.();
  removeErrorHook?.();
  setDocumentBusy(false);
});
</script>

<style lang="scss" scoped>
.app-loader {
  --loader-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --loader-ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);

  position: fixed;
  inset-inline-end: 16px;
  inset-block-end: 16px;
  z-index: 9999;
  display: grid;
  place-items: center;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  pointer-events: none;
  overflow: hidden;
  color: var(--color-text);
  background-color: var(--color-surface);
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    width: min(72vw, 560px);
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle,
        color-mix(in srgb, var(--color-accent) 9%, transparent),
        transparent 68%);
    transform: scale(1);
    pointer-events: none;
  }
}

.app-loader__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(240px, calc(100vw - 74px));
}

.app-loader__logo {
  display: block;
  width: 108px;
  height: auto;
  filter: drop-shadow(0 12px 28px color-mix(in srgb, var(--color-accent) 22%, transparent));
  animation: loader-breathe 1.1s var(--loader-ease-in-out) infinite alternate;
}

.app-loader__identity {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 24px;
  color: var(--color-text-muted);
  font-family: "Courier New", Courier, monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.app-loader__separator {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: var(--color-accent);
}

.app-loader__track {
  position: relative;
  width: 176px;
  height: 2px;
  margin-top: 18px;
  overflow: hidden;
  border-radius: 999px;
  accent-color: var(--color-accent);
}

.app-loader__label {
  margin-top: 12px;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  line-height: 1.5;
}

.app-loader-enter-active,
.app-loader-leave-active {
  transition: opacity 240ms var(--loader-ease-out);

  .app-loader__content {
    transition: opacity 240ms var(--loader-ease-out),
      transform 240ms var(--loader-ease-out);
  }
}

.app-loader-enter-from,
.app-loader-leave-to {
  opacity: 0;

  .app-loader__content {
    opacity: 0;
    transform: translateY(-8px) scale(0.97);
  }
}

@keyframes loader-breathe {
  from {
    opacity: 0.78;
    transform: scale(0.97);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-loader__logo {
    transform: none;
    animation: loader-fade 1.1s linear infinite alternate;
  }

  .app-loader-enter-active,
  .app-loader-leave-active,
  .app-loader-enter-active .app-loader__content,
  .app-loader-leave-active .app-loader__content {
    transition-duration: 160ms;
  }

  .app-loader-enter-from .app-loader__content,
  .app-loader-leave-to .app-loader__content {
    transform: none;
  }
}

@keyframes loader-fade {
  from {
    opacity: 0.72;
  }

  to {
    opacity: 1;
  }
}
</style>