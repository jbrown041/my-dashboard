# Active Context

## Current Status
**Planning complete. No code exists yet. Ready to begin Sprint 0.**

## What Was Just Completed
- PRD v1.0 finalized (all functional requirements, user stories, acceptance criteria)
- Design Document v1.0 finalized (full design system: typography, color, spacing, components, page layouts)
- Sprint Plan v1.0 finalized (6 sprints, 306 total story points, full task breakdown)
- Memory bank populated from planning docs
- Workspace structure consolidated (`memory-bank/` and `.github/` moved into `my-dashboard/`)

## Immediate Next Step
**Begin Sprint 0 — INFRA-01: Project Scaffolding**

Sprint 0 tasks in order:
1. `INFRA-01` — Initialize Vue 3 + Vite project, install all dependencies, configure folder structure, ESLint/Prettier
2. `DS-01` — Define all design tokens in `tailwind.config.js` and global CSS
3. `DS-02` — Create all mock JSON data files and mock service layer
4. `DS-03` — Create all four Pinia stores

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