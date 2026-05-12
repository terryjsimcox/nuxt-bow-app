<script lang="ts" setup>
const { theme } = useTheme();
</script>

<template>
  <div :data-theme="theme">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Global styles only */
</style>
