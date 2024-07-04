<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarApp from "@/components/SideBar/SidebarApp.vue";
</script>

<template>
  <main class="layout">
    <ul class="layout__cols">
      <li class="layout__col layout__col--sidebar">
        <SidebarApp/>
      </li>
      <li class="layout__col layout__col--contents">
        <RouterView/>
      </li>
    </ul>
  </main>
</template>
