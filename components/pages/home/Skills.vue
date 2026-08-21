<template>
  <div class="skills-container" id="homeSkills">
    <div class="main-skills-container default-margin">
      <h2 :style="{ textAlign: `${changeAlign(activeLang)}` }">
        {{ $t("homePageSkillsMain") }}
      </h2>
      <div class="main-skills">
        <!-- Web -->
        <div class="skills">
          <IconTitle class="iconTitle" color="#a0d039" icon="web" alt="web" title="Web" />
          <SkillProgress class="skillProgress" v-for="skill in webSkills" :key="skill.id" :skill="skill"
            color="#a0d039" />
        </div>
        <!-- UI/UX -->
        <div class="skills">
          <IconTitle class="iconTitle" color="#65d7bb" icon="uiux" alt="UI/UX Design" title="UI/UX Design" />
          <SkillProgress class="skillProgress" v-for="skill in uiSkills" :key="skill.id" :skill="skill"
            color="#65d7bb" />
        </div>
      </div>
    </div>
    <div class="other-skills-container default-margin">
      <h2 :style="{ textAlign: `${changeAlign(activeLang)}` }">
        {{ $t("homePageSkillsOther") }}
      </h2>
      <div class="other-skills">
        <!-- Software engineering -->
        <div class="skills">
          <IconTitle class="iconTitle" color="#a98ff3" icon="software_engineering" alt="Software engineering"
            title="Software engineering" />
          <SkillSimple class="skillSimple" v-for="skill in softwareSkills" :key="skill.id" :skill="skill" />
        </div>
        <!-- Mobile -->
        <div class="skills">
          <IconTitle class="iconTitle" color="#FF4E4E" icon="mobile" alt="Mobile" title="Mobile" />
          <SkillSimple class="skillSimple" v-for="skill in mobileSkills" :key="skill.id" :skill="skill" />
        </div>
        <!-- Others -->
        <div class="skills">
          <IconTitle class="iconTitle" color="#E5D64C" icon="others" alt="Others" title="Others" />
          <SkillSimple class="skillSimple" v-for="skill in othersSkills" :key="skill.id" :skill="skill" />
        </div>
        <!-- Languages -->
        <div class="skills">
          <IconTitle class="iconTitle" color="#279BDD" icon="language" alt="languages" title="languages" />
          <div class="languages lanMargin">
            <h4>. Persian</h4>
            <p>(Native)</p>
          </div>
          <div class="languages">
            <h4>. English</h4>
            <p>(B2)</p>
          </div>
        </div>
      </div>
    </div>
    <div class="titleBackground-anchor default-margin">
      <TitleBackground class="titleBackground" title="skills" />
    </div>
  </div>
</template>


<script>
import IconTitle from "../../widgets/iconTitle.vue";
import SkillProgress from "./SkillProgress.vue";
import SkillSimple from "./SkillSimple.vue";
import TitleBackground from "../../backgrounds/TitleBackground.vue";

