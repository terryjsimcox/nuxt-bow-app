<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
});

const stats = [
  {
    label: 'Total Scouts',
    value: '49',
    change: '0% since last month',
    icon: 'tabler:users',
    color: 'blue',
  },
  {
    label: 'Active Today',
    value: '1',
    change: '0% vs yesterday',
    icon: 'tabler:user-check',
    color: 'green',
  },
  {
    label: 'Beads Earned',
    value: '40',
    change: '0% this month',
    icon: 'tabler:award',
    color: 'yellow',
  },
  {
    label: 'Activities',
    value: '0',
    change: '0% vs last month',
    icon: 'tabler:list-check',
    color: 'purple',
  },
];

const recentActivity = [
  {
    title: 'New scout registered',
    description: 'John Smith joined the Bobcat clan',
    time: '2 hours ago',
    icon: 'tabler:user-plus',
  },
  {
    title: 'Bead awarded',
    description: 'Sarah Johnson earned the Founders bead',
    time: '5 hours ago',
    icon: 'tabler:award',
  },
  {
    title: 'Story completed',
    description: 'Michael Brown completed Story of the Arrow',
    time: '1 day ago',
    icon: 'tabler:book',
  },
];
</script>

<template>
  <div class="dashboard-page">
    <!-- Stats Grid -->
    <div class="stats-grid">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="stat-card"
        :class="`stat-${stat.color}`">
        <div class="stat-icon">
          <Icon :name="stat.icon" />
        </div>
        <div class="stat-content">
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-change">{{ stat.change }}</div>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="content-grid">
      <!-- Chart Placeholder -->
      <div class="card chart-card">
        <div class="card-header">
          <h3>Scout Registration - Past 6 Months</h3>
          <p class="card-subtitle">Total Scouts Registered: 49</p>
        </div>
        <div class="chart-placeholder">
          <Icon name="tabler:chart-line" />
          <p>Trending neutral by 0.0% this month</p>
          <small>Showing scout registrations for the last 6 months</small>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card activity-card">
        <div class="card-header">
          <h3>Recent Activity</h3>
          <p class="card-subtitle">Latest updates and events</p>
        </div>
        <div class="activity-list">
          <div
            v-for="activity in recentActivity"
            :key="activity.title"
            class="activity-item">
            <div class="activity-icon">
              <Icon :name="activity.icon" />
            </div>
            <div class="activity-content">
              <div class="activity-title">{{ activity.title }}</div>
              <div class="activity-description">{{ activity.description }}</div>
              <div class="activity-time">{{ activity.time }}</div>
            </div>
          </div>

          <div class="activity-placeholder">
            <p>This is a placeholder for your extra dashboard content.</p>
            <p>
              You can display recent actions, notifications or anything else
              here.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  width: 100%;
  height: 100%;
  padding: var(--spacing-xl);
  overflow-y: auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.stat-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  transition: all var(--transition-fast);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-size: 1.5rem;
  flex-shrink: 0;
}

.stat-blue .stat-icon {
  background: hsl(220, 90%, 95%);
  color: var(--brand-primary);
}

[data-theme='dark'] .stat-blue .stat-icon {
  background: hsl(220, 90%, 15%);
  color: var(--brand-primary);
}

.stat-green .stat-icon {
  background: hsl(142, 76%, 90%);
  color: hsl(142, 76%, 40%);
}

[data-theme='dark'] .stat-green .stat-icon {
  background: hsl(142, 76%, 15%);
  color: hsl(142, 76%, 60%);
}

.stat-yellow .stat-icon {
  background: hsl(45, 100%, 90%);
  color: hsl(45, 100%, 40%);
}

[data-theme='dark'] .stat-yellow .stat-icon {
  background: hsl(45, 100%, 15%);
  color: hsl(45, 100%, 60%);
}

.stat-purple .stat-icon {
  background: hsl(280, 70%, 90%);
  color: var(--brand-secondary);
}

[data-theme='dark'] .stat-purple .stat-icon {
  background: hsl(280, 70%, 15%);
  color: var(--brand-secondary);
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: var(--spacing-xs);
}

.stat-change {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: 2fr 1fr;
  }
}

.card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.card-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.card-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.card-subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.chart-placeholder {
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: var(--text-tertiary);
  text-align: center;
}

.chart-placeholder Icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  opacity: 0.5;
}

.chart-placeholder p {
  margin: var(--spacing-xs) 0;
  color: var(--text-secondary);
}

.chart-placeholder small {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

.activity-list {
  padding: var(--spacing-lg);
}

.activity-item {
  display: flex;
  gap: var(--spacing-md);
  padding-bottom: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.activity-item:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.activity-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  color: var(--brand-primary);
  font-size: 1.25rem;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.activity-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.activity-time {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

.activity-placeholder {
  padding: var(--spacing-lg);
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  text-align: center;
  margin-top: var(--spacing-lg);
}

.activity-placeholder p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: var(--spacing-xs) 0;
}
</style>
