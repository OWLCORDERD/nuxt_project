<template>
  <div class="btn-wrap">
      <button type="button" class="btn-gray" @click="close">취소</button>
      <button type="button" class="btn-main">저장</button>
  </div>
</template>

<script setup>
const { close } = usePopupV2();
</script>

<style lang="scss" scoped>
</style>