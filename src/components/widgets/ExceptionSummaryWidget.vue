<script setup>
// OVR-01-T07 — ExceptionSummaryWidget (FR-O06)
// Category counts with coral accents + "View All →" link
import { ref, watch, onMounted } from 'vue'
import { ArrowRight, AlertTriangle } from 'lucide-vue-next'
import { useTimeRangeStore } from '../../stores/timeRange'
import { fetchExceptionsSummary } from '../../services/api'

const timeRangeStore = useTimeRangeStore()
const loading = ref(true)
const error = ref(false)
const summary = ref(null)

async function loadData() {
  loading.value = true
  error.value = false
  try {
    summary.value = await fetchExceptionsSummary(timeRangeStore.selected)
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
watch(() => timeRangeStore.selected, loadData)

const categories = [
  { key: 'delayed',     label: 'Delayed' },
  { key: 'damaged',     label: 'Damaged' },
  { key: 'missingDocs', label: 'Missing Docs' },
  { key: 'other',       label: 'Other' },
]

function total(s) {
  if (!s) return 0
  return Object.values(s).reduce((a, b) => a + b, 0)
}
</script>

<template>
  <div class="widget-card">
    <div class="widget-card__header">
      <h3 class="widget-card__title">Exception Summary</h3>
      <RouterLink to="/exceptions" class="widget-card__link">
        View All
        <ArrowRight :size="14" aria-hidden="true" />
      </RouterLink>
    </div>

    <!-- Skeleton -->
    <div v-if="loading" class="widget-skeleton">
      <div v-for="i in 4" :key="i" class="skeleton-row" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="widget-error">Unable to load exception data</div>

    <!-- Summary content -->
    <template v-else-if="summary">
      <!-- Total badge -->
      <div class="exception-total">
        <AlertTriangle :size="20" class="exception-total__icon" aria-hidden="true" />
        <span class="exception-total__num">{{ total(summary).toLocaleString() }}</span>
        <span class="exception-total__label">total open exceptions</span>
      </div>

      <!-- Category rows -->
      <ul class="category-list">
        <li
          v-for="cat in categories"
          :key="cat.key"
          class="category-row"
        >
          <span class="category-row__label">{{ cat.label }}</span>
          <div class="category-row__right">
            <!-- Mini bar -->
            <div class="category-row__bar-track">
              <div
                class="category-row__bar-fill"
                :style="{ width: `${Math.round((summary[cat.key] / total(summary)) * 100)}%` }"
              />
            </div>
            <span class="category-row__count">{{ summary[cat.key].toLocaleString() }}</span>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.widget-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.widget-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.widget-card__title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--color-text-primary);
}

.widget-card__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #0095a9;
  text-decoration: none;
  transition: opacity 120ms ease;
}

.widget-card__link:hover { opacity: 0.75; }

/* Total exception badge */
.exception-total {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: rgba(234, 104, 82, 0.08);
  border: 1px solid rgba(234, 104, 82, 0.20);
  border-radius: 8px;
}

.exception-total__icon { color: #ea6852; flex-shrink: 0; }
.exception-total__num {
  font-size: 24px;
  font-weight: 700;
  color: #ea6852;
}
.exception-total__label {
  font-size: 13px;
  color: var(--color-text-secondary);
}

/* Category rows */
.category-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.category-row__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  width: 96px;
  flex-shrink: 0;
}

.category-row__right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.category-row__bar-track {
  flex: 1;
  height: 6px;
  background-color: var(--color-border);
  border-radius: 3px;
  overflow: hidden;
}

.category-row__bar-fill {
  height: 100%;
  background-color: #ea6852;
  border-radius: 3px;
  transition: width 300ms ease;
}

.category-row__count {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  width: 36px;
  text-align: right;
  flex-shrink: 0;
}

/* Skeleton */
.widget-skeleton {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-row {
  height: 28px;
  border-radius: 4px;
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

.widget-error {
  color: #ea6852;
  font-size: 14px;
  padding: 16px 0;
}
</style>
