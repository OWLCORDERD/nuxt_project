<template>
  <header>
    <div class="header-left">
      <nuxt-link to="/lxp" class="logo" aria-label="logo">
        <img class="logo-img" :src="Logo" />
      </nuxt-link>
    </div>
    <div class="menu">
      <lxp-header-orgn-role-select />

      <div class="menu-icons">
        <button type="button" class="item">
          <i class="fi-out" title="로그아웃"></i>
        </button>
      </div>
    </div>
  </header>

  <ClientOnly>
    <lxp-today-menu />
  </ClientOnly>

  <div class="page-title" v-if="!route.path.includes('/ttm/tree')">
    <div class="title">
      <!-- 현재 페이지 아이콘 셋팅-->
      <component
        :is="props.iconSelector(props.menuPath[0]?.menuIcon)"
        :class="props.menuPath[0]?.menuIcon"
        filled
      />
      <h1 class="txt">{{ pageTitle }}</h1>

      <!-- 페이지 타이틀 툴팁 -->
      <div v-if="hasCustomTitleTooltip">
        <button
          type="button"
          class="form-toast-btn"
          :class="{ 'is-active': customTitleTooltipShow }"
          @click="customTitleTooltipShow = !customTitleTooltipShow"
        >
          <i class="fi-circle-question" />
        </button>

        <transition name="fade">
          <div class="form-toast" v-if="customTitleTooltipShow">
            <p class="txt">{{ customTitleTooltip }}</p>
            <button
              type="button"
              class="btn-close"
              title="닫기"
              @click="customTitleTooltipShow = false"
            >
              <i class="fi-xmark-thin" />
            </button>
          </div>
        </transition>
      </div>
      <!-- // 페이지 타이틀 툴팁 -->

      <!-- 메뉴 설명 토글 -->
      <div v-if="explainShow">
        <button
          type="button"
          class="form-toast-btn"
          :class="{ 'is-active': explainToastShow }"
          @click="explainToastShow = !explainToastShow"
        >
          <i class="fi-circle-question" />
        </button>

        <transition name="fade">
          <div class="form-toast" v-if="explainToastShow">
            <p class="txt">{{ explainText }}</p>
            <button
              type="button"
              class="btn-close"
              title="닫기"
              @click="explainToastShow = false"
            >
              <i class="fi-xmark-thin" />
            </button>
          </div>
        </transition>
      </div>
      <!-- // 메뉴 설명 토글 -->
    </div>

    <div class="location">
      <div class="location-link">
        <span class="home"><SvgoGnbHome /> </span>

        <template v-for="(item, index) of props.menuPath" :key="item.id">
          <!-- 경로가 없는 폴더 뎁스 메뉴 -->
          <span
            v-if="item.menuUrl === '' || item.menuUrl === null"
            class="folder"
          >
            {{ getMenuName(item, index) }} &gt;
          </span>
          <!-- 경로가 존재하는 페이지 메뉴 -->
          <nuxt-link v-else :to="item.menuUrl" :key="item.id" class="page">
            <span>{{ getMenuName(item, index) }}</span>
          </nuxt-link>
        </template>
      </div>
    </div>
  </div>

  <div
    class="page-tab"
    v-if="props.menuPath[0] && props.menuPath[0]?.MENU_TYPE_CODE === 'T'"
  >
    <div
      class="page-tab-menu scroll-hide"
      ref="pageTabMenu"
      @mousedown="tabStartSwipe($event)"
      @mousemove="tabHandleSwipe($event)"
      @mouseup="tabEndSwipe()"
    >
      <nuxt-link
        v-for="(item, i) of props.menuPath[0]?._children"
        :to="item.menuUrl"
        class="item"
        :class="{ 'is-active': item.menuUrl === props.menuPath[1].menuUrl }"
        :key="i"
      >
        <span>{{ item.menuName }}</span>
      </nuxt-link>
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import Logo from '@/assets/common/images/lxp/logo/logo.png';

const config = useRuntimeConfig();
const env = config.public.env;
const { $homepage } = useNuxtApp();
const { info } = $homepage;

// const { $storage } = useNuxtApp();
// const { setCookie, getCookie } = $storage;
// const { $auth } = useNuxtApp();
// const { roleId } = $auth;
const route = useRoute();

const props = defineProps(['menuPath', 'logo', 'iconSelector']);
const selectedRole = ref();
const metaTitle = ref('');
const selectUserId = ref(null);

// 공지사항 수정 모드 상태 확인
// const noticeIsEdit = useState('notice:isEdit', () => false);

// 공지사항 수정 모드 여부
// const isNoticeEditMode = computed(() => {
//   return (
//     route.path.startsWith('/education/board/notice/') &&
//     route.path.match(/\/education\/board\/notice\/\d+$/) &&
//     noticeIsEdit.value === true
//   );
// });

