<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
});

interface Scout {
  firstName: string;
  lastName: string;
  unitNumber: number;
  scoutingAmericaId: string;
  scoutType: string;
  clanCharacter: string;
  clanColor: string[];
  ceremonyDate: string | null;
}

// Table columns configuration
const columns = [
  { key: 'firstName', label: 'First Name', sortable: true },
  { key: 'lastName', label: 'Last Name', sortable: true },
  { key: 'unitNumber', label: 'Unit Number', sortable: true },
  { key: 'scoutingAmericaId', label: 'Scouting America ID', sortable: true },
  { key: 'scoutType', label: 'Scout Type', sortable: true },
  { key: 'clanCharacter', label: 'Clan Character', sortable: true },
  { key: 'clanColor', label: 'Clan Color', sortable: false },
  { key: 'ceremonyDate', label: 'Ceremony Date', sortable: true },
];

// Sample scout data
const scouts = ref<Scout[]>([
  {
    firstName: 'Andrew',
    lastName: 'Coughlin',
    unitNumber: 442,
    scoutingAmericaId: '8114714',
    scoutType: 'Adult',
    clanCharacter: 'Eagle',
    clanColor: ['#10B981', '#EF4444', '#10B981'],
    ceremonyDate: '2025-10-02',
  },
  {
    firstName: 'Riz',
    lastName: 'Coughlin',
    unitNumber: 442,
    scoutingAmericaId: '11678200',
    scoutType: 'Adult',
    clanCharacter: 'Fox',
    clanColor: ['#10B981', '#EF4444', '#10B981'],
    ceremonyDate: '2025-10-02',
  },
  {
    firstName: 'Benjamin',
    lastName: 'Coughlin',
    unitNumber: 442,
    scoutingAmericaId: '14748911',
    scoutType: 'Youth',
    clanCharacter: 'Eagle',
    clanColor: ['#10B981', '#EF4444', '#10B981'],
    ceremonyDate: null,
  },
  {
    firstName: 'Emma',
    lastName: 'Coughlin',
    unitNumber: 443,
    scoutingAmericaId: '',
    scoutType: 'Youth',
    clanCharacter: 'Eagle',
    clanColor: ['#FFFFFF', '#EF4444', '#FFFFFF'],
    ceremonyDate: null,
  },
  {
    firstName: 'Sherri',
    lastName: 'Coughlin',
    unitNumber: 443,
    scoutingAmericaId: '',
    scoutType: 'Adult',
    clanCharacter: 'Eagle',
    clanColor: ['#FFFFFF', '#EF4444', '#FFFFFF'],
    ceremonyDate: null,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    unitNumber: 439,
    scoutingAmericaId: '12345',
    scoutType: 'Youth',
    clanCharacter: 'Bobwhite',
    clanColor: ['#EF4444', '#3B82F6', '#EF4444'],
    ceremonyDate: '2025-10-02',
  },
  {
    firstName: 'Luz',
    lastName: 'Smith',
    unitNumber: 319,
    scoutingAmericaId: '67890',
    scoutType: 'Youth',
    clanCharacter: 'Bear',
    clanColor: ['#3B82F6', '#F59E0B', '#FFFFFF'],
    ceremonyDate: '2025-10-02',
  },
  {
    firstName: 'Michael',
    lastName: 'Harris',
    unitNumber: 82,
    scoutingAmericaId: '49123',
    scoutType: 'Youth',
    clanCharacter: 'Buffalo',
    clanColor: ['#10B981', '#3B82F6', '#10B981'],
    ceremonyDate: '2025-10-02',
  },
  {
    firstName: 'Emily',
    lastName: 'Rivers',
    unitNumber: 443,
    scoutingAmericaId: '98342',
    scoutType: 'Adult',
    clanCharacter: 'Eagle',
    clanColor: ['#FFFFFF', '#F59E0B', '#FFFFFF'],
    ceremonyDate: '2025-10-02',
  },
  {
    firstName: 'Daniel',
    lastName: 'Brooks',
    unitNumber: 427,
    scoutingAmericaId: '77412',
    scoutType: 'Youth',
    clanCharacter: 'Bobwhite',
    clanColor: [],
    ceremonyDate: '2025-10-02',
  },
]);

const selectedScouts = ref<Scout[]>([]);

const handleSelection = (selected: Scout[]) => {
  selectedScouts.value = selected;
};

const handleRowClick = (scout: Scout) => {
  console.log('Clicked scout:', scout);
  // Add navigation or modal logic here
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

    <div class="table-container">
      <div v-if="selectedScouts.length > 0" class="selection-banner">
        <span
          >{{ selectedScouts.length }} of {{ scouts.length }} row(s)
          selected.</span
        >
        <button class="link-btn" @click="selectedScouts = []">
          Clear selection
        </button>
      </div>

      <DataTable
        :columns="columns"
        :data="scouts"
        :searchable="true"
        :selectable="true"
        :items-per-page="10"
        @select="handleSelection"
        @row-click="handleRowClick">
        <!-- Custom cell for clan color -->
        <template #cell-clanColor="{ value }">
          <div class="clan-color-badges">
            <div
              v-for="(color, index) in value"
              :key="index"
              class="color-badge"
              :style="{ backgroundColor: color }"
              :title="color" />
            <span v-if="!value || value.length === 0" class="no-data">N/A</span>
          </div>
        </template>

        <!-- Custom cell for ceremony date -->
        <template #cell-ceremonyDate="{ value }">
          <span v-if="value" class="date-value">{{ value }}</span>
          <span v-else class="no-data">N/A</span>
        </template>

        <!-- Custom cell for scout type with badge -->
        <template #cell-scoutType="{ value }">
          <span class="badge" :class="value.toLowerCase()">{{ value }}</span>
        </template>

        <!-- Custom cell for Scouting America ID -->
        <template #cell-scoutingAmericaId="{ value }">
          <span v-if="value" class="id-value">{{ value }}</span>
          <span v-else class="no-data">—</span>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  width: 100%;
  padding: var(--spacing-xl);
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

.clan-color-badges {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.color-badge {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  flex-shrink: 0;
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
  background: hsla(197, 90%, 56%, 0.15);
  color: var(--brand-primary);
}

.badge.adult {
  background: hsla(280, 70%, 60%, 0.15);
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
