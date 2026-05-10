<script lang="ts" setup>
// Check if user is already signed in
const { data: session } = await useFetch('/api/auth/get-session');

// Redirect to home if already authenticated
if (session.value) {
  navigateTo('/');
}
</script>

<template>
  <div class="signin-page">
    <div class="signin-container">
      <SignInForm />
    </div>
  </div>
</template>

<style scoped>
.signin-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--bg-primary);
}

.signin-container {
  width: 100%;
  max-width: 450px;
}
</style>
