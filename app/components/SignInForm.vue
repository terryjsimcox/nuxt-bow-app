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
    <div class="form-header">
      <h2>Welcome back</h2>
      <p>Sign in to continue your journey</p>
    </div>

    <div v-if="error" class="error-message">
      <Icon name="tabler:alert-circle" />
      <span>{{ error }}</span>
    </div>

    <button
      @click="signInWithGitHub"
      :disabled="isLoading"
      class="github-button"
    >
      <Icon name="tabler:brand-github" />
      <span>{{ isLoading ? 'Signing in...' : 'Continue with GitHub' }}</span>
    </button>

    <div class="divider">
      <span>or</span>
    </div>

    <div class="other-options">
      <button class="btn btn-secondary btn-block" disabled>
        <Icon name="tabler:mail" />
        <span>Continue with Email</span>
      </button>
      <p class="coming-soon">Email sign-in coming soon</p>
    </div>

    <p class="terms">
      By continuing, you agree to our Terms of Service and Privacy Policy
    </p>
  </div>
</template>

<style scoped>
.sign-in-form {
  width: 100%;
  max-width: 400px;
}

.form-header {
  margin-bottom: var(--spacing-2xl);
  text-align: center;
}

.form-header h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.form-header p {
  color: var(--text-secondary);
  font-size: 1rem;
}

.error-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  background: hsl(0, 70%, 97%);
  border: 1px solid hsl(0, 70%, 90%);
  border-radius: var(--radius-md);
  color: hsl(0, 70%, 40%);
  font-size: 0.9375rem;
}

[data-theme='dark'] .error-message {
  background: hsl(0, 70%, 15%);
  border-color: hsl(0, 70%, 25%);
  color: hsl(0, 70%, 85%);
}

.github-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: #24292f;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: inherit;
}

.github-button:hover:not(:disabled) {
  background: #1b1f23;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.github-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.github-button Icon {
  font-size: 1.25rem;
}

.divider {
  position: relative;
  text-align: center;
  margin: var(--spacing-xl) 0;
}

.divider::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: var(--border-color);
}

.divider span {
  position: relative;
  display: inline-block;
  padding: 0 var(--spacing-md);
  background: var(--bg-elevated);
  color: var(--text-tertiary);
  font-size: 0.875rem;
}

.other-options {
  margin-bottom: var(--spacing-xl);
}

.btn-block {
  width: 100%;
  justify-content: center;
}

.coming-soon {
  margin-top: var(--spacing-sm);
  text-align: center;
  font-size: 0.8125rem;
  color: var(--text-tertiary);
}

.terms {
  text-align: center;
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  line-height: 1.5;
}
</style>
