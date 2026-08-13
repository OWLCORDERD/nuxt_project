<template>
  <div class="guide">
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
            키컬러 · 타이포그래피 · 아이콘 가이드 컨텐츠는 보일러 플레이트
            가이드 문서를 참고해주세요.
          </p>

          <div class="guide-toc">
            <div
              v-for="chapter in toc"
              :key="chapter.num"
              class="guide-toc__chapter"
            >
              <!-- 챕터 헤더 -->
              <div class="guide-toc__chapter-head">
                <span class="guide-toc__num">{{ chapter.num }}</span>
                <span class="guide-toc__chapter-title">{{
                  chapter.title
                }}</span>
                <span
                  class="guide-index__status-badge"
                  :class="`is-${chapter.status}`"
                  >{{ STATUS_LABEL[chapter.status] }}</span
                >
              </div>

              <!-- 1뎁스 하위 항목 -->
              <ul v-if="chapter.children?.length" class="guide-toc__list">
                <li
                  v-for="item in chapter.children"
                  :key="item.num"
                  class="guide-toc__item"
                >
                  <div class="guide-toc__item-row">
                    <span class="guide-toc__num guide-toc__num--sub">{{
                      item.num
                    }}</span>
                    <NuxtLink
                      v-if="item.path"
                      :to="item.path"
                      class="guide-toc__link"
                    >
                      {{ item.title }}
                    </NuxtLink>
                    <span v-else class="guide-toc__text">{{ item.title }}</span>
                    <span
                      class="guide-index__status-badge guide-index__status-badge--sm"
                      :class="`is-${item.status}`"
                      >{{ STATUS_LABEL[item.status] }}</span
                    >
                  </div>

                  <!-- 2뎁스 하위 항목 -->
                  <ul
                    v-if="item.children?.length"
                    class="guide-toc__list guide-toc__list--depth2"
                  >
                    <li
                      v-for="sub in item.children"
                      :key="sub.num"
                      class="guide-toc__item guide-toc__item--depth2"
                    >
                      <span class="guide-toc__num guide-toc__num--sub2">{{
                        sub.num
                      }}</span>
                      <NuxtLink
                        v-if="sub.path"
                        :to="sub.path"
                        class="guide-toc__link"
                        >{{ sub.title }}</NuxtLink
                      >
                      <span v-else class="guide-toc__text">{{
                        sub.title
                      }}</span>
                      <span
                        class="guide-index__status-badge guide-index__status-badge--sm"
                        :class="`is-${sub.status}`"
                        >{{ STATUS_LABEL[sub.status] }}</span
                      >
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ─── 패키지 진행 현황 ────────────────────────────── -->
        <section class="guide-index__block">
          <h2 class="guide-index__block-title">패키지 구축 현황</h2>
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
                  >{{ STATUS_LABEL[pkg.status] }}</span
                >
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
                    <span class="guide-index__card-label">{{
                      comp.label
                    }}</span>
                    <span
                      v-if="comp.status"
                      class="guide-index__card-status"
                      :class="`is-${comp.status}`"
                      >{{ STATUS_LABEL[comp.status] }}</span
                    >
                  </NuxtLink>
                  <div v-else class="guide-index__card-inner">
                    <span class="guide-index__card-name">{{ comp.name }}</span>
                    <span class="guide-index__card-label">{{
                      comp.label
                    }}</span>
                    <span class="guide-index__card-status is-pending"
                      >준비 중</span
                    >
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' });

const STATUS_LABEL = {
  done: '완료',
  inprogress: '진행 중',
  pending: '준비 중',
} as const;

type Status = keyof typeof STATUS_LABEL;
// 가이드 목차 항목 타입
interface TocItem {
  num: string;
  title: string;
  status: Status;
  path?: string;
  children?: TocItem[];
}

interface Component {
  name: string;
  label: string;
  path?: string;
  status?: Status;
}

interface Package {
  name: string;
  description: string;
  status: Status;
  components: Component[];
}

