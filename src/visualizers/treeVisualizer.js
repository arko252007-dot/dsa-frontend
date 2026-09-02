export const treeVisualizer = {
  id: 'tree',
  title: 'Binary Search Tree & Traversals',
  badge: 'Unit 4',
  description: 'Interactive BST insertion, SVG edge rendering, and animated recursive Inorder, Preorder, and Postorder traversals.',

  mount(container) {
    container.innerHTML = `
      <div class="visualizer-wrapper">
        <div class="visualizer-header">
          <h2 class="visualizer-title">
            <i class="bi bi-diagram-2 text-danger"></i> Binary Search Tree (BST)
          </h2>
          <a href="/visualizations" class="btn btn-secondary btn-sm">
            <i class="bi bi-arrow-left"></i> Back to Hub
          </a>
        </div>

        <div class="visualizer-layout">
          <div class="visualizer-canvas-panel card-panel">
            <div class="visualizer-controls">
              <div class="control-group" style="flex: 1;">
                <input type="number" id="treeValInput" class="form-control" placeholder="Node (e.g. 50)" style="max-width: 130px;">
                <button id="btnInsert" class="btn btn-danger">Insert Node</button>
                <button id="btnInorder" class="btn btn-outline-primary">Inorder</button>
                <button id="btnPreorder" class="btn btn-outline-primary">Preorder</button>
                <button id="btnPostorder" class="btn btn-outline-primary">Postorder</button>
                <button id="btnClear" class="btn btn-secondary">Clear</button>
              </div>
            </div>

            <div class="traversal-output-bar" id="traversalOutput">
              Traversal Output: [ ]
            </div>

            <div class="tree-canvas" id="treeCanvas">
              <svg id="treeSvg"></svg>
            </div>

            <div class="status-banner" id="statusText">
              Tree is empty. Enter a value to insert root.
            </div>
          </div>

          <div class="code-debugger">
            <div class="debugger-header">
              <span><i class="bi bi-code-slash"></i> Dry-Run C Code</span>
              <span id="treeComplexityBadge" class="badge badge-primary">O(log N)</span>
            </div>
            <div class="debugger-body" id="codeDebugger">
              <div class="text-muted">Insert a node or run a traversal to see C code execution.</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const treeCanvas = container.querySelector('#treeCanvas');
    const treeSvg = container.querySelector('#treeSvg');
    const treeValInput = container.querySelector('#treeValInput');
    const btnInsert = container.querySelector('#btnInsert');
    const btnInorder = container.querySelector('#btnInorder');
    const btnPreorder = container.querySelector('#btnPreorder');
    const btnPostorder = container.querySelector('#btnPostorder');
    const btnClear = container.querySelector('#btnClear');
    const statusText = container.querySelector('#statusText');
    const traversalOutput = container.querySelector('#traversalOutput');
    const codeDebugger = container.querySelector('#codeDebugger');
    const treeComplexityBadge = container.querySelector('#treeComplexityBadge');

    let root = null;
    let isAnimating = false;
    let nodeCounter = 0;

    const codeSnippets = {
      insert: {
        complexity: 'O(log N)',
        lines: [
          'struct Node* insert(struct Node* node, int val) {',
          '    if (node == NULL) {',
          '        return createNode(val);',
          '    }',
          '    if (val < node->data) {',
          '        node->left = insert(node->left, val);',
          '    } else if (val > node->data) {',
          '        node->right = insert(node->right, val);',
          '    }',
          '    return node;',
          '}'
        ]
      },
      inorder: {
        complexity: 'O(N)',
        lines: [
          'void inorder(struct Node* node) {',
          '    if (node != NULL) {',
          '        inorder(node->left);',
          '        printf("%d ", node->data);',
          '        inorder(node->right);',
          '    }',
          '}'
        ]
      },
      preorder: {
        complexity: 'O(N)',
        lines: [
          'void preorder(struct Node* node) {',
          '    if (node != NULL) {',
          '        printf("%d ", node->data);',
          '        preorder(node->left);',
          '        preorder(node->right);',
          '    }',
          '}'
        ]
      },
      postorder: {
        complexity: 'O(N)',
        lines: [
          'void postorder(struct Node* node) {',
          '    if (node != NULL) {',
          '        postorder(node->left);',
          '        postorder(node->right);',
          '        printf("%d ", node->data);',
          '    }',
          '}'
        ]
      }
    };

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    function renderCode(type) {
      const data = codeSnippets[type];
      treeComplexityBadge.innerText = data.complexity;
      codeDebugger.innerHTML = data.lines
        .map((line, i) => `<div class="code-line" id="tree-line-${i}">${line.replace(/ /g, '&nbsp;')}</div>`)
        .join('');
    }

    function highlightLine(lineNum) {
      codeDebugger.querySelectorAll('.code-line').forEach(el => el.classList.remove('active'));
      if (lineNum !== undefined && lineNum >= 0) {
        const line = codeDebugger.querySelector(`#tree-line-${lineNum}`);
        if (line) {
          line.classList.add('active');
          line.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    class TreeNode {
      constructor(val, x, y, level) {
        this.val = val;
        this.x = x;
        this.y = y;
        this.level = level;
        this.left = null;
        this.right = null;
        this.id = `tree-node-${nodeCounter++}`;
        this.render();
      }

      render() {
        const div = document.createElement('div');
        div.className = 'tree-node';
        div.id = this.id;
        div.innerText = this.val;
        div.style.left = `${this.x}%`;
        div.style.top = `${this.y}px`;
        treeCanvas.appendChild(div);
      }
    }

    function drawLine(x1, y1, x2, y2, id) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', `${x1}%`);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', `${x2}%`);
      line.setAttribute('y2', y2);
      line.setAttribute('class', 'tree-line');
      line.setAttribute('id', id);
      treeSvg.appendChild(line);
    }

    function setControlsDisabled(disabled) {
      isAnimating = disabled;
      btnInsert.disabled = disabled;
      btnInorder.disabled = disabled;
      btnPreorder.disabled = disabled;
      btnPostorder.disabled = disabled;
      btnClear.disabled = disabled;
      treeValInput.disabled = disabled;
    }

    async function insertNode() {
      const rawVal = treeValInput.value.trim();
      if (!rawVal || isAnimating) return;
      const val = parseInt(rawVal);
      if (isNaN(val)) return;

      setControlsDisabled(true);
      renderCode('insert');
      traversalOutput.innerHTML = 'Traversal Output: [ ]';

      highlightLine(0); await sleep(500);

      if (root === null) {
        highlightLine(1); await sleep(500);
        highlightLine(2); await sleep(500);
        root = new TreeNode(val, 50, 45, 1);
        const elem = treeCanvas.querySelector(`#${root.id}`);
        if (elem) elem.classList.add('new-node');
        statusText.innerHTML = `Inserted <strong class="text-success">${val}</strong> as tree root.`;
        await sleep(700);
        if (elem) elem.classList.remove('new-node');
        highlightLine(-1);
        setControlsDisabled(false);
        treeValInput.value = '';
        return;
      }

      let curr = root;
      // Shrink horizontal span per depth level to prevent overlapping sibling subtrees
      let dx = 24;

      while (true) {
        highlightLine(1); await sleep(400);
        const currElem = treeCanvas.querySelector(`#${curr.id}`);
        if (currElem) currElem.classList.add('highlight');

        statusText.innerHTML = `Comparing <strong class="text-primary">${val}</strong> with current node <strong class="text-warning">${curr.val}</strong>...`;
        highlightLine(4); await sleep(700);

        if (val < curr.val) {
          statusText.innerHTML = `${val} < ${curr.val}: moving to LEFT child.`;
          highlightLine(5); await sleep(500);
          if (currElem) currElem.classList.remove('highlight');

          if (curr.left === null) {
            highlightLine(1); await sleep(400);
            highlightLine(2); await sleep(500);
            const newX = curr.x - dx / curr.level;
            const newY = curr.y + 65;
            curr.left = new TreeNode(val, newX, newY, curr.level + 1);
            drawLine(curr.x, curr.y, newX, newY, `line-${curr.id}-L`);

            const newElem = treeCanvas.querySelector(`#${curr.left.id}`);
            if (newElem) newElem.classList.add('new-node');
            statusText.innerHTML = `Inserted <strong class="text-success">${val}</strong> as left child of ${curr.val}.`;
            await sleep(700);
            if (newElem) newElem.classList.remove('new-node');
            break;
          }
          curr = curr.left;
        } else if (val > curr.val) {
          highlightLine(6); await sleep(500);
          statusText.innerHTML = `${val} > ${curr.val}: moving to RIGHT child.`;
          highlightLine(7); await sleep(500);
          if (currElem) currElem.classList.remove('highlight');

          if (curr.right === null) {
            highlightLine(1); await sleep(400);
            highlightLine(2); await sleep(500);
            const newX = curr.x + dx / curr.level;
            const newY = curr.y + 65;
            curr.right = new TreeNode(val, newX, newY, curr.level + 1);
            drawLine(curr.x, curr.y, newX, newY, `line-${curr.id}-R`);

            const newElem = treeCanvas.querySelector(`#${curr.right.id}`);
            if (newElem) newElem.classList.add('new-node');
            statusText.innerHTML = `Inserted <strong class="text-success">${val}</strong> as right child of ${curr.val}.`;
            await sleep(700);
            if (newElem) newElem.classList.remove('new-node');
            break;
          }
          curr = curr.right;
        } else {
          // Standard BST ignores duplicate values
          statusText.innerHTML = `<span class="text-warning">Value ${val} already exists in BST (Duplicate ignored).</span>`;
          if (currElem) currElem.classList.remove('highlight');
          break;
        }
      }

      highlightLine(9); await sleep(500);
      highlightLine(-1);
      setControlsDisabled(false);
      treeValInput.value = '';
    }

    async function traverse(node, type, arr) {
      if (node === null) {
        highlightLine(1); await sleep(300);
        return;
      }

      const elem = treeCanvas.querySelector(`#${node.id}`);
      if (elem) elem.classList.add('highlight');
      highlightLine(1); await sleep(300);

      if (type === 'preorder') {
        highlightLine(2); await sleep(500);
        arr.push(node.val);
        traversalOutput.innerHTML = `Traversal Output: [ <span class="text-warning">${arr.join(', ')}</span> ]`;
        statusText.innerHTML = `Visiting node <strong class="text-warning">${node.val}</strong>`;
      }

      let lineLeft = type === 'inorder' ? 2 : type === 'preorder' ? 3 : 2;
      highlightLine(lineLeft); await sleep(400);
      if (elem) elem.classList.remove('highlight');
      await traverse(node.left, type, arr);
      if (elem) elem.classList.add('highlight');

      if (type === 'inorder') {
        highlightLine(3); await sleep(500);
        arr.push(node.val);
        traversalOutput.innerHTML = `Traversal Output: [ <span class="text-warning">${arr.join(', ')}</span> ]`;
        statusText.innerHTML = `Visiting node <strong class="text-warning">${node.val}</strong>`;
      }

      let lineRight = type === 'inorder' ? 4 : type === 'preorder' ? 4 : 3;
      highlightLine(lineRight); await sleep(400);
      if (elem) elem.classList.remove('highlight');
      await traverse(node.right, type, arr);
      if (elem) elem.classList.add('highlight');

      if (type === 'postorder') {
        highlightLine(4); await sleep(500);
        arr.push(node.val);
        traversalOutput.innerHTML = `Traversal Output: [ <span class="text-warning">${arr.join(', ')}</span> ]`;
        statusText.innerHTML = `Visiting node <strong class="text-warning">${node.val}</strong>`;
      }

      if (elem) elem.classList.remove('highlight');
    }

    async function runTraversal(type) {
      if (!root) {
        statusText.innerHTML = `<span class="text-warning">Tree is empty. Cannot traverse.</span>`;
        return;
      }
      if (isAnimating) return;
      setControlsDisabled(true);
      renderCode(type);

      let arr = [];
      traversalOutput.innerHTML = 'Traversal Output: [ ]';
      statusText.innerHTML = `Starting <strong>${type.toUpperCase()}</strong> traversal...`;
      highlightLine(0); await sleep(500);

      await traverse(root, type, arr);

      statusText.innerHTML = `<span class="text-success fw-bold">${type.toUpperCase()} Traversal Complete!</span>`;
      highlightLine(-1);
      setControlsDisabled(false);
    }

    btnInsert.addEventListener('click', insertNode);
    treeValInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') insertNode();
    });

    btnInorder.addEventListener('click', () => runTraversal('inorder'));
    btnPreorder.addEventListener('click', () => runTraversal('preorder'));
    btnPostorder.addEventListener('click', () => runTraversal('postorder'));

    btnClear.addEventListener('click', () => {
      if (!isAnimating) {
        root = null;
        treeCanvas.querySelectorAll('.tree-node').forEach(e => e.remove());
        treeSvg.innerHTML = '';
        statusText.innerHTML = 'Tree cleared. Insert a node to start.';
        traversalOutput.innerHTML = 'Traversal Output: [ ]';
        codeDebugger.innerHTML = '<div class="text-muted">Insert a node or run a traversal.</div>';
      }
    });
  }
};
