<script setup>
// COMP-06-T01 — NotificationBell (US-09 AC-01, Design Doc §5.6)
import { ref, onMounted } from 'vue'
import { Bell } from 'lucide-vue-next'
import { useNotificationStore } from '../stores/notifications'
import { fetchNotifications } from '../services/api'
import NotificationPanel from './NotificationPanel.vue'

const store = useNotificationStore()
const panelOpen = ref(false)

// Load notifications into store on mount
onMounted(async () => {
  if (store.notifications.length === 0) {
    const data = await fetchNotifications()
    store.setNotifications(data)
  }
})
</script>

<template>
  <!-- COMP-06-T01 / T02: Bell icon with unread badge -->
  <div class="notif-bell-wrapper">
    <button
      class="notif-bell"
      @click="panelOpen = !panelOpen"
      aria-label="Notifications"
      :aria-expanded="panelOpen"
    >
      <Bell :size="20" />
      <!-- Badge -->
      <span
        v-if="store.unreadCount > 0"
        class="notif-bell__badge"
        aria-label="`${store.unreadCount} unread notifications`"
      >
        {{ store.unreadCount > 9 ? '9+' : store.unreadCount }}
      </span>
    </button>

    <!-- COMP-06-T03: Notification panel -->
    <NotificationPanel :open="panelOpen" @close="panelOpen = false" />
  </div>
</template>

<style scoped>
.notif-bell-wrapper {
  position: relative;
}

.notif-bell {
  position: relative;
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
  transition: color 120ms ease, background-color 120ms ease;
}

.notif-bell:hover {
  background-color: rgba(0, 149, 169, 0.08);
  color: var(--color-text-primary);
}

.notif-bell__badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 16px;
  height: 16px;
  background-color: #ea6852;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
  border-radius: 8px;
  padding: 0 3px;
}
</style>
