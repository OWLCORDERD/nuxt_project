<template>
  <section>
    <div class="guide">
      <div class="guide-doc">
        <!-- 히어로 -->
        <header class="guide-doc__hero">
          <div class="guide-doc__hero-meta">
            <span class="meta-tag">@wbsoft/ui-overlay</span>
            <span class="status-badge is-done">완료</span>
          </div>
          <h1 class="guide-doc__hero-title">
            오버레이 가시성 공통 컴포넌트 패키지
          </h1>
          <p class="guide-doc__hero-desc">
            관리자 프로젝트에서 공통으로 사용되는 오버레이 가시성 레이어
            컴포넌트 모음입니다.<br />
            <code>useAlert</code> · <code>useConfirm</code> ·
            <code>useToast</code> · <code>usePopup</code>
            composable을 통해 선언적으로 호출하며, 전역 레이아웃에 단일
            인스턴스로 마운트되어 동작합니다.
          </p>
        </header>

        <!-- ─── 1. Alert ──────────────────────────────────────────── -->
        <section class="guide-doc__section">
          <div class="guide-doc__section-head">
            <h2 class="guide-doc__section-title">
              1. Alert <span class="guide-doc__section-sub">알림용 모달</span>
            </h2>
            <p class="guide-doc__section-desc">
              단순 확인용 알림 메시지를 전달할 때 사용합니다.
              <code>useAlert().show()</code> 호출 시, 레이아웃에 선언되어있는
              Alert 모달이 활성화됩니다.<br />
              확인 버튼 하나만 노출되며, 제목·본문·Border 리스트 모드를
              선택적으로 구성할 수 있습니다.
            </p>
          </div>

          <!-- API 테이블 -->
          <div class="guide-doc__api-wrap">
            <p class="guide-doc__api-label">호출 파라미터 API</p>
            <table class="guide-doc__table">
              <thead>
                <tr>
                  <th>파라미터</th>
                  <th>타입</th>
                  <th>기본값</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>title</td>
                  <td>string</td>
                  <td>-</td>
                  <td>모달 제목</td>
                </tr>
                <tr>
                  <td>text</td>
                  <td>string</td>
                  <td>-</td>
                  <td>본문 메시지 (HTML 허용)</td>
                </tr>
                <tr>
                  <td>showTitle</td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>제목 영역 노출 여부</td>
                </tr>
                <tr>
                  <td>showBorder</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Border 리스트 영역 사용 여부</td>
                </tr>
                <tr>
                  <td>subTexts</td>
                  <td>Array&lt;{text:string}&gt;</td>
                  <td>[]</td>
                  <td>Border 리스트 항목 배열</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 샘플 -->
          <div class="guide-doc__demo-grid">
            <div
              class="guide-doc__demo-card"
              v-for="sample in alertSamples"
              :key="sample.id"
            >
              <div class="guide-doc__demo-card-head">
                <span class="guide-doc__demo-title">{{ sample.label }}</span>
                <span
                  class="guide-doc__demo-badge"
                  :class="`guide-doc__demo-badge--${sample.type}`"
                  >{{ sample.typeLabel }}</span
                >
              </div>
              <p class="guide-doc__demo-desc">{{ sample.desc }}</p>
              <button
                class="guide-doc__btn guide-doc__btn--primary"
                @click="sample.action"
              >
                미리보기
              </button>
              <div class="guide-doc__code">
                <pre><code>{{ sample.code }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- ─── 2. Confirm ───────────────────────────────────────── -->
        <section class="guide-doc__section">
          <div class="guide-doc__section-head">
            <h2 class="guide-doc__section-title">
              2. Confirm <span class="guide-doc__section-sub">컨펌</span>
            </h2>
            <p class="guide-doc__section-desc">
              사용자의 의사결정이 필요한 분기점에서 사용합니다.
              <code>useConfirm().show()</code>는 <strong>Promise</strong>를
              반환하며, 확인 시 <code>true</code>, 취소·닫기 시
              <code>false</code> / <code>null</code>을 resolve합니다.<br />
              문자열 또는 옵션 객체를 전달하여 서브 메시지·Border 리스트·라디오
              선택·테이블 등 다양한 콘텐츠를 구성할 수 있습니다.
            </p>
          </div>

          <!-- API 테이블 -->
          <div class="guide-doc__api-wrap">
            <p class="guide-doc__api-label">호출 파라미터 API</p>
            <table class="guide-doc__table">
              <thead>
                <tr>
                  <th>옵션 키</th>
                  <th>타입</th>
                  <th>기본값</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>message</td>
                  <td>string</td>
                  <td>-</td>
                  <td>제목 메시지</td>
                </tr>
                <tr>
                  <td>confirm</td>
                  <td>string</td>
                  <td>'확인'</td>
                  <td>확인 버튼 텍스트</td>
                </tr>
                <tr>
                  <td>cancel</td>
                  <td>string</td>
                  <td>'취소'</td>
                  <td>취소 버튼 텍스트</td>
                </tr>
                <tr>
                  <td>subMsg</td>
                  <td>string</td>
                  <td>-</td>
                  <td>제목 아래 서브 메시지</td>
                </tr>
                <tr>
                  <td>hasCancel</td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>취소 버튼 노출 여부</td>
                </tr>
                <tr>
                  <td>hasBorder</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Border 체크리스트 사용 여부</td>
                </tr>
                <tr>
                  <td>subTexts</td>
                  <td>Array&lt;{text, icon?, filled?}&gt;</td>
                  <td>[]</td>
                  <td>Border 리스트 항목</td>
                </tr>
                <tr>
                  <td>hasRadio</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>라디오 선택 영역 사용 여부</td>
                </tr>
                <tr>
                  <td>radioOptions</td>
                  <td>Array&lt;{label, value}&gt;</td>
                  <td>[]</td>
                  <td>라디오 선택지 목록</td>
                </tr>
                <tr>
                  <td>hasTable</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>테이블 영역 사용 여부</td>
                </tr>
                <tr>
                  <td>containerWidth</td>
                  <td>string</td>
                  <td>null</td>
                  <td>모달 최대 너비 (예: '600px')</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 샘플 -->
          <div class="guide-doc__demo-grid">
            <div
              class="guide-doc__demo-card"
              v-for="sample in confirmSamples"
              :key="sample.id"
            >
              <div class="guide-doc__demo-card-head">
                <span class="guide-doc__demo-title">{{ sample.label }}</span>
                <span
                  class="guide-doc__demo-badge"
                  :class="`guide-doc__demo-badge--${sample.type}`"
                  >{{ sample.typeLabel }}</span
                >
              </div>
              <p class="guide-doc__demo-desc">{{ sample.desc }}</p>
              <div class="guide-doc__btn-row">
                <button
                  class="guide-doc__btn guide-doc__btn--primary"
                  @click="sample.action"
                >
                  미리보기
                </button>
                <span
                  v-if="confirmResults[sample.id] !== undefined"
                  class="guide-doc__result"
                >
                  결과: <strong>{{ confirmResults[sample.id] }}</strong>
                </span>
              </div>
              <div class="guide-doc__code">
                <pre><code>{{ sample.code }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- ─── 3. Toast ─────────────────────────────────────────── -->
        <section class="guide-doc__section">
          <div class="guide-doc__section-head">
            <h2 class="guide-doc__section-title">
              3. Toast <span class="guide-doc__section-sub">토스트 메시지</span>
            </h2>
            <p class="guide-doc__section-desc">
              짧은 피드백 메시지를 화면 하단에 1.5초 동안 표시합니다.
              <code>useToast().show(text)</code> 호출 즉시 노출되며 자동으로
              사라집니다. HTML 태그를 포함한 문자열을 전달할 수 있습니다.
            </p>
          </div>

          <!-- API 테이블 -->
          <div class="guide-doc__api-wrap">
            <p class="guide-doc__api-label">
              API — <code>useToast().show(text: string)</code>
            </p>
            <table class="guide-doc__table">
              <thead>
                <tr>
                  <th>파라미터</th>
                  <th>타입</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>text</td>
                  <td>string</td>
                  <td>표시할 메시지 (HTML 허용)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="guide-doc__demo-grid">
            <div
              class="guide-doc__demo-card"
              v-for="sample in toastSamples"
              :key="sample.id"
            >
              <div class="guide-doc__demo-card-head">
                <span class="guide-doc__demo-title">{{ sample.label }}</span>
                <span class="guide-doc__demo-badge guide-doc__demo-badge--basic"
                  >기본</span
                >
              </div>
              <p class="guide-doc__demo-desc">{{ sample.desc }}</p>
              <button
                class="guide-doc__btn guide-doc__btn--primary"
                @click="sample.action"
              >
                미리보기
              </button>
              <div class="guide-doc__code">
                <pre><code>{{ sample.code }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- ─── 4. Popup (Layer Popup) ───────────────────────────── -->
        <section class="guide-doc__section">
          <div class="guide-doc__section-head">
            <h2 class="guide-doc__section-title">
              4. Popup <span class="guide-doc__section-sub">레이어 팝업</span>
            </h2>
            <p class="guide-doc__section-desc">
              간단한 콘텐츠를 페이지 위에 레이어 형태로 표시하는 레이어
              팝업입니다.
              <code>usePopup().show()</code>에 <code>contentType</code> 식별자를
              전달하면, <code>popup.vue</code> 내부의 컴포넌트 매핑 테이블에서
              해당 콘텐츠를 동적으로 import하여 렌더링합니다.<br />
              콘텐츠 컴포넌트는 팝업 내 <code>v-model</code>로
              <code>propsData</code>를 공유합니다.
            </p>
          </div>

          <!-- API 테이블 -->
          <div class="guide-doc__api-wrap">
            <p class="guide-doc__api-label">호출 파라미터 API</p>
            <table class="guide-doc__table">
              <thead>
                <tr>
                  <th>옵션 키</th>
                  <th>타입</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>title</td>
                  <td>string</td>
                  <td>팝업 헤더 제목</td>
                </tr>
                <tr>
                  <td>contentType</td>
                  <td>string</td>
                  <td>콘텐츠 컴포넌트 식별자 (매핑 객체의 key)</td>
                </tr>
                <tr>
                  <td>props</td>
                  <td>any</td>
                  <td>콘텐츠 컴포넌트에 v-model로 전달할 데이터</td>
                </tr>
                <tr>
                  <td>hasBtnYn</td>
                  <td>boolean</td>
                  <td>하단 버튼 영역 표시 여부</td>
                </tr>
                <tr>
                  <td>emitFn</td>
                  <td>Function</td>
                  <td>컨텐츠에서 부모로 이벤트를 전달할 콜백 함수</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 컴포넌트 등록 안내 -->
          <div class="guide-doc__callout guide-doc__callout--info">
            <strong>콘텐츠 컴포넌트 등록 방법</strong>
            <p>
              <code>popup.vue</code> 내부의
              <code>contentComponentMapping</code> 객체에 식별자(key)와 동적
              import 경로를 추가합니다. 하단 버튼 영역이 필요한 경우
              <code>footerComponentMapping</code>에도 동일한 key로 등록합니다.
            </p>
            <div class="guide-doc__code guide-doc__code--block">
              <pre><code>// popup.vue 내부 매핑 객체에 추가
            const contentComponentMapping = {
              example:      () => import('~/components/lxp/modal/layer-popup/example/v1/index.vue'),
              myNewPopup:   () => import('~/components/lxp/modal/layer-popup/my-new-popup/v1/index.vue'),
            };

            // 호출 측 (페이지 또는 컴포넌트)
            const { show } = usePopup();

            show({
              title: '팝업 제목',
              contentType: 'myNewPopup',
              props: { id: 123 },
              hasBtnYn: true,
              emitFn: (result) => console.log('팝업 결과:', result),
            });</code></pre>
            </div>
          </div>

          <div class="guide-doc__demo-grid guide-doc__demo-grid--single">
            <div class="guide-doc__demo-card">
              <div class="guide-doc__demo-card-head">
                <span class="guide-doc__demo-title">레이어 팝업 닫기</span>
                <span
                  class="guide-doc__demo-badge guide-doc__demo-badge--warning"
                  >close only</span
                >
              </div>
              <p class="guide-doc__demo-desc">
                콘텐츠 컴포넌트 등록이 필요한 팝업 특성상 이 가이드 페이지에서는
                닫기 API만 데모로 제공합니다. 실 사용 시 위 매핑 등록 후
                <code>show()</code>를 호출하세요.
              </p>
              <div class="guide-doc__code">
                <pre><code>// 닫기
const { close } = usePopup();
close();</code></pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', tab: '/lxp/guide/overlay' });

const { show: showAlert } = useAlert();
const { show: showConfirm } = useConfirm();
const { show: showToast } = useToast();

// 컨펌 결과값 표시용
const confirmResults = reactive<Record<string, string>>({});

// ─── Alert 샘플 ───────────────────────────────────────────
const alertSamples = [
  {
    id: 'alert-basic',
    label: '기본 알럿',
    type: 'basic',
    typeLabel: '기본',
    desc: '제목과 본문을 함께 표시하는 가장 일반적인 형태입니다.',
    action: () => showAlert('안내', '요청하신 작업이 완료되었습니다.'),
    code: `const { show } = useAlert();

show('안내', '요청하신 작업이 완료되었습니다.');`,
  },
  {
    id: 'alert-no-title',
    label: '내용만 존재하는 알럿',
    type: 'basic',
    typeLabel: '기본',
    desc: '제목 영역 없이 본문 메시지만 표시합니다. 세 번째 인수로 false를 전달합니다.',
    action: () => showAlert('본문 메시지만 표시되는 알럿입니다.'),
    code: `const { show } = useAlert();

// showTitle = false → 제목 영역 미노출
show('', '본문 메시지만 표시되는 알럿입니다.', false);`,
  },
];

// ─── Confirm 샘플 ─────────────────────────────────────────
const confirmSamples = [
  {
    id: 'confirm-basic',
    label: '기본 컨펌',
    type: 'basic',
    typeLabel: '기본',
    desc: '문자열을 전달하면 기본 확인/취소 버튼을 포함한 컨펌이 표시됩니다.',
    action: async () => {
      const result = await showConfirm('정말 삭제하시겠습니까?');
      confirmResults['confirm-basic'] = result ? '확인' : '취소/닫기';
    },
    code: `const { show } = useConfirm();

const result = await show('정말 삭제하시겠습니까?');
if (result) {
  // 확인
} else {
  // 취소 또는 닫기
}`,
  },
  {
    id: 'confirm-no-cancel',
    label: '취소 버튼 없는 컨펌',
    type: 'basic',
    typeLabel: '기본',
    desc: 'hasCancel: false 옵션으로 확인 버튼만 노출합니다.',
    action: async () => {
      const result = await showConfirm({
        message: '처리가 완료되었습니다.',
        confirm: '확인',
        hasCancel: false,
      });
      confirmResults['confirm-no-cancel'] = result ? '확인' : '닫기';
    },
    code: `const { show } = useConfirm();

await show({
  message: '처리가 완료되었습니다.',
  confirm: '확인',
  hasCancel: false,
});`,
  },
  {
    id: 'confirm-submsg',
    label: '서브 메시지 컨펌',
    type: 'extend',
    typeLabel: '확장',
    desc: '제목 아래에 보조 설명 메시지를 추가로 표시합니다.',
    action: async () => {
      const result = await showConfirm({
        message: '과정을 삭제하시겠습니까?',
        subMsg:
          '삭제된 과정은 복구할 수 없습니다.<br/>관련 수강 신청 내역도 함께 삭제됩니다.',
        confirm: '삭제',
        cancel: '취소',
      });
      confirmResults['confirm-submsg'] = result ? '삭제' : '취소';
    },
    code: `const { show } = useConfirm();

const result = await show({
  message: '과정을 삭제하시겠습니까?',
  subMsg:  '삭제된 과정은 복구할 수 없습니다.<br/>관련 수강 신청 내역도 함께 삭제됩니다.',
  confirm: '삭제',
  cancel:  '취소',
});`,
  },
  {
    id: 'confirm-border',
    label: '테이블 형식 컨펌',
    type: 'extend',
    typeLabel: '확장',
    desc: '테이블 형식으로 항목 리스트를 표시합니다.',
    action: async () => {
      const result = await showConfirm({
        message: '최종 제출하시겠습니까?',
        subMsg: '제출 전 아래 사항을 확인해 주세요.',
        hasTable: true,
        tableData: [
          { columns: [{ label: '모든 필수 항목이 입력되었는지 확인하세요.' }] },
          {
            columns: [
              { label: '첨부 파일이 올바르게 등록되었는지 확인하세요.' },
            ],
          },
        ],
        hasCancel: true,
        cancel: '취소',
        confirm: '제출',
      });
      confirmResults['confirm-border'] = result ? '제출' : '취소';
    },
    code: `const { show } = useConfirm();

const result = await show({
  message: '최종 제출하시겠습니까?',
  subMsg: '제출 전 아래 사항을 확인해 주세요.',
  hasTable: true,
  tableData: [
    { columns: [{ label: '모든 필수 항목이 입력되었는지 확인하세요.' }] },
    { columns: [{ label: '첨부 파일이 올바르게 등록되었는지 확인하세요.' }] },
  ],
});`,
  },
  {
    id: 'confirm-radio',
    label: '라디오 선택 컨펌',
    type: 'extend',
    typeLabel: '확장',
    desc: '라디오 버튼 목록을 제공하고 선택된 값을 반환합니다. result.selectedValue로 선택값에 접근합니다.',
    action: async () => {
      const result = await showConfirm({
        message: '내보내기 형식을 선택해 주세요.',
        hasRadio: true,
        radioOptions: [
          { label: 'Excel (.xlsx)', value: 'xlsx' },
          { label: 'CSV (.csv)', value: 'csv' },
          { label: 'PDF (.pdf)', value: 'pdf' },
        ],
        confirm: '내보내기',
        cancel: '취소',
      });
      if (result && typeof result === 'object') {
        confirmResults['confirm-radio'] = `선택값: ${result.selectedValue}`;
      } else {
        confirmResults['confirm-radio'] = result ? '확인' : '취소';
      }
    },
    code: `const { show } = useConfirm();

const result = await show({
  message:      '내보내기 형식을 선택해 주세요.',
  hasRadio:     true,
  radioOptions: [
    { label: 'Excel (.xlsx)', value: 'xlsx' },
    { label: 'CSV (.csv)',    value: 'csv'  },
    { label: 'PDF (.pdf)',    value: 'pdf'  },
  ],
  confirm: '내보내기',
  cancel:  '취소',
});

if (result?.selectedValue) {
  console.log('선택된 형식:', result.selectedValue);
}`,
  },
];

// ─── Toast 샘플 ───────────────────────────────────────────
const toastSamples = [
  {
    id: 'toast-basic',
    label: '기본 토스트',
    desc: '일반 안내 메시지를 1.5초 동안 표시합니다.',
    action: () => showToast('저장되었습니다.'),
    code: `const { show } = useToast();

show('저장되었습니다.');`,
  },
  {
    id: 'toast-html',
    label: 'HTML 메시지 토스트',
    desc: 'HTML 태그를 포함한 메시지를 표시할 수 있습니다.',
    action: () =>
      showToast('과정이 <strong>정상적으로 등록</strong>되었습니다.'),
    code: `const { show } = useToast();

show('과정이 <strong>정상적으로 등록</strong>되었습니다.');`,
  },
];
</script>
