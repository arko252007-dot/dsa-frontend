import { Api } from '../services/api.js';
import { StorageManager } from '../services/storage.js';
import { Toast } from '../components/Toast.js';

function buildStatsBar(problems) {
  const stats = StorageManager.getStatsByDifficulty(problems);
  const percent = stats.total > 0 ? Math.round((stats.solvedTotal / stats.total) * 100) : 0;
  
  const easyPct = stats.total > 0 ? (stats.easy.solved / stats.total) * 100 : 0;
  const medPct  = stats.total > 0 ? (stats.medium.solved / stats.total) * 100 : 0;
  const hardPct = stats.total > 0 ? (stats.hard.solved / stats.total) * 100 : 0;

  return `
    <div class="card shadow-sm mb-3 mb-md-4">
      <div class="card-body p-3 p-md-4">
        <div class="row align-items-center justify-content-between g-3">
          
          <div class="col-12 col-md-5">
            <div class="d-flex align-items-center gap-3">
              <div class="d-flex flex-column">
                <div class="d-flex align-items-baseline gap-2">
                  <span class="hero-stat-percent" id="practiceHeroPercent">${percent}%</span>
                  <span class="text-muted small font-mono">completed</span>
                </div>
                <div class="text-secondary small font-mono mt-1" style="font-size: var(--font-xs);" id="metricTotalRatio">
                  <span>Progress:</span> <strong style="color: var(--diff-easy);">${stats.solvedTotal} / ${stats.total} Solved</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-7">
            <div class="d-flex align-items-center justify-content-md-end gap-2 flex-wrap mb-2">
              <span class="badge-pill-easy">
                Easy <span id="metricEasyRatio" class="ms-1 font-mono">${stats.easy.solved}/${stats.easy.total}</span>
              </span>
              <span class="badge-pill-medium">
                Med <span id="metricMediumRatio" class="ms-1 font-mono">${stats.medium.solved}/${stats.medium.total}</span>
              </span>
              <span class="badge-pill-hard">
                Hard <span id="metricHardRatio" class="ms-1 font-mono">${stats.hard.solved}/${stats.hard.total}</span>
              </span>
            </div>

            <div class="progress-segmented" title="${percent}% Solved">
              <div id="metricSegEasy" class="progress-seg-easy" style="width: ${easyPct}%;"></div>
              <div id="metricSegMed" class="progress-seg-med" style="width: ${medPct}%;"></div>
              <div id="metricSegHard" class="progress-seg-hard" style="width: ${hardPct}%;"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

function getCategoryConfig(category = '') {
  const lower = category.toLowerCase();
  if (lower.includes('array') || lower.includes('sort')) {
    return { icon: 'bi-bar-chart-steps', badgeClass: 'cat-array-badge' };
  }
  if (lower.includes('string')) {
    return { icon: 'bi-chat-square-quote', badgeClass: 'cat-hash-badge' };
  }
  if (lower.includes('link') || lower.includes('pointer')) {
    return { icon: 'bi-diagram-3', badgeClass: 'cat-list-badge' };
  }
  if (lower.includes('tree') || lower.includes('bst')) {
    return { icon: 'bi-diagram-2', badgeClass: 'cat-tree-badge' };
  }
  if (lower.includes('graph')) {
    return { icon: 'bi-diagram-3-fill', badgeClass: 'cat-graph-badge' };
  }
  if (lower.includes('hash')) {
    return { icon: 'bi-grid-3x3', badgeClass: 'cat-hash-badge' };
  }
  if (lower.includes('recur') || lower.includes('hanoi')) {
    return { icon: 'bi-arrow-repeat', badgeClass: 'cat-recur-badge' };
  }
  if (lower.includes('math') || lower.includes('number')) {
    return { icon: 'bi-calculator', badgeClass: 'cat-math-badge' };
  }
  if (lower.includes('stack') || lower.includes('queue')) {
    return { icon: 'bi-layers-fill', badgeClass: 'cat-hash-badge' };
  }
  if (lower.includes('dp') || lower.includes('dynamic')) {
    return { icon: 'bi-cpu-fill', badgeClass: 'cat-tree-badge' };
  }
  return { icon: 'bi-code-slash', badgeClass: 'cat-math-badge' };
}

function buildProblems(problems) {
  if (!problems || problems.length === 0) {
    return `
      <div class="card text-center py-5 shadow-sm border-0">
        <div class="card-body p-4">
          <i class="bi bi-inbox text-muted fs-3 mb-2 d-block"></i>
          <h6 class="fw-semibold mb-1" style="font-size: var(--font-base);">No Questions Available</h6>
          <p class="text-muted small mb-0" style="font-size: var(--font-xs);">Check back soon for new practice questions.</p>
        </div>
      </div>
    `;
  }

  const categoryMap = new Map();
  problems.forEach(prob => {
    const cat = prob.category || 'General';
    if (!categoryMap.has(cat)) {
      categoryMap.set(cat, []);
    }
    categoryMap.get(cat).push(prob);
  });

  return Array.from(categoryMap.entries()).map(([category, catProblems]) => {
    const catSolved = catProblems.filter(p => StorageManager.isProblemSolved(p.problemId || p.id || p._id)).length;
    const catConfig = getCategoryConfig(category);

    return `
      <div class="card shadow-sm mb-3 category-card overflow-hidden" data-category="${category}">
        
        <div class="card-header-clean py-2 px-2 px-sm-3 category-toggle-header"
             role="button"
             tabindex="0"
             data-category="${category}"
             title="Click to toggle questions">
          <div class="d-flex align-items-center gap-2 text-truncate me-2">
            <div class="category-icon-badge ${catConfig.badgeClass}">
              <i class="bi ${catConfig.icon}"></i>
            </div>
            <span class="fw-semibold text-truncate" style="font-size: var(--font-sm);">${category}</span>
          </div>
          
          <div class="d-flex align-items-center gap-2 flex-shrink-0">
            <span class="stat-chip font-mono category-solved-chip">
              ${catSolved} / ${catProblems.length} solved
            </span>
            <button type="button"
                    class="btn btn-sm btn-outline-secondary p-0 rounded btn-unfold-category d-flex align-items-center justify-content-center"
                    style="width: 26px; height: 26px;"
                    data-category="${category}"
                    aria-label="Toggle section"
                    aria-expanded="false">
              <i class="bi bi-chevron-down unfold-chevron" style="font-size: 0.75rem;"></i>
            </button>
          </div>
        </div>

        <div class="table-responsive category-table-wrapper d-none">
          <table class="table-clean mb-0">
            <thead>
              <tr>
                <th class="text-center th-col-status">Status</th>
                <th class="th-col-title">Title</th>
                <th class="th-col-diff">Difficulty</th>
                <th class="text-center th-col-hint">Hint</th>
                <th class="text-center th-col-leetcode">LeetCode</th>
              </tr>
            </thead>
            <tbody>
              ${catProblems.map(prob => {
                const id = prob.problemId || prob.id || prob._id;
                const solved = StorageManager.isProblemSolved(id);
                const diffClass = prob.difficulty === 'easy' ? 'badge-pill-easy' : prob.difficulty === 'medium' ? 'badge-pill-medium' : 'badge-pill-hard';
                return `
                  <tr class="problem-row ${solved ? 'solved-row' : ''}"
                      id="row-${id}"
                      data-id="${id}"
                      data-difficulty="${prob.difficulty}"
                      data-title="${prob.title.toLowerCase()}">
                    <td class="text-center th-col-status">
                      <input type="checkbox"
                             class="form-check-input problem-checkbox"
                             data-id="${id}"
                             title="${solved ? 'Solved' : 'Mark as Solved'}"
                             ${solved ? 'checked' : ''}>
                    </td>
                    <td class="th-col-title">
                      <span class="problem-title ${solved ? 'solved-title' : 'fw-medium'}">
                        ${prob.title}
                      </span>
                    </td>
                    <td class="th-col-diff">
                      <span class="${diffClass}">
                        ${prob.difficulty}
                      </span>
                    </td>
                    <td class="text-center th-col-hint">
                      <button class="btn btn-sm btn-outline-secondary btn-table-action btn-hint"
                              data-hint="${prob.hint || 'No hint provided for this question.'}"
                              data-title="${prob.title}"
                              title="View Hint">
                        <i class="bi bi-lightbulb"></i>
                      </button>
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
      </div>
    `;
  }).join('');
}

export const PracticePage = {
  _problems: [],

  render() {
    return `
      <div class="container-fluid px-2 px-sm-3 px-md-4 px-lg-5 py-2">
        <div class="mb-3 mb-md-4">
          <h2 class="h4 h3-md fw-bold mb-1">Practice Questions</h2>
          <p class="text-muted small mb-0">Track your problem solving progress across fundamental C concepts, recursion, hashing, and algorithms.</p>
        </div>

        <div id="practiceContent">
          <div class="card text-center py-4 py-md-5 shadow-sm border-0">
            <div class="spinner-border text-primary mx-auto mb-2" role="status" style="width: 2rem; height: 2rem;"></div>
            <p class="text-muted small mb-0">Loading practice questions…</p>
          </div>
        </div>

        <div class="modal-overlay" id="hintModal">
          <div class="modal-dialog-custom">
            <div class="modal-header-custom">
              <h6 class="modal-title fw-bold mb-0" id="modalHintTitle">Problem Hint</h6>
              <button type="button" class="btn-close" id="modalHintCloseBtn" aria-label="Close"></button>
            </div>
            <div class="modal-body-custom">
              <div class="p-3 bg-tertiary rounded border small" id="modalHintText"></div>
            </div>
            <div class="modal-footer-custom">
              <button class="btn btn-sm btn-secondary" id="modalHintDoneBtn">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init() {
    const container = document.getElementById('practiceContent');

    try {
      this._problems = await Api.getProblems();

      const currentUsername = StorageManager.getUserName();
      if (currentUsername) {
        try {
          const userData = await Api.getUser(currentUsername);
          if (userData && userData.solvedProblems) {
            StorageManager.setSolvedProblems(userData.solvedProblems);
          }
        } catch (uErr) {
          console.warn('Could not refresh user stats from DB, using local cache:', uErr);
        }
      }
    } catch (err) {
      container.innerHTML = `
        <div class="card border-0 text-center py-5 shadow-sm">
          <div class="card-body p-4">
            <i class="bi bi-wifi-off text-muted fs-3 mb-2 d-block"></i>
            <h6 class="fw-semibold mb-1" style="font-size: var(--font-base);">Unable to Load Practice Questions</h6>
            <p class="text-muted small mb-3" style="max-width: 380px; margin: 0 auto; font-size: var(--font-xs);">
              We are currently unable to reach the questions service. Please check your connection and try again.
            </p>
            <button class="btn btn-sm btn-outline-secondary" onclick="window.location.reload()">
              <i class="bi bi-arrow-clockwise"></i> Try Again
            </button>
          </div>
        </div>`;
      console.error('Problems fetch failed:', err);
      return;
    }

    const categories = ['All Topics'];
    this._problems.forEach(prob => {
      const cat = prob.category || 'General';
      if (!categories.includes(cat)) {
        categories.push(cat);
      }
    });

    container.innerHTML = `
      ${buildStatsBar(this._problems)}

      <div class="topic-segmented-control mb-3" id="topicPillsWrapper">
        ${categories.map((cat, idx) => `
          <button class="topic-segment-btn ${idx === 0 ? 'active' : ''}" data-category="${cat}">
            ${cat}
          </button>
        `).join('')}
      </div>

      <div class="problems-toolbar-card mb-3 mb-md-4">
        <div class="problems-toolbar-inner">
          
          <div class="toolbar-search-box">
            <i class="bi bi-search text-muted"></i>
            <input type="text" id="problemSearchInput" class="toolbar-input"
                   placeholder="Search questions by title or keyword...">
          </div>

          <div class="toolbar-divider d-none d-md-block"></div>

          <div class="toolbar-select-box">
            <select class="toolbar-select" id="filterStatus">
              <option value="all">Status: All</option>
              <option value="solved">Status: Solved</option>
              <option value="unsolved">Status: Todo</option>
            </select>
          </div>

          <div class="toolbar-divider d-none d-md-block"></div>

          <div class="toolbar-select-box">
            <select class="toolbar-select" id="filterDifficulty">
              <option value="all">Difficulty: All</option>
              <option value="easy">Difficulty: Easy</option>
              <option value="medium">Difficulty: Med</option>
              <option value="hard">Difficulty: Hard</option>
            </select>
          </div>

          <div class="toolbar-divider d-none d-md-block"></div>

          <button class="toolbar-toggle-btn"
                  id="btnToggleAllCategories"
                  title="Toggle collapse state">
            <i class="bi bi-arrows-expand" id="toggleAllIcon"></i>
            <span id="toggleAllLabel">Expand</span>
          </button>

        </div>
      </div>

      <div class="d-flex flex-column" id="categoriesContainer">
        ${buildProblems(this._problems)}
      </div>
    `;

    this._attachEvents();
  },

  _attachEvents() {
    const problems = this._problems;

    const searchInput             = document.getElementById('problemSearchInput');
    const filterStatus            = document.getElementById('filterStatus');
    const filterDifficulty        = document.getElementById('filterDifficulty');
    const btnToggleAllCategories  = document.getElementById('btnToggleAllCategories');
    const toggleAllIcon           = document.getElementById('toggleAllIcon');
    const toggleAllLabel          = document.getElementById('toggleAllLabel');

    const metricTotalRatio = document.getElementById('metricTotalRatio');
    const metricEasyRatio   = document.getElementById('metricEasyRatio');
    const metricMediumRatio = document.getElementById('metricMediumRatio');
    const metricHardRatio   = document.getElementById('metricHardRatio');
    const metricSegEasy     = document.getElementById('metricSegEasy');
    const metricSegMed      = document.getElementById('metricSegMed');
    const metricSegHard     = document.getElementById('metricSegHard');

    const hintModal        = document.getElementById('hintModal');
    const modalHintTitle   = document.getElementById('modalHintTitle');
    const modalHintText    = document.getElementById('modalHintText');
    const modalHintCloseBtn= document.getElementById('modalHintCloseBtn');
    const modalHintDoneBtn = document.getElementById('modalHintDoneBtn');

    let activeCategoryTag   = 'All Topics';
    let allExpandedState    = false;

    const toggleCategoryAccordion = (card, forceOpen = null) => {
      const tableWrapper  = card.querySelector('.category-table-wrapper');
      const unfoldBtn     = card.querySelector('.btn-unfold-category');
      const unfoldChevron = card.querySelector('.unfold-chevron');

      if (!tableWrapper) return;

      const isCurrentlyClosed = tableWrapper.classList.contains('d-none');
      const shouldOpen = forceOpen !== null ? forceOpen : isCurrentlyClosed;

      if (shouldOpen) {
        tableWrapper.classList.remove('d-none');
        if (unfoldChevron) {
          unfoldChevron.classList.remove('bi-chevron-down');
          unfoldChevron.classList.add('bi-chevron-up');
        }
        if (unfoldBtn) unfoldBtn.setAttribute('aria-expanded', 'true');
        card.classList.add('expanded');
      } else {
        tableWrapper.classList.add('d-none');
        if (unfoldChevron) {
          unfoldChevron.classList.remove('bi-chevron-up');
          unfoldChevron.classList.add('bi-chevron-down');
        }
        if (unfoldBtn) unfoldBtn.setAttribute('aria-expanded', 'false');
        card.classList.remove('expanded');
      }
    };

    document.querySelectorAll('.category-card').forEach(card => {
      const header = card.querySelector('.category-toggle-header');
      if (header) {
        header.addEventListener('click', (e) => {
          toggleCategoryAccordion(card);
        });
      }
    });

    if (btnToggleAllCategories) {
      btnToggleAllCategories.addEventListener('click', () => {
        allExpandedState = !allExpandedState;
        document.querySelectorAll('.category-card').forEach(card => {
          toggleCategoryAccordion(card, allExpandedState);
        });

        if (toggleAllLabel) toggleAllLabel.innerText = allExpandedState ? 'Collapse All' : 'Expand All';
        if (toggleAllIcon) {
          toggleAllIcon.className = allExpandedState ? 'bi bi-arrows-collapse' : 'bi bi-arrows-expand';
        }
      });
    }

    const practiceHeroPercent = document.getElementById('practiceHeroPercent');

    const updateCategoryCounts = () => {
      document.querySelectorAll('.category-card').forEach(card => {
        const cat = card.getAttribute('data-category');
        const catProbs = problems.filter(p => (p.category || 'General') === cat);
        const catSolved = catProbs.filter(p => StorageManager.isProblemSolved(p.problemId || p.id || p._id)).length;
        const chip = card.querySelector('.category-solved-chip') || card.querySelector('.stat-chip');
        if (chip) {
          chip.innerText = `${catSolved} / ${catProbs.length} solved`;
        }
      });
    };

    const updateMetrics = () => {
      const stats = StorageManager.getStatsByDifficulty(problems);
      const percent = stats.total > 0 ? Math.round((stats.solvedTotal / stats.total) * 100) : 0;
      
      const easyPct = stats.total > 0 ? (stats.easy.solved / stats.total) * 100 : 0;
      const medPct  = stats.total > 0 ? (stats.medium.solved / stats.total) * 100 : 0;
      const hardPct = stats.total > 0 ? (stats.hard.solved / stats.total) * 100 : 0;

      if (practiceHeroPercent) practiceHeroPercent.innerText = `${percent}%`;
      if (metricTotalRatio) metricTotalRatio.innerHTML = `<span>Progress:</span> <strong style="color: var(--diff-easy);">${stats.solvedTotal} / ${stats.total} Solved</strong>`;
      if (metricEasyRatio) metricEasyRatio.innerText = `${stats.easy.solved}/${stats.easy.total}`;
      if (metricMediumRatio) metricMediumRatio.innerText = `${stats.medium.solved}/${stats.medium.total}`;
      if (metricHardRatio) metricHardRatio.innerText = `${stats.hard.solved}/${stats.hard.total}`;
      
      if (metricSegEasy) metricSegEasy.style.width = `${easyPct}%`;
      if (metricSegMed)  metricSegMed.style.width = `${medPct}%`;
      if (metricSegHard) metricSegHard.style.width = `${hardPct}%`;

      updateCategoryCounts();

      const navPill = document.querySelector('.user-stats-pill');
      if (navPill) {
        navPill.innerText = `${StorageManager.getTotalSolvedCount()} solved`;
      }
    };

    const filterRows = () => {
      const query      = (searchInput?.value || '').trim().toLowerCase();
      const status     = filterStatus?.value || 'all';
      const difficulty = filterDifficulty?.value || 'all';

      document.querySelectorAll('.problem-row').forEach(row => {
        const title    = row.getAttribute('data-title');
        const diff     = row.getAttribute('data-difficulty');
        const id       = row.getAttribute('data-id');
        const isSolved = StorageManager.isProblemSolved(id);

        const matchQuery  = !query || title.includes(query);
        const matchDiff   = difficulty === 'all' || diff === difficulty;
        let   matchStatus = true;
        if (status === 'solved')   matchStatus = isSolved;
        if (status === 'unsolved') matchStatus = !isSolved;

        row.style.display = (matchQuery && matchDiff && matchStatus) ? '' : 'none';
      });

      document.querySelectorAll('.category-card').forEach(card => {
        const catName = card.getAttribute('data-category');
        const matchTag = activeCategoryTag === 'All Topics' || catName === activeCategoryTag;
        const visible = card.querySelectorAll('.problem-row:not([style*="display: none"])');
        const shouldShow = matchTag && visible.length > 0;
        
        card.style.display = shouldShow ? '' : 'none';

        if (shouldShow && (query.length > 0 || activeCategoryTag !== 'All Topics')) {
          toggleCategoryAccordion(card, true);
        }
      });
    };

    document.querySelectorAll('.topic-segment-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.topic-segment-btn').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeCategoryTag = chip.getAttribute('data-category');
        filterRows();
      });
    });

    if (searchInput)      searchInput.addEventListener('input', filterRows);
    if (filterStatus)     filterStatus.addEventListener('change', filterRows);
    if (filterDifficulty) filterDifficulty.addEventListener('change', filterRows);

    document.querySelectorAll('.problem-checkbox').forEach(cb => {
      cb.addEventListener('change', e => {
        const id        = cb.getAttribute('data-id');
        const isChecked = e.target.checked;
        StorageManager.toggleProblemSolved(id, isChecked);

        const row = document.getElementById(`row-${id}`);
        if (row) {
          const titleEl = row.querySelector('.problem-title');
          if (isChecked) {
            row.classList.add('solved-row');
            if (titleEl) {
              titleEl.classList.add('solved-title');
              titleEl.classList.remove('fw-medium');
            }
            Toast.show('Problem marked as solved!', 'success');
          } else {
            row.classList.remove('solved-row');
            if (titleEl) {
              titleEl.classList.remove('solved-title');
              titleEl.classList.add('fw-medium');
            }
          }
        }

        updateMetrics();
        filterRows();
      });
    });

    const openHint = (title, hint) => {
      if (modalHintTitle) modalHintTitle.innerText = `Hint: ${title}`;
      if (modalHintText) modalHintText.innerText = hint;
      if (hintModal) hintModal.classList.add('active');
    };

    const closeHint = () => {
      if (hintModal) hintModal.classList.remove('active');
    };

    document.querySelectorAll('.btn-hint').forEach(btn => {
      btn.addEventListener('click', () => {
        const hint = btn.getAttribute('data-hint');
        const title = btn.getAttribute('data-title');
        openHint(title, hint);
      });
    });

    if (modalHintCloseBtn) modalHintCloseBtn.addEventListener('click', closeHint);
    if (modalHintDoneBtn)  modalHintDoneBtn.addEventListener('click', closeHint);
    if (hintModal) {
      hintModal.addEventListener('click', e => {
        if (e.target === hintModal) closeHint();
      });
    }
  },
};
