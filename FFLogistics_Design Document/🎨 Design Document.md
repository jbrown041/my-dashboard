  
# 🎨 Design Document  
**Product:** FastForward Logistics — Executive Dashboard**Version:** 1.0**Date:** June 25, 2026**Status:** Draft**Author:** TBD**Stakeholders:** TBD**Related Documents:** FastForward Logistics Executive Dashboard PRD v1.0  
  
## 1. Overview  
This document defines the visual design system, layout structure, component specifications, and interaction patterns for the FastForward Logistics Executive Dashboard. It serves as the source of truth for all design decisions and is intended to guide both UI design (Figma) and front-end development (Vue 3).  
  
## 2. Design Principles  

| Principle | Description |
| ----------------------- | --------------------------------------------------------------------------------------- |
| Clarity over complexity | Every element earns its place. No decorative data or visual noise. |
| Intentional color | Color communicates meaning, not decoration. Visualizations tell a story. |
| Hierarchy first | The most critical information is immediately visible without scrolling. |
| Consistency | Uniform spacing, type scale, and component behavior throughout the entire application. |
| Performance perception | Transitions and real-time updates feel fast and fluid — never jarring or abrupt. |
| Executive readability | Designed for low-to-moderate technical users. No jargon, no clutter, no learning curve. |
  
## 3. Visual Design System  
## 3.1 Typography  
**Font Family:** Open Sans (Google Fonts)All weights used: 400 (Regular), 600 (SemiBold), 700 (Bold)  

| Role | Weight | Size | Line Height | Usage |
| -------------- | ------ | ---- | ----------- | ------------------------------ |
| Page Title | 700 | 28px | 36px | Top of each page |
| Section Header | 600 | 20px | 28px | Chart and section labels |
| Card Title | 600 | 16px | 24px | KPI card labels |
| Card Value | 700 | 32px | 40px | Primary metric numbers |
| Body | 400 | 14px | 22px | Tables, descriptions, tooltips |
| Label / Tag | 600 | 12px | 16px | Badges, status tags, legends |
| Caption | 400 | 12px | 16px | Helper text, timestamps |
  
**Type Rules:**  
* No font other than Open Sans shall be used anywhere in the application  
* Text shall never be set below 12px  
* All caps usage is limited to label/tag contexts only  
  
## 3.2 Color System  
**3.2.1 Brand Palette**  

| Name         | Hex     | RGB          |
| ------------ | ------- | ------------ |
| Teal Primary | #0095a9 | 0, 149, 169  |
| Teal Dark    | #006072 | 0, 96, 114   |
| Navy         | #011e41 | 1, 30, 65    |
| Coral        | #ea6852 | 234, 104, 82 |
  
**3.2.2 Extended Functional Palette**  

| Name          | Hex     | Usage                                            |
| ------------- | ------- | ------------------------------------------------ |
| Success Green | #2e7d5e | Positive performance, above-threshold indicators |
| Warning Amber | #d4860b | Near-threshold warnings                          |
| Neutral Gray  | #6b7280 | Secondary text, borders, disabled states         |
| Surface Light | #f5f7fa | Light mode page background                       |
| Surface Dark  | #0d1b2e | Dark mode page background                        |
| White         | #ffffff | Light mode card surface                          |
| Card Dark     | #112240 | Dark mode card surface                           |
  
**3.2.3 Color Usage Rules**  
* **Maximum 3 colors** in any single chart or data visualization  
* #ea6852 Coral is **reserved exclusively** for negative states, exceptions, and alerts  
* #0095a9 Teal is the **primary data color** for neutral or positive trends  
* #011e41 Navy is used as a **secondary data series** color only  
* #2e7d5e Green is used **only** for confirmed above-threshold performance  
* #d4860b Amber is used **only** for near-threshold warnings  
* Color shall **never** be the sole means of conveying information — always pair with a label or icon  
**3.2.4 Light / Dark Mode Tokens**  

