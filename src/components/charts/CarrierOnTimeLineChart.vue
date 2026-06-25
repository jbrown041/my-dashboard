<script setup>
// CARR-01-T06 — CarrierOnTimeLineChart (FR-C02, Design Doc §5.3 Multi-Line)
// Max 5 carriers, interactive legend (click to show/hide)
import { ref, computed, watch, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useTimeRangeStore } from '../../stores/timeRange'
import { fetchCarrierOnTimeRate } from '../../services/api'
import { useChartColors } from '../../composables/useChartColors'

use([LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

// Design Doc: 5 line colors — Teal, Navy, Amber, Green, Gray
const LINE_COLORS = ['#0095a9', '#011e41', '#d4860b', '#2e7d5e', '#6b7280']

const timeRangeStore = useTimeRangeStore()
const { gridLineColor, axisLabelColor, tooltipBg, tooltipBorder, tooltipTextColor } = useChartColors()
const loading = ref(true)
const error = ref(false)
const chartData = ref(null)

async function loadData() {
  loading.value = true
  error.value = false
  try {
    chartData.value = await fetchCarrierOnTimeRate(timeRangeStore.selected)
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
  const { labels, carriers } = chartData.value
  const carrierNames = Object.keys(carriers).slice(0, 5) // max 5

  return {
    animation: true,
    animationDuration: 300,
    animationEasing: 'cubicOut',
    grid: { left: 40, right: 16, top: 16, bottom: 56, containLabel: true },
    tooltip: {
      trigger: 'axis',
      backgroundColor: tooltipBg.value,
      borderColor: gridLineColor.value,
      borderWidth: 1,
      textStyle: { color: tooltipTextColor.value, fontSize: 12 },
      formatter: (params) => {
        const header = `<b>${params[0].name}</b><br/>`
        return header + params.map((p) => `${p.marker} ${p.seriesName}: <b>${p.value}%</b>`).join('<br/>')
      },
    },
    // CARR-01-T06: Interactive legend (click to show/hide)
    legend: {
      bottom: 0,
      textStyle: { color: axisLabelColor.value, fontSize: 12 },
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      selectedMode: true, // enables click to toggle
    },
    xAxis: {
      type: 'category',
      data: labels,
      axisLine: { lineStyle: { color: gridLineColor.value } },
      axisTick: { show: false },
      axisLabel: { color: axisLabelColor.value, fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      min: 75,
      max: 100,
      splitLine: { lineStyle: { color: gridLineColor.value, opacity: 0.5 } },
      axisLabel: { color: axisLabelColor.value, fontSize: 12, formatter: '{value}%' },
    },
    series: carrierNames.map((name, i) => ({
      name,
      type: 'line',
      data: carriers[name],
      smooth: true,
      lineStyle: { color: LINE_COLORS[i], width: 2 },
      itemStyle: { color: LINE_COLORS[i] },
      showSymbol: false,
      emphasis: { scale: true, focus: 'series' },
      symbol: 'circle',
      symbolSize: 5,
    })),
  }
})
</script>

<template>
  <div class="chart-card" role="region" aria-labelledby="chart-carrier-ontime">
    <div class="chart-card__header">
      <h3 id="chart-carrier-ontime" class="chart-card__title">On-Time Rate Over Time</h3>
      <p class="chart-card__subtitle">Per carrier — click legend to show/hide</p>
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
