<template>
  <div class="skillProgress-container">
    <div class="skillProgress-title">
      <h4>. {{ skill.title }}</h4>
      <a :href="skill.link" target="_blank" rel="noopener noreferrer" :aria-label="$t('aboutSkill', { skill: skill.title })">
        <AppImage src="/icons/question_icon.svg" alt="" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkillSimple",
  props: {
    skill: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>