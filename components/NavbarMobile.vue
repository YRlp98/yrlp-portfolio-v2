<template>
  <div class="hamburger-menu">
    <input id="menu__toggle" ref="menuToggle" type="checkbox" />
    <label class="menu__btn" for="menu__toggle">
      <span></span>
    </label>

    <ul class="menu__box">
      <li>
        <nuxt-link class="menu__item" :to="$localePath('/')" @click="closeMenu">{{ $t("home") }}</nuxt-link>
      </li>
      <li>
        <span class="menu__item" @click="goto($localePath('/#homeAboutMe'))">
          {{ $t("aboutMe") }}
        </span>
      </li>
      <li>
        <span class="menu__item" @click="goto($localePath('/#homeSkills'))">
          {{ $t("skills") }}
        </span>
      </li>
      <li>
        <nuxt-link class="menu__item" :to="$localePath('/projects')" @click="closeMenu">{{ $t("projects") }}</nuxt-link>
      </li>
      <li>
        <nuxt-link class="menu__item" :to="$localePath('/blog')" @click="closeMenu">‌{{ $t("blog") }}</nuxt-link>
      </li>
      <div class="settings-menu">
        <SettingsMenu class="settingsMenu" @close="closeMenu" />
      </div>
    </ul>
  </div>
</template>

<script>
import SettingsMenu from "./widgets/SettingsMenu.vue";

export default {
  name: "NavbarMobile",
  components: {
    SettingsMenu,
  },
  methods: {
    closeMenu() {
      if (this.$refs.menuToggle) {
        this.$refs.menuToggle.checked = false;
      }
    },
    goto(id) {
      this.closeMenu();
      useRouter().push(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.hamburger-menu {
  position: absolute;
  z-index: 999;
}

#menu__toggle {
  position: fixed;
  top: 14px;
  left: 14px;
  width: 44px;
  height: 44px;
  opacity: 0;
}

#menu__toggle:checked~.menu__btn>span {
  transform: rotate(45deg);
}

#menu__toggle:checked~.menu__btn>span::before {
  top: 0;
  transform: rotate(0);
}

#menu__toggle:checked~.menu__btn>span::after {
  top: 0;
  transform: rotate(90deg);
}

#menu__toggle:checked~.menu__box {
  visibility: visible;
  left: 0;
}

.menu__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 14px;
  left: 14px;
  width: 44px;
  height: 44px;
  cursor: pointer;
  z-index: 1000;
  border-radius: 12px;
  background: var(--color-glass);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(10px) saturate(170%);
  -webkit-backdrop-filter: blur(10px) saturate(170%);
  transition: transform 0.2s ease, box-shadow 0.2s ease,
    background 0.2s ease, border-color 0.2s ease;
}

.menu__btn>span,
.menu__btn>span::before,
.menu__btn>span::after {
  display: block;
  position: absolute;
  width: 16px;
  height: 2px;
  background-color: var(--color-text);
  transition-duration: 0.25s;
}

.menu__btn>span::before {
  content: "";
  top: -8px;
}

.menu__btn>span::after {
  content: "";
  top: 8px;
}

.menu__btn:hover {
  transform: translateY(-2px) scale(1.02);
  background: var(--color-surface-elevated);
  border-color: var(--color-border);
  box-shadow: var(--shadow-soft);
}

.menu__btn:hover>span,
.menu__btn:hover>span::before,
.menu__btn:hover>span::after {
  background-color: var(--color-accent);
}

.menu__btn:active {
  transform: translateY(0) scale(0.98);
}

.menu__box {
  display: block;
  position: fixed;
  visibility: hidden;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100dvh;
  max-height: 100dvh;
  margin: 0;
  padding: 80px 0;
  box-sizing: border-box;
  overflow-y: auto;
  overscroll-behavior: contain;
  list-style: none;
  background-color: var(--gray-3);
  box-shadow: var(--shadow-soft);
  transition-duration: 0.25s;

  .settings-menu {
    position: relative;
    margin-top: 8px;
    margin-inline-start: 24px;

    .settingsMenu {
      position: relative;
      top: 0;
      box-shadow: none;
    }
  }
}

.menu__item {
  display: block;
  padding: 12.5px 24px;
  color: var(--color-text);
  text-decoration: none;
  transition-duration: 0.25s;
  cursor: pointer;
}

.menu__item:hover {
  background-color: var(--gray-2);
}

// Tablet
@include mediaQueryMin("md") {
  .hamburger-menu {
    display: none;
  }
}
</style>