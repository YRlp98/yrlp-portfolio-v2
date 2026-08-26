<template>
  <a :href="project.link" target="_blank" rel="noopener noreferrer" class="projectCard-container">
    <img :src="project.image" :alt="project.alt" loading="lazy" decoding="async" />
    <div class="projectCard-info">
      <h2>{{ project.title }}</h2>
      <div class="projectCard-tags">
        <div class="tags" v-for="tag in project.tags" :style="{ backgroundColor: tag.color }" :key="tag">
          {{ tag.value }}
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    project: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.projectCard-container {
  width: 100%;
  height: 215px;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 22px;
  background: transparent;
  position: relative;
  display: flex;
  align-items: flex-end;
  transition: transform 0.4s ease;
  box-shadow: 0px 7px 10px rgba(black, 0.5);
  text-decoration: none;
  z-index: 9;

  &:hover {
    transform: translateY(10px);

    img {
      filter: blur(3px);
    }

    &:before {
      opacity: 1;
    }

    .projectCard-info {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background: rgba(black, 0.6);
    filter: blur(3px);
    z-index: 2;
    transition: 0.5s;
    opacity: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5px;
    transition: filter 0.4s ease;
  }

  .projectCard-info {
    position: relative;
    z-index: 3;
    color: white;
    opacity: 0;
    transform: translateY(30px);
    transition: 0.5s;

    h2 {
      font-size: 1.5rem;
      color: white;
    }

    .projectCard-tags {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-top: 2.5px;

      .tags {
        font-size: 0.875rem;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-right: 8.5px;
        padding: 1px 3px 0px 3px;
      }
    }
  }
}
</style>