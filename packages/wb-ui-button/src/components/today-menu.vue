<template>
  <div class="today-menu">
    <div class="cont">
      <!-- 클릭 스와이프 버튼 -->
      <button
        type="button"
        title="이전"
        class="btn-swipe-left"
        @mousedown="scrollMenu('prev', 'start')"
        @mouseup="scrollMenu('prev', 'stop')"
        @mouseleave="scrollMenu('prev', 'stop')"
        :disabled="scrollPos < 1"
      >
        <i class="icon" />
      </button>
      <button
        type="button"
        title="다음"
        class="btn-swipe-right"
        @mousedown="scrollMenu('next', 'start')"
        @mouseup="scrollMenu('next', 'stop')"
        @mouseleave="scrollMenu('next', 'stop')"
        :disabled="scrollRange <= scrollPos"
      >
        <i class="icon" />
      </button>
      <!-- // 클릭 스와이프 버튼 -->

      <!-- 메뉴탭 -->
      <component
        :is="draggableRef"
        v-if="draggableRef !== null"
        :list="sortTabs"
        item-key="meta"
        class="menu scroll-hide"
        tag="ul"
        ref="menuContainer"
        animation="200"
        @end="tabMenuOrderChanged($event)"
      >
        <template #item="{ element: item, index }">
          <li
            class="menu-item"
            :class="[
              { 'is-active': meta === item.meta },
              { 'is-current': meta === item.meta },
            ]"
            @click.middle="deleteTab(index, item.meta)"
            @auxclick.prevent
            @mousedown.right="mouseClickMenu(index, item, $event)"
            @contextmenu.prevent
          >
            <div class="menu-item-link">
              <button
                title="고정"
                type="button"
                class="btn-pin"
                :class="{ 'is-active': item.fixed }"
                @click.prevent="item.fixed = !item.fixed"
              >
                <svgo-e-t-c-pin v-if="item.fixed" />
                <svgo-e-t-c-pin-line v-else />
              </button>
              <nuxt-link :to="item.url" class="txt">{{ item.menu }}</nuxt-link>
              <button
                type="button"
                class="btn-del"
                title="삭제"
                @click="[deleteTab(index, item.meta), getScrollRange()]"
              >
                <svgo-e-t-c-circle-delete />
              </button>
            </div>
          </li>
        </template>
      </component>
      <!-- // 메뉴탭 -->
    </div>
  </div>
  <div class="tooltip btn-s" ref="indexTooltipRef" :style="tooltipStyle">
    <transition name="fade" v-if="indexToolTip">
      <div class="tooltip-box">
        <ul class="tooltip-list">
          <li class="item" v-for="(item, index) in buttonList">
            <!-- 조건에 따른 버튼 비활성화 추가 -->
            <button
              type="button"
              @click="clickMenuEvent(index)"
              :disabled="isSelectDisabled(index)"
              :class="{ disabled: isSelectDisabled(index) }"
            >
              {{ item }}
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';
import { isNavigationFailure, NavigationFailureType } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { $tab, $bus } = useNuxtApp();
const draggableRef = shallowRef(null);
const { tabs } = $tab;

const meta = computed(() => {
  if (route.meta.tab) {
    let tab = route.meta.tab;

    for (const [key, value] of Object.entries(route.params)) {
      tab = tab.replace(`{${key}}`, value);
    }

    return tab;
  } else {
    return route.path;
  }
});

const sortTabs = computed(() => {
  return tabs.value.slice().sort((a, b) => {
    if (a.fixed && !b.fixed) {
      return -1;
    }

    if (!a.fixed && b.fixed) {
      return 1;
    }

    return 0;
  });
});

const fixed = ref(false);

const scrollRange = ref(); // 스크롤 가능범위

const menuContainer = ref(null);
const menuContainerWidth = ref();

// 2023.09.21[bnJung]: 버튼 클릭 스크롤
let menuMoving = null;
const scrollPos = ref(0);

