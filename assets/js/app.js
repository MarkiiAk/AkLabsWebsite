// =====================================================
// AK Labs v2.0 — Premium JavaScript Framework
// Micro-interactions, animations & modern UX
// =====================================================

// === UTILITIES & HELPERS ===
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const lerp = (start, end, factor) => start * (1 - factor) + end * factor;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// === GLOBAL STATE ===
const AppState = {
  isLoaded: false,
  currentTheme: localStorage.getItem('theme') || 'dark',
  isMenuOpen: false,
  scrollY: 0,
  mouseX: 0,
  mouseY: 0,
  cursorVisible: true
};

// === PRELOADER ===
class Preloader {
  constructor() {
    this.element = $('.preloader');
    this.init();
  }

  init() {
    // Simular carga de recursos críticos
    this.loadResources().then(() => {
      this.hide();
    });
  }

  async loadResources() {
    // Simular carga de recursos críticos
    const loadPromises = [
      this.loadFonts(),
      this.loadCriticalImages(),
      sleep(1000) // Mínimo tiempo de carga para UX
    ];

    await Promise.all(loadPromises);
  }

  loadFonts() {
    return new Promise((resolve) => {
      if (document.fonts) {
        document.fonts.ready.then(resolve);
      } else {
        setTimeout(resolve, 500);
      }
    });
  }

  loadCriticalImages() {
    const criticalImages = ['assets/img/hero-bg.png', 'assets/img/logo.svg'];
    const promises = criticalImages.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Continue even if image fails
        img.src = src;
      });
    });
    return Promise.all(promises);
  }

  hide() {
    this.element.classList.add('hidden');
    document.body.classList.remove('loading');
    AppState.isLoaded = true;
    
    // Trigger loaded event for other components
    document.dispatchEvent(new CustomEvent('app:loaded'));
  }
}

// === CUSTOM CURSOR ===
class CustomCursor {
  constructor() {
    this.cursor = $('.cursor');
    this.dot = $('.cursor__dot');
    this.circle = $('.cursor__circle');
    this.isVisible = false;
    
    this.init();
  }

  init() {
    // Only enable on desktop devices
    if (window.matchMedia('(pointer: fine)').matches) {
      this.bindEvents();
      this.startAnimation();
    }
  }

  bindEvents() {
    document.addEventListener('mousemove', (e) => {
      AppState.mouseX = e.clientX;
      AppState.mouseY = e.clientY;
      
      if (!this.isVisible) {
        this.show();
      }
    });

    document.addEventListener('mouseenter', () => this.show());
    document.addEventListener('mouseleave', () => this.hide());

    // Hover effects on interactive elements
    const interactiveElements = 'a, button, .btn, [role="button"], input, textarea, select';
    $$(interactiveElements).forEach(el => {
      el.addEventListener('mouseenter', () => this.setHovered(true));
      el.addEventListener('mouseleave', () => this.setHovered(false));
    });
  }

  startAnimation() {
    const animate = () => {
      if (this.isVisible) {
        this.cursor.style.transform = `translate3d(${AppState.mouseX}px, ${AppState.mouseY}px, 0)`;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }

  show() {
    this.isVisible = true;
    this.cursor.style.opacity = '1';
  }

  hide() {
    this.isVisible = false;
    this.cursor.style.opacity = '0';
  }

  setHovered(hovered) {
    this.circle.style.transform = hovered 
      ? 'translate(-50%, -50%) scale(1.5)' 
      : 'translate(-50%, -50%) scale(0)';
  }
}

// === SCROLL PROGRESS ===
class ScrollProgress {
  constructor() {
    this.bar = $('.scroll-progress__bar');
    this.init();
  }

  init() {
    window.addEventListener('scroll', debounce(() => {
      this.updateProgress();
    }, 10));
  }

  updateProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    this.bar.style.width = `${Math.min(scrollPercent, 100)}%`;
    AppState.scrollY = scrollTop;
  }
}

// === NAVIGATION ===
class Navigation {
  constructor() {
    this.nav = $('.nav');
    this.toggle = $('.nav__toggle');
    this.menu = $('.nav__menu');
    this.backdrop = $('.nav__backdrop');
    this.links = $$('.nav__link');
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.initSmoothScroll();
  }

  bindEvents() {
    // Mobile menu toggle
    this.toggle.addEventListener('click', () => {
      this.toggleMenu();
    });

    // Backdrop click to close
    this.backdrop.addEventListener('click', () => {
      this.closeMenu();
    });

    // Close menu on link click (mobile)
    this.links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          this.closeMenu();
        }
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && AppState.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Scroll behavior for nav
    window.addEventListener('scroll', debounce(() => {
      this.updateScrollState();
    }, 10));
  }

  toggleMenu() {
    AppState.isMenuOpen = !AppState.isMenuOpen;
    this.updateMenuState();
  }

  closeMenu() {
    AppState.isMenuOpen = false;
    this.updateMenuState();
  }

  updateMenuState() {
    this.toggle.setAttribute('aria-expanded', AppState.isMenuOpen);
    this.menu.style.display = AppState.isMenuOpen ? 'block' : 'none';
    this.backdrop.classList.toggle('active', AppState.isMenuOpen);
    document.body.style.overflow = AppState.isMenuOpen ? 'hidden' : '';
  }

