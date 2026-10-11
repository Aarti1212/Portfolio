/**
 * main.js - Master Application Bootstrap & Controller
 */

import { initTheme } from './theme.js';
import { initHeroCanvas } from './canvas-ai.js';
import { loadJSON, renderProfile, renderExperience, renderProjects, renderSkills, renderWriting, renderEducation, renderHobbies } from './render.js';
import { initProjectFilters } from './filters.js';
import { initProjectModal } from './modal.js';
import { initCommandPalette } from './palette.js';
import { initAssistant } from './assistant.js';

// Text Cycler for Hero Section
function initRoleCycler() {
  const cyclerEl = document.getElementById('heroRoleCycler');
  if (!cyclerEl) return;

  const roles = [
    'Generative AI & LLM Systems',
    'Autonomous Multi-Agent Workflows (LangGraph & MCP)',
    'Enterprise Hybrid RAG Pipelines',
    'Real-Time Streaming Voice AI',
    'Production MLOps & High-Scale Search'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      charIdx--;
      cyclerEl.textContent = currentRole.substring(0, charIdx);
      typingSpeed = 35;
    } else {
      charIdx++;
      cyclerEl.textContent = currentRole.substring(0, charIdx);
      typingSpeed = 75;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2200; // Pause at end of sentence
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// Mobile Menu Drawer
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scrollspy for active navigation links
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Scroll Reveal with IntersectionObserver
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

// Contact Form Handler
function initContactForm(profileConfig) {
  const form = document.getElementById('contactForm');
  const statusMsg = document.getElementById('formStatusMsg');
  if (!form || !statusMsg) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const msgInput = document.getElementById('contactMessage');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Validation
    if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim()) {
      statusMsg.className = 'form-status-msg error';
      statusMsg.textContent = 'Please fill out all required fields.';
      return;
    }

    const endpoint = (profileConfig && profileConfig.contactFormEndpoint) 
      ? profileConfig.contactFormEndpoint 
      : 'https://formspree.io/f/your_form_id_here';

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusMsg.style.display = 'none';

    try {
      // Check if endpoint is still default placeholder
      if (endpoint.includes('your_form_id_here')) {
        // Provide friendly client-side fallback demonstration
        await new Promise(r => setTimeout(r, 800));
        statusMsg.className = 'form-status-msg success';
        statusMsg.textContent = 'Thank you for your message! (Demo Mode: Update contactFormEndpoint in profile.json to receive live submissions).';
        form.reset();
      } else {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: msgInput.value.trim()
          })
        });

        if (response.ok) {
          statusMsg.className = 'form-status-msg success';
          statusMsg.textContent = 'Thank you! Your message has been sent successfully.';
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      }
    } catch (err) {
      statusMsg.className = 'form-status-msg error';
      statusMsg.textContent = 'Something went wrong. Please reach out directly via email at aartibarve11@gmail.com.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

// Master Initialization
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initHeroCanvas();
  initRoleCycler();
  initMobileMenu();
  initScrollSpy();

  // Load all JSON data in parallel
  const [profile, experience, projects, skills, education, certifications, writing, hobbies] = await Promise.all([
    loadJSON('data/profile.json'),
    loadJSON('data/experience.json'),
    loadJSON('data/projects.json'),
    loadJSON('data/skills.json'),
    loadJSON('data/education.json'),
    loadJSON('data/certifications.json'),
    loadJSON('data/writing.json'),
    loadJSON('data/hobbies.json')
  ]);

  // Render components
  if (profile) renderProfile(profile);
  if (experience) renderExperience(experience);
  if (projects) renderProjects(projects);
  if (skills) renderSkills(skills);
  if (writing) renderWriting(writing);
  if (education && certifications) renderEducation(education, certifications);
  if (hobbies) renderHobbies(hobbies);

  // Initialize Interactive systems
  if (projects) {
    initProjectFilters(projects);
    initProjectModal(projects);
    initCommandPalette(projects);
  }

  initAssistant();
  initContactForm(profile?.config);

  // Trigger scroll reveal on rendered elements
  setTimeout(initScrollReveal, 100);
});
