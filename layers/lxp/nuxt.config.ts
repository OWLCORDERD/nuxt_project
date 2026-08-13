import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  // lxp 도메인 레이어 전역 CSS 메인 앱 라우터 전역 스타일 경로 연동
  css: [
    resolve(__dirname, './app/assets/styles/global.scss'), // 전역 CSS
    resolve(__dirname, '../../app/assets/common/styles/guide/lxp.scss'), // 관리자 가이드 css
  ],
  // lxp 도메인 레이어 전역 SVG 이미지 경로 연동
  svgo: {
    autoImportPath: resolve(__dirname, '../../app/assets/common/images/lxp/svg'),
  }
})