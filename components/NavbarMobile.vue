<template>
  <div class="hamburger-menu" :dir="activeLocale === 'fa' ? 'rtl' : 'ltr'">
    <div class="menu__trigger-frame default-margin">
      <button type="button" class="menu__btn menu__trigger" :aria-label="$t('openMenu')"
        :aria-expanded="isOpen" aria-controls="mobile-menu" @click="openMenu">
        <span aria-hidden="true"></span>
      </button>
    </div>

    <dialog id="mobile-menu" ref="menuDialog" class="menu__box" :aria-label="$t('mobileNavigation')"
      @close="isOpen = false">
      <header class="menu__header">
        <div class="menu__header-content default-margin">
          <nuxt-link class="menu__brand" :to="$localePath('/')" @click="closeMenu">
            <AppImage src="/images/yr-logo-transparent.svg" :alt="$t('siteLogoAlt')" width="44" height="27" />
          </nuxt-link>
          <form method="dialog">
            <button type="submit" class="menu__btn menu__btn--close" :aria-label="$t('closeMenu')" autofocus>
              <span aria-hidden="true"></span>
            </button>
          </form>
        </div>
      </header>

      <div class="menu__body">
        <div class="menu__content default-margin">
          <nav class="menu__nav" :aria-label="$t('mobileNavigation')">
            <ul>
              <li v-for="item in navItems" :key="item.path">
                <nuxt-link class="menu__item" :to="$localePath(item.path)"
                  :aria-current="isCurrent(item.path) ? (item.path.includes('#') ? 'location' : 'page') : undefined"
                  @click="closeMenu">{{ $t(item.label) }}</nuxt-link>
              </li>
            </ul>
          </nav>

          <SettingsMenu class="menu__settings" compact @close="closeMenu" />
        </div>
      </div>
    </dialog>
  </div>
</template>

<script>
import SettingsMenu from "./widgets/SettingsMenu.vue";

export default {
  name: "NavbarMobile",
  components: { SettingsMenu },
  setup() {
    const { locale } = useI18n();
    return { activeLocale: locale };
  },
  data() {
    return {
      isOpen: false,
      navItems: [
        { label: 'home', path: '/' },
        { label: 'aboutMe', path: '/#homeAboutMe' },
        { label: 'skills', path: '/#homeSkills' },
        { label: 'projects', path: '/projects' },
        { label: 'blog', path: '/blog' },
      ],
    };
  },
  watch: {
    '$route.fullPath'() {
      this.closeMenu();
    },
  },
  methods: {
    isCurrent(path) {
      const [pathname, hash] = this.$localePath(path).split('#');
      return this.$route.path.replace(/\/$/, '') === pathname.replace(/\/$/, '')
        && this.$route.hash === (hash ? `#${hash}` : '');
    },
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
  position: relative;
  inline-size: 44px;
  block-size: 44px;
  flex-shrink: 0;
  box-sizing: border-box;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-glass);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(10px) saturate(170%);
  -webkit-backdrop-filter: blur(10px) saturate(170%);
  color: var(--color-text);
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 120ms ease, color 120ms ease;

  &:active { background: var(--color-glass-hover); color: var(--color-accent); }
}

.menu__trigger-frame {
  position: fixed;
  inset-block-start: max(1rem, env(safe-area-inset-top));
  inset-inline: 0;
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
  z-index: 1000;
}

.menu__trigger { pointer-events: auto; }

.menu__trigger-frame,
.menu__header-content,
.menu__content {
  padding-left: env(safe-area-inset-left, 0px);
  padding-right: env(safe-area-inset-right, 0px);
}

.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  display: block;
  position: absolute;
  inline-size: 18px;
  block-size: 2px;
  background: currentColor;
}
.menu__btn > span::before { content: ""; inset-block-start: -6px; }
.menu__btn > span::after { content: ""; inset-block-start: 6px; }
.menu__btn--close > span { transform: rotate(45deg); }
.menu__btn--close > span::before { inset-block-start: 0; transform: rotate(90deg); }
.menu__btn--close > span::after { display: none; }

.menu__box {
  position: fixed;
  inset: 0;
  inline-size: 100%;
  max-inline-size: none;
  block-size: 100dvh;
  max-block-size: 100dvh;
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  overflow: hidden;
  overscroll-behavior: contain;
  background: var(--color-surface);
  color: var(--color-text);

  &::backdrop {
    overflow: hidden;
    overscroll-behavior: contain;
    background: var(--color-surface);
  }

  ul { list-style: none; }

  &[open] { display: flex; flex-direction: column; }
}

.menu__content {
  display: flex;
  flex-direction: column;
  min-block-size: 100%;
  margin-inline: auto;
}

.menu__header {
  flex: 0 0 auto;
  padding-block: max(1rem, env(safe-area-inset-top)) 20px;
  background: var(--color-surface);
}

.menu__header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

// Keep scrolling below the opaque header so items cannot show behind or above its controls.
.menu__body {
  flex: 1 1 auto;
  min-block-size: 0;
  padding-block-end: max(1rem, env(safe-area-inset-bottom));
  box-sizing: border-box;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.menu__brand {
  display: flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 44px;
  min-block-size: 44px;
  border-radius: 5px;
  transition: background-color 120ms ease;

  &:active { background: var(--color-glass-hover); }

  img { display: block; inline-size: 44px; block-size: auto; filter: var(--icon-monochrome-filter); }
}

.menu__nav ul { display: grid; gap: 2px; }

.menu__item {
  display: flex;
  align-items: center;
  min-block-size: 44px;
  box-sizing: border-box;
  padding: 5px 8px;
  border-radius: 5px;
  color: var(--color-text);
  text-decoration: none;
  font-size: 1.375rem;
  font-weight: 500;
  line-height: 1.5;
  text-align: start;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 120ms ease, color 120ms ease;

  &[aria-current] { color: var(--color-accent); font-weight: 700; }
  &:active { background: var(--color-glass-hover); color: var(--color-accent); }
}

.menu__settings { margin-block-start: auto; padding-block-start: 24px; }

@media (hover: hover) and (pointer: fine) {
  .menu__btn:hover, .menu__item:hover, .menu__brand:hover { background: var(--color-glass-hover); }
  .menu__btn:hover, .menu__item:hover { color: var(--color-accent); }
}

@media (forced-colors: active) {
  .menu__item[aria-current] { text-decoration: underline; }
}

@include mediaQueryMin("md") {
  .hamburger-menu { display: none; }
}
</style>