| Token                  | Light Mode | Dark Mode |
| ---------------------- | ---------- | --------- |
| --color-bg             | #f5f7fa    | #0d1b2e   |
| --color-surface        | #ffffff    | #112240   |
| --color-text-primary   | #011e41    | #e8edf5   |
| --color-text-secondary | #6b7280    | #8899aa   |
| --color-border         | #e2e8f0    | #1e3a5f   |
| --color-nav-bg         | #011e41    | #060f1e   |
| --color-nav-text       | #ffffff    | #c8d8e8   |
| --color-nav-active     | #0095a9    | #0095a9   |
| --color-nav-hover      | #006072    | #0d2d4a   |
  
## 3.3 Spacing System  
Base unit: **8px**  

| Token     | Value | Usage                                |
| --------- | ----- | ------------------------------------ |
| --space-1 | 4px   | Tight inline spacing                 |
| --space-2 | 8px   | Component internal padding (compact) |
| --space-3 | 12px  | Component internal padding (default) |
| --space-4 | 16px  | Card padding, form fields            |
| --space-5 | 24px  | Section spacing                      |
| --space-6 | 32px  | Large section gaps                   |
| --space-7 | 48px  | Page-level vertical rhythm           |
  
## 3.4 Border & Radius  

| Token            | Value                    | Usage                       |
| ---------------- | ------------------------ | --------------------------- |
| --radius-sm      | 4px                      | Tags, badges, small chips   |
| --radius-md      | 8px                      | Cards, inputs, dropdowns    |
| --radius-lg      | 12px                     | Modals, drawers, panels     |
| --border-default | 1px solid --color-border | Cards, table rows, dividers |
  
## 3.5 Elevation & Shadow  

| Level    | Value                         | Usage                      |
| -------- | ----------------------------- | -------------------------- |
| Flat     | none                          | Default card state         |
| Raised   | 0 2px 8px rgba(1,30,65,0.08)  | Hovered cards              |
| Floating | 0 8px 24px rgba(1,30,65,0.12) | Drawers, modals, dropdowns |
  
## 3.6 Iconography  
* **Library:** Lucide Vue Next  
* **Style:** Outline only — no filled icons  
* **Sizes:**  
    * 20px — Standard (nav, cards, buttons)  
    * 16px — Inline / compact (tables, tags, tooltips)  
    * 24px — Emphasized (empty states, notification panel header)  
* **Color:** Inherits from surrounding text token unless used as a status indicator  
* **Status icon colors:**  
    * Success: #2e7d5e  
    * Warning: #d4860b  
    * Error / Exception: #ea6852  
    * Neutral: #6b7280  
  
## 3.7 Motion & Transitions  

| Interaction | Property | Duration | Easing |
| ------------------------ | ---------------------------------------- | -------- | -------- |
| Card hover | box-shadow, transform: translateY(-2px) | 150ms | ease |
| Nav item hover | background-color | 120ms | ease |
| Button / icon hover | opacity or color | 120ms | ease |
| Chart load | opacity + transform: translateY(8px) → 0 | 300ms | ease-out |
| Light / dark mode toggle | All color tokens | 250ms | ease |
| Notification panel open | transform: translateX slide from right | 200ms | ease-out |
| Drawer open | transform: translateX slide from right | 250ms | ease-out |
| Drawer close | transform: translateX slide to right | 200ms | ease-in |
| Tooltip appear | opacity fade in | 100ms | ease |
| Page transition | opacity fade | 150ms | ease |
  
**Motion Rules:**  
* No animation shall exceed 300ms  
* Animations shall be disabled for users with prefers-reduced-motion enabled  
* Loading states use a subtle skeleton shimmer, not spinners  
  
## 4. Layout & Navigation  
## 4.1 Application Shell  
   
