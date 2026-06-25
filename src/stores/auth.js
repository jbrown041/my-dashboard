import { defineStore } from 'pinia'

// DS-03-T01 — Stubbed pre-authenticated user (PRD §4.2)
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      name: 'Alex Rivera',
      role: 'Chief Operating Officer',
      avatar: null,
    },
  }),
})
