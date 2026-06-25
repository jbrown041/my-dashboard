<script setup>
// EXC-01-T02 through T06 — ExceptionSummaryBar (US-07, Design Doc §6.5)
// 4 category count badges with coral accents + click to filter
import { AlertTriangle } from 'lucide-vue-next'

const props = defineProps({
  summary: { type: Object, default: null },
  // { delayed, damaged, missingDocs, other }
  activeFilter: { type: String, default: null },
})

const emit = defineEmits(['filter'])

const CATEGORIES = [
  { key: 'delayed',     label: 'Delayed' },
  { key: 'damaged',     label: 'Damaged' },
  { key: 'missingDocs', label: 'Missing Documentation' },
  { key: 'other',       label: 'Other' },
]

function handleClick(key) {
  // EXC-01-T04/T06: Toggle filter; click active → clear
  emit('filter', props.activeFilter === key ? null : key)
}
</script>

<template>
  <!-- EXC-01-T02/T03: Exception category badges with coral accent -->
  <div class="summary-bar">
    <button
      v-for="cat in CATEGORIES"
      :key="cat.key"
      class="category-badge"
      :class="{ 'category-badge--active': activeFilter === cat.key }"
      @click="handleClick(cat.key)"
      :aria-pressed="activeFilter === cat.key"
      :aria-label="`Filter by ${cat.label}: ${summary?.[cat.key] ?? 0} exceptions`"
    >
      <AlertTriangle :size="16" class="category-badge__icon" aria-hidden="true" />
      <div class="category-badge__body">
        <span class="category-badge__count">{{ summary?.[cat.key]?.toLocaleString() ?? '—' }}</span>
        <span class="category-badge__label">{{ cat.label }}</span>
      </div>
    </button>

    <!-- EXC-01-T06: Clear filter -->
    <button
      v-if="activeFilter"
      class="clear-filter"
      @click="emit('filter', null)"
    >
      Clear filter ×
    </button>
  </div>
</template>

<style scoped>
.summary-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

/* EXC-01-T03: Coral accent styling (Design Doc §6.5) */
.category-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 3px solid #ea6852;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: box-shadow 120ms ease, border-color 120ms ease;
}

.category-badge:hover {
  box-shadow: 0 2px 8px rgba(1, 30, 65, 0.08);
  border-color: #ea6852;
}

/* EXC-01-T05: Active filter state */
.category-badge--active {
  background-color: rgba(234, 104, 82, 0.08);
  border-color: #ea6852;
  box-shadow: 0 0 0 2px rgba(234, 104, 82, 0.25);
}

.category-badge__icon { color: #ea6852; flex-shrink: 0; }

.category-badge__body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.category-badge__count {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1;
}

.category-badge__label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
}

.clear-filter {
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #0095a9;
  background: transparent;
  border: 1px solid #0095a9;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 120ms ease;
}

.clear-filter:hover {
  background-color: rgba(0, 149, 169, 0.06);
}
</style>
