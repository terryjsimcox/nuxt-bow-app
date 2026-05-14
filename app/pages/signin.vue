<script lang="ts" setup>
const authClient = useAuthClient();

// Check if user is already authenticated after OAuth callback
onMounted(async () => {
  try {
    const { data } = await authClient.getSession();
    if (data) {
      // User is authenticated, redirect to dashboard
      navigateTo('/dashboard');
    }
  } catch (error) {
    // Not authenticated, stay on signin page
  }
});
</script>

<template>
  <div class="signin-page">
    <div class="signin-container">
      <div class="signin-visual">
        <div class="visual-content">
          <img src="/images/BOWLogo.png" alt="BOW Logo" class="logo-image" />
          <h2 class="visual-title">Branches of the Osage</h2>
          <p class="visual-text">
            Begin your journey through the sacred stories and teachings of the
            Osage troop.
          </p>
        </div>
      </div>

      <div class="signin-form-wrapper">
        <SignInForm />
      </div>
    </div>
  </div>
</template>

<style scoped>
.signin-page {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  background: var(--bg-secondary);
}

.signin-container {
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--bg-elevated);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-color);
}

.signin-visual {
  background: linear-gradient(
    135deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
  padding: var(--spacing-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.signin-visual::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -100px;
  right: -100px;
}

.signin-visual::after {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  bottom: -50px;
  left: -50px;
}

.visual-content {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
}

.logo-image {
  width: 5rem;
  height: 6rem;
  margin-bottom: var(--spacing-lg);
}

.visual-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.visual-text {
  font-size: 1.125rem;
  line-height: 1.6;
  opacity: 0.95;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.signin-form-wrapper {
  padding: var(--spacing-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .signin-container {
    grid-template-columns: 1fr;
  }

  .signin-visual {
    padding: var(--spacing-xl);
  }

  .visual-logo {
    font-size: 3rem;
  }

  .visual-title {
    font-size: 1.5rem;
  }

  .visual-text {
    font-size: 1rem;
  }
}
</style>
