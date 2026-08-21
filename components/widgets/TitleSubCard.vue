<template>
  <div class="titleSubCard-container">
    <div class="titleSubCard">
      <h4>{{ title }}</h4>
      <div class="descriptiont">
        <!-- <img src="/icons/calendar_gray.svg" /> -->
        <img :src="`/icons/${icon}.svg`" :alt="icon"/>
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleSubCard",
  props: {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      default: "calendar_gray",
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.titleSubCard-container {
  display: flex;
  justify-content: flex-end;

  .titleSubCard {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  h4 {
    font-size: 1.063rem;
    color: white;
    text-align: right;
    min-width: 300px;
  }
  .descriptiont {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 5px;

    img {
      height: 15px;
      width: 15px;
      margin-left: 5px;
    }

    p {
      font-size: 0.75rem;
      color: var(--gray-1);
    }
  }
}
</style>