<template>
  <div class="skill-help" @keydown.esc="suppressInterest = true">
    <button ref="trigger" type="button" class="skill-help__trigger"
      :interestfor="popoverId" :popovertarget="popoverId" popovertargetaction="show"
      :aria-label="$t('aboutSkill', { skill: skill.title })" :aria-expanded="expanded"
      :aria-controls="popoverId" :style="{ anchorName }"
      @pointerenter="suppressInterest = false" @blur="suppressInterest = false" @click="suppressInterest = false">
      <AppImage src="/icons/question_icon.svg" alt="" width="16" height="16" />
    </button>
    <div :id="popoverId" ref="popover" popover="hint" role="tooltip"
      class="skill-help__popover" :class="{ 'is-anchored': anchored }"
      :dir="locale === 'fa' ? 'rtl' : 'ltr'" :style="{ positionAnchor: anchorName }"
      @beforetoggle="preparePopover" @toggle="syncPopover"
      @interest="suppressInterest && $event.preventDefault()">
      <strong>{{ skill.title }}</strong>
      <p>{{ $t(`skillDescriptions.${skill.id}`) }}</p>
      <a :href="skill.link" target="_blank" rel="noopener noreferrer"
        :aria-label="$t('readMoreAboutSkill', { skill: skill.title })">
        <span class="skill-help__link-label">{{ $t('readMore') }}</span>
        <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, useId } from 'vue'

defineProps({ skill: { type: Object, required: true } })
const { locale } = useI18n()
const popoverId = `skill-help-${useId()}`
const anchorName = `--${popoverId}`
const trigger = ref(null)
const popover = ref(null)
const expanded = ref(false)
// Restoring focus after Escape must not immediately reopen an interest popup.
const suppressInterest = ref(false)
const anchored = ref(false)
let positionFrame

function placePopover() {
  if (!expanded.value || !trigger.value || !popover.value) return
  const rect = trigger.value.getBoundingClientRect()
  if (rect.bottom < 0 || rect.top > window.innerHeight) {
    popover.value.hidePopover()
    return
  }
  if (anchored.value) return

  const panel = popover.value.getBoundingClientRect()
  const left = Math.max(12, Math.min(rect.left + (rect.width - panel.width) / 2, window.innerWidth - panel.width - 12))
  const below = rect.bottom + 8
  const top = below + panel.height <= window.innerHeight - 12 ? below : rect.top - panel.height - 8
  popover.value.style.left = `${left}px`
  popover.value.style.top = `${Math.max(12, Math.min(top, window.innerHeight - panel.height - 12))}px`
}

function preparePopover(event) {
  if (event.newState !== 'open') return
  // Safari treats an unsupported hint as manual, which would lose light dismissal.
  if (popover.value.popover !== 'hint') popover.value.setAttribute('popover', 'auto')
  positionFrame = window.requestAnimationFrame(placePopover)
}

function removePositionListeners() {
  window.removeEventListener('resize', placePopover)
  window.removeEventListener('scroll', placePopover, true)
}

function syncPopover(event) {
  expanded.value = event.newState === 'open'
  removePositionListeners()
  if (expanded.value) {
    placePopover()
    window.addEventListener('resize', placePopover, { passive: true })
    window.addEventListener('scroll', placePopover, { capture: true, passive: true })
  }
}

onMounted(() => {
  // Touch popups stay fixed so tapping a link cannot shift its anchor.
  anchored.value = CSS.supports('position-area: block-end')
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(positionFrame)
  removePositionListeners()
})
</script>

<style scoped>
.skill-help {
  display: inline-flex;
  flex-shrink: 0;
}

.skill-help__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  --interest-delay-start: 0.2s;
  --interest-delay-end: 0.25s;
  interest-delay-start: var(--interest-delay-start);
  interest-delay-end: var(--interest-delay-end);
}

.skill-help__trigger:hover {
  background: var(--color-glass-hover);
}

.skill-help__trigger img {
  display: block;
  filter: var(--icon-monochrome-filter);
}

.skill-help__popover {
  position: fixed;
  inset: auto;
  margin: 0;
  box-sizing: border-box;
  width: min(19rem, calc(100vw - 24px));
  max-height: calc(100dvh - 24px);
  overflow: auto;
  overscroll-behavior: contain;
  padding: 18px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface-elevated);
  color: var(--color-text);
  box-shadow: var(--shadow-soft);
  font-family: inherit;
  font-size: 0.875rem;
  line-height: 1.7;
  text-align: start;
}

.skill-help__popover.is-anchored {
  position-area: block-end span-inline-end;
  position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
  margin: 8px;
}

.skill-help__popover p {
  margin-block: 8px 12px;
  color: var(--color-text-muted);
}

.skill-help__popover a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text);
  transition: color 140ms ease;
  /* Reading mode's page-wide link styles must not underline the icon. */
  text-decoration: none !important;
}

.skill-help__link-label {
  text-box: trim-both cap alphabetic;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Preserve interaction colors over reading mode's page-wide link styles. */
.skill-help__popover a:is(:focus-visible, :active) {
  color: var(--color-accent) !important;
}

.skill-help__popover a:is(:focus-visible, :active) .skill-help__link-label {
  text-decoration-thickness: 2px;
}

@media (hover: hover) and (pointer: fine) {
  .skill-help__popover a:hover { color: var(--color-accent) !important; }
  .skill-help__popover a:hover .skill-help__link-label { text-decoration-thickness: 2px; }
}

@media (pointer: coarse) {
  .skill-help__trigger {
    width: 44px;
    height: 44px;
  }
}
</style>
