<script lang="ts" setup generic="T extends Record<string, any>">
interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => string;
}

interface Props {
  columns: Column[];
  data: T[];
  searchable?: boolean;
  selectable?: boolean;
  itemsPerPage?: number;
}

const props = withDefaults(defineProps<Props>(), {
  searchable: true,
  selectable: true,
  itemsPerPage: 10,
});

const emit = defineEmits<{
  select: [items: T[]];
  rowClick: [item: T];
}>();

// State
const searchQuery = ref('');
const sortColumn = ref<string | null>(null);
const sortDirection = ref<'asc' | 'desc'>('asc');
const currentPage = ref(1);
const selectedRows = ref<Set<number>>(new Set());
const columnFilters = ref<Record<string, string>>({});

// Computed
const filteredData = computed(() => {
  let result = [...props.data];

  // Apply search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((row) =>
      props.columns.some((col) => {
        const value = row[col.key];
        return String(value).toLowerCase().includes(query);
      }),
    );
  }

  // Apply column filters
  Object.entries(columnFilters.value).forEach(([key, value]) => {
    if (value) {
      const filterValue = value.toLowerCase();
      result = result.filter((row) =>
        String(row[key]).toLowerCase().includes(filterValue),
      );
    }
  });

  // Apply sorting
  if (sortColumn.value) {
    result.sort((a, b) => {
      const aVal = a[sortColumn.value!];
      const bVal = b[sortColumn.value!];
      const modifier = sortDirection.value === 'asc' ? 1 : -1;

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      return aVal < bVal ? -1 * modifier : 1 * modifier;
    });
  }

  return result;
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage;
  const end = start + props.itemsPerPage;
  return filteredData.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / props.itemsPerPage),
);

const allSelected = computed({
  get: () =>
    paginatedData.value.length > 0 &&
    paginatedData.value.every((_, index) =>
      selectedRows.value.has(
        (currentPage.value - 1) * props.itemsPerPage + index,
      ),
    ),
  set: (value) => {
    if (value) {
      paginatedData.value.forEach((_, index) => {
        selectedRows.value.add(
          (currentPage.value - 1) * props.itemsPerPage + index,
        );
      });
    } else {
      paginatedData.value.forEach((_, index) => {
        selectedRows.value.delete(
          (currentPage.value - 1) * props.itemsPerPage + index,
        );
      });
    }
    emitSelection();
  },
});

// Methods
const toggleSort = (column: Column) => {
  if (!column.sortable) return;

  if (sortColumn.value === column.key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = column.key;
    sortDirection.value = 'asc';
  }
};

const toggleRowSelection = (index: number) => {
  const globalIndex = (currentPage.value - 1) * props.itemsPerPage + index;
  if (selectedRows.value.has(globalIndex)) {
    selectedRows.value.delete(globalIndex);
  } else {
    selectedRows.value.add(globalIndex);
  }
  emitSelection();
};

const emitSelection = () => {
  const selected = props.data.filter((_, index) =>
    selectedRows.value.has(index),
  );
  emit('select', selected);
};

const clearFilters = () => {
  searchQuery.value = '';
  columnFilters.value = {};
  currentPage.value = 1;
};

const getCellValue = (row: T, column: Column) => {
  const value = row[column.key];
  return column.render ? column.render(value, row) : value;
};

// Watch for data changes
watch(
  () => props.data,
  () => {
    selectedRows.value.clear();
    currentPage.value = 1;
  },
);
</script>

