export const hashingVisualizer = {
  id: 'hashing',
  title: 'Hashing & Linear Probing',
  badge: 'Unit 2',
  description: 'Interactive modulo hash function calculation with linear probing collision resolution animation.',

  mount(container) {
    container.innerHTML = `
      <div class="visualizer-wrapper">
        <div class="visualizer-header">
          <h2 class="visualizer-title">
            <i class="bi bi-grid-3x3 text-warning"></i> Hashing & Linear Probing
          </h2>
          <a href="/visualizations" class="btn btn-secondary btn-sm">
            <i class="bi bi-arrow-left"></i> Back to Hub
          </a>
        </div>

        <div class="visualizer-layout">
          <div class="visualizer-canvas-panel card-panel">
            <div class="visualizer-controls">
              <div class="control-group">
                <div class="d-flex align-items-center gap-1">
                  <span class="form-label mb-0">Size:</span>
                  <input type="number" id="tableSizeInput" class="form-control" value="10" min="5" max="20" style="width: 75px;">
                </div>
                <input type="number" id="hashValInput" class="form-control" placeholder="Insert Value (e.g. 45)" style="width: 170px;">
                <button id="btnInsert" class="btn btn-warning">Insert</button>
                <button id="btnReset" class="btn btn-secondary">Reset Table</button>
              </div>
            </div>

            <div class="hash-table-grid" id="hashTableGrid"></div>

            <div class="status-banner" id="statusText">
              Formula: h(x) = x % Table_Size
            </div>
          </div>

          <div class="code-debugger">
            <div class="debugger-header">
              <span><i class="bi bi-code-slash"></i> Linear Probing C Code</span>
              <span class="badge badge-warning">O(1) Avg</span>
            </div>
            <div class="debugger-body" id="codeDebugger"></div>
          </div>
        </div>
      </div>
    `;

    const hashTableGrid = container.querySelector('#hashTableGrid');
    const tableSizeInput = container.querySelector('#tableSizeInput');
    const hashValInput = container.querySelector('#hashValInput');
    const btnInsert = container.querySelector('#btnInsert');
    const btnReset = container.querySelector('#btnReset');
    const statusText = container.querySelector('#statusText');
    const codeDebugger = container.querySelector('#codeDebugger');

    let table = [];
    let size = 10;
    let isAnimating = false;

    const codeSnippet = [
      'void insert(int val) {',
      '    int key = val % size;',
      '    if (table[key] == EMPTY) {',
      '        table[key] = val;',
      '        return;',
      '    }',
      '    // Collision detected! Linear probing begins:',
      '    int original_key = key;',
      '    while (table[key] != EMPTY) {',
      '        key = (key + 1) % size;',
      '        if (key == original_key) {',
      '            printf("Table is full!\\n");',
      '            return;',
      '        }',
      '    }',
      '    table[key] = val;',
      '}'
    ];

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    function initTable() {
      size = parseInt(tableSizeInput.value) || 10;
      size = Math.min(Math.max(size, 5), 20);
      tableSizeInput.value = size;
      table = new Array(size).fill(null);
      hashTableGrid.innerHTML = '';

      for (let i = 0; i < size; i++) {
        const bucket = document.createElement('div');
        bucket.className = 'hash-bucket';
        bucket.id = `bucket-${i}`;
        bucket.innerHTML = `
          <div class="hash-index">[${i}]</div>
          <div class="hash-val" id="hash-val-${i}">-</div>
        `;
        hashTableGrid.appendChild(bucket);
      }

      codeDebugger.innerHTML = codeSnippet
        .map((line, i) => `<div class="code-line" id="hash-line-${i}">${line.replace(/ /g, '&nbsp;')}</div>`)
        .join('');

      statusText.innerHTML = `Formula: <strong>h(x) = x % ${size}</strong>`;
    }

    function highlightLine(lineNum) {
      codeDebugger.querySelectorAll('.code-line').forEach(el => el.classList.remove('active'));
      if (lineNum !== undefined && lineNum >= 0) {
        const line = codeDebugger.querySelector(`#hash-line-${lineNum}`);
        if (line) {
          line.classList.add('active');
          line.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    function resetBucketStyles() {
      hashTableGrid.querySelectorAll('.hash-bucket').forEach(b => {
        b.classList.remove('highlight', 'success', 'collision');
      });
    }

    async function insertValue() {
      if (isAnimating) return;
      const rawVal = hashValInput.value.trim();
      if (!rawVal) return;
      const val = parseInt(rawVal);
      if (isNaN(val)) return;

      isAnimating = true;
      btnInsert.disabled = true;
      btnReset.disabled = true;
      resetBucketStyles();

      highlightLine(0); await sleep(500);

      // Normalize negative inputs
      let key = val % size;
      if (key < 0) key += size;

      statusText.innerHTML = `Computed: <strong>h(${val}) = ${val} % ${size} = ${key}</strong>`;
      highlightLine(1); await sleep(700);

      let bucketElement = hashTableGrid.querySelector(`#bucket-${key}`);
      if (bucketElement) bucketElement.classList.add('highlight');

      highlightLine(2); await sleep(600);

      if (table[key] === null) {
        statusText.innerHTML = `Bucket [${key}] is empty. Storing value <strong class="text-success">${val}</strong>...`;
        highlightLine(3); await sleep(600);

        table[key] = val;
        const valElem = bucketElement.querySelector('.hash-val');
        if (valElem) valElem.innerText = val;
        bucketElement.classList.remove('highlight');
        bucketElement.classList.add('success');

        highlightLine(4); await sleep(600);
      } else {
        statusText.innerHTML = `<span class="text-danger">Collision at bucket [${key}] (contains ${table[key]})! Starting linear probe...</span>`;
        bucketElement.classList.remove('highlight');
        bucketElement.classList.add('collision');
        highlightLine(6); await sleep(700);

        // Linear probing wraps around — track start index to detect a full table cycle
        const original_key = key;
        highlightLine(7); await sleep(400);

        while (table[key] !== null) {
          highlightLine(8); await sleep(400);
          bucketElement.classList.remove('collision');

          key = (key + 1) % size;
          statusText.innerHTML = `Probing next bucket: index <strong>[${key}]</strong>...`;
          highlightLine(9); await sleep(500);

          bucketElement = hashTableGrid.querySelector(`#bucket-${key}`);
          if (bucketElement) bucketElement.classList.add('highlight');

          highlightLine(10); await sleep(400);
          if (key === original_key) {
            highlightLine(11); await sleep(600);
            statusText.innerHTML = `<span class="text-danger fw-bold">Hash Table is FULL! Cannot insert ${val}.</span>`;
            if (bucketElement) bucketElement.classList.remove('highlight');
            isAnimating = false;
            btnInsert.disabled = false;
            btnReset.disabled = false;
            hashValInput.value = '';
            return;
          }

          if (table[key] !== null) {
            bucketElement.classList.remove('highlight');
            bucketElement.classList.add('collision');
          }
        }

        statusText.innerHTML = `Found empty bucket at <strong>[${key}]</strong>. Storing value <strong class="text-success">${val}</strong>!`;
        highlightLine(15); await sleep(600);
        table[key] = val;
        const valElem = bucketElement.querySelector('.hash-val');
        if (valElem) valElem.innerText = val;
        bucketElement.classList.remove('highlight');
        bucketElement.classList.add('success');
      }

      highlightLine(-1);
      isAnimating = false;
      btnInsert.disabled = false;
      btnReset.disabled = false;
      hashValInput.value = '';
      await sleep(1000);
      resetBucketStyles();
      statusText.innerHTML = `Formula: <strong>h(x) = x % ${size}</strong>`;
    }

    btnReset.addEventListener('click', () => {
      if (!isAnimating) initTable();
    });
    tableSizeInput.addEventListener('change', () => {
      if (!isAnimating) initTable();
    });
    btnInsert.addEventListener('click', insertValue);
    hashValInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') insertValue();
    });

    initTable();
  }
};
