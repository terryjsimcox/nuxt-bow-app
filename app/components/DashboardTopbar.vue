<script lang="ts" setup>
const dashboardStore = useDashboardStore();
const route = useRoute();

// Format the route name for display
const pageTitle = computed(() => {
  // Special case for dashboard index
  if (route.name === 'dashboard-index' || route.path === '/dashboard') {
    return 'Dashboard';
  }
  // Use the route name if available
  if (route.name) {
    return String(route.name)
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))[1];
  }
  // Fallback to path-based title
  const path = route.path.split('/').pop() || '';
  return path
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
});
</script>

<template>
  <div class="dashboard-topbar">
    <div class="left-section">
      <button
        aria-label="Toggle Sidebar"
        class="toggle-btn"
        @click="dashboardStore.toggleSidebar()">
        <Icon
          v-if="dashboardStore.isSidebarOpen"
          name="tabler:layout-sidebar-left-collapse" />
        <Icon v-else name="tabler:layout-sidebar-right-collapse" />
      </button>
      <h1 class="page-title">{{ pageTitle }}</h1>
    </div>
    <div class="right-section">
      <button class="icon-btn" aria-label="Notifications">
        <Icon name="tabler:bell" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.dashboard-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(var(--spacing-sm) + 4px) var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-primary);
}

.left-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.right-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.page-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text-primary);
}

.toggle-btn,
.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: transparent;
  color: var(--text-secondary);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 1.25rem;
}

.toggle-btn:hover,
.icon-btn:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}
</style>
