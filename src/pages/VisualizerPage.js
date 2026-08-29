import { sortingVisualizer } from '../visualizers/sortingVisualizer.js';
import { linkedListVisualizer } from '../visualizers/linkedListVisualizer.js';
import { hashingVisualizer } from '../visualizers/hashingVisualizer.js';
import { treeVisualizer } from '../visualizers/treeVisualizer.js';
import { graphVisualizer } from '../visualizers/graphVisualizer.js';
import { hanoiVisualizer } from '../visualizers/hanoiVisualizer.js';

const visualizerRegistry = {
  sorting: sortingVisualizer,
  'linked-list': linkedListVisualizer,
  hashing: hashingVisualizer,
  tree: treeVisualizer,
  graph: graphVisualizer,
  hanoi: hanoiVisualizer
};

let currentCleanup = null;

export const VisualizerPage = {
  render(params) {
    const visualizerId = params?.id || 'sorting';
    const visualizer = visualizerRegistry[visualizerId];

    if (!visualizer) {
      return `
        <div class="text-center py-5">
          <h2 class="text-danger mb-3">Visualizer Not Found</h2>
          <p class="text-secondary mb-4">The requested visualizer algorithm does not exist.</p>
          <a href="/visualizations" class="btn btn-primary">Back to Visualizations</a>
        </div>
      `;
    }

    return `
      <div class="container-fluid px-3 px-md-4 px-lg-5 py-2">
        <div id="visualizerMountPoint"></div>
      </div>
    `;
  },

  init(params) {
    if (typeof currentCleanup === 'function') {
      currentCleanup();
      currentCleanup = null;
    }

    const visualizerId = params?.id || 'sorting';
    const visualizer = visualizerRegistry[visualizerId];
    const mountPoint = document.getElementById('visualizerMountPoint');

    if (visualizer && mountPoint) {
      currentCleanup = visualizer.mount(mountPoint);
    }
  },

  cleanup() {
    if (typeof currentCleanup === 'function') {
      currentCleanup();
      currentCleanup = null;
    }
  }
};