const scrollMenu = (direction, move) => {
  if (move === 'start') {
    menuMoving = setInterval(() => {
      if (direction === 'prev') {
        menuContainer.value.$el.scrollTo({
          left: menuContainer.value.$el.scrollLeft - 5,
        });
        scrollPos.value = menuContainer.value.$el.scrollLeft - 5;

        if (menuContainer.value.$el.scrollLeft <= 2) {
          clearInterval(menuMoving);
          scrollPos.value = menuContainer.value.$el.scrollLeft = 0;
        }
      } else {
        menuContainer.value.$el.scrollTo({
          left: menuContainer.value.$el.scrollLeft + 5,
        });
        scrollPos.value = menuContainer.value.$el.scrollLeft + 5;

        if (scrollPos.value > scrollRange.value) {
          clearInterval(menuMoving);
          scrollPos.value = scrollRange.value;
        }
      }
    });
  } else {
    clearInterval(menuMoving);
  }
};

// 메뉴영역과 전체메뉴 넓이 구하기
const getScrollRange = () => {
  nextTick(() => {
    const menu = document.getElementsByClassName('today-menu');

    if (menu.length > 0) {
      const menuWidth = menu[0].clientWidth;

      const menuItems = document.getElementsByClassName('menu-item');
      let totalWidth = 0;

      for (let i = 0; i < menuItems.length; i++) {
        const menuItem = menuItems[i];
        const computedStyle = getComputedStyle(menuItem);
        const widthWithMargin =
          menuItem.offsetWidth +
          parseFloat(computedStyle.marginLeft) +
          parseFloat(computedStyle.marginRight);

        totalWidth += widthWithMargin;
      }
      menuContainerWidth.value = menuWidth;
      scrollRange.value = totalWidth - menuWidth + 34;
    }
  });
};

const deleteTab = async (index, tabMeta) => {
  const fixIndex = tabs.value.findIndex((tab) => tab.meta === tabMeta);
  const tab = tabs.value[fixIndex];

  if (meta.value === tabMeta) {
    let target;

    if (tabs.value.length === 1) {
      target = '/lxp';
    } else if (tabs.value.length - 1 === index) {
      target = sortTabs.value[index - 1].url;
    } else {
      target = sortTabs.value[index + 1].url;
    }

    const failure = await router.push(target);

    // 2026.07.02 [wschoe]: 네비게이션 가드에서 이동 취소 시 탭을 제거하지 않도록 방지
    if (
      isNavigationFailure(
        failure,
        NavigationFailureType.aborted | NavigationFailureType.cancelled
      )
    )
      return;
  }

  $bus.emit('clear-page-cache', { path: tab.name });
  tabs.value.splice(fixIndex, 1);
};

const moveToOffsetLeft = ref();

// active 메뉴로 스크롤
const scrollToCurrent = (state) => {
  nextTick(() => {
    const menu = document.getElementsByClassName('today-menu');

    if (menu.length > 0) {
      const currentMenuItem = menu[0].getElementsByClassName('is-current');
      const itemWidth =
        currentMenuItem.length > 0 ? currentMenuItem[0].offsetWidth + 34 : 0;
      const moveOffset =
        currentMenuItem.length > 0 ? currentMenuItem[0].offsetLeft : 0;

      moveToOffsetLeft.value = moveOffset;

      if (state === 'mounted') {
        //
        if (moveToOffsetLeft.value + itemWidth > menuContainerWidth.value) {
          menuContainer.value.$el.scrollTo({ left: moveToOffsetLeft.value });
          scrollPos.value = moveToOffsetLeft.value;
        }
      } else {
        if (moveToOffsetLeft.value + itemWidth < menuContainerWidth.value) {
          // 2025.10.31[njlee]: menuContainer.value가 null인 경우 처리
          if (
            menuContainer.value?.$el &&
            typeof menuContainer.value.$el.scrollTo === 'function'
          ) {
            menuContainer.value.$el.scrollTo({ left: -1 });
            scrollPos.value = 0;
          }
        } else {
          if (
            scrollPos.value + menuContainerWidth.value - itemWidth / 2 <
              moveToOffsetLeft.value ||
            scrollPos.value > moveToOffsetLeft.value
          ) {
            menuContainer.value.$el.scrollTo({ left: moveToOffsetLeft.value });
            scrollPos.value = moveToOffsetLeft.value;
          }
        }
      }
    }
  });
};

