<script setup lang="ts">
const dashboardStore = useDashboardStore();
const { theme, toggleTheme } = useTheme();
const authClient = useAuthClient();

const props = defineProps<{
  user: {
    name: string;
    email?: string;
    image?: string | null;
  };
}>();

const isOpen = ref(false);
const activeSubmenu = ref<string | null>(null);
const dropdown = ref<HTMLElement | null>(null);

const closeDropdown = () => {
  isOpen.value = false;
  activeSubmenu.value = null;
};

const toggleSubmenu = (menu: string) => {
  if (activeSubmenu.value === menu) {
    activeSubmenu.value = null;
  } else {
    activeSubmenu.value = menu;
  }
};

const selectTheme = (selectedTheme: 'light' | 'dark') => {
  if (theme.value !== selectedTheme) {
    toggleTheme();
  }
  closeDropdown();
};

const handleLogout = async () => {
  await authClient.signOut();
  closeDropdown();
  navigateTo('/');
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const userInitials = computed(() => {
  return props.user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
});
</script>

<template>
  <div class="user-dropdown" ref="dropdown">
    <div
      class="dropdown-trigger"
      :data-open="dashboardStore.isSidebarOpen"
      @click="isOpen = !isOpen">
      <div class="avatar-wrapper">
        <span v-if="!user.image" class="avatar">{{ userInitials }}</span>
        <img v-else :src="user.image" :alt="user.name" class="avatar" />
        <span v-if="dashboardStore.isSidebarOpen" class="user-name">{{
          user.name
        }}</span>
      </div>
      <Icon
        v-if="dashboardStore.isSidebarOpen"
        name="tabler:chevrons-up-down"
        class="caret"
        :class="{ open: isOpen }" />
    </div>

    <Transition name="dropdown">
      <div
        v-if="isOpen"
        :data-open="dashboardStore.isSidebarOpen"
        class="dropdown-menu">
        <!-- Header -->
        <div class="dropdown-header">
          <span v-if="!user.image" class="avatar">{{ userInitials }}</span>
          <img v-else :src="user.image" :alt="user.name" class="avatar" />
          <span>{{ user.name }}</span>
        </div>

        <!-- Menu Items -->
        <div class="dropdown-section">
          <NuxtLink
            to="/dashboard/profile"
            class="dropdown-item"
            @click="closeDropdown">
            <Icon name="tabler:user" />
            <span>Profile</span>
          </NuxtLink>

          <NuxtLink
            to="/dashboard/settings"
            class="dropdown-item"
            @click="closeDropdown">
            <Icon name="tabler:settings" />
            <span>Settings</span>
          </NuxtLink>
        </div>

        <div class="dropdown-divider"></div>

        <!-- Submenu Items -->
        <div class="dropdown-section submenu-container">
          <div
            class="dropdown-item submenu-trigger"
            :class="{ 'has-submenu-open': activeSubmenu === 'appearance' }"
            @click.stop="toggleSubmenu('appearance')">
            <Icon name="tabler:palette" />
            <span>Appearance</span>
            <Icon name="tabler:chevron-right" class="arrow" />
          </div>

          <!-- Appearance Submenu -->
          <Transition name="submenu">
            <div
              v-if="activeSubmenu === 'appearance'"
              class="submenu-panel"
              @click.stop>
              <div
                class="submenu-item"
                :class="{ active: theme === 'light' }"
                @click="selectTheme('light')">
                <Icon name="tabler:sun" />
                <span>Light</span>
                <Icon
                  v-if="theme === 'light'"
                  name="tabler:check"
                  class="check-icon" />
              </div>
              <div
                class="submenu-item"
                :class="{ active: theme === 'dark' }"
                @click="selectTheme('dark')">
                <Icon name="tabler:moon" />
                <span>Dark</span>
                <Icon
                  v-if="theme === 'dark'"
                  name="tabler:check"
                  class="check-icon" />
              </div>
            </div>
          </Transition>
        </div>

        <div class="dropdown-divider"></div>

        <!-- Log out -->
        <div class="dropdown-section">
          <button class="dropdown-item" @click="handleLogout">
            <Icon name="tabler:logout" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.user-dropdown {
  position: relative;
  width: 100%;
  padding: var(--spacing-sm);
  border-top: 1px solid var(--border-color);
}

.dropdown-trigger {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-sm);
  justify-content: space-between;
  background-color: transparent;
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color var(--transition-fast);
  border-radius: var(--radius-md);
}

.dropdown-trigger[data-open='false'] {
  padding-right: 0;
}

.dropdown-trigger[data-open='false'] .avatar-wrapper {
  margin-left: -5px;
}

.dropdown-trigger:hover {
  background-color: var(--bg-hover);
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  overflow: hidden;
  transition: margin-left var(--transition-fast);
}

.user-name {
  white-space: nowrap;
  font-size: 0.9375rem;
  transition:
    opacity var(--transition-fast),
    visibility var(--transition-fast);
}

.caret {
  font-size: 1rem;
  transition:
    opacity var(--transition-fast),
    visibility var(--transition-fast);
}

.dropdown-menu {
  position: absolute;
  bottom: calc(100% + 8px);
  left: calc((250px - 210px) / 2);
  width: 210px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  z-index: 1000;
  overflow: visible;
}

.dropdown-menu[data-open='false'] {
  position: fixed;
  bottom: 65px;
  left: 5px;
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
}

span.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
}

.dropdown-section {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xs);
  justify-content: flex-start;
}

.submenu-container {
  position: relative;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-lg);
  background: none;
  border: none;
  color: var(--text-primary);
  text-decoration: none;
  text-align: left;
  cursor: pointer;
  transition: background-color var(--transition-fast);
  font-size: 0.875rem;
  border-radius: var(--radius-md);
}

.dropdown-item:hover {
  background-color: var(--bg-hover);
}

.dropdown-item .arrow {
  margin-left: auto;
  font-size: 0.875rem;
}

.submenu-trigger {
  user-select: none;
  position: relative;
}

.submenu-trigger.has-submenu-open {
  background-color: var(--bg-hover);
}

.submenu-panel {
  position: absolute;
  left: calc(100% + 8px);
  top: -0.25rem;
  min-width: 150px;
  background-color: var(--bg-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: var(--spacing-xs);
  z-index: 1002;
}

.submenu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-lg);
  color: var(--text-primary);
  cursor: pointer;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  transition: background-color var(--transition-fast);
  position: relative;
  white-space: nowrap;
}

.submenu-item:hover {
  background-color: var(--bg-hover);
}

.submenu-item.active {
  color: var(--brand-primary);
}

.submenu-item .check-icon {
  margin-left: auto;
  font-size: 0.875rem;
  color: var(--brand-primary);
}

.dropdown-divider {
  height: 1px;
  background-color: var(--border-color);
  margin: var(--spacing-xs) 0;
}

/* Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.submenu-enter-active,
.submenu-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
