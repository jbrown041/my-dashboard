# Tech Context

## Core Stack
| Technology | Version / Notes |
|---|---|
| Vue 3 | Composition API — primary framework |
| Vite | Build tool — `npm create vue@latest` |
| Vue Router | Named routes for all 5 pages |
| Pinia | State management |
| Tailwind CSS | Utility-first styling |
| Apache ECharts | All charts via `vue-echarts` wrapper |
| D3.js | U.S. choropleth map (Regional page only) |
| Lucide Vue Next | Icon library — outline style only |
| Open Sans | Google Fonts — 400, 600, 700 weights only |

## Export Libraries (to evaluate)
- PDF export: `html2pdf.js` or `jsPDF` (decision deferred to COMP-05)
- CSV export: manual generation from data arrays

## Project Structure
```
src/
  components/    — Reusable UI components
  pages/         — One file per route (OverviewPage, ShipmentsPage, etc.)
  stores/        — Pinia stores
  composables/   — Shared composition functions
  assets/        — Static assets, global CSS
  data/          — Mock JSON data files
  services/      — Mock service layer (async/await, mirrors real API shape)
```

## Pinia Stores
| Store | Purpose |
|---|---|
| `useAuthStore` | Stubbed pre-authenticated user (name, avatar, role) |
| `useTimeRangeStore` | Global time range state — default: Last 30 Days |
| `useThemeStore` | Light/dark mode state — default: light |
| `useNotificationStore` | Notifications array, unread count, mark-as-read actions |

## Tailwind Configuration
- All design tokens defined in `tailwind.config.js`: brand colors, functional palette, spacing scale, border radius, shadows, typography scale
- Dark mode strategy: `class` (toggled via `dark` class on `<html>`)
- CSS custom properties for light/dark tokens (`--color-bg`, `--color-surface`, etc.) in global CSS

## Browser Support
Latest 2 versions of: Chrome, Firefox, Safari, Edge

## Minimum Screen Width
1280px (desktop only for MVP)

## Non-Functional Constraints
- Initial load: <3 seconds on standard broadband
- Data refresh lag: ≤60 seconds
- No raw API endpoints or sensitive data exposed in the browser client
- All errors handled gracefully with user-friendly error states (no raw stack traces)

## Development Setup (once scaffolded)
```bash
npm install
npm run dev
```

## Code Quality
- ESLint + Prettier configured with agreed code style rules
- `prefers-reduced-motion` global rule applied to disable all animations for accessibility