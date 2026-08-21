const THEMES = ['dark', 'light']

export const useTheme = () => {
  const theme = useState('theme', () => 'dark')

  const applyTheme = (nextTheme, persist = true) => {
    const normalizedTheme = THEMES.includes(nextTheme) ? nextTheme : 'dark'
    theme.value = normalizedTheme

    if (import.meta.client) {
      const root = document.documentElement
      root.dataset.theme = normalizedTheme
      root.style.colorScheme = normalizedTheme

      const themeColor = document.querySelector('meta[name="theme-color"]')
      themeColor?.setAttribute('content', normalizedTheme === 'light' ? '#f7f9f6' : '#131313')

      if (persist) {
        localStorage.setItem('theme', normalizedTheme)
      }
    }
  }

  const initializeTheme = () => {
    if (!import.meta.client) return

    const initialTheme = document.documentElement.dataset.theme
    applyTheme(THEMES.includes(initialTheme) ? initialTheme : 'dark', false)
  }

  return {
    theme: readonly(theme),
    isDark: computed(() => theme.value === 'dark'),
    setTheme: applyTheme,
    initializeTheme,
  }
}