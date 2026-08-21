<template>
  <div class="projects-container default-margin" :style="{ direction: `${changeDirection(activeLang)}` }">
    <h1 class="title">{{ $t("projects") }}</h1>
    <div class="filter" :style="{ direction: `${changeDirection(activeLang)}` }">
      <p>{{ $t("show") }}:</p>
      <ul>
        <li v-for="(tag, index) in tags" :key="index" :style="{
          color:
            activeTag === tag.key
              ? tag.color
              : null,
          fontWeight: activeTag === tag.key ? 'bold' : 'regular',
        }" @click="onClick(tag.key)">
          {{ tag.name }}
        </li>
      </ul>
    </div>
    <div class="projects-cards">
      <ProjectCard class="projectCard" v-for="project in filterdProjects" :key="project.id" :project="project" />
    </div>
  </div>
</template>

<script>
import ProjectCard from "~/components/widgets/ProjectCard.vue";
import projects from "~/data/projects.json";

export default {
  name: "projects",
  components: { ProjectCard },
  setup() {
    const route = useRoute()
    const { changeDirection } = useDirection()
    const i18n = useI18n()
    const canonicalUrl = computed(() => 'https://yrlp.ir' + route.path)

    useHead({
      title: 'Yousef Roshandel - Projects',
      meta: [
        { name: 'description', content: 'Yousef Roshandel is a passionate Front-End Developer and UI/UX Designer creating modern, user-friendly websites and digital experiences.' },
        { property: 'og:title', content: 'Yousef Roshandel - Projects' },
        { property: 'og:description', content: 'Yousef Roshandel is a passionate Front-End Developer and UI/UX Designer creating modern, user-friendly websites and digital experiences.' },
        { property: 'og:url', content: () => canonicalUrl.value },
      ],
      link: [
        { rel: 'canonical', href: () => canonicalUrl.value },
      ],
    })

    return {
      changeDirection,
      activeLang: computed(() => i18n.locale.value),
    }
  },

  data() {
    return {
      projects,
      activeTag: "All",
    };
  },
  methods: {
    onClick(tag) {
      this.activeTag = tag;
    },
    getActiveTagProperties(tag) {
      return this.tags.find((_tag) => {
        return _tag.name === this.$t(this.activeTag);
      });
    },
  },
  computed: {
    tags() {
      return [
        { key: "All", name: this.$t("All"), color: "#ffffff" },
        { key: "Designing", name: this.$t("Designing"), color: "#FB4B8A" },
        { key: "Web", name: this.$t("Web"), color: "#4D848B" },
        { key: "Mobile", name: this.$t("Mobile"), color: "#38AF76" },
        { key: "Others", name: this.$t("Others"), color: "#FB4B4B" },
      ];
    },
    filterdProjects: function () {
      if (this.activeTag === "All") {
        return this.projects;
      }
      return this.projects.filter((project) => {
        let found = false;
        project.tags.filter((indexTag) => {
          found = indexTag.value === this.activeTag;
        });
        return found;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.projects-container {
  display: flex;
  flex-direction: column;
  direction: rtl;
  padding-bottom: 50px;

  .title {
    margin-top: 250px;
    font-size: 2.125rem;
    font-weight: bold;
    color: var(--gray-1);
  }

  .filter {
    display: flex;
    margin-top: 25px;
    direction: rtl;

    p {
      color: var(--gray-1);
      font-size: 1rem;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      justify-content: space-between;
      align-content: center;
      color: var(--gray-1);
      font-size: 1rem;

      li {
        margin: 0 10px;
        padding: 0px 5px;
        border-radius: 5px;
        user-select: none;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;

        &:hover {
          background-color: var(--green-1);
          color: var(--gray-2);
        }
      }
    }
  }

  .projects-cards {
    margin-top: 80px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    .projectCard {
      width: 100%;

      // Tablet
      @include mediaQueryMin("md") {
        height: min(245px);
      }
    }

    @include mediaQueryMin("md") {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include mediaQueryMin("xl") {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
}
</style>