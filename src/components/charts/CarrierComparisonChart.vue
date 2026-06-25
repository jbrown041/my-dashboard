<script setup>
// CARR-01-T05 — CarrierComparisonChart (US-05 AC-01, FR-C02, Design Doc §5.3 Grouped Bar)
// Grouped bar: On-Time Rate, Volume, Incidents per carrier
import { ref, computed, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { fetchCarriers } from '../../services/api'

use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const loading = ref(true)
const error = ref(false)
const carriers = ref([])

onMounted(async () => {
  try {
    carriers.value = await fetchCarriers()
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

const option = computed(() => {
  if (!carriers.value.length) return {}
  const names = carriers.value.map((c) => c.name)
  return {
    animation: true,
    animationDuration: 300,
    animationEasing: 'cubicOut',
    grid: { left: 16, right: 16, top: 16, bottom: 56, containLabel: true },
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
    xAxis: {
      type: 'category',
      data: names,
      axisLine: { lineStyle: { color: 'var(--color-border)' } },
      axisTick: { show: false },
      axisLabel: { color: 'var(--color-text-secondary)', fontSize: 11, interval: 0 },
    },
    yAxis: [
      {
        type: 'value',
        name: 'On-Time %',
        min: 70,
        max: 100,
        splitLine: { lineStyle: { color: 'var(--color-border)', opacity: 0.5 } },
        axisLabel: { color: 'var(--color-text-secondary)', fontSize: 11, formatter: '{value}%' },
      },
      {
        type: 'value',
        name: 'Count',
        splitLine: { show: false },
        axisLabel: { color: 'var(--color-text-secondary)', fontSize: 11 },
      },
    ],
    series: [
      {
        name: 'On-Time Rate',
        type: 'bar',
        yAxisIndex: 0,
        data: carriers.value.map((c) => c.onTimeRate),
        itemStyle: { color: '#0095a9', borderRadius: [4, 4, 0, 0] },
        barGap: '4px',
        barMaxWidth: 24,
      },
      {
        name: 'Incidents',
        type: 'bar',
        yAxisIndex: 1,
        data: carriers.value.map((c) => c.incidentCount),
        itemStyle: { color: '#ea6852', borderRadius: [4, 4, 0, 0] },
        barMaxWidth: 24,
      },
    ],
  }
})
</script>

<template>
  <div class="chart-card">
    <div class="chart-card__header">
      <h3 class="chart-card__title">Carrier Comparison</h3>
      <p class="chart-card__subtitle">On-time rate and incidents per carrier</p>
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
