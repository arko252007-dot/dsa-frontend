export const PrivacyPage = {
  render() {
    return `
      <div class="container-fluid px-3 px-md-4 px-lg-5 py-3 py-md-4">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-9">
            
            <div class="card shadow-sm border p-4 p-md-5 mb-4">
              
              <div class="mb-4 pb-3 border-bottom d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <h1 class="h3 fw-bold mb-1">Privacy Policy</h1>
                  <p class="text-muted small mb-0 font-mono">
                    Effective Date: August 30, 2026 &bull; Platform: <a href="https://dsa-with-c.vercel.app" target="_blank" rel="noopener noreferrer">dsa-with-c.vercel.app</a>
                  </p>
                </div>
                <a href="/" class="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1">
                  <i class="bi bi-arrow-left"></i>
                  <span>Back to App</span>
                </a>
              </div>

              <div class="p-3 bg-subsurface rounded border-start border-4 border-primary mb-4 small">
                <strong>Privacy-First Commitment:</strong> DSA with C is built for student learning. We believe learning tools should not track, monetize, or harvest user data. We collect only the absolute minimum information required to persist your problem solving progress.
              </div>

              <section class="mb-4 pb-3 border-bottom">
                <h2 class="h5 fw-bold mb-2">1. Information We Collect</h2>
                <p class="text-secondary small mb-2" style="line-height: 1.7;">
                  When you create an account and interact with DSA with C, we collect only the following data points:
                </p>
                <ul class="text-secondary small ps-3 mb-0" style="line-height: 1.7;">
                  <li class="mb-2"><strong>Username:</strong> A public identifier you choose to log in and label your progress.</li>
                  <li class="mb-2"><strong>Password (Hashed):</strong> Your chosen password is cryptographically salted and hashed using <code>bcrypt</code> before being stored. We never store, log, or transmit passwords in plaintext.</li>
                  <li class="mb-0"><strong>Solved Problem Data:</strong> The IDs of problems you mark as solved along with ISO timestamps indicating when each problem was solved.</li>
                </ul>
              </section>

              <section class="mb-4 pb-3 border-bottom">
                <h2 class="h5 fw-bold mb-2">2. Information We Do NOT Collect</h2>
                <p class="text-secondary small mb-2" style="line-height: 1.7;">
                  To ensure total privacy and eliminate unnecessary data retention:
                </p>
                <ul class="text-secondary small ps-3 mb-0" style="line-height: 1.7;">
                  <li class="mb-2"><strong>No Personal Contact Information:</strong> We do NOT collect email addresses, real names, phone numbers, or physical addresses.</li>
                  <li class="mb-2"><strong>No Tracking or Ad Cookies:</strong> We do NOT use tracking cookies, advertising pixels, fingerprinting scripts, or third-party behavioral analytics.</li>
                  <li class="mb-0"><strong>No Financial Data:</strong> The platform is completely free; no payment or billing details are ever requested.</li>
                </ul>
              </section>

              <section class="mb-4 pb-3 border-bottom">
                <h2 class="h5 fw-bold mb-2">3. Crucial Notice: No Password Recovery</h2>
                <div class="alert alert-warning py-2 px-3 small mb-2">
                  <i class="bi bi-exclamation-triangle-fill me-1"></i>
                  <strong>Important:</strong> Because we do not store email addresses or phone numbers, we have no mechanism to verify your identity or send password reset links. If you forget your password, your account cannot be recovered.
                </div>
                <p class="text-secondary small mb-0" style="line-height: 1.7;">
                  We encourage users to keep a record of their credentials. In the event of a forgotten password, you may simply create a new username.
                </p>
              </section>

              <section class="mb-4 pb-3 border-bottom">
                <h2 class="h5 fw-bold mb-2">4. How Your Data Is Stored &amp; Used</h2>
                <p class="text-secondary small mb-2" style="line-height: 1.7;">
                  Your solved problem states are temporarily stored in your browser's <code>localStorage</code> for immediate, responsive user interface updates, and synchronized via our secure backend API to a MongoDB database to preserve your progress across devices and sessions.
                </p>
                <p class="text-secondary small mb-0" style="line-height: 1.7;">
                  We do not sell, rent, monetize, or disclose your progress data to any third parties.
                </p>
              </section>

              <section class="mb-0">
                <h2 class="h5 fw-bold mb-2">5. Data Deletion &amp; Inquiries</h2>
                <p class="text-secondary small mb-2" style="line-height: 1.7;">
                  If you wish to request the manual deletion of your account and solved progress records from our database, please open a request on our issue tracker with your username:
                </p>
                <p class="mt-2 mb-0 small">
                  👉 <a href="https://github.com/arko252007-dot/dsa-frontend/issues" target="_blank" rel="noopener noreferrer" class="fw-medium">GitHub Issues (arko252007-dot/dsa-frontend/issues)</a>
                </p>
              </section>

            </div>

          </div>
        </div>
      </div>
    `;
  },

  init() {}
};
