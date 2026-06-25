<script setup>
// CARR-01 — Carrier Performance Page (US-05, FR-C01 through FR-C04)
import { ref, onMounted } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import TimeRangeFilter from '../components/TimeRangeFilter.vue'
import ExportButton from '../components/ExportButton.vue'
import CarrierScorecardCard from '../components/CarrierScorecardCard.vue'
import CarrierComparisonChart from '../components/charts/CarrierComparisonChart.vue'
import CarrierOnTimeLineChart from '../components/charts/CarrierOnTimeLineChart.vue'
import DataTable from '../components/DataTable.vue'
import { fetchCarriers } from '../services/api'

const loading = ref(true)
const carriers = ref([])

onMounted(async () => {
  carriers.value = await fetchCarriers()
  loading.value = false
})

// CARR-01-T07: Carrier rankings table columns (all sortable)
const columns = [
  { key: 'name',            label: 'Carrier Name',      sortable: true },
  { key: 'totalShipments',  label: 'Shipments',          sortable: true },
  { key: 'onTimeRate',      label: 'On-Time %',          sortable: true },
  { key: 'incidentCount',   label: 'Incidents',          sortable: true },
  { key: 'avgDeliveryDays', label: 'Avg. Delivery Time', sortable: true },
]

// Format carriers for table (add % suffix, days label)
const tableRows = carriers
</script>

<template>
  <div id="pdf-export-target">
    <!-- CARR-01-T01: Page header -->
    <PageHeader
      title="Carrier Performance"
      subtitle="Scorecard rankings, on-time trends, and carrier comparison"
    >
      <template #time-filter>
        <TimeRangeFilter />
      </template>
      <template #export>
        <ExportButton
          export-target-id="pdf-export-target"
          :csv-data="carriers"
          csv-filename="carriers"
        />
      </template>
    </PageHeader>

    <!-- CARR-01-T02/T03/T04: Scorecard cards row (fluid wrapping) -->
    <div class="scorecards-row">
      <template v-if="loading">
        <div v-for="i in 6" :key="i" class="scorecard-skeleton" />
      </template>
      <CarrierScorecardCard
        v-else
        v-for="carrier in carriers"
        :key="carrier.id"
        :carrier="carrier"
      />
    </div>

    <!-- CARR-01-T05/T06: Charts row (50/50 split) -->
    <div class="two-col-row">
      <CarrierComparisonChart />
      <CarrierOnTimeLineChart />
    </div>

    <!-- CARR-01-T07: Carrier rankings table -->
    <div class="full-row">
      <DataTable
        :columns="columns"
        :rows="carriers"
        :loading="loading"
        empty-message="No carrier data available"
      />
    </div>
  </div>
</template>

<style scoped>
/* CARR-01-T04: Fluid wrapping row for scorecard cards */
.scorecards-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}

.scorecards-row > * {
  flex: 1 1 220px;
  max-width: 320px;
}

.scorecard-skeleton {
  min-height: 140px;
  flex: 1 1 220px;
  max-width: 320px;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--color-border) 25%, rgba(255,255,255,0.12) 50%, var(--color-border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* CARR-01-T05/T06: 50/50 chart row */
.two-col-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.full-row { margin-bottom: 24px; }
</style>
