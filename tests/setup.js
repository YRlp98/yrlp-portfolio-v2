import { beforeEach, vi } from 'vitest'
import { computed, onBeforeUnmount, onMounted, readonly, ref, watch } from 'vue'

// Nuxt supplies these auto-imports in the application build.
beforeEach(() => {
  for (const [name, value] of Object.entries({ computed, onBeforeUnmount, onMounted, readonly, ref, watch })) {
    vi.stubGlobal(name, value)
  }
})
