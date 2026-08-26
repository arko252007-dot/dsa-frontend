// Client-Side History Router with Authentication Route Guard
import { HomePage } from './pages/HomePage.js';
import { PracticePage } from './pages/PracticePage.js';
import { VisualizationsHub } from './pages/VisualizationsHub.js';
import { VisualizerPage } from './pages/VisualizerPage.js';
import { Navbar } from './components/Navbar.js';
import { RotatePrompt } from './components/RotatePrompt.js';
import { StorageManager } from './services/storage.js';
import { Toast } from './components/Toast.js';

let currentRouteHandler = null;

const routes = [
  { path: '/', view: HomePage, isPublic: true },
  { path: '/practice', view: PracticePage, isPublic: false },
  { path: '/visualizations', view: VisualizationsHub, isPublic: false },
  { path: '/visualizer/:id', view: VisualizerPage, isPublic: false },
];

function parseRoute() {
  const path = window.location.pathname || '/';
  const queryString = window.location.search ? window.location.search.slice(1) : '';
  return { path: path.startsWith('/') ? path : `/${path}`, queryString };
}

function matchRoute(currentPath) {
  for (const r of routes) {
    const routeParts = r.path.split('/').filter(Boolean);
    const pathParts = currentPath.split('/').filter(Boolean);

    if (routeParts.length !== pathParts.length) continue;

    let matched = true;
    const params = {};

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        const paramName = routeParts[i].slice(1);
        params[paramName] = pathParts[i];
      } else if (routeParts[i] !== pathParts[i]) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return { route: r, params };
    }
  }

  // Fallback to Home
  return { route: routes[0], params: {} };
}

export const Router = {
  navigate(path) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    if (window.location.pathname !== cleanPath) {
      window.history.pushState({}, '', cleanPath);
    }
    this.handleRouteChange();
  },

  handleRouteChange() {
    if (currentRouteHandler && typeof currentRouteHandler.cleanup === 'function') {
      currentRouteHandler.cleanup();
    }

    const { path } = parseRoute();
    const { route, params } = matchRoute(path);

    // Route Guard: If not logged in and route is private, redirect to Home
    const isLoggedIn = StorageManager.isLoggedIn();
    if (!route.isPublic && !isLoggedIn) {
      Toast.show('Please log in with your Student ID & Password to access this page.', 'warning');
      this.navigate('/');
      return;
    }

    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    currentRouteHandler = route.view;

    // Render View
    mainContent.innerHTML = route.view.render(params);

    // Initialize View JS
    if (typeof route.view.init === 'function') {
      route.view.init(params);
    }

    // Update active navbar state
    Navbar.updateActiveRoute(path);

    // Prompt device rotation if entering visualization pages on mobile portrait
    RotatePrompt.checkAndPrompt(path);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  },

  init() {
    // If a user navigates via an old hash link (e.g. #/practice), smoothly migrate to path
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      const cleanPath = window.location.hash.slice(1);
      window.history.replaceState({}, '', cleanPath);
    }

    window.addEventListener('popstate', () => this.handleRouteChange());
    window.addEventListener('authChanged', () => {
      Navbar.renderNavState();
      this.handleRouteChange();
    });

    // Intercept clicks on local links for single-page app transitions
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      if (
        anchor.target === '_blank' ||
        anchor.hasAttribute('download') ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      if (href.startsWith('#/') || href.startsWith('/')) {
        e.preventDefault();
        const cleanPath = href.startsWith('#/') ? href.slice(1) : href;
        this.navigate(cleanPath);
      }
    });

    this.handleRouteChange();
  }
};
