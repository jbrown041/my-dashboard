<script setup>
// SHELL-02 — Top Bar (Design Doc §4.2)
import { Bell } from 'lucide-vue-next'
import ThemeToggle from './ThemeToggle.vue'
import { useAuthStore } from '../stores/auth'
import { useNotificationStore } from '../stores/notifications'

// SHELL-02-T03: User data from useAuthStore (FR-G02)
const authStore = useAuthStore()
const notificationStore = useNotificationStore()
</script>

<template>
  <!-- SHELL-02-T01: AppTopBar component (Design Doc §4.2) -->
  <header class="top-bar">
    <!-- SHELL-02-T02: Logo/wordmark left -->
    <div class="top-bar__left">
      <!-- SVG wordmark placeholder -->
      <svg
        width="160"
        height="28"
        viewBox="0 0 160 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="FastForward Logistics"
        role="img"
      >
        <!-- Teal accent arrow mark -->
        <path d="M4 14 L14 6 L14 11 L20 11 L20 17 L14 17 L14 22 Z" fill="#0095a9" />
        <!-- Wordmark text rendered as path placeholder — will be replaced with final SVG -->
        <text x="28" y="19" font-family="Open Sans, sans-serif" font-size="13" font-weight="700" fill="var(--color-text-primary)">
          FastForward Logistics
        </text>
      </svg>
    </div>

    <!-- SHELL-02-T03 / SHELL-04-T06: Right section — bell, toggle, avatar -->
    <div class="top-bar__right">
      <!-- Notification bell (placeholder; full component built in Sprint 2 COMP-06) -->
      <button class="top-bar__icon-btn" aria-label="Notifications">
        <div class="bell-wrapper">
          <Bell :size="20" />
          <span
            v-if="notificationStore.unreadCount > 0"
            class="bell-badge"
          >
            {{ notificationStore.unreadCount > 9 ? '9+' : notificationStore.unreadCount }}
          </span>
        </div>
      </button>

      <!-- SHELL-04-T06: ThemeToggle in top bar right -->
      <ThemeToggle />

      <!-- SHELL-02-T03: User avatar + display name -->
      <div class="top-bar__user">
        <div class="top-bar__avatar" aria-hidden="true">
          {{ authStore.user.name.charAt(0) }}
        </div>
        <span class="top-bar__username">{{ authStore.user.name }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* SHELL-02-T04: Top bar height, background, border-bottom per design tokens */
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px 0 0;
  z-index: 50;
}

.top-bar__left {
  width: 240px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.top-bar__right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.top-bar__icon-btn {
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

.top-bar__icon-btn:hover {
  background-color: rgba(0, 149, 169, 0.08);
  color: var(--color-text-primary);
}

.bell-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bell-badge {
  position: absolute;
  top: -6px;
  right: -6px;
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

.top-bar__user {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 8px;
  padding-left: 12px;
  border-left: 1px solid var(--color-border);
}

.top-bar__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #0095a9;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.top-bar__username {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
}
</style>
