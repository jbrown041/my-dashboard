<script setup>
// REG-01 — Regional Performance Page (US-06, FR-R01 through FR-R05)
import { ref, onMounted } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import TimeRangeFilter from '../components/TimeRangeFilter.vue'
import ExportButton from '../components/ExportButton.vue'
import UsRegionMap from '../components/UsRegionMap.vue'
import RegionCard from '../components/RegionCard.vue'
import RegionalComparisonChart from '../components/charts/RegionalComparisonChart.vue'
import DetailDrawer from '../components/DetailDrawer.vue'
import { fetchRegional } from '../services/api'

const loading = ref(true)
const regions = ref([])

onMounted(async () => {
  regions.value = await fetchRegional()
  loading.value = false
})

// ── Detail drawer ─────────────────────────────────────────────────────────────
const drawerOpen = ref(false)
const selectedRegion = ref(null)

// REG-01-T10/T11: Open drawer on map click or card click (US-06 AC-04)
function openRegionDrawer(region) {
  selectedRegion.value = region
  drawerOpen.value = true
}

function scoreColor(score) {
  if (score >= 85) return '#2e7d5e'
  if (score >= 75) return '#d4860b'
  return '#ea6852'
}

function barWidth(val, total) {
  return total > 0 ? Math.round((val / total) * 100) : 0
}
</script>

<template>
  <div id="pdf-export-target">
    <!-- REG-01-T01: Page header -->
    <PageHeader
      title="Regional Performance"
      subtitle="Shipment volume, on-time rates, and exceptions across all U.S. regions"
    >
      <template #time-filter>
        <TimeRangeFilter />
      </template>
      <template #export>
        <ExportButton
          export-target-id="pdf-export-target"
          :csv-data="regions"
          csv-filename="regional-performance"
        />
      </template>
    </PageHeader>

    <!-- REG-01-T02/T03/T04/T05: Full-width choropleth map -->
    <div class="full-row">
      <div v-if="loading" class="map-skeleton" />
      <UsRegionMap
        v-else
        :regions="regions"
        @region-click="openRegionDrawer"
      />
    </div>

    <!-- REG-01-T06/T07: 5 region cards row (equal width) -->
    <div class="cards-row">
      <template v-if="loading">
        <div v-for="i in 5" :key="i" class="card-skeleton" />
      </template>
      <RegionCard
        v-else
        v-for="region in regions"
        :key="region.id"
        :region="region"
        @click="openRegionDrawer(region)"
      />
    </div>

    <!-- REG-01-T09: Regional comparison chart (full width) -->
    <div class="full-row">
      <RegionalComparisonChart />
    </div>

    <!-- REG-01-T10/T11/T12: Region detail drawer -->
    <DetailDrawer
      :open="drawerOpen"
      :title="selectedRegion?.id ?? ''"
      :subtitle="`Performance Score: ${selectedRegion?.performanceScore ?? '—'}`"
      @close="drawerOpen = false"
    >
      <template v-if="selectedRegion">
        <!-- REG-01-T12: Drawer content (Design Doc §6.4) -->
        <div class="drawer-content">
          <div class="drawer-stat-row">
            <div class="drawer-stat">
              <span class="drawer-stat__label">Shipment Volume</span>
              <span class="drawer-stat__value">{{ selectedRegion.shipmentVolume.toLocaleString() }}</span>
            </div>
            <div class="drawer-stat">
              <span class="drawer-stat__label">On-Time Rate</span>
              <span class="drawer-stat__value" :style="{ color: scoreColor(selectedRegion.performanceScore) }">
                {{ selectedRegion.onTimeRate }}%
              </span>
            </div>
          </div>

          <div class="drawer-stat-row">
            <div class="drawer-stat">
              <span class="drawer-stat__label">Top Carrier</span>
              <span class="drawer-stat__value">{{ selectedRegion.topCarrier }}</span>
            </div>
            <div class="drawer-stat">
              <span class="drawer-stat__label">Open Exceptions</span>
              <span class="drawer-stat__value" style="color: #ea6852;">{{ selectedRegion.openExceptions }}</span>
            </div>
          </div>

          <!-- Mini exception bar -->
          <div class="drawer-section">
            <p class="drawer-section__title">Exceptions by Type</p>
            <div
              v-for="[key, label] in [['delayed','Delayed'],['damaged','Damaged'],['missingDocs','Missing Docs'],['other','Other']]"
              :key="key"
              class="mini-bar-row"
            >
              <span class="mini-bar-label">{{ label }}</span>
              <div class="mini-bar-track">
                <div
                  class="mini-bar-fill"
                  :style="{
                    width: barWidth(selectedRegion.exceptionsByType?.[key] ?? 0, selectedRegion.openExceptions) + '%'
                  }"
                />
              </div>
              <span class="mini-bar-count">{{ selectedRegion.exceptionsByType?.[key] ?? 0 }}</span>
            </div>
          </div>
        </div>
      </template>
    </DetailDrawer>
  </div>
</template>

<style scoped>
.full-row { margin-bottom: 24px; }

.map-skeleton {
  height: 480px;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--color-border) 25%, rgba(255,255,255,0.12) 50%, var(--color-border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

/* REG-01-T07: 5 equal-width region cards */
.cards-row {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.cards-row > * { flex: 1 1 0; min-width: 160px; }

.card-skeleton {
  flex: 1 1 0;
  min-width: 160px;
  min-height: 140px;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--color-border) 25%, rgba(255,255,255,0.12) 50%, var(--color-border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Drawer content styles */
.drawer-content { display: flex; flex-direction: column; gap: 20px; }

.drawer-stat-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.drawer-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: var(--color-bg);
  border-radius: 8px;
  padding: 14px;
}

.drawer-stat__label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
}

.drawer-stat__value {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.drawer-section__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 10px;
}

.mini-bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.mini-bar-label {
  font-size: 13px;
  color: var(--color-text-secondary);
  width: 96px;
  flex-shrink: 0;
}

.mini-bar-track {
  flex: 1;
  height: 6px;
  background-color: var(--color-border);
  border-radius: 3px;
  overflow: hidden;
}

.mini-bar-fill {
  height: 100%;
  background-color: #ea6852;
  border-radius: 3px;
  transition: width 300ms ease;
}

.mini-bar-count {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  width: 28px;
  text-align: right;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .cards-row {
    flex-wrap: wrap;
  }
  .cards-row > * {
    flex: 1 1 calc(50% - 8px);
    min-width: 140px;
  }
}

@media (max-width: 480px) {
  .cards-row > * {
    flex: 1 1 100%;
  }
}
</style>
