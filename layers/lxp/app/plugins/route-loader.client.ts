import { useUseKeepAliveLoading } from '../composables/useRouteLoading';

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  // 로딩 오버레이 활성화/종료 composable
  const { startLoading, stopLoading } = useUseKeepAliveLoading();

  // 경로 이동 전, 로딩 오버레이 활성화 처리
  router.beforeResolve((to, from) => {
    if (to.path !== from.path) {
      startLoading();
    }
  });

  // 경로 이동 에러 발생 시, 강제 로딩 종료 처리
  router.onError(() => {
    stopLoading();
  });
});
