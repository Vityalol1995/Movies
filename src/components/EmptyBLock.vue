<script setup lang="ts"></script>

<template>
  <div class="empty">
    <h2>
      <slot></slot>
    </h2>
  </div>
</template>

<style lang="scss" scoped>
.empty {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
