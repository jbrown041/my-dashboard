<script setup>
// EXC-01-T07 — ExceptionsOverTimeChart (FR-E03, Design Doc §5.3 Line Chart)
// Line chart of exception volume trend — derived from exceptions dateOpened
import { ref, computed, watch, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useTimeRangeStore } from '../../stores/timeRange'
import { fetchExceptions, fetchExceptionsSummary } from '../../services/api'

use([LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const timeRangeStore = useTimeRangeStore()
const loading = ref(true)
const error = ref(false)
const chartData = ref(null)

// Build time-series exception trend from raw exceptions data
async function loadData() {
  loading.value = true
  error.value = false
  try {
    const [exceptions, summary] = await Promise.all([
      fetchExceptions(),
      fetchExceptionsSummary(timeRangeStore.selected),
    ])

    // Group by dateOpened → count per date (last 14 days)
    const counts = {}
    exceptions.forEach((e) => {
      counts[e.dateOpened] = (counts[e.dateOpened] || 0) + 1
    })

    const sorted = Object.entries(counts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-14) // last 14 dates in data

    chartData.value = {
      labels: sorted.map(([d]) => d.slice(5)), // MM-DD
      values: sorted.map(([, v]) => v),
    }
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
watch(() => timeRangeStore.selected, loadData)

const option = computed(() => {
  if (!chartData.value) return {}
  return {
    animation: true,
    animationDuration: 300,
    animationEasing: 'cubicOut',
    grid: { left: 40, right: 16, top: 16, bottom: 40, containLabel: true },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'var(--color-surface)',
      borderColor: 'var(--color-border)',
      borderWidth: 1,
      textStyle: { color: 'var(--color-text-primary)', fontSize: 12 },
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
        name: 'Exceptions',
        type: 'line',
        data: chartData.value.values,
        smooth: true,
        lineStyle: { color: '#ea6852', width: 2.5 },
        itemStyle: { color: '#ea6852' },
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 5,
        areaStyle: { color: 'rgba(234, 104, 82, 0.10)' },
      },
    ],
  }
})
</script>

<template>
  <div class="chart-card">
    <div class="chart-card__header">
      <h3 class="chart-card__title">Exceptions Over Time</h3>
      <p class="chart-card__subtitle">Daily exception volume trend</p>
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
