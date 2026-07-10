import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import postcssPresetEnv from 'postcss-preset-env'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    postcss: {
      plugins: [
        // Tailwind v4 emits nested CSS + cascade layers (Chrome 120+ / Safari 17.2+).
        // Flatten for older browsers so layout rules don't get dropped at parse time.
        postcssPresetEnv({
          browsers: 'chrome >= 100, safari >= 15, firefox >= 100',
          features: {
            'nesting-rules': true,
            'cascade-layers': true,
            'media-query-ranges': true,
            'oklab-function': true,
          },
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          markdown: ['react-markdown'],
        },
      },
    },
  },
})
