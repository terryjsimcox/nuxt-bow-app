<script lang="ts" setup>
const { theme } = useTheme();
const dashboardStore = useDashboardStore();
</script>

<template>
  <div :data-theme="theme" class="wrapper">
    <DashboardSidebar />
    <main
      class="main-content"
      :class="{ collapsed: !dashboardStore.isSidebarOpen }">
      <DashboardTopbar />
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  height: 100vh;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  transition: margin-left var(--transition-base);
}
/* Mobile */
@media (max-width: 768px) {
  .main-content {
    margin-left: 60px;
  }
}
</style>
