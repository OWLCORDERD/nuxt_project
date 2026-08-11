import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  // lxp 도메인 레이어 전역 CSS (admin 레이아웃 포함 전체 적용)
  css: [
    resolve(__dirname, './app/assets/styles/global.scss'),
  ],
  svgo: {
    autoImportPath: resolve(__dirname, '../../app/assets/common/images/lxp/svg'),
  }
})