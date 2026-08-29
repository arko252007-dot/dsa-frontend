export const RotatePrompt = {
  _isPromptOpen: false,
  _dismissedInSession: false,

  render() {
    return `
      <div class="rotate-prompt-overlay d-none" id="rotatePromptOverlay" role="dialog" aria-modal="true" aria-labelledby="rotatePromptTitle">
        <div class="rotate-prompt-modal">
          <div class="rotate-icon-container mb-3">
            <div class="rotate-phone-box">
              <i class="bi bi-phone"></i>
            </div>
          </div>
          <h5 class="fw-bold mb-2" id="rotatePromptTitle">Rotate Your Device</h5>
          <p class="text-muted small mb-4" style="line-height: 1.5;">
            Algorithm visualizers, execution traces, and memory layouts are designed for <strong>landscape mode</strong>.
          </p>
          <div class="d-flex flex-column gap-2 w-100">
            <button type="button" class="btn btn-primary w-100 py-2 fw-medium" id="btnRotateDismiss">
              <i class="bi bi-phone-landscape me-1"></i> Rotate to Landscape
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary w-100 py-2 border-0" id="btnRotatePortraitAnyway">
              Continue in Portrait
            </button>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const overlay = document.getElementById('rotatePromptOverlay');
    const btnDismiss = document.getElementById('btnRotateDismiss');
    const btnPortrait = document.getElementById('btnRotatePortraitAnyway');

    const closePrompt = () => {
      if (overlay) {
        overlay.classList.add('d-none');
        this._isPromptOpen = false;
      }
    };

    if (btnDismiss) {
      btnDismiss.addEventListener('click', closePrompt);
    }

    if (btnPortrait) {
      btnPortrait.addEventListener('click', () => {
        this._dismissedInSession = true;
        closePrompt();
      });
    }

    const handleOrientation = () => {
      if (window.innerWidth > window.innerHeight && this._isPromptOpen) {
        closePrompt();
      }
    };

    window.addEventListener('resize', handleOrientation);
    window.addEventListener('orientationchange', handleOrientation);
  },

  checkAndPrompt(path) {
    if (this._dismissedInSession) return;
    const isVisualizerRoute = path.startsWith('/visualizer') || path === '/visualizations';
    const isMobilePortrait = window.innerWidth <= 768 && window.innerHeight > window.innerWidth;

    const overlay = document.getElementById('rotatePromptOverlay');
    if (isVisualizerRoute && isMobilePortrait && overlay) {
      overlay.classList.remove('d-none');
      this._isPromptOpen = true;
    }
  }
};
