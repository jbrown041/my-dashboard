import { defineStore } from 'pinia'

// DS-03-T04 — Notifications state (US-09)
export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
  }),
  getters: {
    unreadCount: (state) => state.notifications.filter((n) => !n.read).length,
  },
  actions: {
    setNotifications(items) {
      this.notifications = items
    },
    markAsRead(id) {
      const item = this.notifications.find((n) => n.id === id)
      if (item) item.read = true
    },
    markAllAsRead() {
      this.notifications.forEach((n) => (n.read = true))
    },
  },
})
