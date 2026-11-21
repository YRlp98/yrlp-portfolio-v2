<template>
  <div class="settings-menu-container" :class="{ 'is-compact': compact }" :dir="locale === 'fa' ? 'rtl' : 'ltr'">
    <div class="menu-theme">
      <p>{{ $t('theme') }}</p>
      <ul class="menu-bar">
        <li>
          <button type="button" @click="setTheme('system')" :class="{ active: theme === 'system' }" :aria-pressed="theme === 'system'">
            <i class="fa-solid fa-desktop theme-icon" aria-hidden="true"></i>
            <span class="menu-label">{{ $t('systemTheme') }}</span>
          </button>
        </li>
        <li>
          <button type="button" @click="setTheme('dark')" :class="{ active: theme === 'dark' }" :aria-pressed="theme === 'dark'">
            <AppImage src="/icons/dark.svg" alt="" />
            <span class="menu-label">{{ $t('darkTheme') }}</span>
          </button>
        </li>
        <li>
          <button type="button" @click="setTheme('light')" :class="{ active: theme === 'light' }" :aria-pressed="theme === 'light'">
            <AppImage src="/icons/light.svg" alt="" />
            <span class="menu-label">{{ $t('lightTheme') }}</span>
          </button>
        </li>
      </ul>
    </div>

    <div class="menu-reading">
      <p>{{ $t('reading') }}</p>
      <ul class="menu-bar">
        <li>
          <button type="button" @click="toggleReadingMode" :class="{ active: readingMode }"
            :role="compact ? 'switch' : undefined" :aria-checked="compact ? readingMode : undefined"
            :aria-pressed="compact ? undefined : readingMode">
            <i class="fa-solid fa-book-open theme-icon" aria-hidden="true"></i>
            <span class="menu-label">{{ $t('readingMode') }}</span>
            <span v-if="compact" class="reading-switch" aria-hidden="true"><span></span></span>
          </button>
        </li>
        <li>
          <button type="button" @click="savePdf">
            <i class="fa-solid fa-file-pdf theme-icon" aria-hidden="true"></i>
            <span class="menu-label">{{ $t('savePdf') }}</span>
          </button>
        </li>
      </ul>
    </div>

    <div class="menu-language">
      <p>{{ $t('language') }}</p>
      <ul class="menu-bar">
        <li v-for="locale in availableLocales" :key="locale.code">
          <nuxt-link :to="switchLocalePath(locale.code)" :lang="locale.code" @click="$emit('close')">
            <AppImage :src="`/icons/${locale.code}.svg`" alt="" />
            <span class="menu-label">{{ locale.name }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'

defineProps({ compact: { type: Boolean, default: false } })
const emit = defineEmits(['close'])

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { theme, setTheme } = useTheme()
const { readingMode, toggleReadingMode } = useReadingMode()

async function savePdf() {
  emit('close')
  await nextTick()
  await document.fonts?.ready
  window.print()
}

const availableLocales = computed(() =>
  locales.value.filter((l) => l.code !== locale.value)
)

</script>

<style lang="scss" scoped>
.settings-menu-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 215px;
  color: var(--color-text);
  background-color: var(--color-glass);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  // border-radius: 8px;
  overflow: hidden;
  padding: 20px;
  z-index: 999;

  ul {
    list-style: none;
    width: 100%;
    padding: 10px 0;
  }

  li {
    line-height: 2.188rem;

    a,
    button {
      width: 100%;
      box-sizing: border-box;
      border: 0;
      text-decoration: none;
      color: var(--color-text);
      background: transparent;
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: inherit;
      font-size: 0.813rem;
      line-height: 1.7;
      text-align: start;
      cursor: pointer;
      padding: 4px 10px;
      min-height: 44px;
      border-radius: 5px;
      transition: transform 0.3s ease, background-color 0.3s ease;

      img,
      .theme-icon {
        flex: 0 0 17px;
        width: 17px;
        height: 17px;
      }

      img {
        display: block;
        object-fit: contain;
      }

      .theme-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 17px;
        line-height: 1;
      }

      .menu-label {
        text-box: trim-both cap alphabetic;
      }
    }

    @media (hover: hover) and (pointer: fine) {
      a:hover,
      button:hover { transform: scale(1.05); }
    }

    .active {
      background-color: var(--color-glass-hover);
    }
  }

  .menu-reading,
  .menu-language {
    margin-top: 10px;
  }
}

.settings-menu-container.is-compact {
  position: static;
  z-index: auto;
  inline-size: 100%;
  box-sizing: border-box;
  padding: 0;
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  overflow: visible;

  p { color: var(--color-text-muted); font-size: 0.813rem; text-align: start; }
  ul { padding: 0; }

  li a, li button {
    font-size: 0.938rem;
    min-block-size: 44px;
    padding: 8px;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 120ms ease, color 120ms ease;

    &:hover { transform: none; }
    &:active { background: var(--color-glass-hover); color: var(--color-accent); }
  }

  .menu-theme .menu-bar {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
    margin-block-start: 8px;
    padding: 4px;
    box-sizing: border-box;
    border-radius: 5px;
    background: var(--color-bg);
  }

  .menu-theme button {
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    min-block-size: 60px;
    font-size: 0.813rem;
    line-height: 1.5;

    &.active { background: var(--color-surface-elevated); font-weight: 700; }
  }

  .menu-reading { margin-block-start: 16px; }
  .menu-reading > p { display: none; }
  .menu-reading button.active { background: transparent; }

  .reading-switch {
    display: flex;
    align-items: center;
    inline-size: 36px;
    block-size: 22px;
    box-sizing: border-box;
    padding: 3px;
    margin-inline-start: auto;
    flex-shrink: 0;
    border-radius: 999px;
    background: var(--color-text-muted);

    span {
      inline-size: 16px;
      block-size: 16px;
      border-radius: 50%;
      background: var(--color-bg);
    }
  }

  [aria-checked="true"] .reading-switch {
    justify-content: flex-end;
    background: var(--color-accent);
  }

  .menu-language {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-block-start: 16px;
    padding-inline: 8px;

    .menu-bar { inline-size: auto; }
    a { inline-size: auto; }
  }

  :is(.menu-reading button, .menu-language a):active {
    background: var(--color-glass-hover);
  }

  @media (hover: hover) and (pointer: fine) {
    :is(.menu-theme button, .menu-reading button, .menu-language a):hover {
      background: var(--color-glass-hover);
      color: var(--color-accent);
    }

    .menu-theme button.active:hover { background: var(--color-surface-elevated); }
  }
}

@media (forced-colors: active) {
  .is-compact .reading-switch { border: 1px solid ButtonText; background: Canvas; }
  .is-compact .reading-switch span { background: ButtonText; }
  .is-compact .menu-theme button.active { outline: 2px solid Highlight; outline-offset: -2px; }
}

@media (min-width: 768px) {
  .settings-menu-container {
    max-block-size: calc(100dvh - 8rem);
    overflow-y: auto;
  }
}

@media (max-width: 767px) {
  .settings-menu-container {
    background-color: transparent;
  }
}
</style>
