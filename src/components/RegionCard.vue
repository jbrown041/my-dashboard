<script setup>
// REG-01-T06 — RegionCard (US-06 AC-03)
import { TrendingUp, TrendingDown } from 'lucide-vue-next'

defineProps({
  region: {
    type: Object,
    required: true,
    // { id, shipmentVolume, onTimeRate, topCarrier, openExceptions, performanceScore }
  },
})

const emit = defineEmits(['click'])

function scoreColor(score) {
  if (score >= 85) return '#2e7d5e'
  if (score >= 75) return '#d4860b'
  return '#ea6852'
}
</script>

<template>
  <!-- REG-01-T06/T11: Clickable region card → opens DetailDrawer -->
  <button
    class="region-card"
    @click="emit('click', region)"
    :aria-label="`View ${region.id} details`"
  >
    <div class="region-card__header">
      <span class="region-card__name">{{ region.id }}</span>
      <span
        class="region-card__score"
        :style="{ color: scoreColor(region.performanceScore) }"
      >
        {{ region.performanceScore }}
        <component
          :is="region.performanceScore >= 85 ? TrendingUp : TrendingDown"
          :size="14"
          aria-hidden="true"
        />
      </span>
    </div>

    <div class="region-card__stats">
      <div class="region-card__stat">
        <span class="region-card__stat-val">{{ region.shipmentVolume.toLocaleString() }}</span>
        <span class="region-card__stat-label">Shipments</span>
      </div>
      <div class="region-card__stat">
        <span class="region-card__stat-val">{{ region.onTimeRate }}%</span>
        <span class="region-card__stat-label">On-Time</span>
      </div>
      <div class="region-card__stat">
        <span class="region-card__stat-val" style="color: #ea6852;">{{ region.openExceptions }}</span>
        <span class="region-card__stat-label">Exceptions</span>
      </div>
    </div>

    <div class="region-card__carrier">
      Top: <strong>{{ region.topCarrier }}</strong>
    </div>
  </button>
</template>

<style scoped>
.region-card {
  flex: 1 1 180px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  cursor: pointer;
  transition: box-shadow 150ms ease, transform 150ms ease;
}

.region-card:hover {
  box-shadow: 0 2px 8px rgba(1, 30, 65, 0.08);
  transform: translateY(-2px);
}

.region-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.region-card__name {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.region-card__score {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 13px;
  font-weight: 700;
}

.region-card__stats {
  display: flex;
  gap: 12px;
}

.region-card__stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.region-card__stat-val {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.region-card__stat-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-secondary);
}

.region-card__carrier {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.region-card__carrier strong {
  color: var(--color-text-primary);
}
</style>
