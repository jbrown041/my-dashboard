## 🚨 Never Upload Secrets

- Do not store API keys or `.env` in repo.
- Use `.env.example` with placeholders.
- If a secret is leaked: rotate credentials, purge history, notify team.

---

## Project-Specific Rules

### Read-Only Application
- This application is **strictly read-only**. Never implement any write, create, update, or delete operations against data.
- No forms that submit data. No mutation endpoints.

### Color Rules (Strictly Enforced)
- **Coral `#ea6852`** — reserved ONLY for negative states, exceptions, and alerts. Never use for anything neutral or positive.
- **Max 3 colors** in any single chart or data visualization.
- Color must **never** be the sole means of conveying information — always pair with a label or icon (accessibility requirement).
- Do not introduce any colors outside the defined brand/functional palette.

### Component Rules
- All icons must use **Lucide Vue Next**, outline style only. No filled icons. No other icon libraries.
- Only **Open Sans** (400, 600, 700) may be used. No other fonts. No text below 12px.
- All caps text is limited to Label/Tag contexts only.
- All animations must respect `prefers-reduced-motion` — the global CSS rule disables them.
- No animation may exceed 300ms duration.

### State Management Rules
- Time range is **global state** (useTimeRangeStore). All charts, cards, and tables must watch it and update when it changes. Never hardcode a time range in a component.
- Theme is **global state** (useThemeStore). Applied via `dark` class on `<html>`. Never toggle colors manually in components.

### Data / Service Layer Rules
- All data access must go through `/services/` — never import mock JSON directly in components or pages.
- The service layer uses async/await to mirror a real API. This makes the future swap to a real API a services-only change.
- No sensitive data or raw API endpoints exposed in the browser client.

### Chart Rules (ECharts)
- All charts use Apache ECharts via `vue-echarts`. No other charting library except D3.js for the choropleth map.
- Every chart must have: a skeleton loading state, an inline error state, and a tooltip on hover.
- Charts must animate on load (opacity + translateY, 300ms ease-out) — disabled when `prefers-reduced-motion` is active.

### Detail Drawer Rules
- Scroll position of the underlying data table **must be preserved** when a drawer is closed (FR-E08 / US-08 AC-03). This is a hard requirement — test it.

### Error Handling
- All data fetch failures must show a user-friendly inline error state (Coral AlertCircle + message). Never surface raw errors or stack traces to the user.

### Accessibility
- All interactive icon-only buttons must have ARIA labels (close button, theme toggle, notification bell).
- All chart containers must have ARIA labels and roles.
- All interactive elements must be keyboard navigable with visible focus rings.
- Minimum WCAG AA color contrast on all text/background combinations.
