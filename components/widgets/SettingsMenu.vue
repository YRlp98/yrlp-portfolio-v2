<template>
  <div class="settings-menu-container">
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
defineEmits(['close'])

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { theme, setTheme } = useTheme()

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

    a:hover,
    button:hover {
      transform: scale(1.05);
    }

    .active {
      background-color: var(--color-glass-hover);
    }
  }

  .menu-language {
    margin-top: 10px;
  }
}

@media (max-width: 767px) {
  .settings-menu-container {
    background-color: transparent;
  }
}
</style>