// 2025.10.29[mhlim]: 탭 드래그 드롭 순서 변경 이벤트
const tabMenuOrderChanged = (event) => {
  // 현재 탭 배열 전역 상태값 복사본 생성
  const currentTabs = [...tabs.value];

  // 옮기려는 인덱스의 탭 제거
  const oldIndexTab = currentTabs.splice(event.oldIndex, 1);
  // 옮길 인덱스 위치에 탭 삽입
  currentTabs.splice(event.newIndex, 0, ...oldIndexTab);

  // 전역 상태값 업데이트
  tabs.value = currentTabs;
};

const buttonList = [
  '다른 탭 모두 닫기',
  '왼쪽 탭 모두 닫기',
  '오른쪽 탭 모두 닫기',
];
/* 우클릭 메뉴 인덱스 툴팁 */
const indexTooltipRef = ref();
const indexToolTip = ref(false);

// 2025.01.15[wschoe]: 툴팁 위치 초기화
const tooltipStyle = ref({ top: '0px', left: '0px' });

onClickOutside(indexTooltipRef, (e) => {
  indexToolTip.value = false;
});

const clickMenuIndex = ref();
const clickMenu = ref();

// 2025.01.17[wschoe]: 탭 삭제를 위해 배열 정렬 선 수행
const sort = () => {
  tabs.value = [
    ...tabs.value.filter((tab) => tab.fixed),
    ...tabs.value.filter((tab) => !tab.fixed),
  ];
};

// 우클릭 동작
const mouseClickMenu = (index, item, e) => {
  // 2025.01.15[wschoe]: 툴팁이 우클릭한 위치에서 표시
  e.preventDefault();

  // 클릭한 지점의 좌표값을 저장
  // 2025.04.09[wschoe]: 좌표를 문서 기준으로 변경
  const offsetX = e.pageX + 160;
  const offsetY = e.pageY;

  // 위치 보정
  const adjustedX = Math.min(offsetX, window.innerWidth);
  const adjustedY = Math.min(offsetY, window.innerHeight);

  // 툴팁 위치를 좌표 값으로 초기화
  tooltipStyle.value = {
    top: `${adjustedY}px`,
    left: `${adjustedX}px`,
    position: 'absolute',
    zIndex: 999,
  };
  //

  indexToolTip.value = !indexToolTip.value;

  clickMenuIndex.value = index;
  clickMenu.value = {
    url: item.url,
    menu: item.menu,
    meta: item.meta,
    name: item.name,
    fixed: item.fixed,
  };

  // 2025.01.17[wschoe]: 우클릭 시 배열 정렬 선 수행
  sort();
};

