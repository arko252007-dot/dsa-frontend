// Top Navbar Component (With Auth-Aware Links, Logout, and Animated Rotating Funny DSA Acronyms)
import { ThemeManager } from '../services/theme.js';
import { StorageManager } from '../services/storage.js';
import { Toast } from './Toast.js';
import { Router } from '../router.js';

// 20 Curated Funny Full-Forms for "DSA with C"
const DSA_ACRONYMS = [
  { title: "DSA with C", desc: "Data Structures & Algorithms in C" },
  { title: "Dur Se Acha", desc: "Looks like a breeze until recursion hits." },
  { title: "Dimahi Santulan Automatic-Out", desc: "Your brain's condition after 4 hours on a single LeetCode Hard." },
  { title: "Do Shaadi Abhi", desc: "The official backup plan when dynamic programming enters the syllabus." },
  { title: "Dono Side Andhera", desc: "Left side memory leak, right side infinite loop." },
  { title: "Dropout Solution Agaya", desc: "What pops into your head during the 3rd hour of lab." },
  { title: "Dekho Sir Apology", desc: "What you mail the professor at 11:59 PM with an empty ZIP file." },
  { title: "Dosto, Suno Aur", desc: "The group project leader taking control 5 minutes before the presentation." },
  { title: "Desh Se Abba", desc: "When dad calls to ask 'Beta, Microsoft ka interview kab hai?'" },
  { title: "Doogna Syllabus Aaya", desc: "The exact moment you turn the page during mid-sems." },
  { title: "Dimag Sataka Aaj", desc: "When code runs with zero errors but gives the wrong output." },
  { title: "Dil Samjho Aap", desc: "What you silently pray the interviewer does while reading your resume." },
  { title: "Duniya Side, Aur-so", desc: "The hostel protocol for every 8:00 AM Monday lecture." },
  { title: "Didi, Sir, Assist-me", desc: "Mass copy-pasting referral requests on LinkedIn." },
  { title: "Do Sath Answer-key", desc: "Exam hall silent communication protocol via eye contact." },
  { title: "Dikkat Sabki Apni", desc: "The sudden relief when you realize the topper also failed the test." },
  { title: "Door Se Apranam", desc: "Waving goodbye to your social life during placement season." },
  { title: "Darwaaza Se Aao", desc: "Backdoor entry into the hostel after missing curfew." },
  { title: "Dosa Sambar Aur", desc: "The only reason worth waking up for on a Sunday morning." },
  { title: "Database Samjha Apna", desc: "Accidentally preparing DBMS for a DSA interview." },
  { title: "Dil Se Apology", desc: "Apologizing to your laptop after banging the spacebar in frustration." }
];

let acronymIndex = 0;
let acronymTimer = null;

