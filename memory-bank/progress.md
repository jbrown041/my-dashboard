# Progress

## Overall Status: Pre-Development — Sprint 0 Not Started

## ✅ Done
- [x] PRD v1.0 — problem statement, objectives, user stories, functional requirements, non-functional requirements, acceptance criteria, dependencies
- [x] Design Document v1.0 — typography, color system, spacing, elevation, iconography, motion, layout/nav, all component specs, all page-level layouts
- [x] Sprint Plan v1.0 — 6 sprints, 306 points, full task breakdown with type + estimates + AC references
- [x] Workspace consolidated — `memory-bank/` and `.github/` in `my-dashboard/`
- [x] Memory bank populated

## 🔲 Not Started

### Sprint 0 — Foundation (44 pts)
- [ ] INFRA-01: Vue 3 + Vite project init, all dependencies installed, folder structure, ESLint/Prettier
- [ ] DS-01: All design tokens in `tailwind.config.js` + CSS custom properties + global CSS
- [ ] DS-02: All mock JSON data + mock service layer (`/services/`)
- [ ] DS-03: Four Pinia stores (useAuthStore, useTimeRangeStore, useThemeStore, useNotificationStore)

### Sprint 1 — App Shell (38 pts)
- [ ] SHELL-01: AppLayout.vue (top bar + side nav + main content slot)
- [ ] SHELL-02: AppTopBar.vue
- [ ] SHELL-03: AppSideNav.vue with routing + active states
- [ ] SHELL-04: ThemeToggle.vue + dark mode wired to useThemeStore
- [ ] SHELL-05: 5 placeholder page components + Vue Router setup + PageHeader.vue + page transitions

### Sprint 2 — Shared Components + Overview Page (72 pts)
- [ ] COMP-01: TimeRangeFilter.vue (segmented control, wired to store)
- [ ] COMP-02: KpiCard.vue (label, value, delta, icon)
- [ ] COMP-03: DataTable.vue (sortable, paginated, clickable rows, skeleton, empty state)
- [ ] COMP-04: DetailDrawer.vue (slide animation, backdrop, scroll preservation)
- [ ] COMP-05: ExportButton.vue (PDF + CSV dropdown)
- [ ] COMP-06: NotificationBell + NotificationPanel + NotificationItem + trigger logic
- [ ] OVR-01: OverviewPage.vue assembled end to end

### Sprint 3 — Shipments + Carriers (45 pts)
- [ ] SHIP-01: ShipmentsPage.vue end to end
- [ ] CARR-01: CarriersPage.vue end to end

### Sprint 4 — Regional + Exceptions (60 pts)
- [ ] REG-01: RegionalPage.vue including D3.js choropleth map
- [ ] EXC-01: ExceptionsPage.vue including exception detail drawer

### Sprint 5 — QA, Accessibility, Polish (47 pts)
- [ ] QA-01: Cross-page QA pass
- [ ] QA-02: Dark mode verification all pages
- [ ] QA-03: Accessibility audit (WCAG AA contrast, keyboard nav, ARIA, reduced-motion)
- [ ] QA-04: Performance + browser QA (Lighthouse, 4 browsers, 3 viewport widths)

## Known Issues / Blockers
- Notification thresholds TBD (using placeholder values until stakeholders confirm — OQ-01, OQ-04)
- U.S. region definitions TBD (using assumed 5 regions until confirmed — OQ-02)
- Real data API TBD — all data is mocked until OQ-03 is resolved
- PDF export library not yet chosen (html2pdf.js vs jsPDF — evaluate at COMP-05)