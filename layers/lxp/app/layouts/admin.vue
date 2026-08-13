<template>
  <div class="lxp" data-testid="e2e-default-layout-div">
    <!-- 2025.04.02[ygpark]: scss 포인트컬러 변수 활용을 위한 data-point-theme 추가 -->
    <div
      class="wrapper"
      :style="{
        '--colorMain': `#${code}`,
        '--colorMainDark': `${codeDark}`,
        '--colorMainLight': `${codeLight}`,
        '--colorMainClear': `${codeClear}`,
        'font-family': `${font}`,
      }"
      :data-point-theme="`point-theme-yellow`"
      :class="[
        { 'use-notoSans': font === 'NotoSans' },
        { 'use-pretendard': font === 'pretendard' },
        { 'use-elice': font === 'EliceDigitalBaeum' },
        { 'use-khnpHanulrim': font === 'khnpHanulrim' },
      ]"
    >
      <LXPNavigation
        :menuList="$menuList"
        :menu-path="menuPath"
        @navStateValue="navStateValue"
        :iconSelector="navMenuIconSelector"
      />
      <div class="container" id="top_container">
        <!-- 메인 경로 헤더 -->
        <LXPHeaderMain v-if="route.path === '/lxp'" />
        <!-- 서브 경로 헤더 -->
        <LXPHeaderSub
          v-else
          :menu-path="menuPath"
          :iconSelector="navMenuIconSelector"
        />
        <!-- 2026.07.23[mhlim]: SPA 페이지 라우트 이동 로딩 오버레이 컴포넌트 -->
        <RouteLoadProvider>
          <NuxtPage keepalive :navStateValue="receivedNaviValue" />
        </RouteLoadProvider>
        <!-- 오류/개선 등록 버튼 -->
        <!-- <lxp-feedback-button /> -->
        <LXPTopButton />
      </div>
    </div>

    <V1Toast
      :style="{
        '--colorMain': `#${code}`,
        '--colorMainDark': `${codeDark}`,
        '--colorMainLight': `${codeLight}`,
        '--colorMainClear': `${codeClear}`,
        'font-family': `${font}`,
      }"
      :class="[
        { 'use-notoSans': font === 'NotoSans' },
        { 'use-pretendard': font === 'pretendard' },
      ]"
    />
    <V1Alert
      :style="{
        '--colorMain': `#${code}`,
        '--colorMainDark': `${codeDark}`,
        '--colorMainLight': `${codeLight}`,
        '--colorMainClear': `${codeClear}`,
        'font-family': `${font}`,
      }"
      :class="[
        { 'use-notoSans': font === 'NotoSans' },
        { 'use-pretendard': font === 'pretendard' },
      ]"
    />

    <!-- <form-alert
      :style="{
        '--colorMain': `#${code}`,
        '--colorMainDark': `${codeDark}`,
        '--colorMainLight': `${codeLight}`,
        '--colorMainClear': `${codeClear}`,
        'font-family': `${font}`,
      }"
      :class="[
        { 'use-notoSans': font === 'NotoSans' },
        { 'use-pretendard': font === 'pretendard' },
      ]"
    /> -->

    <V1Confirm
      :style="{
        '--colorMain': `#${code}`,
        '--colorMainDark': `${codeDark}`,
        '--colorMainLight': `${codeLight}`,
        '--colorMainClear': `${codeClear}`,
        'font-family': `${font}`,
      }"
      :class="[
        { 'use-notoSans': font === 'NotoSans' },
        { 'use-pretendard': font === 'pretendard' },
      ]"
    />

    <!-- <V1Popup
      :style="{
        '--colorMain': `#${code}`,
        '--colorMainDark': `${codeDark}`,
        '--colorMainLight': `${codeLight}`,
        '--colorMainClear': `${codeClear}`,
        'font-family': `${font}`,
      }"
      :class="[
        { 'use-notoSans': font === 'NotoSans' },
        { 'use-pretendard': font === 'pretendard' },
      ]"
    />

    <V2Popup
      :style="{
        '--colorMain': `#${code}`,
        '--colorMainDark': `${codeDark}`,
        '--colorMainLight': `${codeLight}`,
        '--colorMainClear': `${codeClear}`,
        'font-family': `${font}`,
      }"
      :class="[
        { 'use-notoSans': font === 'NotoSans' },
        { 'use-pretendard': font === 'pretendard' },
      ]"
    /> -->
  </div>
</template>
<script setup>
import RouteLoadProvider from '../components/RouteLoadProvider.vue';

const config = useRuntimeConfig();
const { $menuList, $navigationReload } = useNuxtApp();
const { $tab } = useNuxtApp();
// const { roleId } = $auth;
const { $bus } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const menuData = ref('');
const menuPath = ref([]);
const showModal = ref(false);
const showInquiryModal = ref(false);
const isOrgn = ref(false);

// 2023.07.28[bnJung]: 색상테마 설정 - default: 4a509f
const { $homepage } = useNuxtApp();
const {
  colorCode: code,
  font,
  colorType: type,
  defaultColorSet,
  themeColorSelector,
} = $homepage;

const codeRgb = computed(() => {
  const codeHex = code.value.match(/.{1,2}/g);

  return codeHex.map((item) => {
    return parseInt(item, 16);
  });
});

// 2025.10.14[mhlim]: 기본 테마 선택 컬러 코드가 포함된 테마 객체 반환
const selectDefaultTheme = computed(() => {
  if (type.value === 'theme') {
    return defaultColorSet.filter((theme) => {
      if (Array.isArray(theme.color) && theme.color.includes(code.value)) {
        return theme;
      }
    })[0];
  }
});

