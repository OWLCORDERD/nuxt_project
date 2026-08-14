<template>
  <div class="keep-alive-provider">
    <Transition name="fade">
      <div class="loading-overlay" v-if="isLoading">
        <div class="loading-overlay-box">
          <img :src="Logo" alt="LXP 로고" />
          <div class="loading-spinner" />
          <span class="loading-overlay-text"
            >페이지를 불러오는 중입니다...</span
          >
        </div>
      </div>
    </Transition>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, nextTick } from 'vue';
import { useRoute } from 'nuxt/app';
import { useUseKeepAliveLoading } from '../composables/useRouteLoading';
import Logo from '@/assets/common/images/lxp/logo/logo.png';

const { isLoading, startLoading, stopLoading } = useUseKeepAliveLoading();

const route = useRoute();

watch(
  () => route.path,
  async (newPath, oldPath) => {
    if (newPath === oldPath) return;

    // keepAlive 캐싱 혹은 신규 Virtual DOM 업데이트 완료 대기
    await nextTick();

    // * requestAnimationFrame 사용 이유: *
    // 브라우저 렌더링 프로세스와 동기화하여 로딩 오버레이 애니메이션 동작 보장
    // route-loader.client 플러그인측에서 활성화한 로딩 오버레이 종료 처리
    requestAnimationFrame(() => {
      stopLoading();
    });
  }
);
</script>

<style></style>
