import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '~': fileURLToPath(new URL('.', import.meta.url)) },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  define: { 'import.meta.client': true },
  css: {
    preprocessorOptions: {
      scss: { additionalData: '@use "~/assets/css/query.scss" as *;' },
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.test.js'],
    setupFiles: ['tests/setup.js'],
    clearMocks: true,
    restoreMocks: true,
  },
})
