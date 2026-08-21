<template>
  <div class="hamburger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label class="menu__btn" for="menu__toggle">
      <span></span>
    </label>

    <ul class="menu__box">
      <li>
        <nuxt-link class="menu__item" :to="$localePath('/')">{{ $t("home") }}</nuxt-link>
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
        <nuxt-link class="menu__item" :to="$localePath('/projects')">{{ $t("projects") }}</nuxt-link>
      </li>
      <li>
        <nuxt-link class="menu__item" :to="$localePath('/blog')">‌{{ $t("blog") }}</nuxt-link>
      </li>
      <div class="settings-menu">
        <SettingsMenu class="settingsMenu" />
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
    goto(id) {
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
  background: linear-gradient(180deg,
      rgba(22, 22, 22, 0.58) 0%,
      rgba(22, 22, 22, 0.42) 100%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
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
  background-color: white;
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
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.08) 100%);
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.menu__btn:hover>span,
.menu__btn:hover>span::before,
.menu__btn:hover>span::after {
  background-color: rgba(255, 255, 255, 0.95);
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
  box-shadow: 1px 0px 6px rgba(0, 0, 0, 0.2);
  transition-duration: 0.25s;

  .settings-menu {
    position: relative;
    margin-top: 8px;
    margin-inline-start: 24px;

    .settingsMenu {
      position: relative;
      top: 0;
    }
  }
}

.menu__item {
  display: block;
  padding: 12.5px 24px;
  color: white;
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