# DSA with C — Interactive Practice Platform & Algorithm Visualizer

[![License: All Rights Reserved](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg)](LICENSE)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF.svg)](https://vitejs.dev/)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3.svg)](https://getbootstrap.com/)

**DSA with C** is a comprehensive, distraction-free practice and visualization platform built specifically around the C programming language. Learning **data structures and algorithms in C for students** can often feel overwhelming, abstract, and anxiety-inducing due to manual memory management, explicit pointer manipulations, and cryptic debuggers.

Instead of serving as just another static problem tracker, DSA with C combines a curated problem road map with an interactive **C language algorithm visualizer** and **C dry-run execution** debugger. By illustrating memory mutations, pointer links, and recursion stacks right next to genuine C source code, the platform transforms complex algorithmic concepts into intuitive, approachable mental models.

---

## 🌟 Key Features

### 1. 131 Curated Practice Problems across 8 Core Categories
Master foundational and interview-ready concepts with a structured syllabus covering 131 hand-picked problems:
* **Arrays, Searching & Sorting**: Two-pointer techniques, binary searches, sliding windows, and in-place transformations.
* **Linked Lists**: Singly, Doubly, and Circular pointer manipulation, reversal, cycle detection, and merging.
* **Hashing & Collision Resolution**: Direct addressing, frequency maps, and hash set operations.
* **Stacks, Recursion & Queues**: Monotonic stacks, expression evaluations, recursive problem decomposition, and circular queues.
* **Binary Trees & BST**: Tree traversals, lowest common ancestors, BST validations, and level-order processing.
* **Graphs**: BFS, DFS, connectivity checks, cycle detections, and topological ordering.
* **Popular Interview Questions**: High-frequency technical interview challenges from top companies.
* **Basic C & Mathematical Foundations**: Prime checks, Armstrong numbers, GCD/Euclidean algorithms, and number theory.

Every problem includes an **Easy**, **Medium**, or **Hard** badge along with a direct cross-link to practice and submit on LeetCode.

### 2. Anxiety-Free, Contextual Hint System
Stuck on a tricky edge case? Each problem features an on-demand hint system available **only for unsolved problems**. Once a problem is marked as solved, hints gracefully step aside to keep your workspace clean and organized. This deliberate design decision prevents cognitive overload, minimizes DSA-related stress, and gives you the exact nudge needed without spoiling full solutions.

### 3. Live Visual Progress Tracking
Stay motivated as you work through the curriculum with persistent, real-time statistics:
* **Overall Completion Percentage**: Live calculated metrics tracking total completion across the curriculum.
* **Segmented Difficulty Breakdown**: Color-coded progress bars and counters tracking exact ratios for Easy, Medium, and Hard challenges.
* **Category Progress Badges**: Per-topic completion counters indicating your mastery across every algorithmic domain.

### 4. 6 Interactive Algorithm Visualizers with Real C Dry-Run Execution
Unlike generic online visualizers that animate high-level pseudocode or Python/JavaScript abstractions, DSA with C displays the **exact C code executing step-by-step** alongside the animated data structures:

* **Sorting Algorithms**: Step through Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort. Watch array comparisons and swaps highlight the exact C `for` loops, indices, and time complexity badges in real time.
* **Linked Lists (Pointers & Memory)**: Visualize Singly, Doubly, and Circular Linked Lists. Perform head, tail, and custom-position insertions and deletions while tracking dynamic pointer assignments (`head`, `tail`, `next`, `prev`).
* **Hash Tables & Linear Probing**: Watch hash keys compute modulo buckets and follow step-by-step collision resolution animations via linear probing during insertions, searches, and deletions.
* **Tower of Hanoi (Recursion)**: Solve the classic divide-and-conquer puzzle with visual disk transfers across Pegs A, B, and C, paired with live recursive call stack tracing.
* **Binary Search Trees (BST)**: Insert custom numeric nodes dynamically to observe recursive tree placement and trigger step-by-step Inorder, Preorder, and Postorder tree traversals.
* **Graph Traversals (BFS & DFS)**: Build and inspect interconnected graph nodes and edges with queue-driven Breadth-First Search (BFS) and stack/recursion-driven Depth-First Search (DFS) animations.

---

## 🏗️ How It Works & System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Client                        │
│   (Vite + Vanilla JS SPA • Client Router • Theme System)   │
└──────────────┬───────────────────────────────▲──────────────┘
               │                               │
       Fast UI State (Local)           Async DB Sync (Remote)
               │                               │
┌──────────────▼──────────────┐ ┌──────────────┴──────────────┐
│        localStorage         │ │      Node / Express API     │
│   (Instant offline cache)   │ │  (bcrypt auth • REST routes)│
└─────────────────────────────┘ └──────────────┬──────────────┘
                                               │
                                       Mongoose ODM
                                               │
                                ┌──────────────▼──────────────┐
                                │       MongoDB Atlas         │
                                │  (Users & Solved Progress)  │
                                └─────────────────────────────┘
```

### High-Level Architecture:
* **Frontend Client**: High-performance Single Page Application (SPA) powered by Vite and vanilla ES Modules. It incorporates a custom client-side history router, responsive Bootstrap 5 grid layouts, and custom CSS design tokens with seamless Dark and Light theme support.
* **Backend REST API**: Node.js and Express backend connected to a MongoDB database (via Mongoose) providing persistence for accounts, problem catalogs, and user progress.
* **Authentication Flow**: Clean student registration and sign-in requiring a unique username and password. Passwords are cryptographically salted and hashed using `bcrypt` before being stored in the database. Passwords are never logged or stored in plaintext, and are securely verified against the stored hash upon login.
* **Dual-Layer Progress Synchronization**: Whenever a problem status is toggled, state is immediately updated in `localStorage` for instant, zero-latency UI feedback, and concurrently synced with MongoDB as the single source of truth across devices.

---

## 💻 Tech Stack

### Frontend
* **Core**: Vanilla JavaScript (ES2022+ Modules)
* **Build Tool & Dev Server**: [Vite](https://vitejs.dev/) (`^5.4.2`)
* **Styling & UI**: [Bootstrap](https://getbootstrap.com/) (`5.3.3`), Custom CSS Variable Design System
* **Icons**: [Bootstrap Icons](https://icons.getbootstrap.com/) (`1.11.3`)
* **Typography**: Google Fonts ([Inter](https://fonts.google.com/specimen/Inter) for clean UI, [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) for code & debugger panels)

### Backend
* **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
* **Web Framework**: [Express](https://expressjs.com/) (`^4.19.2`)
* **Database & ODM**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) (`^8.5.1`)
* **Security & Auth**: [bcrypt](https://github.com/kelektiv/node.bcrypt.js) (`^6.0.0`)
* **Middleware**: [cors](https://www.npmjs.com/package/cors) (`^2.8.5`), [cookie-parser](https://www.npmjs.com/package/cookie-parser) (`^1.4.6`), [dotenv](https://www.npmjs.com/package/dotenv) (`^16.4.5`), [nodemon](https://nodemon.io/) (`^3.1.4`)

---

## 🔒 Privacy & Account Information

We prioritize student privacy and minimize data retention:
* **What is stored**: Only your chosen username, your `bcrypt`-hashed password, and the list of solved problem IDs along with completion timestamps.
* **What is NOT collected**: No email addresses, phone numbers, real names, tracking cookies, or third-party analytics identifiers are ever collected.
* **No Password Recovery**: Because no contact details (such as email or phone numbers) are collected, **account passwords cannot be reset or recovered if lost**. Please ensure you remember your login credentials.
* **Full Policy**: Read the comprehensive policy on the live [/privacy.html](/privacy.html) page.

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* [npm](https://www.npmjs.com/) (v9 or higher)

### Installation
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/arko252007-dot/dsa-frontend.git
   cd dsa-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

---

## 📬 Feedback & Issues

Found a bug, have a feature request, or ran into a problem? Please open an issue:
👉 **[Open an Issue on GitHub](https://github.com/arko252007-dot/dsa-frontend/issues)**

This GitHub Issues tracker serves as the **single central channel** for all inquiries, including:
* Bug reports and visualizer rendering glitches
* Curriculum or hint corrections
* Feature suggestions and new algorithm visualizer proposals
* Account deletion or data cleanup requests
* Security vulnerabilities or responsible disclosure reports

---

## 📄 License

This project is source-available for viewing and reference purposes only. All rights reserved — see [LICENSE](LICENSE). Reuse, modification, or redistribution is not permitted without prior written permission from the author.

