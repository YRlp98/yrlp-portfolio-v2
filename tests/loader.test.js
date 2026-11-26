import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import { createSSRApp, nextTick, ref } from 'vue'
import AppLoader from '../components/AppLoader.vue'
import { mount } from './helpers'

let hooks

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'performance', 'Date', 'requestAnimationFrame', 'cancelAnimationFrame'] })
  hooks = new Map()
  const state = new Map()
  vi.stubGlobal('useState', (key, init) => {
    if (!state.has(key)) state.set(key, ref(init()))
    return state.get(key)
  })
  vi.spyOn(document, 'readyState', 'get').mockReturnValue('complete')
  vi.stubGlobal('useNuxtApp', () => ({ hook(name, callback) {
    hooks.set(name, callback)
    return () => hooks.delete(name)
  } }))
  document.body.innerHTML = '<main id="main-content">Portfolio content</main>'
})

afterEach(() => vi.useRealTimers())

it('shows the first-load animation even when the document is already loaded, without covering generated HTML', async () => {
  const app = createSSRApp(AppLoader)
  app.config.globalProperties.$t = key => key
  expect(await renderToString(app)).not.toContain('class="app-loader"')
  const { element } = mount(AppLoader)
  await nextTick()
  expect(element.querySelector('.app-loader')).not.toBeNull()
  expect(document.querySelector('main').hasAttribute('aria-busy')).toBe(false)
  await vi.advanceTimersByTimeAsync(850)
  expect(element.querySelector('.app-loader')).not.toBeNull()
  await vi.advanceTimersByTimeAsync(400)
  expect(element.querySelector('.app-loader')).toBeNull()
})

it('waits for the initial document load instead of ending on a timer or page-navigation event', async () => {
  vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading')
  const { element } = mount(AppLoader)
  await vi.advanceTimersByTimeAsync(2500)
  expect(element.querySelector('[role="status"]').textContent).toBe('Loading')
  expect(element.querySelector('progress')).toBeNull()
  expect(document.querySelector('main').getAttribute('aria-busy')).toBe('true')
  expect(hooks.has('page:loading:start')).toBe(false)
  expect(hooks.has('page:loading:end')).toBe(false)
  window.dispatchEvent(new Event('load'))
  expect(document.querySelector('main').hasAttribute('aria-busy')).toBe(false)
  await vi.advanceTimersByTimeAsync(400)
  expect(element.querySelector('.app-loader')).toBeNull()
})

it('does not replay on subsequent document-load events or layout remounts during browsing', async () => {
  const first = mount(AppLoader)
  await vi.advanceTimersByTimeAsync(1250)
  window.dispatchEvent(new Event('load'))
  await nextTick()
  expect(first.element.querySelector('.app-loader')).toBeNull()
  first.unmount()
  const second = mount(AppLoader)
  await nextTick()
  expect(second.element.querySelector('.app-loader')).toBeNull()
  expect(hooks.size).toBe(0)
})

it('clears busy state on startup errors and dismisses the animation', async () => {
  vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading')
  const { element } = mount(AppLoader)
  expect(document.querySelector('main').getAttribute('aria-busy')).toBe('true')
  hooks.get('app:error')()
  expect(document.querySelector('main').hasAttribute('aria-busy')).toBe(false)
  await vi.advanceTimersByTimeAsync(1250)
  expect(element.querySelector('.app-loader')).toBeNull()
})

it('removes the initial-load listener, hooks and timers when unmounted', async () => {
  vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading')
  const remove = vi.spyOn(window, 'removeEventListener')
  const { element, unmount } = mount(AppLoader)
  await nextTick()
  expect(element.querySelector('.app-loader')).not.toBeNull()
  unmount()
  expect(remove).toHaveBeenCalledWith('load', expect.any(Function))
  expect(hooks.size).toBe(0)
  expect(document.querySelector('main').hasAttribute('aria-busy')).toBe(false)
  window.dispatchEvent(new Event('load'))
  await vi.advanceTimersByTimeAsync(1250)
  expect(element.querySelector('.app-loader')).toBeNull()
})
