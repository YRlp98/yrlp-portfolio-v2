<template>
  <div class="iconListCard-container">
    <a class="iconListCard" :href="link" target="_blank">
      <div class="icon">
        <img src="/icons/education.svg" alt="education icon" />
      </div>
      <TitleSubCard
        class="titleSubCard"
        :title="title"
        :description="description"
      />
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

  .iconListCard {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;

    .icon {
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
      margin-right: 15px;
    }
  }
}
</style>