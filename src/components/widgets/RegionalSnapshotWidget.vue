<script setup>
// OVR-01-T06 — RegionalSnapshotWidget (FR-O05)
// Condensed region cards with "View Full Report →" link
import { ref, onMounted } from 'vue'
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-vue-next'
import { fetchRegional } from '../../services/api'

const loading = ref(true)
const error = ref(false)
const regions = ref([])

onMounted(async () => {
  try {
    regions.value = await fetchRegional()
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

function scoreColor(score) {
  if (score >= 85) return '#2e7d5e'
  if (score >= 75) return '#d4860b'
  return '#ea6852'
}
</script>

<template>
  <div class="widget-card">
    <div class="widget-card__header">
      <h3 class="widget-card__title">Regional Snapshot</h3>
      <RouterLink to="/regional" class="widget-card__link">
        View Full Report
        <ArrowRight :size="14" aria-hidden="true" />
      </RouterLink>
    </div>

    <!-- Skeleton -->
    <div v-if="loading" class="widget-skeleton">
      <div v-for="i in 5" :key="i" class="skeleton-row" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="widget-error">Unable to load regional data</div>

    <!-- Region rows -->
    <ul v-else class="region-list">
      <li
        v-for="region in regions"
        :key="region.id"
        class="region-row"
      >
        <span class="region-row__name">{{ region.id }}</span>
        <div class="region-row__stats">
          <span class="region-row__volume">{{ region.shipmentVolume.toLocaleString() }} shipments</span>
          <span
            class="region-row__rate"
            :style="{ color: scoreColor(region.performanceScore) }"
          >
            {{ region.onTimeRate }}%
          </span>
          <component
            :is="region.onTimeRate >= 90 ? TrendingUp : TrendingDown"
            :size="14"
            :style="{ color: scoreColor(region.performanceScore) }"
            aria-hidden="true"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.widget-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.widget-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.widget-card__title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--color-text-primary);
}

.widget-card__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #0095a9;
  text-decoration: none;
  transition: opacity 120ms ease;
}

.widget-card__link:hover { opacity: 0.75; }

.region-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.region-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--color-border);
}

.region-row:last-child { border-bottom: none; }

.region-row__name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.region-row__stats {
  display: flex;
  align-items: center;
  gap: 12px;
}

.region-row__volume {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.region-row__rate {
  font-size: 14px;
  font-weight: 600;
}

/* Skeleton */
.widget-skeleton {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-row {
  height: 36px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    var(--color-border) 25%,
    rgba(255,255,255,0.12) 50%,
    var(--color-border) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.widget-error {
  color: #ea6852;
  font-size: 14px;
  padding: 16px 0;
}
</style>
