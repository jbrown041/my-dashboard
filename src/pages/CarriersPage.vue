<script setup>
// CARR-01 — Carrier Performance Page (US-05, FR-C01 through FR-C04)
import { ref, onMounted } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import TimeRangeFilter from '../components/TimeRangeFilter.vue'
import ExportButton from '../components/ExportButton.vue'
import CarrierComparisonChart from '../components/charts/CarrierComparisonChart.vue'
import CarrierOnTimeLineChart from '../components/charts/CarrierOnTimeLineChart.vue'
import CarrierRankingTable from '../components/CarrierRankingTable.vue'
import { fetchCarriers } from '../services/api'

const loading = ref(true)
const carriers = ref([])

onMounted(async () => {
  carriers.value = await fetchCarriers()
  loading.value = false
})
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

    <!-- Charts row (50/50 split) -->
    <div class="two-col-row">
      <CarrierComparisonChart />
      <CarrierOnTimeLineChart />
    </div>

    <!-- Ranked comparison table (replaces scorecard cards + generic table) -->
    <div class="full-row">
      <CarrierRankingTable :carriers="carriers" :loading="loading" />
    </div>
  </div>
</template>

<style scoped>
.two-col-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.full-row { margin-bottom: 24px; }

@media (max-width: 900px) {
  .two-col-row {
    grid-template-columns: 1fr;
  }
}
</style>
