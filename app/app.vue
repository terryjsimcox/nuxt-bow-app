<script lang="ts" setup>
const { theme } = useTheme();
</script>

<template>
  <div :data-theme="theme" class="app-container">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
