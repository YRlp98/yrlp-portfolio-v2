<template>
  <div class="hamburger-menu">
    <button type="button" class="menu__btn" :aria-label="$t('openMenu')"
      :aria-expanded="isOpen" aria-controls="mobile-menu" @click="openMenu">
      <span aria-hidden="true"></span>
    </button>

    <dialog id="mobile-menu" ref="menuDialog" class="menu__box" :aria-label="$t('mobileNavigation')"
      @close="isOpen = false">
      <form method="dialog">
        <button type="submit" class="menu__btn menu__btn--close" :aria-label="$t('closeMenu')" autofocus>
          <span aria-hidden="true"></span>
        </button>
      </form>
      <nav :aria-label="$t('mobileNavigation')">
        <ul>
          <li>
            <nuxt-link class="menu__item" :to="$localePath('/')" @click="closeMenu">{{ $t("home") }}</nuxt-link>
          </li>
          <li>
            <nuxt-link class="menu__item" :to="$localePath('/#homeAboutMe')" @click="closeMenu">{{ $t("aboutMe") }}</nuxt-link>
          </li>
          <li>
            <nuxt-link class="menu__item" :to="$localePath('/#homeSkills')" @click="closeMenu">{{ $t("skills") }}</nuxt-link>
          </li>
          <li>
            <nuxt-link class="menu__item" :to="$localePath('/projects')" @click="closeMenu">{{ $t("projects") }}</nuxt-link>
          </li>
          <li>
            <nuxt-link class="menu__item" :to="$localePath('/blog')" @click="closeMenu">{{ $t("blog") }}</nuxt-link>
          </li>
        </ul>
      </nav>
      <div class="settings-menu">
        <SettingsMenu class="settingsMenu" @close="closeMenu" />
      </div>
    </dialog>
  </div>
</template>

<script>
import SettingsMenu from "./widgets/SettingsMenu.vue";

export default {
  name: "NavbarMobile",
  components: { SettingsMenu },
  data() {
    return { isOpen: false };
  },
  watch: {
    '$route.fullPath'() {
      this.closeMenu();
    },
  },
  methods: {
    openMenu() {
      this.$refs.menuDialog.showModal();
      this.isOpen = true;
    },
    closeMenu() {
      this.$refs.menuDialog.close();
      this.isOpen = false;
    },
    handleBreakpoint(event) {
      if (event.matches) this.closeMenu();
    },
  },
  mounted() {
    this.desktopBreakpoint = window.matchMedia('(min-width: 768px)');
    this.desktopBreakpoint.addEventListener('change', this.handleBreakpoint);
  },
  beforeUnmount() {
    this.desktopBreakpoint.removeEventListener('change', this.handleBreakpoint);
  },
};
</script>

<style lang="scss" scoped>
.hamburger-menu {
  position: absolute;
  z-index: 999;
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

.menu__btn--close>span {
  transform: rotate(45deg);
}

.menu__btn--close>span::before {
  top: 0;
  transform: rotate(0);
}

.menu__btn--close>span::after {
  top: 0;
  transform: rotate(90deg);
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: none;
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
  color: var(--color-text);

  ul {
    list-style: none;
  }

  &::backdrop {
    overflow: hidden;
    overscroll-behavior: contain;
  }

  .settings-menu {
    position: relative;
    margin-top: 8px;
    margin-inline-start: 0;

    .settingsMenu {
      position: relative;
      top: 0;
      box-shadow: none;

      :deep(.settings-menu-container) {
        background-color: transparent;
        padding-inline-start: 0;
      }
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