// API Service — all backend calls go through here
const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function apiFetch(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
  } catch (networkErr) {
    throw new Error('Unable to connect to the server. Please check your connection.');
  }

  let json = null;
  try {
    const text = await res.text();
    json = text ? JSON.parse(text) : null;
  } catch (parseErr) {
    json = null;
  }

  if (!res.ok) {
    let errMsg = json && json.message ? json.message : null;
    if (!errMsg) {
      if (res.status === 401 || res.status === 403) {
        errMsg = 'Invalid username or password.';
      } else if (res.status === 404) {
        errMsg = 'Account not found.';
      } else if (res.status === 409) {
        errMsg = 'Username is already taken. Please choose another.';
      } else if (res.status >= 500) {
        errMsg = 'Service is temporarily unavailable. Please try again in a moment.';
      } else {
        errMsg = 'Request failed. Please check your details and try again.';
      }
    }
    throw new Error(errMsg);
  }

  return json ? json.data : null;
}

export const Api = {
  // GET /problems?category=...&difficulty=...&search=...
  getProblems({ category = '', difficulty = '', search = '' } = {}) {
    const params = new URLSearchParams();
    if (category)   params.set('category', category);
    if (difficulty) params.set('difficulty', difficulty);
    if (search)     params.set('search', search);
    const qs = params.toString() ? `?${params.toString()}` : '';
    return apiFetch(`/problems${qs}`);
  },

  // POST /users/signup { username, password }
  signup(username, password) {
    return apiFetch('/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  // POST /users/login { username, password }
  login(username, password) {
    return apiFetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  // GET /users/:username
  getUser(username) {
    return apiFetch(`/users/${encodeURIComponent(username)}`);
  },

  // POST /users/solve { username, problemId, isSolved }
  toggleSolve(username, problemId, isSolved) {
    return apiFetch('/users/solve', {
      method: 'POST',
      body: JSON.stringify({ username, problemId, isSolved }),
    });
  },
};
