<template>
  <section>
    <div class="guide">
      <div class="guide-doc">
        <!-- 히어로 -->
        <header class="guide-doc__hero">
          <div class="guide-doc__hero-meta">
            <span class="meta-tag">@wbsoft/ui-layout</span>
            <span class="status-badge is-inprogress">진행 중</span>
          </div>
          <h1 class="guide-doc__hero-title">
            관리자 레이아웃 공통 컴포넌트 패키지
          </h1>
          <p class="guide-doc__hero-desc">
            관리자 프로젝트 기본 레이아웃에 사용되는 헤더, 네비게이션 공통 규격
            컴포넌트 모음입니다.<br />
            헤더는 메인과 서브 페이지에 따라 <code>LXPHeaderMain</code>,
            <code>LXPHeaderSub</code>로 분류되어 있으며 <br />
            네비게이션은 <code>LXPNavigation</code> 컴포넌트로 구성되어 있으며
            props 형태로 전달됩니다. <br />
          </p>
        </header>

        <!-- ─── 1. GNB ───────────────────────────────────────────── -->
        <section class="guide-doc__section">
          <div class="guide-doc__section-head">
            <h2 class="guide-doc__section-title">
              1. GNB
              <span class="guide-doc__section-sub">(Global Navigation Bar)</span>
            </h2>
            <p class="guide-doc__section-desc">
              관리자 시스템 좌측에 고정되어, 서비스의 전체 메뉴를 제공하는 네비게이션 영역입니다.<br />
              메뉴 축소·확장과 검색을 통해 접근성 효율을 높일 수 있습니다.<br />
              <code>LXPNavigation</code> 컴포넌트로 제공되며 <code>admin.vue</code> 레이아웃에서
              <code>:iconSelector</code> prop으로 아이콘 매핑 함수를 주입합니다.
            </p>
          </div>

          <!-- ── 시각적 미리보기 ─────────────────────────────────── -->
          <div class="gnb-preview-wrap">
            <!-- 확장형 -->
            <div class="gnb-preview">
              <p class="gnb-preview__label">확장형 <span>기본 상태</span></p>
              <div class="gnb-mock">
                <div class="gnb-mock__ctrl">
                  <span class="gnb-mock__icon-btn">☰</span>
                  <span class="gnb-mock__icon-btn">🔍</span>
                </div>
                <ul class="gnb-mock__menu">
                  <li class="gnb-mock__item is-active">
                    <span class="gnb-mock__ico">⚙</span>
                    <span class="gnb-mock__txt">교육기준설정</span>
                  </li>
                  <li class="gnb-mock__item">
                    <span class="gnb-mock__ico">📋</span>
                    <span class="gnb-mock__txt">교육과정 관리</span>
                  </li>
                  <li class="gnb-mock__item">
                    <span class="gnb-mock__ico">📖</span>
                    <span class="gnb-mock__txt">교육기준정보 설계</span>
                  </li>
                  <li class="gnb-mock__sub">
                    <span class="gnb-mock__sub-dot" />
                    <span>교육기준정보관리</span>
                  </li>
                  <li class="gnb-mock__sub is-active">
                    <span class="gnb-mock__sub-dot" />
                    <span>교육기준현행화</span>
                  </li>
                  <li class="gnb-mock__item">
                    <span class="gnb-mock__ico">📝</span>
                    <span class="gnb-mock__txt">사업계획서 관리</span>
                  </li>
                </ul>
                <div class="gnb-mock__util">
                  <span class="gnb-mock__icon-btn">🏠</span>
                  <span class="gnb-mock__icon-btn">⚙</span>
                </div>
              </div>
            </div>

            <!-- 축소형 -->
            <div class="gnb-preview">
              <p class="gnb-preview__label">축소형 <span>is-fold 상태</span></p>
              <div class="gnb-mock gnb-mock--fold">
                <div class="gnb-mock__ctrl">
                  <span class="gnb-mock__icon-btn">≡</span>
                </div>
                <ul class="gnb-mock__menu">
                  <li class="gnb-mock__item is-active">
                    <span class="gnb-mock__ico">⚙</span>
                  </li>
                  <li class="gnb-mock__item">
                    <span class="gnb-mock__ico">📋</span>
                  </li>
                  <li class="gnb-mock__item">
                    <span class="gnb-mock__ico">📖</span>
                  </li>
                  <li class="gnb-mock__item">
                    <span class="gnb-mock__ico">📝</span>
                  </li>
                </ul>
                <div class="gnb-mock__util">
                  <span class="gnb-mock__icon-btn">🏠</span>
                  <span class="gnb-mock__icon-btn">⚙</span>
                </div>
              </div>
            </div>

            <!-- 검색 모드 -->
            <div class="gnb-preview">
              <p class="gnb-preview__label">검색 모드 <span>검색 활성</span></p>
              <div class="gnb-mock">
                <div class="gnb-mock__ctrl">
                  <span class="gnb-mock__icon-btn">☰</span>
                  <span class="gnb-mock__search-bar">
                    <input placeholder="메뉴 검색" disabled />
                    <span>✕</span>
                  </span>
                </div>
                <ul class="gnb-mock__menu">
                  <li class="gnb-mock__item">
                    <span class="gnb-mock__ico">⚙</span>
                    <span class="gnb-mock__txt gnb-mock__txt--highlight">교육기준</span>
                    <span class="gnb-mock__txt">설정</span>
                  </li>
                  <li class="gnb-mock__item">
                    <span class="gnb-mock__ico">📖</span>
                    <span class="gnb-mock__txt gnb-mock__txt--highlight">교육기준</span>
                    <span class="gnb-mock__txt">정보 설계</span>
                  </li>
                  <li class="gnb-mock__sub">
                    <span class="gnb-mock__sub-dot" />
                    <span class="gnb-mock__txt gnb-mock__txt--highlight">교육기준</span>
                    <span class="gnb-mock__txt">현행화</span>
                  </li>
                </ul>
                <div class="gnb-mock__util">
                  <span class="gnb-mock__icon-btn">🏠</span>
                  <span class="gnb-mock__icon-btn">⚙</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ── 영역 구조 테이블 ──────────────────────────────────── -->
          <div class="guide-doc__api-wrap">
            <p class="guide-doc__api-label">영역 구조</p>
            <table class="guide-doc__table">
              <thead>
                <tr><th>영역</th><th>구성요소</th><th>역할</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>컨트롤 영역</strong><br /><code>Controls</code></td>
                  <td>접기/축소 토글, 검색 아이콘</td>
                  <td>네비게이션 표시 방식 및 메뉴 탐색 제어</td>
                </tr>
                <tr>
                  <td><strong>메뉴 영역</strong><br /><code>Menu</code></td>
                  <td>서비스 전체 목록 (아이콘 + 텍스트)</td>
                  <td>사이트 전체 메뉴 탐색 및 이동</td>
                </tr>
                <tr>
                  <td><strong>유틸리티 영역</strong><br /><code>Utility</code></td>
                  <td>홈(Anchor) 바로이동</td>
                  <td>빠른 이동에 자주 쓰는 고정 유틸</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ── 표시 모드 ───────────────────────────────────────────── -->
          <div class="gnb-info-grid">
            <div class="gnb-info-card">
              <p class="gnb-info-card__title">📐 표시 모드</p>
              <p class="gnb-info-card__desc">공간 밀집가 발생 할때를 위해 두 가지 모드로 전환됩니다.</p>
              <ul class="gnb-info-card__list">
                <li><strong>확장형</strong> — 아이콘과 텍스트를 함께 노출</li>
                <li><strong>축소형</strong> — 아이콘만 노출. 콘텐츠 영역을 넓게 활용할 때 사용</li>
              </ul>
            </div>
            <div class="gnb-info-card">
              <p class="gnb-info-card__title">🗂 메뉴 계층</p>
              <p class="gnb-info-card__desc">메뉴는 들어쓰기가 아닌 어디서나 한계열 구조이며, 최대 3단계까지 제공</p>
              <ul class="gnb-info-card__list">
                <li><strong>1depth</strong> — 아이콘 + 대분류</li>
                <li><strong>2depth</strong> — 들여쓰기와 악센트 색상 표현(●) 종류</li>
                <li><strong>3depth</strong> — 추가 들여쓰기 하여 적혀로 표현되는 소분류</li>
              </ul>
            </div>
            <div class="gnb-info-card">
              <p class="gnb-info-card__title">🎨 메뉴 상태</p>
              <p class="gnb-info-card__desc">설정된 테마컬러의 블두명도(Opacity)를 이용해 계층별로 구분합니다.</p>
              <div class="gnb-state-list">
                <div class="gnb-state-item">
                  <span class="gnb-state-swatch" style="background: #e8e8f0;" />
                  <span><strong>default</strong> — 설정된 테마컬러 기본색 적용</span>
                </div>
                <div class="gnb-state-item">
                  <span class="gnb-state-swatch" style="background: color-mix(in srgb, var(--colorMain, #5b5fc7) 15%, transparent); border: 1px solid #ccc;" />
                  <span><strong>active 1depth</strong> — 브랜드색 15% Opacity</span>
                </div>
                <div class="gnb-state-item">
                  <span class="gnb-state-swatch" style="background: color-mix(in srgb, var(--colorMain, #5b5fc7) 30%, transparent); border: 1px solid #ccc;" />
                  <span><strong>active 2depth</strong> — 브랜드색 30% Opacity</span>
                </div>
                <div class="gnb-state-item">
                  <span class="gnb-state-swatch" style="background: color-mix(in srgb, var(--colorMain, #5b5fc7) 40%, transparent); border: 1px solid #ccc;" />
                  <span><strong>active 3depth</strong> — 브랜드색 40% Opacity</span>
                </div>
              </div>
            </div>
            <div class="gnb-info-card">
              <p class="gnb-info-card__title">🔍 메뉴 검색</p>
              <p class="gnb-info-card__desc">검색어와 일치하는 텍스트는 하이라이트 컬러(#FFE488)로 강조와 위치를 즉시 인지하게 합니다.</p>
              <ul class="gnb-info-card__list">
                <li>컨트롤 영역의 검색아이콘을 클릭하여 검색영역을 활성화 시키면 빠르게 접근할 수 있습니다.</li>
                <li>검색어와 일치하는 텍스트는 하이라이트 컬러(#FFE488)로 강조 위치를 즉시 인지하게 합니다.</li>
              </ul>
            </div>
          </div>

          <!-- ── Props 테이블 ───────────────────────────────────────── -->
          <div class="guide-doc__api-wrap">
            <p class="guide-doc__api-label">Props — <code>LXPNavigation</code></p>
            <table class="guide-doc__table">
              <thead>
                <tr><th>Prop</th><th>타입</th><th>필수</th><th>설명</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>menuPath</td>
                  <td><code>Array</code></td>
                  <td>✓</td>
                  <td>현재 라우트의 메뉴 경로 배열. 활성 depth 계산에 사용</td>
                </tr>
                <tr>
                  <td>iconSelector</td>
                  <td><code>Function</code></td>
                  <td>✓</td>
                  <td>메뉴 아이콘 타입(string)을 받아 AsyncComponent를 반환하는 함수</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ── 사용 코드 ───────────────────────────────────────────── -->
          <div class="guide-doc__api-wrap">
            <p class="guide-doc__api-label">사용 예시 — <code>admin.vue</code> 레이아웃</p>
            <div class="guide-doc__code">
<pre><code><!-- template -->
&lt;LXPNavigation
  :menu-path="menuPath"
  :iconSelector="navMenuIconSelector"
/&gt;

&lt;!-- script --&gt;
// 아이콘 매핑 (컴파일 타임에 캐싱)
const ICON_MAP = {
  'nav-setting':    defineAsyncComponent(() => import('@/assets/.../setting.svg')),
  'nav-file-pen':   defineAsyncComponent(() => import('@/assets/.../paper-pen.svg')),
  'pencil':         defineAsyncComponent(() => import('@/assets/.../pen-line.svg')),
  'graduation-cap': defineAsyncComponent(() => import('@/assets/.../open-book.svg')),
  // ...
};

const navMenuIconSelector = (iconType) => ICON_MAP[iconType] ?? null;</code></pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' });
</script>

<style lang="scss" scoped>
// ── GNB 미리보기 ────────────────────────────────────────────
.gnb-preview-wrap {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.gnb-preview {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-width: 160px;

  &__label {
    font-size: 12px;
    font-weight: 700;
    color: #4a5568;

    span {
      font-weight: 400;
      color: #a0aec0;
      font-size: 11px;
      margin-left: 4px;
    }
  }
}

.gnb-mock {
  display: flex;
  flex-direction: column;
  background: #2b2d42;
  border-radius: 12px;
  padding: 12px 0 12px;
  min-height: 320px;
  width: 180px;
  flex-shrink: 0;

  &--fold {
    width: 60px;
  }

  &__ctrl {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 12px 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    flex-wrap: wrap;
  }

  &__icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    cursor: pointer;

    &:hover { background: rgba(255, 255, 255, 0.1); }
  }

  &__search-bar {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 3px 6px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 11px;
    min-width: 0;

    input {
      background: none;
      border: none;
      outline: none;
      color: rgba(255,255,255,0.6);
      font-size: 11px;
      width: 100%;
      min-width: 0;

      &::placeholder { color: rgba(255,255,255,0.4); }
    }
  }

  &__menu {
    list-style: none;
    margin: 0;
    padding: 8px 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 12px;
    color: rgba(255, 255, 255, 0.65);
    font-size: 11px;
    border-radius: 6px;
    margin: 0 6px;
    cursor: pointer;

    &.is-active {
      background: color-mix(in srgb, var(--colorMain, #5b5fc7) 20%, transparent);
      color: #fff;
    }

    &:hover:not(.is-active) {
      background: rgba(255, 255, 255, 0.06);
    }
  }

  &__sub {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px 6px 28px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 10px;
    cursor: pointer;
    margin: 0 6px;

    &.is-active {
      background: color-mix(in srgb, var(--colorMain, #5b5fc7) 30%, transparent);
      color: #fff;
      border-radius: 6px;
    }
  }

  &__sub-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--colorMain, #5b5fc7);
    flex-shrink: 0;
  }

  &__ico {
    font-size: 13px;
    flex-shrink: 0;
    opacity: 0.8;
  }

  &__txt {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &--highlight {
      background: #ffe488;
      color: #2b2d42;
      padding: 0 2px;
      border-radius: 2px;
    }
  }

  &__util {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 12px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
}

// ── 정보 카드 그리드 ──────────────────────────────────────────
.gnb-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
}

.gnb-info-card {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fafbff;

  &__title {
    font-size: 13px;
    font-weight: 700;
    color: #2d3748;
  }

  &__desc {
    font-size: 12px;
    color: #718096;
    line-height: 1.6;
  }

  &__list {
    padding-left: 16px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;

    li {
      font-size: 12px;
      color: #4a5568;
      line-height: 1.6;
    }

    strong { color: #2d3748; }
  }
}

// ── 메뉴 상태 스와치 ──────────────────────────────────────────
.gnb-state-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.gnb-state-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  color: #4a5568;

  strong { color: #2d3748; }
}

.gnb-state-swatch {
  display: inline-block;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  flex-shrink: 0;
}
</style>
