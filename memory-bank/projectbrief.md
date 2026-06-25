# Project Brief

## Project
**FastForward Logistics — Executive Dashboard**
Version 1.0 | Started June 25, 2026 | Status: Active Development

## Goal
Build an internal, authenticated, read-only web dashboard that gives C-suite leaders at FastForward Logistics a single source of truth for key operational metrics — real-time, browser-accessible, no technical training required.

## Problem Being Solved
Executives currently rely on disparate systems, manual reports, and delayed data. This creates blind spots, slows response to operational issues, and limits fast data-driven decisions.

## Target Users
~20 C-suite executives (CEO, COO, CFO, etc.). Low-to-moderate technical proficiency. Read-only access. Pre-authenticated on load.

## Core Features (MVP)
- Overview dashboard with KPI cards (Total Shipments, On-Time Delivery Rate, Active Carriers, Open Exceptions)
- Shipments page — volume trends, status breakdown, regional breakdown, data table
- Carrier Performance page — scorecards, comparison chart, rankings table
- Regional Performance page — U.S. choropleth map, region cards, drill-down drawer
- Exceptions page — summary by category, trend chart, data table, detail drawer
- Global time range filter: Today / Last 7 Days / Last 30 Days / Last Year
- In-app notifications for threshold breaches
- Light and dark mode
- PDF and CSV export on every page

## Out of Scope (MVP)
Login/auth UI, write operations, mobile native app, custom alert thresholds, multi-language, RBAC, historical data beyond 1 year

## Success Metrics
| Metric | Target |
|---|---|
| Dashboard adoption | 100% of ~20 users within 30 days |
| Time-to-insight | Key question answered in under 60 seconds |
| Exception visibility | 100% of open exceptions surfaced |
| Data freshness | ≤60 second refresh lag |
| User satisfaction | >80% positive in post-launch survey |

## Key Dependencies & Open Questions
- Real-time data API/source not yet defined (OQ-03)
- Notification thresholds not yet defined by stakeholders (OQ-01, OQ-04)
- U.S. regional boundaries not yet confirmed (OQ-02)
- Authentication handled externally — dashboard assumes valid session on load

## Sprint Plan Summary
| Sprint | Focus | Points |
|---|---|---|
| Sprint 0 | Foundation, design tokens, mock data, Pinia stores | 44 |
| Sprint 1 | App shell, nav, layout, theme toggle | 38 |
| Sprint 2 | Shared components + Overview page | 72 |
| Sprint 3 | Shipments + Carrier Performance pages | 45 |
| Sprint 4 | Regional Performance + Exceptions pages | 60 |
| Sprint 5 | QA, accessibility, polish | 47 |
| **Total** | | **306** |