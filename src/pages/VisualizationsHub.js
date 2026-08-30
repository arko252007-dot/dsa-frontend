export const VisualizationsHub = {
  render() {
    const visualizers = [
      {
        id: 'tree',
        title: 'Binary Search Trees (BST)',
        category: 'Trees & Traversals',
        icon: 'bi-diagram-2',
        badgeClass: 'cat-tree-badge',
        desc: 'Interactive tree visualization with BST node insertions, search, and Inorder, Preorder, Postorder traversals in C.'
      },
      {
        id: 'hanoi',
        title: 'Tower of Hanoi',
        category: 'Recursion & Stack',
        icon: 'bi-arrow-repeat',
        badgeClass: 'cat-recur-badge',
        desc: 'Divide-and-conquer recursion solver for optimal disk movements, call stack activation records & C dry-run.'
      },
      {
        id: 'sorting',
        title: 'Sorting Algorithms',
        category: 'Arrays & Sorting',
        icon: 'bi-bar-chart-steps',
        badgeClass: 'cat-array-badge',
        desc: 'Bubble, Selection, Insertion, Merge, and Quick Sort with real-time array animations and C dry-runs.'
      },
      {
        id: 'linked-list',
        title: 'Linked Lists',
        category: 'Pointers & Memory',
        icon: 'bi-diagram-3',
        badgeClass: 'cat-list-badge',
        desc: 'Singly, Doubly, and Circular Linked Lists with position insertions, deletions, and pointer transitions.'
      },
      {
        id: 'graph',
        title: 'Graph Traversals (BFS & DFS)',
        category: 'Graphs & Networks',
        icon: 'bi-diagram-3-fill',
        badgeClass: 'cat-graph-badge',
        desc: 'Custom vertex & edge canvas with Queue-based BFS and Stack-based DFS traversal trace in C.'
      },
      {
        id: 'hashing',
        title: 'Hash Tables & Linear Probing',
        category: 'Hashing & Tables',
        icon: 'bi-grid-3x3',
        badgeClass: 'cat-hash-badge',
        desc: 'Hash modulo function with linear probing collision resolution simulation and slot allocation.'
      }
    ];

    return `
      <div class="container-fluid px-3 px-md-4 px-lg-5 py-2 py-md-3">
        <div class="mb-3 mb-md-4">
          <h1 class="fw-semibold h3 mb-1">Algorithm Visualizers &amp; Dry-Run Simulators in C</h1>
          <p class="text-muted small mb-0 font-mono" style="font-size: var(--font-xs);">Step-by-step memory mutation, pointer transitions, recursion call stack frames, and live C dry-run execution engines.</p>
        </div>

        <div class="row g-3 g-md-4">
          ${visualizers
            .map(
              v => `
            <div class="col-12 col-sm-6 col-lg-4">
              <div class="card h-100 shadow-sm border visualizer-hub-card">
                <div class="card-body p-3 p-md-4 d-flex flex-column">
                  
                  <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="category-icon-badge ${v.badgeClass} flex-shrink-0" style="width: 38px; height: 38px; font-size: 1.15rem;">
                      <i class="bi ${v.icon}"></i>
                    </div>
                    <div class="text-truncate">
                      <div class="text-muted text-uppercase fw-medium font-mono" style="font-size: var(--font-xs); letter-spacing: 0.05em;">
                        ${v.category}
                      </div>
                      <h5 class="card-title fw-semibold mb-0 text-truncate" style="font-size: var(--font-sm);">${v.title}</h5>
                    </div>
                  </div>

                  <p class="card-text text-muted small flex-grow-1 mb-3" style="font-size: var(--font-xs); line-height: 1.6;">
                    ${v.desc}
                  </p>

                  <a href="/visualizer/${v.id}" class="btn-card-launch">
                    <span>Open Visualizer</span>
                    <i class="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  },

  init() {}
};
