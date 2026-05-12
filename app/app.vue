<script lang="ts" setup>
const { theme } = useTheme();
</script>

<template>
  <div :data-theme="theme" class="app-container">
    <NuxtRouteAnnouncer />
    <AppHeader />
    <main class="main-content">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
