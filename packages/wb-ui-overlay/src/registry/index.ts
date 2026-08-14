import type { AsyncComponentLoader } from 'vue';

// ─────────────────────────────────────────────────────────────────────────────
// Popup Registry
//
// 패키지 내부에 앱 컴포넌트 경로를 정적으로 선언하면 Vite가 패키지 컨텍스트에서
// import()를 처리하여 ~/ 경로를 패키지 루트로 잘못 해석하는 문제가 발생합니다.
//
// 해결 방법: 레지스트리를 빈 Map으로 시작하고,
// import() 팩토리 함수는 소비 앱/레이어의 Nuxt 플러그인에서 registerPopup()으로 주입합니다.
// 이 방식으로 Vite는 소비 앱 컨텍스트에서 경로를 해석합니다.
//
// 등록 예시 → app/plugins/popup-registry.client.ts 참조
// ─────────────────────────────────────────────────────────────────────────────

export interface PopupRegistryEntry {
  /** 팝업 콘텐츠 컴포넌트 동적 import 팩토리 */
  content: AsyncComponentLoader;
  /** 팝업 하단 버튼 컴포넌트 동적 import 팩토리 (선택) */
  footer?: AsyncComponentLoader;
}

const _registry = new Map<string, PopupRegistryEntry>();

/**
 * 팝업 콘텐츠 컴포넌트를 레지스트리에 등록합니다.
 *
 * @param key        usePopup().show({ contentType: key }) 에 사용할 식별자
 * @param entry      { content: () => import('...'), footer?: () => import('...') }
 *
 * @example
 * // Nuxt 플러그인에서 호출 (앱/레이어 컨텍스트)
 * registerPopup('user-detail', {
 *   content: () => import('~/components/popup/user-detail/index.vue'),
 *   footer:  () => import('~/components/popup/user-detail/footer.vue'),
 * })
 */
export const registerPopup = (key: string, entry: PopupRegistryEntry): void => {
  _registry.set(key, entry);
};

/**
 * 등록된 팝업 레지스트리 항목을 조회합니다.
 * popup.vue 내부에서만 사용합니다.
 */
export const getPopupEntry = (key: string): PopupRegistryEntry | null =>
  _registry.get(key) ?? null;

/**
 * 현재 등록된 모든 팝업 키 목록 (디버그용)
 */
export const getRegisteredPopupKeys = (): string[] =>
  Array.from(_registry.keys());
