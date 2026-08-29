export const TermsPage = {
  render() {
    return `
      <div class="container-fluid px-3 px-md-4 px-lg-5 py-3 py-md-4">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-9">
            
            <div class="card shadow-sm border p-4 p-md-5 mb-4">
              
              <div class="mb-4 pb-3 border-bottom d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <h1 class="h3 fw-bold mb-1">Terms of Service</h1>
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
                <strong>Quick Summary:</strong> DSA with C is a free, non-commercial educational platform. We provide curated DSA practice and live C dry-run visualizers to assist computer science students. By using our hosted website, you agree to the conditions outlined below.
              </div>

              <section class="mb-4 pb-3 border-bottom">
                <h2 class="h5 fw-bold mb-2">1. Acceptance of Terms</h2>
                <p class="text-secondary small mb-0" style="line-height: 1.7;">
                  By accessing or using the hosted application at <strong>dsa-with-c.vercel.app</strong> ("Service", "Platform"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the hosted platform.
                </p>
              </section>

              <section class="mb-4 pb-3 border-bottom">
                <h2 class="h5 fw-bold mb-2">2. Description of the Service</h2>
                <p class="text-secondary small mb-0" style="line-height: 1.7;">
                  DSA with C is an <strong>educational practice and algorithm visualization suite</strong> built specifically around the C programming language. It is maintained as an educational resource, not a commercial enterprise product. The service is provided completely free of charge on an <strong>"as-is" and "as-available" basis</strong>.
                </p>
              </section>

              <section class="mb-4 pb-3 border-bottom">
                <h2 class="h5 fw-bold mb-2">3. Account Responsibility &amp; Credentials</h2>
                <p class="text-secondary small mb-2" style="line-height: 1.7;">
                  When creating an account to track your problem-solving progress:
                </p>
                <ul class="text-secondary small ps-3 mb-0" style="line-height: 1.7;">
                  <li class="mb-2"><strong>Password Responsibility:</strong> To safeguard student privacy, we do not collect email addresses, phone numbers, or external IDs. As a direct consequence, <strong>there is no automated password reset or password recovery mechanism</strong>. You are solely responsible for maintaining the confidentiality and remembrance of your credentials.</li>
                  <li class="mb-2"><strong>One Account per Individual:</strong> Users should register a single account for personal educational progress tracking.</li>
                  <li class="mb-0"><strong>No Impersonation:</strong> You agree not to register with usernames intended to impersonate other students, maintainers, or organizations.</li>
                </ul>
              </section>

              <section class="mb-4 pb-3 border-bottom">
                <h2 class="h5 fw-bold mb-2">4. Acceptable Use Policy</h2>
                <p class="text-secondary small mb-2" style="line-height: 1.7;">
                  You agree to use the service only for lawful educational purposes. You agree not to:
                </p>
                <ul class="text-secondary small ps-3 mb-0" style="line-height: 1.7;">
                  <li class="mb-2">Attempt to probe, scrape, flood, rate-limit abuse, or disrupt the backend REST API servers or hosting infrastructure.</li>
                  <li class="mb-2">Attempt to bypass authentication, decrypt stored hashes, or access the solved progress and data of other users without permission.</li>
                  <li class="mb-2">Use automated bots or scripts to bulk-generate fraudulent accounts or spam database endpoints.</li>
                  <li class="mb-0">Engage in any activity that violates applicable local or international laws and regulations.</li>
                </ul>
              </section>

              <section class="mb-4 pb-3 border-bottom">
                <h2 class="h5 fw-bold mb-2">5. Disclaimer of Warranties &amp; Limitation of Liability</h2>
                <p class="text-secondary small mb-2" style="line-height: 1.7;">
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
                <p class="text-secondary small mb-0" style="line-height: 1.7;">
                  The maintainers and contributors make no guarantees regarding continuous uptime, data persistence, or that the service will remain bug-free. In no event shall the authors or copyright holders be liable for any claims, losses, or damages arising out of the use of or inability to use this platform. The maintainers reserve the right to modify, suspend, or discontinue any feature of the hosted service at any time without prior notice.
                </p>
              </section>

              <section class="mb-4 pb-3 border-bottom">
                <h2 class="h5 fw-bold mb-2">6. Code Visibility &amp; Licensing</h2>
                <p class="text-secondary small mb-0" style="line-height: 1.7;">
                  The source code for DSA with C is publicly viewable on GitHub for reference and portfolio purposes, but is not open-source — see the <a href="https://github.com/arko252007-dot/dsa-frontend/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">LICENSE</a> file. Viewing the code does not grant any right to copy, modify, deploy, or redistribute it. These Terms of Service separately govern your use of the live hosted instance at <code>dsa-with-c.vercel.app</code>.
                </p>
              </section>

              <section class="mb-4 pb-3 border-bottom">
                <h2 class="h5 fw-bold mb-2">7. Governing Law</h2>
                <p class="text-secondary small mb-0" style="line-height: 1.7;">
                  These Terms shall be interpreted and governed in accordance with the laws of <strong>India</strong>, without giving effect to any conflict of law principles.
                </p>
              </section>

              <section class="mb-0">
                <h2 class="h5 fw-bold mb-2">8. Contact &amp; Issue Reporting</h2>
                <p class="text-secondary small mb-2" style="line-height: 1.7;">
                  If you have questions regarding these Terms, have encountered a technical issue, or wish to request the manual deletion of your username and progress records from our database, please reach out via our centralized issue tracker:
                </p>
                <p class="mt-2 mb-0 small">
                  👉 <a href="https://github.com/arko252007-dot/dsa-frontend/issues" target="_blank" rel="noopener noreferrer" class="fw-medium">Open an Issue on GitHub (arko252007-dot/dsa-frontend/issues)</a>
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
