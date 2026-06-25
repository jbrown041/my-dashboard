<script setup>
// SHIP-01-T04 — ShipmentsByStatusChart (US-04, Design Doc §5.3 Stacked Bar)
// Horizontal stacked bar: In Transit · Delivered · Delayed · Exception
import { ref, computed, watch, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useTimeRangeStore } from '../../stores/timeRange'
import { fetchShipmentsByStatus } from '../../services/api'

use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const timeRangeStore = useTimeRangeStore()
const loading = ref(true)
const error = ref(false)
const data = ref(null)

async function loadData() {
  loading.value = true
  error.value = false
  try {
    data.value = await fetchShipmentsByStatus(timeRangeStore.selected)
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
watch(() => timeRangeStore.selected, loadData)

const option = computed(() => {
  if (!data.value) return {}
  const d = data.value
  return {
    animation: true,
    animationDuration: 300,
    animationEasing: 'cubicOut',
    grid: { left: 16, right: 60, top: 16, bottom: 16, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'var(--color-surface)',
      borderColor: 'var(--color-border)',
      borderWidth: 1,
      textStyle: { color: 'var(--color-text-primary)', fontSize: 12 },
    },
    legend: {
      bottom: 0,
      textStyle: { color: 'var(--color-text-secondary)', fontSize: 12 },
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
    },
    xAxis: { type: 'value', axisLabel: { color: 'var(--color-text-secondary)', fontSize: 12 }, splitLine: { lineStyle: { color: 'var(--color-border)', opacity: 0.5 } } },
    yAxis: { type: 'category', data: ['Shipments'], axisLabel: { show: false }, axisTick: { show: false }, axisLine: { show: false } },
    series: [
      {
        name: 'In Transit',
        type: 'bar',
        stack: 'total',
        data: [d.inTransit],
        itemStyle: { color: '#0095a9', borderRadius: [0, 0, 0, 0] },
        barMaxWidth: 48,
      },
      {
        name: 'Delivered',
        type: 'bar',
        stack: 'total',
        data: [d.delivered],
        itemStyle: { color: '#2e7d5e' },
        barMaxWidth: 48,
      },
      {
        name: 'Delayed',
        type: 'bar',
        stack: 'total',
        data: [d.delayed],
        itemStyle: { color: '#d4860b' },
        barMaxWidth: 48,
      },
      {
        name: 'Exception',
        type: 'bar',
        stack: 'total',
        data: [d.exception],
        itemStyle: { color: '#ea6852', borderRadius: [0, 4, 4, 0] },
        barMaxWidth: 48,
      },
    ],
  }
})
</script>

<template>
  <div class="chart-card">
    <div class="chart-card__header">
      <h3 class="chart-card__title">Shipments by Status</h3>
      <p class="chart-card__subtitle">Distribution across all status categories</p>
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
.chart-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.chart-card__header { display: flex; flex-direction: column; gap: 2px; }
.chart-card__title { font-size: 16px; font-weight: 600; line-height: 24px; color: var(--color-text-primary); }
.chart-card__subtitle { font-size: 12px; color: var(--color-text-secondary); }
.chart { height: 280px; min-height: 280px; }
.chart-skeleton {
  height: 280px; border-radius: 4px;
  background: linear-gradient(90deg, var(--color-border) 25%, rgba(255,255,255,0.12) 50%, var(--color-border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.chart-error { height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: #ea6852; font-size: 14px; }
.chart-error__sub { font-size: 12px; color: var(--color-text-secondary); }
</style>
