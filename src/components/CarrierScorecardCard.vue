<script setup>
// CARR-01-T02 / T03 — CarrierScorecardCard (FR-C01, Design Doc §6.3)
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-vue-next'

defineProps({
  carrier: { type: Object, required: true },
  // { id, name, onTimeRate, totalShipments, incidentCount, avgDeliveryDays, trend, belowBenchmark }
})
</script>

<template>
  <!-- CARR-01-T03: Below-benchmark: coral left border + badge -->
  <div
    class="scorecard"
    :class="{ 'scorecard--below': carrier.belowBenchmark }"
  >
    <div class="scorecard__header">
      <span class="scorecard__name">{{ carrier.name }}</span>
      <!-- CARR-01-T03: Below benchmark badge -->
      <span v-if="carrier.belowBenchmark" class="scorecard__badge">
        <AlertCircle :size="12" aria-hidden="true" />
        Below Benchmark
      </span>
    </div>

    <!-- On-time rate (large value) -->
    <div class="scorecard__rate">
      {{ carrier.onTimeRate }}%
      <component
        :is="carrier.trend === 'up' ? TrendingUp : TrendingDown"
        :size="18"
        class="scorecard__trend"
        :class="carrier.trend === 'up' ? 'scorecard__trend--up' : 'scorecard__trend--down'"
        aria-hidden="true"
      />
    </div>

    <!-- Secondary metrics -->
    <div class="scorecard__metrics">
      <div class="scorecard__metric">
        <span class="scorecard__metric-val">{{ carrier.totalShipments.toLocaleString() }}</span>
        <span class="scorecard__metric-label">Shipments</span>
      </div>
      <div class="scorecard__metric">
        <span class="scorecard__metric-val">{{ carrier.incidentCount }}</span>
        <span class="scorecard__metric-label">Incidents</span>
      </div>
      <div class="scorecard__metric">
        <span class="scorecard__metric-val">{{ carrier.avgDeliveryDays }}d</span>
        <span class="scorecard__metric-label">Avg. Delivery</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scorecard {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 3px solid transparent;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: box-shadow 150ms ease, transform 150ms ease;
  min-width: 200px;
}

.scorecard:hover {
  box-shadow: 0 2px 8px rgba(1, 30, 65, 0.08);
  transform: translateY(-2px);
}

/* CARR-01-T03: Coral left border for below-benchmark */
.scorecard--below {
  border-left-color: #ea6852;
}

.scorecard__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.scorecard__name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.scorecard__badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background-color: rgba(234, 104, 82, 0.12);
  color: #ea6852;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  white-space: nowrap;
}

.scorecard__rate {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.scorecard__trend--up   { color: #2e7d5e; }
.scorecard__trend--down { color: #ea6852; }

.scorecard__metrics {
  display: flex;
  gap: 16px;
}

.scorecard__metric {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.scorecard__metric-val {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.scorecard__metric-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-secondary);
}
</style>
