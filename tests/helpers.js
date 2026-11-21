import { afterEach } from 'vitest'
import { createApp, h, reactive } from 'vue'
import AppImage from '../components/AppImage.vue'
import messages from '../i18n/en.json'

const apps = new Set()

export function mount(component, initialProps = {}, globals = {}) {
  const props = reactive(initialProps)
  const element = document.createElement('div')
  document.body.append(element)
  const app = createApp({ render: () => h(component, props) })
  app.component('AppImage', AppImage)
  app.config.globalProperties.$t = (key, values = {}) =>
    (key.split('.').reduce((value, part) => value?.[part], messages) || key).replace(/\{(\w+)\}/g, (_, name) => values[name])
  Object.assign(app.config.globalProperties, globals)
  app.mount(element)
  apps.add(app)
  return { element, props, unmount: () => { app.unmount(); apps.delete(app) } }
}

afterEach(() => {
  for (const app of apps) app.unmount()
  apps.clear()
  document.body.replaceChildren()
})
