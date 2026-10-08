/**
 * filters.js - Project Filtering and Live Search
 */

export function initProjectFilters(projects) {
  const chipsContainer = document.getElementById('filterChips');
  const searchInput = document.getElementById('projectSearchInput');
  const projectsGrid = document.getElementById('projectsGrid');
  
  if (!chipsContainer || !projects) return;

  // Extract unique categories
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  // Render filter chip buttons
  chipsContainer.innerHTML = categories.map(cat => `
    <button class="filter-chip ${cat === 'All' ? 'active' : ''}" data-category="${cat}">
      ${cat}
    </button>
  `).join('');

  let activeCategory = 'All';
  let searchQuery = '';

  function applyFilter() {
    const cards = projectsGrid.querySelectorAll('.project-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardId = card.getAttribute('data-id');
      const project = projects.find(p => p.id === cardId);

      const matchesCategory = activeCategory === 'All' || cardCategory === activeCategory;
      const matchesSearch = !searchQuery || (
        project && (
          project.title.toLowerCase().includes(searchQuery) ||
          project.summary.toLowerCase().includes(searchQuery) ||
          project.techStack.some(t => t.toLowerCase().includes(searchQuery)) ||
          project.tags.some(t => t.toLowerCase().includes(searchQuery))
        )
      );

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Handle empty state
    let emptyMsg = document.getElementById('emptyProjectsMsg');
    if (visibleCount === 0) {
      if (!emptyMsg) {
        emptyMsg = document.createElement('div');
        emptyMsg.id = 'emptyProjectsMsg';
        emptyMsg.style.gridColumn = '1 / -1';
        emptyMsg.style.textAlign = 'center';
        emptyMsg.style.padding = 'var(--space-12) 0';
        emptyMsg.style.color = 'var(--text-muted)';
        emptyMsg.innerHTML = `<p>No projects match your filter criteria.</p>`;
        projectsGrid.appendChild(emptyMsg);
      }
      emptyMsg.style.display = 'block';
    } else if (emptyMsg) {
      emptyMsg.style.display = 'none';
    }
  }

  // Chip click handler
  chipsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-chip');
    if (!btn) return;

    chipsContainer.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.getAttribute('data-category');
    applyFilter();
  });

  // Search input handler with debounce
  if (searchInput) {
    let timeoutId;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyFilter();
      }, 150);
    });
  }
}
