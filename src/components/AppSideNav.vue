<script setup>
// SHELL-03 — Side Navigation (FR-G08, Design Doc §4.3)
import { useRoute } from 'vue-router'
import {
  LayoutDashboard,
  Package,
  Truck,
  MapPin,
  AlertTriangle,
} from 'lucide-vue-next'

const route = useRoute()

// SHELL-03-T01: All 5 nav items (Design Doc §4.3)
const navItems = [
  { label: 'Overview',              icon: LayoutDashboard, to: '/dashboard'  },
  { label: 'Shipments',             icon: Package,          to: '/shipments'  },
  { label: 'Carrier Performance',   icon: Truck,            to: '/carriers'   },
  { label: 'Regional Performance',  icon: MapPin,           to: '/regional'   },
  { label: 'Exceptions',            icon: AlertTriangle,    to: '/exceptions' },
]
</script>

<template>
  <!-- SHELL-03-T01: AppSideNav with 5 nav items (Design Doc §4.3) -->
  <nav class="side-nav">
    <!-- Logo area aligns with top bar height -->
    <div class="nav-logo-area">
      <span class="nav-logo-text">FF Logistics</span>
    </div>

    <!-- SHELL-03-T01 / T04: Nav items with Lucide icons -->
    <ul class="nav-list">
      <li v-for="item in navItems" :key="item.to">
        <RouterLink
          :to="item.to"
          class="nav-item"
          :class="{ 'nav-item--active': route.path === item.to }"
        >
          <!-- SHELL-03-T02: Active state detection via useRoute -->
          <component :is="item.icon" :size="20" class="nav-item__icon" />
          <span class="nav-item__label">{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* SHELL-03-T05: Nav background + text color tokens for light and dark mode */
.side-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background-color: var(--color-nav-bg);
  display: flex;
  flex-direction: column;
  z-index: 40;
}

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
}

.nav-list {
  list-style: none;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* SHELL-03-T01 / T03 / T04: Nav item base + hover (120ms ease) */
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  color: var(--color-nav-text);
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  border-left: 3px solid transparent;
  /* SHELL-03-T03: Hover background fill 120ms ease (Design Doc §3.7) */
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease;
}

.nav-item:hover {
  background-color: var(--color-nav-hover);
}

/* SHELL-03-T02: Active state — teal left border, teal text + icon */
.nav-item--active {
  border-left-color: var(--color-nav-active);
  color: var(--color-nav-active);
  font-weight: 600;
  background-color: rgba(0, 149, 169, 0.08);
}

.nav-item__icon {
  flex-shrink: 0;
}

.nav-item__label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
