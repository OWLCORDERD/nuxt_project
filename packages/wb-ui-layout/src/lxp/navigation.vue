<template>
  <!-- 관리자 페이지 좌측 네비게이션 -->
  <template v-if="!props.isSample">
    <nav
      :class="{
        'is-fold': navFold,
      }"
    >
      <div class="btn-area" :class="{ 'has-search': props.isSearchable }">
        <button
          type="button"
          class="nav-fold-btn"
          :class="{ 'is-active': navFold }"
          @click="navToggle()"
          title="네비게이션 토글"
        >
          <SvgoGNBClose v-if="!navFold" />
          <SvgoGNBOpen v-else />
        </button>

        <div class="search-menu" v-if="props.isSearchable && !navFold">
          <input
            type="text"
            placeholder="메뉴 찾기"
            class="search-menu-input"
            v-model="searchMenuName"
          />
          <button type="button" class="search-menu-btn">
            <svgo-Button-glass />
          </button>
        </div>
      </div>
      <ul class="nav">
        <template v-for="(depth1, i) in props.menuList">
          <li
            class="nav-item depth1"
            :class="{
              'is-active': isSearchActive
                ? searchExpandedDepth1.has(i)
                : oneDepthOpened === i && route.path === depth1.menuUrl,
              'is-search-matched':
                isSearchActive && searchMatchedIds.has(depth1.id),
            }"
            v-if="
              (depth1.isActive || depth1.isNavigation) &&
              isDepth1Visible(depth1, i)
            "
            :key="i"
          >
            <!-- 자식 2뎁스 메뉴가 존재할 경우 -->
            <template v-if="depth1._children && depth1.menuType === 'FOLDER'">
              <div class="link" @click="menuToggle('depth1', i)">
                <!-- 2025.07.16 [mhlim]: 메뉴 아이콘 타입에 따른 svg 아이콘 셀렉터 -->
                <component
                  :is="props.iconSelector(depth1.menuIcon)"
                  :class="depth1.menuIcon"
                />
                <span class="txt" v-if="!oneDepthNavFold && !navFold">{{
                  depth1.menuName
                }}</span>
              </div>
            </template>
            <!-- 자식 2뎁스 메뉴가 없을 경우 -->
            <template v-else-if="depth1.menuType === 'PAGE'">
              <nuxt-link :to="depth1.menuUrl" class="link">
                <component
                  :is="props.iconSelector?.(depth1.menuIcon)"
                  :class="depth1.menuIcon"
                />
                <span class="txt" v-if="!navFold">{{ depth1.menuName }}</span>
              </nuxt-link>
            </template>

            <!-- 2depth 없음 END-->
            <!-- depth 2 -->
            <transition name="slide">
              <ul
                v-if="
                  (isSearchActive
                    ? searchExpandedDepth1.has(i)
                    : oneDepthOpened === i) &&
                  !oneDepthNavFold &&
                  !navFold
                "
              >
                <template v-for="(depth2, j) in depth1._children" :key="j">
                  <li
                    class="nav-item depth2"
                    v-if="depth2.isNavigation && isDepth2Visible(depth2)"
                    :class="{
                      'is-search-matched':
                        isSearchActive && searchMatchedIds.has(depth2.id),
                    }"
                  >
                    <nuxt-link
                      :to="depth2.menuUrl"
                      class="link"
                      :class="{
                        'is-active': isMenuActive(
                          depth2 ?? {},
                          menuPath[1]?.menuName
                        ),
                      }"
                      @click="menuToggle('depth2', `${j}_${depth2.menuName}`)"
                    >
                      <span class="icon"><i /></span>
                      <p class="txt" v-if="!twoDepthNavFold">
                        <span>{{ depth2.menuName }}</span>
                      </p>
                    </nuxt-link>

                    <!-- depth 2 END -->

                    <!-- depth 3 
                    + 2뎁스의 하위 메뉴중 네비게이션 메뉴가 포함되어 있을때에만 노출 처리-->
                    <transition name="slide">
                      <ul
                        v-if="
                          (isSearchActive
                            ? searchExpandedDepth2.has(
                                `${j}_${depth2.menuName}`
                              )
                            : twoDepthOpened === `${j}_${depth2.menuName}`) &&
                          !twoDepthNavFold &&
                          depth2._children &&
                          depth2._children.length > 0 &&
                          depth2._children.filter((child) => child.isNavigation)
                            .length > 0
                        "
                        class="depth3-list"
                      >
                        <!-- 2025.07.31 [mhlim]: 3뎁스 메뉴 목록중에 네비게이션 메뉴만 노출 처리 -->
                        <template
                          v-for="(depth3, k) in depth2._children"
                          :key="k"
                        >
                          <li
                            class="nav-item depth3"
                            v-if="depth3.isNavigation"
                            :class="{
                              'is-search-matched':
                                isSearchActive &&
                                searchMatchedIds.has(depth3.id),
                            }"
                          >
                            <nuxt-link
                              :to="depth3.menuUrl"
                              class="link"
                              :class="{
                                'is-active': isMenuActive(
                                  depth3 ?? {},
                                  menuPath[2]?.menuName
                                ),
                              }"
                            >
                              <span class="icon"><i /></span>
                              <p class="txt">
                                <span>{{ depth3.menuName }}</span>
                              </p>
                            </nuxt-link>
                          </li>
                        </template>
                      </ul>
                    </transition>
                    <!-- depth 3 END -->
                  </li>
                </template>
              </ul>
            </transition>
          </li>
        </template>
      </ul>

      <ul class="setting">
        <li class="setting-item">
          <NuxtLink :to="goMainPage()">
            <SvgoGNBHome />
          </NuxtLink>
        </li>
        <li class="setting-item">
          <NuxtLink :to="goSettingPage()">
            <SvgoGNBSetting />
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </template>

  <!-- 관리자 가이드 > 네비게이션 샘플 -->
  <template v-if="props.isSample">
    <div
      class="guide-sample-nav no-fixed"
      :class="{
        'is-fold': props.sampleType === 'fold',
      }"
    >
      <div class="btn-area" :class="{ 'has-search': props.isSearchable }">
        <button
          type="button"
          class="nav-fold-btn"
          :class="{ 'is-active': props.sampleType === 'fold' }"
          title="네비게이션 토글"
        >
          <SvgoGNBClose v-if="props.sampleType !== 'fold'" />
          <SvgoGNBOpen v-else />
        </button>

        <div class="search-menu" v-if="props.isSearchable && !navFold">
          <input
            type="text"
            placeholder="메뉴 찾기"
            class="search-menu-input"
            v-model="searchMenuName"
          />
          <button type="button" class="search-menu-btn">
            <svgo-Button-glass />
          </button>
        </div>
      </div>
      <ul class="nav">
        <template v-for="(depth1, i) in props.menuList">
          <li
            class="nav-item depth1"
            :class="{
              'is-active': isSearchActive
                ? searchExpandedDepth1.has(i)
                : oneDepthOpened === i,
              'is-search-matched':
                isSearchActive && searchMatchedIds.has(depth1.id),
            }"
            v-if="
              (depth1.isActive || depth1.isNavigation) &&
              isDepth1Visible(depth1, i)
            "
            :key="i"
          >
            <!-- 자식 2뎁스 메뉴가 존재할 경우 -->
            <template v-if="depth1._children && depth1.menuType === 'FOLDER'">
              <div class="link" @click="menuToggle('depth1', i)">
                <!-- 2025.07.16 [mhlim]: 메뉴 아이콘 타입에 따른 svg 아이콘 셀렉터 -->
                <component
                  :is="props.iconSelector(depth1.menuIcon)"
                  :class="depth1.menuIcon"
                />
                <span class="txt" v-if="props.sampleType !== 'fold'">{{
                  depth1.menuName
                }}</span>
              </div>
            </template>
            <!-- 자식 2뎁스 메뉴가 없을 경우 -->
            <template v-else-if="depth1.menuType === 'PAGE'">
              <nuxt-link :to="depth1.menuUrl" class="link">
                <component
                  :is="props.iconSelector?.(depth1.menuIcon)"
                  :class="depth1.menuIcon"
                />
                <span class="txt" v-if="props.sampleType !== 'fold'">{{
                  depth1.menuName
                }}</span>
              </nuxt-link>
            </template>

            <!-- 2depth 없음 END-->
            <!-- depth 2 -->
            <transition name="slide">
              <ul
                v-if="
                  depth1._children &&
                  depth1._children.length > 0 &&
                  (isSearchActive
                    ? searchExpandedDepth1.has(i)
                    : props.sampleType !== 'fold')
                "
              >
                <template v-for="(depth2, j) in depth1._children" :key="j">
                  <li
                    class="nav-item depth2"
                    v-if="depth2.isNavigation && isDepth2Visible(depth2)"
                    :class="{
                      'is-search-matched':
                        isSearchActive && searchMatchedIds.has(depth2.id),
                    }"
                  >
                    <nuxt-link class="link">
                      <span class="icon"><i /></span>
                      <p class="txt" v-if="!twoDepthNavFold">
                        <span>{{ depth2.menuName }}</span>
                      </p>
                    </nuxt-link>

                    <!-- depth 2 END -->

                    <!-- depth 3 
                    + 2뎁스의 하위 메뉴중 네비게이션 메뉴가 포함되어 있을때에만 노출 처리-->
                    <transition name="slide">
                      <ul
                        v-if="
                          depth2._children &&
                          depth2._children.length > 0 &&
                          depth2._children.filter((child) => child.isNavigation)
                            .length > 0 &&
                          (isSearchActive
                            ? searchExpandedDepth2.has(
                                `${j}_${depth2.menuName}`
                              )
                            : props.sampleType !== 'fold')
                        "
                        class="depth3-list"
                      >
                        <!-- 2025.07.31 [mhlim]: 3뎁스 메뉴 목록중에 네비게이션 메뉴만 노출 처리 -->
                        <template
                          v-for="(depth3, k) in depth2._children"
                          :key="k"
                        >
                          <li
                            class="nav-item depth3"
                            v-if="depth3.isNavigation"
                            :class="{
                              'is-search-matched':
                                isSearchActive &&
                                searchMatchedIds.has(depth3.id),
                            }"
                          >
                            <nuxt-link class="link">
                              <span class="icon"><i /></span>
                              <p class="txt">
                                <span>{{ depth3.menuName }}</span>
                              </p>
                            </nuxt-link>
                          </li>
                        </template>
                      </ul>
                    </transition>
                    <!-- depth 3 END -->
                  </li>
                </template>
              </ul>
            </transition>
          </li>
        </template>
      </ul>

      <ul class="setting">
        <li class="setting-item">
          <NuxtLink :to="goMainPage()">
            <SvgoGNBHome />
          </NuxtLink>
        </li>
        <li class="setting-item">
          <NuxtLink :to="goSettingPage()">
            <SvgoGNBSetting />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </template>
