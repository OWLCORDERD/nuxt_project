<template>
    <nav :class="{ 'is-fold': navFold }">
      <div class="btn-area">
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
      </div>
      <ul class="nav">
        <template v-for="(depth1, i) in $menuList">
          <li
            class="nav-item depth1"
            :class="{ 'is-active': oneDepthOpened === i }"
            v-if="depth1.isActive || depth1.isNavigation"
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
              <ul v-if="oneDepthOpened === i && !oneDepthNavFold && !navFold">
                <template v-for="(depth2, j) in depth1._children" :key="j">
                  <li
                    class="nav-item depth2"
                    v-if="depth2.isNavigation"
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
                        twoDepthOpened === `${j}_${depth2.menuName}` &&
                        !twoDepthNavFold &&
                        depth2._children &&
                        depth2._children.length > 0 &&
                        depth2._children.filter((child) => child.isNavigation)
                          .length > 0
                      "
                      class="depth3-list"
                    >
                      <!-- 2025.07.31 [mhlim]: 3뎁스 메뉴 목록중에 네비게이션 메뉴만 노출 처리 -->
                      <template v-for="(depth3, k) in depth2._children" :key="k">
                        <li class="nav-item depth3" v-if="depth3.isNavigation">
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
  
  <script setup>
  const { $menuList } = useNuxtApp();
  
  const route = useRoute();
  const emit = defineEmits(['menuData', 'navToggle']);
  const props = defineProps({
    menuPath: Array,
    iconSelector: Function,
  });
  
  const navFold = ref(false);
  
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
      if (route.path !== '/') {
        for (let i = 0; i < $menuList.value.length; i++) {
          const menu = $menuList.value[i];
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
    return "/";
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
  