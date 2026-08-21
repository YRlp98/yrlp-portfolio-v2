<template>
  <section>
    <div class="rep" v-for="(repeat, repeatIndex) in rows" :key="repeatIndex">
      <div class="row" v-for="(row, rowIndex) in repeat" :key="rowIndex">
        <div>
          <i v-for="(icon, iconIndex) in row" :key="`${repeatIndex}-${rowIndex}-${iconIndex}`" :class="icon"
            aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const icons = [
  "fa-solid fa-bug",
  "fa-solid fa-coffee",
  "fa-solid fa-code-branch",
  "fa-brands fa-apple",
  "fa-solid fa-graduation-cap",
  "fa-solid fa-laptop",
  "fa-solid fa-language",
  "fa-brands fa-figma",
  "fa-solid fa-paintbrush",
  "fa-solid fa-code",
  "fa-solid fa-rocket",
  "fa-solid fa-life-ring",
  "fa-solid fa-terminal",
  "fa-brands fa-square-js",
  "fa-brands fa-vuejs",
  "fa-brands fa-android",
  "fa-solid fa-gamepad",
  "fa-brands fa-git-alt",
  "fa-brands fa-hooli",
  "fa-brands fa-pied-piper-pp",
  "fa-solid fa-database",
  "fa-brands fa-microsoft",
  "fa-solid fa-pizza-slice",
  "fa-brands fa-stack-overflow",
  "fa-solid fa-desktop",
  "fa-brands fa-css3-alt",
  "fa-solid fa-tablet",
  "fa-brands fa-html5",
  "fa-brands fa-chrome",
  "fa-brands fa-firefox-browser",
  "fa-brands fa-safari",
  "fa-brands fa-discord",
  "fa-brands fa-telegram",
  "fa-brands fa-slack",
  "fa-solid fa-envelope",
  "fa-brands fa-dribbble",
  "fa-brands fa-github",
  "fa-brands fa-spotify",
  "fa-brands fa-youtube",
  "fa-solid fa-mobile-screen-button",
  "fa-brands fa-tailwind-css",
  "fa-brands fa-yahoo",
  "fa-brands fa-steam",
];

const shuffle = (items) => {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
};

const createRows = (randomize = false) =>
  Array.from({ length: 10 }, (_, repeatIndex) =>
    Array.from({ length: 4 }, (_, rowIndex) => {
      const row = Array.from(
        { length: 56 },
        (_, iconIndex) => icons[(repeatIndex * 4 + rowIndex + iconIndex) % icons.length],
      );

      return randomize ? shuffle(row) : row;
    }),
  );

export default {
  name: "IconBackground",
  data() {
    return {
      rows: createRows(),
    };
  },
  mounted() {
    this.rows = createRows(true);
  },
};
</script>

<style lang="scss" scoped>
section {
  position: absolute;
  inset: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .row {
    position: relative;
    top: -250%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    white-space: nowrap;
    font-size: 4rem;
    transform: rotate(-30deg);

    i {
      color: rgba(0, 0, 0, 0.5);
      opacity: 0.5;
      transition: 1s;
      padding: 0 5px;
      user-select: none;
      cursor: default;


      &:hover {
        transition: 0s;
        color: var(--green-1);
        text-shadow: 0 0 120px var(--green-1);
      }
    }

    // Animation:
    // div {
    //   animation: animate1 125s linear infinite;
    //   animation-delay: none;
    // }

    // @keyframes animate1 {
    //   0% {
    //     transform: translateX(0%);
    //   }

    //   100% {
    //     transform: translateX(-10%);
    //   }
    // }
  }
}
</style>