</template>

<script setup>
const route = useRoute();
const emit = defineEmits(['menuData', 'navToggle']);
const props = defineProps({
  menuList: Array,
  menuPath: Array,
  isSample: Boolean,
  sampleType: String,
  isSearchable: Boolean,
  iconSelector: Function,
});

const searchMenuName = ref('');
const navFold = ref(false);

// ─── 메뉴 검색 (디바운스 + DFS) ───────────────────────────────────────────────
const searchMatchedIds = ref(new Set());
const searchExpandedDepth1 = ref(new Set());
const searchExpandedDepth2 = ref(new Set());

const isSearchActive = computed(() => searchMenuName.value.trim().length > 0);

/** 1뎁스 항목을 검색 결과 기준으로 노출할지 여부 */
const isDepth1Visible = (depth1, i) =>
  !isSearchActive.value ||
  searchMatchedIds.value.has(depth1.id) ||
  searchExpandedDepth1.value.has(i);

/** 2뎁스 항목을 검색 결과 기준으로 노출할지 여부 */
const isDepth2Visible = (depth2) =>
  !isSearchActive.value || searchMatchedIds.value.has(depth2.id);

/** DFS: 쿼리와 일치하는 메뉴 id 집합과 자동 펼침 인덱스 수집 */
const runSearchDFS = (query) => {
  const matchedIds = new Set();
  const expandDepth1 = new Set();
  const expandDepth2 = new Set();

  if (query && props.menuList) {
    const q = query.toLowerCase();
    props.menuList.forEach((depth1, i) => {
      let d1Hit = !!depth1.menuName?.toLowerCase().includes(q);
      depth1._children?.forEach((depth2, j) => {
        let d2Hit = !!depth2.menuName?.toLowerCase().includes(q);
        depth2._children?.forEach((depth3) => {
          if (depth3.menuName?.toLowerCase().includes(q)) {
            matchedIds.add(depth3.id);
            d2Hit = true;
            d1Hit = true;
          }
        });
        if (d2Hit) {
          matchedIds.add(depth2.id);
          expandDepth1.add(i);
          expandDepth2.add(`${j}_${depth2.menuName}`);
          d1Hit = true;
        }
      });
      if (d1Hit) {
        matchedIds.add(depth1.id);
        expandDepth1.add(i);
      }
    });
  }

  searchMatchedIds.value = matchedIds;
  searchExpandedDepth1.value = expandDepth1;
  searchExpandedDepth2.value = expandDepth2;
};