export default {
  name: "Skills",
  components: {
    IconTitle,
    SkillProgress,
    SkillSimple,
    TitleBackground,
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
      webSkills: [
        {
          title: "HTML",
          width: "90",
          link: "https://en.wikipedia.org/wiki/HTML",
        },
        {
          title: "CSS",
          width: "90",
          link: "https://en.wikipedia.org/wiki/CSS",
        },
        {
          title: "Vue.js",
          width: "90",
          link: "https://en.wikipedia.org/wiki/Vue.js",
        },
        {
          title: "Nuxt.js",
          width: "90",
          link: "https://en.wikipedia.org/wiki/Nuxt.js",
        },
        {
          title: "JavaScript",
          width: "80",
          link: "https://en.wikipedia.org/wiki/JavaScript",
        },
        {
          title: "TypeScript",
          width: "70",
          link: "https://www.typescriptlang.org/",
        },
        {
          title: "Node.js",
          width: "40",
          link: "https://en.wikipedia.org/wiki/Node.js",
        },
      ],
      uiSkills: [
        {
          title: "Figma",
          width: "90",
          link: "https://en.wikipedia.org/wiki/Figma_(software)",
        },
        {
          title: "Adobe XD",
          width: "90",
          link: "https://en.wikipedia.org/wiki/Adobe_XD",
        },
        {
          title: "Adobe Photoshop",
          width: "80",
          link: "https://en.wikipedia.org/wiki/Adobe_Photoshop",
        },
        {
          title: "Adobe Illustrator",
          width: "50",
          link: "https://en.wikipedia.org/wiki/Adobe_Illustrator",
        },
        {
          title: "Adobe Premiere Pro",
          width: "50",
          link: "https://www.adobe.com/products/premiere.html",
        },
      ],
      softwareSkills: [
        {
          title: "Agile",
          link: "https://en.wikipedia.org/wiki/Agile_software_development",
        },
        {
          title: "Scrum",
          link: "https://en.wikipedia.org/wiki/Scrum_(software_development)",
        },
      ],
      mobileSkills: [
        {
          title: "Flutter",
          link: "https://en.wikipedia.org/wiki/Flutter_(software)",
        },
        {
          title: "Dart",
          link: "https://en.wikipedia.org/wiki/Dart_(programming_language)",
        },
        {
          title: "Java",
          link: "https://en.wikipedia.org/wiki/Java_(programming_language)",
        },
        {
          title: "XML",
          link: "https://en.wikipedia.org/wiki/XML",
        },
      ],
      othersSkills: [
        {
          title: "Git",
          link: "https://en.wikipedia.org/wiki/Git",
        },
        {
          title: "REST API",
          link: "https://en.wikipedia.org/wiki/Representational_state_transfer",
        },
        {
          title: "Linux",
          link: "https://en.wikipedia.org/wiki/Linux",
        },
        {
          title: "SEO",
          link: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
        },
        {
          title: "Performance Optimization",
          link: "https://web.dev/learn/performance",
        },
      ],
    };
  },
};
</script>


<style lang="scss" scoped>
.skills-container {
  padding: 9% 0;
  background: url("../../../assets/images/wave3.svg") top / 100% auto,
    url("../../../assets/images/wave1.svg") bottom/100% auto,
    linear-gradient(var(--gray-3), var(--gray-3)) content-box;
  background-repeat: no-repeat;

  position: relative;
  display: flex;
  flex-direction: column;
  position: relative;

  .main-skills-container {
    margin-top: 60px;
    margin-bottom: 60px;

    .main-skills {
      margin-top: 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-right: 50%;
    }
  }

  .other-skills-container {
    margin-top: 60px;
    margin-bottom: 60px;

    .other-skills {
      margin-top: 40px;
      display: flex;
      flex-wrap: wrap;
      justify-tracks: flex-end;
      justify-content: space-between;

      .skills {
        margin: 0 5px;
      }
    }
  }

  h2 {
    font-size: 28px;
    color: var(--gray-1);
    text-align: right;
  }

  .skills {
    z-index: 2;
    margin-top: 20px;

    .iconTitle {
      margin-top: 40px;
    }

    .skillProgress {
      margin-top: 20px;
    }

    .skillSimple {
      margin-top: 10px;
    }

    .lanMargin {
      margin-top: 10px;
    }

    .languages {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-bottom: 6px;

      h4 {
        font-size: 1.125rem;
        color: var(--color-text);
      }

      p {
        font-size: 0.75rem;
        color: var(--color-text-muted);
        margin-left: 5px;
      }
    }
  }

  .titleBackground-anchor {
    position: absolute;
    inset: 0;
    pointer-events: none;

    .titleBackground {
      z-index: 1;
      left: -1.25rem;
      top: 6rem;
      transform: rotate(-90deg) translateX(-100%);
      transform-origin: top left;
    }
  }
}

:global(html[data-theme="light"] .skills-container) {
  background-image: url("../../../assets/images/wave3-light.svg"),
    url("../../../assets/images/wave1-light.svg"),
    linear-gradient(var(--color-surface), var(--color-surface));
}

@media (min-width: 90rem) {
  .skills-container .titleBackground-anchor .titleBackground {
    left: -7.5rem;
    top: 16rem;
  }
}
</style>