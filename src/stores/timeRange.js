import { defineStore } from 'pinia'

// DS-03-T02 — Global time range state (US-02, AC-04)
export const TIME_RANGES = {
  TODAY: 'today',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  LAST_YEAR: 'last_year',
}

export const TIME_RANGE_LABELS = {
  [TIME_RANGES.TODAY]: 'Today',
  [TIME_RANGES.LAST_7_DAYS]: 'Last 7 Days',
  [TIME_RANGES.LAST_30_DAYS]: 'Last 30 Days',
  [TIME_RANGES.LAST_YEAR]: 'Last Year',
}

export const useTimeRangeStore = defineStore('timeRange', {
  state: () => ({
    selected: TIME_RANGES.LAST_30_DAYS,
  }),
  actions: {
    setRange(range) {
      if (Object.values(TIME_RANGES).includes(range)) {
        this.selected = range
      }
    },
  },
  getters: {
    label: (state) => TIME_RANGE_LABELS[state.selected],
  },
})
