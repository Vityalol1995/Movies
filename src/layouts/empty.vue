<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="layout__empty">
    <div class="container">
      <div class="layout__empty-header">
        <router-link :to="{name: 'home'}">
          <h2>< Go to movies</h2>
        </router-link>
      </div>
    </div>
    <RouterView/>
  </div>
</template>
