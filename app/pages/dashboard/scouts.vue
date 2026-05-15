<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
});

export interface Scout {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  ceremonyDate: string | null;
  scoutingAmericaId: number | null;
  status: number;
  scoutType: {
    id: number;
    name: string;
  } | null;
  clanCharacter: {
    id: number;
    name: string;
  } | null;
  units: {
    scoutId: number;
    unitId: number;
    isPrimary: number;
    joinedAt: string | null;
    leftAt: string | null;
    unitNumber: string | null;
    unitLeader: string | null;
    unitTypeName: string | null;
  }[];
  awards: {
    scoutId: number;
    beadId: number;
    awardedAt: string;
    dateEarned: string;
    event: string | null;
    quantity: number;
    notes: string | null;
    beadName: string | null;
    beadDescription: string | null;
  }[];
  createdAt: string;
  updatedAt: string;
}

// Fetch scouts from the API
const { data: scoutsResponse, pending, error } = await useFetch('/api/scouts');

const scouts = computed(() => scoutsResponse.value?.data || []);

// Table columns configuration
const columns = [
  { key: 'firstName', label: 'First Name', sortable: true },
  { key: 'lastName', label: 'Last Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'phone', label: 'Phone', sortable: true },
  { key: 'scoutingAmericaId', label: 'BSA ID', sortable: true },
  { key: 'scoutType', label: 'Scout Type', sortable: true },
  { key: 'clanCharacter', label: 'Clan', sortable: true },
  { key: 'ceremonyDate', label: 'Ceremony Date', sortable: true },
];

const selectedScouts = ref<Scout[]>([]);
const isDrawerOpen = ref(false);
const selectedScout = ref<Scout | null>(null);
const activeTab = ref('personal');

const handleSelection = (selected: Scout[]) => {
  selectedScouts.value = selected;
};

const handleRowClick = (scout: Scout) => {
  console.log('Double clicked scout:', scout);
  selectedScout.value = scout;
  isDrawerOpen.value = true;
  activeTab.value = 'personal';
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
  setTimeout(() => {
    selectedScout.value = null;
  }, 300); // Wait for animation to complete
};
</script>

<template>
  <div class="dashboard-page">
    <div class="page-header">
      <div class="header-content">
        <div class="header-title">
          <Icon name="tabler:users" class="header-icon" />
          <h1>Scout Management</h1>
        </div>
        <p class="header-description">Manage scout data and generate reports</p>
      </div>
      <button class="action-btn primary">
        <Icon name="tabler:plus" />
        Add Scout
      </button>
    </div>

    <div v-if="pending" class="loading-state">
      <Icon name="tabler:loader-2" class="spinner" />
      <p>Loading scouts...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <Icon name="tabler:alert-circle" class="error-icon" />
      <p>Failed to load scouts. Please try again.</p>
    </div>

    <div v-else class="table-container">
      <DataTable
        :columns="columns"
        :data="scouts"
        :searchable="true"
        :selectable="true"
        :items-per-page="10"
        @select="handleSelection"
        @row-dblclick="handleRowClick"
      >
        <!-- Custom cell for scout type -->
        <template #cell-scoutType="{ row }">
          <span
            v-if="row.scoutType"
            class="badge"
            :class="row.scoutType.name.toLowerCase()"
          >
            {{ row.scoutType.name }}
          </span>
          <span v-else class="no-data">—</span>
        </template>

        <!-- Custom cell for clan character -->
        <template #cell-clanCharacter="{ row }">
          <span v-if="row.clanCharacter">{{ row.clanCharacter.name }}</span>
          <span v-else class="no-data">—</span>
        </template>

        <!-- Custom cell for phone -->
        <template #cell-phone="{ value }">
          <span v-if="value">{{ value }}</span>
          <span v-else class="no-data">—</span>
        </template>

        <!-- Custom cell for ceremony date -->
        <template #cell-ceremonyDate="{ value }">
          <span v-if="value" class="date-value">{{
            new Date(value).toLocaleDateString()
          }}</span>
          <span v-else class="no-data">N/A</span>
        </template>

        <!-- Custom cell for Scouting America ID -->
        <template #cell-scoutingAmericaId="{ value }">
          <span v-if="value" class="id-value">{{ value }}</span>
          <span v-else class="no-data">—</span>
        </template>
      </DataTable>
    </div>

    <!-- Scout Details Drawer -->
    <ScoutDrawer
      v-if="isDrawerOpen"
      :isDrawerOpen="isDrawerOpen"
      :selectedScout="selectedScout"
      v-model:activeTab="activeTab"
      :closeDrawer="closeDrawer"
    />
  </div>
</template>

<style scoped>
.dashboard-page {
  width: 100%;
  padding: var(--spacing-lg);
  min-height: calc(100% - 5rem);
  overflow-y: auto;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.header-content {
  flex: 1;
}

.header-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.header-icon {
  font-size: 2rem;
  color: var(--brand-primary);
}

.header-title h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.header-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn.primary {
  background: var(--brand-primary);
  color: white;
}

.action-btn.primary:hover {
  background: hsl(197, 90%, 50%);
  box-shadow: var(--shadow-md);
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  gap: var(--spacing-md);
  color: var(--text-secondary);
}

.spinner {
  font-size: 2rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.error-icon {
  font-size: 2rem;
  color: #ef4444;
}

.table-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.selection-banner {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-elevated);
  border: 1px solid var(--border-color);
  border-bottom: none;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.link-btn {
  background: transparent;
  border: none;
  color: var(--brand-primary);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0;
  transition: opacity var(--transition-fast);
}

.link-btn:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.badge.youth {
  background: color-mix(in srgb, var(--brand-primary) 15%, transparent);
  color: var(--brand-primary);
}

.badge.adult {
  background: color-mix(in srgb, var(--brand-secondary) 15%, transparent);
  color: var(--brand-secondary);
}

.date-value {
  color: var(--text-primary);
}

.id-value {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.8125rem;
  color: var(--text-primary);
}

.no-data {
  color: var(--text-tertiary);
  font-style: italic;
}
</style>