// 우클릭 메뉴 리스트 버튼 클릭 이벤트
const clickMenuEvent = async (buttonIndex) => {
  indexToolTip.value = false;

  // 2025.01.17[wschoe]: 고정된 탭이 삭제되지 않도록 변수 초기화 및 로직 추가
  const fixedTabs = tabs.value.filter((tab) => tab.fixed); // 고정된 탭만 담아놓음
  const sliceLeftTabs = ref();
  const sliceRightTabs = ref();

  switch (buttonIndex) {
    // 닫기
    case 0:
      await deleteTab(clickMenuIndex.value, clickMenu.value.meta);
      break;

    // 다른 탭 모두 닫기
    case 1:
      await router.push(sortTabs.value[clickMenuIndex.value].url);

      tabs.value.forEach((tab) => {
        if (tab.meta !== clickMenu.value.meta) {
          $bus.emit('clear-page-cache', { path: tab.name });
        }
      });

      // 클릭한 탭, 고정 탭만 남김
      tabs.value = [...fixedTabs, clickMenu.value];

      break;

    // 왼쪽 탭 모두 닫기
    case 2:
      await router.push(sortTabs.value[clickMenuIndex.value].url);

      tabs.value.forEach((tab, index) => {
        if (index < clickMenu.value.index) {
          $bus.emit('clear-page-cache', { path: tab.name });
        }
      });

      // 클릭한 탭의 오른쪽 탭들 모두 담아놓음
      sliceLeftTabs.value = tabs.value.slice(clickMenuIndex.value);

      // 고정 탭 + 오른쪽 탭들 담아서 저장
      tabs.value = [...fixedTabs, ...sliceLeftTabs.value];

      break;

    // 오른쪽 탭 모두 닫기
    case 3:
      await router.push(sortTabs.value[clickMenuIndex.value].url);

      tabs.value.forEach((tab, index) => {
        if (index > clickMenu.value.index) {
          $bus.emit('clear-page-cache', { path: tab.name });
        }
      });

      // 클릭한 탭의 왼쪽 탭들 모두 담아놓음
      sliceRightTabs.value = tabs.value.splice(0, clickMenuIndex.value + 1);

      // 왼쪽 탭들 담아서 저장
      tabs.value = sliceRightTabs.value;

      break;
  }
};

// 2025.01.17[wschoe]: 현재 탭 상태에 따른 탭 버튼 비활성화 기능 추가
const isAllTabs = computed(() => {
  const nonFixedTabs = tabs.value.filter((tab) => !tab.fixed); // 비고정 탭을 담아놓음
  const unselectedTabs = nonFixedTabs.filter(
    (tab) => tab.meta !== clickMenu.value.meta
  ); // 클릭한 탭을 제외
  const isAllTabsFixedOrEmpty = nonFixedTabs.length === 0;
  const isOtherTabsFixedOrEmpty = unselectedTabs.length === 0;

  return isAllTabsFixedOrEmpty || isOtherTabsFixedOrEmpty; // 각 조건이 충족 시 true 반환
});

const isLeftTabs = computed(() => {
  const leftTabs = tabs.value
    .slice(0, clickMenuIndex.value)
    .filter((tab) => !tab.fixed); // 클릭한 탭 기준 왼쪽 탭들 인덱스를 담아놓음(고정 탭 제외)

  return leftTabs.length == 0; // 왼쪽 탭 인덱스들이 없거나 고정 탭뿐이면 true를 반환
});

const isRightTabs = computed(() => {
  const rightTabs = tabs.value
    .slice(clickMenuIndex.value + 1)
    .filter((tab) => !tab.fixed); // 클릭한 탭 기준 오른쪽 탭들 인덱스를 담아놓음(고정 탭 제외)

  return rightTabs.length == 0; // 오른쪽 탭 인덱스들이 없거나 고정 탭뿐이면 true를 반환
});

const isSelectDisabled = (index) => {
  // "모두 닫기", "다른 탭 모두 닫기"
  if (index === 1 || index === 2) {
    return isAllTabs.value;
  }

  // "왼쪽 탭 모두 닫기"
  if (index === 3) {
    return isLeftTabs.value;
  }

  // "오른쪽 탭 모두 닫기"
  if (index === 4) {
    return isRightTabs.value;
  }

  return false;
};

onMounted(async () => {
  if (import.meta.client) {
    const draggable = await import('vuedraggable');
    draggableRef.value = draggable.default;
  }

  getScrollRange();
  scrollToCurrent('mounted');
});

watch(
  () => route.path,
  () => {
    getScrollRange();
    scrollToCurrent('routeChange');
  }
);
</script>

<style lang="scss" scoped>
@import '../assets/button.scss';

// 2025.01.17[wschoe]: 우클릭 버튼 비활성화 시 폰트 컬러
.disabled {
  color: #cccccc;
}
</style>
