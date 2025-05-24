import { defineConfig } from 'vite'

export default defineConfig({
  root: './web',
  build: {
    outDir: 'static',
    minify: 'terser',
    terserOptions: {
      compress: false,
      mangle: false
    },
    rollupOptions: {
      input: ['./web/scripts/main.js', './web/styles/main.css'],
      output: {
        entryFileNames: 'bundle.js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
})
