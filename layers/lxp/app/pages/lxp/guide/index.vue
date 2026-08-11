<template>
  <div class="guide-index">
    <!-- 히어로 -->
    <section class="guide-index__hero">
      <p class="guide-index__hero-label">WBSoft Design System</p>
      <h1 class="guide-index__hero-title">LXP 컴포넌트 가이드</h1>
      <p class="guide-index__hero-desc">
        현재 목차별 가이드 구현 현황과 패키지별 제작 현황을 제공합니다.
      </p>
    </section>

    <div class="dashboard">
    <!-- ─── 디자인 가이드 목차 ──────────────────────────── -->
    <section class="guide-index__block">
      <h2 class="guide-index__block-title">가이드 목차</h2>
      <p class="guide-index__block-desc">
        키컬러 · 타이포그래피 · 아이콘 가이드 컨텐츠는 보일러 플레이트 가이드 문서를 참고해주세요.</p>

      <div class="guide-toc">
        <div
          v-for="chapter in toc"
          :key="chapter.num"
          class="guide-toc__chapter"
        >
          <!-- 챕터 헤더 -->
          <div class="guide-toc__chapter-head">
            <span class="guide-toc__num">{{ chapter.num }}</span>
            <span class="guide-toc__chapter-title">{{ chapter.title }}</span>
            <span
              class="guide-index__status-badge"
              :class="`is-${chapter.status}`"
            >{{ STATUS_LABEL[chapter.status] }}</span>
          </div>

          <!-- 1뎁스 하위 항목 -->
          <ul v-if="chapter.children?.length" class="guide-toc__list">
            <li
              v-for="item in chapter.children"
              :key="item.num"
              class="guide-toc__item"
            >
              <div class="guide-toc__item-row">
                <span class="guide-toc__num guide-toc__num--sub">{{ item.num }}</span>
                <NuxtLink v-if="item.path" :to="item.path" class="guide-toc__link">
                  {{ item.title }}
                </NuxtLink>
                <span v-else class="guide-toc__text">{{ item.title }}</span>
                <span
                  class="guide-index__status-badge guide-index__status-badge--sm"
                  :class="`is-${item.status}`"
                >{{ STATUS_LABEL[item.status] }}</span>
              </div>

              <!-- 2뎁스 하위 항목 -->
              <ul v-if="item.children?.length" class="guide-toc__list guide-toc__list--depth2">
                <li
                  v-for="sub in item.children"
                  :key="sub.num"
                  class="guide-toc__item guide-toc__item--depth2"
                >
                  <span class="guide-toc__num guide-toc__num--sub2">{{ sub.num }}</span>
                  <NuxtLink v-if="sub.path" :to="sub.path" class="guide-toc__link">{{ sub.title }}</NuxtLink>
                  <span v-else class="guide-toc__text">{{ sub.title }}</span>
                  <span
                    class="guide-index__status-badge guide-index__status-badge--sm"
                    :class="`is-${sub.status}`"
                  >{{ STATUS_LABEL[sub.status] }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ─── 패키지 진행 현황 ────────────────────────────── -->
    <section class="guide-index__block">
      <h2 class="guide-index__block-title">패키지 진행 현황</h2>
      <ul class="guide-index__pkg-list">
        <li
          v-for="pkg in packages"
          :key="pkg.name"
          class="guide-index__pkg-item"
        >
          <div class="guide-index__pkg-head">
            <span class="guide-index__pkg-badge">{{ pkg.name }}</span>
            <span
              class="guide-index__status-badge"
              :class="`is-${pkg.status}`"
            >{{ STATUS_LABEL[pkg.status] }}</span>
          </div>
          <p class="guide-index__pkg-desc">{{ pkg.description }}</p>
          <ul class="guide-index__card-grid">
            <li
              v-for="comp in pkg.components"
              :key="comp.name"
              class="guide-index__card"
              :class="{ 'is-disabled': !comp.path }"
            >
              <NuxtLink
                v-if="comp.path"
                :to="comp.path"
                class="guide-index__card-inner"
              >
                <span class="guide-index__card-name">{{ comp.name }}</span>
                <span class="guide-index__card-label">{{ comp.label }}</span>
                <span
                  v-if="comp.status"
                  class="guide-index__card-status"
                  :class="`is-${comp.status}`"
                >{{ STATUS_LABEL[comp.status] }}</span>
              </NuxtLink>
              <div v-else class="guide-index__card-inner">
                <span class="guide-index__card-name">{{ comp.name }}</span>
                <span class="guide-index__card-label">{{ comp.label }}</span>
                <span class="guide-index__card-status is-pending">준비 중</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' });

const STATUS_LABEL = {
  done:       '완료',
  inprogress: '진행 중',
  pending:    '준비 중',
} as const;

type Status = keyof typeof STATUS_LABEL;
// 가이드 목차 항목 타입
interface TocItem {
  num:       string;
  title:     string;
  status:    Status;
  path?:     string;
  children?: TocItem[];
}

interface Component {
  name:    string;
  label:   string;
  path?:   string;
  status?: Status;
}

interface Package {
  name:        string;
  description: string;
  status:      Status;
  components:  Component[];
}

// ── 패키지 진행 현황 ──────────────────────────────────────
const packages: Package[] = [
  {
    name:        '@wbsoft/ui-layout',
    description: '관리자 공통 레이아웃을 구성하는 컴포넌트 모음입니다.',
    status:      'inprogress',
    components:  [
      { name: 'Navigation', label: '좌측 네비게이션',    path: '/lxp/guide/layout/navigation', status: 'done'       },
      { name: 'Header',     label: '상단 헤더 (메인/서브)', path: '/lxp/guide/layout/header',     status: 'done'       },
      { name: 'TopButton',  label: '상단 이동 버튼',      path: '/lxp/guide/layout/top-button', status: 'inprogress' },
    ],
  },
  {
    name:        '@wbsoft/ui-overlay',
    description: '얼럿, 컨펌, 팝업, 토스트 등 오버레이 계층에서 동작하는 컴포넌트 모음입니다.',
    status:      'inprogress',
    components:  [
      { name: 'Alert',   label: '얼럿',  path: '/lxp/guide/overlay/alert',   status: 'done'       },
      { name: 'Confirm', label: '컨펌',  path: '/lxp/guide/overlay/confirm', status: 'done'       },
      { name: 'Popup',   label: '팝업',  path: '/lxp/guide/overlay/popup',   status: 'inprogress' },
      { name: 'Toast',   label: '토스트', path: '/lxp/guide/overlay/toast',  status: 'done'       },
    ],
  },
  {
    name:        '@wbsoft/form',
    description: '폼 입력 요소 전반을 다루는 컴포넌트 모음입니다.',
    status:      'inprogress',
    components:  [
      { name: 'Button',     label: '버튼',          path: '/lxp/guide/form/button',     status: 'inprogress' },
      { name: 'Checkbox',   label: '체크박스',       path: '/lxp/guide/form/checkbox',   status: 'pending'    },
      { name: 'Radio',      label: '라디오',         path: '/lxp/guide/form/radio',      status: 'pending'    },
      { name: 'Input',      label: '텍스트 인풋',    path: '/lxp/guide/form/input',      status: 'pending'    },
      { name: 'Textarea',   label: '텍스트에어리어', path: '/lxp/guide/form/textarea',   status: 'pending'    },
      { name: 'Select',     label: '셀렉트',         path: '/lxp/guide/form/select',     status: 'pending'    },
      { name: 'Switch',     label: '스위치 토글',    path: '/lxp/guide/form/switch',     status: 'pending'    },
      { name: 'Tag',        label: '태그',           path: '/lxp/guide/form/tag',        status: 'pending'    },
      { name: 'Datepicker', label: '날짜 선택기',    path: '/lxp/guide/form/datepicker', status: 'pending'    },
      { name: 'Searchbar',  label: '검색바',         path: '/lxp/guide/form/searchbar',  status: 'pending'    },
    ],
  },
  {
    name:        '@wbsoft/upload',
    description: '파일 및 이미지 업로드를 위한 컴포넌트 모음입니다.',
    status:      'inprogress',
    components:  [
      { name: 'FileUpload',  label: '파일 업로드'  },
      { name: 'ImageUpload', label: '이미지 업로드' },
    ],
  },
];

// ── 디자인 가이드 목차 (키컬러·타이포·아이콘 제외) ──────────
const toc: TocItem[] = [
  {
    num: '1', title: 'Modal & Layer Popup', status: 'done',
    children: [
      { num: '1.1', title: '모달 (Modal)',          status: 'done', path: '/lxp/guide/ui-overlay'   },
      { num: '1.2', title: '레이어 팝업 (Layer Popup)', status: 'done', path: '/lxp/guide/ui-overlay'   },
    ],
  },
  {
    num: '2', title: 'Toast', status: 'done',
    children: [
      { num: '2.1', title: '토스트 (Toast)', status: 'done', path: '/lxp/guide/ui-overlay/toast' },
    ],
  },
  {
    num: '3', title: 'Button', status: 'pending',
    children: [
      { num: '3.1', title: '버튼의 계층 구조 (Hierarchy)',  status: 'pending', path: '/lxp/guide/form/button' },
      { num: '3.2', title: '아이콘 버튼 (Icon Button)',      status: 'pending', path: '/lxp/guide/form/button' },
      { num: '3.3', title: '텍스트 버튼 (Text Button)',      status: 'pending', path: '/lxp/guide/form/button' },
      {
        num: '3.4', title: '탭 버튼 (Tab Button)', status: 'pending',
        children: [
          { num: '3.4.1', title: '탭(A) 일 경우',      status: 'pending' },
          { num: '3.4.2', title: '탭(B) 재충형',       status: 'pending' },
          { num: '3.4.3', title: '탭(C) 인라인형',     status: 'pending' },
          { num: '3.4.4', title: '히든 탭',             status: 'pending' },
        ],
      },
      {
        num: '3.5', title: '칩 버튼 (Chip Button)', status: 'pending',
        children: [
          { num: '3.5.1', title: '쵸이스 칩 (Choice Chip)', status: 'pending' },
          { num: '3.5.2', title: '필터 칩 (Filter Chip)',    status: 'pending' },
          { num: '3.5.3', title: '인풋 칩 (Input Chip)',     status: 'pending' },
        ],
      },
      {
        num: '3.6', title: '토글 버튼 (Toggle Button)', status: 'pending',
        children: [
          { num: '3.6.1', title: '스위치 (Switch)',    status: 'pending', path: '/lxp/guide/form/switch' },
          { num: '3.6.2', title: '세그먼트 (Segment)', status: 'pending' },
        ],
      },
    ],
  },
  {
    num: '4', title: 'Form', status: 'pending',
    children: [
      {
        num: '4.1', title: 'Checkbox / Radio button', status: 'pending',
        children: [
          { num: '4.1.1', title: '체크박스 (Checkbox)',      status: 'pending', path: '/lxp/guide/form/checkbox' },
          { num: '4.1.2', title: '라디오 버튼 (Radio button)', status: 'pending', path: '/lxp/guide/form/radio'    },
        ],
      },
      {
        num: '4.2', title: 'Text area', status: 'pending',
        children: [
          { num: '4.2.1', title: '기본형',            status: 'pending', path: '/lxp/guide/form/textarea' },
          { num: '4.2.2', title: '입력필드 단독형',   status: 'pending', path: '/lxp/guide/form/textarea' },
        ],
      },
      { num: '4.3', title: '폼 단위요소', status: 'pending', path: '/lxp/guide/form/input'   },
      { num: '4.4', title: '필터영역',   status: 'pending' },
      { num: '4.5', title: '본문영역',   status: 'pending' },
    ],
  },
  {
    num: '5', title: '공통 UI 컴포넌트', status: 'inprogress',
    children: [
      { num: '5.1',  title: 'LNB (Local Navigation Bar)', status: 'done',       path: '/lxp/guide/layout/navigation' },
      { num: '5.2',  title: '헤더 (Header)',               status: 'done',       path: '/lxp/guide/layout/header'     },
      { num: '5.3',  title: '최근메뉴 탭 (Recent Tab)',    status: 'pending'                                          },
      { num: '5.4',  title: '브레드크럼 (Breadcrumb)',     status: 'pending'                                          },
      { num: '5.5',  title: '푸터 바 (Footer Bar)',        status: 'pending'                                          },
      { num: '5.6',  title: '페이지네이션 (Pagination)',   status: 'pending'                                          },
      { num: '5.7',  title: '파일 첨부',                   status: 'pending'                                          },
      { num: '5.8',  title: '캘린더 (Calendar)',           status: 'pending'                                          },
      { num: '5.9',  title: '툴팁 (Tooltip)',              status: 'pending'                                          },
      { num: '5.10', title: '트리구조',                    status: 'pending'                                          },
      { num: '5.11', title: '나의 보관함',                  status: 'pending'                                         },
    ],
  },
  {
    num: '6', title: '기타', status: 'pending',
    children: [
      { num: '6.1', title: '라벨 (Label)',       status: 'pending' },
      { num: '6.2', title: '스크롤 바 (Scroll Bar)', status: 'pending' },
      { num: '6.3', title: '안내 문구',           status: 'pending' },
    ],
  },
];
</script>

<style lang="scss" scoped>
// ── 공통 상태 뱃지 ────────────────────────────────────────
%badge-base {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;
}

.guide-index {
  width: 100%;
  margin: 0 auto;
  padding: 20px 32px 80px;
  display: flex;
  flex-direction: column;
  gap: 60px;

  .dashboard {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  // ── 히어로 ──────────────────────────────────────────────
  &__hero {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 40px;
    border-bottom: 1px solid #e2e8f0;
  }

  &__hero-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--colorMain, #5b5fc7);
  }

  &__hero-title {
    font-size: 32px;
    font-weight: 700;
    color: #1a202c;
    line-height: 1.3;
  }

  &__hero-desc {
    font-size: 15px;
    color: #718096;
    line-height: 1.7;
  }

  // ── 블록 공통 ────────────────────────────────────────────
  &__block {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0 !important;
  }

  &__block-title {
    font-size: 20px;
    font-weight: 700;
    color: #1a202c;
    padding-bottom: 12px;
    border-bottom: 2px solid #e2e8f0;
  }

  &__block-desc {
    font-size: 13px;
    color: #a0aec0;
    margin-top: -8px;
  }

  // ── 상태 뱃지 ────────────────────────────────────────────
  &__status-badge {
    @extend %badge-base;

    &--sm { font-size: 10px; padding: 1px 7px; }

    &.is-done       { background: #c6f6d5; color: #276749; }
    &.is-inprogress { background: #e9d8fd; color: #553c9a; }
    &.is-pending    { background: #e2e8f0; color: #718096; }
  }

  // ── 패키지 리스트 ─────────────────────────────────────────
  &__pkg-list {
    display: flex;
    flex-direction: column;
    gap: 36px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__pkg-head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
  }

  &__pkg-badge {
    font-size: 13px;
    font-weight: 700;
    color: #2d3748;
    font-family: 'Fira Code', 'Consolas', monospace;
    background: #edf2f7;
    padding: 3px 10px;
    border-radius: 6px;
  }

  &__pkg-desc {
    font-size: 13px;
    color: #718096;
    line-height: 1.6;
    margin-bottom: 14px;
  }

  // ── 카드 그리드 ───────────────────────────────────────────
  &__card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 10px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__card {
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    transition: border-color 0.15s, box-shadow 0.15s;

    &:hover:not(.is-disabled) {
      border-color: var(--colorMain, #5b5fc7);
      box-shadow: 0 2px 12px 0 rgba(91, 95, 199, 0.10);
    }

    &.is-disabled {
      opacity: 0.55;
      cursor: default;
    }
  }

  &__card-inner {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 16px 18px;
    text-decoration: none;
    color: inherit;
  }

  &__card-name {
    font-size: 13px;
    font-weight: 700;
    color: #2d3748;
    font-family: 'Fira Code', 'Consolas', monospace;
  }

  &__card-label {
    font-size: 11px;
    color: #a0aec0;
  }

  &__card-status {
    @extend %badge-base;
    font-size: 10px;
    padding: 1px 7px;
    margin-top: 8px;
    align-self: flex-start;

    &.is-done       { background: #c6f6d5; color: #276749; }
    &.is-inprogress { background: #e9d8fd; color: #553c9a; }
    &.is-pending    { background: #e2e8f0; color: #718096; }
  }
}

// ── 목차 (TOC) ──────────────────────────────────────────────
.guide-toc {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__chapter {
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    overflow: hidden;
  }

  &__chapter-head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    background: #f7fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  &__chapter-title {
    font-size: 14px;
    font-weight: 700;
    color: #2d3748;
    flex: 1;
  }

  &__num {
    font-size: 12px;
    font-weight: 700;
    color: var(--colorMain, #5b5fc7);
    font-family: 'Fira Code', 'Consolas', monospace;
    min-width: 42px;

    &--sub  { min-width: 42px; color: #718096; font-weight: 600; }
    &--sub2 { min-width: 52px; color: #a0aec0; font-weight: 500; font-size: 11px; }
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;

    &--depth2 {
      padding-left: 52px;
      background: #f7fafc;
    }
  }

  &__item {
    border-top: 1px solid #f0f4f8;

    &--depth2 {
      border-top: 1px solid #edf2f7;
    }
  }

  &__item-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 20px;
  }

  &__link {
    flex: 1;
    font-size: 13px;
    color: var(--colorMain, #5b5fc7);
    text-decoration: none;
    font-weight: 500;

    &:hover { text-decoration: underline; }
  }

  &__text {
    flex: 1;
    font-size: 13px;
    color: #4a5568;
  }
}
</style>
