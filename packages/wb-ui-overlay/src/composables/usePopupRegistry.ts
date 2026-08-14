import {
  registerPopup,
  getPopupEntry,
  getRegisteredPopupKeys,
  type PopupRegistryEntry,
} from '../registry';

/**
 * 팝업 레지스트리 관리 composable
 *
 * 소비 앱/레이어의 Nuxt 플러그인에서 import하여 사용합니다.
 * module.ts의 addImportsDir를 통해 Nuxt auto-import로 제공됩니다.
 *
 * @example
 * // plugins/popup-registry.client.ts
 * export default defineNuxtPlugin(() => {
 *   const { register } = usePopupRegistry()
 *
 *   register('my-popup', {
 *     content: () => import('~/components/popup/my-popup/index.vue'),
 *     footer:  () => import('~/components/popup/my-popup/footer.vue'),
 *   })
 * })
 */
export const usePopupRegistry = () => {
  return {
    /** 팝업 콘텐츠 컴포넌트 등록 */
    register: registerPopup,
    /** 등록된 팝업 엔트리 조회 (popup.vue 내부용) */
    getEntry: getPopupEntry,
    /** 현재 등록된 모든 팝업 키 목록 (디버그용) */
    keys: getRegisteredPopupKeys,
  };
};

export type { PopupRegistryEntry };
