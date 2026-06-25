import { defineStore } from 'pinia'

// DS-03-T03 — Light/dark mode state (US-10, AC-02)
export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
  }),
  actions: {
    toggle() {
      this.isDark = !this.isDark
      this._applyToDOM()
    },
    _applyToDOM() {
      if (this.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
  },
})
