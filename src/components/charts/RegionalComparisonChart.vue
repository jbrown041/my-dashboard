<script setup>
// REG-01-T09 — RegionalComparisonChart (FR-R05, Design Doc §5.3 Grouped Bar)
// Grouped bar: on-time rate + volume per region
import { ref, computed, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { fetchRegional } from '../../services/api'
import { useChartColors } from '../../composables/useChartColors'

use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const { gridLineColor, axisLabelColor, tooltipBg, tooltipBorder, tooltipTextColor } = useChartColors()
const loading = ref(true)
const error = ref(false)
const regions = ref([])

onMounted(async () => {
  try {
    regions.value = await fetchRegional()
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

const option = computed(() => {
  if (!regions.value.length) return {}
  const names = regions.value.map((r) => r.id)
  return {
    animation: true,
    animationDuration: 300,
    animationEasing: 'cubicOut',
    grid: { left: 16, right: 60, top: 16, bottom: 56, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: tooltipBg.value,
      borderColor: gridLineColor.value,
      borderWidth: 1,
      textStyle: { color: tooltipTextColor.value, fontSize: 12 },
    },
    legend: {
      bottom: 0,
      textStyle: { color: axisLabelColor.value, fontSize: 12 },
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
    },
    xAxis: {
      type: 'category',
      data: names,
      axisLine: { lineStyle: { color: gridLineColor.value } },
      axisTick: { show: false },
      axisLabel: { color: axisLabelColor.value, fontSize: 11 },
    },
    yAxis: [
      {
        type: 'value',
        name: 'On-Time %',
        min: 70, max: 100,
        splitLine: { lineStyle: { color: gridLineColor.value, opacity: 0.5 } },
        axisLabel: { color: axisLabelColor.value, fontSize: 11, formatter: '{value}%' },
      },
      {
        type: 'value',
        name: 'Volume',
        splitLine: { show: false },
        axisLabel: { color: axisLabelColor.value, fontSize: 11 },
      },
    ],
    series: [
      {
        name: 'On-Time Rate',
        type: 'bar',
        yAxisIndex: 0,
        data: regions.value.map((r) => r.onTimeRate),
        itemStyle: { color: '#0095a9', borderRadius: [4, 4, 0, 0] },
        barMaxWidth: 28,
      },
      {
        name: 'Shipment Volume',
        type: 'bar',
        yAxisIndex: 1,
        data: regions.value.map((r) => r.shipmentVolume),
        itemStyle: { color: '#011e41', borderRadius: [4, 4, 0, 0] },
        barMaxWidth: 28,
      },
    ],
  }
})
</script>

<template>
  <div class="chart-card" role="region" aria-labelledby="chart-regional-comparison">
    <div class="chart-card__header">
      <h3 id="chart-regional-comparison" class="chart-card__title">Regional Comparison</h3>
      <p class="chart-card__subtitle">On-time rate and volume by region</p>
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
