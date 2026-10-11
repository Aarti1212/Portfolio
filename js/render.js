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

  const aboutAvatarEl = document.getElementById('aboutAvatar');
  if (aboutAvatarEl && profile.avatar) aboutAvatarEl.src = profile.avatar;

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

  // Dynamic Resume Link binding
  if (profile.resumePath) {
    document.querySelectorAll('a[href*="resume.pdf"], a[href*="Resume"]').forEach(a => {
      a.setAttribute('href', profile.resumePath);
    });
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
        ${exp.headline ? `<h4 class="timeline-headline">“${escapeHtml(exp.headline)}”</h4>` : ''}
        ${exp.summary ? `<p class="timeline-summary">${escapeHtml(exp.summary)}</p>` : ''}
        ${exp.highlights && exp.highlights.length ? `
          <ul class="timeline-bullets">
            ${exp.highlights.map(h => `<li class="timeline-bullet">${escapeHtml(h)}</li>`).join('')}
          </ul>
        ` : ''}
        ${exp.outcome ? `
          <div class="timeline-outcome">
            <span class="timeline-outcome-badge">Outcome</span>
            <span class="timeline-outcome-text">${escapeHtml(exp.outcome)}</span>
          </div>
        ` : ''}
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
// Render Skills (Interactive Scroll/Slider Visual)
// --------------------------------------------------------------------------
export function renderSkills(skillsData) {
  if (!skillsData) return;

  // Render Top Skills with the Visual Progress Bars
  const sliderContainer = document.getElementById('skillsSliderContainer') || document.getElementById('skillsCategoryGrid');
  if (sliderContainer && skillsData.topSkills) {
    sliderContainer.innerHTML = skillsData.topSkills.map(group => `
      <div class="es-group ${escapeHtml(group.class || '')}">
        <div class="es-heading">
          <span class="es-dot"></span>
          <span>${escapeHtml(group.category)}</span>
        </div>
        ${group.skills.map(s => {
          const defaultVal = typeof s.value === 'number' ? s.value : (s.level === 'Expert' ? 95 : 85);
          return `
            <div class="es-row">
              <div class="es-name">${escapeHtml(s.name)}</div>
              <div class="es-track" tabindex="0" role="slider" aria-valuenow="${defaultVal}" aria-valuemin="10" aria-valuemax="100" aria-label="${escapeHtml(s.name)} proficiency" data-default="${defaultVal}" data-level="${escapeHtml(s.level)}">
                <div class="es-bar"></div>
                <div class="es-fill" style="width: 0%;"></div>
                <div class="es-thumb" style="left: 0%;"></div>
              </div>
              <div class="es-label">${escapeHtml(s.level)}</div>
            </div>
          `;
        }).join('')}
      </div>
    `).join('') + `
      <div class="es-footer">
        <span>Interactive proficiency visual • Drag or click sliders to test</span>
        <button type="button" id="esResetBtn">Reset to verified</button>
      </div>
    `;

    // Initialize interactive dragging, clicking, keyboard controls, and animations
    initSkillsSlider(sliderContainer);
  }
}

// Interactive helper for .es slider visual
function initSkillsSlider(container) {
  if (!container) return;

  function updateTrack(track, pct) {
    const clamped = Math.min(100, Math.max(10, Math.round(pct)));
    track.setAttribute('aria-valuenow', clamped);

    const fill = track.querySelector('.es-fill');
    const thumb = track.querySelector('.es-thumb');
    const row = track.closest('.es-row');
    const label = row ? row.querySelector('.es-label') : null;

    if (fill) fill.style.width = `${clamped}%`;
    if (thumb) thumb.style.left = `${clamped}%`;

    if (label) {
      if (clamped >= 90) {
        label.textContent = 'Expert';
      } else if (clamped >= 75) {
        label.textContent = 'Proficient';
      } else {
        label.textContent = 'Learning';
      }
    }
  }

  container.querySelectorAll('.es-track').forEach(track => {
    let isDragging = false;

    function getPercentage(clientX) {
      const rect = track.getBoundingClientRect();
      const pos = clientX - rect.left;
      return (pos / rect.width) * 100;
    }

    track.addEventListener('pointerdown', (e) => {
      isDragging = true;
      track.classList.add('es-track--drag');
      track.setPointerCapture(e.pointerId);
      updateTrack(track, getPercentage(e.clientX));
    });

    track.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      updateTrack(track, getPercentage(e.clientX));
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('es-track--drag');
      try { track.releasePointerCapture(e.pointerId); } catch (_) {}
    };

    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    // Keyboard support
    track.addEventListener('keydown', (e) => {
      let current = parseInt(track.getAttribute('aria-valuenow') || '90', 10);
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        updateTrack(track, current + 2);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        updateTrack(track, current - 2);
      } else if (e.key === 'Home') {
        e.preventDefault();
        updateTrack(track, 10);
      } else if (e.key === 'End') {
        e.preventDefault();
        updateTrack(track, 100);
      }
    });
  });

  // Reset to verified values button
  const resetBtn = document.getElementById('esResetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      container.querySelectorAll('.es-track').forEach(track => {
        track.classList.remove('es-track--drag');
        const defaultVal = parseInt(track.dataset.default || '90', 10);
        const defaultLevel = track.dataset.level || 'Expert';

        const fill = track.querySelector('.es-fill');
        const thumb = track.querySelector('.es-thumb');
        const row = track.closest('.es-row');
        const label = row ? row.querySelector('.es-label') : null;

        track.setAttribute('aria-valuenow', defaultVal);
        if (fill) fill.style.width = `${defaultVal}%`;
        if (thumb) thumb.style.left = `${defaultVal}%`;
        if (label) label.textContent = defaultLevel;
      });
    });
  }

  // Smooth entrance animation triggered on scroll reveal
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          container.querySelectorAll('.es-track').forEach((track, idx) => {
            const defaultVal = track.dataset.default || '90';
            setTimeout(() => {
              const fill = track.querySelector('.es-fill');
              const thumb = track.querySelector('.es-thumb');
              if (fill) fill.style.width = `${defaultVal}%`;
              if (thumb) thumb.style.left = `${defaultVal}%`;
            }, idx * 40);
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(container);
  } else {
    container.querySelectorAll('.es-track').forEach(track => {
      const defaultVal = track.dataset.default || '90';
      const fill = track.querySelector('.es-fill');
      const thumb = track.querySelector('.es-thumb');
      if (fill) fill.style.width = `${defaultVal}%`;
      if (thumb) thumb.style.left = `${defaultVal}%`;
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

// --------------------------------------------------------------------------
// Render Hobbies, Languages & Culinary Arts
// --------------------------------------------------------------------------
export function renderHobbies(hobbiesData) {
  if (!hobbiesData) return;

  // Render Languages
  const langContainer = document.getElementById('languagesGrid');
  if (langContainer && hobbiesData.languages) {
    langContainer.innerHTML = hobbiesData.languages.map(lang => `
      <div class="language-card reveal-on-scroll">
        <div class="language-card-top">
          <span class="language-flag">${escapeHtml(lang.flag)}</span>
          <span class="language-level-badge">${escapeHtml(lang.level)}</span>
        </div>
        <div class="language-name-wrap">
          <span class="language-name-en">${escapeHtml(lang.name)}</span>
          <span class="language-name-native">${escapeHtml(lang.native)}</span>
        </div>
        <p class="language-desc">${escapeHtml(lang.description)}</p>
      </div>
    `).join('');
  }

  // Render Culinary & Cooking
  const culinaryContainer = document.getElementById('culinaryGrid');
  if (culinaryContainer && hobbiesData.culinary) {
    culinaryContainer.innerHTML = hobbiesData.culinary.map(dish => `
      <div class="culinary-card reveal-on-scroll">
        <div class="culinary-img-wrap">
          <img src="${dish.image}" alt="${escapeHtml(dish.title)}" class="culinary-img" loading="lazy" />
          <span class="culinary-badge">${escapeHtml(dish.badge)}</span>
        </div>
        <div class="culinary-content">
          <span class="culinary-cuisine-tag">${escapeHtml(dish.cuisine)}</span>
          <h4 class="culinary-title">${escapeHtml(dish.title)}</h4>
          <p class="culinary-desc">${escapeHtml(dish.description)}</p>
          <div class="culinary-highlights">
            ${dish.highlights.map(h => `<span class="culinary-highlight-chip">${escapeHtml(h)}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Other Interests
  const interestsContainer = document.getElementById('interestsGrid');
  if (interestsContainer && hobbiesData.otherInterests) {
    interestsContainer.innerHTML = hobbiesData.otherInterests.map(item => `
      <div class="interest-card reveal-on-scroll">
        <span class="interest-icon">${escapeHtml(item.icon)}</span>
        <h4 class="interest-title">${escapeHtml(item.title)}</h4>
        <p class="interest-desc">${escapeHtml(item.description)}</p>
      </div>
    `).join('');
  }
}

