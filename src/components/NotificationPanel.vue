<script setup>
// COMP-06-T03 — NotificationPanel (US-09 AC-02, Design Doc §5.6)
import { Bell } from 'lucide-vue-next'
import { useNotificationStore } from '../stores/notifications'
import NotificationItem from './NotificationItem.vue'

defineProps({
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])
const store = useNotificationStore()
</script>

<template>
  <Teleport to="body">
    <!-- Click outside backdrop -->
    <div
      v-if="open"
      class="notif-backdrop"
      @click="emit('close')"
      aria-hidden="true"
    />

    <!-- COMP-06-T03: Slide-in panel (Design Doc §5.6) -->
    <Transition name="notif-panel">
      <div
        v-if="open"
        class="notif-panel"
        role="dialog"
        aria-label="Notifications"
      >
        <!-- Panel header -->
        <div class="notif-panel__header">
          <div class="notif-panel__header-left">
            <Bell :size="20" aria-hidden="true" />
            <h2 class="notif-panel__title">Notifications</h2>
          </div>
          <!-- COMP-06-T05: Mark all as read -->
          <button
            class="notif-panel__mark-all"
            @click="store.markAllAsRead()"
            :disabled="store.unreadCount === 0"
          >
            Mark all as read
          </button>
        </div>

        <!-- Notification list (max 8 visible, scrollable) -->
        <div class="notif-panel__list">
          <NotificationItem
            v-for="n in store.notifications"
            :key="n.id"
            :notification="n"
            @close="emit('close')"
          />
          <div v-if="store.notifications.length === 0" class="notif-panel__empty">
            No notifications
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.notif-backdrop {
  position: fixed;
  inset: 0;
  z-index: 55;
}

/* COMP-06-T03: Panel spec (Design Doc §5.6) */
.notif-panel {
  position: fixed;
  top: 64px; /* Below top bar */
  right: 16px;
  width: 380px;
  max-height: calc(100vh - 80px);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(1, 30, 65, 0.12);
  z-index: 60;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.notif-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.notif-panel__header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-primary);
}

.notif-panel__title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--color-text-primary);
}

/* COMP-06-T05: Mark all as read link */
.notif-panel__mark-all {
  font-size: 13px;
  font-weight: 600;
  color: #0095a9;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 120ms ease;
}

.notif-panel__mark-all:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.notif-panel__list {
  overflow-y: auto;
  max-height: calc(8 * 72px); /* ~8 items */
}

.notif-panel__empty {
  padding: 24px;
  text-align: center;
  font-size: 14px;
  color: var(--color-text-secondary);
}

/* COMP-06-T11: Slide from top-right 200ms ease-out */
.notif-panel-enter-active {
  transition: opacity 200ms ease-out, transform 200ms ease-out;
}
.notif-panel-leave-active {
  transition: opacity 150ms ease-in, transform 150ms ease-in;
}
.notif-panel-enter-from,
.notif-panel-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
