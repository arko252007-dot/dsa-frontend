export const sortingVisualizer = {
  id: 'sorting',
  title: 'Sorting Algorithms',
  badge: 'Unit 1',
  description: 'Visualize Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort with real-time C code dry-run tracing.',

  mount(container) {
    container.innerHTML = `
      <div class="visualizer-wrapper">
        <div class="visualizer-header">
          <div class="d-flex align-items-center gap-2">
            <div class="category-icon-badge cat-array-badge">
              <i class="bi bi-bar-chart-steps"></i>
            </div>
            <h2 class="visualizer-title mb-0">Sorting Algorithms</h2>
          </div>
          <a href="/visualizations" class="btn btn-secondary btn-sm">
            <i class="bi bi-arrow-left"></i> Back to Hub
          </a>
        </div>

        <div class="visualizer-layout sorting-layout">
          <div class="visualizer-canvas-panel card-panel">
            <div class="visualizer-controls sorting-controls">
              <div class="control-group sorting-primary-controls">
                <select id="algoSelect" class="form-select sorting-select">
                  <option value="bubble">Bubble Sort</option>
                  <option value="selection">Selection Sort</option>
                  <option value="insertion">Insertion Sort</option>
                  <option value="merge">Merge Sort</option>
                  <option value="quick">Quick Sort</option>
                </select>
                <button id="btnGenerate" class="btn btn-secondary text-nowrap">
                  <i class="bi bi-shuffle"></i> Randomize
                </button>
              </div>

              <div class="control-group sorting-action-controls">
                <button id="btnStep" class="btn btn-warning">
                  <i class="bi bi-step-forward"></i> Step
                </button>
                <button id="btnPlay" class="btn btn-primary">
                  <i class="bi bi-play-fill"></i> Play
                </button>
              </div>
            </div>

            <div class="bars-container" id="barsContainer"></div>

            <div class="sorting-sliders-container d-flex align-items-center justify-content-between flex-wrap gap-2 mt-2">
              <div class="d-flex align-items-center gap-2 flex-fill" style="min-width: 120px;">
                <span class="form-label mb-0 small text-nowrap">Size:</span>
                <input type="range" class="form-range" id="sizeRange" min="6" max="28" value="14">
              </div>
              <div class="d-flex align-items-center gap-2 flex-fill" style="min-width: 120px;">
                <span class="form-label mb-0 small text-nowrap">Speed:</span>
                <input type="range" class="form-range" id="speedRange" min="50" max="1000" value="350">
              </div>
            </div>

            <div class="status-banner" id="statusText">
              Ready to sort. Click Step or Play to begin.
            </div>
          </div>

          <div class="code-debugger">
            <div class="debugger-header">
              <span><i class="bi bi-code-slash"></i> Dry-Run C Code</span>
              <span id="algoComplexityBadge" class="badge badge-primary">O(N²)</span>
            </div>
            <div class="debugger-body" id="codeDebugger"></div>
          </div>
        </div>
      </div>
    `;

    // Elements
    const barsContainer = container.querySelector('#barsContainer');
    const codeDebugger = container.querySelector('#codeDebugger');
    const algoSelect = container.querySelector('#algoSelect');
    const btnGenerate = container.querySelector('#btnGenerate');
    const btnPlay = container.querySelector('#btnPlay');
    const btnStep = container.querySelector('#btnStep');
    const sizeRange = container.querySelector('#sizeRange');
    const speedRange = container.querySelector('#speedRange');
    const statusText = container.querySelector('#statusText');
    const algoComplexityBadge = container.querySelector('#algoComplexityBadge');

    let array = [];
    let bars = [];
    let operations = [];
    let currentStep = 0;
    let isPlaying = false;
    let playTimer = null;

    const algorithms = {
      bubble: {
        complexity: 'O(N²)',
        code: [
          'void bubbleSort(int arr[], int n) {',
          '    for (int i = 0; i < n - 1; i++) {',
          '        for (int j = 0; j < n - i - 1; j++) {',
          '            if (arr[j] > arr[j + 1]) {',
          '                swap(&arr[j], &arr[j + 1]);',
          '            }',
          '        }',
          '    }',
          '}'
        ],
        generate: () => {
          let tempArr = [...array];
          for (let i = 0; i < tempArr.length - 1; i++) {
            for (let j = 0; j < tempArr.length - i - 1; j++) {
              operations.push({ type: 'compare', indices: [j, j + 1], line: 3, msg: `Comparing arr[${j}] (${tempArr[j]}) with arr[${j + 1}] (${tempArr[j + 1]})` });
              if (tempArr[j] > tempArr[j + 1]) {
                operations.push({ type: 'swap', indices: [j, j + 1], line: 4, msg: `Swapping ${tempArr[j]} and ${tempArr[j + 1]}` });
                let t = tempArr[j]; tempArr[j] = tempArr[j + 1]; tempArr[j + 1] = t;
              }
            }
            operations.push({ type: 'sorted', index: tempArr.length - 1 - i, line: 1, msg: `${tempArr[tempArr.length - 1 - i]} placed in final sorted position.` });
          }
          operations.push({ type: 'sorted', index: 0, line: 0, msg: `Array is fully sorted!` });
        }
      },

      selection: {
        complexity: 'O(N²)',
        code: [
          'void selectionSort(int arr[], int n) {',
          '    for (int i = 0; i < n - 1; i++) {',
          '        int min_idx = i;',
          '        for (int j = i + 1; j < n; j++) {',
          '            if (arr[j] < arr[min_idx])',
          '                min_idx = j;',
          '        }',
          '        swap(&arr[min_idx], &arr[i]);',
          '    }',
          '}'
        ],
        generate: () => {
          let tempArr = [...array];
          for (let i = 0; i < tempArr.length - 1; i++) {
            let min_idx = i;
            operations.push({ type: 'highlight', indices: [min_idx], line: 2, msg: `Initial minimum candidate is index ${min_idx} (${tempArr[min_idx]})` });
            for (let j = i + 1; j < tempArr.length; j++) {
              operations.push({ type: 'compare', indices: [j, min_idx], line: 4, msg: `Comparing arr[${j}] (${tempArr[j]}) with current min (${tempArr[min_idx]})` });
              if (tempArr[j] < tempArr[min_idx]) {
                min_idx = j;
                operations.push({ type: 'highlight', indices: [min_idx], line: 5, msg: `Found new minimum element: ${tempArr[min_idx]}` });
              }
            }
            if (min_idx !== i) {
              operations.push({ type: 'swap', indices: [i, min_idx], line: 7, msg: `Placing minimum (${tempArr[min_idx]}) at index ${i}` });
              let t = tempArr[i]; tempArr[i] = tempArr[min_idx]; tempArr[min_idx] = t;
            }
            operations.push({ type: 'sorted', index: i, line: 1, msg: `Index ${i} (${tempArr[i]}) is sorted.` });
          }
          operations.push({ type: 'sorted', index: tempArr.length - 1, line: 0, msg: `Array is fully sorted!` });
        }
      },

      insertion: {
        complexity: 'O(N²)',
        code: [
          'void insertionSort(int arr[], int n) {',
          '    for (int i = 1; i < n; i++) {',
          '        int key = arr[i];',
          '        int j = i - 1;',
          '        while (j >= 0 && arr[j] > key) {',
          '            arr[j + 1] = arr[j];',
          '            j--;',
          '        }',
          '        arr[j + 1] = key;',
          '    }',
          '}'
        ],
        generate: () => {
          let tempArr = [...array];
          operations.push({ type: 'sorted', index: 0, line: 0, msg: `First element (${tempArr[0]}) is already conceptually sorted.` });
          for (let i = 1; i < tempArr.length; i++) {
            let key = tempArr[i];
            let j = i - 1;
            operations.push({ type: 'highlight', indices: [i], line: 2, msg: `Current key to insert: ${key}` });
            while (j >= 0) {
              operations.push({ type: 'compare', indices: [j, j + 1], line: 4, msg: `Comparing key ${key} with arr[${j}] (${tempArr[j]})` });
              if (tempArr[j] > key) {
                operations.push({ type: 'overwrite', index: j + 1, val: tempArr[j], line: 5, msg: `Shifting ${tempArr[j]} one position right to index ${j + 1}` });
                tempArr[j + 1] = tempArr[j];
                j--;
              } else {
                break;
              }
            }
            operations.push({ type: 'overwrite', index: j + 1, val: key, line: 8, msg: `Inserted key ${key} at index ${j + 1}` });
            tempArr[j + 1] = key;
            for (let k = 0; k <= i; k++) {
              operations.push({ type: 'sorted', index: k, line: 1, msg: '' });
            }
          }
          operations.push({ type: 'msg', line: 0, msg: `Array is fully sorted!` });
        }
      },

      merge: {
        complexity: 'O(N log N)',
        code: [
          'void mergeSort(int arr[], int l, int r) {',
          '    if (l < r) {',
          '        int m = l + (r - l) / 2;',
          '        mergeSort(arr, l, m);',
          '        mergeSort(arr, m + 1, r);',
          '        merge(arr, l, m, r);',
          '    }',
          '}',
          'void merge(int arr[], int l, int m, int r) {',
          '    // Merge sorted subarrays arr[l..m] and arr[m+1..r]',
          '    int i = l, j = m + 1, k = 0;',
          '    while (i <= m && j <= r) {',
          '        if (arr[i] <= arr[j]) temp[k++] = arr[i++];',
          '        else temp[k++] = arr[j++];',
          '    }',
          '    // Copy back into original array arr[l..r]',
          '}'
        ],
        generate: () => {
          let tempArr = [...array];

          function merge(l, m, r) {
            let leftArr = tempArr.slice(l, m + 1);
            let rightArr = tempArr.slice(m + 1, r + 1);
            let i = 0, j = 0, k = l;

            operations.push({ type: 'highlight', indices: Array.from({ length: r - l + 1 }, (_, idx) => l + idx), line: 5, msg: `Merging subarrays [${l}..${m}] and [${m + 1}..${r}]` });

            while (i < leftArr.length && j < rightArr.length) {
              operations.push({ type: 'compare', indices: [l + i, m + 1 + j], line: 11, msg: `Comparing Left element (${leftArr[i]}) with Right element (${rightArr[j]})` });
              if (leftArr[i] <= rightArr[j]) {
                operations.push({ type: 'overwrite', index: k, val: leftArr[i], line: 12, msg: `Placed ${leftArr[i]} at merged index ${k}` });
                tempArr[k++] = leftArr[i++];
              } else {
                operations.push({ type: 'overwrite', index: k, val: rightArr[j], line: 13, msg: `Placed ${rightArr[j]} at merged index ${k}` });
                tempArr[k++] = rightArr[j++];
              }
            }

            while (i < leftArr.length) {
              operations.push({ type: 'overwrite', index: k, val: leftArr[i], line: 14, msg: `Placed remaining Left element ${leftArr[i]} at index ${k}` });
              tempArr[k++] = leftArr[i++];
            }

            while (j < rightArr.length) {
              operations.push({ type: 'overwrite', index: k, val: rightArr[j], line: 14, msg: `Placed remaining Right element ${rightArr[j]} at index ${k}` });
              tempArr[k++] = rightArr[j++];
            }

            if (l === 0 && r === tempArr.length - 1) {
              for (let idx = 0; idx < tempArr.length; idx++) {
                operations.push({ type: 'sorted', index: idx, line: 0, msg: '' });
              }
            }
          }

          function mergeSortHelper(l, r) {
            if (l < r) {
              let m = Math.floor(l + (r - l) / 2);
              operations.push({ type: 'msg', line: 2, msg: `Dividing range [${l}..${r}] at midpoint ${m}` });
              mergeSortHelper(l, m);
              mergeSortHelper(m + 1, r);
              merge(l, m, r);
            }
          }

          mergeSortHelper(0, tempArr.length - 1);
          operations.push({ type: 'msg', line: 0, msg: `Merge sort completed! Array is fully sorted.` });
        }
      },

      quick: {
        complexity: 'O(N log N)',
        code: [
          'void quickSort(int arr[], int low, int high) {',
          '    if (low < high) {',
          '        int pi = partition(arr, low, high);',
          '        quickSort(arr, low, pi - 1);',
          '        quickSort(arr, pi + 1, high);',
          '    }',
          '}',
          'int partition(int arr[], int low, int high) {',
          '    int pivot = arr[high]; // Pivot at end',
          '    int i = (low - 1);',
          '    for (int j = low; j < high; j++) {',
          '        if (arr[j] < pivot) {',
          '            i++; swap(&arr[i], &arr[j]);',
          '        }',
          '    }',
          '    swap(&arr[i + 1], &arr[high]);',
          '    return (i + 1);',
          '}'
        ],
        generate: () => {
          let tempArr = [...array];

          function partition(low, high) {
            let pivot = tempArr[high];
            operations.push({ type: 'pivot', index: high, line: 8, msg: `Chosen Pivot element: arr[${high}] = ${pivot}` });
            let i = low - 1;

            for (let j = low; j < high; j++) {
              operations.push({ type: 'compare', indices: [j, high], line: 11, msg: `Comparing arr[${j}] (${tempArr[j]}) with Pivot (${pivot})` });
              if (tempArr[j] < pivot) {
                i++;
                if (i !== j) {
                  operations.push({ type: 'swap', indices: [i, j], line: 12, msg: `Swapping smaller element ${tempArr[j]} to left partition at index ${i}` });
                  let t = tempArr[i]; tempArr[i] = tempArr[j]; tempArr[j] = t;
                }
              }
            }

            operations.push({ type: 'swap', indices: [i + 1, high], line: 15, msg: `Placing Pivot ${pivot} into correct sorted boundary at index ${i + 1}` });
            let t = tempArr[i + 1]; tempArr[i + 1] = tempArr[high]; tempArr[high] = t;
            operations.push({ type: 'sorted', index: i + 1, line: 16, msg: `Pivot ${tempArr[i + 1]} is now at its final sorted position.` });
            return i + 1;
          }

          function quickSortHelper(low, high) {
            if (low < high) {
              operations.push({ type: 'msg', line: 1, msg: `Partitioning subarray range [${low}..${high}]` });
              let pi = partition(low, high);
              quickSortHelper(low, pi - 1);
              quickSortHelper(pi + 1, high);
            } else if (low === high) {
              operations.push({ type: 'sorted', index: low, line: 0, msg: `Single element at index ${low} is sorted.` });
            }
          }

          quickSortHelper(0, tempArr.length - 1);
          operations.push({ type: 'msg', line: 0, msg: `Quick sort completed! Array is fully sorted.` });
        }
      }
    };

    function renderCode() {
      const algo = algoSelect.value;
      const data = algorithms[algo];
      algoComplexityBadge.innerText = data.complexity;
      codeDebugger.innerHTML = data.code
        .map((line, i) => `<div class="code-line" id="sort-line-${i}">${line.replace(/ /g, '&nbsp;')}</div>`)
        .join('');
    }

    function highlightLine(lineNum) {
      codeDebugger.querySelectorAll('.code-line').forEach(el => el.classList.remove('active'));
      if (lineNum !== undefined && lineNum >= 0) {
        const line = codeDebugger.querySelector(`#sort-line-${lineNum}`);
        if (line) {
          line.classList.add('active');
          line.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    function generateArray() {
      barsContainer.innerHTML = '';
      array = [];
      bars = [];
      const size = parseInt(sizeRange.value);
      const containerWidth = barsContainer.clientWidth || 360;
      const containerHeight = barsContainer.clientHeight || 240;
      const maxHeight = Math.max(100, containerHeight - 35);
      const availableWidth = Math.max(160, containerWidth - (size * 2) - 16);
      const barWidth = Math.max(6, Math.min(42, Math.floor(availableWidth / size)));

      for (let i = 0; i < size; i++) {
        const val = Math.floor(Math.random() * (maxHeight - 25)) + 25;
        array.push(val);
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${val}px`;
        bar.style.width = `${barWidth}px`;
        bar.style.flex = `0 1 ${barWidth}px`;
        if (barWidth >= 18 && size <= 18) {
          bar.innerText = val;
        } else {
          bar.innerText = '';
        }
        barsContainer.appendChild(bar);
        bars.push(bar);
      }
      resetState();
    }

    function resetState() {
      operations = [];
      currentStep = 0;
      isPlaying = false;
      clearInterval(playTimer);
      btnPlay.innerHTML = '<i class="bi bi-play-fill"></i> Play';
      btnStep.disabled = false;
      statusText.innerText = 'Ready to sort. Click Step or Play to begin.';
      bars.forEach(b => (b.className = 'bar'));
      renderCode();
      algorithms[algoSelect.value].generate();
    }

    function applyStep() {
      if (currentStep >= operations.length) {
        togglePlay(true);
        bars.forEach(b => b.classList.add('sorted'));
        statusText.innerHTML = '<span class="text-success fw-bold"><i class="bi bi-check-circle-fill"></i> Sorting Completed!</span>';
        return;
      }

      // Clear non-sorted and temporary highlights
      bars.forEach(b => {
        if (!b.classList.contains('sorted')) {
          b.classList.remove('comparing', 'swapping', 'pivot');
        }
      });

      const op = operations[currentStep];
      highlightLine(op.line);
      if (op.msg) statusText.innerText = op.msg;

      if (op.type === 'compare' || op.type === 'highlight') {
        op.indices.forEach(i => bars[i] && bars[i].classList.add('comparing'));
      } else if (op.type === 'pivot') {
        if (bars[op.index]) bars[op.index].classList.add('pivot');
      } else if (op.type === 'swap') {
        const [i, j] = op.indices;
        if (bars[i] && bars[j]) {
          bars[i].classList.add('swapping');
          bars[j].classList.add('swapping');
          let h = bars[i].style.height;
          let t = bars[i].innerText;
          bars[i].style.height = bars[j].style.height;
          bars[i].innerText = bars[j].innerText;
          bars[j].style.height = h;
          bars[j].innerText = t;
        }
      } else if (op.type === 'overwrite') {
        if (bars[op.index]) {
          bars[op.index].classList.add('swapping');
          bars[op.index].style.height = `${op.val}px`;
          const bw = parseFloat(bars[op.index].style.width) || 20;
          if (bw >= 18 && bars.length <= 18) {
            bars[op.index].innerText = op.val;
          }
        }
      } else if (op.type === 'sorted') {
        if (bars[op.index]) bars[op.index].classList.add('sorted');
      }

      currentStep++;
    }

    function togglePlay(forceStop = false) {
      if (isPlaying || forceStop) {
        isPlaying = false;
        clearInterval(playTimer);
        btnPlay.innerHTML = '<i class="bi bi-play-fill"></i> Play';
        btnStep.disabled = false;
      } else {
        if (currentStep >= operations.length) {
          generateArray();
        }
        isPlaying = true;
        btnPlay.innerHTML = '<i class="bi bi-pause-fill"></i> Pause';
        btnStep.disabled = true;
        const speed = 1050 - parseInt(speedRange.value);
        playTimer = setInterval(applyStep, speed);
      }
    }

    const handleResize = () => {
      if (!isPlaying && bars.length > 0) {
        const containerWidth = barsContainer.clientWidth || 360;
        const availableWidth = Math.max(160, containerWidth - (bars.length * 2) - 16);
        const barWidth = Math.max(6, Math.min(42, Math.floor(availableWidth / bars.length)));
        bars.forEach((bar, i) => {
          bar.style.width = `${barWidth}px`;
          bar.style.flex = `0 1 ${barWidth}px`;
          if (barWidth >= 18 && bars.length <= 18) {
            bar.innerText = array[i] !== undefined ? array[i] : '';
          } else {
            bar.innerText = '';
          }
        });
      }
    };

    // Event Bindings
    btnGenerate.addEventListener('click', generateArray);
    algoSelect.addEventListener('change', generateArray);
    sizeRange.addEventListener('input', generateArray);
    btnStep.addEventListener('click', applyStep);
    btnPlay.addEventListener('click', () => togglePlay());
    speedRange.addEventListener('input', () => {
      if (isPlaying) {
        clearInterval(playTimer);
        const speed = 1050 - parseInt(speedRange.value);
        playTimer = setInterval(applyStep, speed);
      }
    });
    window.addEventListener('resize', handleResize);

    generateArray();

    return () => {
      clearInterval(playTimer);
      window.removeEventListener('resize', handleResize);
    };
  }
};
