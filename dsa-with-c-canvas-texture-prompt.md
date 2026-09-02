# Prompt: Visualizer Canvas Texture

Copy everything below into your coding agent (Antigravity, Claude Code, etc.) as a single instruction.

---

## Context

Color, typography, card stripe palette, and shape consistency have all been addressed in prior passes. One item remains: the visualizer canvases (Tower of Hanoi, BST, Sorting, Linked List, Graph, Hashing) are still large empty rectangles above/around the actual visualization elements (pegs, nodes, bars, table cells). This is the part of the site people spend the most time looking at, so it's the highest-value remaining fix. Styling only — do not touch visualization logic, state, or animation behavior.

## The fix

Add a subtle dot-grid texture to the canvas container background on every visualizer page, using theme-scoped CSS variables so it stays visible in both light and dark mode.

```css
:root {
  /* if not already defined from earlier passes */
}

[data-bs-theme="dark"] {
  --visualizer-dot: rgba(255, 255, 255, 0.05);
}

[data-bs-theme="light"] {
  --visualizer-dot: rgba(15, 23, 42, 0.06);
}

.visualizer-canvas {
  background-image: radial-gradient(circle, var(--visualizer-dot) 1px, transparent 1px);
  background-size: 24px 24px;
  background-position: 0 0;
}
```

(If the theme toggle in this codebase does not use `data-bs-theme`, scope these two variable blocks to whatever selector/class the toggle actually sets — check the toggle implementation first.)

## Apply to every visualizer canvas, not just one

Find the container class/element that wraps the interactive visualization area on each of these pages and apply `.visualizer-canvas` (or add the background-image rule directly if each page uses a different container class):

- Tower of Hanoi (`/visualizer/hanoi`) — the area behind the three pegs
- Binary Search Tree (`/visualizer/tree`) — the area behind the node graph
- Sorting (`/visualizer/sorting`) — the area behind the bars
- Linked List (`/visualizer/linked-list`) — the area behind the node chain
- Graph (`/visualizer/graph`) — the area behind the vertex/edge canvas
- Hashing (`/visualizer/hashing`) — the area behind the hash table cells

Do not apply the dot-grid to the page background as a whole, only the canvas container — it should read as "this is the interactive workspace" not "this is textured wallpaper behind everything."

## Verify

- Check both light and dark mode — the dot opacity values above are deliberately different per mode (light mode needs a stronger/darker dot to stay visible against white; dark mode needs a lighter, more subtle one).
- Check that the dots don't visually compete with or get lost behind the pegs/nodes/bars/cells themselves — 0.04-0.06 opacity should stay well in the background, but adjust slightly if any specific page's visualization elements make it hard to see.
- Confirm the texture renders consistently across all six visualizer pages, not just Hanoi.

---

**Summary of intended effect:** the empty space inside each visualizer canvas reads as a deliberate workspace surface instead of an unfinished empty box, without changing anything about how the visualizations themselves work.
