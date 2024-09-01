// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: [
    "@/assets/scss/common/layout.scss",
    "@/assets/scss/common/_variables.scss",
    "@/assets/scss/common/common.scss",
    "@/assets/scss/common/reset.scss",
  ],
});
