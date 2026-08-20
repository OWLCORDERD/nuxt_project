<template>
  <button
    type="button"
    @click="emit('onClick')"
    :class="{ [btnClass]: true, 'has-icon': hasIcon }"
    :disabled="props.state === 'Disabled'"
  >
    <slot name="icon" />
    <slot name="text" />
  </button>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';

const props = defineProps<{
  // 버튼 사이즈 구분 값
  size: 'Large' | 'Medium' | 'Small' | 'XSmall' | 'XXSmall';
  // 단계별 차수 구분 값
  order: 'Primary' | 'Secondary' | 'Tertiary' | 'Single';
  // 버튼 상태 구분 값 (disabled 상태 처리)
  state: 'Default' | 'Disabled';
}>();

const slots = useSlots();

const emit = defineEmits(['onClick']);

const btnClass = computed(() => {
  let className = '';

  switch (props.size) {
    case 'Large':
      className += 'btn-l';
      break;
    case 'Medium':
      className += 'btn-m';
      break;
    case 'Small':
      className += 'btn-s';
      break;
    case 'XSmall':
      className += 'btn-xs';
      break;
    case 'XXSmall':
      className += 'btn-xxs';
      break;
  }

  switch (props.order) {
    case 'Primary':
      className += '-fill';
      break;
    case 'Secondary':
      className += '-line';
      break;
    case 'Tertiary':
      className += '-tertiary';
      break;
    case 'Single':
      className += '-single';
      break;
  }

  return className;
});

const hasIcon = computed(() => {
  return slots.icon !== undefined;
});
</script>

<style></style>
