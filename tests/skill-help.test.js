import { beforeEach, expect, it, vi } from 'vitest'
import { h, nextTick, ref } from 'vue'
import SkillHelp from '../components/widgets/SkillHelp.vue'
import Skills from '../components/pages/home/Skills.vue'
import en from '../i18n/en.json'
import fa from '../i18n/fa.json'
import { mount } from './helpers'

const skill = { id: 'vue', title: 'Vue.js', link: 'https://vuejs.org/guide/introduction.html' }

beforeEach(() => {
  vi.stubGlobal('useI18n', () => ({ locale: ref('en') }))
})

function toggle(panel, state) {
  const event = new Event('toggle')
  Object.defineProperty(event, 'newState', { value: state })
  panel.dispatchEvent(event)
}

it('gives every skill a unique identifier, bilingual explanation, and HTTPS reading link', () => {
  const skills = Object.values(Skills.data()).flat()
  expect(skills).toHaveLength(23)
  expect(new Set(skills.map(skill => skill.id)).size).toBe(23)
  for (const skill of skills) {
    expect(en.skillDescriptions[skill.id].length).toBeGreaterThan(30)
    expect(fa.skillDescriptions[skill.id]).toMatch(/[\u0600-\u06ff]/)
    expect(new URL(skill.link).protocol).toBe('https:')
  }
})

it('connects hover and tap to a uniquely named popup with the correct description and link', () => {
  const { element } = mount(SkillHelp, { skill })
  const button = element.querySelector('button')
  const panel = element.querySelector('[popover]')
  expect(button.getAttribute('interestfor')).toBe(panel.id)
  expect(button.getAttribute('popovertarget')).toBe(panel.id)
  expect(button.getAttribute('popovertargetaction')).toBe('show')
  expect(button.getAttribute('aria-label')).toBe('About Vue.js')
  expect(button.getAttribute('aria-expanded')).toBe('false')
  expect(panel.querySelector('p').textContent).toBe(en.skillDescriptions.vue)
  expect(panel.querySelector('a').getAttribute('href')).toBe(skill.link)
  expect(panel.querySelector('a').getAttribute('aria-label')).toBe('Read more about Vue.js')
  const pair = mount({ render: () => h('div', [h(SkillHelp, { skill }), h(SkillHelp, { skill })]) })
  const ids = [...pair.element.querySelectorAll('[popover]')].map(node => node.id)
  expect(new Set(ids).size).toBe(2)
})

it('syncs expanded state from the popup and removes positioning listeners', async () => {
  const { element, unmount } = mount(SkillHelp, { skill })
  const button = element.querySelector('button')
  const panel = element.querySelector('[popover]')
  const remove = vi.spyOn(window, 'removeEventListener')
  toggle(panel, 'open')
  await nextTick()
  expect(button.getAttribute('aria-expanded')).toBe('true')
  toggle(panel, 'closed')
  await nextTick()
  expect(button.getAttribute('aria-expanded')).toBe('false')
  unmount()
  expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function), true)
  expect(remove).toHaveBeenCalledWith('resize', expect.any(Function))
})

it('keeps popup positioning inside narrow viewports without anchor positioning', () => {
  vi.stubGlobal('CSS', { supports: vi.fn(() => false) })
  Object.defineProperty(window, 'innerWidth', { value: 320, configurable: true })
  Object.defineProperty(window, 'innerHeight', { value: 600, configurable: true })
  const { element } = mount(SkillHelp, { skill })
  const button = element.querySelector('button')
  const panel = element.querySelector('[popover]')
  vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({ left: 300, top: 550, bottom: 578, width: 28 })
  vi.spyOn(panel, 'getBoundingClientRect').mockReturnValue({ width: 296, height: 180 })
  toggle(panel, 'open')
  expect(panel.style.left).toBe('12px')
  expect(panel.style.top).toBe('362px')
})

it('keeps touch popups fixed even when anchor positioning is available', async () => {
  vi.stubGlobal('CSS', { supports: vi.fn(() => true) })
  vi.stubGlobal('matchMedia', () => ({ matches: false }))
  const { element } = mount(SkillHelp, { skill })
  await nextTick()
  const panel = element.querySelector('[popover]')
  toggle(panel, 'open')
  expect(panel.classList.contains('is-anchored')).toBe(false)
  expect(panel.style.left).not.toBe('')
})

it('uses light dismissal when the browser does not recognize hint popovers', () => {
  const { element } = mount(SkillHelp, { skill })
  const panel = element.querySelector('[popover]')
  Object.defineProperty(panel, 'popover', { value: 'manual', configurable: true })
  const event = new Event('beforetoggle')
  Object.defineProperty(event, 'newState', { value: 'open' })
  panel.dispatchEvent(event)
  expect(panel.getAttribute('popover')).toBe('auto')
})

it('keeps Escape-dismissed content closed until the next deliberate interaction', () => {
  const { element } = mount(SkillHelp, { skill })
  const button = element.querySelector('button')
  const panel = element.querySelector('[popover]')
  button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
  const restoredFocus = new Event('interest', { cancelable: true })
  panel.dispatchEvent(restoredFocus)
  expect(restoredFocus.defaultPrevented).toBe(true)
  button.dispatchEvent(new Event('pointerenter'))
  const deliberateHover = new Event('interest', { cancelable: true })
  panel.dispatchEvent(deliberateHover)
  expect(deliberateHover.defaultPrevented).toBe(false)
})
