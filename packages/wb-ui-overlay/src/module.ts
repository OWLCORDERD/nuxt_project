import { addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: '@wbsoft/ui-overlay',
    configKey: 'uiOverlay',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // 1. @Nuxt/kit 모듈을 통한 버전별 컴포넌트 auto-import 처리 (버전별 접두사 부여)
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolver.resolve('./components'),
        prefix: 'LXPOverlay', // ex) alert -> LXPOverlayAlert
        global: true,
      });
    });

    // 2. @Nuxt/kit 모듈을 통한 Composable auto-import 처리
    addImportsDir(resolver.resolve('./composables'));
  },
});
