import { beforeEach, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import AppImage from '../components/AppImage.vue'
import { mount } from './helpers'

beforeEach(() => {
  vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false)
})

it('recovers from image errors and retries when the source changes', async () => {
  const { element, props } = mount(AppImage, { src: '/first.webp', alt: 'Project preview', width: 200, loading: 'lazy' })
  const image = element.querySelector('img')
  expect(image.getAttribute('src')).toBe('/first.webp')
  image.dispatchEvent(new Event('error'))
  await nextTick()
  const fallback = image.getAttribute('src')
  expect(fallback).toMatch(/^data:image\/svg\+xml/)
  expect(image.alt).toBe('Project preview')
  expect(image.width).toBe(200)
  expect(image.getAttribute('loading')).toBe('lazy')
  image.dispatchEvent(new Event('error'))
  await nextTick()
  expect(image.getAttribute('src')).toBe(fallback)
  props.src = '/replacement.webp'
  await nextTick()
  expect(image.getAttribute('src')).toBe('/replacement.webp')
  expect(image.classList.contains('image-placeholder')).toBe(false)
})

it('handles an empty source and a failure cached before hydration', async () => {
  const empty = mount(AppImage).element.querySelector('img')
  expect(empty.getAttribute('src')).toMatch(/^data:image\/svg\+xml/)
  vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true)
  vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(0)
  const cached = mount(AppImage, { src: '/cached-failure.webp' }).element.querySelector('img')
  await nextTick()
  expect(cached.getAttribute('src')).toMatch(/^data:image\/svg\+xml/)
})
