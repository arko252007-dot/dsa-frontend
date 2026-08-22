// navbar-loader.js

// Initialize theme as early as possible
const getPreferredTheme = () => {
    return localStorage.getItem('theme') || 'light';
};
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
};
setTheme(getPreferredTheme());

document.addEventListener("DOMContentLoaded", () => {
    // Determine the base path relative to this script
    const scriptTag = document.currentScript || document.querySelector('script[src*="nav-script.js"]');
    const navScriptSrc = scriptTag ? scriptTag.getAttribute('src') : 'nav-script.js';
    const basePath = navScriptSrc.substring(0, navScriptSrc.lastIndexOf('nav-script.js'));
    const navPath = basePath + 'common-nav.html';

    // 1. Fetch the shared navigation HTML file
    fetch(navPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Fix relative paths for src and href attributes in the loaded nav
            let updatedData = data.replace(/src="([^"]+)"/g, (match, p1) => {
                if (p1.startsWith('http') || p1.startsWith('data:')) return match;
                return `src="${basePath}${p1}"`;
            });
            updatedData = updatedData.replace(/href="([^"]+)"/g, (match, p1) => {
                if (p1.startsWith('http') || p1.startsWith('#')) return match;
                return `href="${basePath}${p1}"`;
            });

            // 2. Inject the HTML into the placeholder container
            const placeholder = document.getElementById('nav-placeholder');
            if (placeholder) {
                placeholder.innerHTML = updatedData;
                
                // 3. Highlight the active link based on the current page URL
                highlightActiveLink();
                
                // 4. Initialize theme toggle listener
                const themeToggleBtn = document.getElementById('themeToggle');
                const themeIcon = document.getElementById('themeIcon');
                if (themeToggleBtn && themeIcon) {
                    const updateIcon = () => {
                        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
                        if (currentTheme === 'dark') {
                            themeIcon.classList.remove('bi-moon-stars-fill');
                            themeIcon.classList.add('bi-sun-fill');
                        } else {
                            themeIcon.classList.remove('bi-sun-fill');
                            themeIcon.classList.add('bi-moon-stars-fill');
                        }
                    };
                    updateIcon();
                    
                    themeToggleBtn.addEventListener('click', () => {
                        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
                        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                        setTheme(newTheme);
                        updateIcon();
                    });
                }
            }
        })
        .catch(err => console.error("Error loading navigation component: ", err));
});

// Helper function to handle active class toggling
function highlightActiveLink() {
    // Get current filename (default to index.html if empty)
    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    
    // Find all anchor tags inside our injected navbar
    const links = document.querySelectorAll('#nav-placeholder .sideList');
    
    links.forEach(link => {
        // Extract the filename from the link's href attribute (handles base paths like ../)
        const linkHref = link.getAttribute('href') || "";
        const linkFile = linkHref.split("/").pop();
        
        if (linkFile === currentFile) {
            const listItem = link.querySelector('.list-group-item');
            if (listItem) {
                listItem.classList.add('active');
            }
        }
    });
}