  
  
# 🗂️ Sprint Plan — FastForward Logistics Executive Dashboard  
**Product:** FastForward Logistics — Executive Dashboard**Version:** 1.0**Date:** June 25, 2026**Status:** Draft**Reference Documents:** PRD v1.0 · Design Doc v1.0  
  
## Conventions  

| Term | Definition |
| -------- | --------------------------------------------------------------------------------- |
| Epic | A large body of work tied to a feature area |
| Story | A user story from the PRD (US-XX) |
| Task | A granular, dev-executable unit of work |
| AC | Acceptance criteria reference from the PRD (AC-XX) |
| Estimate | Story points using Fibonacci scale (1, 2, 3, 5, 8) |
| Type | FE = Front-End · BE = Back-End/Data · DS = Design System · INFRA = Infrastructure |
  
## 🏁 Sprint 0 — Foundation & Setup  
**Goal:** Project scaffolding, design system implementation, and mock data. No features yet — just the foundation everything else is built on.  
  
## INFRA-01 — Project Scaffolding  

| ID | Task | Type | Estimate | Notes |
| ------------ | ------------------------------------------------------------------------------------ | ----- | -------- | --------------------------------------------------------- |
| INFRA-01-T01 | Initialize Vue 3 project with Vite | INFRA | 1 | Use npm create vue@latest |
| INFRA-01-T02 | Install and configure Vue Router with named routes for all 5 pages | INFRA | 2 | /dashboard, /shipments, /carriers, /regional, /exceptions |
| INFRA-01-T03 | Install and configure Pinia for state management | INFRA | 1 |  |
| INFRA-01-T04 | Install and configure Tailwind CSS | INFRA | 2 |  |
| INFRA-01-T05 | Install Lucide Vue Next icon library | INFRA | 1 |  |
| INFRA-01-T06 | Install vue-echarts and Apache ECharts | INFRA | 1 |  |
| INFRA-01-T07 | Install D3.js for choropleth map | INFRA | 1 |  |
| INFRA-01-T08 | Configure Google Fonts — Open Sans (400, 600, 700) | INFRA | 1 |  |
| INFRA-01-T09 | Set up folder structure (/components, /pages, /stores, /composables, /assets, /data) | INFRA | 1 |  |
| INFRA-01-T10 | Set up ESLint + Prettier with agreed code style rules | INFRA | 1 |  |
  
## DS-01 — Design Tokens & Global Styles  

| ID | Task | Type | Estimate | Notes |
| --------- | ------------------------------------------------------------------------------------------- | ---- | -------- | --------------------------- |
| DS-01-T01 | Define all color tokens in tailwind.config.js (brand + functional palette) | DS | 2 | Reference Design Doc §3.2 |
| DS-01-T02 | Define CSS custom properties for light/dark mode tokens (--color-bg, --color-surface, etc.) | DS | 2 | Reference Design Doc §3.2.4 |
| DS-01-T03 | Define spacing scale tokens in Tailwind config | DS | 1 | Reference Design Doc §3.3 |
| DS-01-T04 | Define border radius tokens in Tailwind config | DS | 1 | Reference Design Doc §3.4 |
| DS-01-T05 | Define box shadow tokens in Tailwind config (flat, raised, floating) | DS | 1 | Reference Design Doc §3.5 |
| DS-01-T06 | Define typography scale in Tailwind config (font sizes, weights, line heights) | DS | 2 | Reference Design Doc §3.1 |
| DS-01-T07 | Create global CSS file with base resets, font imports, and token application | DS | 2 |  |
| DS-01-T08 | Implement prefers-reduced-motion global rule to disable animations | DS | 1 | Reference Design Doc §3.7 |
  
## DS-02 — Mock Data Setup  

| ID | Task | Type | Estimate | Notes |
| --------- | ------------------------------------------------------------------------------------------------------- | ---- | -------- | ----------------------------------- |
| DS-02-T01 | Define and create mock JSON for KPI summary data (shipments, on-time rate, active carriers, exceptions) | BE | 2 | Include delta values per time range |
| DS-02-T02 | Define and create mock JSON for shipment volume over time (all 4 time ranges) | BE | 2 |  |
| DS-02-T03 | Define and create mock JSON for shipments by status | BE | 1 |  |
| DS-02-T04 | Define and create mock JSON for shipments by region | BE | 1 |  |
| DS-02-T05 | Define and create mock JSON for shipments data table (50+ rows) | BE | 2 |  |
| DS-02-T06 | Define and create mock JSON for carrier scorecards and rankings | BE | 2 | Include below-threshold carriers |
| DS-02-T07 | Define and create mock JSON for carrier on-time rate over time | BE | 2 |  |
| DS-02-T08 | Define and create mock JSON for U.S. regional performance (5 regions) | BE | 2 |  |
| DS-02-T09 | Define and create mock JSON for exceptions (summary counts + 50+ table rows) | BE | 2 | Include all 4 categories |
| DS-02-T10 | Define and create mock JSON for notifications (10+ items, mixed read/unread) | BE | 1 |  |
| DS-02-T11 | Create a mock service layer (/services) that simulates API calls with async/await | BE | 3 | Enables easy swap to real API later |
  
