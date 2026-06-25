<script setup>
// OVR-01-T05 — OnTimeRateChart (FR-O04, Design Doc §5.3)
// Area chart with dashed target threshold line (90% target)
import { ref, computed, watch, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useTimeRangeStore } from '../../stores/timeRange'
import { fetchCarrierOnTimeRate } from '../../services/api'

use([LineChart, GridComponent, TooltipComponent, LegendComponent, MarkLineComponent, CanvasRenderer])

const TARGET_THRESHOLD = 90 // 90% on-time rate target

const timeRangeStore = useTimeRangeStore()
const loading = ref(true)
const error = ref(false)
const chartData = ref(null)

// Compute aggregate average on-time rate from carrier data
function aggregateFromCarriers(data) {
  const labels = data.labels
  const carrierArrays = Object.values(data.carriers)
  const averages = labels.map((_, i) => {
    const sum = carrierArrays.reduce((acc, arr) => acc + arr[i], 0)
    return parseFloat((sum / carrierArrays.length).toFixed(1))
  })
  return { labels, values: averages }
}

async function loadData() {
  loading.value = true
  error.value = false
  try {
    const raw = await fetchCarrierOnTimeRate(timeRangeStore.selected)
    chartData.value = aggregateFromCarriers(raw)
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
      formatter: (params) => {
        const p = params[0]
        return `${p.name}<br/><b>${p.value}%</b>`
      },
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
      data: chartData.value.labels,
      axisLine: { lineStyle: { color: 'var(--color-border)' } },
      axisTick: { show: false },
      axisLabel: { color: 'var(--color-text-secondary)', fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      min: 75,
      max: 100,
      splitLine: { lineStyle: { color: 'var(--color-border)', opacity: 0.5 } },
      axisLabel: {
        color: 'var(--color-text-secondary)',
        fontSize: 12,
        formatter: '{value}%',
      },
    },
    series: [
      {
        name: 'On-Time Rate',
        type: 'line',
        data: chartData.value.values,
        smooth: true,
        lineStyle: { color: '#0095a9', width: 2.5 },
        itemStyle: { color: '#0095a9' },
        showSymbol: false,
        emphasis: { scale: true, focus: 'series' },
        symbol: 'circle',
        symbolSize: 5,
        areaStyle: { color: 'rgba(0, 149, 169, 0.10)' },
        // Dashed target threshold line (FR-O04)
        markLine: {
          silent: true,
          symbol: 'none',
          data: [{ yAxis: TARGET_THRESHOLD }],
          lineStyle: { color: '#d4860b', type: 'dashed', width: 1.5 },
          label: {
            formatter: `Target ${TARGET_THRESHOLD}%`,
            color: '#d4860b',
            fontSize: 11,
            position: 'insideEndTop',
          },
        },
      },
    ],
  }
})
</script>

<template>
  <div class="chart-card" role="region" aria-labelledby="chart-ontime-rate">
    <div class="chart-card__header">
      <h3 id="chart-ontime-rate" class="chart-card__title">On-Time Delivery Rate</h3>
      <p class="chart-card__subtitle">Fleet average vs. 90% target</p>
    </div>

    <div v-if="loading" class="chart-skeleton" aria-busy="true" aria-label="Loading chart" />

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

.chart-card__header {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.chart-card__title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--color-text-primary);
}

.chart-card__subtitle {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.chart { height: 280px; min-height: 280px; }

.chart-skeleton {
  height: 280px;
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

.chart-error {
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #ea6852;
  font-size: 14px;
}

.chart-error__sub { font-size: 12px; color: var(--color-text-secondary); }
</style>