export const Navbar = {
  render() {
    const username = StorageManager.getUserName();
    const isAuth = Boolean(username);
    const current = DSA_ACRONYMS[acronymIndex] || DSA_ACRONYMS[0];

    const solvedCount = StorageManager.getTotalSolvedCount();

    return `
      <header class="app-navbar" id="appNavbarHeader">
        <div class="container-fluid px-3 px-md-4 px-lg-5">
          <div class="navbar-grid-layout">
            
            <!-- 1. LEFT SECTION: Logo & Rotating Title -->
            <div class="navbar-left-col">
              <button class="btn btn-sm btn-outline-secondary ${isAuth ? 'd-md-none' : 'd-none'} d-flex align-items-center justify-content-center p-0 me-2 flex-shrink-0"
                      id="mobileMenuToggleBtn"
                      style="width: 32px; height: 32px;"
                      aria-label="Open Menu">
                <i class="bi bi-list fs-6"></i>
              </button>

              <a href="/" class="nav-brand text-truncate" id="navBrandLink" title="${current.desc}">
                <img src="/logo.png" alt="DSA Logo" onerror="this.onerror=null; this.src='/Logo.png';">
                <span class="dsa-title-anim fw-semibold text-truncate" id="navBrandText">${current.title}</span>
              </a>
            </div>

            <!-- 2. CENTER SECTION: Exact Center Segmented Nav Tabs -->
            <div class="navbar-center-col d-none d-md-flex">
              <nav class="nav-segmented-tabs ${isAuth ? '' : 'd-none'}" id="desktopNavLinks">
                <a href="/" class="nav-tab-item" data-route="/">
                  <i class="bi bi-grid-1x2"></i>
                  <span>Explore</span>
                </a>
                <a href="/practice" class="nav-tab-item" data-route="/practice">
                  <i class="bi bi-terminal"></i>
                  <span>Problems</span>
                </a>
                <a href="/visualizations" class="nav-tab-item" data-route="/visualizations">
                  <i class="bi bi-play-circle"></i>
                  <span>Visualizers</span>
                </a>
              </nav>
            </div>

            <!-- 3. RIGHT SECTION: Controls (Desktop: Full Meta + Logout + Theme; Mobile: ONLY Theme Toggle) -->
            <div class="navbar-right-col">
              
              <!-- Desktop Authenticated Control Bar -->
              <div class="nav-control-bar ${isAuth ? 'd-none d-md-inline-flex' : 'd-none'}" id="navAuthSection">
                <div class="nav-user-meta text-truncate" style="max-width: 170px;">
                  <span class="user-handle">${username}</span>
                  <span class="user-stats-pill">${solvedCount} solved</span>
                </div>
                <button type="button" class="nav-control-action" id="navLogoutBtn" title="Sign out" aria-label="Sign out">
                  <i class="bi bi-box-arrow-right"></i>
                </button>
                <div class="nav-control-divider"></div>
                <button type="button" class="nav-control-action" id="themeToggleBtn" title="Toggle Theme" aria-label="Toggle Theme">
                  <i class="bi bi-moon-stars" id="themeIcon"></i>
                </button>
              </div>

              <!-- Mobile Authenticated Theme Button (Clean, Standalone) -->
              <button type="button" class="nav-control-action border rounded d-md-none ${isAuth ? 'd-flex' : 'd-none'} align-items-center justify-content-center flex-shrink-0"
                      id="themeToggleBtnMobile"
                      style="width: 32px; height: 32px;"
                      aria-label="Toggle Theme"
                      title="Toggle Theme">
                <i class="bi bi-moon-stars" id="themeIconMobile"></i>
              </button>

              <!-- Unauthenticated theme toggle -->
              <button class="nav-control-action border rounded ${isAuth ? 'd-none' : 'd-flex'} align-items-center justify-content-center flex-shrink-0"
                      id="themeToggleBtnGuest"
                      style="width: 32px; height: 32px;"
                      aria-label="Toggle Theme">
                <i class="bi bi-moon-stars" id="themeIconGuest"></i>
              </button>

          </div>
        </div>
      </header>

      <!-- Mobile Offcanvas Drawer -->
      <div class="mobile-drawer-backdrop" id="mobileDrawerBackdrop">
        <div class="mobile-drawer">
          <div class="mobile-drawer-header">
            <div class="d-flex align-items-center gap-2">
              <img src="/logo.png" alt="DSA Logo" onerror="this.onerror=null; this.src='/Logo.png';" style="width: 26px; height: 26px; border-radius: 4px; object-fit: contain;">
              <span class="fw-bold fs-6">DSA with C</span>
            </div>
            <button type="button" class="btn-close" id="mobileDrawerCloseBtn" aria-label="Close"></button>
          </div>

          <div class="d-flex flex-column gap-1">
            <a href="/" class="mobile-nav-link" data-route="/">
              <i class="bi bi-house-door fs-5"></i> Home
            </a>
            <a href="/practice" class="mobile-nav-link" data-route="/practice">
              <i class="bi bi-code-square fs-5"></i> Practice Questions
            </a>
            <a href="/visualizations" class="mobile-nav-link" data-route="/visualizations">
              <i class="bi bi-play-circle fs-5"></i> Algorithm Visualizers
            </a>
          </div>

          <div class="mt-auto pt-3 border-top">
            <button class="btn btn-sm btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center gap-2" id="mobileLogoutBtn">
              <i class="bi bi-box-arrow-right"></i> Logout (${username})
            </button>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeToggleBtnMobile = document.getElementById('themeToggleBtnMobile');
    const themeToggleBtnGuest = document.getElementById('themeToggleBtnGuest');
    const navLogoutBtn = document.getElementById('navLogoutBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
    const mobileMenuToggleBtn = document.getElementById('mobileMenuToggleBtn');
    const mobileDrawerCloseBtn = document.getElementById('mobileDrawerCloseBtn');
    const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');
    const navBrandText = document.getElementById('navBrandText');
    const navBrandLink = document.getElementById('navBrandLink');
    const themeIcon = document.getElementById('themeIcon');
    const themeIconMobile = document.getElementById('themeIconMobile');
    const themeIconGuest = document.getElementById('themeIconGuest');

    // Theme toggler display update
    const updateThemeDisplay = (theme) => {
      const iconClass = theme === 'dark' ? 'bi bi-sun text-warning' : 'bi bi-moon-stars text-secondary';
      if (themeIcon) themeIcon.className = iconClass;
      if (themeIconMobile) themeIconMobile.className = iconClass;
      if (themeIconGuest) themeIconGuest.className = iconClass;
    };

    updateThemeDisplay(ThemeManager.getPreferredTheme());

    window.addEventListener('themeChanged', (e) => {
      updateThemeDisplay(e.detail.theme);
    });

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        ThemeManager.toggleTheme();
      });
    }

    if (themeToggleBtnMobile) {
      themeToggleBtnMobile.addEventListener('click', () => {
        ThemeManager.toggleTheme();
      });
    }

    if (themeToggleBtnGuest) {
      themeToggleBtnGuest.addEventListener('click', () => {
        ThemeManager.toggleTheme();
      });
    }

    // Logout handlers
    const handleLogout = () => {
      StorageManager.logout();
      if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.remove('open');
      Toast.show('Logged out successfully.', 'info');
      Router.navigate('/');
    };

    if (navLogoutBtn) navLogoutBtn.addEventListener('click', handleLogout);
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleLogout);

    // Mobile Drawer Controls
    const openDrawer = () => {
      if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.add('open');
    };

    const closeDrawer = () => {
      if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.remove('open');
    };

    if (mobileMenuToggleBtn) mobileMenuToggleBtn.addEventListener('click', openDrawer);
    if (mobileDrawerCloseBtn) mobileDrawerCloseBtn.addEventListener('click', closeDrawer);
    if (mobileDrawerBackdrop) {
      mobileDrawerBackdrop.addEventListener('click', (e) => {
        if (e.target === mobileDrawerBackdrop) closeDrawer();
      });
    }

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // ── 5-Second Animated Logo Acronym Rotation ──────────────────────────────
    if (acronymTimer) {
      clearInterval(acronymTimer);
      acronymTimer = null;
    }

    const rotateAcronym = () => {
      if (!navBrandText || !navBrandLink) return;

      // 1. Trigger slight slide-out animation
      navBrandText.classList.add('anim-out');

      setTimeout(() => {
        // 2. Change text and hover description
        acronymIndex = (acronymIndex + 1) % DSA_ACRONYMS.length;
        const nextItem = DSA_ACRONYMS[acronymIndex];

        navBrandText.innerText = nextItem.title;
        navBrandLink.setAttribute('title', nextItem.desc);

        // 3. Trigger smooth slide-in
        navBrandText.classList.remove('anim-out');
      }, 300);
    };

    acronymTimer = setInterval(rotateAcronym, 5000);

    // Pause rotation when user hovers over the brand title
    if (navBrandLink) {
      navBrandLink.addEventListener('mouseenter', () => {
        if (acronymTimer) clearInterval(acronymTimer);
      });
      navBrandLink.addEventListener('mouseleave', () => {
        if (acronymTimer) clearInterval(acronymTimer);
        acronymTimer = setInterval(rotateAcronym, 5000);
      });
    }
  },

  renderNavState() {
    const navbarMount = document.querySelector('.app-navbar');
    if (navbarMount) {
      const headerHtml = this.render();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = headerHtml;
      const newHeader = tempDiv.querySelector('.app-navbar');
      if (newHeader) {
        navbarMount.innerHTML = newHeader.innerHTML;
        this.init();
      }
    }
  },

  updateActiveRoute(currentPath) {
    const links = document.querySelectorAll('.nav-tab-item, .mobile-nav-link, .nav-link-btn');
    links.forEach(link => {
      const route = link.getAttribute('data-route');
      if (route === '/' && currentPath === '/') {
        link.classList.add('active');
      } else if (route !== '/' && currentPath.startsWith(route)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
};