## DS-03 — Pinia Stores Setup  

| ID | Task | Type | Estimate | Notes |
| --------- | ------------------------------------------------------------------------------------- | ---- | -------- | ------------ |
| DS-03-T01 | Create useAuthStore — stubbed pre-authenticated user object (name, avatar, role) | FE | 1 | PRD §4.2 |
| DS-03-T02 | Create useTimeRangeStore — selected time range state, default to Last 30 Days | FE | 2 | US-02, AC-04 |
| DS-03-T03 | Create useThemeStore — light/dark mode state, default to light | FE | 2 | US-10, AC-02 |
| DS-03-T04 | Create useNotificationStore — notifications array, unread count, mark as read actions | FE | 3 | US-09 |
  
## 🏗️ Sprint 1 — Application Shell & Navigation  
**Goal:** Build the full application shell — top bar, side nav, layout, routing, theme toggle, and auth stub. By end of sprint the app should be navigable with placeholder page content.  
  
## Epic: Application Shell  
**Related:** FR-G01, FR-G02, FR-G06, FR-G08, US-10  
  
**SHELL-01 — Application Layout**  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ------------ | ----------------------------------------------------------------------------------- | ---- | -------- | ------------ | ------------------------- |
| SHELL-01-T01 | Build AppLayout.vue — fixed top bar + fixed side nav + scrollable main content slot | FE | 3 | FR-G08 | Reference Design Doc §4.1 |
| SHELL-01-T02 | Apply correct dimensions: top bar 64px, side nav 240px, content offset | FE | 2 | FR-G08 | Reference Design Doc §4.1 |
| SHELL-01-T03 | Apply max content width of 1440px centered in main area | FE | 1 |  | Reference Design Doc §4.4 |
| SHELL-01-T04 | Apply 32px padding to main content area | FE | 1 |  | Reference Design Doc §4.4 |
| SHELL-01-T05 | Verify side nav and top bar remain fixed on page scroll | FE | 1 | FR-G08 |  |
  
**SHELL-02 — Top Bar**  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ------------ | ------------------------------------------------------------------------- | ---- | -------- | ------------ | ------------------------- |
| SHELL-02-T01 | Build AppTopBar.vue component | FE | 2 |  | Reference Design Doc §4.2 |
| SHELL-02-T02 | Add FastForward Logistics logo/wordmark placeholder (SVG) to top bar left | FE | 1 |  |  |
| SHELL-02-T03 | Add user avatar and display name (from useAuthStore) to top bar right | FE | 2 | FR-G02 |  |
| SHELL-02-T04 | Apply top bar background, border-bottom, and height per design tokens | FE | 1 |  | Reference Design Doc §4.2 |
  
**SHELL-03 — Side Navigation**  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ------------ | --------------------------------------------------------------------------------------------- | ---- | -------- | ------------ | ------------------------- |
| SHELL-03-T01 | Build AppSideNav.vue component with all 5 nav items | FE | 3 | FR-G08 | Reference Design Doc §4.3 |
| SHELL-03-T02 | Implement active route detection and apply active styles (teal left border, teal text + icon) | FE | 2 | FR-G08 | Use Vue Router useRoute |
| SHELL-03-T03 | Implement hover state with background fill transition (120ms ease) | FE | 1 |  | Reference Design Doc §3.7 |
| SHELL-03-T04 | Add correct Lucide icons to each nav item | FE | 1 |  | Reference Design Doc §4.3 |
| SHELL-03-T05 | Apply nav background color and text color tokens for light and dark mode | FE | 2 | US-10, AC-04 |  |
  
