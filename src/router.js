import { HomePage } from './pages/HomePage.js';
import { PracticePage } from './pages/PracticePage.js';
import { VisualizationsHub } from './pages/VisualizationsHub.js';
import { VisualizerPage } from './pages/VisualizerPage.js';
import { TermsPage } from './pages/TermsPage.js';
import { PrivacyPage } from './pages/PrivacyPage.js';
import { Navbar } from './components/Navbar.js';
import { RotatePrompt } from './components/RotatePrompt.js';
import { StorageManager } from './services/storage.js';
import { Toast } from './components/Toast.js';
import { SeoManager } from './services/seo.js';

let currentRouteHandler = null;

const routes = [
  { path: '/', view: HomePage, isPublic: true },
  { path: '/terms', view: TermsPage, isPublic: true },
  { path: '/terms.html', view: TermsPage, isPublic: true },
  { path: '/privacy', view: PrivacyPage, isPublic: true },
  { path: '/privacy.html', view: PrivacyPage, isPublic: true },
  { path: '/practice', view: PracticePage, isPublic: false },
  { path: '/visualizations', view: VisualizationsHub, isPublic: true },
  { path: '/visualizer/:id', view: VisualizerPage, isPublic: true },
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

    const isLoggedIn = StorageManager.isLoggedIn();
    if (!route.isPublic && !isLoggedIn) {
      Toast.show('Please log in with your Student ID & Password to access this page.', 'warning');
      this.navigate('/');
      return;
    }

    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    currentRouteHandler = route.view;
    mainContent.innerHTML = route.view.render(params);

    if (typeof route.view.init === 'function') {
      route.view.init(params);
    }

    Navbar.updateActiveRoute(path);
    RotatePrompt.checkAndPrompt(path);
    SeoManager.update(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  },

  init() {
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      const cleanPath = window.location.hash.slice(1);
      window.history.replaceState({}, '', cleanPath);
    }

    window.addEventListener('popstate', () => this.handleRouteChange());
    window.addEventListener('authChanged', () => {
      Navbar.renderNavState();
      this.handleRouteChange();
    });

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
