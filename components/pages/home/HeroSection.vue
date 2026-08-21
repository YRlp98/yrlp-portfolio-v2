<template>
	<div class="heroSection-container" :class="{ 'is-ltr': activeLang === 'en' }" id="#homeHeroSection">
		<div class="heroSection-content" :style="{ direction: `${changeDirection(activeLang)}` }">
			<div class="heroSection-welcome" ref="heroWelcome">
				<div class="heroTitle">
					{{ $t("homePageHello") }} <br />
					<div>{{ $t("homePageMy") }} <h1>{{ $t("homePageName") }}</h1>
					</div>
				</div>
				<span></span>
				<h2>{{ $t("homePageJobTitleP1") }} {{ $t("homePageJobTitleP2") }}</h2>
				<h2></h2>
			</div>
			<ScrollIcon class="scrollIcon" />
		</div>
		<IconBackground ref />
	</div>
</template>

<script>
import ScrollIcon from "../../icons/ScrollIcon.vue";
import IconBackground from "../../backgrounds/IconBackground.vue";

export default {
	name: "HeroSection",
	components: {
		ScrollIcon,
		IconBackground,
	},
	setup() {
		const { changeDirection } = useDirection()
		const i18n = useI18n()
		return {
			changeDirection,
			activeLang: computed(() => i18n.locale.value),
		}
	},
	data() {
		return {
		};
	},
	mounted() {
		if (import.meta.client) {
			this.$nextTick(() => {
				this.$gsap.from(this.$refs.heroWelcome.children, {
					opacity: 0,
					y: 100,
					duration: 1,
					ease: "back.out(1.7)",
					stagger: 0.2,
				});
			});
		}
	},
};
</script>

<style lang="scss" scoped>
.heroSection-container {
	position: relative;
	width: 100%;
	height: 120vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	direction: rtl;
	background: var(--gray-3);

	.heroSection-welcome {
		position: relative;
		bottom: 15vh;
		z-index: 101;
		pointer-events: none;

		.heroTitle {
			color: var(--color-text);
			font-weight: normal;
			font-size: 25px;

			div {
				font-size: 50px;
				font-weight: normal;
				margin-right: 8px;
				display: inline;

				h1 {
					font-size: 50px;
					font-weight: bold;
					margin: 0;
				}
			}
		}

		h2 {
			padding-top: 20px;
			font-size: 24px;
			line-height: 20px;
			color: var(--green-1);
		}
	}

	.scrollIcon {
		top: 90vh;
		transform: scale(0.65);
		z-index: 101;
	}
}

.heroSection-container.is-ltr {
	direction: ltr;

	.heroSection-welcome .heroTitle div {
		margin-right: 0;
		margin-left: 8px;
	}
}

// Tablet
@include mediaQueryMin("md") {
	.heroSection-container {
		.heroSection-welcome {
			h1 {
				display: inline-block;
				margin: 0 3px;
			}

			span {
				display: block;
			}

			h2 {
				display: inline-block;
				margin: 0 3px;
			}
		}
	}
}
</style>