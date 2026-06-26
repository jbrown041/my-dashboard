<script setup>
// OVR-01 — Overview Page (US-01, US-02, US-03, FR-O01 through FR-O06)
import { ref, watch, onMounted } from 'vue'
import {
  Package,
  Truck,
  CheckCircle,
  AlertTriangle,
} from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'
import TimeRangeFilter from '../components/TimeRangeFilter.vue'
import ExportButton from '../components/ExportButton.vue'
import MetricCard from '../components/MetricCard.vue'
import ShipmentVolumeChart from '../components/charts/ShipmentVolumeChart.vue'
import OnTimeRateChart from '../components/charts/OnTimeRateChart.vue'
import RegionalSnapshotWidget from '../components/widgets/RegionalSnapshotWidget.vue'
import ExceptionSummaryWidget from '../components/widgets/ExceptionSummaryWidget.vue'
import { useTimeRangeStore } from '../stores/timeRange'
import { fetchKpi } from '../services/api'

const timeRangeStore = useTimeRangeStore()

// ── KPI data ──────────────────────────────────────────────────────────────────
const kpiLoading = ref(true)
const kpiData = ref(null)

async function loadKpi() {
  kpiLoading.value = true
  kpiData.value = await fetchKpi(timeRangeStore.selected)
  kpiLoading.value = false
}

onMounted(loadKpi)
// OVR-01-T03: Re-fetch KPIs when time range changes (US-01 AC-03)
watch(() => timeRangeStore.selected, loadKpi)

// Format helpers
function formatRate(v) { return `${v}%` }
</script>

<template>
  <div id="pdf-export-target">
    <!-- OVR-01-T01: Page header with TimeRangeFilter + ExportButton (Design Doc §4.5) -->
    <PageHeader
      title="Overview"
      subtitle="Executive summary of logistics performance"
    >
      <template #time-filter>
        <TimeRangeFilter />
      </template>
      <template #export>
        <ExportButton
          export-target-id="pdf-export-target"
          :csv-data="kpiData ? [
            {
              Metric: 'Total Shipments',
              Value: kpiData.totalShipments.value,
              Delta: kpiData.totalShipments.delta,
              Direction: kpiData.totalShipments.deltaDirection,
            },
            {
              Metric: 'On-Time Rate',
              Value: kpiData.onTimeRate.value,
              Delta: kpiData.onTimeRate.delta,
              Direction: kpiData.onTimeRate.deltaDirection,
            },
            {
              Metric: 'Active Carriers',
              Value: kpiData.activeCarriers.value,
              Delta: kpiData.activeCarriers.delta,
              Direction: kpiData.activeCarriers.deltaDirection,
            },
            {
              Metric: 'Open Exceptions',
              Value: kpiData.openExceptions.value,
              Delta: kpiData.openExceptions.delta,
              Direction: kpiData.openExceptions.deltaDirection,
            },
          ] : []"
          csv-filename="overview-kpis"
        />
      </template>
    </PageHeader>

    <!-- OVR-01-T02: KPI Cards Row (4 equal cards) -->
    <div class="kpi-row" aria-label="Key performance indicators">
      <!-- Skeleton state -->
      <template v-if="kpiLoading">
        <div v-for="i in 4" :key="i" class="kpi-skeleton" />
      </template>

      <!-- COMP-02-T05: Cards update when time range changes -->
      <template v-else-if="kpiData">
        <MetricCard
          label="Total Shipments"
          :value="kpiData.totalShipments.value"
          :delta="kpiData.totalShipments.delta"
          :delta-direction="kpiData.totalShipments.deltaDirection"
          :icon="Package"
        />
        <MetricCard
          label="On-Time Delivery Rate"
          :value="kpiData.onTimeRate.value"
          :delta="kpiData.onTimeRate.delta"
          :delta-direction="kpiData.onTimeRate.deltaDirection"
          :icon="CheckCircle"
          :format-value="formatRate"
        />
        <MetricCard
          label="Active Carriers"
          :value="kpiData.activeCarriers.value"
          :delta="kpiData.activeCarriers.delta"
          :delta-direction="kpiData.activeCarriers.deltaDirection"
          :icon="Truck"
        />
        <MetricCard
          label="Open Exceptions"
          :value="kpiData.openExceptions.value"
          :delta="kpiData.openExceptions.delta"
          :delta-direction="kpiData.openExceptions.deltaDirection"
          :icon="AlertTriangle"
        />
      </template>
    </div>

    <!-- OVR-01-T04/T05/T08: Charts row (60/40 split, Design Doc §6.1) -->
    <div class="two-col-row">
      <div class="col-60">
        <ShipmentVolumeChart />
      </div>
      <div class="col-40">
        <OnTimeRateChart />
      </div>
    </div>

    <!-- OVR-01-T06/T07/T09: Widgets row (60/40 split, Design Doc §6.1) -->
    <div class="two-col-row">
      <div class="col-60">
        <RegionalSnapshotWidget />
      </div>
      <div class="col-40">
        <ExceptionSummaryWidget />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* OVR-01-T02: KPI cards row — 4 equal-width cards */
.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.kpi-skeleton {
  min-height: 120px;
  border-radius: 8px;
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

/* OVR-01-T08/T09: Two-column layout rows (60/40 split) */
.two-col-row {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 16px;
  margin-bottom: 24px;
}

.col-60,
.col-40 {
  min-width: 0;
}

@media (max-width: 900px) {
  .kpi-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .two-col-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .kpi-row {
    grid-template-columns: 1fr;
  }
}
</style>
