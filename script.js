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

  const heroTextElements = gsap.utils.toArray('.hero-text > *');
  if (heroTextElements.length) {
    gsap.from(heroTextElements, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.2
    });
  }

  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    gsap.from(heroCard, {
      x: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5
    });
  }

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
      capabilities: "BEPL's four service areas are Civil Infrastructure & Engineering (site development, foundations and structural works); Technical Consultancy & Design (engineering evaluation, structural analysis, design optimization, feasibility studies and Quantity Survey); Industrial & Specialized Projects (heavy machinery foundations, mobile crushers, wheel washeries and RMHS yards); and Project Management & Execution. Our focus sectors include power, steel, chemical, railway, road and infrastructure.",
      projectManagement: "End-to-end contract delivery with rigorous financial oversight — Establishing baseline schedules, budgets, and resource allocation. Managing daily site operations, quality standards, and safety protocols. Mitigating risks, resolving variances, and ensuring successful project handover. Contract administration also covers Running Account (RA) bill management, Joint Measurement Record (JMR) auditing and Price Variation Clause (PVC) settlements.",
      safety: "BEPL's HSE policy commits to Zero Harm for employees, subcontractors, surrounding communities and the environment. It covers mandatory PPE, active hazard identification, pre-shift Toolbox Talks (TBT), regulatory compliance, environmental protection, continuing HSE training, incident prevention and continual improvement.",
      quality: "BEPL's Quality Policy covers approved engineering designs and material standards, systematic verification and JMR auditing, customer and stakeholder satisfaction, continuous improvement, workforce training and applicable statutory compliance.",
      ethics: "BEPL's Code of Ethics requires honest conduct, zero tolerance for bribery and corruption, accurate and verifiable financial records, fairness and respect, conflict-of-interest awareness, confidentiality and compliance. The portfolio also describes a whistleblower vigil mechanism and a zero-tolerance commitment to workplace sexual harassment.",
      careers: "For careers enquiries, email your CV and a short note about your experience and preferred area of work to info@beplkol.com or mgsinfo3@gmail.com. Please note that enquiries are not confirmation of a current vacancy.",
      contact: "Head Office: New Sunrise Apartment, Swami Vivekananda Road, Noapara, Hatiara, Newtown, Kolkata – 700157, West Bengal, India. Overseas office: Dubai, UAE. Telephone: +91 85284 78830, +91 93338 83330, +91 98308 32900 or +91 98302 79495. Email: info@beplkol.com or mgsinfo3@gmail.com.",
      company: "Bewandert Engineers Private Limited (BEPL) is a private limited company incorporated on 18 May 2023, registered with ROC Kolkata. CIN: U71100WB2023PTC262113. GSTIN: 19AALCB6214F1ZP. The company portfolio lists MSME (Udyam), EPF and ESI registrations and NIC code 711 for infrastructure, civil engineering and transport logistics.",
      leadership: "Visit the separate Leadership page from the main navigation for portfolio-based leadership information. The supplied portfolio does not include names, photographs or LinkedIn profiles.",
      default: "I can help with BEPL's four service areas, project management approach, the separate Leadership page, careers enquiries, quality or HSE policies, ethics and speak-up policies, company registration, or contact details. What would you like to explore?"
    };

    function getResponse(msg) {
      const lower = msg.toLowerCase();
      if (lower.includes('leadership') || lower.includes('leader') || lower.includes('ceo') || lower.includes('coo') || lower.includes('vp-bd') || lower.includes('cfo') || lower.includes('managed')) return knowledge.leadership;
      if (lower.includes('project management') || lower.includes('project execution') || lower.includes('schedule') || lower.includes('budget') || lower.includes('handover')) return knowledge.projectManagement;
      if (lower.includes('safety') || lower.includes('hse') || lower.includes('zero') || lower.includes('ppe') || lower.includes('toolbox')) return knowledge.safety;
      if (lower.includes('quality') || lower.includes('jmr') || lower.includes('defect')) return knowledge.quality;
      if (lower.includes('career') || lower.includes('job') || lower.includes('cv') || lower.includes('resume')) return knowledge.careers;
      if (lower.includes('ethic') || lower.includes('whistle') || lower.includes('harass') || lower.includes('posh') || lower.includes('complaint') || lower.includes('bribery')) return knowledge.ethics;
      if (lower.includes('contact') || lower.includes('address') || lower.includes('phone') || lower.includes('email') || lower.includes('location') || lower.includes('kolkata') || lower.includes('dubai') || lower.includes('uae')) return knowledge.contact;
      if (lower.includes('company') || lower.includes('about') || lower.includes('cin') || lower.includes('gst') || lower.includes('msme') || lower.includes('epf') || lower.includes('esi') || lower.includes('nic code') || lower.includes('register') || lower.includes('incorporat')) return knowledge.company;
      if (lower.includes('capabilit') || lower.includes('service') || lower.includes('what do you') || lower.includes('experience') || lower.includes('rmhs') || lower.includes('foundation') || lower.includes('industrial') || lower.includes('road') || lower.includes('power') || lower.includes('steel') || lower.includes('chemical') || lower.includes('railway') || lower.includes('infrastructure') || lower.includes('design') || lower.includes('consult') || lower.includes('crusher') || lower.includes('wheel washer') || lower.includes('mechanical')) return knowledge.capabilities;
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
    const demoSend = document.getElementById('demoSend');
    const demoInput = document.getElementById('demoInput');
    if (demoSend && demoInput) {
      demoSend.addEventListener('click', () => {
      const input = demoInput;
      const val = input.value.trim();
      if (!val) return;
      const body = document.getElementById('demoChat');
      addMessage(body, val, 'user');
      input.value = '';
      setTimeout(() => addMessage(body, getResponse(val), 'bot'), 600);
      });
      demoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') demoSend.click();
      });
    }

    // Floating AI modal
    const aiFab = document.getElementById('aiFab');
    const aiModal = document.getElementById('aiModal');
    const closeAi = document.getElementById('closeAi');
    const aiChatBody = document.getElementById('aiChatBody');
    const aiInput = document.getElementById('aiInput');
    const aiSend = document.getElementById('aiSend');

    function setAiModalOpen(isOpen) {
      if (!aiModal || !aiFab) return;
      aiModal.classList.toggle('open', isOpen);
      aiModal.setAttribute('aria-hidden', String(!isOpen));
      aiFab.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) aiInput?.focus();
    }

    aiFab?.addEventListener('click', () => {
      setAiModalOpen(!aiModal?.classList.contains('open'));
    });
    closeAi?.addEventListener('click', () => {
      setAiModalOpen(false);
      aiFab?.focus();
    });

    function handleAiSend() {
      if (!aiInput || !aiChatBody) return;
      const val = aiInput.value.trim();
      if (!val) return;
      addMessage(aiChatBody, val, 'user');
      aiInput.value = '';
      setTimeout(() => addMessage(aiChatBody, getResponse(val), 'bot'), 700);
    }

    aiSend?.addEventListener('click', handleAiSend);
    aiInput?.addEventListener('keydown', (e) => {
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
