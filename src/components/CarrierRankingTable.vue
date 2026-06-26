<script setup>
import { computed } from 'vue'
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  carriers: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
})

// Sort by on-time rate descending to create a ranking
const ranked = computed(() =>
  [...props.carriers].sort((a, b) => b.onTimeRate - a.onTimeRate)
)

function rateColor(rate) {
  if (rate >= 90) return '#0095a9'
  if (rate >= 85) return '#f59e0b'
  return '#ea6852'
}

function incidentSeverity(count) {
  if (count <= 20) return 'low'
  if (count <= 50) return 'medium'
  return 'high'
}
</script>

<template>
  <div class="ranking-table-wrap">
    <div class="ranking-table-header">
      <h2 class="ranking-table-title">Carrier Rankings</h2>
      <p class="ranking-table-sub">Ranked by on-time delivery rate</p>
    </div>

    <!-- Skeleton -->
    <template v-if="loading">
      <div v-for="i in 6" :key="i" class="row-skeleton" />
    </template>

    <!-- Table -->
    <table v-else class="ranking-table" role="table" aria-label="Carrier performance rankings">
      <thead>
        <tr>
          <th class="col-rank">#</th>
          <th class="col-name">Carrier</th>
          <th class="col-rate">On-Time Rate</th>
          <th class="col-trend">Trend</th>
          <th class="col-stat">Shipments</th>
          <th class="col-stat">Incidents</th>
          <th class="col-stat">Avg. Delivery</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(carrier, index) in ranked"
          :key="carrier.id"
          class="ranking-row"
          :class="{ 'ranking-row--below': carrier.belowBenchmark }"
        >
          <!-- Rank -->
          <td class="col-rank">
            <span class="rank-badge">{{ index + 1 }}</span>
          </td>

          <!-- Name + below-benchmark badge -->
          <td class="col-name">
            <span class="carrier-name">{{ carrier.name }}</span>
            <span v-if="carrier.belowBenchmark" class="below-badge">
              <AlertCircle :size="11" aria-hidden="true" />
              Below Benchmark
            </span>
          </td>

          <!-- On-time rate + progress bar -->
          <td class="col-rate">
            <div class="rate-cell">
              <span class="rate-value" :style="{ color: rateColor(carrier.onTimeRate) }">
                {{ carrier.onTimeRate }}%
              </span>
              <div class="rate-bar-track">
                <div
                  class="rate-bar-fill"
                  :style="{
                    width: carrier.onTimeRate + '%',
                    backgroundColor: rateColor(carrier.onTimeRate),
                  }"
                />
              </div>
            </div>
          </td>

          <!-- Trend -->
          <td class="col-trend">
            <span class="trend-icon" :class="'trend-icon--' + carrier.trend">
              <TrendingUp v-if="carrier.trend === 'up'" :size="16" aria-label="Trending up" />
              <TrendingDown v-else :size="16" aria-label="Trending down" />
            </span>
          </td>

          <!-- Shipments -->
          <td class="col-stat">{{ carrier.totalShipments.toLocaleString() }}</td>

          <!-- Incidents -->
          <td class="col-stat">
            <span class="incident-count" :class="'incident-count--' + incidentSeverity(carrier.incidentCount)">
              {{ carrier.incidentCount }}
            </span>
          </td>

          <!-- Avg delivery -->
          <td class="col-stat">{{ carrier.avgDeliveryDays }}d</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.ranking-table-wrap {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow-x: auto;
}

.ranking-table-header {
  padding: 16px 20px 12px;
  border-bottom: 1px solid var(--color-border);
}

.ranking-table-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 2px;
}

.ranking-table-sub {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin: 0;
}

/* Skeleton rows */
.row-skeleton {
  height: 56px;
  margin: 1px 0;
  background: linear-gradient(
    90deg,
    var(--color-border) 25%,
    rgba(255, 255, 255, 0.08) 50%,
    var(--color-border) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Table */
.ranking-table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  padding: 10px 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
}

.ranking-row {
  border-bottom: 1px solid var(--color-border);
  transition: background-color 120ms ease;
  border-left: 3px solid transparent;
}

.ranking-row:last-child {
  border-bottom: none;
}

.ranking-row:hover {
  background-color: rgba(0, 149, 169, 0.05);
}

.ranking-row--below {
  border-left-color: #ea6852;
}

td {
  padding: 14px 20px;
  vertical-align: middle;
}

/* Columns */
.col-rank {
  width: 48px;
  text-align: center;
}

.col-name { min-width: 160px; }

.col-rate { min-width: 180px; }

.col-trend {
  width: 64px;
  text-align: center;
}

.col-stat {
  text-align: right;
  white-space: nowrap;
}

td.col-stat {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

/* Rank badge */
.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  background-color: var(--color-border);
  color: var(--color-text-secondary);
}

/* Carrier name + below badge */
.carrier-name {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.below-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #ea6852;
  background-color: rgba(234, 104, 82, 0.12);
}

/* On-time rate cell */
.rate-cell {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.rate-value {
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
}

.rate-bar-track {
  height: 4px;
  border-radius: 2px;
  background-color: var(--color-border);
  overflow: hidden;
}

.rate-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Trend icon */
.trend-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.trend-icon--up   { color: #2e7d5e; }
.trend-icon--down { color: #ea6852; }

/* Incident severity colors */
.incident-count { font-weight: 600; }
.incident-count--low    { color: var(--color-text-primary); }
.incident-count--medium { color: #f59e0b; }
.incident-count--high   { color: #ea6852; }
</style>
