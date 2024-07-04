<script setup lang="ts">
interface Props {
  button_xs?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <button
    class="button"
    :class="{
      'button--xs': button_xs,
    }"
  >
    <slot></slot>
  </button>
</template>
