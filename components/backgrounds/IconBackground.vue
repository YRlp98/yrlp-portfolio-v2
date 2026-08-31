<template>
  <section ref="iconBackground" :class="{ 'is-ready': isReady }" aria-hidden="true">
    <div class="icon-field" :style="fieldStyle">
      <div class="row" v-for="row in rows" :key="row.id">
        <i v-for="icon in row.icons" :key="icon.id" :class="icon.className" aria-hidden="true"></i>
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
  "fa-solid fa-music",
  "fa-regular fa-face-smile",
];

const ROTATION_RADIANS = Math.PI / 6;
const INITIAL_ROW_COUNT = 10;
const INITIAL_COLUMN_COUNT = 12;

const shuffle = (items) => {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
};

const createRows = (rowCount, columnCount, iconOrder = icons) =>
  Array.from({ length: rowCount }, (_, rowIndex) => ({
    id: `row-${rowIndex}`,
    icons: Array.from({ length: columnCount }, (_, iconIndex) => ({
      id: `row-${rowIndex}-icon-${iconIndex}`,
      className: iconOrder[(rowIndex * 7 + iconIndex) % iconOrder.length],
    })),
  }));

export default {
  name: "IconBackground",
  data() {
    return {
      rows: createRows(INITIAL_ROW_COUNT, INITIAL_COLUMN_COUNT),
      iconOrder: icons,
      rowCount: INITIAL_ROW_COUNT,
      columnCount: INITIAL_COLUMN_COUNT,
      fieldWidth: 960,
      fieldHeight: 960,
      isReady: false,
      resizeObserver: null,
      resizeFrame: null,
    };
  },
  computed: {
    fieldStyle() {
      return {
        "--field-width": `${this.fieldWidth}px`,
        "--field-height": `${this.fieldHeight}px`,
        "--icon-row-count": this.rowCount,
        "--icon-column-count": this.columnCount,
      };
    },
  },
  async mounted() {
    this.iconOrder = shuffle(icons);
    this.rows = createRows(this.rowCount, this.columnCount, this.iconOrder);
    this.updateLayout();

    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(this.queueLayoutUpdate);
      this.resizeObserver.observe(this.$refs.iconBackground);
    } else {
      window.addEventListener("resize", this.queueLayoutUpdate, { passive: true });
    }

    await this.$nextTick();

    try {
      if (document.fonts?.load) {
        await Promise.all([
          document.fonts.load('900 1em "Font Awesome 6 Free"'),
          document.fonts.load('400 1em "Font Awesome 6 Brands"'),
        ]);
      }
    } catch {
      // Reveal the decorative background even if a browser cannot load a font.
    }

    requestAnimationFrame(() => {
      this.isReady = true;
    });
  },
  beforeUnmount() {
    this.resizeObserver?.disconnect();
    window.removeEventListener("resize", this.queueLayoutUpdate);

    if (this.resizeFrame) {
      cancelAnimationFrame(this.resizeFrame);
    }
  },
  methods: {
    queueLayoutUpdate() {
      if (this.resizeFrame) {
        cancelAnimationFrame(this.resizeFrame);
      }

      this.resizeFrame = requestAnimationFrame(() => {
        this.updateLayout();
        this.resizeFrame = null;
      });
    },
    updateLayout() {
      const element = this.$refs.iconBackground;

      if (!element) {
        return;
      }

      const { width, height } = element.getBoundingClientRect();

      if (!width || !height) {
        return;
      }

      // A rotated field needs both viewport axes included to cover every corner.
      const cosine = Math.cos(ROTATION_RADIANS);
      const sine = Math.sin(ROTATION_RADIANS);
      const cellSize = Math.min(88, Math.max(64, width * 0.04 + 20));
      const fieldWidth = Math.ceil(width * cosine + height * sine + cellSize * 2);
      const fieldHeight = Math.ceil(width * sine + height * cosine + cellSize * 2);
      const columnCount = Math.max(8, Math.ceil(fieldWidth / cellSize) + 1);
      const rowCount = Math.max(8, Math.ceil(fieldHeight / (cellSize * 1.15)) + 1);

      this.fieldWidth = fieldWidth;
      this.fieldHeight = fieldHeight;

      if (rowCount !== this.rowCount || columnCount !== this.columnCount) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        this.rows = createRows(rowCount, columnCount, this.iconOrder);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  position: absolute;
  inset: 0;
  z-index: 99;
  overflow: hidden;
  visibility: hidden;

  &.is-ready {
    visibility: visible;
  }
}

.icon-field {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--field-width);
  height: var(--field-height);
  display: grid;
  grid-template-rows: repeat(var(--icon-row-count), minmax(0, 1fr));
  transform: translate(-50%, -50%) rotate(-30deg);
}

.row {
  display: grid;
  grid-template-columns: repeat(var(--icon-column-count), minmax(0, 1fr));
  align-items: center;

  i {
    min-width: 0;
    color: var(--color-hero-glyph);
    font-size: clamp(2.75rem, 4vw, 4rem);
    line-height: 1;
    text-align: center;
    opacity: 0.5;
    transition: color 1s, text-shadow 1s;
    user-select: none;
    cursor: default;

    &:hover {
      color: var(--green-1);
      text-shadow: 0 0 120px var(--green-1);
      transition-duration: 0s;
    }
  }
}
</style>