<template>
  <div class="data-table">
    <!-- Header Controls -->
    <div class="table-header">
      <div class="header-left">
        <div v-if="searchable" class="search-box">
          <Icon name="tabler:search" class="search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search all columns..."
            class="search-input"
          />
          <button
            v-if="searchQuery"
            class="clear-search"
            @click="searchQuery = ''"
            aria-label="Clear search"
          >
            <Icon name="tabler:x" />
          </button>
        </div>
      </div>
      <div class="header-right">
        <button
          v-if="searchQuery || Object.keys(columnFilters).length > 0"
          class="clear-filters-btn"
          @click="clearFilters"
        >
          <Icon name="tabler:filter-x" />
          Clear Filters
        </button>
        <div class="results-count">
          {{ filteredData.length }} result{{
            filteredData.length !== 1 ? 's' : ''
          }}
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th v-if="selectable" class="select-column">
              <input
                type="checkbox"
                :checked="allSelected"
                @change="allSelected = !allSelected"
                class="checkbox"
              />
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="{ sortable: column.sortable }"
              @click="toggleSort(column)"
            >
              <div class="th-content">
                <span>{{ column.label }}</span>
                <div v-if="column.sortable" class="sort-icons">
                  <Icon
                    v-if="sortColumn !== column.key"
                    name="tabler:selector"
                    class="sort-icon"
                  />
                  <Icon
                    v-else-if="sortDirection === 'asc'"
                    name="tabler:sort-ascending"
                    class="sort-icon active"
                  />
                  <Icon
                    v-else
                    name="tabler:sort-descending"
                    class="sort-icon active"
                  />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in paginatedData"
            :key="index"
            :class="{
              selected: selectedRows.has(
                (currentPage - 1) * itemsPerPage + index,
              ),
            }"
            @click="emit('rowClick', row)"
          >
            <td v-if="selectable" class="select-column">
              <input
                type="checkbox"
                :checked="
                  selectedRows.has((currentPage - 1) * itemsPerPage + index)
                "
                @click.stop
                @change="toggleRowSelection(index)"
                class="checkbox"
              />
            </td>
            <td v-for="column in columns" :key="column.key">
              <slot
                :name="`cell-${column.key}`"
                :value="row[column.key]"
                :row="row"
              >
                {{ getCellValue(row, column) }}
              </slot>
            </td>
          </tr>
          <tr v-if="paginatedData.length === 0" class="empty-row">
            <td :colspan="columns.length + (selectable ? 1 : 0)">
              <div class="empty-state">
                <Icon name="tabler:database-off" class="empty-icon" />
                <p>No data found</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        <Icon name="tabler:chevron-left" />
      </button>
      <div class="pagination-info">
        Page {{ currentPage }} of {{ totalPages }}
      </div>
      <button
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        <Icon name="tabler:chevron-right" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.data-table {
  width: 100%;
  background: var(--bg-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  flex-wrap: wrap;
}

.header-left {
  flex: 1;
  min-width: 250px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: var(--spacing-md);
  color: var(--text-tertiary);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) 2.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all var(--transition-fast);
}

.search-input:focus {
  outline: none;
  border-color: var(--brand-primary);
  background: var(--bg-primary);
}

.clear-search {
  position: absolute;
  right: var(--spacing-sm);
  padding: var(--spacing-xs);
  background: transparent;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.clear-search:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.clear-filters-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.clear-filters-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
  border-color: var(--brand-primary);
}

.results-count {
  font-size: 0.875rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

.table-wrapper {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

th {
  padding: var(--spacing-md);
  text-align: left;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  white-space: nowrap;
  user-select: none;
}

th.sortable {
  cursor: pointer;
  transition: background var(--transition-fast);
}

th.sortable:hover {
  background: var(--bg-hover);
}

.th-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.sort-icons {
  display: flex;
  align-items: center;
  color: var(--text-tertiary);
}

.sort-icon {
  font-size: 1rem;
  transition: color var(--transition-fast);
}

.sort-icon.active {
  color: var(--brand-primary);
}

tbody tr {
  border-bottom: 1px solid var(--border-color);
  transition: background var(--transition-fast);
  cursor: pointer;
}

tbody tr:hover {
  background: var(--bg-secondary);
}

tbody tr.selected {
  background: hsla(197, 90%, 56%, 0.1);
}

td {
  padding: var(--spacing-md);
  font-size: 0.875rem;
  color: var(--text-primary);
}

.select-column {
  width: 40px;
  text-align: center;
}

.checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--brand-primary);
}

.empty-row {
  cursor: default;
}

.empty-row:hover {
  background: transparent;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  color: var(--text-tertiary);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  opacity: 0.5;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.pagination-btn:hover:not(:disabled) {
  background: var(--bg-hover);
  border-color: var(--brand-primary);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.875rem;
  color: var(--text-secondary);
}
</style>
