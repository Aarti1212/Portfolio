/**
 * palette.js - Command Palette (Cmd+K / Ctrl+K)
 */

export function initCommandPalette(projects) {
  const overlay = document.getElementById('paletteOverlay');
  const input = document.getElementById('paletteInput');
  const resultsList = document.getElementById('paletteResults');
  const headerBtn = document.getElementById('cmdPaletteTriggerBtn');

  if (!overlay || !input || !resultsList) return;

  const defaultActions = [
    { label: 'Jump to: Projects', icon: '⚡', action: () => scrollToSection('projects') },
    { label: 'Jump to: Experience', icon: '💼', action: () => scrollToSection('experience') },
    { label: 'Jump to: Skills & Knowledge', icon: '🧠', action: () => scrollToSection('skills') },
    { label: 'Jump to: Technical Concepts Explained', icon: '📚', action: () => scrollToSection('concepts') },
    { label: 'Jump to: Writing & Notes', icon: '✍️', action: () => scrollToSection('writing') },
    { label: 'Jump to: Education & Certifications', icon: '🎓', action: () => scrollToSection('education') },
    { label: 'Jump to: Contact', icon: '📬', action: () => scrollToSection('contact') },
    { label: 'Action: Download Resume (PDF)', icon: '📄', action: () => window.open('assets/resume.pdf', '_blank') },
    { label: 'Action: Toggle Dark / Light Theme', icon: '🌗', action: () => document.getElementById('themeToggleBtn')?.click() },
    { label: 'Action: View GitHub Profile', icon: '🐙', action: () => window.open('https://github.com/Aarti1212', '_blank') },
    { label: 'Action: View LinkedIn Profile', icon: '🔗', action: () => window.open('https://linkedin.com/in/aarti11', '_blank') }
  ];

  // Add all projects into palette actions
  if (projects) {
    projects.forEach(p => {
      defaultActions.push({
        label: `Project: ${p.title}`,
        icon: '🚀',
        action: () => {
          scrollToSection('projects');
          const card = document.querySelector(`.project-card[data-id="${p.id}"]`);
          if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => card.click(), 400);
          }
        }
      });
    });
  }

  let selectedIndex = 0;
  let currentFiltered = defaultActions;

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    closePalette();
  }

  function renderResults(actions) {
    currentFiltered = actions;
    if (actions.length === 0) {
      resultsList.innerHTML = `<li class="palette-item" style="color: var(--text-muted);">No matching commands found.</li>`;
      return;
    }

    resultsList.innerHTML = actions.map((item, idx) => `
      <li class="palette-item ${idx === selectedIndex ? 'selected' : ''}" data-index="${idx}">
        <div class="palette-item-left">
          <span>${item.icon}</span>
          <span>${item.label}</span>
        </div>
        <span class="cmd-key">↵</span>
      </li>
    `).join('');
  }

  function openPalette() {
    overlay.classList.add('open');
    input.value = '';
    selectedIndex = 0;
    renderResults(defaultActions);
    input.focus();
  }

  function closePalette() {
    overlay.classList.remove('open');
  }

  // Input filter
  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    selectedIndex = 0;
    if (!query) {
      renderResults(defaultActions);
    } else {
      const filtered = defaultActions.filter(a => a.label.toLowerCase().includes(query));
      renderResults(filtered);
    }
  });

  // Keyboard navigation inside palette
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedIndex < currentFiltered.length - 1) {
        selectedIndex++;
        renderResults(currentFiltered);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedIndex > 0) {
        selectedIndex--;
        renderResults(currentFiltered);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentFiltered[selectedIndex]) {
        currentFiltered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });

  // Click on results
  resultsList.addEventListener('click', (e) => {
    const item = e.target.closest('.palette-item');
    if (!item) return;
    const idx = parseInt(item.getAttribute('data-index'), 10);
    if (!isNaN(idx) && currentFiltered[idx]) {
      currentFiltered[idx].action();
    }
  });

  // Global trigger shortcut (Cmd+K / Ctrl+K)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    }
  });

  if (headerBtn) headerBtn.addEventListener('click', openPalette);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePalette();
  });
}
