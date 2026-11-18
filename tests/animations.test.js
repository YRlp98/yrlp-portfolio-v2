import { afterAll, beforeAll, beforeEach, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Home from '../pages/index.vue'
import AboutMe from '../components/pages/home/AboutMe.vue'
import HeroSection from '../components/pages/home/HeroSection.vue'
import { mount } from './helpers'

beforeAll(() => gsap.registerPlugin(ScrollTrigger))
beforeEach(() => {
  vi.stubGlobal('useSiteSeo', vi.fn())
  vi.stubGlobal('useI18n', () => ({ locale: ref('en') }))
  vi.stubGlobal('useDirection', () => ({ changeDirection: () => 'ltr', changeAlign: () => 'left' }))
})
afterAll(() => {
  ScrollTrigger.disable()
  gsap.ticker.sleep()
})

for (const [name, component, count] of [['home', Home, 5], ['about', AboutMe, 6], ['hero', HeroSection, 0]]) {
  it(`cleans up ${name} animations after repeated navigation`, () => {
    const isolated = {
      ...component,
      components: Object.fromEntries(Object.keys(component.components).map(key => [key, { template: '<div />' }])),
    }
    const baseline = ScrollTrigger.getAll().length
    for (let visit = 0; visit < 3; visit++) {
      const { element, unmount } = mount(isolated, {}, { $gsap: gsap })
      const targets = [...element.querySelectorAll('*')]
      expect(gsap.getTweensOf(targets).length).toBeGreaterThan(0)
      expect(ScrollTrigger.getAll().length).toBe(baseline + count)
      unmount()
      expect(ScrollTrigger.getAll().length).toBe(baseline)
      expect(gsap.getTweensOf(targets).length).toBe(0)
    }
  })
}
