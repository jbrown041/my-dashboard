# System Patterns

## Application Shell
Fixed layout: 64px top bar + 240px fixed side nav + scrollable main content area.
- Top bar: logo (left), notification bell → theme toggle → user avatar (right)
- Side nav: icon + label items, teal active state (left border + teal text/icon), 120ms hover transition
- Main content: 32px padding, 1440px max-width centered, vertical scroll only

## Navigation Routes
| Label | Route | Lucide Icon |
|---|---|---|
| Overview | /dashboard | LayoutDashboard |
| Shipments | /shipments | Package |
| Carrier Performance | /carriers | Truck |
| Regional Performance | /regional | MapPin |
| Exceptions | /exceptions | AlertTriangle |

## Page Header Pattern
Every page uses the same header structure:
```
[Page Title]                    [Time Range Filter]  [Export Button]
[Optional subtitle]
────────────────────────────────────────────────────────────
```

## Global State Patterns
- **Time range** is global Pinia state — all charts/cards/tables watch `useTimeRangeStore` and re-fetch/recompute when it changes
- **Theme** is applied as `dark` class on `<html>` — Tailwind dark mode handles all token switches
- **Auth** is a stub — `useAuthStore` provides user name, avatar, role only

## Data Flow Pattern
```
Mock JSON files → /services (async mock layer) → Pinia stores or component-local state → Components
```
The service layer mirrors a real API interface so swapping to a live API later requires only changing the service files — components and stores remain unchanged.

## Reusable Components (key ones)
| Component | Used By |
|---|---|
| `KpiCard.vue` | Overview, Shipments |
| `DataTable.vue` | Shipments, Carriers, Exceptions |
| `DetailDrawer.vue` | Exceptions (exception detail), Regional (region drill-down) |
| `TimeRangeFilter.vue` | All pages (via PageHeader) |
| `ExportButton.vue` | All pages (via PageHeader) |
| `PageHeader.vue` | All pages |
| `StatusTag.vue` | DataTable rows |

## Chart Patterns
- All charts: Apache ECharts via `vue-echarts`
- Exception: U.S. choropleth map uses D3.js
- All charts animate on load (opacity + translateY, 300ms ease-out)
- All charts have skeleton loading state and inline error state
- Charts re-render when time range changes (watch store)
- Chart containers: minimum 280px height, no background fill

## Color Semantics (enforced across all charts and UI)
| Color | Hex | Reserved For |
|---|---|---|
| Teal | #0095a9 | Primary/neutral/positive data |
| Navy | #011e41 | Secondary data series only |
| Coral | #ea6852 | **ONLY** negative states, exceptions, alerts |
| Green | #2e7d5e | **ONLY** confirmed above-threshold performance |
| Amber | #d4860b | **ONLY** near-threshold warnings |
| Gray | #6b7280 | Secondary text, borders, disabled |

**Rule:** Max 3 colors per chart. Color is never the sole indicator — always pair with label or icon.

## Light / Dark Mode Pattern
- CSS custom properties (`--color-bg`, `--color-surface`, etc.) defined in global CSS
- Tailwind `dark:` classes used for all component color switches
- 250ms ease transition applied to all color tokens on toggle
- `prefers-reduced-motion` disables all animations globally

## Loading & Error States
- **Loading:** Skeleton shimmer (never spinners) — KPI cards, charts, and tables all have defined skeleton shapes
- **Empty:** Centered outline icon + primary + secondary message, no action buttons
- **Error:** Coral AlertCircle icon + "Unable to load data" + "Try refreshing the page" — inline within affected component

## Notification Trigger Logic
Notifications fire (computed from data) when:
1. Open exception count increases by >10% within a period
2. On-time delivery rate drops below defined threshold (TBD by stakeholders)
3. A carrier's performance falls below defined benchmark (TBD by stakeholders)

## Detail Drawer Pattern
- 480px wide, fixed right, full viewport height
- Slide in from right (250ms ease-out), slide out to right (200ms ease-in)
- Semi-transparent backdrop (`#011e41` at 30% opacity)
- Close via X button or backdrop click
- **Scroll position of underlying table must be preserved on close** (FR-E08, US-08 AC-03)