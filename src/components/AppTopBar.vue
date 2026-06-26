<script setup>
// SHELL-02 — Top Bar using v-app-bar (Design Doc §4.2)
import ThemeToggle from './ThemeToggle.vue'
import NotificationBell from './NotificationBell.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <!-- v-app-bar registers with Vuetify layout; v-main auto-offsets its top padding -->
  <v-app-bar
    elevation="0"
    :height="64"
    :style="{
      backgroundColor: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
    }"
  >
    <!-- Logo/wordmark — fixed 240px left area -->
    <div class="top-bar__left">
      <svg
        width="160"
        height="28"
        viewBox="0 0 160 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="FastForward Logistics"
        role="img"
      >
        <path d="M4 14 L14 6 L14 11 L20 11 L20 17 L14 17 L14 22 Z" fill="#0095a9" />
        <text x="28" y="19" font-family="Open Sans, sans-serif" font-size="13" font-weight="700" fill="var(--color-text-primary)">
          FastForward Logistics
        </text>
      </svg>
    </div>

    <v-spacer />

    <!-- Right section — bell, theme toggle, user avatar -->
    <div class="top-bar__right">
      <NotificationBell />
      <ThemeToggle />
      <div class="top-bar__user">
        <div class="top-bar__avatar" aria-hidden="true">
          {{ authStore.user.name.charAt(0) }}
        </div>
        <span class="top-bar__username">{{ authStore.user.name }}</span>
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped>
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
  padding-right: 24px;
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

@media (max-width: 600px) {
  .top-bar__left {
    width: auto;
    min-width: 60px;
  }
  .top-bar__username {
    display: none;
  }
  .top-bar__right {
    padding-right: 12px;
  }
}
</style>
