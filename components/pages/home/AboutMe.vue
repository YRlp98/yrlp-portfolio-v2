<template>
	<div class="aboutMe-container" id="homeAboutMe">
		<h2 class="aboutMe-title" :style="{ textAlign: `${changeAlign(activeLang)}` }">
			{{ $t("homePageAboutMe") }}
		</h2>
		<div class="aboutMe-avatar">
			<img src="https://lixbjgupmbwyplqhzkde.supabase.in/storage/v1/object/sign/yrlp-storage/Images/Yousef_Roshandel.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ5cmxwLXN0b3JhZ2UvSW1hZ2VzL1lvdXNlZl9Sb3NoYW5kZWwud2VicCIsImlhdCI6MTYzODE5OTg4NSwiZXhwIjoxOTUzNTU5ODg1fQ.VKVFopNxk-Ewlr32JwQdmybEs9oPvsxP5OXNZrxjBNs"
				alt="Yousef Roshandel" />
			<div class="square"></div>
		</div>
		<p class="aboutMe-text" :style="{ direction: `${changeDirection(activeLang)}` }">
			{{ $t("homePageAboutMeText") }}
		</p>
		<AboutMeInfo class="aboutMeInfo" />
		<SocialNetwork class="socialNetwork" />
		<TitleBackground class="titleBackground" title="about me" />
	</div>
</template>

<script>
import AboutMeInfo from "./AboutMeInfo.vue";
import SocialNetwork from "../../widgets/SocialNetwork.vue";
import TitleBackground from "../../backgrounds/TitleBackground.vue";

export default {
	name: "AboutMe",
	components: {
		AboutMeInfo,
		SocialNetwork,
		TitleBackground,
	},
	setup() {
		const { changeDirection, changeAlign } = useDirection()
		const i18n = useI18n()
		return {
			changeDirection,
			changeAlign,
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
				this.$gsap.from(".aboutMe-avatar", {
					opacity: 0,
					y: 100,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".aboutMe-container",
						start: "top bottom",
						scrub: 1,
						toggleActions: "play none none pause",
					},
				});

				this.$gsap.from(".square", {
					opacity: 0,
					scale: 0.5,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".aboutMe-container",
						start: "top bottom",
						scrub: 1,
						toggleActions: "play none none pause",
					},
				});

				this.$gsap.from(".aboutMe-title", {
					duration: 2.5,
					ease: "slow(0.7,0.7,false)",
					y: -10,
					scrollTrigger: {
						trigger: ".aboutMe-container",
						scrub: 1,
						toggleActions: "play none none pause",
					},
				});

				this.$gsap.from(".aboutMeInfo", {
					duration: 2.5,
					ease: "slow(0.7,0.7,false)",
					x: -50,
					scrollTrigger: {
						trigger: ".aboutMe-container",
						start: "top center",
						scrub: 1,
						toggleActions: "play none none pause",
					},
				});

				this.$gsap.from(".socialNetwork", {
					duration: 2.5,
					ease: "slow(0.7,0.7,false)",
					x: 50,
					scrollTrigger: {
						trigger: ".aboutMe-container",
						start: "top top",
						scrub: 1,
						toggleActions: "play none none pause",
					},
				});

				this.$gsap.from(".titleBackground", {
					duration: 2.5,
					ease: "slow(0.7,0.7,false)",
					scale: 1.5,
					scrollTrigger: {
						trigger: ".aboutMe-container",
						start: "center center",
						scrub: 1,
						toggleActions: "play none none pause",
					},
				});
			});
		}
	},
};
</script>

<style lang="scss" scoped>
.aboutMe-container {
	display: flex;
	flex-direction: column;
	direction: rtl;
	z-index: 1;

	.aboutMe-title {
		font-size: 2.125rem;
		font-weight: bold;
	}

	.aboutMe-avatar {
		position: relative;
		margin-top: 40px;

		.square {
			position: absolute;
			z-index: -1;
			width: 170px;
			height: 170px;
			top: 15px;
			right: 15px;
			border: 2px solid var(--green-1);
			border-radius: 5px;
		}

		img {
			border-radius: 5px;
			height: 170px;
			width: 170px;
			box-shadow: rgba(0, 0, 0, 0.9) 0px 25px 20px -20px;
		}
	}

	.aboutMe-text {
		margin-top: 40px;
		font-size: 1.063;
		line-height: 28px;
	}

	.aboutMeInfo {
		margin-top: 40px;
	}

	.socialNetwork {
		margin-top: 40px;
	}

	.titleBackground {
		left: -200px;
		top: 230px;
		transform: rotate(-90deg);
	}
}

// Tablet
@include mediaQueryMin("md") {
	.aboutMe-container {
		position: relative;

		.aboutMe-title {
			position: absolute;
			top: 40px;
			right: 220px;
			z-index: 1;
			margin-right: 90px;
		}

		.aboutMe-text {
			position: absolute;
			top: 80px;
			right: 220px;
			z-index: 1;
			margin-right: 90px;
		}

		.socialNetwork {
			z-index: 99;
			margin-top: 80px;
		}

		.titleBackground {
			top: 40px;
			left: 0;
			transform: rotate(0deg);
		}
	}
}
</style>