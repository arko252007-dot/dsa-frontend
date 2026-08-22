// Main Application Entry Point
import './styles/main.css';
import './styles/visualizer.css';

import { ThemeManager } from './services/theme.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { Router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme
  ThemeManager.init();

  // 2. Render App Shell
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      ${Navbar.render()}
      <main class="main-content" id="mainContent"></main>
      ${Footer.render()}
    `;

    // 3. Initialize Navbar Event Listeners
    Navbar.init();

    // 4. Initialize Client-Side Router
    Router.init();
  }
});
