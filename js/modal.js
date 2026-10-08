/**
 * modal.js - Project Detail Modal with Deep Dive, Mermaid Architecture, and Focus Trap
 */

export function initProjectModal(projects) {
  const overlay = document.getElementById('projectModalOverlay');
  const modalContent = document.getElementById('modalDynamicContent');
  const closeBtn = document.getElementById('modalCloseBtn');
  const projectsGrid = document.getElementById('projectsGrid');

  if (!overlay || !modalContent || !projects) return;

  let previouslyFocusedElement = null;

  function openModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    previouslyFocusedElement = document.activeElement;

    // Render Modal Details
    modalContent.innerHTML = `
      <div class="modal-header">
        <div class="modal-badge-row">
          <span class="project-category">${project.category}</span>
          ${project.featured ? '<span class="featured-ribbon" style="position: static;">Featured</span>' : ''}
        </div>
        <h2 class="modal-title">${project.title}</h2>
        <p class="modal-summary" style="font-size: 1.0625rem; color: var(--text-secondary);">${project.summary}</p>
        
        <div class="modal-links">
          ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> GitHub Code</a>` : ''}
          ${project.links.demo ? `<a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Live Demo ↗</a>` : ''}
          ${project.links.huggingface ? `<a href="${project.links.huggingface}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">Hugging Face Space</a>` : ''}
          ${project.links.paper ? `<a href="${project.links.paper}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Read Technical Paper / Blog</a>` : ''}
        </div>
      </div>

      <!-- Key Metrics -->
      ${project.metrics && project.metrics.length > 0 ? `
        <div class="modal-section">
          <h3 class="modal-section-title">📊 Key Results & Impact</h3>
          <div class="modal-metrics-grid">
            ${project.metrics.map(m => `
              <div class="modal-metric-card">
                <div class="modal-metric-value">${m.value}</div>
                <div class="modal-metric-label">${m.label}</div>
                ${m.delta ? `<div class="modal-metric-delta">${m.delta}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Problem & Approach -->
      <div class="modal-section">
        <h3 class="modal-section-title">🎯 The Problem</h3>
        <p style="margin-bottom: var(--space-4); font-size: 0.9375rem; line-height: 1.7;">${project.problem}</p>
        
        <h3 class="modal-section-title">💡 Technical Approach & Methodology</h3>
        <p style="font-size: 0.9375rem; line-height: 1.7;">${project.approach}</p>
      </div>

      <!-- Architecture Diagram -->
      ${project.architecture ? `
        <div class="modal-section">
          <h3 class="modal-section-title">🏗️ System Architecture Flow</h3>
          <div class="arch-diagram-wrapper">
            <div class="mermaid">${project.architecture}</div>
          </div>
        </div>
      ` : ''}

      <!-- Code Snippet -->
      ${project.codeSnippet ? `
        <div class="modal-section">
          <h3 class="modal-section-title">💻 Key Implementation Logic</h3>
          <div class="code-box-wrapper">
            <button class="copy-code-btn" data-code="${encodeURIComponent(project.codeSnippet.code)}" aria-label="Copy code">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy</span>
            </button>
            <pre><code class="language-${project.codeSnippet.language}">${project.codeSnippet.code}</code></pre>
          </div>
        </div>
      ` : ''}

      <!-- Challenges & Learnings -->
      <div class="modal-section">
        <h3 class="modal-section-title">🧠 Technical Challenges & Engineering Learnings</h3>
        <p style="font-size: 0.9375rem; line-height: 1.7;">${project.challengesAndLearnings}</p>
      </div>

      <!-- What I'd Do Next -->
      ${project.whatIdDoNext ? `
        <div class="modal-section" style="margin-bottom: 0;">
          <h3 class="modal-section-title">🚀 Next Steps & Future Iterations</h3>
          <p style="font-size: 0.9375rem; line-height: 1.7; color: var(--text-secondary);">${project.whatIdDoNext}</p>
        </div>
      ` : ''}
    `;

    // Trigger Mermaid Render if available
    if (window.mermaid) {
      try {
        window.mermaid.run({
          nodes: modalContent.querySelectorAll('.mermaid')
        });
      } catch (err) {
        console.warn('Mermaid rendering error:', err);
      }
    }

    // Trigger syntax highlighting if Prism or Highlight.js loaded
    if (window.Prism) {
      window.Prism.highlightAllUnder(modalContent);
    }

    // Attach copy-to-clipboard handler
    modalContent.querySelectorAll('.copy-code-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const rawCode = decodeURIComponent(btn.getAttribute('data-code'));
        navigator.clipboard.writeText(rawCode).then(() => {
          btn.innerHTML = `<span>Copied!</span>`;
          setTimeout(() => {
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> <span>Copy</span>`;
          }, 2000);
        });
      });
    });

    // Show modal & trap focus
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  // Click on project card to open
  projectsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    const detailsBtn = e.target.closest('.view-details-btn');
    if (card || detailsBtn) {
      const projectId = (detailsBtn ? detailsBtn.getAttribute('data-project-id') : null) || (card ? card.getAttribute('data-id') : null);
      if (projectId) openModal(projectId);
    }
  });

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });
}
