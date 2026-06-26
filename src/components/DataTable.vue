<script setup>
// COMP-03 — Reusable Data Table (Design Doc §5.4)
import { ref, computed } from 'vue'
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, PackageSearch } from 'lucide-vue-next'
import StatusTag from './StatusTag.vue'

const props = defineProps({
  // Array of column definitions: { key, label, sortable?, width?, slot? }
  columns: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
  rowsPerPage: { type: Number, default: 10 },
  loading: { type: Boolean, default: false },
  clickable: { type: Boolean, default: false },
  emptyMessage: { type: String, default: 'No data available' },
})

const emit = defineEmits(['row-click'])

// ── Sorting ──────────────────────────────────────────────────────────────────
const sortKey = ref(null)
const sortDir = ref('asc') // 'asc' | 'desc'

function toggleSort(col) {
  if (!col.sortable) return
  if (sortKey.value === col.key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = col.key
    sortDir.value = 'asc'
  }
  currentPage.value = 1
}

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows
  return [...props.rows].sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]
    if (aVal == null) return 1
    if (bVal == null) return -1
    const cmp = typeof aVal === 'string'
      ? aVal.localeCompare(bVal)
      : aVal - bVal
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

// ── Pagination ────────────────────────────────────────────────────────────────
const currentPage = ref(1)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(sortedRows.value.length / props.rowsPerPage))
)

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * props.rowsPerPage
  return sortedRows.value.slice(start, start + props.rowsPerPage)
})

function prevPage() { if (currentPage.value > 1) currentPage.value-- }
function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++ }

// ── Skeleton rows ─────────────────────────────────────────────────────────────
const skeletonRows = computed(() =>
  Array.from({ length: 5 }, (_, i) => i)
)
</script>

<template>
  <div class="data-table-wrapper">
    <!-- COMP-03-T08: Skeleton loading state -->
    <div v-if="loading" class="data-table">
      <table class="table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key" class="th">{{ col.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in skeletonRows" :key="i" class="tr">
            <td v-for="col in columns" :key="col.key" class="td">
              <div class="skeleton-cell" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- COMP-03-T07: Empty state -->
    <div v-else-if="!loading && rows.length === 0" class="empty-state">
      <PackageSearch :size="24" class="empty-state__icon" aria-hidden="true" />
      <p class="empty-state__msg">{{ emptyMessage }}</p>
      <p class="empty-state__sub">No records match the current filters.</p>
    </div>

    <!-- COMP-03-T01: Main table -->
    <div v-else class="data-table">
      <table class="table">
        <!-- COMP-03-T02: Sortable column headers -->
        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              class="th"
              :class="{ 'th--sortable': col.sortable }"
              :style="col.width ? { width: col.width } : {}"
              @click="toggleSort(col)"
            >
              <span class="th__inner">
                {{ col.label }}
                <span v-if="col.sortable" class="th__sort-icon">
                  <ChevronUp v-if="sortKey === col.key && sortDir === 'asc'" :size="12" />
                  <ChevronDown v-else-if="sortKey === col.key && sortDir === 'desc'" :size="12" />
                  <ChevronsUpDown v-else :size="12" class="th__sort-icon--inactive" />
                </span>
              </span>
            </th>
          </tr>
        </thead>

        <!-- COMP-03-T04 / T05: Row hover + clickable rows -->
        <tbody>
          <tr
            v-for="(row, idx) in paginatedRows"
            :key="idx"
            class="tr"
            :class="{ 'tr--clickable': clickable }"
            @click="clickable && emit('row-click', row)"
          >
            <td v-for="col in columns" :key="col.key" class="td">
              <!-- Status column gets StatusTag automatically -->
              <StatusTag
                v-if="col.key === 'status' && row[col.key]"
                :status="row[col.key]"
              />
              <!-- Slot for custom cell content -->
              <slot v-else-if="col.slot" :name="col.slot" :row="row" :value="row[col.key]">
                {{ row[col.key] ?? '—' }}
              </slot>
              <span v-else>{{ row[col.key] ?? '—' }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- COMP-03-T03: Pagination -->
      <div class="pagination">
        <span class="pagination__info">
          Page {{ currentPage }} of {{ totalPages }}
          <span class="pagination__total">({{ rows.length }} records)</span>
        </span>
        <div class="pagination__controls">
          <button
            class="pagination__btn"
            :disabled="currentPage === 1"
            @click="prevPage"
            aria-label="Previous page"
          >
            <ChevronLeft :size="16" />
          </button>
          <button
            class="pagination__btn"
            :disabled="currentPage === totalPages"
            @click="nextPage"
            aria-label="Next page"
          >
            <ChevronRight :size="16" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-table-wrapper {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow-x: auto;
  background-color: var(--color-surface);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

/* COMP-03 Header (Design Doc §5.4) */
.th {
  background-color: var(--color-bg);
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  user-select: none;
}

.th--sortable {
  cursor: pointer;
}

.th--sortable:hover {
  color: var(--color-text-primary);
}

.th__inner {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.th__sort-icon {
  display: flex;
  align-items: center;
  color: var(--color-text-primary);
}

.th__sort-icon--inactive {
  color: var(--color-text-secondary);
  opacity: 0.5;
}

/* COMP-03 Row (Design Doc §5.4) */
.tr {
  height: 48px;
  border-bottom: 1px solid var(--color-border);
}

.tr:last-child {
  border-bottom: none;
}

/* COMP-03-T04: Row hover 120ms ease */
.tr:hover .td {
  background-color: var(--color-bg);
}

.td {
  padding: 0 16px;
  font-size: 14px;
  color: var(--color-text-primary);
  transition: background-color 120ms ease;
}

/* COMP-03-T05: Clickable row cursor */
.tr--clickable {
  cursor: pointer;
}

/* COMP-03-T03: Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
}

.pagination__info {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.pagination__total {
  margin-left: 4px;
  opacity: 0.7;
}

.pagination__controls {
  display: flex;
  gap: 4px;
}

.pagination__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
}

.pagination__btn:hover:not(:disabled) {
  background-color: rgba(0, 149, 169, 0.08);
  border-color: #0095a9;
  color: #0095a9;
}

.pagination__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* COMP-03-T08: Skeleton shimmer */
.skeleton-cell {
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    var(--color-border) 25%,
    rgba(255, 255, 255, 0.15) 50%,
    var(--color-border) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* COMP-03-T07: Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  gap: 8px;
}

.empty-state__icon {
  color: var(--color-text-secondary);
}

.empty-state__msg {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-primary);
}

.empty-state__sub {
  font-size: 12px;
  color: var(--color-text-secondary);
}
</style>
