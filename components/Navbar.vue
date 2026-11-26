<template>
  <nav class="navbar-container" :class="{ 'is-scrolled': isScrolled }" :aria-label="$t('primaryNavigation')">
    <div class="navbar default-margin">
      <div class="navbar-more-wrap" @focusout="handleFocusOut">
        <button ref="settingsToggle" type="button" class="navbar-more" :aria-label="$t('settings')"
          :popovertarget="settingsId" :aria-expanded="isOpen" :aria-controls="settingsId">
          <AppImage src="/icons/more.svg" alt="" width="24" height="24" />
        </button>
        <div :id="settingsId" ref="settingsPanel" popover="auto" class="settingsMenu desktop-settings-popover"
          :dir="activeLocale === 'fa' ? 'rtl' : 'ltr'" role="group" :aria-label="$t('settings')"
          @beforetoggle="prepareSettings" @toggle="syncSettingsState">
          <SettingsMenu @close="closeSettings(true)" />
        </div>
      </div>
      <ul class="navbar-items">
        <li>
          <nuxt-link class="item" :to="$localePath('/')">{{ $t("home") }}</nuxt-link>
        </li>
        <li>
          <nuxt-link class="item" :to="$localePath('/#homeAboutMe')">
            {{ $t("aboutMe") }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="item" :to="$localePath('/#homeSkills')">
            {{ $t("skills") }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="item" :to="$localePath('/projects')">{{
            $t("projects")
          }}</nuxt-link>
        </li>
        <li>
          <nuxt-link class="item" :to="$localePath('/blog')">{{ $t("blog") }}</nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useId } from "vue";
import SettingsMenu from "./widgets/SettingsMenu.vue";

export default {
  name: "Navbar",
  components: {
    SettingsMenu,
  },
  setup() {
    const { locale } = useI18n();
    return { activeLocale: locale, settingsId: `desktop-settings-${useId()}` };
  },
  data() {
    return {
      isOpen: false,
      isScrolled: false,
      anchored: false,
    };
  },
  watch: {
    '$route.fullPath'() { this.closeSettings(); },
  },
  methods: {
    closeSettings(restoreFocus = false) {
      this.$refs.settingsPanel?.hidePopover?.();
      if (restoreFocus) this.$refs.settingsToggle?.focus({ preventScroll: true });
    },
    prepareSettings(event) {
      if (event.newState !== 'open') return;
      if (window.innerWidth < 768) {
        event.preventDefault();
        return;
      }
      this.positionSettings();
    },
    syncSettingsState(event) {
      this.isOpen = event.newState === 'open';
      if (this.isOpen) this.positionSettings();
    },
    positionSettings() {
      if (this.anchored) return;
      const panel = this.$refs.settingsPanel;
      const trigger = this.$refs.settingsToggle;
      if (!panel || !trigger) return;
      // Older browsers retain the same inward placement without CSS anchors.
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(255, window.innerWidth - 24);
      const inward = this.activeLocale === 'fa' ? rect.left : rect.right - width;
      const left = Math.max(12, Math.min(inward, window.innerWidth - width - 12));
      panel.style.setProperty('--settings-left', `${left}px`);
      panel.style.setProperty('--settings-top', `${rect.bottom + 18}px`);
    },
    handleSettingsResize() {
      if (window.innerWidth < 768) this.closeSettings();
      else if (this.isOpen) this.positionSettings();
    },
    handleFocusOut(event) {
      if (!event.currentTarget.contains(event.relatedTarget)) this.closeSettings();
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 10;
    },
  },
  mounted() {
    if (import.meta.client) {
      this.anchored = CSS.supports("position-area: self-end span-self-start");
      this.handleScroll();
      window.addEventListener("resize", this.handleSettingsResize, { passive: true });
      window.addEventListener("scroll", this.handleScroll, { passive: true });
    }
  },
  beforeUnmount() {
    if (import.meta.client) {
      this.closeSettings();
      window.removeEventListener("resize", this.handleSettingsResize);
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
};
</script>

<style lang="scss" scoped>
// Mobile
.navbar-container {
  .navbar-items {
    display: none;
  }

  .navbar-more {
    display: none;
  }
}

// Tablet
@include mediaQueryMin("md") {
  .navbar-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
    padding: 18px 0;
    transition: background-color 0.25s ease, backdrop-filter 0.25s ease,
      -webkit-backdrop-filter 0.25s ease, box-shadow 0.25s ease;
    isolation: isolate;

    &.is-scrolled {
      &::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        background-color: var(--color-glass);
        -webkit-backdrop-filter: blur(12px);
        backdrop-filter: blur(12px);
      }
    }

    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .navbar-items {
        display: flex;
        direction: rtl;

        li {
          list-style: none;
          display: flex;

          .item {
            color: var(--white-1);
            text-decoration: none;
            font-size: 1rem;
            font-weight: regular;
            cursor: pointer;
            transition: color 0.3s ease;

            &:hover {
              color: var(--green-1);
            }
          }

          &::after {
            content: " \00b7";
            color: var(--gray-1);
            padding: 0 1rem;
          }

          &:last-child:after {
            content: none;
          }
        }
      }

      .navbar-more {
        display: flex;
        min-width: 44px;
        min-height: 44px;
        background: transparent;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease, filter 0.2s ease;

        img {
          filter: var(--icon-monochrome-filter);
          transition: transform 0.2s ease, opacity 0.2s ease, filter 0.2s ease;
        }

        &:hover {
          transform: translateY(-1px);
          filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.25));

          img {
            transform: scale(1.04);
            opacity: 0.95;
            opacity: 0.82;
          }
        }

        &:active {
          transform: translateY(0) scale(0.98);
        }
      }

      .navbar-more-wrap {
        position: relative;
        display: flex;
        align-items: center;
      }


    }

    &.is-scrolled .settingsMenu {
      border-radius: 0 0 8px 8px;
    }

    &:not(.is-scrolled) .settingsMenu {
      border-top: none;
      border-radius: 8px;
    }
  }
}
</style>

