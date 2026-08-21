<template>
  <div class="iconTitle-container">
    <div :style="style" class="icon-background">
      <img :src="`/icons/${icon}.svg`" :alt="alt" />
    </div>
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: "IconTitle",
  props: {
    color: {
      type: String,
      default: "#a0d039",
    },
    icon: {
      type: String,
      required: false,
    },
    alt: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
      default: "Title",
    },
  },
  computed: {
    style() {
      return {
        "background-color": this.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.iconTitle-container {
  display: flex;
  flex-direction: column;

  .icon-background {
    width: 30px;
    height: 30px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 18px;
      height: 18px;
    }
  }

  h2 {
    margin-top: 10px;
    font-size: 1.563;
    color: var(--gray-1);
  }
}
</style>