**SHELL-04 — Light / Dark Mode Toggle**  
**Related:** US-10 (AC-01 through AC-05)  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ------------ | ----------------------------------------------------------------------------------------- | ---- | -------- | ------------------ | ------------------------- |
| SHELL-04-T01 | Build ThemeToggle.vue component (sun/moon icon button) | FE | 2 | US-10 AC-01 |  |
| SHELL-04-T02 | Wire toggle to useThemeStore, toggling between light and dark | FE | 2 | US-10 AC-02, AC-03 |  |
| SHELL-04-T03 | Apply dark class to <html> element when dark mode is active (Tailwind dark mode strategy) | FE | 2 | US-10 AC-04 |  |
| SHELL-04-T04 | Apply 250ms ease transition to all color token CSS properties on mode switch | FE | 2 | US-10 AC-05 | Reference Design Doc §3.7 |
| SHELL-04-T05 | Verify no layout shift or flash occurs during mode transition | FE | 1 | US-10 AC-05 |  |
| SHELL-04-T06 | Place ThemeToggle.vue in top bar right area | FE | 1 | US-10 AC-01 |  |
  
**SHELL-05 — Page Scaffolding & Routing**  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ------------ | ---------------------------------------------------------------------------------------- | ---- | -------- | ------------ | ----------------------------------------------------------------------- |
| SHELL-05-T01 | Create placeholder page components for all 5 routes | FE | 1 |  | OverviewPage, ShipmentsPage, CarriersPage, RegionalPage, ExceptionsPage |
| SHELL-05-T02 | Register all routes in Vue Router with correct paths and names | FE | 1 | FR-G08 |  |
| SHELL-05-T03 | Set /dashboard as the default redirect from / | FE | 1 |  |  |
| SHELL-05-T04 | Build reusable PageHeader.vue component (title, subtitle, time filter slot, export slot) | FE | 3 |  | Reference Design Doc §4.5 |
| SHELL-05-T05 | Implement page transition (opacity fade, 150ms ease) between routes | FE | 2 |  | Reference Design Doc §3.7 |
  
## 📊 Sprint 2 — Global Components & Overview Page  
**Goal:** Build all shared/reusable components and complete the Overview page end to end.  
  
## Epic: Shared Components  
  
**COMP-01 — Time Range Filter**  
**Related:** US-02 (AC-01 through AC-04), FR-G04, FR-G05  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ----------- | ----------------------------------------------------------------------- | ---- | -------- | ------------ | ------------------------------------------------------ |
| COMP-01-T01 | Build TimeRangeFilter.vue segmented control component | FE | 3 | US-02 AC-01 | 4 options: Today, Last 7 Days, Last 30 Days, Last Year |
| COMP-01-T02 | Wire component to useTimeRangeStore — updates global state on selection | FE | 2 | US-02 AC-02 |  |
| COMP-01-T03 | Apply active segment styles (teal background, white text) | FE | 1 | US-02 AC-03 | Reference Design Doc §5.2 |
| COMP-01-T04 | Apply inactive segment styles and hover transition (120ms) | FE | 1 | US-02 AC-03 |  |
| COMP-01-T05 | Verify time range persists when navigating between pages | FE | 2 | US-02 AC-04 | Pinia store persists across routes |
  
**COMP-02 — KPI Summary Card**  
**Related:** US-01 (AC-01, AC-02, AC-03), FR-O01, FR-O02  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ----------- | -------------------------------------------------------------------------------------------- | ---- | -------- | ------------ | ------------------------- |
| COMP-02-T01 | Build KpiCard.vue component with props: label, value, delta, deltaDirection, icon | FE | 3 | US-01 AC-01 | Reference Design Doc §5.1 |
| COMP-02-T02 | Implement delta indicator — green + ↑ for positive, coral + ↓ for negative, gray for neutral | FE | 2 | US-01 AC-02 |  |
| COMP-02-T03 | Apply card styles: background, border, radius, padding, shadow tokens | FE | 1 |  | Reference Design Doc §5.1 |
| COMP-02-T04 | Implement hover state: raised shadow + translateY(-2px), 150ms ease | FE | 1 |  | Reference Design Doc §3.7 |
| COMP-02-T05 | Verify card values update when time range changes | FE | 2 | US-01 AC-03 |  |
  
