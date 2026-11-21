export default defineNuxtPlugin(async () => {
  if (!('popover' in HTMLElement.prototype)) {
    await import('@oddbird/popover-polyfill')
  }
  if (!('interestForElement' in HTMLButtonElement.prototype)) {
    await import('interestfor')
  }
})
