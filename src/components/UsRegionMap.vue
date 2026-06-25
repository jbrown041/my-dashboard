<script setup>
// REG-01-T02 through T05 — UsRegionMap (US-06, Design Doc §5.3 Choropleth)
// D3.js choropleth — 5 U.S. regions colored by performance score
import { ref, onMounted, watch } from 'vue'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import usAtlas from 'us-atlas/states-10m.json'

const props = defineProps({
  regions: { type: Array, default: () => [] },
  // [{ id, performanceScore, shipmentVolume, onTimeRate, openExceptions, topCarrier }]
})

const emit = defineEmits(['region-click'])

// FIPS state code → region name
const STATE_TO_REGION = {
  // Northeast
  23:'Northeast',33:'Northeast',50:'Northeast',25:'Northeast',44:'Northeast',
  9:'Northeast',36:'Northeast',34:'Northeast',42:'Northeast',24:'Northeast',10:'Northeast',11:'Northeast',
  // Southeast
  51:'Southeast',54:'Southeast',37:'Southeast',45:'Southeast',13:'Southeast',
  12:'Southeast',1:'Southeast',28:'Southeast',47:'Southeast',21:'Southeast',5:'Southeast',
  // Midwest
  39:'Midwest',18:'Midwest',26:'Midwest',55:'Midwest',27:'Midwest',
  19:'Midwest',17:'Midwest',29:'Midwest',38:'Midwest',46:'Midwest',31:'Midwest',20:'Midwest',
  // Southwest
  48:'Southwest',40:'Southwest',35:'Southwest',4:'Southwest',22:'Southwest',
  // West
  6:'West',41:'West',53:'West',32:'West',49:'West',8:'West',
  16:'West',30:'West',56:'West',2:'West',15:'West',
}

// Performance score → color (Design Doc §5.3)
function regionColor(score) {
  if (score == null) return 'var(--color-border)'
  if (score >= 85) return '#2e7d5e'
  if (score >= 75) return '#d4860b'
  return '#ea6852'
}

const svgRef = ref(null)
const tooltip = ref({ visible: false, x: 0, y: 0, region: null })

function getRegionData(regionName) {
  return props.regions.find((r) => r.id === regionName) ?? null
}

function buildMap() {
  if (!svgRef.value) return

  const container = svgRef.value.parentElement
  const width = container.clientWidth || 800
  const height = 420

  d3.select(svgRef.value).selectAll('*').remove()

  const svg = d3.select(svgRef.value)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)

  const projection = d3.geoAlbersUsa()
    .fitSize([width, height], topojson.feature(usAtlas, usAtlas.objects.states))

  const path = d3.geoPath().projection(projection)
  const states = topojson.feature(usAtlas, usAtlas.objects.states)

  // Group state features by region, compute aggregate fill
  const regionPerf = {}
  props.regions.forEach((r) => { regionPerf[r.id] = r })

  svg.selectAll('path')
    .data(states.features)
    .join('path')
    .attr('d', path)
    .attr('fill', (d) => {
      const regionName = STATE_TO_REGION[+d.id]
      const perf = regionName ? regionPerf[regionName] : null
      return regionColor(perf?.performanceScore ?? null)
    })
    .attr('stroke', 'var(--color-surface)')
    .attr('stroke-width', 1.5)
    .style('cursor', 'pointer')
    // CARR-01-T04: Hover — brighten + show tooltip
    .on('mousemove', function (event, d) {
      const regionName = STATE_TO_REGION[+d.id]
      const perf = regionName ? regionPerf[regionName] : null
      if (!regionName) return
      const [mx, my] = d3.pointer(event, svgRef.value.parentElement)
      tooltip.value = { visible: true, x: mx + 12, y: my - 8, region: perf, regionName }
      d3.select(this).attr('opacity', 0.75)
    })
    .on('mouseleave', function () {
      tooltip.value = { ...tooltip.value, visible: false }
      d3.select(this).attr('opacity', 1)
    })
    // REG-01-T10: Click → emit region for DetailDrawer
    .on('click', (event, d) => {
      const regionName = STATE_TO_REGION[+d.id]
      const perf = regionName ? regionPerf[regionName] : null
      if (perf) emit('region-click', perf)
    })

  // State borders mesh (subtle inner borders)
  svg.append('path')
    .datum(topojson.mesh(usAtlas, usAtlas.objects.states, (a, b) => a !== b))
    .attr('fill', 'none')
    .attr('stroke', 'var(--color-surface)')
    .attr('stroke-width', 0.5)
    .attr('d', path)
}

onMounted(buildMap)
watch(() => props.regions, buildMap, { deep: true })
</script>

<template>
  <!-- REG-01-T02 through T05 — Choropleth map -->
  <div class="map-wrapper">
    <div class="map-container" style="position: relative;">
      <svg ref="svgRef" class="map-svg" aria-label="U.S. regional performance map" role="img" />

      <!-- REG-01-T04: Hover tooltip -->
      <div
        v-if="tooltip.visible && tooltip.region"
        class="map-tooltip"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      >
        <p class="map-tooltip__name">{{ tooltip.regionName }}</p>
        <p class="map-tooltip__row">Volume: <strong>{{ tooltip.region.shipmentVolume?.toLocaleString() }}</strong></p>
        <p class="map-tooltip__row">On-Time: <strong>{{ tooltip.region.onTimeRate }}%</strong></p>
        <p class="map-tooltip__row">Exceptions: <strong>{{ tooltip.region.openExceptions }}</strong></p>
      </div>

      <!-- REG-01-T05: No data state -->
      <div v-if="!tooltip.visible && regions.length === 0" class="map-nodata">
        No regional data available
      </div>
    </div>

    <!-- Legend -->
    <div class="map-legend">
      <span class="legend-item"><span class="legend-dot" style="background:#2e7d5e" />Score ≥ 85</span>
      <span class="legend-item"><span class="legend-dot" style="background:#d4860b" />Score 75–84</span>
      <span class="legend-item"><span class="legend-dot" style="background:#ea6852" />Score &lt; 75</span>
    </div>
  </div>
</template>

<style scoped>
.map-wrapper {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.map-container {
  width: 100%;
  height: 420px;
  overflow: hidden;
}

.map-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* REG-01-T04: Tooltip (Design Doc §5.3) */
.map-tooltip {
  position: absolute;
  pointer-events: none;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(1,30,65,0.12);
  padding: 10px 14px;
  min-width: 160px;
  z-index: 10;
}

.map-tooltip__name {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}

.map-tooltip__row {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 18px;
}

.map-tooltip__row strong {
  color: var(--color-text-primary);
  font-weight: 600;
}

.map-nodata {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.map-legend {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