**COMP-03 — Data Table**  
**Related:** FR-S05, FR-C04, FR-E05  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ----------- | ------------------------------------------------------------------------------------------- | ---- | -------- | ------------ | ------------------------- |
| COMP-03-T01 | Build DataTable.vue reusable component with dynamic columns prop | FE | 5 |  | Reference Design Doc §5.4 |
| COMP-03-T02 | Implement sortable column headers with sort direction indicator icon | FE | 3 | US-05 AC-02 |  |
| COMP-03-T03 | Implement pagination — previous/next, page count display, 10 rows default | FE | 3 | FR-S05 |  |
| COMP-03-T04 | Implement row hover state (background fill, 120ms ease) | FE | 1 |  |  |
| COMP-03-T05 | Implement clickable row with pointer cursor and emit row-clickevent | FE | 1 | US-08 AC-01 |  |
| COMP-03-T06 | Build StatusTag.vue component for status column (Delivered, In Transit, Delayed, Exception) | FE | 2 |  | Reference Design Doc §5.4 |
| COMP-03-T07 | Implement empty state within table (icon + message) | FE | 2 |  | Reference Design Doc §5.7 |
| COMP-03-T08 | Implement skeleton loading state (5 skeleton rows) | FE | 2 |  | Reference Design Doc §5.7 |
  
**COMP-04 — Detail Drawer**  
**Related:** US-08 (AC-01 through AC-03), FR-E06, FR-E07, FR-E08  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ----------- | ----------------------------------------------------------------------- | ---- | -------- | ------------ | ------------------------- |
| COMP-04-T01 | Build DetailDrawer.vue base component with header slot and body slot | FE | 3 | US-08 AC-01 | Reference Design Doc §5.5 |
| COMP-04-T02 | Implement slide-in animation from right (250ms ease-out) | FE | 2 |  | Reference Design Doc §3.7 |
| COMP-04-T03 | Implement slide-out animation to right (200ms ease-in) | FE | 1 |  | Reference Design Doc §3.7 |
| COMP-04-T04 | Implement semi-transparent backdrop overlay | FE | 1 |  | Reference Design Doc §5.5 |
| COMP-04-T05 | Implement close on backdrop click | FE | 1 | US-08 AC-03 |  |
| COMP-04-T06 | Implement close button (X icon, top right of drawer) | FE | 1 | US-08 AC-03 |  |
| COMP-04-T07 | Verify scroll position of underlying table is preserved on drawer close | FE | 2 | US-08 AC-03 |  |
  
**COMP-05 — Export Button**  
**Related:** US-11 (AC-01 through AC-04), FR-X01 through FR-X04  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ----------- | ------------------------------------------------------------------------- | ---- | -------- | ------------------ | ---------------------------- |
| COMP-05-T01 | Build ExportButton.vue with dropdown (PDF + CSV options) | FE | 3 | US-11 AC-01, AC-02 | Reference Design Doc §5.8 |
| COMP-05-T02 | Implement PDF export using current page view and active time range | FE | 5 | US-11 AC-03 | Consider html2pdf.jsor jsPDF |
| COMP-05-T03 | Implement CSV export of current page's data table | FE | 3 | US-11 AC-04 | All visible columns included |
| COMP-05-T04 | Verify PDF export reflects active light/dark mode | FE | 2 | US-11 AC-03 |  |
| COMP-05-T05 | Apply outline button styles and hover state (border + text shift to teal) | FE | 1 |  | Reference Design Doc §5.8 |
  
**COMP-06 — Notification Panel**  
**Related:** US-09 (AC-01 through AC-05), FR-N01 through FR-N06  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ----------- | ----------------------------------------------------------------------------------- | ---- | -------- | ------------ | ------------------------- |
| COMP-06-T01 | Build NotificationBell.vue — bell icon with unread count badge | FE | 2 | US-09 AC-01 | Reference Design Doc §5.6 |
| COMP-06-T02 | Wire badge count to useNotificationStore unread count | FE | 1 | US-09 AC-01 |  |
| COMP-06-T03 | Build NotificationPanel.vue — slide-in panel with notification list | FE | 3 | US-09 AC-02 | Reference Design Doc §5.6 |
| COMP-06-T04 | Build NotificationItem.vue — icon, title, description, timestamp, read/unread state | FE | 2 | US-09 AC-04 |  |
| COMP-06-T05 | Implement "Mark all as read" action wired to store | FE | 2 | US-09 AC-05 |  |
| COMP-06-T06 | Implement individual "mark as read" on item click | FE | 1 | US-09 AC-05 |  |
| COMP-06-T07 | Implement notification trigger logic for exception spike (>10%) | FE | 3 | US-09 AC-03 | Computed from mock data |
| COMP-06-T08 | Implement notification trigger logic for on-time rate below threshold | FE | 3 | US-09 AC-03 |  |
| COMP-06-T09 | Implement notification trigger logic for carrier below benchmark | FE | 3 | US-09 AC-03 |  |
| COMP-06-T10 | Each notification item links to its relevant page | FE | 2 | US-09 AC-04 | Use Vue Router push |
| COMP-06-T11 | Implement panel open/close animation (slide from top-right, 200ms ease-out) | FE | 2 |  | Reference Design Doc §3.7 |
  
