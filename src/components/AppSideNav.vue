<script setup>
// SHELL-03 — Side Navigation using v-navigation-drawer (FR-G08, Design Doc §4.3)
import { useNavStore } from '../stores/nav'
import {
  LayoutDashboard,
  Package,
  Truck,
  MapPin,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next'

const navStore = useNavStore()

// SHELL-03-T01: All 5 nav items (Design Doc §4.3)
const navItems = [
  { label: 'Overview',             icon: LayoutDashboard, to: '/dashboard'  },
  { label: 'Shipments',            icon: Package,          to: '/shipments'  },
  { label: 'Carrier Performance',  icon: Truck,            to: '/carriers'   },
  { label: 'Regional Performance', icon: MapPin,           to: '/regional'   },
  { label: 'Exceptions',           icon: AlertTriangle,    to: '/exceptions' },
]
</script>

<template>
  <!--
    v-navigation-drawer with permanent + rail:
    - permanent: always visible, v-main auto-offsets its left padding
    - :rail: icon-only mode (60px) when collapsed, full (240px) when expanded
    - theme="dark": Vuetify renders white text on the dark navy background
  -->
  <v-navigation-drawer
    permanent
    :rail="navStore.isCollapsed"
    :width="240"
    :rail-width="60"
    theme="dark"
    :style="{ backgroundColor: 'var(--color-nav-bg)' }"
  >
    <!-- Logo area — height matches app-bar -->
    <div class="nav-logo-area">
      <span class="nav-logo-text">FF Logistics</span>
    </div>

    <!-- SHELL-03-T01/T04: Nav items — v-list-item hides title in rail mode automatically -->
    <v-list nav :lines="false" density="compact" class="nav-list">
      <v-list-item
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :title="item.label"
        :value="item.to"
        active-color="#0095a9"
        rounded="0"
        class="nav-list-item"
        :aria-label="item.label"
      >
        <template #prepend>
          <component :is="item.icon" :size="20" class="nav-icon" />
        </template>
      </v-list-item>
    </v-list>

    <!-- Circular edge toggle button -->
    <button
      class="nav-rail-toggle"
      @click="navStore.toggle()"
      :aria-label="navStore.isCollapsed ? 'Expand navigation' : 'Collapse navigation'"
      :title="navStore.isCollapsed ? 'Expand navigation' : 'Collapse navigation'"
    >
      <ChevronRight v-if="navStore.isCollapsed" :size="14" />
      <ChevronLeft v-else :size="14" />
    </button>
  </v-navigation-drawer>
</template>

<style scoped>
/* Logo area — aligns with top bar height */
.nav-logo-area {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.nav-logo-text {
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
}

/* Nav list padding */
.nav-list {
  padding: 8px 0 !important;
}

/* Nav item base styles */
.nav-list-item {
  border-left: 3px solid transparent !important;
  transition: border-color 120ms ease !important;
  margin: 2px 0 !important;
}

/* Active: teal left border */
:deep(.nav-list-item.v-list-item--active) {
  border-left-color: #0095a9 !important;
  background-color: rgba(0, 149, 169, 0.12) !important;
}

/* Icon spacing */
.nav-icon {
  flex-shrink: 0;
  margin-right: 0;
}

/* Circular edge toggle button */
.nav-rail-toggle {
  position: absolute;
  right: -14px;
  top: 80px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: background-color 150ms ease, color 150ms ease, box-shadow 150ms ease;
  z-index: 41;
}

.nav-rail-toggle:hover {
  background-color: var(--color-bg);
  color: #0095a9;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.nav-rail-toggle:focus-visible {
  outline: 2px solid #0095a9;
  outline-offset: 2px;
}
</style>
