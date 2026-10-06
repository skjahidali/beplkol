const pageLoader = document.getElementById('pageLoader');
let loaderFinishing = false;
let loaderFallback;

function hidePageLoader() {
  if (!pageLoader || loaderFinishing) return;
  loaderFinishing = true;
  window.clearTimeout(loaderFallback);
  pageLoader.classList.add('is-ready');
  window.setTimeout(() => {
    pageLoader.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
    document.body.removeAttribute('aria-busy');
  }, 600);
}

if (pageLoader) {
  if (document.readyState === 'complete') {
    hidePageLoader();
  } else {
    window.addEventListener('load', hidePageLoader, { once: true });
    loaderFallback = window.setTimeout(hidePageLoader, 8000);
  }
}

// ========== PARTICLES ==========
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  for (let i = 0; i < 18; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${8 + Math.random() * 8}s`;
    particlesContainer.appendChild(particle);
  }
}

// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
if (navbar) {
  const updateNavbar = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();
}

// ========== MOBILE MENU ==========
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function setMenuOpen(isOpen) {
  if (!menuToggle || !mobileMenu || !mobileOverlay) return;
  mobileMenu.classList.toggle('open', isOpen);
  mobileOverlay.classList.toggle('open', isOpen);
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  mobileMenu.inert = !isOpen;
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  document.body.classList.toggle('menu-open', isOpen);
}

if (menuToggle && mobileMenu && mobileOverlay) {
  menuToggle.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('open');
    setMenuOpen(isOpen);
    if (isOpen) mobileMenu.querySelector('a')?.focus();
  });
  mobileOverlay.addEventListener('click', () => setMenuOpen(false));
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
}

    // ========== HERO CARD 3D TILT ==========
    const heroCard = document.getElementById('heroCard');
    if (heroCard) {
      heroCard.parentElement.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        heroCard.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
      });
      heroCard.parentElement.addEventListener('mouseleave', () => {
        heroCard.style.transform = 'rotateY(0) rotateX(0)';
      });
    }

// ========== GSAP ANIMATIONS ==========
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-text > *', {
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.2
  });

  gsap.from('.hero-card', {
    x: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.5
  });

  gsap.utils.toArray('.section-title, .section-label, .section-desc').forEach(element => {
    gsap.from(element, {
      scrollTrigger: { trigger: element, start: 'top 85%' },
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out'
    });
  });

  gsap.utils.toArray('.cap-card, .leader-card, .policy-card, .ai-feature').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 90%' },
      y: 40,
      opacity: 0,
      duration: 0.6,
      delay: (index % 4) * 0.08,
      ease: 'power2.out'
    });
  });
}

    // ========== AI CHAT LOGIC ==========
    const knowledge = {
      capabilities: "We specialize in Civil Infrastructure & Engineering, Industrial & Specialized Projects (RMHS, crushers, heavy machinery foundations), Technical Consultancy & Design, and full Project Management & Execution including RA bills, JMR auditing and PVC settlements.",
      experience: "Our leadership has collectively managed over ₹3,300 Cr across multi-story residential, commercial plazas, power, steel, chemical, railway and metro projects. CEO: 24+ yrs, COO: 17+ yrs, VP-BD: 22+ yrs, CFO: 17+ yrs.",
      safety: "We maintain a strict Zero-Tolerance safety culture. Daily Toolbox Talks (TBT), mandatory PPE, active hazard identification, continuous HSE training, and a commitment to Zero Harm on every site.",
      quality: "Our Quality Policy focuses on uncompromising technical precision, zero-defect execution, JMR auditing, continuous improvement and full regulatory compliance.",
      contact: "HQ: New Sunrise Apartment, Swami Vivekananda Rd, Noapara, Hatiara, Newtown, Kolkata – 700157. Phone: +91 85284 78830 / +91 93338 83330. Email: info@beplkol.com",
      company: "Bewandert Engineers Private Limited (BEPL) was incorporated on 18 May 2023 (CIN: U71100WB2023PTC262113). We are MSME registered, EPF & ESI compliant, and focused on civil-infra and industrial engineering.",
      default: "I can help with our capabilities, leadership experience, safety (HSE) protocols, quality policy, RA/JMR processes, or contact details. What would you like to explore?"
    };

    function getResponse(msg) {
      const lower = msg.toLowerCase();
      if (lower.includes('capabilit') || lower.includes('service') || lower.includes('what do you') || lower.includes('rmhs') || lower.includes('foundation') || lower.includes('industrial')) return knowledge.capabilities;
      if (lower.includes('experience') || lower.includes('leadership') || lower.includes('ceo') || lower.includes('coo') || lower.includes('track record') || lower.includes('managed')) return knowledge.experience;
      if (lower.includes('safety') || lower.includes('hse') || lower.includes('zero') || lower.includes('ppe') || lower.includes('toolbox')) return knowledge.safety;
      if (lower.includes('quality') || lower.includes('jmr') || lower.includes('defect')) return knowledge.quality;
      if (lower.includes('contact') || lower.includes('address') || lower.includes('phone') || lower.includes('email') || lower.includes('location') || lower.includes('kolkata')) return knowledge.contact;
      if (lower.includes('company') || lower.includes('about') || lower.includes('cin') || lower.includes('msme') || lower.includes('register')) return knowledge.company;
      if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return "Hello! How can I assist you with BEPL’s engineering capabilities or project needs today?";
      return knowledge.default;
    }

    function addMessage(container, text, type) {
      const div = document.createElement('div');
      div.className = `chat-msg ${type}`;
      div.textContent = text;
      container.appendChild(div);
      container.scrollTop = container.scrollHeight;
    }

    // Demo chat (static section)
    document.getElementById('demoSend').addEventListener('click', () => {
      const input = document.getElementById('demoInput');
      const val = input.value.trim();
      if (!val) return;
      const body = document.getElementById('demoChat');
      addMessage(body, val, 'user');
      input.value = '';
      setTimeout(() => addMessage(body, getResponse(val), 'bot'), 600);
    });
    document.getElementById('demoInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') document.getElementById('demoSend').click();
    });

    // Floating AI modal
    const aiFab = document.getElementById('aiFab');
    const aiModal = document.getElementById('aiModal');
    const closeAi = document.getElementById('closeAi');
    const aiChatBody = document.getElementById('aiChatBody');
    const aiInput = document.getElementById('aiInput');
    const aiSend = document.getElementById('aiSend');

    function setAiModalOpen(isOpen) {
      aiModal.classList.toggle('open', isOpen);
      aiModal.setAttribute('aria-hidden', String(!isOpen));
      aiFab.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) aiInput.focus();
    }

    aiFab.addEventListener('click', () => {
      setAiModalOpen(!aiModal.classList.contains('open'));
    });
    closeAi.addEventListener('click', () => {
      setAiModalOpen(false);
      aiFab.focus();
    });

    function handleAiSend() {
      const val = aiInput.value.trim();
      if (!val) return;
      addMessage(aiChatBody, val, 'user');
      aiInput.value = '';
      setTimeout(() => addMessage(aiChatBody, getResponse(val), 'bot'), 700);
    }

    aiSend.addEventListener('click', handleAiSend);
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleAiSend();
    });

// Smooth active nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

window.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (mobileMenu?.classList.contains('open')) {
    setMenuOpen(false);
    menuToggle?.focus();
  }
  if (aiModal?.classList.contains('open')) {
    setAiModalOpen(false);
    aiFab?.focus();
  }
});