## Epic: Overview Page  
**Related:** US-01, US-02, FR-O01 through FR-O06  
  
**OVR-01 — Overview Page Assembly**  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ---------- | ----------------------------------------------------------------------------------------------------- | ---- | -------- | ------------------------- | ----------------------------------- |
| OVR-01-T01 | Build OverviewPage.vue layout using PageHeader, TimeRangeFilter, ExportButton | FE | 2 | US-01 AC-04 | Default time range: Last 30 Days |
| OVR-01-T02 | Add KPI cards row (4 cards): Total Shipments, On-Time Delivery Rate, Active Carriers, Open Exceptions | FE | 2 | US-01 AC-01 | Wire to mock data via service layer |
| OVR-01-T03 | Wire all KPI cards to update when time range changes | FE | 2 | US-01 AC-03 | Watch useTimeRangeStore |
| OVR-01-T04 | Build ShipmentVolumeChart.vue — line chart, current vs. prior period | FE | 5 | US-03 AC-01, AC-02, AC-03 | Reference Design Doc §5.3 |
| OVR-01-T05 | Build OnTimeRateChart.vue — area chart with dashed target threshold line | FE | 5 | FR-O04 | Reference Design Doc §5.3 |
| OVR-01-T06 | Build RegionalSnapshotWidget.vue — condensed region cards with "View Full Report →" link | FE | 3 | FR-O05 | Links to /regional |
| OVR-01-T07 | Build ExceptionSummaryWidget.vue — category counts with coral accents and "View All →" link | FE | 3 | FR-O06 | Links to /exceptions |
| OVR-01-T08 | Apply two-column layout for charts row (60/40 split) | FE | 1 |  | Reference Design Doc §6.1 |
| OVR-01-T09 | Apply two-column layout for widgets row (60/40 split) | FE | 1 |  | Reference Design Doc §6.1 |
| OVR-01-T10 | Implement skeleton loading states for all charts and widgets | FE | 2 |  | Reference Design Doc §5.7 |
| OVR-01-T11 | Implement error states for all charts and widgets | FE | 2 |  | Reference Design Doc §5.7 |
  
## 📦 Sprint 3 — Shipments & Carrier Performance Pages  
**Goal:** Complete the Shipments and Carrier Performance pages end to end.  
  
## Epic: Shipments Page  
**Related:** US-03, US-04, FR-S01 through FR-S05  
  
**SHIP-01 — Shipments Page**  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ----------- | ----------------------------------------------------------------------------------------------------------------------- | ---- | -------- | ------------------------- | -------------------------- |
| SHIP-01-T01 | Build ShipmentsPage.vue layout with PageHeader, TimeRangeFilter, ExportButton | FE | 2 |  |  |
| SHIP-01-T02 | Add Total Shipments KPI card with delta vs. prior period | FE | 1 | FR-S01 | Reuse KpiCard.vue |
| SHIP-01-T03 | Add ShipmentVolumeChart.vue (reuse from Overview) filterable by region | FE | 3 | US-03 AC-01, AC-02, AC-03 | Add region filter dropdown |
| SHIP-01-T04 | Build ShipmentsByStatusChart.vue — horizontal stacked bar chart | FE | 5 | US-04 AC-01, AC-02, AC-03 | Reference Design Doc §5.3 |
| SHIP-01-T05 | Build VolumeByRegionChart.vue — vertical bar chart sorted by volume descending | FE | 3 | FR-S04 | Reference Design Doc §5.3 |
| SHIP-01-T06 | Add DataTable.vue instance with shipments columns: Shipment ID, Origin, Destination, Carrier, Status, ETA, Last Updated | FE | 3 | FR-S05 | Reuse DataTable.vue |
| SHIP-01-T07 | Wire all charts and table to update when time range changes | FE | 2 | US-02 AC-02 |  |
| SHIP-01-T08 | Implement skeleton and error states for all charts and table | FE | 2 |  |  |
  
## Epic: Carrier Performance Page  
**Related:** US-05, FR-C01 through FR-C04  
  
