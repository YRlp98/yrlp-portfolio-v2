export function useReadingMode() {
  const readingMode = useState('reading-mode', () => false)

  function toggleReadingMode() {
    readingMode.value = !readingMode.value
  }

  return { readingMode, toggleReadingMode }
}
