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

  const escapeStr = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const msgInput = document.getElementById('contactMessage');
    const submitBtn = form.querySelector('button[type="submit"]');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = msgInput ? msgInput.value.trim() : '';

    // Validation
    if (!name || !email || !message) {
      statusMsg.className = 'form-status-msg error';
      statusMsg.style.display = 'block';
      statusMsg.textContent = 'Please fill out all required fields (Name, Email, and Message).';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      statusMsg.className = 'form-status-msg error';
      statusMsg.style.display = 'block';
      statusMsg.textContent = 'Please enter a valid email address so Aarti can reply to you.';
      return;
    }

    const recipientEmail = (profileConfig && profileConfig.contactEmail) || 'aartibarve11@gmail.com';
    let endpoint = (profileConfig && profileConfig.contactFormEndpoint) 
      ? profileConfig.contactFormEndpoint 
      : `https://formsubmit.co/ajax/${recipientEmail}`;

    // If endpoint is still the placeholder formspree link, switch to live FormSubmit
    if (endpoint.includes('your_form_id_here')) {
      endpoint = `https://formsubmit.co/ajax/${recipientEmail}`;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span>Sending...</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin" style="margin-left: 6px;"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"></circle></svg>
    `;
    statusMsg.style.display = 'none';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `New Portfolio Message from ${name}`,
          _replyto: email,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json().catch(() => ({}));

      // Store a local backup of submitted message
      try {
        const history = JSON.parse(localStorage.getItem('portfolio_sent_messages') || '[]');
        history.unshift({ name, email, message, date: new Date().toISOString() });
        localStorage.setItem('portfolio_sent_messages', JSON.stringify(history.slice(0, 20)));
      } catch (_) {}

      if (response.ok && (data.success === 'true' || data.success === true || !data.error)) {
        statusMsg.className = 'form-status-msg success';
        statusMsg.style.display = 'block';
        statusMsg.innerHTML = `<strong>Message sent!</strong> Thank you, ${escapeStr(name)}. Your message has been sent directly to Aarti's inbox (<a href="mailto:${recipientEmail}" style="color: inherit; text-decoration: underline;">${recipientEmail}</a>). She will get back to you shortly!`;
        form.reset();
      } else if (data.message && data.message.includes('needs Activation')) {
        statusMsg.className = 'form-status-msg success';
        statusMsg.style.display = 'block';
        statusMsg.innerHTML = `<strong>Message received!</strong> Thank you, ${escapeStr(name)}. An activation confirmation has been dispatched to Aarti's inbox to link this form.`;
        form.reset();
      } else {
        throw new Error(data.message || 'Form submission encountered an error');
      }
    } catch (err) {
      console.warn('Form relay error:', err);
      const mailtoUrl = `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(`Portfolio Message from ${name}`)}&body=${encodeURIComponent(`Hi Aarti,\n\n${message}\n\nBest regards,\n${name}\n${email}`)}`;
      statusMsg.className = 'form-status-msg error';
      statusMsg.style.display = 'block';
      statusMsg.innerHTML = `
        <div style="line-height: 1.5;">
          <strong>Direct delivery fallback:</strong> If the automated relay is slow or blocked, click below to send directly via your email app to <strong>${recipientEmail}</strong>:
        </div>
        <div style="margin-top: 10px;">
          <a href="${mailtoUrl}" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; font-size: 13px; text-decoration: none;">
            <span>Open Email App to Send (${recipientEmail})</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </a>
        </div>
      `;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>Send Message</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 6px;"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      `;
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