  updateScrollState() {
    const scrolled = window.pageYOffset > 100;
    this.nav.style.background = scrolled 
      ? 'rgba(11, 13, 17, 0.95)' 
      : 'rgba(11, 13, 17, 0.8)';
  }

  initSmoothScroll() {
    this.links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = $(href);
          if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        });
      }
    });
  }
}

// === THEME TOGGLE ===
class ThemeToggle {
  constructor() {
    this.toggle = $('[data-theme-toggle]');
    this.init();
  }

  init() {
    this.applyTheme(AppState.currentTheme);
    
    this.toggle.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  toggleTheme() {
    AppState.currentTheme = AppState.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(AppState.currentTheme);
    localStorage.setItem('theme', AppState.currentTheme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

// === MAGNETIC BUTTONS ===
class MagneticButtons {
  constructor() {
    this.buttons = $$('.btn--magnetic');
    this.init();
  }

  init() {
    this.buttons.forEach(button => {
      this.initMagneticEffect(button);
    });
  }

  initMagneticEffect(button) {
    let isHovering = false;
    
    button.addEventListener('mouseenter', () => {
      isHovering = true;
    });

    button.addEventListener('mouseleave', () => {
      isHovering = false;
      button.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });

    button.addEventListener('mousemove', (e) => {
      if (!isHovering) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * -10;
      const rotateY = (x / rect.width) * 10;

      button.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }
}

// === COUNTER ANIMATION ===
class CounterAnimation {
  constructor() {
    this.counters = $$('[data-counter]');
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        { threshold: 0.5 }
      );

      this.counters.forEach(counter => {
        this.observer.observe(counter);
      });
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.animateCounter(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.floor(easeProgress * target);
      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}

// === PORTFOLIO FILTERS ===
class PortfolioFilters {
  constructor() {
    this.filters = $$('.filter-btn');
    this.items = $$('.portfolio-item');
    this.currentFilter = 'all';
    
    this.init();
  }

  init() {
    this.filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const filterValue = filter.getAttribute('data-filter');
        this.setActiveFilter(filter);
        this.filterItems(filterValue);
      });
    });
  }

  setActiveFilter(activeFilter) {
    this.filters.forEach(filter => {
      filter.classList.remove('filter-btn--active');
    });
    activeFilter.classList.add('filter-btn--active');
  }

  filterItems(filter) {
    this.items.forEach(item => {
      const categories = item.getAttribute('data-category').split(' ');
      const shouldShow = filter === 'all' || categories.includes(filter);
      
      if (shouldShow) {
        item.style.display = 'block';
        item.style.animation = 'fadeInUp 0.6s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  }
}

// === PRICING TOGGLE ===
class PricingToggle {
  constructor() {
    this.toggle = $('[data-pricing-toggle]');
    this.amounts = $$('[data-price-project]');
    this.periods = $$('[data-period-project]');
    this.isMonthly = false;
    
    this.init();
  }

  init() {
    if (this.toggle) {
      this.toggle.addEventListener('click', () => {
        this.togglePricing();
      });
    }
  }

  togglePricing() {
    this.isMonthly = !this.isMonthly;
    this.toggle.classList.toggle('active', this.isMonthly);
    
    this.amounts.forEach(amount => {
      const projectPrice = amount.getAttribute('data-price-project');
      const maintenancePrice = amount.getAttribute('data-price-maintenance');
      
      amount.textContent = this.isMonthly ? maintenancePrice : projectPrice;
    });

    this.periods.forEach(period => {
      const projectPeriod = period.getAttribute('data-period-project');
      const maintenancePeriod = period.getAttribute('data-period-maintenance');
      
      period.textContent = this.isMonthly ? maintenancePeriod : projectPeriod;
    });
  }
}

// === CONTACT FORM ===
class ContactForm {
  constructor() {
    this.form = $('#contactForm');
    this.submitButton = $('.btn--submit');
    this.successMessage = $('[data-success-message]');
    
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        this.handleSubmit(e);
      });

      // Real-time validation
      const inputs = this.form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }

    this.setLoading(true);

    try {
      const formData = new FormData(this.form);
      
      // Simulate form submission - replace with actual endpoint
      await this.submitForm(formData);
      
      this.showSuccess();
      this.form.reset();
      
    } catch (error) {
      this.showError('Error al enviar el mensaje. Por favor, intenta nuevamente.');
    } finally {
      this.setLoading(false);
    }
  }

  async submitForm(formData) {
    // Simulate API call
    await sleep(1500);
    
    // For demo purposes, always succeed
    // In production, replace with actual form submission
    return { success: true };
  }

  validateForm() {
    let isValid = true;
    const requiredFields = this.form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    const errorElement = $(`[data-error="${fieldName}"]`);
    
    let isValid = true;
    let errorMessage = '';

    // Required validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Este campo es requerido';
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Por favor, ingresa un email válido';
      }
    }

    // Checkbox validation
    if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
      isValid = false;
      errorMessage = 'Debes aceptar la política de privacidad';
    }

    // Update UI
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = errorMessage ? 'block' : 'none';
    }

    field.style.borderColor = isValid ? '' : 'var(--coral-red)';

    return isValid;
  }

