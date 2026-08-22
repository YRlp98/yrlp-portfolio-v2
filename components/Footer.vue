<template>
  <div class="footer-container" :class="{ 'is-ltr': activeLang === 'en' }">
    <div class="socialNetwork-container">
      <div class="socialNetwork default-margin">
        <h2>{{ $t("homePageFollowMeSN") }}</h2>
        <SocialNetwork class="socialNetwork" />
      </div>
      <TitleBackground title="social network" class="titleBackground default-margin" />
    </div>

    <div class="footer default-margin">

      <nuxt-link class="footer-logo" :to="$localePath('/')" aria-label="YR home">
        <img src="/images/yr-logo-transparent.svg" alt="YR" />
      </nuxt-link>

      <ul :style="{ direction: `${changeDirection(activeLang)}` }">
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
      <p :style="{ textAlign: `${changeAlign(activeLang)}` }">
        {{ $t("footerCopyright") }}
      </p>
    </div>
  </div>
</template>

<script>
import SocialNetwork from "~/components/widgets/SocialNetwork.vue";
import TitleBackground from "~/components/backgrounds/TitleBackground.vue";

export default {
  name: "Footer",
  components: {
    SocialNetwork,
    TitleBackground,
  },
  setup() {
    const { changeDirection, changeAlign } = useDirection()
    return {
      changeDirection,
      changeAlign,
    }
  },
  data() {
    return {
    };
  },
  computed: {
    activeLang() { return useI18n().locale.value; },
  },
  methods: {
    goto(id) {
      useRouter().push(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-container {
  margin-top: 50px;
  margin-bottom: 50px;

  .socialNetwork-container {
    position: relative;
    background-color: var(--gray-3);

    .socialNetwork {
      height: 330px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h2 {
        z-index: 1;
        color: var(--color-text);
        font-size: 1.375;
      }

      .socialNetwork {
        z-index: 1;
        height: 0;
        margin-top: 30px;
        margin-left: 20px;
      }
    }

    .titleBackground {
      z-index: 0;
      inset: 0;
      top: 50px;
      left: 0;
    }
  }

  .footer {
    margin-top: 150px;

    .footer-logo {
      display: flex;
      width: 56px;
      margin: 0 auto 24px;
      transition: transform 0.3s ease;

      img {
        display: block;
        width: 100%;
        height: auto;
        filter: var(--icon-monochrome-filter);
      }

      &:hover {
        transform: translateY(-2px);
      }
    }

    ul {
      display: none;
    }

    p {
      font-size: 1.063rem;
      color: var(--gray-1);
      direction: rtl;
    }
  }
}

@media (max-width: 767px) {
  .footer-container .footer p {
    text-align: center !important;
  }
}

.footer-container.is-ltr {

  .footer p,
  .footer ul {
    direction: ltr;
  }

  @include mediaQueryMin("md") {
    .footer {
      grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
    }

    .footer ul {
      grid-column: 2;
      justify-self: end;
      justify-content: flex-end;
    }

    .footer p {
      grid-column: 1;
      justify-self: start;
    }
  }

  @include mediaQueryMin("xl") {
    .footer {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }
  }
}

// Tablet
@include mediaQueryMin("md") {
  .footer-container {
    margin-top: 150px;

    .footer {
      position: relative;
      display: grid;
      grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
      grid-template-rows: auto auto;
      row-gap: 32px;
      align-items: center;

      .footer-logo {
        grid-column: 1 / -1;
        grid-row: 1;
        justify-self: center;
        margin: 0;
      }

      .footer-logo:hover {
        transform: translateY(-2px);
      }

      ul {
        grid-column: 1;
        grid-row: 2;
        justify-self: stretch;
        width: 100%;
        min-width: 0;
        max-width: 100%;
        justify-content: flex-end;
        flex-wrap: nowrap;
        overflow: visible;
        scrollbar-width: none;
        display: flex;
        direction: rtl;

        &::-webkit-scrollbar {
          display: none;
        }

        li {
          list-style: none;
          display: flex;
          min-width: 0;

          .item {
            min-width: 0;
            color: var(--white-1);
            text-decoration: none;
            font-size: 1rem;
            font-weight: regular;
            white-space: normal;
            overflow-wrap: anywhere;
            cursor: pointer;
            transition: color 0.3s ease;

            &:hover {
              color: var(--green-1);
            }
          }

          &::after {
            content: " \00b7";
            color: var(--gray-1);
            padding: 0 clamp(0.35rem, 1.2vw, 1rem);
          }

          &:last-child:after {
            content: none;
          }
        }
      }

      p {
        grid-column: 2;
        grid-row: 2;
        justify-self: end;
        min-width: 0;
        max-width: 100%;
        white-space: nowrap;
        text-align: end;
      }
    }
  }
}

// Desktop
@include mediaQueryMin("xl") {
  .footer {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-rows: auto auto;

    ul {
      grid-column: 1;
      grid-row: 2;
      justify-self: center;
      width: 100%;
      min-width: 0;
      max-width: 100%;
      justify-content: flex-end;
      overflow-x: auto;
      flex-wrap: nowrap;
      white-space: nowrap;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    p {
      grid-column: 2;
      grid-row: 2;
      justify-self: end;
      min-width: 0;
      max-width: 100%;
      text-align: start;
    }
  }
}
</style>