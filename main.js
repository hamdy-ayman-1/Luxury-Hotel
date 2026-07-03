/**
 * MAIN.JS - فندق الملاذ
 * الوظائف الأساسية: التنقل، التمرير، النماذج، المعرض، المزيد
 */

(function() {
  'use strict';

  // ============================================
  // 1. LOADING SCREEN
  // ============================================
  const loader = document.getElementById('loader');
  
  window.addEventListener('load', function() {
    setTimeout(function() {
      if (loader) {
        loader.classList.add('hidden');
      }
    }, 800);
  });

  // ============================================
  // 2. NAVBAR
  // ============================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      this.setAttribute('aria-expanded', isOpen);
    });
  }

  // Close mobile menu on link click
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        if (navToggle) {
          navToggle.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', function(e) {
    if (navMenu && navMenu.classList.contains('open')) {
      const isClickInside = navMenu.contains(e.target) || navToggle.contains(e.target);
      if (!isClickInside) {
        navMenu.classList.remove('open');
        if (navToggle) {
          navToggle.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (navbar) {
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    lastScroll = currentScroll;
  });

  // Update active nav link
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('data-page') === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ============================================
  // 3. SCROLL PROGRESS BAR
  // ============================================
  const progressBar = document.getElementById('scroll-progress');
  
  window.addEventListener('scroll', function() {
    if (progressBar) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    }
  });

  // ============================================
  // 4. BACK TO TOP BUTTON
  // ============================================
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (backToTop) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============================================
  // 5. TESTIMONIALS SLIDER
  // ============================================
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slide-prev');
  const nextBtn = document.querySelector('.slide-next');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    if (!slides.length) return;
    
    slides.forEach(function(slide, i) {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startSlideTimer() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetSlideTimer() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
    startSlideTimer();
  }

  if (slides.length > 0) {
    showSlide(0);
    startSlideTimer();

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        prevSlide();
        resetSlideTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        nextSlide();
        resetSlideTimer();
      });
    }

    // Pause on hover
    const sliderContainer = document.querySelector('.testimonial-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', function() {
        if (slideInterval) {
          clearInterval(slideInterval);
        }
      });
      sliderContainer.addEventListener('mouseleave', function() {
        startSlideTimer();
      });
    }
  }

  // ============================================
  // 6. STATS COUNTER
  // ============================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    if (!statNumbers.length) return;
    
    const windowHeight = window.innerHeight;
    const statsSection = document.querySelector('.stats');
    
    if (!statsSection) return;
    
    const sectionTop = statsSection.getBoundingClientRect().top;
    
    if (sectionTop < windowHeight - 100) {
      statsAnimated = true;
      
      statNumbers.forEach(function(stat) {
        const target = parseInt(stat.getAttribute('data-count')) || 0;
        let current = 0;
        const increment = Math.ceil(target / 60);
        const duration = 2000;
        const stepTime = Math.floor(duration / 60);
        
        const timer = setInterval(function() {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = current + (target > 100 ? '+' : '');
        }, stepTime);
      });
    }
  }

  // Run stats animation on scroll
  window.addEventListener('scroll', animateStats);
  // Also run on load
  window.addEventListener('load', function() {
    setTimeout(animateStats, 500);
  });

  // ============================================
  // 7. FAQ ACCORDION
  // ============================================
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(function(question) {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isOpen = answer.classList.contains('open');
      
      // Close all other FAQs
      faqQuestions.forEach(function(q) {
        const ans = q.nextElementSibling;
        if (ans !== answer && ans.classList.contains('open')) {
          ans.classList.remove('open');
          q.classList.remove('active');
          q.setAttribute('aria-expanded', 'false');
        }
      });
      
      if (isOpen) {
        answer.classList.remove('open');
        this.classList.remove('active');
        this.setAttribute('aria-expanded', 'false');
      } else {
        answer.classList.add('open');
        this.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ============================================
  // 8. GALLERY LIGHTBOX
  // ============================================
  const galleryImages = document.querySelectorAll('.gallery-item img');
  
  galleryImages.forEach(function(img) {
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      const src = this.getAttribute('src');
      const alt = this.getAttribute('alt') || 'صورة';
      
      // Create lightbox
      const overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-label', 'معرض الصور');
      
      const closeBtn = document.createElement('button');
      closeBtn.className = 'lightbox-close';
      closeBtn.innerHTML = '✕';
      closeBtn.setAttribute('aria-label', 'إغلاق');
      
      const imgClone = document.createElement('img');
      imgClone.src = src;
      imgClone.alt = alt;
      
      overlay.appendChild(closeBtn);
      overlay.appendChild(imgClone);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
      
      // Force reflow for animation
      void overlay.offsetWidth;
      overlay.classList.add('active');
      
      // Close lightbox
      function closeLightbox() {
        overlay.classList.remove('active');
        setTimeout(function() {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
          document.body.style.overflow = '';
        }, 400);
      }
      
      closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeLightbox();
      });
      
      overlay.addEventListener('click', function(e) {
        if (e.target === this) {
          closeLightbox();
        }
      });
      
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          closeLightbox();
        }
      });
    });
  });

  // ============================================
  // 9. NEWSLETTER FORM
  // ============================================
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = document.getElementById('newsEmail');
      const msgDiv = document.getElementById('newsMsg');
      
      if (!emailInput || !msgDiv) return;
      
      const email = emailInput.value.trim();
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!email) {
        msgDiv.className = 'form-message error';
        msgDiv.textContent = 'الرجاء إدخال البريد الإلكتروني';
        return;
      }
      
      if (!emailRegex.test(email)) {
        msgDiv.className = 'form-message error';
        msgDiv.textContent = 'الرجاء إدخال بريد إلكتروني صحيح';
        return;
      }
      
      // Success
      msgDiv.className = 'form-message success';
      msgDiv.textContent = 'تم الاشتراك بنجاح! شكراً لك.';
      emailInput.value = '';
      
      // Reset after 5 seconds
      setTimeout(function() {
        msgDiv.className = 'form-message';
        msgDiv.textContent = '';
      }, 5000);
    });
  }

  // ============================================
  // 10. CONTACT FORM (if on contact page)
  // ============================================
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('contactName');
      const email = document.getElementById('contactEmail');
      const phone = document.getElementById('contactPhone');
      const subject = document.getElementById('contactSubject');
      const message = document.getElementById('contactMessage');
      const msgDiv = document.getElementById('contactFormMsg');
      
      if (!name || !email || !phone || !subject || !message || !msgDiv) return;
      
      // Remove previous errors
      document.querySelectorAll('.form-group.error').forEach(function(el) {
        el.classList.remove('error');
      });
      
      let isValid = true;
      
      // Validate name
      if (!name.value.trim()) {
        name.closest('.form-group').classList.add('error');
        isValid = false;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        email.closest('.form-group').classList.add('error');
        isValid = false;
      }
      
      // Validate phone
      const phoneRegex = /^[\+\d\s\-]{8,20}$/;
      if (!phone.value.trim() || !phoneRegex.test(phone.value.trim())) {
        phone.closest('.form-group').classList.add('error');
        isValid = false;
      }
      
      // Validate subject
      if (!subject.value.trim()) {
        subject.closest('.form-group').classList.add('error');
        isValid = false;
      }
      
      // Validate message
      if (!message.value.trim() || message.value.trim().length < 10) {
        message.closest('.form-group').classList.add('error');
        isValid = false;
      }
      
      if (!isValid) {
        msgDiv.className = 'form-message error';
        msgDiv.textContent = 'الرجاء تصحيح الأخطاء في النموذج';
        return;
      }
      
      // Success - show message
      msgDiv.className = 'form-message success';
      msgDiv.textContent = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
      
      // Reset form
      contactForm.reset();
      
      // Reset after 5 seconds
      setTimeout(function() {
        msgDiv.className = 'form-message';
        msgDiv.textContent = '';
      }, 5000);
    });
  }

  // ============================================
  // 11. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // 12. ACTIVE NAV LINK ON PAGE LOAD
  // ============================================
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageMap = {
      'index.html': 'home',
      'about.html': 'about',
      'contact.html': 'contact',
      'booking.html': 'booking'
    };
    
    const pageKey = pageMap[currentPage] || 'home';
    
    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === pageKey) {
        link.classList.add('active');
      }
    });
  }
  
  setActiveNavLink();

  // ============================================
  // 13. KEYBOARD NAVIGATION
  // ============================================
  document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      if (navToggle) {
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // ============================================
  // 14. INTERSECTION OBSERVER FOR ANIMATIONS
  // ============================================
  // This is a fallback for browsers that don't support GSAP
  if ('IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll(
      '.fade-in, .fade-in-left, .fade-in-right, .zoom-in, .slide-up, .slide-down'
    );
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('entered');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ============================================
  // 15. CONSOLE WELCOME
  // ============================================
  console.log('%c🏨 فندق الملاذ', 'font-size: 24px; font-weight: bold; color: #c9a84c;');
  console.log('%cفخامة لا تضاهى في قلب المدينة', 'font-size: 14px; color: #b8b0a8;');
  console.log('%c✨ تم تطوير الموقع بأحدث التقنيات', 'font-size: 12px; color: #888;');

})();