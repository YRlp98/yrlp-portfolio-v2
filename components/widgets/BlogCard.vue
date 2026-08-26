<template>
  <a :href="blog.link" target="_blank" rel="noopener noreferrer" class="blogCard-container">
    <div class="blogCard">
      <img :src="blog.image" :alt="blog.alt" loading="lazy" decoding="async" />
      <div class="blogCard-info">
        <h2>{{ blog.title }}</h2>
        <p>{{ blog.description }}</p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "BlogCard",
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.blogCard-container {
  position: relative;
  width: 100%;
  height: 400px;
  box-sizing: border-box;
  border-radius: 5px;
  background: transparent;
  display: flex;
  flex-direction: column;
  transition: transform 0.4s ease;
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-card);
  text-decoration: none;
  z-index: 9;
  border-radius: 5px;

  &:hover {
    transform: translateY(10px);
  }

  .blogCard {
    img {
      width: 100%;
      height: 225px;
      object-fit: cover;
      border-radius: 5px 5px 0 0;
    }

    .blogCard-info {
      width: 100%;
      box-sizing: border-box;
      padding: 20px 20px;
      text-align: right;
      z-index: 9;

      h2 {
        color: var(--color-text);
        font-size: 1.375rem;
        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 90%;
        direction: rtl;
      }

      p {
        margin-top: 20px;
        font-size: 1rem;
        color: var(--gray-1);
        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 90%;
        direction: rtl;
      }
    }
  }
}
</style>