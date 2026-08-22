document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('.tracker-checkbox');
    
    // 1. CLEAN COUNTER MODIFICATIONS (WITHOUT PROGRESS BAR LOGIC)
    function updateProgress() {
        const allChecked = document.querySelectorAll('.tracker-checkbox:checked');
        const totalProblems = checkboxes.length;
        const totalCheckedCount = allChecked.length;

        // Simply update the raw textual fractions
        document.getElementById('completion-ratio').innerText = `${totalCheckedCount}/${totalProblems}`;

        updateDifficultyMetrics('easy');
        updateDifficultyMetrics('medium');
        updateDifficultyMetrics('hard');
    }

    function updateDifficultyMetrics(difficulty) {
        const totalOfDiff = document.querySelectorAll(`.tracker-checkbox[data-type="${difficulty}"]`).length;
        const checkedOfDiff = document.querySelectorAll(`.tracker-checkbox[data-type="${difficulty}"]:checked`).length;
        const element = document.getElementById(`${difficulty}-count`);
        if(element) {
            element.innerText = `${checkedOfDiff}/${totalOfDiff}`;
        }
    }

    // 2. CHECKBOX INTERACTION WITH BOOTSTRAP UTILITIES
    function syncCheckboxesWithStorage() {
        const solvedProblems = typeof StorageManager !== 'undefined' ? StorageManager.getSolvedProblems() : {};
        checkboxes.forEach(checkbox => {
            const targetRow = checkbox.closest('.problem-row');
            const problemTitle = targetRow.querySelector('.problem-title');
            const problemId = problemTitle.getAttribute('href');

            if (solvedProblems[problemId]) {
                checkbox.checked = true;
                targetRow.classList.add('table-success', 'opacity-50');
                problemTitle.classList.add('text-decoration-line-through');
            } else {
                checkbox.checked = false;
                targetRow.classList.remove('table-success', 'opacity-50');
                problemTitle.classList.remove('text-decoration-line-through');
            }
        });
        updateProgress();
    }

    // Call once to initialize
    syncCheckboxesWithStorage();

    // Listen to pageshow to handle bfcache (back/forward navigation on mobile)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            syncCheckboxesWithStorage();
        }
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const targetRow = e.target.closest('.problem-row');
            const problemTitle = targetRow.querySelector('.problem-title');
            const problemId = problemTitle.getAttribute('href');

            if(e.target.checked) {
                targetRow.classList.add('table-success', 'opacity-50');
                problemTitle.classList.add('text-decoration-line-through');
            } else {
                targetRow.classList.remove('table-success', 'opacity-50');
                problemTitle.classList.remove('text-decoration-line-through');
            }
            
            if (typeof StorageManager !== 'undefined') {
                StorageManager.saveSolvedProblem(problemId, e.target.checked);
            }
            
            updateProgress();
        });
    });

    // 3. SEAMLESS FILTRATION ENGINE
    const searchInput = document.getElementById('problemSearch');
    const statusFilter = document.getElementById('filterStatus');
    const difficultyFilter = document.getElementById('filterDifficulty');

    function filterProblems() {
        const searchVal = searchInput.value.toLowerCase();
        const statusVal = statusFilter.value;
        const diffVal = difficultyFilter.value;
        const problemRows = document.querySelectorAll('.problem-row');

        problemRows.forEach(row => {
            const title = row.querySelector('.problem-title').innerText.toLowerCase();
            const isChecked = row.querySelector('.tracker-checkbox').checked;
            const rowDifficulty = row.getAttribute('data-difficulty');

            const matchesSearch = title.includes(searchVal);
            const matchesDifficulty = (diffVal === 'all' || rowDifficulty === diffVal);
            let matchesStatus = true;
            if (statusVal === 'solved') matchesStatus = isChecked;
            if (statusVal === 'unsolved') matchesStatus = !isChecked;

            if(matchesSearch && matchesDifficulty && matchesStatus) {
                row.style.setProperty("display", "", "important");
            } else {
                row.style.setProperty("display", "none", "important");
            }
        });
    }

    searchInput.addEventListener('input', filterProblems);
    statusFilter.addEventListener('change', filterProblems);
    difficultyFilter.addEventListener('change', filterProblems);

    // Initialize counts on page load
    updateProgress();
});