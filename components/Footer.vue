<template>
  <div class="footer-container">
    <div class="socialNetwork-container">
      <div class="socialNetwork default-margin">
        <h2>{{ $t("homePageFollowMeSN") }}</h2>
        <SocialNetwork class="socialNetwork" />
      </div>
      <TitleBackground title="social network" class="titleBackground default-margin" />
    </div>

    <div class="footer default-margin">
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

// Tablet
@include mediaQueryMin("md") {
  .footer-container {
    margin-top: 150px;

    .footer {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      ul {
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
    }
  }
}

// Desktop
@include mediaQueryMin("xl") {
  .footer {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
}
</style>