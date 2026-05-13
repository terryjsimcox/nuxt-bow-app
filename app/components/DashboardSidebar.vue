<script lang="ts" setup>
const dashboardStore = useDashboardStore();
const authClient = useAuthClient();
const session = ref<any>(null);
const route = useRoute();

onMounted(async () => {
  try {
    const result = await authClient.getSession();
    session.value = result.data;
  } catch (error) {
    console.error('Failed to fetch session:', error);
  }
});

const handleLinkClick = (event: Event, to: string) => {
  if (route.path === to) {
    event.preventDefault();
  }
};

const menuItems = [
  { icon: 'tabler:layout-dashboard', label: 'Dashboard', to: '/dashboard' },
  { icon: 'tabler:users', label: 'Scouts', to: '/dashboard/scouts' },
  { icon: 'tabler:certificate', label: 'Beads', to: '/dashboard/beads' },
  { icon: 'tabler:chart-bar', label: 'Reports', to: '/dashboard/reports' },
  { icon: 'tabler:settings', label: 'Settings', to: '/dashboard/settings' },
];
</script>

<template>
  <nav :data-open="dashboardStore.isSidebarOpen" class="dashboard-sidebar">
    <NuxtLink to="/dashboard" class="logo">
      <img src="/images/BOWLogo.png" alt="BOW Logo" class="logo-image" />
      <h3>Branches of Osage</h3>
    </NuxtLink>

    <div class="nav-links">
      <DashboardNavLinks
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        :icon="item.icon"
        :label="item.label"
        :open="dashboardStore.isSidebarOpen"
        class="nav-item"
        active-class="active"
        @click="handleLinkClick($event, item.to)"
      />
    </div>

    <div class="user-area">
      <DashboardUserDropdown
        v-if="session?.user"
        :user="{
          name: session.user.name || 'User',
          email: session.user.email,
          image: session.user.image,
        }"
      />
    </div>
  </nav>
</template>

<style scoped>
.dashboard-sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 100vh;
  border-right: 1px solid var(--border-color);
  transition: width var(--transition-base);
  background: var(--bg-elevated);
}

.dashboard-sidebar[data-open='false'] {
  width: 60px;
}

.dashboard-sidebar[data-open='false'] .logo h3 {
  opacity: 0;
  visibility: hidden;
  width: 0;
}

.dashboard-sidebar[data-open='false'] .nav-label {
  opacity: 0;
  visibility: hidden;
  width: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  text-decoration: none;
  overflow: hidden;
  transition: all var(--transition-fast);
}

.logo-image {
  width: 2.5rem;
  height: 3rem;
  display: flex;
  flex-shrink: 0;
}

.logo h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1;
  transition:
    opacity var(--transition-fast),
    visibility var(--transition-fast);
  white-space: nowrap;
}

.nav-links {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  overflow: visible;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
  white-space: nowrap;
  overflow: hidden;
  position: relative;
}

.nav-item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.nav-label {
  transition:
    opacity var(--transition-fast),
    visibility var(--transition-fast);
}

.user-area {
  display: flex;
}

/* Mobile */
@media (max-width: 768px) {
  .dashboard-sidebar {
    width: 60px;
  }

  .logo {
    justify-content: center;
    padding: var(--spacing-lg) 0;
  }

  .logo h3 {
    opacity: 0;
    visibility: hidden;
    width: 0;
  }

  .nav-item {
    justify-content: center;
    padding: var(--spacing-sm) 0;
  }

  .nav-label {
    opacity: 0;
    visibility: hidden;
    width: 0;
  }
}
</style>
