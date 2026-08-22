// Linked List Visualizer Engine (Supports Singly, Doubly, and Circular Linked Lists with 0-based indexing)
export const linkedListVisualizer = {
  id: 'linked-list',
  title: 'Linked List Operations',
  badge: 'Unit 2',
  description: 'Interactive Singly, Doubly, and Circular Linked List visualizer with dynamic node allocation, pointer transitions, 0-based index insertion, and targeted deletion.',

  mount(container) {
    container.innerHTML = `
      <div class="visualizer-wrapper">
        <div class="visualizer-header">
          <div class="d-flex align-items-center gap-2">
            <div class="category-icon-badge cat-list-badge">
              <i class="bi bi-diagram-3"></i>
            </div>
            <h2 class="visualizer-title mb-0">Linked List Engine</h2>
          </div>
          <a href="#/visualizations" class="btn btn-secondary btn-sm">
            <i class="bi bi-arrow-left"></i> Back to Hub
          </a>
        </div>

        <div class="visualizer-layout">
          <div class="visualizer-canvas-panel card-panel">
            
            <!-- Type Selector & Main Inputs Toolbar -->
            <div class="visualizer-controls">
              
              <div class="control-group">
                <select id="listTypeSelect" class="form-select" style="min-width: 175px;">
                  <option value="singly" selected>Singly Linked List</option>
                  <option value="doubly">Doubly Linked List</option>
                  <option value="circular">Circular Linked List</option>
                </select>

                <input type="number" id="nodeValInput" class="form-control" placeholder="Value (e.g. 42)" style="width: 120px;">
                <input type="number" id="nodePosInput" class="form-control" placeholder="Index (0..N)" min="0" style="width: 105px;" title="0-based index for insert/delete">
              </div>

              <!-- Action Buttons Toolbar -->
              <div class="control-group">
                <button id="btnInsertHead" class="btn btn-primary" title="Insert at index 0 (HEAD)">
                  <i class="bi bi-arrow-bar-left"></i> Head
                </button>
                <button id="btnInsertTail" class="btn btn-primary" title="Insert at end (TAIL)">
                  <i class="bi bi-arrow-bar-right"></i> Tail
                </button>
                <button id="btnInsertPos" class="btn btn-primary" title="Insert at 0-based index">
                  <i class="bi bi-plus-circle"></i> At Index
                </button>
                <button id="btnDeleteVal" class="btn btn-danger" title="Delete by value">
                  <i class="bi bi-trash"></i> Del Val
                </button>
                <button id="btnDeletePos" class="btn btn-danger" title="Delete at 0-based index">
                  <i class="bi bi-x-circle"></i> Del Index
                </button>
                <button id="btnSearch" class="btn btn-warning" title="Search value">
                  <i class="bi bi-search"></i> Find
                </button>
                <button id="btnClear" class="btn btn-secondary" title="Reset list">
                  Clear
                </button>
              </div>

            </div>

            <!-- Canvas Visualization Area -->
            <div class="ll-canvas" id="llCanvas">
              <div class="text-muted fw-medium font-mono m-auto" id="emptyListLabel" style="font-size: var(--font-xs);">
                List is empty. Enter a value and choose an operation above!
              </div>
            </div>

            <!-- Status Banner -->
            <div class="status-banner" id="statusText">
              Select an operation to interact with the Singly Linked List (0-based indexing).
            </div>

          </div>

          <!-- Dry-Run C Code Debugger -->
          <div class="code-debugger">
            <div class="debugger-header">
              <span><i class="bi bi-code-slash"></i> Dry-Run C Code</span>
              <span id="opComplexityBadge" class="badge badge-success">O(1)</span>
            </div>
            <div class="debugger-body" id="codeDebugger">
              <div class="text-muted font-mono" style="font-size: var(--font-xs);">Select an operation above to trace C memory execution.</div>
            </div>
          </div>

        </div>
      </div>
    `;

    const llCanvas = container.querySelector('#llCanvas');
    const emptyListLabel = container.querySelector('#emptyListLabel');
    const listTypeSelect = container.querySelector('#listTypeSelect');
    const nodeValInput = container.querySelector('#nodeValInput');
    const nodePosInput = container.querySelector('#nodePosInput');

    const btnInsertHead = container.querySelector('#btnInsertHead');
    const btnInsertTail = container.querySelector('#btnInsertTail');
    const btnInsertPos = container.querySelector('#btnInsertPos');
    const btnDeleteVal = container.querySelector('#btnDeleteVal');
    const btnDeletePos = container.querySelector('#btnDeletePos');
    const btnSearch = container.querySelector('#btnSearch');
    const btnClear = container.querySelector('#btnClear');

    const statusText = container.querySelector('#statusText');
    const codeDebugger = container.querySelector('#codeDebugger');
    const opComplexityBadge = container.querySelector('#opComplexityBadge');

    let currentListType = 'singly'; // 'singly' | 'doubly' | 'circular'
    let linkedList = [10, 20, 30]; // default initial nodes
    let isAnimating = false;

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    // ── C Code Templates (0-based Indexing) ─────────────────────────────────────
    const codeSnippets = {
      singly: {
        insertHead: {
          complexity: 'O(1)',
          lines: [
            'struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));',
            'newNode->data = val;',
            'newNode->next = head;',
            'head = newNode; // index 0'
          ]
        },
        insertTail: {
          complexity: 'O(N)',
          lines: [
            'struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));',
            'newNode->data = val; newNode->next = NULL;',
            'if (head == NULL) { head = newNode; return; }',
            'struct Node* temp = head;',
            'while (temp->next != NULL) { temp = temp->next; }',
            'temp->next = newNode;'
          ]
        },
        insertPos: {
          complexity: 'O(N)',
          lines: [
            'struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));',
            'newNode->data = val;',
            'if (index == 0) { newNode->next = head; head = newNode; return; }',
            'struct Node* temp = head;',
            'for (int i = 0; i < index - 1 && temp != NULL; i++) temp = temp->next;',
            'newNode->next = temp->next;',
            'temp->next = newNode;'
          ]
        },
        deleteVal: {
          complexity: 'O(N)',
          lines: [
            'if (head == NULL) return;',
            'if (head->data == val) { struct Node* temp = head; head = head->next; free(temp); return; }',
            'struct Node* temp = head;',
            'while (temp->next != NULL && temp->next->data != val) temp = temp->next;',
            'if (temp->next == NULL) return; // Value not found',
            'struct Node* toDelete = temp->next;',
            'temp->next = temp->next->next;',
            'free(toDelete);'
          ]
        },
        deletePos: {
          complexity: 'O(N)',
          lines: [
            'if (head == NULL) return;',
            'if (index == 0) { struct Node* temp = head; head = head->next; free(temp); return; }',
            'struct Node* temp = head;',
            'for (int i = 0; i < index - 1 && temp != NULL; i++) temp = temp->next;',
            'struct Node* toDelete = temp->next;',
            'temp->next = toDelete->next;',
            'free(toDelete);'
          ]
        },
        search: {
          complexity: 'O(N)',
          lines: [
            'struct Node* temp = head;',
            'for (int index = 0; temp != NULL; index++) {',
            '    if (temp->data == val) return index; // Found at 0-based index!',
            '    temp = temp->next;',
            '}',
            'return -1; // Not found'
          ]
        }
      },

      doubly: {
        insertHead: {
          complexity: 'O(1)',
          lines: [
            'struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));',
            'newNode->data = val; newNode->prev = NULL; newNode->next = head;',
            'if (head != NULL) head->prev = newNode;',
            'head = newNode;'
          ]
        },
        insertTail: {
          complexity: 'O(N)',
          lines: [
            'struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));',
            'newNode->data = val; newNode->next = NULL;',
            'if (head == NULL) { newNode->prev = NULL; head = newNode; return; }',
            'struct Node* temp = head;',
            'while (temp->next != NULL) temp = temp->next;',
            'temp->next = newNode; newNode->prev = temp;'
          ]
        },
        insertPos: {
          complexity: 'O(N)',
          lines: [
            'struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));',
            'newNode->data = val;',
            'if (index == 0) { newNode->next = head; newNode->prev = NULL; if (head) head->prev = newNode; head = newNode; return; }',
            'struct Node* temp = head;',
            'for (int i = 0; i < index - 1 && temp != NULL; i++) temp = temp->next;',
            'newNode->next = temp->next; newNode->prev = temp;',
            'if (temp->next != NULL) temp->next->prev = newNode;',
            'temp->next = newNode;'
          ]
        },
        deleteVal: {
          complexity: 'O(N)',
          lines: [
            'struct Node* temp = head;',
            'while (temp != NULL && temp->data != val) temp = temp->next;',
            'if (temp == NULL) return; // Not found',
            'if (temp->prev != NULL) temp->prev->next = temp->next; else head = temp->next;',
            'if (temp->next != NULL) temp->next->prev = temp->prev;',
            'free(temp);'
          ]
        },
        deletePos: {
          complexity: 'O(N)',
          lines: [
            'struct Node* temp = head;',
            'for (int i = 0; i < index && temp != NULL; i++) temp = temp->next;',
            'if (temp == NULL) return;',
            'if (temp->prev != NULL) temp->prev->next = temp->next; else head = temp->next;',
            'if (temp->next != NULL) temp->next->prev = temp->prev;',
            'free(temp);'
          ]
        },
        search: {
          complexity: 'O(N)',
          lines: [
            'struct Node* temp = head;',
            'for (int index = 0; temp != NULL; index++) {',
            '    if (temp->data == val) return index;',
            '    temp = temp->next;',
            '}',
            'return -1;'
          ]
        }
      },

      circular: {
        insertHead: {
          complexity: 'O(N)',
          lines: [
            'struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));',
            'newNode->data = val;',
            'if (head == NULL) { newNode->next = newNode; head = newNode; return; }',
            'struct Node* tail = head;',
            'while (tail->next != head) tail = tail->next;',
            'newNode->next = head; tail->next = newNode; head = newNode;'
          ]
        },
        insertTail: {
          complexity: 'O(N)',
          lines: [
            'struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));',
            'newNode->data = val;',
            'if (head == NULL) { newNode->next = newNode; head = newNode; return; }',
            'struct Node* tail = head;',
            'while (tail->next != head) tail = tail->next;',
            'tail->next = newNode; newNode->next = head;'
          ]
        },
        insertPos: {
          complexity: 'O(N)',
          lines: [
            'struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));',
            'newNode->data = val;',
            'if (index == 0) { /* Insert at Head logic */ return; }',
            'struct Node* temp = head;',
            'for (int i = 0; i < index - 1 && temp->next != head; i++) temp = temp->next;',
            'newNode->next = temp->next;',
            'temp->next = newNode;'
          ]
        },
        deleteVal: {
          complexity: 'O(N)',
          lines: [
            'if (head == NULL) return;',
            'if (head->data == val) {',
            '    if (head->next == head) { free(head); head = NULL; return; }',
            '    struct Node* tail = head; while (tail->next != head) tail = tail->next;',
            '    tail->next = head->next; struct Node* toDelete = head; head = head->next; free(toDelete); return;',
            '}',
            'struct Node* temp = head;',
            'while (temp->next != head && temp->next->data != val) temp = temp->next;',
            'if (temp->next != head) { struct Node* toDelete = temp->next; temp->next = toDelete->next; free(toDelete); }'
          ]
        },
        deletePos: {
          complexity: 'O(N)',
          lines: [
            'if (head == NULL) return;',
            'if (index == 0) { /* Delete Head logic in CLL */ return; }',
            'struct Node* temp = head;',
            'for (int i = 0; i < index - 1 && temp->next != head; i++) temp = temp->next;',
            'struct Node* toDelete = temp->next;',
            'temp->next = toDelete->next;',
            'free(toDelete);'
          ]
        },
        search: {
          complexity: 'O(N)',
          lines: [
            'if (head == NULL) return -1;',
            'struct Node* temp = head; int index = 0;',
            'do {',
            '    if (temp->data == val) return index;',
            '    temp = temp->next; index++;',
            '} while (temp != head);',
            'return -1;'
          ]
        }
      }
    };

    function renderCode(opName) {
      const typeTemplates = codeSnippets[currentListType] || codeSnippets.singly;
      const opData = typeTemplates[opName] || typeTemplates.insertHead;
      opComplexityBadge.innerText = opData.complexity;
      codeDebugger.innerHTML = opData.lines
        .map((line, i) => `<div class="code-line" id="ll-line-${i}">${line.replace(/ /g, '&nbsp;')}</div>`)
        .join('');
    }

    function highlightLine(lineNum) {
      codeDebugger.querySelectorAll('.code-line').forEach(el => el.classList.remove('active'));
      if (lineNum !== undefined && lineNum >= 0) {
        const line = codeDebugger.querySelector(`#ll-line-${lineNum}`);
        if (line) {
          line.classList.add('active');
          line.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    // ── Render Dynamic Canvas UI Based on List Type ─────────────────────────────
    function renderListUI() {
      llCanvas.innerHTML = '';
      if (linkedList.length === 0) {
        llCanvas.appendChild(emptyListLabel);
        emptyListLabel.style.display = 'block';
        return;
      }
      emptyListLabel.style.display = 'none';

      // For Doubly Linked List, show leading NULL terminal
      if (currentListType === 'doubly') {
        const leadingNull = document.createElement('div');
        leadingNull.className = 'null-terminal me-2';
        leadingNull.innerText = 'NULL';
        llCanvas.appendChild(leadingNull);

        const leftArrow = document.createElement('i');
        leftArrow.className = 'bi bi-arrow-left-right dll-arrow me-2';
        llCanvas.appendChild(leftArrow);
      }

      linkedList.forEach((val, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'll-node-wrapper';

        // HEAD pointer indicator
        if (index === 0) {
          const headPtr = document.createElement('div');
          headPtr.className = 'head-pointer';
          headPtr.innerHTML = 'HEAD <i class="bi bi-arrow-down-short"></i>';
          wrapper.appendChild(headPtr);
        }

        // TAIL pointer indicator for Doubly
        if (currentListType === 'doubly' && index === linkedList.length - 1 && index > 0) {
          const tailPtr = document.createElement('div');
          tailPtr.className = 'tail-pointer';
          tailPtr.innerHTML = 'TAIL <i class="bi bi-arrow-down-short"></i>';
          wrapper.appendChild(tailPtr);
        }

        // Node element rendering
        const node = document.createElement('div');
        node.id = `ll-node-${index}`;

        if (currentListType === 'doubly') {
          node.className = 'dll-node';
          node.innerHTML = `
            <div class="dll-prev">${index === 0 ? 'NULL' : '&bull;'}</div>
            <div class="dll-data">${val}</div>
            <div class="dll-next">${index === linkedList.length - 1 ? 'NULL' : '&bull;'}</div>
          `;
        } else {
          node.className = 'll-node';
          node.innerHTML = `
            <div class="ll-data">${val}</div>
            <div class="ll-next">${index === linkedList.length - 1 && currentListType === 'singly' ? 'NULL' : '&bull;'}</div>
          `;
        }

        wrapper.appendChild(node);

        // 0-based Index Tag underneath each node
        const indexTag = document.createElement('div');
        indexTag.className = 'node-index-tag';
        indexTag.innerText = `[${index}]`;
        wrapper.appendChild(indexTag);

        llCanvas.appendChild(wrapper);

        // Arrows connecting nodes
        if (index < linkedList.length - 1) {
          const arrow = document.createElement('i');
          arrow.className = currentListType === 'doubly' ? 'bi bi-arrow-left-right dll-arrow' : 'bi bi-arrow-right ll-arrow';
          arrow.id = `ll-arrow-${index}`;
          llCanvas.appendChild(arrow);
        }
      });

      // Circular Linked List Return Loop Indicator
      if (currentListType === 'circular' && linkedList.length > 0) {
        const loopBadge = document.createElement('div');
        loopBadge.className = 'cll-loop-badge';
        loopBadge.innerHTML = `<i class="bi bi-arrow-repeat"></i> next &rarr; HEAD [0] (${linkedList[0]})`;
        llCanvas.appendChild(loopBadge);
      }

      // Doubly Linked List Trailing NULL terminal
      if (currentListType === 'doubly') {
        const rightArrow = document.createElement('i');
        rightArrow.className = 'bi bi-arrow-left-right dll-arrow ms-2';
        llCanvas.appendChild(rightArrow);

        const trailingNull = document.createElement('div');
        trailingNull.className = 'null-terminal ms-2';
        trailingNull.innerText = 'NULL';
        llCanvas.appendChild(trailingNull);
      }
    }

    function setControlsDisabled(disabled) {
      isAnimating = disabled;
      listTypeSelect.disabled = disabled;
      btnInsertHead.disabled = disabled;
      btnInsertTail.disabled = disabled;
      btnInsertPos.disabled = disabled;
      btnDeleteVal.disabled = disabled;
      btnDeletePos.disabled = disabled;
      btnSearch.disabled = disabled;
      btnClear.disabled = disabled;
      nodeValInput.disabled = disabled;
      nodePosInput.disabled = disabled;
    }

    // ── 1. INSERT AT HEAD (Index 0) ─────────────────────────────────────────────
    async function insertHead() {
      const val = nodeValInput.value.trim();
      if (!val || isAnimating) return;
      setControlsDisabled(true);
      renderCode('insertHead');

      statusText.innerHTML = `Allocating new node with value <strong class="text-primary">${val}</strong>...`;
      highlightLine(0); await sleep(500);
      highlightLine(1); await sleep(500);

      linkedList.unshift(val);
      renderListUI();
      const firstNode = llCanvas.querySelector('.ll-node, .dll-node');
      if (firstNode) firstNode.classList.add('new-node');

      statusText.innerHTML = `Updating pointers and setting new node as HEAD at index 0...`;
      highlightLine(2); await sleep(600);
      highlightLine(3); await sleep(600);

      if (firstNode) firstNode.classList.remove('new-node');
      highlightLine(-1);
      statusText.innerHTML = `Inserted <strong class="text-success">${val}</strong> at index 0 (HEAD) successfully.`;
      setControlsDisabled(false);
      nodeValInput.value = '';
    }

    // ── 2. INSERT AT TAIL (Index N) ─────────────────────────────────────────────
    async function insertTail() {
      const val = nodeValInput.value.trim();
      if (!val || isAnimating) return;
      setControlsDisabled(true);
      renderCode('insertTail');

      const targetIndex = linkedList.length;
      statusText.innerHTML = `Allocating new node with value <strong class="text-primary">${val}</strong>...`;
      highlightLine(0); await sleep(500);
      highlightLine(1); await sleep(500);

      if (linkedList.length === 0) {
        highlightLine(2); await sleep(500);
        linkedList.push(val);
        renderListUI();
        const node = llCanvas.querySelector('.ll-node, .dll-node');
        if (node) node.classList.add('new-node');
        await sleep(500);
        if (node) node.classList.remove('new-node');
      } else {
        highlightLine(3); await sleep(500);
        statusText.innerHTML = `Traversing list to find the tail node...`;

        const nodes = llCanvas.querySelectorAll('.ll-node, .dll-node');
        const arrows = llCanvas.querySelectorAll('.ll-arrow, .dll-arrow');

        for (let i = 0; i < linkedList.length; i++) {
          highlightLine(4); await sleep(400);
          if (nodes[i]) nodes[i].classList.add('highlight');
          if (i < linkedList.length - 1 && arrows[i]) {
            arrows[i].classList.add('highlight');
            await sleep(250);
            if (nodes[i]) nodes[i].classList.remove('highlight');
            if (arrows[i]) arrows[i].classList.remove('highlight');
          }
        }

        highlightLine(5); await sleep(500);
        linkedList.push(val);
        renderListUI();

        const allNodes = llCanvas.querySelectorAll('.ll-node, .dll-node');
        const lastNode = allNodes[allNodes.length - 1];
        if (lastNode) {
          lastNode.classList.add('new-node');
          await sleep(500);
          lastNode.classList.remove('new-node');
        }
      }

      statusText.innerHTML = `Inserted <strong class="text-success">${val}</strong> at index ${targetIndex} (TAIL) successfully.`;
      highlightLine(-1);
      setControlsDisabled(false);
      nodeValInput.value = '';
    }

    // ── 3. INSERT AT PREFERRED 0-BASED INDEX ───────────────────────────────────
    async function insertAtPosition() {
      const val = nodeValInput.value.trim();
      const posStr = nodePosInput.value.trim();
      if (!val || isAnimating) return;

      const index = parseInt(posStr);
      if (isNaN(index) || index < 0 || index > linkedList.length) {
        statusText.innerHTML = `<span class="text-danger">Invalid index ${posStr}. Valid 0-based insertion range is 0 to ${linkedList.length}.</span>`;
        return;
      }

      if (index === 0) {
        return insertHead();
      }
      if (index === linkedList.length) {
        return insertTail();
      }

      setControlsDisabled(true);
      renderCode('insertPos');

      statusText.innerHTML = `Allocating node <strong class="text-primary">${val}</strong> for insertion at index ${index}...`;
      highlightLine(0); await sleep(500);
      highlightLine(1); await sleep(500);
      highlightLine(3); await sleep(500);

      statusText.innerHTML = `Traversing to index ${index - 1}...`;
      const nodes = llCanvas.querySelectorAll('.ll-node, .dll-node');
      const arrows = llCanvas.querySelectorAll('.ll-arrow, .dll-arrow');

      for (let i = 0; i < index; i++) {
        highlightLine(4); await sleep(400);
        if (nodes[i]) nodes[i].classList.add('highlight');
        if (i < index - 1 && arrows[i]) {
          arrows[i].classList.add('highlight');
          await sleep(250);
          if (nodes[i]) nodes[i].classList.remove('highlight');
          if (arrows[i]) arrows[i].classList.remove('highlight');
        }
      }

      statusText.innerHTML = `Linking new node at index ${index}...`;
      highlightLine(5); await sleep(600);
      highlightLine(6); await sleep(600);

      linkedList.splice(index, 0, val);
      renderListUI();

      const insertedNode = llCanvas.querySelectorAll('.ll-node, .dll-node')[index];
      if (insertedNode) {
        insertedNode.classList.add('new-node');
        await sleep(600);
        insertedNode.classList.remove('new-node');
      }

      statusText.innerHTML = `Inserted <strong class="text-success">${val}</strong> at index ${index} successfully.`;
      highlightLine(-1);
      setControlsDisabled(false);
      nodeValInput.value = '';
      nodePosInput.value = '';
    }

    // ── 4. DELETE BY VALUE ──────────────────────────────────────────────────────
    async function deleteByValue() {
      const val = nodeValInput.value.trim();
      if (!val || isAnimating) return;
      setControlsDisabled(true);
      renderCode('deleteVal');

      if (linkedList.length === 0) {
        statusText.innerHTML = `<span class="text-danger">List is empty. Nothing to delete.</span>`;
        setControlsDisabled(false);
        return;
      }

      highlightLine(0); await sleep(400);

      // Check HEAD (index 0)
      if (String(linkedList[0]) === String(val)) {
        statusText.innerHTML = `Target value <strong class="text-danger">${val}</strong> found at index 0 (HEAD). Freeing node...`;
        highlightLine(1); await sleep(600);

        const headNode = llCanvas.querySelector('.ll-node, .dll-node');
        if (headNode) headNode.classList.add('delete-node');
        await sleep(600);

        linkedList.shift();
        renderListUI();
        statusText.innerHTML = `Node with value <strong class="text-danger">${val}</strong> at index 0 deleted successfully.`;
      } else {
        statusText.innerHTML = `Searching for node with value <strong class="text-primary">${val}</strong>...`;
        highlightLine(2); await sleep(500);

        const nodes = llCanvas.querySelectorAll('.ll-node, .dll-node');
        const arrows = llCanvas.querySelectorAll('.ll-arrow, .dll-arrow');
        let targetIndex = -1;

        for (let i = 0; i < linkedList.length; i++) {
          highlightLine(3); await sleep(400);
          if (nodes[i]) nodes[i].classList.add('highlight');

          if (String(linkedList[i]) === String(val)) {
            targetIndex = i;
            break;
          }

          if (arrows[i]) arrows[i].classList.add('highlight');
          await sleep(250);
          if (nodes[i]) nodes[i].classList.remove('highlight');
          if (arrows[i]) arrows[i].classList.remove('highlight');
        }

        if (targetIndex === -1) {
          highlightLine(4); await sleep(500);
          statusText.innerHTML = `<span class="text-warning">Value ${val} not found in the list.</span>`;
        } else {
          statusText.innerHTML = `Found value ${val} at index ${targetIndex}. Updating pointers and freeing memory...`;
          highlightLine(5); await sleep(600);

          if (nodes[targetIndex]) nodes[targetIndex].classList.add('delete-node');
          highlightLine(6); await sleep(600);
          highlightLine(7); await sleep(600);

          linkedList.splice(targetIndex, 1);
          renderListUI();
          statusText.innerHTML = `Node with value <strong class="text-danger">${val}</strong> at index ${targetIndex} successfully deleted.`;
        }
      }

      highlightLine(-1);
      setControlsDisabled(false);
      nodeValInput.value = '';
    }

    // ── 5. DELETE AT PREFERRED 0-BASED INDEX ────────────────────────────────────
    async function deleteAtPosition() {
      const posStr = nodePosInput.value.trim();
      if (isAnimating) return;

      const index = parseInt(posStr);
      if (isNaN(index) || index < 0 || index >= linkedList.length) {
        statusText.innerHTML = `<span class="text-danger">Invalid index. Enter a 0-based index between 0 and ${linkedList.length - 1}.</span>`;
        return;
      }

      setControlsDisabled(true);
      renderCode('deletePos');

      highlightLine(0); await sleep(400);

      if (index === 0) {
        statusText.innerHTML = `Deleting node at index 0 (HEAD)...`;
        highlightLine(1); await sleep(600);

        const headNode = llCanvas.querySelector('.ll-node, .dll-node');
        if (headNode) headNode.classList.add('delete-node');
        await sleep(600);

        const deletedVal = linkedList.shift();
        renderListUI();
        statusText.innerHTML = `Deleted node (value: <strong class="text-danger">${deletedVal}</strong>) at index 0.`;
      } else {
        statusText.innerHTML = `Traversing to index ${index}...`;
        highlightLine(2); await sleep(400);

        const nodes = llCanvas.querySelectorAll('.ll-node, .dll-node');
        const arrows = llCanvas.querySelectorAll('.ll-arrow, .dll-arrow');

        for (let i = 0; i <= index; i++) {
          highlightLine(3); await sleep(400);
          if (nodes[i]) nodes[i].classList.add('highlight');
          if (i < index && arrows[i]) arrows[i].classList.add('highlight');
          await sleep(250);
          if (nodes[i]) nodes[i].classList.remove('highlight');
          if (arrows[i]) arrows[i].classList.remove('highlight');
        }

        const targetNode = nodes[index];
        if (targetNode) targetNode.classList.add('delete-node');

        statusText.innerHTML = `Bypassing pointers and freeing node at index ${index}...`;
        highlightLine(4); await sleep(600);
        highlightLine(5); await sleep(600);
        highlightLine(6); await sleep(600);

        const deletedVal = linkedList.splice(index, 1)[0];
        renderListUI();
        statusText.innerHTML = `Successfully deleted node (value: <strong class="text-danger">${deletedVal}</strong>) at index ${index}.`;
      }

      highlightLine(-1);
      setControlsDisabled(false);
      nodePosInput.value = '';
    }

    // ── 6. SEARCH VALUE (Returns 0-based index) ─────────────────────────────────
    async function searchVal() {
      const val = nodeValInput.value.trim();
      if (!val || isAnimating) return;
      setControlsDisabled(true);
      renderCode('search');

      statusText.innerHTML = `Searching for value <strong class="text-primary">${val}</strong>...`;
      highlightLine(0); await sleep(400);

      const nodes = llCanvas.querySelectorAll('.ll-node, .dll-node');
      const arrows = llCanvas.querySelectorAll('.ll-arrow, .dll-arrow');
      let foundIndex = -1;

      for (let i = 0; i < linkedList.length; i++) {
        highlightLine(1); await sleep(400);
        if (nodes[i]) nodes[i].classList.add('highlight');

        highlightLine(2); await sleep(300);
        if (String(linkedList[i]) === String(val)) {
          foundIndex = i;
          break;
        }

        highlightLine(3); await sleep(300);
        if (arrows[i]) arrows[i].classList.add('highlight');
        await sleep(250);
        if (nodes[i]) nodes[i].classList.remove('highlight');
        if (arrows[i]) arrows[i].classList.remove('highlight');
      }

      if (foundIndex !== -1) {
        statusText.innerHTML = `<span class="text-success fw-bold">Found value ${val} at index ${foundIndex}!</span>`;
        if (nodes[foundIndex]) {
          nodes[foundIndex].classList.add('new-node');
          await sleep(1000);
          nodes[foundIndex].classList.remove('new-node');
        }
      } else {
        highlightLine(5); await sleep(400);
        statusText.innerHTML = `<span class="text-warning">Value ${val} not found in the linked list.</span>`;
      }

      highlightLine(-1);
      setControlsDisabled(false);
    }

    // ── Event Handlers ──────────────────────────────────────────────────────────
    listTypeSelect.addEventListener('change', () => {
      if (!isAnimating) {
        currentListType = listTypeSelect.value;
        const typeLabels = {
          singly: 'Singly Linked List',
          doubly: 'Doubly Linked List',
          circular: 'Circular Linked List'
        };
        statusText.innerHTML = `Switched to <strong class="text-primary">${typeLabels[currentListType]}</strong> mode (0-based indexing).`;
        renderListUI();
        renderCode('insertHead');
      }
    });

    btnInsertHead.addEventListener('click', insertHead);
    btnInsertTail.addEventListener('click', insertTail);
    btnInsertPos.addEventListener('click', insertAtPosition);
    btnDeleteVal.addEventListener('click', deleteByValue);
    btnDeletePos.addEventListener('click', deleteAtPosition);
    btnSearch.addEventListener('click', searchVal);

    nodeValInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') insertHead();
    });

    btnClear.addEventListener('click', () => {
      if (!isAnimating) {
        linkedList = [];
        renderListUI();
        statusText.innerHTML = 'List cleared.';
        codeDebugger.innerHTML = '<div class="text-muted font-mono" style="font-size: var(--font-xs);">Select an operation above to trace C memory execution.</div>';
      }
    });

    // Initial render
    renderListUI();
    renderCode('insertHead');
  }
};
