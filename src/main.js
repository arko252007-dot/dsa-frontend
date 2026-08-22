// Main Application Entry Point
import './styles/main.css';
import './styles/visualizer.css';

import { ThemeManager } from './services/theme.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { RotatePrompt } from './components/RotatePrompt.js';
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
      ${RotatePrompt.render()}
    `;

    // 3. Initialize Navbar & Rotate Prompt Event Listeners
    Navbar.init();
    RotatePrompt.init();

    // 4. Initialize Client-Side Router
    Router.init();
  }
});
