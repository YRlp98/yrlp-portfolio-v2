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

        <p class="app-loader__label" role="status">{{ $t("loading") }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const isVisible = ref(false);
const initialLoadStarted = useState("initial-page-loader-started", () => false);

const MINIMUM_VISIBLE = 900;

let shownAt = 0;
let hideTimer;
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
  shownAt = window.performance.now();
  isVisible.value = true;
  setDocumentBusy(true);
}

function hideLoader() {
  setDocumentBusy(false);
  if (!isVisible.value) return;

  const elapsed = window.performance.now() - shownAt;
  window.clearTimeout(hideTimer);
  hideTimer = window.setTimeout(() => {
    isVisible.value = false;
  }, Math.max(0, MINIMUM_VISIBLE - elapsed));
}

onMounted(() => {
  if (initialLoadStarted.value) return;
  initialLoadStarted.value = true;

  removeErrorHook = nuxtApp.hook("app:error", hideLoader);
  showLoader();
  if (document.readyState === "complete") hideLoader();
  else window.addEventListener("load", hideLoader, { once: true });
});

onBeforeUnmount(() => {
  window.clearTimeout(hideTimer);
  window.removeEventListener("load", hideLoader);
  removeErrorHook?.();
  setDocumentBusy(false);
});
</script>

<style lang="scss" scoped>
.app-loader {
  --loader-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --loader-ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);

  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  padding: 24px;
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
  width: min(280px, calc(100vw - 48px));
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