**CARR-01 — Carrier Performance Page**  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ----------- | ------------------------------------------------------------------------------------------------------------------ | ---- | -------- | ------------------- | ----------------------------------------- |
| CARR-01-T01 | Build CarriersPage.vue layout with PageHeader, TimeRangeFilter, ExportButton | FE | 2 |  |  |
| CARR-01-T02 | Build CarrierScorecardCard.vue — carrier name, on-time rate, shipments, incidents, trend arrow | FE | 3 | FR-C01 | Reference Design Doc §6.3 |
| CARR-01-T03 | Implement below-benchmark flag on CarrierScorecardCard.vue (coral left border + "Below Benchmark" badge) | FE | 2 | US-05 AC-03, FR-C04 | Reference Design Doc §6.3 |
| CARR-01-T04 | Render carrier scorecard cards in a fluid wrapping row | FE | 1 |  |  |
| CARR-01-T05 | Build CarrierComparisonChart.vue — grouped bar chart (On-Time Rate, Volume, Incidents per carrier) | FE | 5 | US-05 AC-01, FR-C02 | Reference Design Doc §5.3 |
| CARR-01-T06 | Build CarrierOnTimeLineChart.vue — multi-line chart, max 5 carriers, interactive legend | FE | 5 | FR-C02 | Reference Design Doc §5.3 |
| CARR-01-T07 | Add DataTable.vue instance for carrier rankings: Carrier Name, Shipments, On-Time %, Incidents, Avg. Delivery Time | FE | 3 | US-05 AC-02, FR-C03 | Reuse DataTable.vue, all columns sortable |
| CARR-01-T08 | Wire all components to update when time range changes | FE | 2 | US-02 AC-02 |  |
| CARR-01-T09 | Implement skeleton and error states for all charts and table | FE | 2 |  |  |
  
## 🗺️ Sprint 4 — Regional Performance & Exceptions Pages  
**Goal:** Complete the Regional Performance and Exceptions pages including map, drill-down drawer, and exception detail drawer.  
  
## Epic: Regional Performance Page  
**Related:** US-06, FR-R01 through FR-R05  
  
**REG-01 — Regional Performance Page**  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ---------- | ------------------------------------------------------------------------------------------------------------------ | ---- | -------- | ------------ | ------------------------- |
| REG-01-T01 | Build RegionalPage.vue layout with PageHeader, TimeRangeFilter, ExportButton | FE | 2 |  |  |
| REG-01-T02 | Build UsRegionMap.vue — D3.js choropleth map, 420px height, full width | FE | 8 | US-06 AC-01 | Reference Design Doc §5.3 |
| REG-01-T03 | Implement region color scale: green → amber → coral based on performance score | FE | 3 | US-06 AC-01 | Reference Design Doc §5.3 |
| REG-01-T04 | Implement map hover tooltip: Region Name, Volume, On-Time Rate, Exception Count | FE | 3 | US-06 AC-02 | Reference Design Doc §5.3 |
| REG-01-T05 | Implement "no data" state for regions with missing data (gray fill + tooltip) | FE | 1 |  |  |
| REG-01-T06 | Build RegionCard.vue — region name, volume, on-time rate, top carrier, exception count | FE | 3 | US-06 AC-03 |  |
| REG-01-T07 | Render 5 region cards in equal-width row below map | FE | 1 | US-06 AC-03 |  |
| REG-01-T08 | Verify region card data matches map data for the same region | FE | 2 | US-06 AC-03 |  |
| REG-01-T09 | Build RegionalComparisonChart.vue — grouped bar chart, on-time rate + volume per region | FE | 3 | FR-R05 | Reference Design Doc §5.3 |
| REG-01-T10 | Implement click on map region → opens DetailDrawer.vue with region detail content | FE | 3 | US-06 AC-04 | Reuse DetailDrawer.vue |
| REG-01-T11 | Implement click on region card → opens DetailDrawer.vue with same region detail content | FE | 2 | US-06 AC-04 |  |
| REG-01-T12 | Build region detail drawer content: name, score, volume, on-time rate, top carrier, exceptions, mini exception bar | FE | 3 | US-06 AC-04 | Reference Design Doc §6.4 |
| REG-01-T13 | Wire all components to update when time range changes | FE | 2 | US-02 AC-02 |  |
| REG-01-T14 | Implement skeleton and error states for map and charts | FE | 2 |  |  |
  
## Epic: Exceptions Page  
**Related:** US-07, US-08, FR-E01 through FR-E08  
  
**EXC-01 — Exceptions Page**  

