<template>
  <div class="skillProgress-container">
    <div class="skillProgress-title">
      <h4>. {{ skill.title }}</h4>
      <SkillHelp :skill="skill" />
    </div>
  </div>
</template>

<script>
import SkillHelp from "~/components/widgets/SkillHelp.vue";

export default {
  name: "SkillSimple",
  components: { SkillHelp },
  props: {
    skill: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>