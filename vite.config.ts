import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  build: {
    outDir: './internal/view/static/css',
    rollupOptions: {
      input: './internal/view/styles/main.scss',
      output: {
        assetFileNames: '[name].[ext]'
      }
    },
    assetsDir: ''
  }
})
