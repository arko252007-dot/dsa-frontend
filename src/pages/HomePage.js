import { Api } from '../services/api.js';
import { StorageManager } from '../services/storage.js';
import { Toast } from '../components/Toast.js';

export const HomePage = {
  _problems: [],
  _authMode: 'login',

  render() {
    const username = StorageManager.getUserName();
    const isAuth = Boolean(username);
    const solvedCount = StorageManager.getTotalSolvedCount();

    return `
      <div class="container-fluid px-3 px-md-4 px-lg-5 py-2 py-md-3">
        
        <div id="homeAuthBlocker" class="${isAuth ? 'd-none' : ''}">
          <div class="row align-items-center py-3 py-lg-4 g-4">
            
            <div class="col-12 col-lg-7">
              <div class="pe-lg-4">
                <h1 class="fw-bold display-6 mb-3">
                  Master Data Structures &amp; Algorithms in <span class="text-primary">C</span>
                </h1>

                <p class="text-secondary mb-4" style="font-size: var(--font-base); line-height: 1.6;">
                  An interactive, visual-first learning platform for C DSA. Explore step-by-step C dry-runs, pointer mutations, recursion call stacks, and practice 131 curated coding challenges.
                </p>

                <div class="mb-4">
                  <h6 class="text-uppercase text-muted fw-semibold font-mono mb-3" style="font-size: var(--font-xs); letter-spacing: 0.08em;">
                    Live Algorithm Visualizers
                  </h6>
                  <div class="row g-2">
                    <div class="col-6 col-sm-4">
                      <a href="/visualizer/tree" class="card card-body p-2 p-md-3 text-decoration-none border h-100 visualizer-hub-card">
                        <div class="d-flex align-items-center gap-2 mb-1">
                          <i class="bi bi-diagram-2 text-danger fs-5"></i>
                          <span class="fw-semibold text-truncate small">BST & Trees</span>
                        </div>
                        <span class="text-muted text-truncate" style="font-size: var(--font-xs);">Inorder, Pre, Post</span>
                      </a>
                    </div>
                    <div class="col-6 col-sm-4">
                      <a href="/visualizer/hanoi" class="card card-body p-2 p-md-3 text-decoration-none border h-100 visualizer-hub-card">
                        <div class="d-flex align-items-center gap-2 mb-1">
                          <i class="bi bi-arrow-repeat text-warning fs-5"></i>
                          <span class="fw-semibold text-truncate small">Tower of Hanoi</span>
                        </div>
                        <span class="text-muted text-truncate" style="font-size: var(--font-xs);">Recursion & Stack</span>
                      </a>
                    </div>
                    <div class="col-6 col-sm-4">
                      <a href="/visualizer/sorting" class="card card-body p-2 p-md-3 text-decoration-none border h-100 visualizer-hub-card">
                        <div class="d-flex align-items-center gap-2 mb-1">
                          <i class="bi bi-bar-chart-steps text-warning fs-5"></i>
                          <span class="fw-semibold text-truncate small">Sorting</span>
                        </div>
                        <span class="text-muted text-truncate" style="font-size: var(--font-xs);">Quick, Merge, Bubble</span>
                      </a>
                    </div>
                    <div class="col-6 col-sm-4">
                      <a href="/visualizer/linked-list" class="card card-body p-2 p-md-3 text-decoration-none border h-100 visualizer-hub-card">
                        <div class="d-flex align-items-center gap-2 mb-1">
                          <i class="bi bi-diagram-3 text-success fs-5"></i>
                          <span class="fw-semibold text-truncate small">Linked Lists</span>
                        </div>
                        <span class="text-muted text-truncate" style="font-size: var(--font-xs);">SLL, DLL, Circular</span>
                      </a>
                    </div>
                    <div class="col-6 col-sm-4">
                      <a href="/visualizer/graph" class="card card-body p-2 p-md-3 text-decoration-none border h-100 visualizer-hub-card">
                        <div class="d-flex align-items-center gap-2 mb-1">
                          <i class="bi bi-diagram-3-fill text-primary fs-5"></i>
                          <span class="fw-semibold text-truncate small">Graph (BFS/DFS)</span>
                        </div>
                        <span class="text-muted text-truncate" style="font-size: var(--font-xs);">Queue & Stack Trace</span>
                      </a>
                    </div>
                    <div class="col-6 col-sm-4">
                      <a href="/visualizer/hashing" class="card card-body p-2 p-md-3 text-decoration-none border h-100 visualizer-hub-card">
                        <div class="d-flex align-items-center gap-2 mb-1">
                          <i class="bi bi-grid-3x3 text-info fs-5"></i>
                          <span class="fw-semibold text-truncate small">Hash Tables</span>
                        </div>
                        <span class="text-muted text-truncate" style="font-size: var(--font-xs);">Linear Probing</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="d-flex align-items-center gap-3 flex-wrap">
                  <a href="/visualizations" class="btn btn-outline-primary py-2 px-3 fw-medium d-inline-flex align-items-center gap-2">
                    <i class="bi bi-play-circle"></i>
                    <span>Browse All Visualizers</span>
                    <i class="bi bi-arrow-right small"></i>
                  </a>
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-5 col-xl-5">
              <div class="card shadow-sm overflow-hidden">
                <div class="d-flex border-bottom bg-subsurface p-1 gap-1">
                  <button type="button"
                          class="btn flex-fill py-2 fw-medium ${this._authMode === 'login' ? 'btn-primary' : 'btn-outline-secondary border-0 bg-transparent'}"
                          id="tabBtnLogin">
                    Sign In
                  </button>
                  <button type="button"
                          class="btn flex-fill py-2 fw-medium ${this._authMode === 'signup' ? 'btn-primary' : 'btn-outline-secondary border-0 bg-transparent'}"
                          id="tabBtnSignup">
                    Create Account
                  </button>
                </div>

                <div class="card-body p-4">
                  <div class="mb-3">
                    <h4 class="fw-semibold mb-1" id="authHeading">
                      ${this._authMode === 'login' ? 'Sign In' : 'Create Account'}
                    </h4>
                    <p class="text-muted small mb-0" id="authSubheading">
                      ${this._authMode === 'login' ? 'Enter your credentials to access your solved problems and progress.' : 'Create a username and password to track your progress.'}
                    </p>
                  </div>

                  <div id="authAlertBanner" class="alert alert-danger d-none py-2 px-3 small mb-3" role="alert"></div>

                  <form id="studentAuthForm">
                    <div class="mb-3">
                      <label for="studentIdInput" class="form-label small fw-medium text-muted">Username</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="bi bi-person"></i>
                        </span>
                        <input type="text"
                               class="form-control"
                               id="studentIdInput"
                               placeholder="username"
                               required
                               autocomplete="username">
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="studentPasswordInput" class="form-label small fw-medium text-muted">Password</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="bi bi-lock"></i>
                        </span>
                        <input type="password"
                               class="form-control"
                               id="studentPasswordInput"
                               placeholder="Minimum 8 characters"
                               minlength="8"
                               required
                               autocomplete="${this._authMode === 'login' ? 'current-password' : 'new-password'}">
                      </div>
                    </div>

                    <button type="submit" class="btn btn-primary w-100 py-2 fw-medium mb-2" id="btnAuthSubmit">
                      ${this._authMode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                  </form>

                  <div class="pt-3 mt-3 border-top text-center">
                    <span class="text-muted small" id="authSwitchPrompt">
                      ${this._authMode === 'login' ? "Need an account? <a href='javascript:void(0)' class='text-primary fw-medium' id='linkSwitchAuth'>Register</a>" : "Already have an account? <a href='javascript:void(0)' class='text-primary fw-medium' id='linkSwitchAuth'>Sign in</a>"}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div id="homeDashboard" class="${isAuth ? '' : 'd-none'}">
          <div class="card shadow-sm mb-4">
            <div class="card-body p-3 p-md-4">
              <div class="row align-items-center justify-content-between g-3">
                
                <div class="col-lg-5">
                  <div class="d-flex align-items-center gap-3">
                    <div class="d-flex flex-column">
                      <div class="d-flex align-items-baseline gap-2">
                        <span class="hero-stat-percent" id="portalHeroPercent">0%</span>
                        <span class="text-muted small font-mono">completed</span>
                      </div>
                      <div class="text-secondary small font-mono mt-1" style="font-size: var(--font-xs);">
                        <span>Session: <strong class="session-user-name">${username}</strong></span>
                        <span class="mx-1 text-muted">&bull;</span>
                        <span id="portalTotalRatioLabel">0 / 0 Solved</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-7">
                  <div class="d-flex align-items-center justify-content-lg-end gap-2 flex-wrap mb-2" id="portalMetricsPills">
                    <span class="badge-pill-easy">
                      Easy <span id="portalEasyRatio" class="ms-1 font-mono">0/0</span>
                    </span>
                    <span class="badge-pill-medium">
                      Med <span id="portalMedRatio" class="ms-1 font-mono">0/0</span>
                    </span>
                    <span class="badge-pill-hard">
                      Hard <span id="portalHardRatio" class="ms-1 font-mono">0/0</span>
                    </span>
                  </div>

                  <div class="progress-segmented" id="portalProgressSeg" title="Overall Progress">
                    <div id="portalSegEasy" class="progress-seg-easy" style="width: 0%;"></div>
                    <div id="portalSegMed" class="progress-seg-med" style="width: 0%;"></div>
                    <div id="portalSegHard" class="progress-seg-hard" style="width: 0%;"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="row g-3 g-md-4">
            <div class="col-lg-7 col-xl-7">
              <div class="card shadow-sm h-100 overflow-hidden d-flex flex-column">
                
                <div class="card-header-clean py-2 px-3 flex-shrink-0">
                  <div class="d-flex align-items-center gap-2">
                    <i class="bi bi-check2-square text-success"></i>
                    <span class="fw-semibold" style="font-size: var(--font-sm);">Solved Archive</span>
                  </div>
                  <a href="/practice" class="btn btn-sm btn-outline-secondary py-1 px-2" style="font-size: var(--font-xs);">
                    Practice Sheet &rarr;
                  </a>
                </div>

                <div class="flex-grow-1 solved-archive-scroll" id="solvedProblemsContainer">
                  <div class="text-center py-4">
                    <div class="spinner-border spinner-border-sm text-muted mb-2" role="status"></div>
                    <p class="text-muted small mb-0 font-mono">Loading archive...</p>
                  </div>
                </div>

              </div>
            </div>

            <div class="col-lg-5 col-xl-5">
              <div class="card shadow-sm h-100">
                <div class="card-header-clean py-2 px-3">
                  <div class="d-flex align-items-center gap-2">
                    <i class="bi bi-cpu text-muted"></i>
                    <span class="fw-semibold" style="font-size: var(--font-sm);">Algorithm Visualizers</span>
                  </div>
                  <span class="stat-chip font-mono">6 Labs</span>
                </div>

                <div class="card-body p-3 d-flex flex-column gap-2">
                  
                  <div class="lab-row-item">
                    <div class="d-flex align-items-center gap-2 text-truncate me-2">
                      <div class="lab-icon-box cat-recur-badge flex-shrink-0">
                        <i class="bi bi-arrow-repeat"></i>
                      </div>
                      <div class="text-truncate">
                        <div class="lab-row-title text-truncate">
                          Recursion &amp; Hanoi
                        </div>
                        <div class="text-muted" style="font-size: var(--font-xs);">
                          Activation records &amp; call stacks
                        </div>
                      </div>
                    </div>
                    <a href="/visualizer/hanoi" class="btn-lab-launch">
                      <span>Launch</span>
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </div>

                  <div class="lab-row-item">
                    <div class="d-flex align-items-center gap-2 text-truncate me-2">
                      <div class="lab-icon-box cat-tree-badge flex-shrink-0">
                        <i class="bi bi-diagram-2"></i>
                      </div>
                      <div class="text-truncate">
                        <div class="lab-row-title text-truncate">
                          Binary Search Tree
                        </div>
                        <div class="text-muted" style="font-size: var(--font-xs);">
                          Inorder &amp; preorder traversals
                        </div>
                      </div>
                    </div>
                    <a href="/visualizer/tree" class="btn-lab-launch">
                      <span>Launch</span>
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </div>

                  <div class="lab-row-item">
                    <div class="d-flex align-items-center gap-2 text-truncate me-2">
                      <div class="lab-icon-box cat-list-badge flex-shrink-0">
                        <i class="bi bi-diagram-3"></i>
                      </div>
                      <div class="text-truncate">
                        <div class="lab-row-title text-truncate">
                          Linked Lists (SLL, DLL, CLL)
                        </div>
                        <div class="text-muted" style="font-size: var(--font-xs);">
                          Singly, doubly &amp; circular position mutations
                        </div>
                      </div>
                    </div>
                    <a href="/visualizer/linked-list" class="btn-lab-launch">
                      <span>Launch</span>
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </div>

                  <div class="lab-row-item">
                    <div class="d-flex align-items-center gap-2 text-truncate me-2">
                      <div class="lab-icon-box cat-graph-badge flex-shrink-0">
                        <i class="bi bi-diagram-3-fill"></i>
                      </div>
                      <div class="text-truncate">
                        <div class="lab-row-title text-truncate">
                          Graph BFS &amp; DFS
                        </div>
                        <div class="text-muted" style="font-size: var(--font-xs);">
                          Queue BFS &amp; Stack DFS trace
                        </div>
                      </div>
                    </div>
                    <a href="/visualizer/graph" class="btn-lab-launch">
                      <span>Launch</span>
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </div>

                  <div class="lab-row-item">
                    <div class="d-flex align-items-center gap-2 text-truncate me-2">
                      <div class="lab-icon-box cat-hash-badge flex-shrink-0">
                        <i class="bi bi-grid-3x3"></i>
                      </div>
                      <div class="text-truncate">
                        <div class="lab-row-title text-truncate">
                          Hash Tables &amp; Probing
                        </div>
                        <div class="text-muted" style="font-size: var(--font-xs);">
                          Modulo indexing &amp; linear probing
                        </div>
                      </div>
                    </div>
                    <a href="/visualizer/hashing" class="btn-lab-launch">
                      <span>Launch</span>
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </div>

                  <div class="lab-row-item">
                    <div class="d-flex align-items-center gap-2 text-truncate me-2">
                      <div class="lab-icon-box cat-array-badge flex-shrink-0">
                        <i class="bi bi-bar-chart-steps"></i>
                      </div>
                      <div class="text-truncate">
                        <div class="lab-row-title text-truncate">
                          Sorting Algorithms
                        </div>
                        <div class="text-muted" style="font-size: var(--font-xs);">
                          Bubble, Merge, Quick &amp; more
                        </div>
                      </div>
                    </div>
                    <a href="/visualizer/sorting" class="btn-lab-launch">
                      <span>Launch</span>
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    `;
  },

  async init() {
    const studentAuthForm = document.getElementById('studentAuthForm');
    const studentIdInput = document.getElementById('studentIdInput');
    const studentPasswordInput = document.getElementById('studentPasswordInput');
    const btnAuthSubmit = document.getElementById('btnAuthSubmit');
    const authAlertBanner = document.getElementById('authAlertBanner');

    const tabBtnLogin = document.getElementById('tabBtnLogin');
    const tabBtnSignup = document.getElementById('tabBtnSignup');
    const linkSwitchAuth = document.getElementById('linkSwitchAuth');
    const authHeading = document.getElementById('authHeading');
    const authSubheading = document.getElementById('authSubheading');

    const portalEasyRatio = document.getElementById('portalEasyRatio');
    const portalMedRatio = document.getElementById('portalMedRatio');
    const portalHardRatio = document.getElementById('portalHardRatio');
    const portalSolvedCount = document.getElementById('portalSolvedCount');
    const solvedProblemsContainer = document.getElementById('solvedProblemsContainer');
    const encouragementTitle = document.getElementById('encouragementTitle');
    const encouragementText = document.getElementById('encouragementText');

    const showAuthError = (msg) => {
      let cleanMsg = msg || 'Authentication failed. Please check your credentials.';
      if (cleanMsg.includes('JSON') || cleanMsg.includes('fetch') || cleanMsg.includes('Response') || cleanMsg.includes('Unexpected')) {
        cleanMsg = 'Unable to connect to the server. Please check your connection and try again.';
      }
      if (authAlertBanner) {
        authAlertBanner.innerText = cleanMsg;
        authAlertBanner.className = 'alert alert-danger py-2 px-3 small text-start mb-3 d-block';
      }
      Toast.show(cleanMsg, 'danger');
    };

    const clearAuthError = () => {
      if (authAlertBanner) {
        authAlertBanner.innerText = '';
        authAlertBanner.className = 'alert alert-danger d-none py-2 px-3 small text-start mb-3';
      }
    };

    const authSwitchPrompt = document.getElementById('authSwitchPrompt');

    const bindSwitchLink = () => {
      const link = document.getElementById('linkSwitchAuth');
      if (link) {
        link.addEventListener('click', () => {
          setAuthMode(this._authMode === 'login' ? 'signup' : 'login');
        });
      }
    };

    const setAuthMode = (mode) => {
      this._authMode = mode;
      clearAuthError();
      const activeClass = 'btn flex-fill py-2 fw-medium btn-primary';
      const inactiveClass = 'btn flex-fill py-2 fw-medium btn-outline-secondary border-0 bg-transparent';

      if (tabBtnLogin && tabBtnSignup) {
        if (mode === 'login') {
          tabBtnLogin.className = activeClass;
          tabBtnSignup.className = inactiveClass;
          if (authHeading) authHeading.innerText = 'Sign In';
          if (authSubheading) authSubheading.innerText = 'Enter your credentials to access your solved problems and progress.';
          if (btnAuthSubmit) btnAuthSubmit.innerText = 'Sign In';
          if (authSwitchPrompt) {
            authSwitchPrompt.innerHTML = "Need an account? <a href='javascript:void(0)' class='text-primary fw-medium' id='linkSwitchAuth'>Register</a>";
            bindSwitchLink();
          }
          if (studentPasswordInput) studentPasswordInput.setAttribute('autocomplete', 'current-password');
        } else {
          tabBtnSignup.className = activeClass;
          tabBtnLogin.className = inactiveClass;
          if (authHeading) authHeading.innerText = 'Create Account';
          if (authSubheading) authSubheading.innerText = 'Create a unique username and password to track your DSA practice progress.';
          if (btnAuthSubmit) btnAuthSubmit.innerText = 'Create Account';
          if (authSwitchPrompt) {
            authSwitchPrompt.innerHTML = "Already have an account? <a href='javascript:void(0)' class='text-primary fw-medium' id='linkSwitchAuth'>Sign in</a>";
            bindSwitchLink();
          }
          if (studentPasswordInput) studentPasswordInput.setAttribute('autocomplete', 'new-password');
        }
      }
    };

    if (tabBtnLogin) tabBtnLogin.addEventListener('click', () => setAuthMode('login'));
    if (tabBtnSignup) tabBtnSignup.addEventListener('click', () => setAuthMode('signup'));
    bindSwitchLink();

    const portalHeroPercent = document.getElementById('portalHeroPercent');
    const portalTotalRatioLabel = document.getElementById('portalTotalRatioLabel');
    const portalSegEasy = document.getElementById('portalSegEasy');
    const portalSegMed  = document.getElementById('portalSegMed');
    const portalSegHard = document.getElementById('portalSegHard');

    const updateStatsDisplay = (problems) => {
      if (!problems || problems.length === 0) return;
      const stats = StorageManager.getStatsByDifficulty(problems);
      const percent = stats.total > 0 ? Math.round((stats.solvedTotal / stats.total) * 100) : 0;

      if (portalHeroPercent) portalHeroPercent.innerText = `${percent}%`;
      if (portalTotalRatioLabel) portalTotalRatioLabel.innerText = `${stats.solvedTotal} / ${stats.total} Solved`;

      if (portalEasyRatio) portalEasyRatio.innerText = `${stats.easy.solved}/${stats.easy.total}`;
      if (portalMedRatio) portalMedRatio.innerText = `${stats.medium.solved}/${stats.medium.total}`;
      if (portalHardRatio) portalHardRatio.innerText = `${stats.hard.solved}/${stats.hard.total}`;

      const easyPct = stats.total > 0 ? (stats.easy.solved / stats.total) * 100 : 0;
      const medPct  = stats.total > 0 ? (stats.medium.solved / stats.total) * 100 : 0;
      const hardPct = stats.total > 0 ? (stats.hard.solved / stats.total) * 100 : 0;

      if (portalSegEasy) portalSegEasy.style.width = `${easyPct}%`;
      if (portalSegMed)  portalSegMed.style.width = `${medPct}%`;
      if (portalSegHard) portalSegHard.style.width = `${hardPct}%`;
    };

    const renderSolvedList = () => {
      if (!solvedProblemsContainer) return;

      const solvedProblems = this._problems.filter(p => StorageManager.isProblemSolved(p.problemId || p.id || p._id));

      if (solvedProblems.length === 0) {
        solvedProblemsContainer.innerHTML = `
          <div class="text-center py-5 px-3">
            <i class="bi bi-inbox text-muted fs-3 mb-2 d-block"></i>
            <h6 class="fw-semibold mb-1" style="font-size: var(--font-base);">No Solved Problems Yet</h6>
            <p class="text-muted small mb-3" style="max-width: 360px; margin: 0 auto; font-size: var(--font-xs);">
              Problems marked as solved on the Practice Sheet will appear in your archive here.
            </p>
            <a href="/practice" class="btn btn-sm btn-primary">
              Browse Practice Sheet &rarr;
            </a>
          </div>
        `;
        return;
      }

      solvedProblemsContainer.innerHTML = `
        <div class="table-responsive">
          <table class="table-clean mb-0">
            <thead>
              <tr>
                <th class="th-col-title">Title</th>
                <th class="th-col-cat d-none d-md-table-cell">Category</th>
                <th class="th-col-diff">Difficulty</th>
                <th class="text-center th-col-leetcode">LeetCode</th>
              </tr>
            </thead>
            <tbody>
              ${solvedProblems.map(prob => {
                const diffClass = (prob.difficulty || 'easy') === 'easy' ? 'badge-pill-easy' : (prob.difficulty === 'medium' ? 'badge-pill-medium' : 'badge-pill-hard');

                return `
                  <tr>
                    <td class="th-col-title">
                      <span class="fw-semibold">${prob.title}</span>
                    </td>
                    <td class="th-col-cat d-none d-md-table-cell">
                      <span class="text-muted small text-truncate d-inline-block" style="max-width: 140px;">
                        ${prob.category}
                      </span>
                    </td>
                    <td class="th-col-diff">
                      <span class="${diffClass}">
                        ${prob.difficulty}
                      </span>
                    </td>
                    <td class="text-center th-col-leetcode">
                      <a href="${prob.practiceUrl || 'https://leetcode.com'}" target="_blank" rel="noopener noreferrer"
                         class="btn btn-sm btn-outline-secondary btn-table-action"
                         title="Practice on LeetCode">
                        <i class="bi bi-box-arrow-up-right"></i>
                      </a>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    };

    if (studentAuthForm) {
      studentAuthForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearAuthError();

        const usernameVal = studentIdInput ? studentIdInput.value.trim() : '';
        const passwordVal = studentPasswordInput ? studentPasswordInput.value.trim() : '';

        if (!usernameVal || !passwordVal) {
          showAuthError('Please enter both username and password.');
          return;
        }

        if (passwordVal.length < 8) {
          showAuthError('Password must be at least 8 characters long.');
          return;
        }

        if (btnAuthSubmit) {
          btnAuthSubmit.disabled = true;
          btnAuthSubmit.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Authenticating...`;
        }

        try {
          let userData;
          if (this._authMode === 'signup') {
            userData = await Api.signup(usernameVal, passwordVal);
            Toast.show(`Account created! Welcome, ${userData.username}!`, 'success');
          } else {
            userData = await Api.login(usernameVal, passwordVal);
            Toast.show(`Welcome back, ${userData.username}!`, 'success');
          }

          if (userData && userData.solvedProblems) {
            StorageManager.setSolvedProblems(userData.solvedProblems);
          }
          StorageManager.saveUserName(userData.username);
        } catch (err) {
          console.error('Auth error:', err);
          showAuthError(err.message || 'Authentication failed. Please check credentials.');
          if (btnAuthSubmit) {
            btnAuthSubmit.disabled = false;
            btnAuthSubmit.innerHTML = this._authMode === 'login' ? 'Log In to Account &rarr;' : 'Create Account &rarr;';
          }
        }
      });
    }

    const currentUsername = StorageManager.getUserName();
    if (currentUsername) {
      try {
        this._problems = await Api.getProblems();

        try {
          const userData = await Api.getUser(currentUsername);
          if (userData && userData.solvedProblems) {
            StorageManager.setSolvedProblems(userData.solvedProblems);
          }
        } catch (uErr) {
          console.warn('Could not refresh user stats from DB, using local cache:', uErr);
        }

        updateStatsDisplay(this._problems);
        renderSolvedList();
      } catch (err) {
        console.error('Home problems fetch failed:', err);
        if (solvedProblemsContainer) {
          renderSolvedList();
        }
      }
    }
  }
};
