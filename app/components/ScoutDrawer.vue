<script lang="ts" setup>
import type { Scout } from '../pages/dashboard/scouts.vue';

const props = defineProps<{
  isDrawerOpen: boolean;
  selectedScout: Scout | null;
  activeTab: string;
  closeDrawer: () => void;
}>();

const emit = defineEmits<{
  'update:activeTab': [tab: string];
}>();

const localActiveTab = computed({
  get: () => props.activeTab,
  set: (value) => emit('update:activeTab', value),
});
</script>

<template>
  <Transition name="drawer">
    <div v-if="isDrawerOpen" class="drawer-overlay" @click="closeDrawer">
      <div class="drawer" @click.stop>
        <div class="drawer-header">
          <div class="drawer-title">
            <h2>
              {{ selectedScout?.firstName }} {{ selectedScout?.lastName }}
            </h2>
            <span
              class="scout-type-badge"
              :class="selectedScout?.scoutType.toLowerCase()"
            >
              {{ selectedScout?.scoutType }}
            </span>
          </div>
          <button
            class="close-btn"
            @click="closeDrawer"
            aria-label="Close drawer"
          >
            <Icon name="tabler:x" />
          </button>
        </div>

        <div class="drawer-tabs">
          <button
            v-for="tab in [
              'personal',
              'contact',
              'scouting',
              'units',
              'beads',
              'history',
            ]"
            :key="tab"
            :class="['tab-btn', { active: localActiveTab === tab }]"
            @click="localActiveTab = tab"
          >
            <Icon
              :name="
                tab === 'personal'
                  ? 'tabler:user'
                  : tab === 'contact'
                    ? 'tabler:phone'
                    : tab === 'scouting'
                      ? 'tabler:flag'
                      : tab === 'units'
                        ? 'tabler:users-group'
                        : tab === 'beads'
                          ? 'tabler:circle-dot'
                          : 'tabler:clock'
              "
            />
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
          </button>
        </div>

        <div class="drawer-content">
          <!-- Personal Tab -->
          <div v-if="localActiveTab === 'personal'" class="tab-panel">
            <div class="detail-group">
              <label>First Name</label>
              <p>{{ selectedScout?.firstName }}</p>
            </div>
            <div class="detail-group">
              <label>Last Name</label>
              <p>{{ selectedScout?.lastName }}</p>
            </div>
            <div class="detail-group">
              <label>Scout Type</label>
              <p>{{ selectedScout?.scoutType }}</p>
            </div>
            <div class="detail-group">
              <label>Ceremony Date</label>
              <p>{{ selectedScout?.ceremonyDate || 'Not specified' }}</p>
            </div>
            <div class="detail-group">
              <label>Clan Name</label>
              <p>{{ selectedScout?.clanCharacter || 'Not specified' }}</p>
            </div>
            <div class="detail-group">
              <label>Clan Character</label>
              <p>{{ selectedScout?.clanCharacter }}</p>
            </div>
          </div>

          <!-- Contact Tab -->
          <div v-if="localActiveTab === 'contact'" class="tab-panel">
            <p class="no-data-message">Contact information coming soon</p>
          </div>

          <!-- Scouting Tab -->
          <div v-if="localActiveTab === 'scouting'" class="tab-panel">
            <div class="detail-group">
              <label>Unit Number</label>
              <p>{{ selectedScout?.unitNumber }}</p>
            </div>
            <div class="detail-group">
              <label>Scouting America ID</label>
              <p class="id-value">
                {{ selectedScout?.scoutingAmericaId || '—' }}
              </p>
            </div>
          </div>

          <!-- Units Tab -->
          <div v-if="localActiveTab === 'units'" class="tab-panel">
            <p class="no-data-message">Units information coming soon</p>
          </div>

          <!-- Beads Tab -->
          <div v-if="localActiveTab === 'beads'" class="tab-panel">
            <div class="detail-group">
              <label>Clan Color</label>
              <div class="clan-color-badges">
                <div
                  v-for="(color, index) in selectedScout?.clanColor"
                  :key="index"
                  class="color-badge large"
                  :style="{ backgroundColor: color }"
                  :title="color"
                />
                <span
                  v-if="
                    !selectedScout?.clanColor ||
                    selectedScout.clanColor.length === 0
                  "
                  class="no-data"
                >
                  N/A
                </span>
              </div>
            </div>
          </div>

          <!-- History Tab -->
          <div v-if="localActiveTab === 'history'" class="tab-panel">
            <p class="no-data-message">History information coming soon</p>
          </div>
        </div>

        <div class="drawer-footer">
          <button class="action-btn secondary" @click="closeDrawer">
            Close
          </button>
          <button class="action-btn primary">
            <Icon name="tabler:pencil" />
            Edit
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.drawer {
  width: 600px;
  max-width: 100%;
  background: var(--bg-primary);
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xl);
}