/** 0.5초 디바운스 후 DFS 실행 */
let _searchTimer = null;
watch(searchMenuName, (val) => {
  clearTimeout(_searchTimer);
  _searchTimer = setTimeout(() => runSearchDFS(val.trim()), 500);
});
// ─────────────────────────────────────────────────────────────────────────────

// 메뉴 1뎁스 펼침 여부
const oneDepthNavFold = ref(false);
// 메뉴 2뎁스 펼침 여부
const twoDepthNavFold = ref(false);

// 메뉴 1뎁스 펼침 인덱스
const oneDepthOpened = ref('');
// 메뉴 2뎁스 펼침 인덱스
const twoDepthOpened = ref('');

watch(
  () => props.menuPath,
  () => {
    if (!props.menuPath) return;
    if (route.path !== '/') {
      for (let i = 0; i < props.menuList.length; i++) {
        const menu = props.menuList[i];
        if (menu.id === props.menuPath[0]?.id) {
          oneDepthOpened.value = i;
        }

        // 현 페이지 경로가 3뎁스 메뉴 페이지일 시, 3뎁스 메뉴가 포함된 2뎁스 펼침 인덱스 업데이트
        if (menu._children && menu._children.length > 0) {
          menu._children.forEach((child, i) => {
            if (child.id === props.menuPath[1]?.id) {
              twoDepthOpened.value = `${i}_${child.menuName}`;
            }
          });
        }
      }
    } else {
      oneDepthOpened.value = '';
    }
  },
  {
    immediate: true,
  }
);

