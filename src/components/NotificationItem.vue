<script setup>
// COMP-06-T04 — NotificationItem (US-09 AC-04, Design Doc §5.6)
import { useRouter } from 'vue-router'
import { AlertTriangle, TrendingDown, Truck, Bell } from 'lucide-vue-next'
import { useNotificationStore } from '../stores/notifications'

const props = defineProps({
  notification: { type: Object, required: true },
})

const emit = defineEmits(['close'])
const router = useRouter()
const store = useNotificationStore()

const iconMap = {
  exception_spike: AlertTriangle,
  ontime_rate:     TrendingDown,
  carrier_benchmark: Truck,
}

function getIcon(type) {
  return iconMap[type] ?? Bell
}

function formatTime(ts) {
  const date = new Date(ts)
  const now = new Date()
  const diffMs = now - date
  const diffHrs = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffHrs < 1) return 'Just now'
  if (diffHrs < 24) return `${diffHrs}h ago`
  return `${diffDays}d ago`
}

// COMP-06-T06: Mark individual item as read on click + navigate
function handleClick() {
  store.markAsRead(props.notification.id)
  if (props.notification.route) {
    router.push(props.notification.route)
  }
  emit('close')
}
</script>

<template>
  <button
    class="notif-item"
    :class="{ 'notif-item--unread': !notification.read }"
    @click="handleClick"
  >
    <div class="notif-item__icon-col">
      <component
        :is="getIcon(notification.type)"
        :size="16"
        class="notif-item__icon"
        :class="`notif-item__icon--${notification.type}`"
        aria-hidden="true"
      />
    </div>
    <div class="notif-item__body">
      <p class="notif-item__title">{{ notification.title }}</p>
      <p class="notif-item__desc">{{ notification.description }}</p>
    </div>
    <time class="notif-item__time" :datetime="notification.timestamp">
      {{ formatTime(notification.timestamp) }}
    </time>
  </button>
</template>

<style scoped>
.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: background-color 120ms ease, border-color 120ms ease;
}

.notif-item:hover {
  background-color: rgba(0, 149, 169, 0.04);
}

/* Unread: teal left border + slightly elevated bg */
.notif-item--unread {
  border-left-color: #0095a9;
  background-color: rgba(0, 149, 169, 0.04);
}

.notif-item__icon-col {
  flex-shrink: 0;
  margin-top: 2px;
}

.notif-item__icon { color: #6b7280; }
.notif-item__icon--exception_spike  { color: #ea6852; }
.notif-item__icon--ontime_rate      { color: #d4860b; }
.notif-item__icon--carrier_benchmark { color: #ea6852; }

.notif-item__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.notif-item__title {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--color-text-primary);
}

.notif-item__desc {
  font-size: 12px;
  line-height: 18px;
  color: var(--color-text-secondary);
}

.notif-item__time {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--color-text-secondary);
  white-space: nowrap;
  margin-top: 2px;
}
</style>
