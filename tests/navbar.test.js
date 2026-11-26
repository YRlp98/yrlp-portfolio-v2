import { beforeEach, expect, it, vi } from 'vitest'
import { h, nextTick, ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import { mount } from './helpers'

vi.mock('../components/widgets/SettingsMenu.vue', () => ({
  default: { emits: ['close'], render() { return h('button', { onClick: () => this.$emit('close') }, 'Close settings') } },
}))

let locale
beforeEach(() => {
  locale = ref('en')
  vi.stubGlobal('useI18n', () => ({ locale }))
  vi.stubGlobal('CSS', { supports: () => false })
  Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true })
})

const component = {
  ...Navbar,
  components: {
    ...Navbar.components,
    NuxtLink: { props: ['to'], render() { return h('a', { href: this.to }, this.$slots.default?.()) } },
  },
}
function renderNavbar() {
  const result = mount(component, {}, { $localePath: path => path })
  const trigger = result.element.querySelector('.navbar-more')
  const panel = result.element.querySelector('[popover]')
  const hide = vi.fn()
  Object.defineProperty(panel, 'hidePopover', { value: hide, configurable: true })
  return { ...result, trigger, panel, hide }
}
function toggle(panel, state) {
  const event = new Event('toggle')
  Object.defineProperty(event, 'newState', { value: state })
  panel.dispatchEvent(event)
}

it('connects the settings button to a persistent, non-modal popover and syncs its state', async () => {
  const { trigger, panel } = renderNavbar()
  expect(panel.getAttribute('popover')).toBe('auto')
  expect(trigger.getAttribute('popovertarget')).toBe(panel.id)
  expect(trigger.getAttribute('aria-controls')).toBe(panel.id)
  expect(trigger.hasAttribute('aria-haspopup')).toBe(false)
  expect(panel.getAttribute('role')).toBe('group')
  toggle(panel, 'open')
  await nextTick()
  expect(trigger.getAttribute('aria-expanded')).toBe('true')
  toggle(panel, 'closed')
  await nextTick()
  expect(trigger.getAttribute('aria-expanded')).toBe('false')
})

it('positions the fallback inward in English and Farsi and clamps it to the viewport', async () => {
  Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true })
  const { trigger, panel } = renderNavbar()
  const rect = vi.spyOn(trigger, 'getBoundingClientRect')
  rect.mockReturnValue({ left: 712, right: 756, bottom: 62 })
  toggle(panel, 'open')
  expect(panel.style.getPropertyValue('--settings-left')).toBe('501px')
  expect(panel.style.getPropertyValue('--settings-top')).toBe('80px')
  locale.value = 'fa'
  await nextTick()
  rect.mockReturnValue({ left: 24, right: 68, bottom: 62 })
  toggle(panel, 'open')
  expect(panel.getAttribute('dir')).toBe('rtl')
  expect(panel.style.getPropertyValue('--settings-left')).toBe('24px')
  rect.mockReturnValue({ left: 790, right: 834, bottom: 62 })
  toggle(panel, 'open')
  expect(panel.style.getPropertyValue('--settings-left')).toBe('533px')
})

it('restores trigger focus on an internal close and hides the panel at the mobile breakpoint', async () => {
  const { trigger, panel, hide } = renderNavbar()
  toggle(panel, 'open')
  await nextTick()
  panel.querySelector('button').click()
  expect(hide).toHaveBeenCalled()
  expect(document.activeElement).toBe(trigger)
  hide.mockClear()
  Object.defineProperty(window, 'innerWidth', { value: 390, configurable: true })
  window.dispatchEvent(new Event('resize'))
  expect(hide).toHaveBeenCalled()
})
