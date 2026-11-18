<template>
  <div class="titleSubCard-container">
    <div class="titleSubCard">
      <h4>{{ title }}</h4>
      <div class="descriptiont">
        <AppImage :src="`/icons/${icon}.svg`" alt="" />
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
  min-inline-size: 0;
  max-inline-size: 100%;
  overflow-wrap: anywhere;

  .titleSubCard {
    display: flex;
    min-inline-size: 0;
    flex-direction: column;
    align-items: flex-end;
  }

  h4 {
    font-size: 1.063rem;
    color: var(--color-text);
    text-align: right;
    max-inline-size: 100%;
  }

  .descriptiont {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 5px;

    img {
      flex: 0 0 15px;
      height: 15px;
      width: 15px;
      margin-left: 5px;
      filter: var(--icon-monochrome-filter);
    }

    p {
      min-inline-size: 0;
      font-size: 0.75rem;
      color: var(--gray-1);
    }
  }
}
</style>
