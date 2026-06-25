// useChartColors — reactive chart color tokens that respond to theme changes
// Import in each chart component to get theme-aware colors for ECharts options.
// Because these are Vue computed refs, any chart option computed that references
// them will automatically re-run (and ECharts will re-render) when the theme toggles.
import { computed } from 'vue'
import { useThemeStore } from '../stores/theme'

export function useChartColors() {
  const themeStore = useThemeStore()

  // Grid lines & axis lines — subtle separator, not high-contrast
  const gridLineColor = computed(() =>
    themeStore.isDark ? '#2d5075' : '#e2e8f0'
  )

  // Axis tick labels — small text, needs ≥ 4.5:1 contrast
  const axisLabelColor = computed(() =>
    themeStore.isDark ? '#9ab5cc' : '#6b7280'
  )

  // Tooltip surface
  const tooltipBg = computed(() =>
    themeStore.isDark ? '#0d1b2e' : '#ffffff'
  )

  const tooltipBorder = computed(() =>
    themeStore.isDark ? '#2d5075' : '#e2e8f0'
  )

  const tooltipTextColor = computed(() =>
    themeStore.isDark ? '#e8edf5' : '#011e41'
  )

  const tooltipSubColor = computed(() =>
    themeStore.isDark ? '#9ab5cc' : '#6b7280'
  )

  return {
    gridLineColor,
    axisLabelColor,
    tooltipBg,
    tooltipBorder,
    tooltipTextColor,
    tooltipSubColor,
  }
}
