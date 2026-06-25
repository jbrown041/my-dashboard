<script setup>
// EXC-01 — Exceptions Page (US-07, US-08, FR-E01 through FR-E08)
import { ref, computed, watch, onMounted } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import TimeRangeFilter from '../components/TimeRangeFilter.vue'
import ExportButton from '../components/ExportButton.vue'
import ExceptionSummaryBar from '../components/ExceptionSummaryBar.vue'
import ExceptionsOverTimeChart from '../components/charts/ExceptionsOverTimeChart.vue'
import ExceptionsByRegionChart from '../components/charts/ExceptionsByRegionChart.vue'
import DataTable from '../components/DataTable.vue'
import DetailDrawer from '../components/DetailDrawer.vue'
import StatusTag from '../components/StatusTag.vue'
import { useTimeRangeStore } from '../stores/timeRange'
import { fetchExceptions, fetchExceptionsSummary } from '../services/api'

const timeRangeStore = useTimeRangeStore()

// ── Summary bar data ──────────────────────────────────────────────────────────
const summary = ref(null)
const summaryLoading = ref(true)

async function loadSummary() {
  summaryLoading.value = true
  summary.value = await fetchExceptionsSummary(timeRangeStore.selected)
  summaryLoading.value = false
}

onMounted(loadSummary)
watch(() => timeRangeStore.selected, loadSummary)

// ── Exception table ───────────────────────────────────────────────────────────
const tableLoading = ref(true)
const allExceptions = ref([])

const TYPE_LABELS = {
  delayed:     'Delayed',
  damaged:     'Damaged',
  missingDocs: 'Missing Docs',
  other:       'Other',
}

onMounted(async () => {
  const raw = await fetchExceptions()
  allExceptions.value = raw.map((e) => ({
    ...e,
    type: TYPE_LABELS[e.type] ?? e.type,
    status: e.status.charAt(0).toUpperCase() + e.status.slice(1),
  }))
  tableLoading.value = false
})

// EXC-01-T04/T05: Active category filter
const activeFilter = ref(null)

// Map display type label back to raw key for filtering
const TYPE_KEYS = { 'Delayed': 'delayed', 'Damaged': 'damaged', 'Missing Docs': 'missingDocs', 'Other': 'other' }

function handleFilter(key) {
  activeFilter.value = key
}

const filteredExceptions = computed(() => {
  if (!activeFilter.value) return allExceptions.value
  const label = TYPE_LABELS[activeFilter.value]
  return allExceptions.value.filter((e) => e.type === label)
})

// ── Table columns ─────────────────────────────────────────────────────────────
const columns = [
  { key: 'id',         label: 'Exception ID', sortable: true },
  { key: 'type',       label: 'Type',         sortable: true },
  { key: 'shipmentId', label: 'Shipment ID',  sortable: true },
  { key: 'carrier',    label: 'Carrier',      sortable: true },
  { key: 'region',     label: 'Region',       sortable: true },
  { key: 'dateOpened', label: 'Date Opened',  sortable: true },
  { key: 'daysOpen',   label: 'Days Open',    sortable: true },
  { key: 'status',     label: 'Status',       sortable: true },
]

// ── Detail drawer ─────────────────────────────────────────────────────────────
const drawerOpen = ref(false)
const selectedRow = ref(null)

// EXC-01-T12: Preserve scroll position on drawer close
const tableScrollTop = ref(0)
const tableRef = ref(null)

function openDrawer(row) {
  if (tableRef.value) {
    tableScrollTop.value = tableRef.value.scrollTop ?? 0
  }
  selectedRow.value = row
  drawerOpen.value = true
}

function closeDrawer() {
  drawerOpen.value = false
}
</script>

<template>
  <div id="pdf-export-target">
    <!-- EXC-01-T01: Page header -->
    <PageHeader
      title="Exceptions"
      subtitle="Exception tracking by category, trend, and region"
    >
      <template #time-filter>
        <TimeRangeFilter />
      </template>
      <template #export>
        <ExportButton
          export-target-id="pdf-export-target"
          :csv-data="filteredExceptions"
          csv-filename="exceptions"
        />
      </template>
    </PageHeader>

    <!-- EXC-01-T02 through T06: Exception summary bar with filter -->
    <ExceptionSummaryBar
      :summary="summary"
      :active-filter="activeFilter"
      @filter="handleFilter"
    />

    <!-- EXC-01-T07/T08: Charts row (60/40) -->
    <div class="two-col-row">
      <div class="col-60">
        <ExceptionsOverTimeChart />
      </div>
      <div class="col-40">
        <ExceptionsByRegionChart />
      </div>
    </div>

    <!-- EXC-01-T09: Exceptions data table (full width) -->
    <div ref="tableRef" class="full-row">
      <DataTable
        :columns="columns"
        :rows="filteredExceptions"
        :loading="tableLoading"
        :clickable="true"
        empty-message="No exceptions found"
        @row-click="openDrawer"
      />
    </div>

    <!-- EXC-01-T10/T11: Exception detail drawer (US-08) -->
    <DetailDrawer
      :open="drawerOpen"
      :title="selectedRow?.id ?? ''"
      :subtitle="selectedRow?.type ?? ''"
      @close="closeDrawer"
    >
      <template v-if="selectedRow">
        <!-- EXC-01-T11: Drawer content (Design Doc §6.5) -->
        <div class="drawer-content">
          <div class="drawer-field">
            <span class="drawer-field__label">Type</span>
            <StatusTag :status="selectedRow.type" />
          </div>
          <div class="drawer-field">
            <span class="drawer-field__label">Shipment ID</span>
            <span class="drawer-field__value">{{ selectedRow.shipmentId }}</span>
          </div>
          <div class="drawer-field">
            <span class="drawer-field__label">Carrier</span>
            <span class="drawer-field__value">{{ selectedRow.carrier }}</span>
          </div>
          <div class="drawer-field">
            <span class="drawer-field__label">Region</span>
            <span class="drawer-field__value">{{ selectedRow.region }}</span>
          </div>
          <div class="drawer-field">
            <span class="drawer-field__label">Date Opened</span>
            <span class="drawer-field__value">{{ selectedRow.dateOpened }}</span>
          </div>
          <div class="drawer-field">
            <span class="drawer-field__label">Days Open</span>
            <span
              class="drawer-field__value"
              :style="{ color: selectedRow.daysOpen >= 7 ? '#ea6852' : 'var(--color-text-primary)' }"
            >
              {{ selectedRow.daysOpen }} day{{ selectedRow.daysOpen !== 1 ? 's' : '' }}
            </span>
          </div>
          <div class="drawer-field">
            <span class="drawer-field__label">Status</span>
            <StatusTag :status="selectedRow.status" />
          </div>
        </div>
      </template>
    </DetailDrawer>
  </div>
</template>

<style scoped>
.two-col-row {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 16px;
  margin-bottom: 24px;
}

.col-60, .col-40 { min-width: 0; }

.full-row { margin-bottom: 24px; }

/* Drawer content */
.drawer-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.drawer-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid var(--color-border);
  gap: 16px;
}

.drawer-field:last-child { border-bottom: none; }

.drawer-field__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.drawer-field__value {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-primary);
  text-align: right;
}
</style>
