<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
});
</script>

<template>
  <div class="dashboard-page">
    <div class="placeholder-content">
      <div class="placeholder-icon">
        <Icon name="tabler:book" />
      </div>
      <h2>Stories Management</h2>
      <p>
        Create, edit, and organize the sacred stories and teachings of the Osage
        people.
      </p>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  width: 100%;
  padding: var(--spacing-xl);
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  background: var(--bg-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
}

.placeholder-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
  border-radius: var(--radius-xl);
  color: white;
  font-size: 2.5rem;
  margin-bottom: var(--spacing-lg);
}

.placeholder-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.placeholder-content p {
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 500px;
  line-height: 1.6;
}
</style>
