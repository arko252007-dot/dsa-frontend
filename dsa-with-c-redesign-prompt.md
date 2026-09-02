# Prompt: Visual Redesign Pass for "DSA with C"

Copy everything below into your coding agent (Antigravity, Claude Code, etc.) as a single instruction.

---

## Context

This is a Bootstrap-based DSA learning platform (`dsa-with-c.vercel.app`) with a dark theme. Functionally it's complete, but it's still using Bootstrap's default color system, default font stack, and default component styling (cards, badges, borders), which makes it read as generic/AI-generated rather than intentionally designed. This pass should NOT touch functionality, routing, or logic — only visual styling: colors, typography, spacing, and a few component treatments.

## 1. Replace the color system — for BOTH light and dark mode (highest priority)

The site already has a working light/dark toggle (sun/moon icon, top-right). Bootstrap's default `--bs-primary` blue (`#0d6efd`) is currently used everywhere in both modes — Sign In button, Insert Node/active states, active nav tab, focus rings, links. Replace it via CSS custom property overrides scoped to each theme, so it cascades through every Bootstrap component automatically.

**First, confirm how the toggle switches themes** — most likely Bootstrap's native `data-bs-theme="dark"` / `data-bs-theme="light"` attribute on `<html>`, but verify against the actual toggle implementation in this codebase (could instead be a custom class or React context) and adapt the selectors below accordingly. If it's `data-bs-theme`, use:

```css
[data-bs-theme="dark"] {
  --bs-primary: #d97706;              /* amber-600 */
  --bs-primary-rgb: 217, 119, 6;
  --bs-primary-text-emphasis: #fbbf24;
  --bs-link-color: var(--bs-primary);
  --bs-link-hover-color: #f59e0b;
  --bs-btn-hover-bg: #b45309;
  --bs-focus-ring-color: rgba(217, 119, 6, 0.35);

  --difficulty-easy: #22c55e;
  --difficulty-medium: #eab308;
  --difficulty-hard: #ef4444;

  --visualizer-dot: rgba(255, 255, 255, 0.04);
  --card-border-tint: rgba(217, 119, 6, 0.08);
}

[data-bs-theme="light"] {
  --bs-primary: #b45309;              /* darker amber-700 — needs more weight against white */
  --bs-primary-rgb: 180, 83, 9;
  --bs-primary-text-emphasis: #92400e;
  --bs-link-color: var(--bs-primary);
  --bs-link-hover-color: #92400e;
  --bs-btn-hover-bg: #92400e;
  --bs-focus-ring-color: rgba(180, 83, 9, 0.3);

  --difficulty-easy: #16a34a;
  --difficulty-medium: #ca8a04;
  --difficulty-hard: #dc2626;

  --visualizer-dot: rgba(15, 23, 42, 0.05);
  --card-border-tint: rgba(180, 83, 9, 0.1);
}
```

Important: don't just reuse the dark-mode amber in light mode. `#d97706` on white has noticeably weaker contrast than the same color on near-black — light mode needs the darker `#b45309`/`#92400e` shades to read with equal visual weight.

Do not use `--bs-success` / `--bs-warning` / `--bs-danger` at their Bootstrap defaults for the EASY/MED/HARD badges and category icon backgrounds — the custom `--difficulty-*` values above (with separate light/dark values) replace them so badges don't read as stock Bootstrap green/yellow/red in either mode.

Keep the existing per-visualizer accent colors (orange for Hanoi/recursion, red for trees, green for linked lists, purple for graphs, blue for hashing) — those are good and already differentiate categories. Just make sure none of them are literally `--bs-info` / `--bs-primary` defaults, and check each one still has enough contrast if the canvas/card background flips to white in light mode.

## 2. Typography

Load Geist and Geist Mono (from Google Fonts) and apply:

```css
:root {
  --bs-body-font-family: 'Geist', system-ui, sans-serif;
}

code, pre, .dry-run-panel, .code-panel, .code-block {
  font-family: 'Geist Mono', ui-monospace, monospace;
}
```

The code/dry-run panels (visible on every visualizer page — Hanoi, BST, Sorting, Linked List, Hashing, Graph) are currently rendering in the browser's default monospace. Geist Mono specifically matters here since C dry-run code is the core content on those pages.

Tighten the heading scale slightly — right now headings ("Master Data Structures & Algorithms in C", "Practice Questions", visualizer page titles) are just bold system-sans at arbitrary sizes with no real rhythm. Establish a consistent scale (e.g. h1: 2.5rem/700, h2: 1.75rem/600, h3: 1.25rem/600) and apply it consistently across Explore, Problems, and all Visualizer pages.

## 3. Bootstrap component defaults to override

- `.card` — currently flat 1px gray border, small default radius, in both modes. Increase `--bs-card-border-radius` slightly and set the border color to `var(--card-border-tint)` (defined per-theme above) instead of pure gray, so cards don't look like stock Bootstrap cards in either mode.
- `.badge` (EASY/MED/HARD pills, "Free & Open" pill, "7 MOVES"/"O(log n)" complexity badges) — keep the pill shape but confirm colors come from the custom `--difficulty-*` variables above, not Bootstrap defaults, in both themes.
- `--bs-border-radius` — currently Bootstrap's small default across buttons/inputs/cards. Pick a value and apply it deliberately (either sharper for a technical/terminal feel, or a bit larger for softness) rather than leaving it at whatever Bootstrap shipped. Same value in both modes — this is a shape choice, not a color one.
- Form inputs (Sign In fields, Insert Node value input, hashing size/value inputs) — same border-radius/border-color treatment as cards, in both modes.

## 4. Visualizer canvases (BST, Hanoi, Sorting, Linked List, Graph, Hashing)

These are currently large empty rectangles with a few small elements floating in the middle — this is the weakest visual element on the site since it's the actual product. Add a subtle background texture to the canvas container only (not the whole page) to make it read as a deliberate workspace rather than empty space, using the `--visualizer-dot` variable defined per-theme above so it stays visible in both light and dark mode:

```css
.visualizer-canvas {
  background-image: radial-gradient(circle, var(--visualizer-dot) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

Without theme-scoping this, a dot color tuned for dark mode (light-colored dots) becomes invisible on a white light-mode background, and vice versa — so this must reference the CSS variable, not a hardcoded rgba value.

## 5. Card treatment variation on the Explore/Visualizers hub

The category cards (BST & Trees, Tower of Hanoi, Sorting, Linked Lists, Graph, Hash Tables) all use an identical layout: colored rounded-square icon box + title + subtitle. This is fine as a base pattern but currently has zero variation across 6 cards, which reads as templated. Options (pick one, don't overdo it):
- Give each icon container a shape variant instead of uniform rounded-square (e.g. hexagon for graphs, circle for hashing) — subtle, not cartoonish
- Or add a faint colored background wash to each card matching its category accent, instead of pure flat dark background for all six

## Constraints

- Do not change any component logic, routing, or state management.
- Do not remove Bootstrap — override via CSS custom properties as shown above, don't rewrite components to a different framework.
- Apply changes globally via a single CSS file/section (e.g. a `theme-overrides.css` loaded after Bootstrap's CSS) rather than scattering inline styles, so it's easy to review as one diff.
- After implementing, explicitly toggle the site into light mode and check: amber contrast against white, canvas dot-grid visibility, card border visibility, and badge colors. Don't assume the dark-mode values silently work in light mode — verify each one.

---

**Summary of intended effect:** move from "default Bootstrap theme" (both light and dark) to "an amber-accented, Geist-typeset technical tool" that's deliberately tuned for both modes, without changing any functionality — colors, fonts, and a handful of component treatments only.
