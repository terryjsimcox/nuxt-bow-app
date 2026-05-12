import { defineStore } from 'pinia';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    isSidebarOpen: true,
  }),
  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    setSidebarOpen(value: boolean) {
      this.isSidebarOpen = value;
    },
  },
});
