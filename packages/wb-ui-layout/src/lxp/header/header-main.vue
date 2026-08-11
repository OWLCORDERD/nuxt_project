<template>
  <header>
    <div class="header-left">
      <nuxt-link
        :to="`/${route.path.split('/')[1]}`"
        class="logo"
        aria-label="logo"
      >
      <img :src="Logo" class="logo-img" alt="플랫폼 로고 이미지" />
      </nuxt-link>
    </div>
    <div class="menu">
      <LXPHeaderOrgnRoleSelect />

      <div class="menu-icons">
        <button
          type="button"
          class="item"
          title="로그아웃"
          @click="() => $auth.logout('/platform-gate')"
        >
          <svgo-common-out title="로그아웃" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'nuxt/app';
import Logo from '@/assets/common/images/lxp/logo/logo.png';

const route = useRoute();
const { $auth } = useNuxtApp();
</script>

<style lang="scss" scoped>
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