```
┌────────────────────────────────────────────────────────────────┐
│  Top Bar (64px fixed height)                                   │
│  [Logo]                    [Notifications] [Toggle] [Avatar]   │
├─────────────────┬──────────────────────────────────────────────┤
│                 │                                              │
│   Side Nav      │   Main Content Area                         │
│   (240px fixed) │   (scrollable, padding: 32px)               │
│                 │                                              │
│                 │                                              │
│                 │                                              │
└─────────────────┴──────────────────────────────────────────────┘

```
## 4.2 Top Bar  
* **Height:** 64px, fixed  
* **Background:** --color-surface  
* **Border Bottom:** --border-default  
* **Left:** FastForward Logistics logo + wordmark  
* **Right (left to right):** Notification bell with badge → Light/Dark toggle → User avatar + display name  
* **Shadow:** Flat (no shadow) — border provides separation  
## 4.3 Side Navigation  
* **Width:** 240px, fixed, full viewport height  
* **Background:** --color-nav-bg  
* **Top:** Logo area (64px, aligns with top bar)  
* **Nav Items:** Icon + label, stacked vertically with 4px gap  
* **Active State:** Teal left border (3px) + teal text + teal icon  
* **Hover State:** Background fill transition (120ms)  
* **Bottom:** Version number or app label (optional, caption size)  
**Navigation Items**  

| Icon (Lucide)   | Label                | Route       |
| --------------- | -------------------- | ----------- |
| LayoutDashboard | Overview             | /dashboard  |
| Package         | Shipments            | /shipments  |
| Truck           | Carrier Performance  | /carriers   |
| MapPin          | Regional Performance | /regional   |
| AlertTriangle   | Exceptions           | /exceptions |
  
****4.4 Main Content Area****  
* **Left offset:** 240px (side nav width)  
* **Top offset:** 64px (top bar height)  
* **Padding:** 32px all sides  
* **Max content width:** 1440px (centered for very large screens)  
* **Scroll:** Vertical scroll only; side nav and top bar remain fixed  
## 4.5 Page Header Pattern  
Every page follows this consistent header structure:  
   
```
[Page Title]                              [Time Range Filter] [Export Button]
[Page subtitle / description — optional]
──────────────────────────────────────────────────────────────────

```
  
## 5. Component Specifications  
## 5.1 KPI Summary Card  
**Purpose:** Display a single key metric with context  
**Anatomy:**  
   
```
┌─────────────────────────────┐
│  [Icon]   CARD LABEL        │
│                             │
│  000,000                    │
│  ↑ +12.4% vs prior period   │
└─────────────────────────────┘

```

| Property         | Value                          |
| ---------------- | ------------------------------ |
| Width            | Fluid (25% of row, minus gaps) |
| Height           | 120px                          |
| Background       | --color-surface                |
| Border           | --border-default               |
| Border Radius    | --radius-md                    |
| Padding          | --space-4 (16px)               |
| Shadow (default) | Flat                           |
| Shadow (hover)   | Raised                         |
| Hover transition | 150ms ease                     |
  
**Content Specs:**  
* **Label:** 12px, SemiBold, --color-text-secondary, all caps  
* **Value:** 32px, Bold, --color-text-primary  
* **Delta:** 12px, SemiBold — Green + ↑ for positive, Coral + ↓ for negative, Gray for neutral  
* **Icon:** 20px, outline, --color-text-secondary  
  
## 5.2 Time Range Filter  
**Purpose:** Global filter controlling the time window for all data  
**Style:** Segmented control (pill group)  

