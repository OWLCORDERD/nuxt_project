import { defineNuxtModule, createResolver, addImportsDir } from '@nuxt/kit';

const resolver = createResolver(import.meta.url);

export default defineNuxtModule({
  meta: {
    name: 'wb-ui-button',
    configKey: 'wbUiButton',
  },
  setup(options, nuxt) {
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolver.resolve('./components'),
        prefix: 'LXP',
        global: true,
      });
    });
  },
});
