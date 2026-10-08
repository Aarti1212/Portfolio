/**
 * render.js - Dynamic Template Rendering
 * Fetches JSON files and renders semantic HTML components into the DOM.
 */

// Helper to sanitize text if needed
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function loadJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`Failed loading ${url}:`, err);
    return null;
  }
}

// --------------------------------------------------------------------------
// Render Profile & Hero
// --------------------------------------------------------------------------
export function renderProfile(profile) {
  if (!profile) return;

  // Name & Titles
  const heroNameEl = document.getElementById('heroName');
  if (heroNameEl) heroNameEl.textContent = profile.name;

  const heroTaglineEl = document.getElementById('heroTagline');
  if (heroTaglineEl) heroTaglineEl.textContent = profile.tagline;

  const aboutNameEl = document.getElementById('aboutName');
  if (aboutNameEl) aboutNameEl.textContent = profile.name;

  const aboutRoleEl = document.getElementById('aboutRole');
  if (aboutRoleEl) aboutRoleEl.textContent = profile.title;

  const aboutLocEl = document.getElementById('aboutLoc');
  if (aboutLocEl) aboutLocEl.textContent = profile.location;

  const aboutBioEl = document.getElementById('aboutBio');
  if (aboutBioEl) aboutBioEl.textContent = profile.shortBio;

  // Status Badge
  const statusBadgeEl = document.getElementById('statusBadgeText');
  if (statusBadgeEl && profile.availabilityStatus) {
    statusBadgeEl.textContent = profile.availabilityStatus;
  }

  // Stats Grid
  const statsContainer = document.getElementById('statsContainer');
  if (statsContainer && profile.stats) {
    statsContainer.innerHTML = profile.stats.map(s => `
      <div class="stat-card">
        <div class="stat-value">${escapeHtml(s.value)}</div>
        <div class="stat-label">${escapeHtml(s.label)}</div>
        <div class="stat-detail">${escapeHtml(s.detail)}</div>
      </div>
    `).join('');
  }

  // Current Focus Block
  const focusContainer = document.getElementById('focusContainer');
  if (focusContainer && profile.currentFocus) {
    focusContainer.innerHTML = `
      <li class="focus-item">
        <span class="focus-badge">Building</span>
        <span>${escapeHtml(profile.currentFocus.building)}</span>
      </li>
      <li class="focus-item">
        <span class="focus-badge">Exploring</span>
        <span>${escapeHtml(profile.currentFocus.exploring)}</span>
      </li>
      <li class="focus-item">
        <span class="focus-badge">Reading</span>
        <span>${escapeHtml(profile.currentFocus.reading)}</span>
      </li>
    `;
  }

  // Social Links in Hero & Contact & Footer
  const heroSocials = document.getElementById('heroSocials');
  const footerSocials = document.getElementById('footerSocials');
  const contactLinks = document.getElementById('contactDirectLinks');

  const socialsHtml = `
    ${profile.socials.github ? `<a href="${profile.socials.github}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="GitHub"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg></a>` : ''}
    ${profile.socials.linkedin ? `<a href="${profile.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>` : ''}
    ${profile.email ? `<a href="mailto:${profile.email}" class="social-icon-btn" aria-label="Email"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>` : ''}
    ${profile.phone ? `<a href="tel:${profile.phone}" class="social-icon-btn" aria-label="Phone"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></a>` : ''}
  `;

  if (heroSocials) heroSocials.innerHTML = socialsHtml;
  if (footerSocials) footerSocials.innerHTML = socialsHtml;

  if (contactLinks) {
    contactLinks.innerHTML = `
      <a href="mailto:${profile.email}" class="contact-direct-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        <span>${profile.email}</span>
      </a>
      <a href="tel:${profile.phone}" class="contact-direct-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        <span>${profile.phone}</span>
      </a>
      <div class="contact-direct-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        <span>${profile.location}</span>
      </div>
    `;
  }
}

// --------------------------------------------------------------------------
// Render Experience Timeline
// --------------------------------------------------------------------------
export function renderExperience(experience) {
  const container = document.getElementById('experienceTimeline');
  if (!container || !experience) return;

  container.innerHTML = experience.map(exp => `
    <div class="timeline-item reveal-on-scroll">
      <div class="timeline-node"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <h3 class="timeline-role">${escapeHtml(exp.role)}</h3>
          <span class="timeline-period">${escapeHtml(exp.period)}</span>
        </div>
        <div class="timeline-company-row">
          <span class="timeline-company">${escapeHtml(exp.company)}</span>
          <span class="timeline-loc">• ${escapeHtml(exp.location)}</span>
        </div>
        <p class="timeline-summary">${escapeHtml(exp.summary)}</p>
        <ul class="timeline-bullets">
          ${exp.highlights.map(h => `<li class="timeline-bullet">${escapeHtml(h)}</li>`).join('')}
        </ul>
        <div class="tech-tag-group">
          ${exp.technologies.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// --------------------------------------------------------------------------
// Render Projects
// --------------------------------------------------------------------------
export function renderProjects(projects) {
  const grid = document.getElementById('projectsGrid');
  if (!grid || !projects) return;

  grid.innerHTML = projects.map(p => `
    <article class="project-card ${p.featured ? 'featured' : ''} reveal-on-scroll" data-id="${p.id}" data-category="${p.category}">
      ${p.featured ? `<div class="featured-ribbon">Featured</div>` : ''}
      <div class="project-thumb-wrapper">
        <img src="${p.image}" alt="${escapeHtml(p.title)}" class="project-thumb" loading="lazy" />
      </div>
      <div class="project-body">
        <span class="project-category">${escapeHtml(p.category)}</span>
        <h3 class="project-title">${escapeHtml(p.title)}</h3>
        <p class="project-summary">${escapeHtml(p.summary)}</p>
        <div class="project-footer">
          <div class="project-tech-row">
            ${p.techStack.slice(0, 4).map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
            ${p.techStack.length > 4 ? `<span class="tech-tag">+${p.techStack.length - 4}</span>` : ''}
          </div>
          <div class="project-links-row">
            <button class="view-details-btn" data-project-id="${p.id}" aria-label="View deep dive for ${escapeHtml(p.title)}">
              Deep Dive <span>→</span>
            </button>
            <div class="project-link-icons">
              ${p.links.github ? `<a href="${p.links.github}" target="_blank" rel="noopener noreferrer" class="project-action-link" aria-label="GitHub Repository" onclick="event.stopPropagation();"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg></a>` : ''}
              ${p.links.huggingface ? `<a href="${p.links.huggingface}" target="_blank" rel="noopener noreferrer" class="project-action-link" aria-label="Hugging Face Space" onclick="event.stopPropagation();"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></a>` : ''}
            </div>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

// --------------------------------------------------------------------------
// Render Skills & Concept Explainers
// --------------------------------------------------------------------------
export function renderSkills(skillsData) {
  if (!skillsData) return;

  // Categories & Skills
  const skillsContainer = document.getElementById('skillsCategoryGrid');
  if (skillsContainer && skillsData.categories) {
    skillsContainer.innerHTML = skillsData.categories.map(cat => `
      <div class="skill-category-card reveal-on-scroll">
        <h3 class="skill-cat-title">${escapeHtml(cat.name)}</h3>
        <p class="skill-cat-desc">${escapeHtml(cat.description)}</p>
        <div class="skill-items-list">
          ${cat.skills.map(s => `
            <div class="skill-row">
              <div class="skill-name-wrap">
                <span class="skill-name">${escapeHtml(s.name)}</span>
              </div>
              <span class="skill-level-pill level-${s.level}">${escapeHtml(s.level)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // Concept Explainers
  const conceptsContainer = document.getElementById('conceptsGrid');
  if (conceptsContainer && skillsData.concepts) {
    conceptsContainer.innerHTML = skillsData.concepts.map(c => `
      <div class="concept-card reveal-on-scroll" tabindex="0" role="button" aria-expanded="false">
        <div class="concept-header">
          <h4 class="concept-title">${escapeHtml(c.title)}</h4>
          <svg class="concept-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
        <span class="concept-badge">${escapeHtml(c.tag)}</span>
        <p class="concept-summary">${escapeHtml(c.summary)}</p>
        <div class="concept-deepdive">
          ${escapeHtml(c.deepDive)}
        </div>
      </div>
    `).join('');

    // Add click listeners to concept cards
    conceptsContainer.querySelectorAll('.concept-card').forEach(card => {
      const toggle = () => {
        const isExpanded = card.classList.toggle('expanded');
        card.setAttribute('aria-expanded', isExpanded);
      };
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }
}

// --------------------------------------------------------------------------
// Render Writing & TIL
// --------------------------------------------------------------------------
export function renderWriting(writingData) {
  if (!writingData) return;

  const articlesContainer = document.getElementById('articlesList');
  if (articlesContainer && writingData.articles) {
    articlesContainer.innerHTML = writingData.articles.map(a => `
      <a href="${a.url}" target="_blank" rel="noopener noreferrer" class="article-card reveal-on-scroll">
        <div class="article-meta">
          <span>${escapeHtml(a.date)}</span>
          <span>•</span>
          <span>${escapeHtml(a.readingTime)}</span>
          <span>•</span>
          <span style="color: var(--accent-purple);">${escapeHtml(a.type)}</span>
        </div>
        <h3 class="article-title">${escapeHtml(a.title)}</h3>
        <p class="article-summary">${escapeHtml(a.summary)}</p>
        <div class="tech-tag-group">
          ${a.tags.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
        </div>
      </a>
    `).join('');
  }

  const tilContainer = document.getElementById('tilList');
  if (tilContainer && writingData.tilNotes) {
    tilContainer.innerHTML = writingData.tilNotes.map(til => `
      <div class="til-card reveal-on-scroll">
        <div class="til-date">${escapeHtml(til.date)}</div>
        <h4 class="til-title">${escapeHtml(til.title)}</h4>
        <p class="til-snippet">${escapeHtml(til.snippet)}</p>
      </div>
    `).join('');
  }
}

// --------------------------------------------------------------------------
// Render Education & Certifications
// --------------------------------------------------------------------------
export function renderEducation(eduData, certData) {
  const eduContainer = document.getElementById('educationList');
  if (eduContainer && eduData) {
    eduContainer.innerHTML = eduData.map(edu => `
      <div class="edu-card reveal-on-scroll">
        <h3 class="edu-degree">${escapeHtml(edu.degree)}</h3>
        <div class="edu-school">${escapeHtml(edu.institution)} (${escapeHtml(edu.location)})</div>
        <div class="edu-year">${escapeHtml(edu.year)}</div>
        <p style="font-size: 0.875rem; margin-bottom: var(--space-3);">${escapeHtml(edu.summary)}</p>
        <div class="tech-tag-group">
          ${edu.coursework.map(c => `<span class="tech-tag">${escapeHtml(c)}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  const certContainer = document.getElementById('certificationsList');
  if (certContainer && certData) {
    certContainer.innerHTML = certData.map(cert => `
      <div class="cert-card reveal-on-scroll">
        <h3 class="edu-degree">${escapeHtml(cert.name)}</h3>
        <div class="cert-issuer">${escapeHtml(cert.issuer)} • Issued ${escapeHtml(cert.issueDate)}</div>
        <div class="tech-tag-group" style="margin-top: var(--space-3);">
          ${cert.skills.map(s => `<span class="tech-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
        ${cert.credentialUrl ? `
          <a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" class="cert-link">
            Verify Credential <span>↗</span>
          </a>
        ` : ''}
      </div>
    `).join('');
  }
}
