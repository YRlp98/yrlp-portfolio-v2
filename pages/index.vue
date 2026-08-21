<template>
	<div class="index-container">
		<HeroSection class="heroSection" />
		<div class="aboutMe-container">
			<WaveBackground class="waveBackground" />
			<AboutMe class="default-margin" />
		</div>
		<div class="default-margin education-container">
			<Education />
		</div>
		<div class="default-margin experience-container">
			<Experience />
		</div>
		<div class="skills-container">
			<Skills />
		</div>
		<div class="default-margin projects-container">
			<Projects />
		</div>
		<div class="default-margin blog-container">
			<Blog />
		</div>
	</div>
</template>

<script>
import HeroSection from "../components/pages/home/HeroSection.vue";
import WaveBackground from "../components/backgrounds/WaveBackground";
import AboutMe from "../components/pages/home/AboutMe.vue";
import Education from "../components/pages/home/Education.vue";
import Experience from "../components/pages/home/Experience.vue";
import Skills from "../components/pages/home/Skills.vue";
import Projects from "../components/pages/home/Projects";
import Blog from "../components/pages/home/Blog.vue";

export default {
	setup() {
		const route = useRoute()
		const canonicalUrl = computed(() => 'https://yrlp.ir' + route.path)

		useHead({
			title: 'Yousef Roshandel | Front-End Developer & UI/UX Designer',
			meta: [
				{ name: 'description', content: 'Yousef Roshandel is a passionate Front-End Developer and UI/UX Designer creating modern, user-friendly websites and digital experiences.' },
				{ property: 'og:title', content: 'Yousef Roshandel | Front-End Developer & UI/UX Designer' },
				{ property: 'og:description', content: 'Yousef Roshandel is a passionate Front-End Developer and UI/UX Designer creating modern, user-friendly websites and digital experiences.' },
				{ property: 'og:url', content: () => canonicalUrl.value },
			],
			link: [
				{ rel: 'canonical', href: () => canonicalUrl.value },
			],
		})
	},

	components: {
		HeroSection,
		WaveBackground,
		AboutMe,
		Education,
		Experience,
		Skills,
		Projects,
		Blog,
	},

	mounted() {
		if (import.meta.client) {
			this.$nextTick(() => {
				this.$gsap.from(".education-container", {
					opacity: 0,
					y: 100,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".education-container",
						start: "-40% bottom",
						scrub: 1,
						toggleActions: "play none none pause",
					},
				});

				this.$gsap.from(".experience-container", {
					opacity: 0,
					y: 100,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".experience-container",
						start: "-40% bottom",
						scrub: 1,
						toggleActions: "play none none pause",
					},
				});

				this.$gsap.from(".skills-container", {
					opacity: 0,
					y: 100,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".skills-container",
						start: "-40% bottom",
						scrub: 1,
						toggleActions: "play none none pause",
					},
				});

				this.$gsap.from(".projects-container", {
					opacity: 0,
					y: 100,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".projects-container",
						start: "-40% bottom",
						scrub: 1,
						toggleActions: "play none none pause",
					},
				});

				this.$gsap.from(".blog-container", {
					opacity: 0,
					y: 100,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".blog-container",
						start: "-40% bottom",
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
.index-container {
	position: relative;
	overflow: hidden;
}

.aboutMe-container {
	position: relative;

	.waveBackground {
		top: -200px;
	}
}

.education-container {
	position: relative;
	margin-top: 150px;
}

.experience-container {
	margin-top: 150px;
}

.skills-container {
	margin-top: 150px;
}

.projects-container {
	margin-top: 150px;
}

.blog-container {
	margin-top: 150px;
	padding-bottom: 50px;
}

// Tablet
@include mediaQueryMin("md") {
	.aboutMe-container {
		margin-top: 150px;

		.waveBackground {
			top: -310px;
		}
	}

	.education-container {
		position: relative;
		margin-top: 250px;
	}

	.experience-container {
		margin-top: 250px;
	}

	.skills-container {
		margin-top: 450px;
	}

	.projects-container {
		margin-top: 250px;
	}

	.blog-container {
		margin-top: 250px;
	}
}
</style>
