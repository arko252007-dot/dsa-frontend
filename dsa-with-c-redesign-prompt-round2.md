# Prompt: Round Two — Shape, Palette Discipline & Texture

Copy everything below into your coding agent (Antigravity, Claude Code, etc.) as a single instruction.

---

## Context

Round one already replaced Bootstrap's default blue with an amber primary color and switched typography to Geist/Geist Mono — that part is done and looks good. This round is NOT about color choice, it's about shape/geometry consistency, disciplining the one remaining palette issue (the card accent stripes), and finishing the visualizer canvas texture. Styling only — do not touch component logic or routing.

## 1. Narrow the category card accent stripe palette

The six hub cards (BST & Trees, Tower of Hanoi, Sorting, Linked Lists, Graph, Hash Tables) currently each get a different colored top border/stripe — red, orange, yellow, green, purple, cyan. Six unrelated hues in a row reads as "pick a different color per item" default behavior rather than a designed palette, even though each individual color looks fine on its own.

Pick ONE of these two directions — don't leave it as-is:

**Option A — single accent, differentiate by icon only (recommended, calmer/more premium):**
```css
.category-card {
  border-top: 3px solid var(--bs-primary); /* same amber on every card */
}
/* icon color stays per-category as it already is — that's enough differentiation */
```

**Option B — keep multi-color but constrain to a deliberate 3-color family:**
Pick three hues that relate to each other (e.g. amber, terracotta/red, and one cool contrast like teal) and cycle only through those three across the six cards, instead of six different hues. Do not use raw Bootstrap default `--bs-danger`/`--bs-success`/`--bs-info`/`--bs-warning` values for these — define custom hex values, same approach as the difficulty badges.

If unsure which to pick, use Option A — it's the safer, more consistently "intentional" look and requires less ongoing palette maintenance as more visualizers get added.

## 2. Shape and geometry pass

Color is fixed, but Bootstrap's default shape language is still untouched (card corner radius, pill-shaped nav tabs, input field radius, button radius) — this is now a stronger "unedited default" signal than color was. Pick ONE consistent geometric personality and apply it site-wide:

- **Sharper/technical direction:** reduce `--bs-border-radius` to 4-6px across cards, buttons, inputs, and the active-tab pill in the top nav. Pairs well with the monospace code panels and reinforces a "developer tool" feel.
- **Softer direction:** increase `--bs-border-radius` to 12-16px and make it consistent everywhere (cards, buttons, the Sign In panel, inputs) rather than the current default which varies slightly per Bootstrap component.

Either is fine — what matters is that every corner on the page (cards, buttons, tabs, the Sign In form panel, badges except pills) uses the same radius value, so it reads as one decision rather than each component's individual Bootstrap default.

Also check the top nav tab selector ("Explore" pill) — confirm its shape/radius matches whatever direction you picked, since right now it's likely still Bootstrap's default pill regardless of what the cards below it do.

## 3. Confirm the visualizer canvas texture landed

If the dot-grid background from round one (`.visualizer-canvas` radial-gradient) hasn't been applied yet, prioritize it now — the visualizer canvases (Hanoi, BST, Sorting, Linked List, Graph, Hashing) are still large empty rectangles and are the part of the site people actually spend the most time looking at. An empty canvas reads as unfinished regardless of how polished the buttons and cards around it are.

```css
.visualizer-canvas {
  background-image: radial-gradient(circle, var(--visualizer-dot) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

Use the theme-scoped `--visualizer-dot` variable (light-mode dots, dark-mode dots) rather than a single hardcoded value, so it stays visible in both modes.

## 4. Spacing rhythm on the hub page

The current layout is a plain equal-width flex/grid row of six cards with uniform gaps — functionally fine, but it's the default "put N cards in a grid" output with no considered rhythm. Optional, lower priority than 1-3 above, but if there's room: introduce slight intentional asymmetry, e.g. make the "Browse All Visualizers" card/link visually distinct in size or treatment rather than matching the six category cards, so the eye has a clear entry point rather than seven identical-weight elements.

## Constraints

- Do not touch component logic or routing — styling only.
- Whichever stripe-palette option and shape direction you pick, apply consistently across every page that has cards, buttons, or nav tabs — not just the Explore hub. Check Problems, Visualizers, and the individual visualizer pages too.
- Re-check both light and dark mode after each change — border radius is mode-independent, but any new colors chosen under Option B need both-mode values.

---

**Summary of intended effect:** collapse the six-color card stripe into a single deliberate palette decision, apply one consistent shape language site-wide instead of Bootstrap's default per-component radii, and make sure the visualizer canvases — the actual product — don't read as empty placeholders.
