<template>
  <div class="projects-container" id="homeProjects">
    <h2 :style="{ textAlign: `${changeAlign(activeLang)}` }">
      {{ $t("projects") }}
    </h2>
    <div class="projects">
      <div class="projects-cards">
        <ProjectCard class="projectCard" v-for="project in projects" :key="project.id" :project="project" />
      </div>
      <div>
        <TextOnlyButton :text="$t('viewAll')" link="/projects" class="textOnlyButton" />
      </div>
    </div>
    <TitleBackground title="Projects" class="titleBackground" />
  </div>
</template>

<script>
import ProjectCard from "../../widgets/ProjectCard.vue";
import TitleBackground from "../../../components/backgrounds/TitleBackground.vue";
import TextOnlyButton from "../../widgets/TextOnlyButton.vue";

import projects from "~/data/projects.json";

export default {
  name: "Projects",
  components: {
    ProjectCard,
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
      projects: projects.slice(0, 6),
    };
  },
};
</script>

<style lang="scss" scoped>
.projects-container {
  position: relative;

  h1 {
    font-size: 28px;
    color: var(--gray-1);
    text-align: right;
  }

  .projects {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .projects-cards {
      margin-top: 40px;
      margin-bottom: 40px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      width: 100%;
      justify-content: center;

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

  .titleBackground {
    z-index: 1;
    left: -1.25rem;
    top: -4rem;
    transform: rotate(-90deg) translateX(-100%);
    transform-origin: top left;
  }
}

@media (min-width: 90rem) {
  .projects-container .titleBackground {
    left: -7.5rem;
    top: 1.25rem;
  }
}
</style>