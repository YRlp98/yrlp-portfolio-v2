<template>
  <div class="imageListCard-container">
    <a class="imageListCard" :href="link" target="_blank" rel="noopener noreferrer">
      <div class="image">
        <img :src="imageUrl" :alt="imageAlt" width="50" height="50" loading="lazy" decoding="async" />
      </div>
      <TitleSubCard class="titleSubCard" :title="title" :description="description" icon="line" />
    </a>
  </div>
</template>


<script>
import TitleSubCard from "~/components/widgets/TitleSubCard.vue";

export default {
  name: "ImageListCard",
  components: {
    TitleSubCard,
  },
  props: {
    link: {
      type: String,
      required: false,
      default: "/",
    },
    imageUrl: {
      type: String,
      required: true,
      default: "https://s21.picofile.com/file/8444387576/xeniac_logo.png",
    },
    imageAlt: {
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
.imageListCard-container {
  display: flex;
  justify-content: flex-end;

  .imageListCard {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    transition: filter 0.3s ease, opacity 0.3s ease;

    &:hover {
      filter: drop-shadow(0 0 0.75rem rgba(53, 233, 37, 0.45));
      opacity: 0.95;
    }

    img {
      height: 50px;
      width: 50px;
      border-radius: 4px;
    }

    .titleSubCard {
      margin-right: 15px;
    }
  }
}
</style>