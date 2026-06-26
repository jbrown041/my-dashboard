<script setup>
// COMP-02 — KPI Summary Card (US-01, Design Doc §5.1)
import { computed } from 'vue'
import { TrendingUp, TrendingDown, Minus } from 'lucide-vue-next'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  delta: { type: Number, default: null },
  deltaDirection: { type: String, default: 'neutral' }, // 'up' | 'down' | 'neutral'
  icon: { type: Object, default: null }, // Lucide icon component
  formatValue: { type: Function, default: null },
})

// COMP-02-T02: Delta indicator logic
const deltaIcon = computed(() => {
  if (props.deltaDirection === 'up') return TrendingUp
  if (props.deltaDirection === 'down') return TrendingDown
  return Minus
})

const deltaClass = computed(() => {
  if (props.deltaDirection === 'up') return 'kpi-card__delta--positive'
  if (props.deltaDirection === 'down') return 'kpi-card__delta--negative'
  return 'kpi-card__delta--neutral'
})

const formattedValue = computed(() => {
  if (props.formatValue) return props.formatValue(props.value)
  if (typeof props.value === 'number') {
    return props.value.toLocaleString()
  }
  return props.value
})

const deltaSign = computed(() => {
  if (props.delta === null || props.delta === 0) return ''
  return props.delta > 0 ? '+' : ''
})
</script>

<template>
  <!-- COMP-02-T01 / T03: KPI card (Design Doc §5.1) -->
  <div class="kpi-card">
    <div class="kpi-card__header">
      <!-- COMP-02-T01: Icon -->
      <component
        v-if="icon"
        :is="icon"
        :size="20"
        class="kpi-card__icon"
        aria-hidden="true"
      />
      <span class="kpi-card__label">{{ label }}</span>
    </div>

    <!-- COMP-02-T01: Value -->
    <div class="kpi-card__value">{{ formattedValue }}</div>

    <!-- COMP-02-T02: Delta indicator -->
    <div v-if="delta !== null" class="kpi-card__delta" :class="deltaClass">
      <component :is="deltaIcon" :size="12" aria-hidden="true" />
      <span>{{ deltaSign }}{{ delta }}% vs prior period</span>
    </div>
  </div>
</template>

<style scoped>
/* COMP-02-T03: Card styles (Design Doc §5.1) */
.kpi-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  /* COMP-02-T04: Hover transition 150ms ease */
  transition: box-shadow 150ms ease, transform 150ms ease;
  cursor: default;
}

/* COMP-02-T04: Hover state — raised shadow + translateY(-2px) */
.kpi-card:hover {
  box-shadow: 0 2px 8px rgba(1, 30, 65, 0.08);
  transform: translateY(-2px);
}

.kpi-card__header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.kpi-card__icon {
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

/* Label: 12px SemiBold, secondary, all caps */
.kpi-card__label {
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Value: 32px Bold, primary */
.kpi-card__value {
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  color: var(--color-text-primary);
}

/* Delta: 12px SemiBold */
.kpi-card__delta {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
}

/* COMP-02-T02: Delta color states */
.kpi-card__delta--positive { color: #2e7d5e; }
.kpi-card__delta--negative { color: #ea6852; }
.kpi-card__delta--neutral  { color: #6b7280; }
</style>
