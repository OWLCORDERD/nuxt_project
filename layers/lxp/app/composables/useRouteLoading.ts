import { ref, nextTick } from 'vue';
import { useState } from 'nuxt/app';

export const useUseKeepAliveLoading = () => {
  const isLoading = useState('keepAliveLoading', () => false);
  const timerId = ref<NodeJS.Timeout | null>(null);

  const startLoading = () => {
    isLoading.value = true;

    if (timerId.value) clearTimeout(timerId.value);
    timerId.value = setTimeout(() => {
      stopLoading();
    }, 5000)
  }

  const stopLoading = () => {
    if (timerId.value) {
      clearTimeout(timerId.value);
      timerId.value = null;
    }

    nextTick(() => {
      isLoading.value = false;
    })
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
  }
}
