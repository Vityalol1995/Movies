<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/default.vue';
import MovieLayout from '@/layouts/empty.vue';

const route = useRoute();

const layoutComponent = computed(() => {
  switch (route.meta.layout) {
    case 'empty':
      return MovieLayout;
    default:
      return DefaultLayout;
  }
});
</script>

<template>
  <div class="wrapper">
    <component :is="layoutComponent"></component>
  </div>
</template>
