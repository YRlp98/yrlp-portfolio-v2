<template>
  <nav class="navbar-container" :class="{ 'is-scrolled': isScrolled }">
    <div class="navbar default-margin">
      <div class="navbar-more-wrap">
        <span class="navbar-more" @click.stop="isOpen = !isOpen">
          <img src="/images/icons/more.svg" alt="More icon" />
        </span>
        <transition name="dropdown" appear>
          <SettingsMenu class="settingsMenu" v-if="isOpen" @close="isOpen = false"
            v-click-outside="() => isOpen = false" @click.stop />
        </transition>
      </div>
      <ul class="navbar-items">
        <li>
          <nuxt-link class="item" :to="$localePath('/')">{{ $t("home") }}</nuxt-link>
        </li>
        <li>
          <span class="item" @click="goto($localePath('/#homeAboutMe'))">
            {{ $t("aboutMe") }}
          </span>
        </li>
        <li>
          <span class="item" @click="goto($localePath('/#homeSkills'))">
            {{ $t("skills") }}
          </span>
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
import SettingsMenu from "./widgets/SettingsMenu.vue";

export default {
  name: "Navbar",
  components: {
    SettingsMenu,
  },
  data() {
    return {
      isOpen: false,
      isScrolled: false,
    };
  },
  methods: {
    goto(id) {
      useRouter().push(id);
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 10;
    },
  },
  mounted() {
    if (import.meta.client) {
      this.handleScroll();
      window.addEventListener("scroll", this.handleScroll, { passive: true });
    }
  },
  beforeUnmount() {
    if (import.meta.client) {
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
        background-color: rgba(19, 19, 19, 0.55);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
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
        cursor: pointer;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease, filter 0.2s ease;

        img {
          transition: transform 0.2s ease, opacity 0.2s ease, filter 0.2s ease;
        }

        &:hover {
          transform: translateY(-1px);
          filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.25));

          img {
            transform: scale(1.04);
            opacity: 0.95;
            filter: brightness(1.08);
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

      .dropdown-enter-active,
      .dropdown-leave-active {
        transition: opacity 0.24s ease, transform 0.24s ease;
        transform-origin: top center;
      }

      .dropdown-enter-from,
      .dropdown-leave-to {
        opacity: 0;
        transform: translateY(-10px) scaleY(0.92);
      }

      .dropdown-enter-to,
      .dropdown-leave-from {
        opacity: 1;
        transform: translateY(0) scaleY(1);
      }

      .settingsMenu {
        position: absolute;
        top: calc(100% + 18px);
        inset-inline-start: 0;
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
