<script setup>
// SHIP-01 — Shipments Page (US-03, US-04, FR-S01 through FR-S05)
import { ref, computed, watch, onMounted } from 'vue'
import { Package } from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'
import TimeRangeFilter from '../components/TimeRangeFilter.vue'
import ExportButton from '../components/ExportButton.vue'
import KpiCard from '../components/KpiCard.vue'
import DataTable from '../components/DataTable.vue'
import ShipmentVolumeChart from '../components/charts/ShipmentVolumeChart.vue'
import ShipmentsByStatusChart from '../components/charts/ShipmentsByStatusChart.vue'
import VolumeByRegionChart from '../components/charts/VolumeByRegionChart.vue'
import { useTimeRangeStore } from '../stores/timeRange'
import { fetchKpi, fetchShipments } from '../services/api'

const timeRangeStore = useTimeRangeStore()

// ── KPI ──────────────────────────────────────────────────────────────────────
const kpiLoading = ref(true)
const kpiData = ref(null)

async function loadKpi() {
  kpiLoading.value = true
  kpiData.value = await fetchKpi(timeRangeStore.selected)
  kpiLoading.value = false
}

onMounted(loadKpi)
watch(() => timeRangeStore.selected, loadKpi)

// ── Shipments Table ───────────────────────────────────────────────────────────
const tableLoading = ref(true)
const allShipments = ref([])

const STATUS_LABELS = {
  delivered:  'Delivered',
  in_transit: 'In Transit',
  delayed:    'Delayed',
  exception:  'Exception',
}

onMounted(async () => {
  const raw = await fetchShipments()
  allShipments.value = raw.map((s) => ({
    ...s,
    status: STATUS_LABELS[s.status] ?? s.status,
  }))
  tableLoading.value = false
})

// ── Region filter ─────────────────────────────────────────────────────────────
const REGIONS = ['All Regions', 'Northeast', 'Southeast', 'Midwest', 'Southwest', 'West']
const selectedRegion = ref('All Regions')

// Table filters by carrier/origin region (approximated by name-matching cities)
const filteredShipments = computed(() => {
  if (selectedRegion.value === 'All Regions') return allShipments.value
  return allShipments.value.filter((s) =>
    s.carrier && s.carrier.toLowerCase().includes(selectedRegion.value.toLowerCase().slice(0, 4))
  )
})

// ── Table columns ─────────────────────────────────────────────────────────────
const columns = [
  { key: 'id',          label: 'Shipment ID',   sortable: true },
  { key: 'origin',      label: 'Origin',         sortable: true },
  { key: 'destination', label: 'Destination',    sortable: true },
  { key: 'carrier',     label: 'Carrier',        sortable: true },
  { key: 'status',      label: 'Status',         sortable: true },
  { key: 'eta',         label: 'ETA',            sortable: true },
  { key: 'lastUpdated', label: 'Last Updated',   sortable: true },
]
</script>

<template>
  <div id="pdf-export-target">
    <!-- SHIP-01-T01: Page header -->
    <PageHeader
      title="Shipments"
      subtitle="Shipment volume, status breakdown, and detailed records"
    >
      <template #time-filter>
        <TimeRangeFilter />
      </template>
      <template #export>
        <ExportButton
          export-target-id="pdf-export-target"
          :csv-data="filteredShipments"
          csv-filename="shipments"
        />
      </template>
    </PageHeader>

    <!-- SHIP-01-T02: Total Shipments KPI card (FR-S01) -->
    <div class="kpi-strip">
      <div v-if="kpiLoading" class="kpi-skeleton" />
      <KpiCard
        v-else-if="kpiData"
        label="Total Shipments"
        :value="kpiData.totalShipments.value"
        :delta="kpiData.totalShipments.delta"
        :delta-direction="kpiData.totalShipments.deltaDirection"
        :icon="Package"
      />
    </div>

    <!-- SHIP-01-T03/T04: Charts row (60/40) -->
    <div class="two-col-row">
      <div class="col-60">
        <!-- Region filter + Volume chart -->
        <div class="region-filter-row">
          <label class="region-filter-label" for="region-select">Region</label>
          <select id="region-select" v-model="selectedRegion" class="region-select">
            <option v-for="r in REGIONS" :key="r" :value="r">{{ r }}</option>
          </select>
        </div>
        <ShipmentVolumeChart />
      </div>
      <div class="col-40">
        <ShipmentsByStatusChart />
      </div>
    </div>

    <!-- SHIP-01-T05: Volume by region (full width) -->
    <div class="full-row">
      <VolumeByRegionChart />
    </div>

    <!-- SHIP-01-T06: Shipments data table (full width, FR-S05) -->
    <div class="full-row">
      <DataTable
        :columns="columns"
        :rows="filteredShipments"
        :loading="tableLoading"
        empty-message="No shipments found"
      />
    </div>
  </div>
</template>

<style scoped>
.kpi-strip {
  margin-bottom: 24px;
  max-width: 280px;
}

.kpi-skeleton {
  min-height: 120px;
  max-width: 280px;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--color-border) 25%, rgba(255,255,255,0.12) 50%, var(--color-border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.two-col-row {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 16px;
  margin-bottom: 24px;
}

.col-60, .col-40 { min-width: 0; display: flex; flex-direction: column; gap: 8px; }

.full-row { margin-bottom: 24px; }

.region-filter-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.region-filter-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.region-select {
  padding: 4px 10px;
  font-size: 13px;
  font-family: inherit;
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: border-color 120ms ease;
}

.region-select:focus {
  border-color: #0095a9;
}
</style>
