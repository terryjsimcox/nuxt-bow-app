<script lang="ts" setup>
const { theme, toggleTheme } = useTheme();
const authClient = useAuthClient();
const session = ref<any>(null);

// Get user session
onMounted(async () => {
  try {
    const result = await authClient.getSession();
    session.value = result.data;
  } catch (error) {
    console.error('Failed to fetch session:', error);
  }
});

const signOut = async () => {
  await authClient.signOut();
  session.value = null;
  navigateTo('/');
};
</script>

<template>
  <header class="header">
    <div class="container header-content">
      <NuxtLink to="/" class="logo">
        <img src="/images/BOWLogo.png" alt="BOW Logo" class="logo-image" />
        <span class="logo-text">Branches of the Osage</span>
      </NuxtLink>

      <nav class="nav">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        <NuxtLink to="/stories" class="nav-link">Stories</NuxtLink>
        <NuxtLink v-if="session" to="/dashboard" class="nav-link"
          >Dashboard</NuxtLink
        >
      </nav>

      <div class="header-actions">
        <button
          @click="toggleTheme"
          class="icon-btn"
          :title="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
        >
          <Icon :name="theme === 'light' ? 'tabler:moon' : 'tabler:sun'" />
        </button>

        <template v-if="session">
          <div class="user-menu">
            <span class="user-name">{{ session.user.name }}</span>
            <button @click="signOut" class="btn btn-secondary btn-sm">
              Sign Out
            </button>
          </div>
        </template>
        <template v-else>
          <NuxtLink to="/signin" class="btn btn-primary btn-sm"
            >Sign In</NuxtLink
          >
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(12px);
  background: rgba(var(--bg-elevated-rgb), 0.8);
}

[data-theme='dark'] .header {
  background: rgba(28, 30, 36, 0.8);
}

[data-theme='light'] .header {
  background: rgba(255, 255, 255, 0.8);
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.125rem;
  transition: opacity var(--transition-fast);
}

.logo:hover {
  opacity: 0.8;
}

.logo-image {
  width: 2.5rem;
  height: 3rem;
}

.logo-text {
  @media (max-width: 640px) {
    display: none;
  }
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-left: auto;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9375rem;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}

.nav-link.router-link-active {
  color: var(--brand-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 1.25rem;
}

.icon-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.user-name {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  font-weight: 500;
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .user-name {
    display: none;
  }
}
</style>
