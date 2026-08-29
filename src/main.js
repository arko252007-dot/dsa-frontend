import './styles/main.css';
import './styles/visualizer.css';

import { ThemeManager } from './services/theme.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { RotatePrompt } from './components/RotatePrompt.js';
import { Router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();

  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      ${Navbar.render()}
      <main class="main-content" id="mainContent"></main>
      ${Footer.render()}
      ${RotatePrompt.render()}
    `;

    Navbar.init();
    RotatePrompt.init();
    Router.init();
  }
});
