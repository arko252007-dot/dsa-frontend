// Tower of Hanoi Recursion Visualizer Engine
export const hanoiVisualizer = {
  id: 'hanoi',
  title: 'Tower of Hanoi (Recursion)',
  badge: 'Unit 3',
  description: 'Visualize recursive call stack decomposition solving the Tower of Hanoi puzzle in optimal 2^N - 1 moves.',

  mount(container) {
    container.innerHTML = `
      <div class="visualizer-wrapper">
        <div class="visualizer-header">
          <h2 class="visualizer-title">
            <i class="bi bi-stack text-info"></i> Tower of Hanoi (Recursion)
          </h2>
          <a href="#/visualizations" class="btn btn-secondary btn-sm">
            <i class="bi bi-arrow-left"></i> Back to Hub
          </a>
        </div>

        <div class="visualizer-layout">
          <div class="visualizer-canvas-panel card-panel">
            <div class="visualizer-controls">
              <div class="control-group">
                <div class="d-flex align-items-center gap-1">
                  <span class="form-label mb-0">Disks:</span>
                  <select id="diskCountSelect" class="form-select" style="width: 75px;">
                    <option value="3" selected>3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <button id="btnReset" class="btn btn-secondary">Reset</button>
                <button id="btnStep" class="btn btn-warning">Step</button>
                <button id="btnPlay" class="btn btn-primary">Auto Play</button>
              </div>

              <div class="control-group">
                <span class="form-label mb-0">Speed:</span>
                <input type="range" class="form-range" id="speedRange" min="100" max="1500" value="800" style="width: 100px;">
              </div>
            </div>

            <div class="hanoi-stage">
              <div class="peg-column">
                <div class="peg-title">Source (A)</div>
                <div class="peg-container" id="peg-A">
                  <div class="peg-rod"></div>
                  <div class="peg-base"></div>
                </div>
              </div>

              <div class="peg-column">
                <div class="peg-title">Auxiliary (B)</div>
                <div class="peg-container" id="peg-B">
                  <div class="peg-rod"></div>
                  <div class="peg-base"></div>
                </div>
              </div>

              <div class="peg-column">
                <div class="peg-title">Target (C)</div>
                <div class="peg-container" id="peg-C">
                  <div class="peg-rod"></div>
                  <div class="peg-base"></div>
                </div>
              </div>
            </div>

            <div class="status-banner" id="statusText">
              Ready to solve 3 disks in 7 moves.
            </div>
          </div>

          <div class="code-debugger">
            <div class="debugger-header">
              <span><i class="bi bi-code-slash"></i> Recursive C Code</span>
              <span id="hanoiMovesBadge" class="badge badge-primary">2ⁿ - 1 Moves</span>
            </div>
            <div class="debugger-body" id="codeDebugger"></div>
          </div>
        </div>
      </div>
    `;

    const pegA = container.querySelector('#peg-A');
    const pegB = container.querySelector('#peg-B');
    const pegC = container.querySelector('#peg-C');
    const statusText = container.querySelector('#statusText');
    const diskCountSelect = container.querySelector('#diskCountSelect');
    const btnReset = container.querySelector('#btnReset');
    const btnStep = container.querySelector('#btnStep');
    const btnPlay = container.querySelector('#btnPlay');
    const speedRange = container.querySelector('#speedRange');
    const codeDebugger = container.querySelector('#codeDebugger');
    const hanoiMovesBadge = container.querySelector('#hanoiMovesBadge');

    let moves = [];
    let currentMoveIndex = 0;
    let isPlaying = false;
    let playInterval = null;

    const codeSnippet = [
      'void hanoi(int n, char src, char aux, char dest) {',
      '    if (n == 1) {',
      '        printf("Move disk 1: %c -> %c\\n", src, dest);',
      '        return;',
      '    }',
      '    // 1. Move n-1 disks from Source to Aux',
      '    hanoi(n - 1, src, dest, aux);',
      '    // 2. Move nth disk from Source to Dest',
      '    printf("Move disk %d: %c -> %c\\n", n, src, dest);',
      '    // 3. Move n-1 disks from Aux to Dest',
      '    hanoi(n - 1, aux, src, dest);',
      '}'
    ];

    function renderCode() {
      codeDebugger.innerHTML = codeSnippet
        .map((line, i) => `<div class="code-line" id="hanoi-line-${i}">${line.replace(/ /g, '&nbsp;')}</div>`)
        .join('');
    }

    function highlightLine(lineNum) {
      codeDebugger.querySelectorAll('.code-line').forEach(el => el.classList.remove('active'));
      if (lineNum !== undefined && lineNum >= 0) {
        const line = codeDebugger.querySelector(`#hanoi-line-${lineNum}`);
        if (line) {
          line.classList.add('active');
          line.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    function generateMoves(n, source, aux, target) {
      if (n === 1) {
        moves.push({ disk: 1, from: source, to: target, line: 2 });
        return;
      }
      generateMoves(n - 1, source, target, aux);
      moves.push({ disk: n, from: source, to: target, line: 8 });
      generateMoves(n - 1, aux, source, target);
    }

    function initPegs() {
      container.querySelectorAll('.hanoi-disk').forEach(el => el.remove());
      const numDisks = parseInt(diskCountSelect.value);

      for (let i = numDisks; i >= 1; i--) {
        const disk = document.createElement('div');
        disk.className = `hanoi-disk disk-${i}`;
        disk.id = `hanoi-disk-${i}`;
        disk.innerText = i;
        pegA.appendChild(disk);
      }

      moves = [];
      currentMoveIndex = 0;
      generateMoves(numDisks, 'A', 'B', 'C');

      const totalMoves = Math.pow(2, numDisks) - 1;
      hanoiMovesBadge.innerText = `${totalMoves} Moves`;
      statusText.innerHTML = `Ready to solve ${numDisks} disks in <strong class="text-primary">${totalMoves}</strong> optimal moves.`;

      btnStep.disabled = false;
      btnPlay.disabled = false;
      btnPlay.innerHTML = '<i class="bi bi-play-fill"></i> Auto Play';
      isPlaying = false;
      clearInterval(playInterval);
      renderCode();
    }

    function getPegElement(pegName) {
      if (pegName === 'A') return pegA;
      if (pegName === 'B') return pegB;
      return pegC;
    }

    function executeMove(move) {
      const sourcePeg = getPegElement(move.from);
      const targetPeg = getPegElement(move.to);
      const disks = sourcePeg.querySelectorAll('.hanoi-disk');

      if (disks.length > 0) {
        const diskToMove = disks[disks.length - 1];
        targetPeg.appendChild(diskToMove);
        highlightLine(move.line);
        statusText.innerHTML = `Move disk <strong class="text-danger">${move.disk}</strong> from Peg <strong>${move.from}</strong> to Peg <strong>${move.to}</strong>.`;
      }
    }

    function stepForward() {
      if (currentMoveIndex < moves.length) {
        executeMove(moves[currentMoveIndex]);
        currentMoveIndex++;
        if (currentMoveIndex >= moves.length) {
          statusText.innerHTML = '<span class="text-success fw-bold"><i class="bi bi-check-circle-fill"></i> Tower of Hanoi Puzzle Solved!</span>';
          btnStep.disabled = true;
          btnPlay.disabled = true;
          isPlaying = false;
          clearInterval(playInterval);
          btnPlay.innerHTML = '<i class="bi bi-play-fill"></i> Auto Play';
          highlightLine(-1);
        }
      }
    }

    function togglePlay() {
      if (isPlaying) {
        isPlaying = false;
        clearInterval(playInterval);
        btnPlay.innerHTML = '<i class="bi bi-play-fill"></i> Auto Play';
        btnStep.disabled = false;
      } else {
        if (currentMoveIndex >= moves.length) initPegs();
        isPlaying = true;
        btnPlay.innerHTML = '<i class="bi bi-pause-fill"></i> Pause';
        btnStep.disabled = true;

        const speed = 1600 - parseInt(speedRange.value);
        playInterval = setInterval(() => {
          stepForward();
          if (currentMoveIndex >= moves.length) {
            clearInterval(playInterval);
            isPlaying = false;
          }
        }, speed);
      }
    }

    btnStep.addEventListener('click', () => {
      if (!isPlaying) stepForward();
    });
    btnPlay.addEventListener('click', togglePlay);
    btnReset.addEventListener('click', initPegs);
    diskCountSelect.addEventListener('change', initPegs);
    speedRange.addEventListener('change', () => {
      if (isPlaying) {
        clearInterval(playInterval);
        const speed = 1600 - parseInt(speedRange.value);
        playInterval = setInterval(stepForward, speed);
      }
    });

    initPegs();

    return () => {
      clearInterval(playInterval);
    };
  }
};
