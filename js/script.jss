/* script.js — interactions for the portfolio */
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle: persists in localStorage
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') root.setAttribute('data-theme', 'dark');

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    if (current === 'dark') {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  // Set year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const targetId = a.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        ev.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        closeMobileNav();
      }
    });
  });

  // Mobile nav toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-close');

  function openMobileNav(){
    mobileNav.setAttribute('aria-hidden', 'false');
  }
  function closeMobileNav(){
    mobileNav.setAttribute('aria-hidden', 'true');
  }

  mobileToggle.addEventListener('click', openMobileNav);
  mobileClose.addEventListener('click', closeMobileNav);
  // close when clicking a nav link
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

  // Simple form validation (design-only)
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      alert('Please fill in all fields before sending.');
      return;
    }
    // UI feedback only: you need to wire up a backend or form service to actually send the message
    alert('Thanks, ' + name + '! This form is a UI-only demo. Connect a form backend to receive messages.');
    form.reset();
  });

  // Accessibility: close mobile nav with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });
});
