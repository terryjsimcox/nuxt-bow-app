<script lang="ts" setup>
const { theme } = useTheme();
</script>

<template>
  <div :data-theme="theme" class="layout-default">
    <AppHeader />
    <main class="main-content">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.layout-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