| Property         | Value                                          |
| ---------------- | ---------------------------------------------- |
| Options          | Today · Last 7 Days · Last 30 Days · Last Year |
| Default          | Last 30 Days                                   |
| Active segment   | Teal background (#0095a9), white text          |
| Inactive segment | --color-surface, --color-text-secondary        |
| Border           | --border-default                               |
| Border Radius    | --radius-sm                                    |
| Font             | 13px, SemiBold                                 |
| Transition       | Background color, 120ms ease                   |
  
## 5.3 Charts  
**General Chart Rules**  
* All charts use **Apache ECharts** via vue-echarts  
* Chart containers have a minimum height of **280px**  
* All charts include a **title** (section header size) and **subtitle** (caption size) above  
* All charts animate on load (fade + translate, 300ms ease-out)  
* All charts display a **tooltip** on hover  
* Gridlines are subtle: --color-border at 50% opacity  
* Axis labels use caption size, --color-text-secondary  
* No chart background fill — inherits --color-surface  
* Legend positioned below chart, centered, label size  
**Chart Type Specifications**  
**Line Chart** — Shipment Volume Over Time, On-Time Rate Trend, Exceptions Over Time  

| Property              | Value                                    |
| --------------------- | ---------------------------------------- |
| Primary line color    | #0095a9 Teal                             |
| Comparison line color | #011e41 Navy (dashed)                    |
| Line weight           | 2.5px                                    |
| Data point dot        | 5px radius, filled, appears on hover     |
| Area fill             | Teal at 10% opacity beneath primary line |
| Tooltip               | Date + value, floating card style        |
  
**Stacked Bar Chart** — Shipments by Status  

| Property | Value |
| ----------- | ----------------------------------------------------------------------------- |
| Orientation | Horizontal |
| Colors | In Transit: #0095a9, Delivered: #2e7d5e, Delayed: #d4860b, Exception: #ea6852 |
| Bar radius | 4px on terminal end |
| Tooltip | Shows all segment values on hover |
  
**Grouped Bar Chart** — Carrier Comparison, Regional Comparison  

| Property          | Value                                 |
| ----------------- | ------------------------------------- |
| Orientation       | Vertical                              |
| Max series colors | 3 (#0095a9, #011e41, #6b7280)         |
| Bar gap           | 4px within group, 16px between groups |
| Bar radius        | --radius-sm on top                    |
| Tooltip           | Group label + all series values       |
  
**Choropleth Map** — Regional Performance  

| Property          | Value                                               |
| ----------------- | --------------------------------------------------- |
| Library           | D3.js                                               |
| Region fill scale | Green (#2e7d5e) → Amber (#d4860b) → Coral (#ea6852) |
| Region stroke     | --color-surface, 1.5px                              |
| Hover state       | Region brightens + tooltip appears                  |
| Tooltip           | Region name, Volume, On-Time Rate, Exceptions       |
| No data state     | --color-border fill with "No data" tooltip          |
  
**Multi-Line Chart** — Carrier On-Time Rate Over Time  

| Property    | Value                                              |
| ----------- | -------------------------------------------------- |
| Max lines   | 5                                                  |
| Colors      | Teal, Navy, Amber, Green, Gray (in order)          |
| Line weight | 2px                                                |
| Legend      | Below chart, interactive (click to show/hide line) |
  
## 5.4 Data Table  
**Purpose:** Display paginated, detailed records  

| Property             | Value                                             |
| -------------------- | ------------------------------------------------- |
| Header background    | --color-bg                                        |
| Header text          | 12px, SemiBold, --color-text-secondary, all caps  |
| Row height           | 48px                                              |
| Row border           | Bottom border, --border-default                   |
| Row hover            | --color-bg background fill, 120ms ease            |
| Clickable row cursor | pointer                                           |
| Pagination           | Previous / Next + page count, bottom right        |
| Rows per page        | 10 (default)                                      |
| Sort                 | Clickable column headers with sort indicator icon |
| Empty state          | Centered illustration + message (see 5.7)         |
  
**Status Tags (used in tables):**  

| Status     | Background             | Text Color |
| ---------- | ---------------------- | ---------- |
| Delivered  | #2e7d5e at 12% opacity | #2e7d5e    |
| In Transit | #0095a9 at 12% opacity | #0095a9    |
| Delayed    | #d4860b at 12% opacity | #d4860b    |
| Exception  | #ea6852 at 12% opacity | #ea6852    |
  
## 5.5 Detail Drawer  
**Purpose:** Slide-in panel for exception or region detail without leaving the page  

| Property        | Value                                              |
| --------------- | -------------------------------------------------- |
| Width           | 480px                                              |
| Position        | Fixed, right side, full viewport height            |
| Background      | --color-surface                                    |
| Shadow          | Floating                                           |
| Border Left     | --border-default                                   |
| Open animation  | Slide from right, 250ms ease-out                   |
| Close animation | Slide to right, 200ms ease-in                      |
| Overlay         | Semi-transparent backdrop (#011e41 at 30% opacity) |
| Close trigger   | X button (top right) or clicking backdrop          |
  
**Drawer Header:**  
* Title (Section Header size)  
* Subtitle / ID (Caption size, --color-text-secondary)  
* Close icon button (top right, 20px)  
* Bottom border separating header from body  
  
## 5.6 Notification Panel  
**Purpose:** In-app alert center accessible from the top bar  

| Property          | Value                                     |
| ----------------- | ----------------------------------------- |
| Width             | 380px                                     |
| Position          | Fixed, drops from top bar (right-aligned) |
| Background        | --color-surface                           |
| Shadow            | Floating                                  |
| Border            | --border-default                          |
| Open animation    | Slide from top-right, 200ms ease-out      |
| Max visible items | 8 (scrollable beyond)                     |
  
**Notification Item:**  
* Icon (16px, status-colored) + title (14px, SemiBold)  
* Description (12px, --color-text-secondary)  
* Timestamp (12px, --color-text-secondary, right-aligned)  
* Unread indicator: Teal left border (3px) + slightly elevated background  
* Read indicator: No border, default background  
* Hover: Subtle background fill  
**Panel Header:**  
* "Notifications" label (Section Header)  
* "Mark all as read" link (right-aligned, Teal, 13px)  
  
## 5.7 Empty & Loading States  
**Loading State (Skeleton):**  
* Skeleton shimmer replaces content while data loads  
* Shimmer uses --color-border animated gradient  
* KPI cards: Skeleton block matching card dimensions  
* Charts: Skeleton rectangle at chart height  
* Tables: 5 skeleton rows  
**Empty State:**  
* Centered in the content area  
* Outline icon (24px, --color-text-secondary)  
* Primary message (Body, --color-text-primary)  
* Secondary message (Caption, --color-text-secondary)  
* No action buttons (read-only application)  
**Error State:**  
* Coral icon (AlertCircle, 24px)  
* "Unable to load data" message  
* "Try refreshing the page" caption  
* Displayed inline within the affected card or chart  
  
## 5.8 Export Button  

| Property | Value |
| -------- | ------------------------------------------------------------------- |
| Position | Top right of page header, alongside time range filter |
| Style | Outline button (border: --color-border, text: --color-text-primary) |
| Icon | Download (Lucide, 16px) |
| Label | "Export" |
| On click | Dropdown with two options: "Export as PDF" and "Export as CSV" |
| Hover | Border color shifts to #0095a9, text shifts to #0095a9 |
  
## 6. Page-Level Design Specs  
## 6.1 Overview Page (/dashboard)  
**Layout:**  
   
```
Page Header (Title + Time Filter + Export)
─────────────────────────────────────────
KPI Cards Row (4 cards, equal width)
─────────────────────────────────────────
[Shipment Volume Line Chart]  [On-Time Rate Area Chart]
         (60% width)                  (40% width)
─────────────────────────────────────────
[Regional Snapshot Cards]     [Exception Summary Widget]
         (60% width)                  (40% width)
─────────────────────────────────────────

```
**Component Details:**  
* KPI Cards: Total Shipments, On-Time Delivery Rate, Active Carriers, Open Exceptions  
* Shipment Volume chart: Line chart, current vs. prior period  
* On-Time Rate chart: Area chart with a dashed target threshold line  
* Regional Snapshot: Condensed region cards (no map), "View Full Report →" link  
* Exception Summary Widget: Category counts with coral accents, "View All →" link  
  
## 6.2 Shipments Page (/shipments)  
**Layout:**  
   
```
Page Header (Title + Time Filter + Export)
─────────────────────────────────────────
KPI Card (Total Shipments, full width strip)
─────────────────────────────────────────
[Shipment Volume Line Chart]  [Shipments by Status Stacked Bar]
         (60% width)                  (40% width)
─────────────────────────────────────────
[Volume by Region Bar Chart — full width]
─────────────────────────────────────────
[Shipments Data Table — full width]
─────────────────────────────────────────

```
  
## 6.3 Carrier Performance Page (/carriers)  
**Layout:**  
   
```
Page Header (Title + Time Filter + Export)
─────────────────────────────────────────
Carrier Scorecard Cards Row (fluid, wrapping)
─────────────────────────────────────────
[Carrier Comparison Grouped Bar]  [On-Time Rate Multi-Line Chart]
         (50% width)                      (50% width)
─────────────────────────────────────────
[Carrier Rankings Table — full width]
─────────────────────────────────────────

```
**Carrier Scorecard Card:**  
* Carrier name (Card Title)  
* On-Time Rate (large value)  
* Total Shipments + Incident Count (secondary metrics)  
* Trend arrow (up/down, colored)  
* Flagged state: Coral left border + coral badge "Below Benchmark"  
  
## 6.4 Regional Performance Page (/regional)  
**Layout:**  
   
```
Page Header (Title + Time Filter + Export)
─────────────────────────────────────────
[U.S. Choropleth Map — full width, 420px height]
─────────────────────────────────────────
Region Performance Cards Row (5 cards, equal width)
─────────────────────────────────────────
[Regional Comparison Bar Chart — full width]
─────────────────────────────────────────

```
**Region Detail Drawer** (triggered by map click or card click):  
* Region name + performance score  
* Shipment Volume  
* On-Time Rate  
* Top Carrier  
* Open Exceptions count  
* Exceptions by type (mini bar)  
  
## 6.5 Exceptions Page (/exceptions)  
**Layout:**  
   
```
Page Header (Title + Time Filter + Export)
─────────────────────────────────────────
Exception Summary Bar (category count badges — full width)
─────────────────────────────────────────
[Exceptions Over Time Line Chart]  [Exceptions by Region Bar Chart]
         (60% width)                       (40% width)
─────────────────────────────────────────
[Exceptions Data Table — full width]
─────────────────────────────────────────

```
**Exception Detail Drawer** (triggered by table row click):  
* Exception ID + type badge  
* Shipment ID (linked label)  
* Carrier, Region, Date Opened, Days Open, Status  
* Status uses tag component (colored per status)  
  
## 7. Responsiveness  
The MVP targets desktop-first at **1280px minimum width.** The following breakpoint behavior applies:  

| Breakpoint | Behavior |
| --------------- | -------------------------------------------------------------- |
| ≥ 1440px | Max content width capped at 1440px, centered |
| 1280px – 1439px | Full fluid layout, all columns as specified |
| 1024px – 1279px | Side nav collapses to icon-only (40px wide), tooltips on hover |
| < 1024px | Out of scope for MVP — graceful degradation only |
  
## 8. Accessibility  

| Standard | Requirement |
| ------------------- | ------------------------------------------------------------- |
| Color contrast | All text meets WCAG AA (4.5:1 for body, 3:1 for large text) |
| Keyboard navigation | All interactive elements reachable and operable via keyboard |
| Focus states | Visible focus ring on all interactive elements (Teal outline) |
| Screen reader | Semantic HTML, ARIA labels on icons and charts |
| Motion | All animations respect prefers-reduced-motion |
| Color dependency | Color is never the sole means of conveying information |
  
## 9. Tech Stack Reference  

| Layer | Technology | Notes |
| ---------------- | ------------------------------ | ------------------------------------------------- |
| Framework | Vue 3 (Composition API) |  |
| Routing | Vue Router | Named routes per page |
| State Management | Pinia | Global store for time range, theme, notifications |
| Charts | Apache ECharts via vue-echarts |  |
| Map | D3.js | U.S. choropleth |
| Icons | Lucide Vue Next | Outline style only |
| Styling | Tailwind CSS | Custom design tokens via tailwind.config.js |
| Fonts | Open Sans via Google Fonts |  |
| Auth | Stubbed session for MVP | Pre-authenticated user object in Pinia store |
| Data | Mock JSON for MVP | Service layer abstracted for future API swap |
  
## 10. Open Design Questions  

| # | Question | Owner | Status |
| ----- | -------------------------------------------------------------------------------------------------------------------- | --------------- | ------ |
| DQ-01 | Should the FastForward Logistics logo be provided as an SVG asset, or should a placeholder wordmark be used for MVP? | Stakeholders | Open |
| DQ-02 | Are there defined U.S. region groupings to confirm the map boundaries? | Operations Team | Open |
| DQ-03 | Should the side nav be collapsible by the user, or always fixed at 240px? | Stakeholders | Open |
| DQ-04 | Should dark mode preference be stored in local storage to persist across sessions? | Engineering | Open |
| DQ-05 | What is the maximum number of carriers expected in the system? This affects the multi-line chart design. | Operations Team | Open |
  
