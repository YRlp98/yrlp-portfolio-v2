import { beforeEach, expect, it, vi } from 'vitest'
import { h, ref } from 'vue'
import { useTheme } from '../composables/useTheme'
import { mount } from './helpers'

let media
let states

beforeEach(() => {
  localStorage.clear()
  states = new Map()
  media = new EventTarget()
  media.matches = false
  vi.stubGlobal('matchMedia', vi.fn(() => media))
  vi.stubGlobal('useState', (key, initialize) => {
    if (!states.has(key)) states.set(key, ref(initialize()))
    return states.get(key)
  })
  vi.stubGlobal('useHead', vi.fn())
  document.head.innerHTML = '<meta name="color-scheme"><meta name="theme-color">'
})

function mountTheme() {
  let theme
  const view = mount({ setup() { theme = useTheme(); return () => h('div') } })
  return { ...view, theme }
}

it('defaults to dark and persists explicit choices across mounts', () => {
  const first = mountTheme()
  expect(document.documentElement.dataset.theme).toBe('dark')
  first.theme.setTheme('light')
  expect(localStorage.getItem('theme')).toBe('light')
  first.unmount()
  states.clear()
  expect(mountTheme().theme.theme.value).toBe('light')
  expect(document.documentElement.dataset.theme).toBe('light')
})

it('follows system changes only in system mode and removes listeners on unmount', () => {
  const { theme, unmount } = mountTheme()
  theme.setTheme('system')
  media.matches = true
  media.dispatchEvent(new Event('change'))
  expect(theme.isDark.value).toBe(true)
  theme.setTheme('light')
  media.dispatchEvent(new Event('change'))
  expect(theme.isDark.value).toBe(false)
  theme.setTheme('system')
  unmount()
  media.matches = false
  media.dispatchEvent(new Event('change'))
  expect(theme.isDark.value).toBe(true)
})

it('syncs other tabs and still applies choices when storage is blocked', () => {
  const { theme } = mountTheme()
  window.dispatchEvent(new StorageEvent('storage', { key: 'theme', newValue: 'light' }))
  expect(theme.theme.value).toBe('light')
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage blocked') })
  expect(() => theme.setTheme('dark')).not.toThrow()
  expect(document.documentElement.dataset.theme).toBe('dark')
})
