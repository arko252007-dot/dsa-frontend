export const graphVisualizer = {
  id: 'graph',
  title: 'Graph Traversals (BFS & DFS)',
  badge: 'Unit 4',
  description: 'Add nodes by clicking the canvas, connect pairs with edges, select a start node, and run animated BFS & DFS.',

  mount(container) {
    container.innerHTML = `
      <div class="visualizer-wrapper">
        <div class="visualizer-header">
          <h2 class="visualizer-title">
            <i class="bi bi-diagram-3-fill text-secondary"></i> Graph Traversals (BFS & DFS)
          </h2>
          <a href="/visualizations" class="btn btn-secondary btn-sm">
            <i class="bi bi-arrow-left"></i> Back to Hub
          </a>
        </div>

        <div class="visualizer-layout">
          <div class="visualizer-canvas-panel card-panel">
            <div class="visualizer-controls">
              <div class="control-group" style="flex: 1;">
                <button id="btnBfs" class="btn btn-primary">Run BFS</button>
                <button id="btnDfs" class="btn btn-primary">Run DFS</button>
                <button id="btnClear" class="btn btn-secondary">Clear All</button>
              </div>
            </div>

            <div class="traversal-output-bar" id="traversalOutput">
              Traversal Output: [ ]
            </div>

            <div class="graph-canvas" id="graphCanvas">
              <svg id="graphSvg"></svg>
            </div>

            <div class="status-banner" id="statusText">
              Click canvas to add nodes. Click two nodes to connect them. Select start node before running BFS/DFS.
            </div>
          </div>

          <div class="code-debugger">
            <div class="debugger-header">
              <span><i class="bi bi-code-slash"></i> Dry-Run C Code</span>
              <span id="graphComplexityBadge" class="badge badge-primary">O(V + E)</span>
            </div>
            <div class="debugger-body" id="codeDebugger">
              <div class="text-muted">Select BFS or DFS to view algorithm code.</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const graphCanvas = container.querySelector('#graphCanvas');
    const graphSvg = container.querySelector('#graphSvg');
    const btnBfs = container.querySelector('#btnBfs');
    const btnDfs = container.querySelector('#btnDfs');
    const btnClear = container.querySelector('#btnClear');
    const statusText = container.querySelector('#statusText');
    const traversalOutput = container.querySelector('#traversalOutput');
    const codeDebugger = container.querySelector('#codeDebugger');
    const graphComplexityBadge = container.querySelector('#graphComplexityBadge');

    let nodes = [];
    let adjList = {};
    let isAnimating = false;
    let selectedNodeId = null;

    const codeSnippets = {
      bfs: {
        complexity: 'O(V + E)',
        lines: [
          'void BFS(int start) {',
          '    bool visited[MAX] = {false};',
          '    int queue[MAX], front = 0, rear = 0;',
          '    visited[start] = true;',
          '    queue[rear++] = start;',
          '    while (front < rear) {',
          '        int u = queue[front++];',
          '        printf("%d ", u);',
          '        for (int v : adj[u]) {',
          '            if (!visited[v]) {',
          '                visited[v] = true;',
          '                queue[rear++] = v;',
          '            }',
          '        }',
          '    }',
          '}'
        ]
      },
      dfs: {
        complexity: 'O(V + E)',
        lines: [
          'void DFS(int u, bool visited[]) {',
          '    visited[u] = true;',
          '    printf("%d ", u);',
          '    for (int v : adj[u]) {',
          '        if (!visited[v]) {',
          '            DFS(v, visited);',
          '        }',
          '    }',
          '}'
        ]
      }
    };

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    function renderCode(type) {
      const data = codeSnippets[type];
      graphComplexityBadge.innerText = data.complexity;
      codeDebugger.innerHTML = data.lines
        .map((line, i) => `<div class="code-line" id="graph-line-${i}">${line.replace(/ /g, '&nbsp;')}</div>`)
        .join('');
    }

    function highlightLine(lineNum) {
      codeDebugger.querySelectorAll('.code-line').forEach(el => el.classList.remove('active'));
      if (lineNum !== undefined && lineNum >= 0) {
        const line = codeDebugger.querySelector(`#graph-line-${lineNum}`);
        if (line) {
          line.classList.add('active');
          line.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    function drawEdge(u, v) {
      const nodeU = nodes[u];
      const nodeV = nodes[v];
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', `${nodeU.x}px`);
      line.setAttribute('y1', `${nodeU.y}px`);
      line.setAttribute('x2', `${nodeV.x}px`);
      line.setAttribute('y2', `${nodeV.y}px`);
      line.setAttribute('class', 'graph-line');
      line.setAttribute('id', `edge-${u}-${v}`);
      graphSvg.appendChild(line);
    }

    function createNode(x, y) {
      if (isAnimating) return;
      const id = nodes.length;
      nodes.push({ id, x, y });
      adjList[id] = [];

      const div = document.createElement('div');
      div.className = 'graph-node';
      div.id = `graph-node-${id}`;
      div.innerText = id;
      div.style.left = `${x}px`;
      div.style.top = `${y}px`;

      div.addEventListener('click', e => {
        e.stopPropagation();
        if (isAnimating) return;

        if (selectedNodeId === null) {
          selectedNodeId = id;
          div.classList.add('selected');
          statusText.innerHTML = `Node <strong>${id}</strong> selected as starting node (or click another node to connect).`;
        } else if (selectedNodeId === id) {
          selectedNodeId = null;
          div.classList.remove('selected');
          statusText.innerHTML = `Node ${id} deselected.`;
        } else {
          // Connect edge
          if (!adjList[selectedNodeId].includes(id)) {
            adjList[selectedNodeId].push(id);
            adjList[id].push(selectedNodeId);
            drawEdge(selectedNodeId, id);
          }
          const prevNode = graphCanvas.querySelector(`#graph-node-${selectedNodeId}`);
          if (prevNode) prevNode.classList.remove('selected');
          selectedNodeId = null;
          statusText.innerHTML = `Edge created between nodes.`;
        }
      });

      graphCanvas.appendChild(div);
      statusText.innerHTML = `Node <strong>${id}</strong> created. Click another node to connect, or select start node.`;
    }

    graphCanvas.addEventListener('click', e => {
      if (e.target === graphCanvas) {
        const rect = graphCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createNode(x, y);
      }
    });

    function setControlsDisabled(disabled) {
      isAnimating = disabled;
      btnBfs.disabled = disabled;
      btnDfs.disabled = disabled;
      btnClear.disabled = disabled;
    }

    function resetGraphVisuals() {
      nodes.forEach(n => {
        const el = graphCanvas.querySelector(`#graph-node-${n.id}`);
        if (el) el.className = 'graph-node';
      });
      graphSvg.querySelectorAll('.graph-line').forEach(l => l.classList.remove('highlight'));
      if (selectedNodeId !== null) {
        const sel = graphCanvas.querySelector(`#graph-node-${selectedNodeId}`);
        if (sel) sel.classList.add('selected');
      }
    }

    async function runBFS() {
      if (selectedNodeId === null) {
        statusText.innerHTML = `<span class="text-danger fw-bold">Please click a node to select it as the starting vertex!</span>`;
        return;
      }
      setControlsDisabled(true);
      resetGraphVisuals();
      renderCode('bfs');
      let arr = [];
      traversalOutput.innerHTML = 'Traversal Output: [ ]';

      const startNode = selectedNodeId;
      highlightLine(0); await sleep(500);
      let visited = new Array(nodes.length).fill(false);
      highlightLine(1); await sleep(500);
      let queue = [];
      highlightLine(2); await sleep(500);

      visited[startNode] = true;
      highlightLine(3); await sleep(500);

      queue.push(startNode);
      const startElem = graphCanvas.querySelector(`#graph-node-${startNode}`);
      if (startElem) startElem.classList.add('selected');
      highlightLine(4); await sleep(500);

      while (queue.length > 0) {
        highlightLine(5); await sleep(500);
        let u = queue.shift();
        highlightLine(6); await sleep(500);

        const uElem = graphCanvas.querySelector(`#graph-node-${u}`);
        if (uElem) {
          uElem.classList.remove('selected');
          uElem.classList.add('visited');
        }
        arr.push(u);
        traversalOutput.innerHTML = `Traversal Output: [ <span class="text-warning">${arr.join(', ')}</span> ]`;
        statusText.innerHTML = `Dequeued & Visiting Node <strong>${u}</strong>`;
        highlightLine(7); await sleep(600);

        highlightLine(8); await sleep(500);
        for (let v of adjList[u]) {
          highlightLine(9); await sleep(400);
          if (!visited[v]) {
            let edge = graphSvg.querySelector(`#edge-${u}-${v}`) || graphSvg.querySelector(`#edge-${v}-${u}`);
            if (edge) edge.classList.add('highlight');

            visited[v] = true;
            highlightLine(10); await sleep(400);

            queue.push(v);
            const vElem = graphCanvas.querySelector(`#graph-node-${v}`);
            if (vElem) vElem.classList.add('selected');
            highlightLine(11); await sleep(400);
          }
        }
      }

      statusText.innerHTML = `<span class="text-success fw-bold">BFS Traversal Complete!</span>`;
      highlightLine(14); await sleep(500);
      highlightLine(-1);
      setControlsDisabled(false);
    }

    async function dfsHelper(u, visited, arr) {
      visited[u] = true;
      highlightLine(1); await sleep(500);

      const uElem = graphCanvas.querySelector(`#graph-node-${u}`);
      if (uElem) {
        uElem.classList.remove('selected');
        uElem.classList.add('visited');
      }
      arr.push(u);
      traversalOutput.innerHTML = `Traversal Output: [ <span class="text-warning">${arr.join(', ')}</span> ]`;
      statusText.innerHTML = `Visiting Node <strong>${u}</strong>`;
      highlightLine(2); await sleep(600);

      highlightLine(3); await sleep(500);
      for (let v of adjList[u]) {
        highlightLine(4); await sleep(400);
        if (!visited[v]) {
          let edge = graphSvg.querySelector(`#edge-${u}-${v}`) || graphSvg.querySelector(`#edge-${v}-${u}`);
          if (edge) edge.classList.add('highlight');

          const vElem = graphCanvas.querySelector(`#graph-node-${v}`);
          if (vElem) vElem.classList.add('selected');

          highlightLine(5); await sleep(500);
          await dfsHelper(v, visited, arr);
          highlightLine(3); await sleep(400);
        }
      }
    }

    async function runDFS() {
      if (selectedNodeId === null) {
        statusText.innerHTML = `<span class="text-danger fw-bold">Please click a node to select it as the starting vertex!</span>`;
        return;
      }
      setControlsDisabled(true);
      resetGraphVisuals();
      renderCode('dfs');
      let arr = [];
      traversalOutput.innerHTML = 'Traversal Output: [ ]';

      const startNode = selectedNodeId;
      let visited = new Array(nodes.length).fill(false);
      highlightLine(0); await sleep(500);

      await dfsHelper(startNode, visited, arr);

      statusText.innerHTML = `<span class="text-success fw-bold">DFS Traversal Complete!</span>`;
      highlightLine(8); await sleep(500);
      highlightLine(-1);
      setControlsDisabled(false);
    }

    btnBfs.addEventListener('click', runBFS);
    btnDfs.addEventListener('click', runDFS);
    btnClear.addEventListener('click', () => {
      if (!isAnimating) {
        nodes = [];
        adjList = {};
        selectedNodeId = null;
        graphCanvas.querySelectorAll('.graph-node').forEach(e => e.remove());
        graphSvg.innerHTML = '';
        statusText.innerHTML = 'Graph cleared. Click canvas to add nodes.';
        traversalOutput.innerHTML = 'Traversal Output: [ ]';
        codeDebugger.innerHTML = '<div class="text-muted">Select BFS or DFS to view algorithm code.</div>';
      }
    });
  }
};
