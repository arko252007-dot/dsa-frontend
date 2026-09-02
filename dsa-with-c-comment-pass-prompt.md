# Prompt: Comment Pass — Make Code Comments Read Like a Senior Dev Wrote Them

Copy everything below into your coding agent (Antigravity, Claude Code, etc.) as a single instruction.

---

## Context

This is a codebase-only task — it does not touch anything user-facing on the website. Go through the source files (visualizer logic, components, utility functions) and rewrite/add comments so they read like they were written by an experienced developer working on their own project, not generated to explain the code to someone unfamiliar with it. This is about tone and judgment, not adding more comments — often the fix is removing comments, not adding them.

## What AI-generated comments look like (avoid this)

- Restating what the code obviously already says: `// increment i by 1` above `i++`, `// loop through the array` above a `for` loop.
- A comment above every single function that just repeats the function name in sentence form: `// This function inserts a node into the BST` above `insertNode()`.
- Banner-style section dividers with heavy decoration: `// ===================== SORTING LOGIC =====================`.
- Explaining language syntax instead of domain logic: `// declare a variable to hold the result`.
- Comments that hedge or narrate uncertainty in a way a working dev wouldn't: `// this should work but might need adjustment`.
- Uniform comment density — literally every function/block gets exactly one comment, regardless of whether it needs one. Real codebases are uneven: trivial code has zero comments, tricky code gets a real explanation.

## What a senior dev's comments actually look like (aim for this)

- **Comment the "why," not the "what."** If the code is doing something non-obvious for a reason that isn't visible from reading it — a specific edge case, a workaround for a bug, a deliberate trade-off — that's worth a comment. If the code is self-explanatory from the variable/function names, it doesn't need one.
- **Skip comments entirely on trivial code.** Simple getters, straightforward loops, obvious conditionals — no comment. A senior dev doesn't narrate the obvious.
- **Terse and specific, not explanatory-essay style.** One line, sometimes a sentence fragment, not a paragraph. e.g. `// linear probing wraps around — bail if we've checked every slot` rather than a multi-sentence explanation of how hash tables work.
- **Comment on tricky algorithmic steps specifically**, since this codebase is full of them — recursion base cases, why a particular traversal order matters, why an index calculation looks the way it does (e.g. `(key + 1) % size` in the hashing visualizer, or the peg-swap logic in Tower of Hanoi). These are exactly the spots where a real dev would leave a short note for future-them, because the "why" isn't obvious from the code alone.
- **TODO / FIXME style notes where genuinely relevant** — if there's a known limitation or something intentionally left unhandled, a short `// TODO: doesn't handle duplicate values yet` is realistic, not a sign of AI generation.
- **No comments about styling, colors, or fonts in the code at all** — comments belong on logic files (visualizer algorithms, state management, utility functions), not markup/CSS. If there are stray comments in CSS/component files explaining color or font choices, remove them; a real dev doesn't leave comments narrating design decisions in the code itself.

## Where to focus

Prioritize the algorithm implementations, since that's where genuine "why" comments add real value and where AI-style over-commenting is most noticeable right now:

- Tower of Hanoi recursion logic
- BST insert/traversal logic
- Sorting algorithm implementations (bubble, merge, quick, etc.)
- Linked list pointer manipulation (insert/delete at index, head/tail operations)
- Graph BFS/DFS traversal
- Hash table linear probing / collision resolution

Leave UI/layout component files mostly uncommented unless there's a genuinely non-obvious piece of state logic or a workaround worth explaining — most component code doesn't need comments at all.

## Constraints

- Do not change any logic, variable names, or behavior — comments only.
- Don't aim for a specific comment count or "one comment per function" — density should vary naturally based on whether each piece of code actually needs explanation.
- Keep comments in the same language/style as the rest of the codebase (C for the algorithm dry-run snippets shown in the visualizers, JS/TS for the frontend logic — whichever applies per file).
