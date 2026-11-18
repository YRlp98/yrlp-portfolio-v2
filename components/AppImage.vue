<template>
  <img ref="image" :src="showPlaceholder ? placeholder : src" :class="{ 'image-placeholder': showPlaceholder }"
    @error="failed = true" />
</template>

<script setup>
import placeholder from '~/assets/images/image-placeholder.svg?inline'

const props = defineProps({
  src: { type: String, default: '' },
})

const image = ref(null)
const failed = ref(false)
const showPlaceholder = computed(() => failed.value || !props.src)

watch(() => props.src, () => {
  failed.value = false
})

onMounted(() => {
  // A cached failure can happen before hydration attaches the error listener.
  if (image.value.complete && image.value.naturalWidth === 0) failed.value = true
})
</script>

<style scoped>
.image-placeholder {
  background-color: var(--color-surface-elevated);
  object-fit: scale-down !important;
}
</style>
