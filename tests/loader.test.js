import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import { createSSRApp, nextTick } from 'vue'
import AppLoader from '../components/AppLoader.vue'
import { mount } from './helpers'

let hooks

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'performance', 'Date', 'requestAnimationFrame', 'cancelAnimationFrame'] })
  hooks = new Map()
  vi.stubGlobal('useNuxtApp', () => ({ hook(name, callback) {
    hooks.set(name, callback)
    return () => hooks.delete(name)
  } }))
  document.body.innerHTML = '<main id="main-content">Portfolio content</main>'
})

afterEach(() => vi.useRealTimers())

it('leaves generated HTML and initial client content uncovered', async () => {
  const app = createSSRApp(AppLoader)
  app.config.globalProperties.$t = key => key
  expect(await renderToString(app)).not.toContain('class="app-loader"')
  const { element } = mount(AppLoader)
  await vi.advanceTimersByTimeAsync(1000)
  expect(element.querySelector('.app-loader')).toBeNull()
  expect(document.querySelector('main').hasAttribute('aria-busy')).toBe(false)
})

it('skips fast navigation and dismisses a slow navigation without waiting for window load', async () => {
  const { element } = mount(AppLoader)
  hooks.get('page:loading:start')()
  await vi.advanceTimersByTimeAsync(100)
  hooks.get('page:loading:end')()
  await vi.advanceTimersByTimeAsync(500)
  expect(element.querySelector('.app-loader')).toBeNull()
  hooks.get('page:loading:start')()
  await vi.advanceTimersByTimeAsync(150)
  expect(element.querySelector('progress').getAttribute('aria-label')).toBe('Loading')
  expect(document.querySelector('main').getAttribute('aria-busy')).toBe('true')
  hooks.get('page:loading:end')()
  await vi.advanceTimersByTimeAsync(1000)
  await nextTick()
  expect(element.querySelector('.app-loader')).toBeNull()
  expect(document.querySelector('main').hasAttribute('aria-busy')).toBe(false)
})

it('clears pending loading on errors and removes hooks and timers on unmount', async () => {
  const { element, unmount } = mount(AppLoader)
  hooks.get('page:loading:start')()
  hooks.get('app:error')()
  await vi.advanceTimersByTimeAsync(1000)
  expect(element.querySelector('.app-loader')).toBeNull()
  hooks.get('page:loading:start')()
  await vi.advanceTimersByTimeAsync(150)
  unmount()
  expect(hooks.size).toBe(0)
  expect(document.querySelector('main').hasAttribute('aria-busy')).toBe(false)
  await vi.advanceTimersByTimeAsync(1000)
  expect(element.querySelector('.app-loader')).toBeNull()
})
