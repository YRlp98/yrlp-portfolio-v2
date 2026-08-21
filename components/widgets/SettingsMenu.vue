<template>
  <div class="settings-menu-container" ref="menuRef">
    <div class="menu-theme">
      <p>Theme</p>
      <ul class="menu-bar">
        <li>
          <a @click="onChangeTheme()" :class="{ active: isDark }" href="#">
            <img src="/icons/dark.svg" alt="dark mode" />
            Dark Mode
          </a>
        </li>
        <li>
          <a @click="onChangeTheme()" :class="{ active: !isDark }" href="#">
            <img src="/icons/light.svg" alt="light mode" />
            Light Mode
          </a>
        </li>
      </ul>
    </div>

    <div class="menu-language">
      <p>Language</p>
      <ul class="menu-bar">
        <li v-for="locale in availableLocales" :key="locale.code">
          <nuxt-link
            :to="switchLocalePath(locale.code)"
            @click="$emit('close')"
          >
            <img
              :src="`/icons/${locale.code}.svg`"
              :alt="locale.name"
            />
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

const isDark = ref(true)

const availableLocales = computed(() =>
  locales.value.filter((l) => l.code !== locale.value)
)

function onChangeTheme() {
  isDark.value = !isDark.value
}
</script>

<style lang="scss" scoped>
.settings-menu-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 215px;
  background-color: rgba(19, 19, 19, 0.55);
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

    a {
      text-decoration: none;
      color: white;
      display: flex;
      align-items: center;
      font-size: 0.813rem;
      padding: 4px 10px;
      border-radius: 5px;
      transition: all 0.2s ease;

      img {
        margin-right: 10px;
        width: 17px;
        height: 17px;
      }
    }

    a:hover {
      transform: scale(1.05);
    }

    .active {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  .menu-language {
    margin-top: 10px;
  }
}
</style>