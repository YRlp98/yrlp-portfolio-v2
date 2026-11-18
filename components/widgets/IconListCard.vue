<template>
  <div class="iconListCard-container">
    <a class="iconListCard" :href="link" target="_blank">
      <div class="icon">
        <AppImage src="/icons/education.svg" alt="education icon" />
      </div>
      <TitleSubCard class="titleSubCard" :title="title" :description="description" />
    </a>
  </div>
</template>

<script>
import TitleSubCard from "~/components/widgets/TitleSubCard.vue";

export default {
  name: "IconListCard",
  components: {
    TitleSubCard,
  },
  props: {
    link: {
      type: String,
      required: false,
      default: "/",
    },
    // iconUrl: {
    //   type: String,
    //   required: true,
    //   default: "~/assets/icons/education.svg",
    // },
    iconAlt: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
      default: "Title",
    },
    description: {
      type: String,
      required: true,
      default: "Description",
    },
  },
};
</script>

<style lang="scss" scoped>
.iconListCard-container {
  display: flex;
  justify-content: flex-end;
  container-type: inline-size;

  .iconListCard {
    display: flex;
    max-inline-size: 100%;
    min-inline-size: 0;
    gap: 15px;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    scale: 1;
    transform-origin: right center;
    transition: scale 160ms ease;

    &:is(:hover, :focus-visible) :deep(h4) {
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }

    @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
      &:hover {
        scale: 1.02;
      }

      &:hover:not(:focus-visible) :deep(h4) {
        text-decoration: none;
      }

      @container (min-width: 400px) {
        &:hover {
          scale: 1.05;
        }
      }

      @container (min-width: 560px) {
        &:hover {
          scale: 1.1;
        }
      }
    }

    .icon {
      flex: 0 0 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 50px;
      border-radius: 5px;
      background-color: white;

      img {
        height: 30px;
        width: 30px;
      }
    }

    .titleSubCard {
      min-inline-size: 0;
    }
  }
}
</style>