// ── 패키지 진행 현황 ──────────────────────────────────────
const packages: Package[] = [
  {
    name: '@wbsoft/ui-layout',
    description: '관리자 공통 레이아웃을 구성하는 컴포넌트 모음입니다.',
    status: 'inprogress',
    components: [
      {
        name: 'Navigation',
        label: '좌측 네비게이션',
        path: '/lxp/guide/overlay-ui',
        status: 'done',
      },
      {
        name: 'Header',
        label: '상단 헤더 (메인/서브)',
        path: '/lxp/guide/overlay-ui',
        status: 'done',
      },
      {
        name: 'TopButton',
        label: '상단 이동 버튼',
        path: '/lxp/guide/overlay-ui',
        status: 'inprogress',
      },
    ],
  },
  {
    name: '@wbsoft/ui-overlay',
    description:
      '얼럿, 컨펌, 팝업, 토스트 등 오버레이 계층에서 동작하는 컴포넌트 모음입니다.',
    status: 'pending',
    components: [
      {
        name: 'Alert',
        label: '얼럿',
        path: '/lxp/guide/overlay/alert',
        status: 'done',
      },
      {
        name: 'Confirm',
        label: '컨펌',
        path: '/lxp/guide/overlay/confirm',
        status: 'done',
      },
      {
        name: 'Popup',
        label: '팝업',
        path: '/lxp/guide/overlay/popup',
        status: 'inprogress',
      },
      {
        name: 'Toast',
        label: '토스트',
        path: '/lxp/guide/overlay/toast',
        status: 'done',
      },
    ],
  },
  {
    name: '@wbsoft/form',
    description: '폼 입력 요소 전반을 다루는 컴포넌트 모음입니다.',
    status: 'pending',
    components: [
      { name: 'Button', label: '버튼', path: '', status: 'inprogress' },
      { name: 'Checkbox', label: '체크박스', path: '', status: 'pending' },
      { name: 'Radio', label: '라디오', path: '', status: 'pending' },
      { name: 'Input', label: '텍스트 인풋', path: '', status: 'pending' },
      {
        name: 'Textarea',
        label: '텍스트에어리어',
        path: '',
        status: 'pending',
      },
      { name: 'Select', label: '셀렉트', path: '', status: 'pending' },
      { name: 'Switch', label: '스위치 토글', path: '', status: 'pending' },
      { name: 'Tag', label: '태그', path: '', status: 'pending' },
      { name: 'Datepicker', label: '날짜 선택기', path: '', status: 'pending' },
      { name: 'Searchbar', label: '검색바', path: '', status: 'pending' },
    ],
  },
  {
    name: '@wbsoft/upload',
    description: '파일 및 이미지 업로드를 위한 컴포넌트 모음입니다.',
    status: 'pending',
    components: [
      { name: 'FileUpload', label: '파일 업로드' },
      { name: 'ImageUpload', label: '이미지 업로드' },
    ],
  },
];

