const THEMES = ['system', 'dark', 'light']

export const useTheme = () => {
  const theme = useState('theme', () => 'dark')
  const resolvedTheme = useState('resolved-theme', () => 'dark')

  useHead(() => ({
    htmlAttrs: { 'data-theme': resolvedTheme.value },
    meta: [
      { name: 'color-scheme', content: theme.value === 'system' ? 'light dark' : theme.value, tagPriority: 49 },
      { name: 'theme-color', content: resolvedTheme.value === 'light' ? '#f7f9f6' : '#131313', tagPriority: 48 },
    ],
  }))

  const applyTheme = (nextTheme, persist = true) => {
    const normalizedTheme = THEMES.includes(nextTheme) ? nextTheme : 'dark'
    theme.value = normalizedTheme

    if (import.meta.client) {
      const root = document.documentElement
      resolvedTheme.value = normalizedTheme === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : normalizedTheme
      root.dataset.theme = resolvedTheme.value
      root.style.colorScheme = normalizedTheme === 'system' ? 'light dark' : normalizedTheme

      document.querySelector('meta[name="color-scheme"]')?.setAttribute(
        'content', normalizedTheme === 'system' ? 'light dark' : normalizedTheme,
      )

      const themeColor = document.querySelector('meta[name="theme-color"]')
      themeColor?.setAttribute('content', resolvedTheme.value === 'light' ? '#f7f9f6' : '#131313')

      if (persist) {
        try {
          localStorage.setItem('theme', normalizedTheme)
        } catch {
          // Apply the selected theme even when browser storage is blocked.
        }
      }
    }
  }

  const initializeTheme = () => {
    if (!import.meta.client) return

    let initialTheme = theme.value
    try {
      initialTheme = localStorage.getItem('theme')
    } catch {
      // Keep the in-memory preference when browser storage is blocked.
    }
    applyTheme(initialTheme, false)
  }

  onMounted(() => {
    initializeTheme()
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
    const syncSystemTheme = () => applyTheme(theme.value, false)
    const syncStoredTheme = (event) => {
      if (event.key === 'theme' || event.key === null) applyTheme(event.newValue, false)
    }

    systemTheme.addEventListener('change', syncSystemTheme)
    window.addEventListener('storage', syncStoredTheme)
    onBeforeUnmount(() => {
      systemTheme.removeEventListener('change', syncSystemTheme)
      window.removeEventListener('storage', syncStoredTheme)
    })
  })

  return {
    theme: readonly(theme),
    isDark: computed(() => resolvedTheme.value === 'dark'),
    setTheme: applyTheme,
    initializeTheme,
  }
}