  setLoading(loading) {
    this.submitButton.classList.toggle('loading', loading);
    this.submitButton.disabled = loading;
  }

  showSuccess() {
    this.successMessage.classList.add('show');
    setTimeout(() => {
      this.successMessage.classList.remove('show');
    }, 5000);
  }

  showError(message) {
    // Simple alert for now - could be replaced with a toast notification
    alert(message);
  }
}

// === BACK TO TOP ===
class BackToTop {
  constructor() {
    this.button = $('#backToTop');
    this.init();
  }

  init() {
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', debounce(() => {
      this.updateVisibility();
    }, 100));
  }

  updateVisibility() {
    const shouldShow = window.pageYOffset > 500;
    this.button.classList.toggle('show', shouldShow);
  }
}

// === PARALLAX EFFECTS ===
class ParallaxEffects {
  constructor() {
    this.elements = $$('[data-parallax]');
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;

    window.addEventListener('scroll', debounce(() => {
      this.updateParallax();
    }, 10));
  }

  updateParallax() {
    const scrollTop = window.pageYOffset;

    this.elements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
      const yPos = scrollTop * speed;
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }
}

// === REVEAL ANIMATIONS ===
class RevealAnimations {
  constructor() {
    this.elements = $$('[data-reveal]');
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        { 
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      this.elements.forEach(element => {
        this.observer.observe(element);
      });
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-reveal-delay') || 0;
        
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);

        this.observer.unobserve(entry.target);
      }
    });
  }
}

// === PERFORMANCE MONITOR ===
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    // Monitor performance metrics
    if ('performance' in window) {
      window.addEventListener('load', () => {
        this.logPerformanceMetrics();
      });
    }
  }

  logPerformanceMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    const metrics = {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
      loadComplete: navigation.loadEventEnd - navigation.navigationStart,
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
    };

    // Only log in development
    if (window.location.hostname === 'localhost') {
      console.group('🚀 AK Labs Performance Metrics');
      console.log('DOM Content Loaded:', `${metrics.domContentLoaded.toFixed(2)}ms`);
      console.log('Load Complete:', `${metrics.loadComplete.toFixed(2)}ms`);
      console.log('First Paint:', `${metrics.firstPaint.toFixed(2)}ms`);
      console.log('First Contentful Paint:', `${metrics.firstContentfulPaint.toFixed(2)}ms`);
      console.groupEnd();
    }
  }
}

// === EASTER EGGS ===
class EasterEggs {
  constructor() {
    this.konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    this.input = [];
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      this.input.push(e.keyCode);
      
      if (this.input.length > this.konami.length) {
        this.input.shift();
      }
      
      if (this.input.join(',') === this.konami.join(',')) {
        this.activateKonami();
      }
    });

    // Console message
    if (window.location.hostname !== 'localhost') {
      console.log(
        '%c¡Hola Developer! 👋\n%c¿Te gustó el código? ¡Contáctanos!\n%chttps://aklabs.com.mx',
        'color: #FF6B35; font-size: 20px; font-weight: bold;',
        'color: #6B7280; font-size: 14px;',
        'color: #FFD23F; font-size: 14px; font-weight: bold;'
      );
    }
  }

  activateKonami() {
    document.body.style.animation = 'rainbow 0.5s ease-in-out infinite alternate';
    
    setTimeout(() => {
      document.body.style.animation = '';
    }, 3000);

    // Add rainbow animation to CSS if not exists
    if (!$('#rainbow-style')) {
      const style = document.createElement('style');
      style.id = 'rainbow-style';
      style.textContent = `
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// === MAIN APP INITIALIZATION ===
class AkLabsApp {
  constructor() {
    this.components = [];
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    // Initialize all components
    this.components = [
      new Preloader(),
      new CustomCursor(),
      new ScrollProgress(),
      new Navigation(),
      new ThemeToggle(),
      new MagneticButtons(),
      new CounterAnimation(),
      new PortfolioFilters(),
      new PricingToggle(),
      new ContactForm(),
      new BackToTop(),
      new ParallaxEffects(),
      new RevealAnimations(),
      new PerformanceMonitor(),
      new EasterEggs()
    ];

    // Initialize year in footer
    const yearElement = $('#currentYear');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    // App loaded event
    document.addEventListener('app:loaded', () => {
      console.log('🎉 AK Labs App Loaded Successfully!');
    });
  }

  // Utility method to reinitialize components after dynamic content changes
  reinitialize() {
    this.components.forEach(component => {
      if (typeof component.reinit === 'function') {
        component.reinit();
      }
    });
  }
}

// === INITIALIZE APP ===
const app = new AkLabsApp();

// === EXPOSE APP TO GLOBAL SCOPE FOR DEBUGGING ===
if (window.location.hostname === 'localhost') {
  window.AkLabsApp = app;
  window.AppState = AppState;
}

// === SERVICE WORKER REGISTRATION ===
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}