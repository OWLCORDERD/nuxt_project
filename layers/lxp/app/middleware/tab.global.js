// middleware/keepAlive.js
import { useAliveList } from '../composables/useAliveList';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $tab } = useNuxtApp();
  const { add } = useAliveList();

  if (to.path.startsWith('/lxp')) {
    let toMeta = to.meta.tab;
    let fromMeta = from.meta.tab;

    if (toMeta) {
      for (const [key, value] of Object.entries(to.params)) {
        toMeta = toMeta.replace(`{${key}}`, value);
      }
    } else {
      toMeta = to.path;
    }

    if (fromMeta) {
      for (const [key, value] of Object.entries(from.params)) {
        fromMeta = fromMeta.replace(`{${key}}`, value);
      }
    } else {
      fromMeta = from.path;
    }

    if (
      $tab.programmatic.value &&
      to.path !== from.path &&
      toMeta === fromMeta
    ) {
      to.meta.init = true;
    }

    $tab.set(to);
  }

  // to.matched[0].components.default.__name = to.name;
  // add(to.name?.toString());

  if ($tab.programmatic.value) {
    $tab.programmatic.value = false;
  }
});