[data-theme='light'] .drawer {
  background-color: hsl(0, 0%, 100%);
}

.drawer-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--border-color);
  background-color: hsl(222, 20%, 16%);
  background: var(--bg-elevated);
  position: sticky;
  top: 0;
  z-index: 10;
}

[data-theme='light'] .drawer-header {
  background-color: hsl(0, 0%, 98%);
}

.drawer-title {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.drawer-title h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.scout-type-badge {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  width: fit-content;
}

.scout-type-badge.youth {
  background: hsla(197, 90%, 56%, 0.15);
  color: var(--brand-primary);
}

.scout-type-badge.adult {
  background: hsla(280, 70%, 60%, 0.15);
  color: var(--brand-secondary);
}

.close-btn {
  background: transparent;
  border: none;
  padding: var(--spacing-sm);
  cursor: pointer;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.close-btn svg {
  width: 24px;
  height: 24px;
}

.drawer-tabs {
  display: flex;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) var(--spacing-xl);
  border-bottom: 1px solid var(--border-color);
  background-color: hsl(222, 20%, 11%);
  background: var(--bg-primary);
  overflow-x: auto;
  position: sticky;
  top: 81px;
  z-index: 10;
}

[data-theme='light'] .drawer-tabs {
  background-color: hsl(0, 0%, 100%);
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.tab-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.tab-btn.active {
  background: var(--brand-primary);
  color: white;
}

.tab-btn svg {
  width: 18px;
  height: 18px;
}

.drawer-content {
  flex: 1;
  padding: var(--spacing-xl);
  overflow-y: auto;
  background-color: hsl(222, 20%, 11%);
  background: var(--bg-primary);
}

[data-theme='light'] .drawer-content {
  background-color: hsl(0, 0%, 100%);
}

.tab-panel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.detail-group label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.detail-group p {
  font-size: 1rem;
  color: var(--text-primary);
  margin: 0;
}

.no-data-message {
  text-align: center;
  color: var(--text-tertiary);
  font-style: italic;
  padding: var(--spacing-xl);
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

.color-badge.large {
  width: 32px;
  height: 32px;
}

.no-data {
  color: var(--text-tertiary);
  font-style: italic;
}

.id-value {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.8125rem;
  color: var(--text-primary);
}

.drawer-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  border-top: 1px solid var(--border-color);
  background-color: hsl(222, 20%, 16%);
  background: var(--bg-elevated);
  position: sticky;
  bottom: 0;
}

[data-theme='light'] .drawer-footer {
  background-color: hsl(0, 0%, 98%);
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

.action-btn.secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.action-btn.secondary:hover {
  background: var(--bg-secondary);
  border-color: var(--text-tertiary);
}

/* Drawer Transitions */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-active .drawer,
.drawer-leave-active .drawer {
  transition: transform 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .drawer,
.drawer-leave-to .drawer {
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .drawer {
    width: 100%;
  }

  .drawer-tabs {
    top: 73px;
  }
}
</style>
