<script setup>
// SHIP-01-T05 — VolumeByRegionChart (FR-S04, Design Doc §5.3 Grouped Bar)
// Vertical bar chart sorted by volume descending
import { ref, computed, watch, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useTimeRangeStore } from '../../stores/timeRange'
import { fetchShipmentsByRegion } from '../../services/api'

use([BarChart, GridComponent, TooltipComponent, CanvasRenderer])

const timeRangeStore = useTimeRangeStore()
const loading = ref(true)
const error = ref(false)
const chartData = ref(null)

async function loadData() {
  loading.value = true
  error.value = false
  try {
    const raw = await fetchShipmentsByRegion(timeRangeStore.selected)
    // Sort by volume descending
    const entries = Object.entries(raw).sort((a, b) => b[1] - a[1])
    chartData.value = {
      labels: entries.map(([region]) => region),
      values: entries.map(([, v]) => v),
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
    grid: { left: 16, right: 16, top: 16, bottom: 40, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'var(--color-surface)',
      borderColor: 'var(--color-border)',
      borderWidth: 1,
      textStyle: { color: 'var(--color-text-primary)', fontSize: 12 },
      formatter: (params) => `${params[0].name}<br/><b>${params[0].value.toLocaleString()} shipments</b>`,
    },
    xAxis: {
      type: 'category',
      data: chartData.value.labels,
      axisLine: { lineStyle: { color: 'var(--color-border)' } },
      axisTick: { show: false },
      axisLabel: { color: 'var(--color-text-secondary)', fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'var(--color-border)', opacity: 0.5 } },
      axisLabel: { color: 'var(--color-text-secondary)', fontSize: 12 },
    },
    series: [
      {
        type: 'bar',
        data: chartData.value.values,
        itemStyle: { color: '#0095a9', borderRadius: [4, 4, 0, 0] },
        barMaxWidth: 64,
      },
    ],
  }
})
</script>

<template>
  <div class="chart-card">
    <div class="chart-card__header">
      <h3 class="chart-card__title">Volume by Region</h3>
      <p class="chart-card__subtitle">Shipments by region, sorted by volume</p>
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
