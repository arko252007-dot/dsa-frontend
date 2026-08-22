// Storage Manager Service with DB Progress Sync
import { Api } from './api.js';

const STORAGE_KEYS = {
  USER_NAME: 'dsa_student_name',
  SOLVED_PROBLEMS: 'dsa_solved_problems',
  THEME: 'dsa_theme',
};

export const StorageManager = {
  // User Profile
  saveUserName(name) {
    if (typeof name === 'string') {
      localStorage.setItem(STORAGE_KEYS.USER_NAME, name.trim());
      window.dispatchEvent(new CustomEvent('authChanged', { detail: { username: name.trim() } }));
    }
  },

  getUserName() {
    return localStorage.getItem(STORAGE_KEYS.USER_NAME) || '';
  },

  isLoggedIn() {
    return Boolean(this.getUserName());
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.USER_NAME);
    localStorage.removeItem(STORAGE_KEYS.SOLVED_PROBLEMS);
    window.dispatchEvent(new CustomEvent('authChanged', { detail: { username: '' } }));
  },

  // Solved Problem Tracker
  getSolvedProblems() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SOLVED_PROBLEMS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  setSolvedProblems(solvedMap) {
    localStorage.setItem(STORAGE_KEYS.SOLVED_PROBLEMS, JSON.stringify(solvedMap || {}));
  },

  isProblemSolved(problemId) {
    const solved = this.getSolvedProblems();
    return Boolean(solved[problemId]);
  },

  async toggleProblemSolved(problemId, isSolved) {
    const solved = this.getSolvedProblems();
    const username = this.getUserName();

    if (isSolved) {
      solved[problemId] = {
        solvedAt: new Date().toISOString(),
      };
    } else {
      delete solved[problemId];
    }
    localStorage.setItem(STORAGE_KEYS.SOLVED_PROBLEMS, JSON.stringify(solved));

    // Sync directly to MongoDB backend if user is logged in
    if (username) {
      try {
        await Api.toggleSolve(username, problemId, isSolved);
      } catch (err) {
        console.error('Failed to sync solve state to DB:', err);
      }
    }

    return solved;
  },

  getTotalSolvedCount() {
    const solved = this.getSolvedProblems();
    return Object.keys(solved).length;
  },

  getStatsByDifficulty(problemList) {
    const solved = this.getSolvedProblems();
    const stats = {
      total: problemList.length,
      solvedTotal: 0,
      easy: { total: 0, solved: 0 },
      medium: { total: 0, solved: 0 },
      hard: { total: 0, solved: 0 },
    };

    problemList.forEach(prob => {
      const diff = (prob.difficulty || 'easy').toLowerCase();
      const key  = prob.problemId || prob.id;
      if (stats[diff]) {
        stats[diff].total++;
        if (solved[key]) {
          stats[diff].solved++;
          stats.solvedTotal++;
        }
      }
    });

    return stats;
  }
};
