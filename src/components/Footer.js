export const Footer = {
  render() {
    return `
      <footer class="app-footer">
        <div class="container-fluid px-3 px-md-4 px-lg-5 d-flex flex-wrap align-items-center justify-content-between gap-2">
          <div class="d-flex align-items-center gap-2">
            <span class="fw-medium text-primary">DSA with C</span>
            <span class="text-muted">&bull;</span>
            <span>Interactive Algorithms &amp; Practice Suite</span>
          </div>
          <div class="d-flex align-items-center gap-3 font-mono" style="font-size: var(--font-xs);">
            <a href="/terms" class="text-muted text-decoration-none">Terms</a>
            <span class="text-muted">&bull;</span>
            <a href="/privacy" class="text-muted text-decoration-none">Privacy</a>
            <span class="text-muted">&bull;</span>
            <span class="text-muted">C Implementation &amp; Dry-Run Engine</span>
          </div>
        </div>
      </footer>
    `;
  }
};
