# Product Context

## Why This Project Exists
FastForward Logistics has no centralized operational view for leadership. Executives piece together business health from multiple disconnected systems and manual reports — creating decision lag, blind spots, and missed operational issues.

## What It Delivers
A read-only, real-time web dashboard purpose-built for non-technical C-suite users. Everything critical visible in under 60 seconds, from any browser, with no training needed.

## User Experience Goals
- **Zero learning curve** — Every screen must be self-explanatory. No logistics or data background assumed.
- **Information hierarchy** — Most critical data above the fold. Nothing buried.
- **Speed of insight** — A user should be able to answer any key operational question in under 60 seconds.
- **Trust through consistency** — Data freshness ≤60s, uniform behavior across all pages, no surprises.

## Pages & Their Purpose
| Page | Route | Purpose |
|---|---|---|
| Overview | /dashboard | Single-screen business health snapshot |
| Shipments | /shipments | Volume trends, status breakdown, full shipment table |
| Carrier Performance | /carriers | Scorecard, comparison, rankings — identify under-performers |
| Regional Performance | /regional | U.S. map + region cards + drill-down drawer |
| Exceptions | /exceptions | All open exceptions by category + detail drawer |

## Design Philosophy
- Clarity over complexity — every element earns its place
- Intentional color — color communicates status, never decoration
- Hierarchy first — critical info immediately visible
- Performance perception — transitions feel fast, never jarring
- Executive readability — no jargon, no clutter

## Key User Assumptions
- Users are pre-authenticated — login UI is out of scope
- ~20 concurrent users max
- Desktop-only (1280px minimum width)
- Business hours primary usage
- English only for MVP