// 2025.08.06 [mhlim]: 메뉴 아이콘 타입에 따른 svg 아이콘 셀렉터

// 2025.12.02[mhlim]: 플랫폼에 따른 메인 페이지 이동 경로 셀렉팅
const goMainPage = () => {
  return '/';
};

// 2025.12.02[mhlim]: 플랫폼에 따른 설정 페이지 이동 경로 셀렉팅
const goSettingPage = () => {
  return '/setting/custom';
};

// 2025.08.21 [mhlim]: 메뉴 펼침 토글 상태 업데이트
const menuToggle = (depth, index) => {
  if (depth === 'depth1') {
    // 1뎁스 펼침 활성화 및 인덱스 업데이트
    if (oneDepthNavFold.value) {
      oneDepthNavFold.value = false;
      oneDepthOpened.value = index;
      emit('navStateValue', oneDepthNavFold.value);
    } else {
      oneDepthNavFold.value = false;
      oneDepthOpened.value === index
        ? (oneDepthOpened.value = -1)
        : (oneDepthOpened.value = index);
      emit('navStateValue', oneDepthNavFold.value);
    }
    // 2뎁스 펼침 활성화 및 인덱스 업데이트
    // 2뎁스부터는 인덱스 + 메뉴 이름으로 고유 식별 처리
  } else {
    if (twoDepthNavFold.value) {
      twoDepthNavFold.value = false;
      twoDepthOpened.value = index;
      emit('navStateValue', twoDepthNavFold.value);
    } else {
      twoDepthNavFold.value = false;
      twoDepthOpened.value === index
        ? (twoDepthOpened.value = -1)
        : (twoDepthOpened.value = index);
      emit('navStateValue', twoDepthNavFold.value);
    }
  }
};

const navToggle = () => {
  navFold.value = !navFold.value;
  emit('navStateValue', navFold.value);
  const fixed = document.querySelector('.btn-wrap.fixed');

  if (!fixed) return;
  if (navFold.value === true) {
    fixed.style.width = 'calc(100% - 90px)';
  } else {
    fixed.style.width = 'calc(100% - 260px)';
  }
};

watch(
  () => route.path,
  (newVal) => {
    if (newVal === '/') {
      oneDepthOpened.value = '';
      twoDepthOpened.value = '';
    }
  }
);

// 현재 펼쳐진 메뉴 뎁스 메뉴들과 현 페이지 경로 라우팅 메뉴명 비교
// -> 활성화 여부 체크
const isMenuActive = (depth2, menuName) => {
  return depth2.menuName === menuName;
};
</script>

<style scoped>
.nav-item.is-search-matched > .link,
.nav-item.is-search-matched > a.link {
  font-weight: 700;
  color: var(--colorMain, #5065f6);
}

.nav-item.is-search-matched > .link .txt,
.nav-item.is-search-matched > a.link .txt,
.nav-item.is-search-matched > a.link .txt span {
  color: inherit;
}
</style>
