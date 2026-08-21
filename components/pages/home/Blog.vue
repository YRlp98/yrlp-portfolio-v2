<template>
  <div class="blog-container" id="homeBlog">
    <h2 :style="{ textAlign: `${changeAlign(activeLang)}` }">
      {{ $t("blog") }}
    </h2>
    <div class="blog">
      <div class="blog-cards">
        <BlogCard class="blogCard" v-for="blog in blogs" :key="blog.id" :blog="blog" />
      </div>
      <div>
        <TextOnlyButton :text="$t('viewAll')" link="/blog" class="textOnlyButton" />
      </div>
    </div>
    <TitleBackground title="Blog" class="titleBackground" />
  </div>
</template>


<script>
import BlogCard from "../../widgets/BlogCard.vue";
import TitleBackground from "../../../components/backgrounds/TitleBackground.vue";
import TextOnlyButton from "../../widgets/TextOnlyButton.vue";

import blogs from "~/data/blogs.json";

export default {
  name: "Blog",
  components: {
    BlogCard,
    TitleBackground,
    TextOnlyButton,
  },
  setup() {
    const { changeAlign } = useDirection()
    const i18n = useI18n()
    return {
      changeAlign,
      activeLang: computed(() => i18n.locale.value),
    }
  },
  data() {
    return {
      blogs: blogs.slice(0, 3),
    };
  },
};
</script>

<style lang="scss" scoped>
.blog-container {
  position: relative;

  h1 {
    font-size: 28px;
    color: var(--gray-1);
    text-align: right;
  }

  .blog {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .blog-cards {
      margin-top: 40px;
      margin-bottom: 40px;
      display: grid;
      direction: rtl;
      grid-template-columns: 1fr;
      gap: 20px;
      justify-content: center;

      .blogCard {
        width: 100%;
      }

      @include mediaQueryMin("md") {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @include mediaQueryMin("xl") {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
  }

  .titleBackground {
    z-index: 1;
    left: -1.25rem;
    top: -4rem;
    transform: rotate(-90deg) translateX(-100%);
    transform-origin: top left;
  }
}

@media (min-width: 90rem) {
  .blog-container .titleBackground {
    left: -7.5rem;
    top: -2rem;
  }
}
</style>