// ── 디자인 가이드 목차 (키컬러·타이포·아이콘 제외) ──────────
const toc: TocItem[] = [
  {
    num: '1',
    title: '오버레이 UI (Overlay UI)',
    status: 'done',
    children: [
      {
        num: '1.1',
        title: '모달 (Modal)',
        status: 'done',
        path: '/lxp/guide/ui-overlay/modal',
      },
      {
        num: '1.2',
        title: '레이어 팝업 (Layer Popup)',
        status: 'done',
        path: '/lxp/guide/ui-overlay/layer-popup',
      },
      {
        num: '1.3',
        title: '토스트 (Toast)',
        status: 'done',
        path: '/lxp/guide/ui-overlay/toast',
      },
    ],
  },
  {
    num: '2',
    title: '관리자 레이아웃 (layout)',
    status: 'done',
    children: [
      {
        num: '2.1',
        title: 'GNB (Global Navigation Bar)',
        status: 'done',
        path: '/lxp/guide/layout/navigation',
      },
      {
        num: '2.2',
        title: '헤더 (Header)',
        status: 'done',
        path: '/lxp/guide/layout/header',
      },
      {
        num: '2.3',
        title: '최근메뉴 탭 (Recent Tab)',
        status: 'pending',
        path: '/lxp/guide/layout/recent-tab',
      },
      {
        num: '2.4',
        title: '브레드크럼 (Breadcrumb)',
        status: 'pending',
        path: '/lxp/guide/layout/breadcrumb',
      },
    ],
  },
  {
    num: '3',
    title: 'Button',
    status: 'pending',
    children: [
      {
        num: '3.1',
        title: '버튼의 계층 구조 (Hierarchy)',
        status: 'pending',
        path: '',
      },
      {
        num: '3.2',
        title: '아이콘 버튼 (Icon Button)',
        status: 'pending',
        path: '',
      },
      {
        num: '3.3',
        title: '텍스트 버튼 (Text Button)',
        status: 'pending',
        path: '',
      },
      {
        num: '3.4',
        title: '탭 버튼 (Tab Button)',
        status: 'pending',
        children: [
          { num: '3.4.1', title: 'A Type', status: 'pending', path: '' },
          { num: '3.4.2', title: 'B Type', status: 'pending', path: '' },
          { num: '3.4.3', title: 'C Type', status: 'pending', path: '' },
        ],
      },
      {
        num: '3.5',
        title: '칩 버튼 (Chip Button)',
        status: 'pending',
        children: [
          {
            num: '3.5.1',
            title: '쵸이스 칩 (Choice Chip)',
            status: 'pending',
            path: '',
          },
          {
            num: '3.5.2',
            title: '필터 칩 (Filter Chip)',
            status: 'pending',
            path: '',
          },
          {
            num: '3.5.3',
            title: '인풋 칩 (Input Chip)',
            status: 'pending',
            path: '',
          },
        ],
      },
      {
        num: '3.6',
        title: '토글 버튼 (Toggle Button)',
        status: 'pending',
        children: [
          {
            num: '3.6.1',
            title: '스위치 (Switch)',
            status: 'pending',
            path: '',
          },
          {
            num: '3.6.2',
            title: '세그먼트 (Segment)',
            status: 'pending',
            path: '',
          },
        ],
      },
    ],
  },
  {
    num: '4',
    title: 'Form',
    status: 'pending',
    children: [
      {
        num: '4.1',
        title: 'Checkbox / Radio button',
        status: 'pending',
        children: [
          {
            num: '4.1.1',
            title: '체크박스 (Checkbox)',
            status: 'pending',
            path: '',
          },
          {
            num: '4.1.2',
            title: '라디오 버튼 (Radio button)',
            status: 'pending',
            path: '',
          },
        ],
      },
      {
        num: '4.2',
        title: 'Text area',
        status: 'pending',
        children: [
          { num: '4.2.1', title: '기본형', status: 'pending', path: '' },
          {
            num: '4.2.2',
            title: '입력필드 단독형',
            status: 'pending',
            path: '',
          },
        ],
      },
      { num: '4.3', title: '폼 단위요소', status: 'pending', path: '' },
      { num: '4.4', title: '필터영역', status: 'pending', path: '' },
      { num: '4.5', title: '본문영역', status: 'pending', path: '' },
    ],
  },
  {
    num: '5',
    title: '공통 UI 컴포넌트',
    status: 'pending',
    children: [
      {
        num: '5.1',
        title: '테이블 그리드 (Tui Grid)',
        status: 'pending',
        path: '',
      },
      {
        num: '5.2',
        title: '페이지네이션 (Pagination)',
        status: 'pending',
        path: '',
      },
      {
        num: '5.3',
        title: '트리 그리드 (Tui Tree)',
        status: 'pending',
        path: '',
      },
      {
        num: '5.4',
        title: '파일 첨부 (File Upload)',
        status: 'pending',
        path: '',
      },
      { num: '5.5', title: '캘린더 (DatePicker)', status: 'pending', path: '' },
      { num: '5.6', title: '툴팁 (Tooltip)', status: 'pending', path: '' },
      {
        num: '5.7',
        title: '나의 보관함 (My Archive)',
        status: 'pending',
        path: '',
      },
    ],
  },
  {
    num: '5',
    title: '기타',
    status: 'pending',
    children: [
      { num: '5.1', title: '라벨 (Label)', status: 'pending', path: '' },
      {
        num: '5.2',
        title: '스크롤 바 (Scroll Bar)',
        status: 'pending',
        path: '',
      },
      { num: '5.3', title: '안내 문구', status: 'pending', path: '' },
    ],
  },
];
</script>
