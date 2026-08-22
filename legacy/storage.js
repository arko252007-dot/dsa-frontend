// storage.js
// Handles all localStorage operations for the application

const StorageManager = {
    // User Name Operations
    saveUserName(name) {
        localStorage.setItem('studentName', name);
    },
    getUserName() {
        return localStorage.getItem('studentName');
    },

    // Solved Problems Operations
    saveSolvedProblem(problemId, isSolved) {
        let solved = JSON.parse(localStorage.getItem('solvedProblems')) || {};
        if (isSolved) {
            solved[problemId] = true;
        } else {
            delete solved[problemId];
        }
        localStorage.setItem('solvedProblems', JSON.stringify(solved));
    },
    getSolvedProblems() {
        return JSON.parse(localStorage.getItem('solvedProblems')) || {};
    },
    getTotalSolvedCount() {
        const solved = this.getSolvedProblems();
        return Object.keys(solved).length;
    }
};
