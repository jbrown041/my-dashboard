<script setup>
// EXC-01-T08 — ExceptionsByRegionChart (FR-E04, Design Doc §5.3)
// Bar chart of exceptions per region, derived from exceptions.json
import { ref, computed, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { fetchRegional } from '../../services/api'

use([BarChart, GridComponent, TooltipComponent, CanvasRenderer])

const loading = ref(true)
const error = ref(false)
const chartData = ref(null)

onMounted(async () => {
  try {
    const regions = await fetchRegional()
    // Sort by openExceptions descending
    const sorted = [...regions].sort((a, b) => b.openExceptions - a.openExceptions)
    chartData.value = {
      labels: sorted.map((r) => r.id),
      values: sorted.map((r) => r.openExceptions),
    }
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

const option = computed(() => {
  if (!chartData.value) return {}
  return {
    animation: true,
    animationDuration: 300,
    animationEasing: 'cubicOut',
    grid: { left: 16, right: 16, top: 16, bottom: 40, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'var(--color-surface)',
      borderColor: 'var(--color-border)',
      borderWidth: 1,
      textStyle: { color: 'var(--color-text-primary)', fontSize: 12 },
      formatter: (p) => `${p[0].name}<br/><b>${p[0].value} exceptions</b>`,
    },
    xAxis: {
      type: 'category',
      data: chartData.value.labels,
      axisLine: { lineStyle: { color: 'var(--color-border)' } },
      axisTick: { show: false },
      axisLabel: { color: 'var(--color-text-secondary)', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      splitLine: { lineStyle: { color: 'var(--color-border)', opacity: 0.5 } },
      axisLabel: { color: 'var(--color-text-secondary)', fontSize: 11 },
    },
    series: [
      {
        type: 'bar',
        data: chartData.value.values.map((v, i) => ({
          value: v,
          itemStyle: { color: i === 0 ? '#ea6852' : '#d4860b', borderRadius: [4, 4, 0, 0] },
        })),
        barMaxWidth: 56,
      },
    ],
  }
})
</script>

<template>
  <div class="chart-card">
    <div class="chart-card__header">
      <h3 class="chart-card__title">Exceptions by Region</h3>
      <p class="chart-card__subtitle">Open exceptions sorted by count</p>
    </div>
    <div v-if="loading" class="chart-skeleton" aria-busy="true" />
    <div v-else-if="error" class="chart-error">
      <span>Unable to load data</span>
      <span class="chart-error__sub">Try refreshing the page</span>
    </div>
    <VChart v-else class="chart" :option="option" autoresize />
  </div>
</template>

<style scoped>
.chart-card { background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
.chart-card__header { display: flex; flex-direction: column; gap: 2px; }
.chart-card__title { font-size: 16px; font-weight: 600; line-height: 24px; color: var(--color-text-primary); }
.chart-card__subtitle { font-size: 12px; color: var(--color-text-secondary); }
.chart { height: 280px; min-height: 280px; }
.chart-skeleton { height: 280px; border-radius: 4px; background: linear-gradient(90deg, var(--color-border) 25%, rgba(255,255,255,0.12) 50%, var(--color-border) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.chart-error { height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: #ea6852; font-size: 14px; }
.chart-error__sub { font-size: 12px; color: var(--color-text-secondary); }
</style>
