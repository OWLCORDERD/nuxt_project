<template>
  <!-- 오류/개선 등록 버튼 (베타오픈 기간에만 사용, 이후 삭제 예정) -->
  <nuxt-link
    to="/"
    class="btn-feedback"
    :class="{ 'has-top': scrollPosition > 100 }"
  >
    <svgo-common-report-icon />
  </nuxt-link>
  <transition name="fade">
    <button
      type="button"
      class="page-top-btn"
      v-if="scrollPosition > 100"
      @click="goScrollTop"
    >
      <i class="fi-chevron-down" />
      <span>TOP</span>
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const scrollPosition = ref(0);

const updateScrollPosition = () => {
  scrollPosition.value = document.documentElement.scrollTop;
};

const goScrollTop = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  scrollPosition.value = document.documentElement.scrollTop;
  window.addEventListener('scroll', updateScrollPosition);
});
</script>
