/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: [
      // Global setup file
      './tests/setup.ts',
      // Setup a fake IndexedDB implementation for tests
      'fake-indexeddb/auto',
    ],
  },
})
