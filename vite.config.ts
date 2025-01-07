import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  build: {
    outDir: './internal/view/static/assets',
    rollupOptions: {
      input: [
        './internal/view/scripts/main.ts',
        './internal/view/styles/main.css'
      ],
      output: {
        entryFileNames: 'bundle.js',
        assetFileNames: '[name].[ext]'
      }
    },
    assetsDir: ''
  }
})
