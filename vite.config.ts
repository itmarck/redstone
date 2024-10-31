/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      manifest: {
        name: 'Redstone',
        short_name: 'Redstone',
        description: 'The everything personal application',
        background_color: '#0f0f0f',
        theme_color: '#646cff',
        icons: [
          {
            src: '/vite.svg',
            sizes: '32x32',
            type: 'image/svg',
          },
        ],
      },
    }),
  ],
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
