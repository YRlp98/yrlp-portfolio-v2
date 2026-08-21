<template>
  <div class="education-container">
    <div class="education">
      <HomeTitle :title="$t('education')" />
      <div class="education-carts">
        <div class="firstColumn">
          <IconListCard class="iconListCard" :title="$t('homePageEducationAssociate')"
            :description="$t('homePageEducationAssociateDate')" link="https://mkz.tvu.ac.ir/" />
        </div>
        <div class="secondColumn">
          <IconListCard class="iconListCard" :title="$t('homePageEducationBachelor')"
            :description="$t('homePageEducationBachelorDate')" link="https://mkz.tvu.ac.ir/" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeTitle from "./HomeTitle.vue";
import TitleSubCard from "~/components/widgets/TitleSubCard.vue";
import IconListCard from "~/components/widgets/IconListCard.vue";

export default {
  name: "Education",
  components: {
    HomeTitle,
    TitleSubCard,
    IconListCard,
  },
};
</script>

<style lang="scss" scoped>
.education-container {
  .education {
    display: flex;
    flex-direction: column;

    .education-carts {
      margin-top: 40px;

      .iconListCard {
        margin-top: 40px;
        transition: transform 0.4s ease-in-out;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}

// Tablet
@include mediaQueryMin("md") {
  .education-container {
    .education-carts {
      display: flex;
      flex-direction: row-reverse;

      .firstColumn {
        display: flex;
        flex-direction: column;
      }

      .secondColumn {
        position: absolute;
        margin-left: 50%;
        margin-right: 50%;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>