<style lang="scss">
.desktop-settings-popover {
  display: none;
  position: fixed;
  inset: auto;
  top: var(--settings-top, 80px);
  left: var(--settings-left, 12px);
  margin: 0;
  padding: 0;
  border: 0;
  inline-size: min(255px, calc(100dvw - 24px));
  max-block-size: calc(100dvh - 100px);
  overflow: auto;
  overscroll-behavior: contain;
  color: var(--color-text);
  background: var(--color-glass);
  box-shadow: var(--shadow-soft);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  opacity: 0;
  transition-property: opacity, transform, display, overlay;
  transition-duration: 160ms;
  transition-timing-function: ease-out;
  transition-behavior: allow-discrete;

  > .settings-menu-container {
    position: static;
    box-sizing: border-box;
    inline-size: 100%;
    max-block-size: none;
    overflow: visible;
    background: transparent;
    box-shadow: none;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}

.desktop-settings-popover:is(:popover-open, .\:popover-open) {
  display: block;
  opacity: 1;
}

@starting-style {
  .desktop-settings-popover:is(:popover-open, .\:popover-open) { opacity: 0; }
}

@supports (position-area: self-end span-self-start) {
  .desktop-settings-popover {
    inset: auto;
    margin: 18px 0;
    position-area: self-end span-self-start;
    position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .desktop-settings-popover { transform: translateY(-6px); }
  .desktop-settings-popover:is(:popover-open, .\:popover-open) { transform: translateY(0); }
  @starting-style {
    .desktop-settings-popover:is(:popover-open, .\:popover-open) { transform: translateY(-6px); }
  }
}

@media (prefers-reduced-motion: reduce) {
  .desktop-settings-popover { transition-duration: 80ms; }
}
@media print {
  .desktop-settings-popover { display: none !important; }
}
</style>
