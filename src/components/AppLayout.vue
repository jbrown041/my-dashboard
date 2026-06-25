<script setup>
// SHELL-01 — Application Layout (FR-G08, Design Doc §4.1)
import AppTopBar from './AppTopBar.vue'
import AppSideNav from './AppSideNav.vue'
</script>

<template>
  <!-- SHELL-01-T01: Fixed top bar + fixed side nav + scrollable main content slot -->
  <div class="app-shell">
    <!-- SHELL-01-T02: Top bar 64px fixed -->
    <AppTopBar />

    <!-- SHELL-01-T02: Side nav 240px fixed -->
    <AppSideNav />

    <!-- SHELL-01-T01 / T04: Scrollable main content area with 32px padding -->
    <main class="main-content">
      <!-- SHELL-01-T03: Max content width 1440px centered -->
      <div class="main-content__inner">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background-color: var(--color-bg);
}

/* SHELL-01-T02 / T05: Main content offset — top bar 64px, side nav 240px */
.main-content {
  margin-left: 240px;
  margin-top: 64px;
  min-height: calc(100vh - 64px);
  overflow-y: auto;
  /* SHELL-01-T04: 32px padding all sides */
  padding: 32px;
}

/* SHELL-01-T03: Max 1440px, centered */
.main-content__inner {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
