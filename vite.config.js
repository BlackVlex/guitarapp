import { defineConfig } from 'vite'

export default defineConfig({
  base: '/guitarapp/',      // путь к репозиторию на GitHub
  build: { outDir: 'dist' } // папка для сборки
})