# DSA with C

Live: [dsa-with-c.vercel.app](https://dsa-with-c.vercel.app)

This is a project I built to help myself (and hopefully other students) actually *see* how data structures and algorithms work in C, instead of just reading pseudocode and hoping it makes sense. It has visualizers for a bunch of core DSA topics, plus a practice section with C problems to solve.

Backend repo (Node/Express/MongoDB API for this project): [dsa-backend](https://github.com/arko252007-dot/dsa-backend)

## Why I made this

I was learning DSA in C for my coursework and kept struggling to picture what recursion, pointers, and traversals actually look like step by step. Watching a few YouTube visualizers helped a lot, so I decided to try building my own instead of just using other people's tools. It also gave me a reason to actually get comfortable with a real frontend + backend setup instead of only writing isolated scripts.

## What I built / what I learned

- Built visualizers for BST insertion/traversal, Tower of Hanoi recursion, sorting algorithms, linked lists, graph BFS/DFS, and hash table linear probing — each one steps through the C code line by line alongside the animation.
- This was my first time connecting a frontend to a real backend and database instead of everything living in one file. I learned a lot about how the two talk to each other (API calls, CORS, auth, all the stuff that looks simple until you're the one debugging it).
- Wrote plain JavaScript with Vite instead of a framework, mostly to force myself to understand the DOM and state handling directly rather than letting React abstract it away.
- Learned the hard way why input validation matters — spent a good chunk of time fixing edge cases in the visualizers (empty trees, single-node graphs, duplicate values) that I hadn't thought about when I first built them.
- Set up user accounts and progress tracking on the backend, which meant learning the basics of password hashing and not storing anything in plain text.
- Still learning proper state management and cleaner component structure — some of the visualizer code is more repetitive than it should be, and I plan to refactor it as I learn more.

## Screenshots

<table>
<tr>
<td width="50%"><img src="https://ik.imagekit.io/nyiaxecwqb/tree-visual.png" alt="BST visualizer" /><br/><sub>BST visualizer</sub></td>
<td width="50%"><img src="https://ik.imagekit.io/nyiaxecwqb/tower-of-hannoi-visual.png" alt="Tower of Hanoi visualizer" /><br/><sub>Tower of Hanoi (recursion)</sub></td>
</tr>
<tr>
<td width="50%"><img src="https://ik.imagekit.io/nyiaxecwqb/graph-visual.png" alt="Graph visualizer" /><br/><sub>Graph BFS/DFS visualizer</sub></td>
<td width="50%"><img src="https://ik.imagekit.io/nyiaxecwqb/sorting-visual.png" alt="Sorting visualizer" /><br/><sub>Sorting visualizer</sub></td>
</tr>
</table>

<details>
<summary>More screenshots (linked list, hashing, home page, practice problems)</summary>

<table>
<tr>
<td width="50%"><img src="https://ik.imagekit.io/nyiaxecwqb/LL-visualization.png" alt="Linked list visualizer" /><br/><sub>Linked list visualizer</sub></td>
<td width="50%"><img src="https://ik.imagekit.io/nyiaxecwqb/hash-visual.png" alt="Hash table visualizer" /><br/><sub>Hash table visualizer</sub></td>
</tr>
<tr>
<td width="50%"><img src="https://ik.imagekit.io/nyiaxecwqb/home-page.png" alt="Home page" /><br/><sub>Home page</sub></td>
<td width="50%"><img src="https://ik.imagekit.io/nyiaxecwqb/visualizer-hub.png" alt="Visualizer hub" /><br/><sub>Visualizer hub</sub></td>
</tr>
<tr>
<td width="50%"><img src="https://ik.imagekit.io/nyiaxecwqb/problem-page.png" alt="Problem page" /><br/><sub>Practice problems page</sub></td>
<td width="50%"></td>
</tr>
</table>

</details>

## Features

- Interactive visualizers: Binary Search Tree, Tower of Hanoi, Sorting (bubble, selection, insertion, merge, quick), Linked Lists (singly/doubly/circular), Graph traversal (BFS/DFS), Hash Table with linear probing
- 130+ curated DSA practice problems in C, organized by topic and difficulty
- Track which problems you've solved
- User accounts (sign up / login)

## Tech stack

- Frontend: vanilla JavaScript + Vite
- Backend: Node.js, Express, MongoDB (see [dsa-backend](https://github.com/arko252007-dot/dsa-backend) for details)
- Deployed on Vercel (frontend) and a separate host for the backend/database

## Running it locally

```bash
git clone https://github.com/arko252007-dot/dsa-frontend.git
cd dsa-frontend
npm install
npm run dev
```

You'll also need the backend running (or pointed at a deployed instance) for login and progress tracking to work — see the [dsa-backend](https://github.com/arko252007-dot/dsa-backend) repo for setup.

## Things I still want to add

- Better mobile layout for a couple of the visualizers, they're a bit cramped on smaller screens right now
- More problems, especially in dynamic programming
- Cleaner error messages instead of generic ones in a few places

## Notes

This is a personal learning project, not a polished product — there are rough edges. If you're a student learning DSA in C and any of this is useful to you, feel free to poke around. Feedback and issues are welcome.