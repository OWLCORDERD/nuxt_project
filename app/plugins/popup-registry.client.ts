/**
 * 2026.08.14[mhlim]:
 * 레이어 팝업 (popup-v2) 레지스트리 등록 플러그인
 *
 * ─ 왜 여기서 등록하는가? ────────────────────────────────────────────────────
 * wb-ui-overlay 패키지의 popup.vue
 * 동적으로 선언할 컨텐츠, 푸터 컴포넌트 경로는 반드시 "소비 앱 컨텍스트" 선언
 * 패키지 내부에 ~/components/... 경로를 정적 선언하면 Vite가 패키지 루트 기준으로
 * 경로를 해석하여 빌드 에러 발생
 *
 * ─ 등록 방법 ────────────────────────────────────────────────────────────────
 * usePopupRegistry().register(key, { content, footer? }) 호출
 *   · key      : usePopup().show({ contentType: key }) 에 사용할 식별자
 *   · content  : 팝업 콘텐츠 컴포넌트 동적 import 팩토리
 *   · footer   : 팝업 하단 버튼 컴포넌트 동적 import 팩토리 (선택)
 *
 * ─ 새 팝업 추가 방법 ─────────────────────────────────────────────────────────
 * 아래에 register() 항목 한 줄 추가 후 해당 컴포넌트 파일 생성
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default defineNuxtPlugin(() => {
  const { register } = usePopupRegistry();

  // ── 예시 팝업 ────────────────────────────────────────────────────────────
  register('example-document', {
    content: () => import('~/features/layer-popup/example/index.vue'),
    footer: () => import('~/features/layer-popup/example/btn-wrap.vue'),
  });
});
