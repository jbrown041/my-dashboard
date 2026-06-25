# Active Context

## Current Status
**Sprint 0 complete. Ready to begin Sprint 1 — Application Shell & Navigation.**

## What Was Just Completed (Sprint 0)
- Vue 3 + Vite project scaffolded with Vue Router, Pinia, ESLint, Prettier
- All dependencies installed: `@lucide/vue`, `vue-echarts`, `echarts`, `d3`, `tailwindcss@3`
- Folder structure established: `/components`, `/pages`, `/stores`, `/composables`, `/assets`, `/data`, `/services`
- `tailwind.config.js` — all design tokens: colors, typography, spacing, radius, shadows, layout constants
- `src/assets/main.css` — Tailwind directives, Google Fonts import, CSS custom property tokens (light + dark), base resets, color transitions, prefers-reduced-motion rule
- 4 Pinia stores: `useAuthStore`, `useTimeRangeStore`, `useThemeStore`, `useNotificationStore`
- 10 mock JSON data files in `/src/data/`
- Mock service layer at `/src/services/api.js` (async, mirrors real API shape)
- 5 placeholder page components in `/src/pages/`
- Vue Router configured with all 5 named routes + `/` redirect to `/dashboard`
- App.vue cleaned up to bare `<RouterView />`
- Production build passes cleanly (`npm run build`)

## Immediate Next Step
**Begin Sprint 1 — SHELL-01: Application Layout**

Sprint 1 tasks in order:
1. `SHELL-01` — AppLayout.vue (fixed top bar + fixed side nav + scrollable main content slot)
2. `SHELL-02` — AppTopBar.vue
3. `SHELL-03` — AppSideNav.vue with routing + active state
4. `SHELL-04` — ThemeToggle.vue wired to useThemeStore
5. `SHELL-05` — PageHeader.vue + page transitions

## Active Decisions / Things to Keep in Mind
- **No real API yet** — all data comes from mock JSON files in `/data/` via a mock service layer in `/services/`
- **Auth is stubbed** — `useAuthStore` provides a fake user object; login UI is out of scope
- **Notification thresholds are TBD** — placeholder values needed in mock data until stakeholders confirm
- **U.S. regional definitions are TBD** — assume Northeast, Southeast, Midwest, Southwest, West for now (OQ-02)
- **PDF export library not decided** — evaluate `html2pdf.js` vs `jsPDF` during COMP-05

## Open Questions (Blocking or Near-Blocking)
| ID | Question | Impact |
|---|---|---|
| OQ-01 | On-time rate / exception spike notification thresholds? | Notification logic needs placeholder values |
| OQ-02 | How are U.S. regions defined? | Regional map boundaries |
| OQ-03 | What is the real-time data source/API? | Swap mock service for real when available |
| OQ-04 | Who maintains carrier benchmark thresholds? | Carrier flagging logic |