<template>
  <div class="settings-menu-container" ref="menuRef">
    <div class="menu-theme">
      <p>Theme</p>
      <ul class="menu-bar">
        <li>
          <button type="button" @click="setTheme('dark')" :class="{ active: isDark }" :aria-pressed="isDark">
            <img src="/icons/dark.svg" alt="" />
            Dark Mode
          </button>
        </li>
        <li>
          <button type="button" @click="setTheme('light')" :class="{ active: !isDark }" :aria-pressed="!isDark">
            <img src="/icons/light.svg" alt="" />
            Light Mode
          </button>
        </li>
      </ul>
    </div>

    <div class="menu-language">
      <p>Language</p>
      <ul class="menu-bar">
        <li v-for="locale in availableLocales" :key="locale.code">
          <nuxt-link :to="switchLocalePath(locale.code)" @click="$emit('close')">
            <img :src="`/icons/${locale.code}.svg`" :alt="locale.name" />
            {{ locale.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close'])

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { isDark, setTheme, initializeTheme } = useTheme()

const availableLocales = computed(() =>
  locales.value.filter((l) => l.code !== locale.value)
)

onMounted(initializeTheme)
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
      font-family: inherit;
      font-size: 0.813rem;
      line-height: 1.7;
      cursor: pointer;
      padding: 4px 10px;
      border-radius: 5px;
      transition: transform 0.3s ease, background-color 0.3s ease;

      img {
        margin-right: 10px;
        width: 17px;
        height: 17px;
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
</style>