<template>
  <nuxt-link class="textOnlyButton" :to="$localePath(link)">{{ text }}</nuxt-link>
</template>


<script>
export default {
  name: "TextOnlyButton",
  props: {
    text: {
      type: String,
      required: true,
      default: "Button",
    },
    link: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.textOnlyButton {
  position: relative;
  z-index: 2;
  display: inline-block;
  text-decoration: none;
  color: white;
  background-color: var(--gray-3);
  padding: 16px 32px;
  padding-bottom: 14px; // To fix font padding issue
  border-radius: 5px;
  transition: color 0.5s ease-in, transform 0.5s ease-in, box-shadow 0.5s ease-in;

  &:hover {
    color: var(--green-1);
    transform: scale(1.1);
    box-shadow: 0 4px 90px 1px rgba(53, 233, 37, 0.25);
  }
}
</style>
