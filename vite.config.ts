import { defineConfig } from 'vite'

export default defineConfig({
  root: './web',
  build: {
    outDir: 'static',
    rollupOptions: {
      input: ['./web/scripts/main.ts', './web/styles/main.css'],
      output: {
        entryFileNames: 'bundle.js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
})
