<script setup>
// COMP-04 — Detail Drawer (US-08, Design Doc §5.5)
import { X } from 'lucide-vue-next'

defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <!-- COMP-04-T04: Semi-transparent backdrop -->
    <Transition name="drawer-backdrop">
      <div
        v-if="open"
        class="drawer-backdrop"
        @click="emit('close')"
        aria-hidden="true"
      />
    </Transition>

    <!-- COMP-04-T01: Drawer panel with header + body slots -->
    <Transition name="drawer">
      <div
        v-if="open"
        class="drawer"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <!-- Drawer header -->
        <div class="drawer__header">
          <div class="drawer__header-text">
            <h2 class="drawer__title">{{ title }}</h2>
            <p v-if="subtitle" class="drawer__subtitle">{{ subtitle }}</p>
          </div>
          <!-- COMP-04-T06: Close button (X icon, top right) -->
          <button
            class="drawer__close"
            @click="emit('close')"
            aria-label="Close drawer"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- Drawer body -->
        <div class="drawer__body">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* COMP-04-T04: Backdrop overlay (#011e41 at 30% opacity, Design Doc §5.5) */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  top: 64px;
  background-color: rgba(1, 30, 65, 0.3);
  z-index: 60;
}

/* COMP-04-T01: Drawer panel (Design Doc §5.5) */
.drawer {
  position: fixed;
  top: 64px;
  right: 0;
  width: 480px;
  height: calc(100vh - 64px);
  background-color: var(--color-surface);
  border-left: 1px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(1, 30, 65, 0.12);
  z-index: 70;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.drawer__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 24px;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.drawer__header-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.drawer__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: var(--color-text-primary);
}

.drawer__subtitle {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--color-text-secondary);
}

.drawer__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  flex-shrink: 0;
  transition: color 120ms ease, background-color 120ms ease;
}

.drawer__close:hover {
  color: var(--color-text-primary);
  background-color: rgba(0, 149, 169, 0.08);
}

.drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

/* COMP-04-T02 / T03: Slide-in/out animations (Design Doc §3.7) */
.drawer-enter-active {
  transition: transform 250ms ease-out;
}
.drawer-leave-active {
  transition: transform 200ms ease-in;
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

/* Backdrop fade */
.drawer-backdrop-enter-active,
.drawer-backdrop-leave-active {
  transition: opacity 200ms ease;
}
.drawer-backdrop-enter-from,
.drawer-backdrop-leave-to {
  opacity: 0;
}
</style>
