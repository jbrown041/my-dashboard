<script setup>
// SHELL-01 / SHELL-05-T05 — App root with layout + page transitions
import { RouterView } from 'vue-router'
import AppLayout from './components/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <!-- SHELL-05-T05: Opacity fade page transition (150ms ease, Design Doc §3.7) -->
    <RouterView v-slot="{ Component }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </Transition>
    </RouterView>
  </AppLayout>
</template>

<style>
/* SHELL-05-T05: Page transition — opacity fade 150ms ease */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 150ms ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