// 사용자 지정 or 기본 테마 선택 컬러 코드에 따른 dark 컬러
const codeDark = computed(() => {
  if (type.value === 'user') {
    const code = [
      codeRgb.value[0] - 28,
      codeRgb.value[1] - 29,
      codeRgb.value[2] - 49,
    ];
    const formatCode = [];

    formatRgb(code, formatCode);

    return 'rgb(' + formatCode.join(',') + ')';
  } else {
    return `#${selectDefaultTheme.value?.color[0]}`;
  }
});

// 사용자 지정 컬러 사용 시 light 컬러
const codeLight = computed(() => {
  if (type.value === 'user') {
    const code = [
      codeRgb.value[0] + 29,
      codeRgb.value[1] + 28,
      codeRgb.value[2] + 15,
    ];
    const formatCode = [];

    formatRgb(code, formatCode);

    return 'rgba(' + formatCode.join(',') + ')';
  } else {
    return `#${selectDefaultTheme.value?.color[2]}`;
  }
});

const codeClear = computed(() => {
  if (type.value === 'user') {
    // code 변수에서 RGB 값을 추출
    const r = parseInt(code.value.substr(0, 2), 16);
    const g = parseInt(code.value.substr(2, 2), 16);
    const b = parseInt(code.value.substr(4, 2), 16);

    // RGB 값을 HSL로 변환
    return rgbToHsl(r, g, b);
  } else {
    return `#${selectDefaultTheme.value?.color[3]}`;
  }
});

// dark 또는 light로 계산 된 rgb값 min, max 체크 후 변경
const formatRgb = (item, target) => {
  item.forEach((code) => {
    if (code < 0) {
      code = 0;
    } else if (code > 255) {
      code = 255;
    }

    target.push(code);
  });
};

// colorClear를 위한 이벤트
const rgbToHsl = (r, g, b, type) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // 그레이 스케일
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  // 2024.06.10[hrkim]: medium일 경우 colorClear 보다 10% 어둡게
  l = type === 'medium' ? 87.3 : 97;

  return `hsl(${h}, ${s}%, ${l}%)`;
};

// 2023.09.19[bnJung]: 전달받은 네비게이션 접힘 여부
const receivedNaviValue = ref();

const navStateValue = (data) => {
  receivedNaviValue.value = data;
};

function findNodePaths(tree, targetUrl, currentPath = []) {
  const paths = [];

  // tree가 배열이 아니거나 undefined/null인 경우 빈 배열 반환
  if (!Array.isArray(tree) || !tree) {
    return paths;
  }

  for (const node of tree) {
    const newPath = [...currentPath, node];

    // 2024.02.16[hjlee]: 메인에서 이동시 fullPath로 메뉴명을 찾을 수 있도록 세팅
    if (targetUrl.includes('?mainType')) {
      targetUrl = targetUrl.split('?')[0];
    }

    // 2025.07.17[mhlim]: 새로운 메뉴 구조에 맞게 menuUrl 사용
    if (node.menuUrl === targetUrl) {
      paths.push(newPath);
    }

    if (node._children && node._children.length > 0) {
      const childPaths = findNodePaths(node._children, targetUrl, newPath);
      paths.push(...childPaths);
    }
  }

  return paths;
}

watch(
  () => route.fullPath,
  async () => {
    await themeColorSelector();
    await nextTick();

    await $navigationReload();
    // menuList.value가 존재하고 배열인 경우에만 실행
    if ($menuList?.value && Array.isArray($menuList?.value)) {
      const path = findNodePaths(
        $menuList.value,
        route.meta.auth ?? route.path
      );
      if (path && path.length > 0) {
        menuPath.value = path[0];
      } else {
        menuPath.value = [];
      }
    } else {
      menuPath.value = [];
    }
  },
  { deep: true, immediate: true }
);

// watch(roleId, () => {
//   menuRefresh();
// });

const reloadMenu = () => {
  menuRefresh();
};

const clearPageCache = (key) => {
  remove(key.path);
};

// 2026.05.27[mhlim]: 라우트 변경 시, 레이아웃 컨펌 비활성화 처리
watch(
  () => route.path,
  () => {
    useConfirm().close();
  },
  {
    immediate: true,
    deep: true,
  }
);

const ICON_MAP = {
  'nav-setting': defineAsyncComponent(
    () => import('@/assets/common/images/lxp/svg/GNB/setting.svg')
  ),
  'nav-file-pen': defineAsyncComponent(
    () => import('@/assets/common/images/lxp/svg/GNB/paper-pen.svg')
  ),
  'nav-pen': defineAsyncComponent(
    () => import('@/assets/common/images/lxp/svg/GNB/pen-line.svg')
  ),
  pencil: defineAsyncComponent(
    () => import('@/assets/common/images/lxp/svg/GNB/pen-line.svg')
  ),
  'graduation-cap': defineAsyncComponent(
    () => import('@/assets/common/images/lxp/svg/GNB/open-book.svg')
  ),
  'file-pencil': defineAsyncComponent(
    () => import('@/assets/common/images/lxp/svg/GNB/paper-pen.svg')
  ),
  'book-open': defineAsyncComponent(
    () => import('@/assets/common/images/lxp/svg/GNB/open-book.svg')
  ),
  'common-setting': defineAsyncComponent(
    () => import('@/assets/common/images/lxp/svg/GNB/setting.svg')
  ),
  category: defineAsyncComponent(
    () => import('@/assets/common/images/lxp/svg/GNB/category.svg')
  ),
  folder: defineAsyncComponent(
    () => import('@/assets/common/images/lxp/svg/TableDepth/open-folder.svg')
  ),
};

const navMenuIconSelector = (iconType) => {
  return ICON_MAP[iconType] ?? null;
};

onMounted(async () => {
  window['routerPush'] = (url) => {
    router.push(url);
  };

  await themeColorSelector();

  // await menuListRefresh();
});
</script>