| ID | Task | Type | Estimate | AC Reference | Notes |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------- | ---- | -------- | ------------ | ------------------------- |
| EXC-01-T01 | Build ExceptionsPage.vue layout with PageHeader, TimeRangeFilter, ExportButton | FE | 2 |  |  |
| EXC-01-T02 | Build ExceptionSummaryBar.vue — count badges for: Delayed, Damaged, Missing Documentation, Other | FE | 3 | US-07 AC-01 | Reference Design Doc §6.5 |
| EXC-01-T03 | Apply coral accent styling to exception category badges | FE | 1 | US-07 AC-02 |  |
| EXC-01-T04 | Implement click on category badge → filters exceptions table to that category | FE | 3 | US-07 AC-02 |  |
| EXC-01-T05 | Implement active filter state on badge (visually indicated) | FE | 1 | US-07 AC-02 |  |
| EXC-01-T06 | Implement "clear filter" to reset table to all exceptions | FE | 1 |  |  |
| EXC-01-T07 | Build ExceptionsOverTimeChart.vue — line chart of exception volume trend | FE | 3 | FR-E03 | Reference Design Doc §5.3 |
| EXC-01-T08 | Build ExceptionsByRegionChart.vue — bar chart of exceptions per region | FE | 3 | FR-E04 | Reference Design Doc §5.3 |
| EXC-01-T09 | Add DataTable.vue instance: Exception ID, Type, Shipment ID, Carrier, Region, Date Opened, Days Open, Status | FE | 3 | FR-E05 | Reuse DataTable.vue |
| EXC-01-T10 | Wire table row click to open DetailDrawer.vue with exception detail content | FE | 2 | US-08 AC-01 | Reuse DetailDrawer.vue |
| EXC-01-T11 | Build exception detail drawer content: Exception ID, Type badge, Shipment ID, Carrier, Region, Date Opened, Days Open, Status tag | FE | 3 | US-08 AC-02 | Reference Design Doc §6.5 |
| EXC-01-T12 | Verify scroll position is preserved when drawer is closed | FE | 2 | US-08 AC-03 |  |
| EXC-01-T13 | Wire all components to update when time range changes | FE | 2 | US-02 AC-02 |  |
| EXC-01-T14 | Implement skeleton and error states for all charts and table | FE | 2 |  |  |
  
## 🧪 Sprint 5 — QA, Polish & Accessibility  
**Goal:** Full application QA pass, dark mode verification across all pages, accessibility audit, performance checks, and final polish.  
  
## QA-01 — Cross-Page QA  

| ID | Task | Type | Estimate | AC Reference | Notes |
| --------- | ------------------------------------------------------------------------- | ---- | -------- | ------------ | ----- |
| QA-01-T01 | Verify time range filter persists and updates all data across all 5 pages | FE | 3 | US-02 AC-04 |  |
| QA-01-T02 | Verify all KPI card delta indicators are correct for each time range | FE | 2 | US-01 AC-02 |  |
| QA-01-T03 | Verify all chart tooltips display correct data on hover | FE | 2 | US-03 AC-03 |  |
| QA-01-T04 | Verify all table sort functions work correctly for all sortable columns | FE | 2 | US-05 AC-02 |  |
| QA-01-T05 | Verify all table pagination works correctly | FE | 1 |  |  |
| QA-01-T06 | Verify all drawer open/close animations and backdrop behavior | FE | 2 | US-08 AC-03 |  |
| QA-01-T07 | Verify notification badge count updates correctly | FE | 2 | US-09 AC-01 |  |
| QA-01-T08 | Verify all notification links route to correct pages | FE | 1 | US-09 AC-04 |  |
| QA-01-T09 | Verify mark as read (individual + all) works correctly | FE | 1 | US-09 AC-05 |  |
| QA-01-T10 | Verify export PDF and CSV work on all pages | FE | 3 | US-11 |  |
  
## QA-02 — Dark Mode Verification  

| ID | Task | Type | Estimate | AC Reference | Notes |
| --------- | --------------------------------------------------------------------------- | ---- | -------- | ------------ | ----- |
| QA-02-T01 | Verify all color tokens apply correctly in dark mode across all pages | FE | 3 | US-10 AC-04 |  |
| QA-02-T02 | Verify all charts render correctly in dark mode (no hardcoded light colors) | FE | 3 | US-10 AC-04 |  |
| QA-02-T03 | Verify U.S. map renders correctly in dark mode | FE | 2 | US-10 AC-04 |  |
| QA-02-T04 | Verify all status tags and badges render correctly in dark mode | FE | 1 | US-10 AC-04 |  |
| QA-02-T05 | Verify mode transition is smooth with no flash or layout shift | FE | 2 | US-10 AC-05 |  |
  
