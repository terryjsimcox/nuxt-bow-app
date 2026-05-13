<script lang="ts" setup>
const { label, to, icon, count } = defineProps<{
  label: string;
  to: string;
  icon: string;
  count?: number;
  open: boolean;
}>();
</script>
<template>
  <NuxtLink
    :to="to"
    :data-label="label"
    :data-collapsed="!open"
    class="nav-link"
  >
    <div class="nav-link-content">
      <Icon :name="icon" class="nav-icon" />
      <span v-if="open">{{ label }}</span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 4px;
  text-decoration: none;
  background-color: transparent;
  color: var(--text-primary);
  transition: background-color 0.2s;

  .nav-link-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .nav-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  span {
    line-height: 1.2;
    white-space: nowrap;
  }

  &:hover {
    background-color: var(--bg-hover);
    cursor: pointer;
  }

  &.router-link-active,
  &.router-link-exact-active {
    color: var(--brand-primary);
    background-color: var(--bg-tertiary);
    cursor: default;

    &:not([data-collapsed='true']) {
      pointer-events: none;
    }
  }

  /* Tooltip when collapsed */
  &[data-collapsed='true'] {
    position: relative;

    &:hover::after {
      content: attr(data-label);
      position: absolute;
      left: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      padding: 0.5rem 0.75rem;
      border-radius: 4px;
      white-space: nowrap;
      font-size: 0.875rem;
      z-index: 1000;
      border: 1px solid var(--border-color);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      pointer-events: none;
    }

    &.router-link-active::after,
    &.router-link-exact-active::after {
      display: block;
    }
  }
}
</style>