// 페이지 제목
const pageTitle = computed(() => {
  // route.meta.customTitle이 있으면 우선 사용 (동적 타이틀)
  if (route.meta?.customTitle) {
    return route.meta.customTitle;
  }

  if (route.path.includes('/setting/custom')) {
    return '테마 설정';
  }
  // 없으면 기존 로직 사용 (메뉴 경로에서 가져오기)
  return props.menuPath[props.menuPath.length - 1]?.menuName || '';
});

// breadcrumb 메뉴명 가져오기
const getMenuName = (item, index) => {
  // // 마지막 메뉴 항목이고 공지사항 수정 모드일 때
  // if (index === props.menuPath.length - 1 && isNoticeEditMode.value) {
  //   return '공지사항 수정';
  // }
  return item.menuName;
};

// 페이지 타이틀 툴팁
const customTitleTooltip = computed(() => {
  return route.meta?.customTitleTooltip || '';
});

// 툴팁 표시 여부
const hasCustomTitleTooltip = computed(() => {
  return !!route.meta?.customTitleTooltip;
});

const customTitleTooltipShow = ref();

watch(
  () => route.path,
  async (newPath) => {
    // 경로를 벗어나면 기본 메뉴 제목 설정
    pageTitle.value = props.menuPath[props.menuPath.length - 1]?.menuName || '';
    // 2025.04.02[wschoe]: 경로를 벗어나면 마찬가지로 리프레시
  }
);

watch(
  () => props.menuPath,
  () => {
    metaTitle.value = props.menuPath
      .map((item) => {
        return item.MENU_NAME;
      })
      .join(' > ');
  },
  {
    immediate: true,
  }
);

// 2023.08.18[bnJung]: 탭메뉴 스크롤 이벤트
const pageTabMenu = ref(null);
let startX = 0;
let startScrollLeft = 0;
const isSwipe = ref(false);

const tabStartSwipe = (event) => {
  startX = event.clientX;
  startScrollLeft = pageTabMenu.value.scrollLeft;
  isSwipe.value = true;
};

const tabHandleSwipe = (event) => {
  if (startX === 0) {
    return;
  }

  const deltaX = event.clientX - startX;
  pageTabMenu.value.scrollLeft = startScrollLeft - deltaX;
};

const tabEndSwipe = () => {
  startX = 0;
  isSwipe.value = false;
};

const explainToastShow = ref();
// 2024.07.29[hrkim]: 메뉴 설명 토글 버튼 노출 여부
const explainShow = computed(() => {
  const firstMenu = props.menuPath[0];
  const lastMenu = props.menuPath[props.menuPath.length - 1];

  return (
    (firstMenu?.MENU_TYPE_CODE === 'T' && firstMenu?.EXPLAIN_SHOW_YN === 'Y') ||
    lastMenu?.EXPLAIN_SHOW_YN === 'Y'
  );
});

// 2024.07.29[hrkim]: 메뉴 설명 텍스트
const explainText = computed(() => {
  const firstMenu = props.menuPath[0];
  const lastMenu = props.menuPath[props.menuPath.length - 1];

  return firstMenu?.MENU_TYPE_CODE === 'T'
    ? firstMenu?.MENU_EXPLAIN
    : lastMenu?.MENU_EXPLAIN;
});

// 2024.07.29[hrkim]: url 변경 시 토스트 메시지 숨김 처리
watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      explainToastShow.value = false;
      customTitleTooltipShow.value = false;
    }
  }
);

useSeoMeta({
  title: () => metaTitle.value,
});
</script>

<style lang="scss" scoped>
.form-toast {
  width: auto;
  min-height: auto;
}

.form-toast-btn {
  i {
    color: var(--colorText5);
    transition: color 0.2s;
  }

  &.is-active i {
    color: var(--colorMain);
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-feedback {
  // display: flex;
  // align-items: center;
  // flex-shrink: 0;
  // gap: 8px;
  // padding: 0 19px;
  // height: 34px;
  // border: 1px solid var(--colorMain);
  // border-radius: 100px;
  // background-color: #fff;
  // color: var(--colorMain);
  // font-size: 13px;
  // font-weight: 400;
  // cursor: pointer;
  // transition: all 0.2s;
  // white-space: nowrap;

  // .nuxt-icon {
  //   font-size: 16px;

  //   :deep(svg path) {
  //     fill: var(--colorMain);
  //   }
  // }

  // &:hover {
  //   background-color: var(--colorMain);
  //   color: #fff;

  //   .nuxt-icon :deep(svg path) {
  //     fill: #fff;
  //   }
  // }
}
</style>