## QA-03 — Accessibility Audit  

| ID | Task | Type | Estimate | AC Reference | Notes |
| --------- | ---------------------------------------------------------------------------------------- | ---- | -------- | ------------- | --------------------------- |
| QA-03-T01 | Run color contrast audit on all text/background combinations in light mode (WCAG AA) | FE | 2 | Design Doc §8 | Use browser DevTools or Axe |
| QA-03-T02 | Run color contrast audit in dark mode | FE | 2 | Design Doc §8 |  |
| QA-03-T03 | Verify all interactive elements are keyboard navigable (tab order) | FE | 3 | Design Doc §8 |  |
| QA-03-T04 | Verify visible focus rings on all interactive elements | FE | 2 | Design Doc §8 |  |
| QA-03-T05 | Add ARIA labels to all icon-only buttons (close, toggle, bell) | FE | 2 | Design Doc §8 |  |
| QA-03-T06 | Add ARIA labels and roles to all chart containers | FE | 2 | Design Doc §8 |  |
| QA-03-T07 | Verify prefers-reduced-motion disables all animations | FE | 2 | Design Doc §8 |  |
| QA-03-T08 | Verify color is never the sole means of conveying information (all statuses have labels) | FE | 2 | Design Doc §8 |  |
  
## QA-04 — Performance & Browser QA  

| ID | Task | Type | Estimate | AC Reference | Notes |
| --------- | ---------------------------------------------------------------------------- | ---- | -------- | ------------- | -------------------------------- |
| QA-04-T01 | Verify initial dashboard load time is under 3 seconds on standard broadband | FE | 2 | NFR-01 | Use Lighthouse |
| QA-04-T02 | Verify application renders correctly in Chrome (latest 2 versions) | FE | 1 | NFR-02 |  |
| QA-04-T03 | Verify application renders correctly in Firefox (latest 2 versions) | FE | 1 | NFR-02 |  |
| QA-04-T04 | Verify application renders correctly in Safari (latest 2 versions) | FE | 1 | NFR-02 |  |
| QA-04-T05 | Verify application renders correctly in Edge (latest 2 versions) | FE | 1 | NFR-02 |  |
| QA-04-T06 | Verify layout is correct at 1280px, 1440px, and 1920px widths | FE | 2 | NFR-03 |  |
| QA-04-T07 | Verify side nav collapses to icon-only at 1024px–1279px | FE | 2 | Design Doc §7 |  |
| QA-04-T08 | Verify all data fetch error states display correctly when mock service fails | FE | 2 | NFR-05 | Simulate failure in mock service |
  
## 📊 Sprint Summary  

| Sprint   | Focus                                        | Est. Points |
| -------- | -------------------------------------------- | ----------- |
| Sprint 0 | Foundation, design tokens, mock data, stores | 44          |
| Sprint 1 | App shell, navigation, layout, theme toggle  | 38          |
| Sprint 2 | Shared components + Overview page            | 72          |
| Sprint 3 | Shipments + Carrier Performance pages        | 45          |
| Sprint 4 | Regional Performance + Exceptions pages      | 60          |
| Sprint 5 | QA, accessibility, polish                    | 47          |
| Total    |                                              | 306         |
  
## 📎 Traceability Matrix  

| User Story                               | Sprint | Tasks                   |
| ---------------------------------------- | ------ | ----------------------- |
| US-01 — View business health at a glance | 2      | COMP-02, OVR-01         |
| US-02 — Filter by time range             | 2      | COMP-01                 |
| US-03 — Monitor shipment volume trends   | 2, 3   | OVR-01-T04, SHIP-01-T03 |
| US-04 — Shipment status breakdown        | 3      | SHIP-01-T04             |
| US-05 — Compare carrier performance      | 3      | CARR-01                 |
| US-06 — View performance by U.S. region  | 4      | REG-01                  |
| US-07 — Monitor open exceptions          | 4      | EXC-01-T02 through T06  |
| US-08 — Drill into exception details     | 4      | EXC-01-T10 through T12  |
| US-09 — Receive proactive alerts         | 2      | COMP-06                 |
| US-10 — Toggle light/dark mode           | 1, 5   | SHELL-04, QA-02         |
| US-11 — Export dashboard data            | 2, 5   | COMP-05, QA-01-T10      |
  
