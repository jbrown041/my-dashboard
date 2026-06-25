<script setup>
// COMP-01 — Time Range Filter (US-02, Design Doc §5.2)
import { useTimeRangeStore, TIME_RANGES, TIME_RANGE_LABELS } from '../stores/timeRange'

const timeRangeStore = useTimeRangeStore()

const options = [
  { value: TIME_RANGES.TODAY,        label: TIME_RANGE_LABELS[TIME_RANGES.TODAY] },
  { value: TIME_RANGES.LAST_7_DAYS,  label: TIME_RANGE_LABELS[TIME_RANGES.LAST_7_DAYS] },
  { value: TIME_RANGES.LAST_30_DAYS, label: TIME_RANGE_LABELS[TIME_RANGES.LAST_30_DAYS] },
  { value: TIME_RANGES.LAST_YEAR,    label: TIME_RANGE_LABELS[TIME_RANGES.LAST_YEAR] },
]
</script>

<template>
  <!-- COMP-01-T01: Segmented control (Design Doc §5.2) -->
  <div class="time-range-filter" role="group" aria-label="Time range filter">
    <button
      v-for="option in options"
      :key="option.value"
      class="segment"
      :class="{ 'segment--active': timeRangeStore.selected === option.value }"
      @click="timeRangeStore.setRange(option.value)"
      :aria-pressed="timeRangeStore.selected === option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
/* COMP-01-T01: Segmented control pill group (Design Doc §5.2) */
.time-range-filter {
  display: inline-flex;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--color-surface);
}

/* COMP-01-T04: Inactive segment base + hover 120ms */
.segment {
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  background-color: var(--color-surface);
  border: none;
  border-right: 1px solid var(--color-border);
  cursor: pointer;
  white-space: nowrap;
  /* COMP-01-T04: 120ms ease transition (Design Doc §3.7) */
  transition: background-color 120ms ease, color 120ms ease;
}

.segment:last-child {
  border-right: none;
}

.segment:hover:not(.segment--active) {
  background-color: rgba(0, 149, 169, 0.06);
  color: var(--color-text-primary);
}

/* COMP-01-T03: Active segment — teal bg, white text */
.segment--active {
  background-color: #0095a9;
  color: #ffffff;
}
</style>
