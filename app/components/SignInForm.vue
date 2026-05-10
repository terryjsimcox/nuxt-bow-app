<script lang="ts" setup>
const isLoading = ref(false);
const error = ref('');

const authClient = useAuthClient();

const signInWithGitHub = async () => {
  isLoading.value = true;
  error.value = '';

  try {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/',
    });
  } catch (e: any) {
    error.value = e.message || 'Failed to sign in with GitHub';
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="sign-in-form">
    <h2>Welcome back</h2>

    <p class="info-text">Sign in to continue</p>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <button
      @click="signInWithGitHub"
      :disabled="isLoading"
      class="github-button"
    >
      <Icon name="tabler:brand-github" />
      <span>Sign in with GitHub</span>
    </button>

    <p class="footer-text">
      Don't have an account? <NuxtLink to="/signup">Sign up</NuxtLink>
    </p>
  </div>
</template>

<style scoped>
.sign-in-form {
  max-width: 300px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  background: var(--bg-secondary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sign-in-form h2 {
  margin: 0 0 1.5rem;
  text-align: center;
  font-size: 1.75rem;
  color: var(--text-primary);
}

.error-message {
  padding: 0.75rem;
  margin-bottom: 1rem;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  color: #c33;
  font-size: 0.875rem;
}

.github-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background: #24292e;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.github-button:hover:not(:disabled) {
  background: #1b1f23;
}

.github-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.info-text {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-secondary);
}
.footer-text {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-secondary);
  a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
  }
}
</style>
