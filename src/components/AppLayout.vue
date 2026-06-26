<script setup>
// SHELL-01 — Application Layout (FR-G08, Design Doc §4.1)
import AppTopBar from './AppTopBar.vue'
import AppSideNav from './AppSideNav.vue'
</script>

<template>
  <!-- v-app registers the Vuetify layout context; v-main auto-offsets for app-bar + drawer -->
  <v-app :style="{ backgroundColor: 'var(--color-bg)' }">
    <AppTopBar />
    <AppSideNav />
    <v-main :style="{ backgroundColor: 'var(--color-bg)' }">
      <div class="page-content">
        <slot />
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.page-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px;
}

@media (max-width: 1024px) {
  .page-content {
    padding: 24px;
  }
}

@media (max-width: 768px) {
  .page-content {
    padding: 16px;
  }
}
</style>
