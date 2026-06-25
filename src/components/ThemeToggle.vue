<script setup>
// SHELL-04 — Light / Dark Mode Toggle (US-10)
import { Sun, Moon } from 'lucide-vue-next'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <!-- SHELL-04-T01: Sun/Moon icon button (US-10 AC-01) -->
  <button
    @click="themeStore.toggle()"
    class="theme-toggle"
    :aria-label="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- SHELL-04-T02: Wired to useThemeStore (US-10 AC-02, AC-03) -->
    <Moon v-if="themeStore.isDark" :size="20" />
    <Sun v-else :size="20" />
  </button>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  /* SHELL-04-T04: 250ms ease transition on color (Design Doc §3.7) */
  transition: color 120ms ease, background-color 120ms ease;
}

.theme-toggle:hover {
  background-color: rgba(0, 149, 169, 0.08);
  color: var(--color-text-primary);
}
</style>
