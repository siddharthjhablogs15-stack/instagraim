
/* ============================================
   INSTAGRAIM.IN — Visual Web Stories Platform
   script.js — Complete JavaScript
   ============================================ */

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function () {

  // ===== MOBILE MENU TOGGLE =====
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav when a link is clicked
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }


  // ===== HEADER SCROLL EFFECT =====
  const header = document.getElementById('header');

  window.addEventListener('scroll', function () {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });


  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // ===== SCROLL FADE-IN ANIMATIONS =====
  const fadeElements = document.querySelectorAll(
    '.story-card, .about-card, .contact-card, .legal-block, .mission-block, .category-header'
  );

  // Add fade-in class to elements
  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  // Intersection Observer for fade-in
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(function (el) {
    fadeObserver.observe(el);
  });


  // ===== ACTIVE NAV LINK HIGHLIGHT =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function () {
    var currentSection = '';
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  });


  // ===== STORY CARD HOVER TILT EFFECT =====
  const storyCards = document.querySelectorAll('.story-card');

  storyCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = (y - centerY) / 20;
      var rotateY = (centerX - x) / 20;

      card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });


  // ===== TYPING EFFECT FOR HERO (Optional Enhancement) =====
  var heroTag = document.querySelector('.hero-tag');
  if (heroTag) {
    var originalText = heroTag.textContent;
    heroTag.textContent = '';
    heroTag.style.visibility = 'visible';

    var charIndex = 0;
    function typeText() {
      if (charIndex < originalText.length) {
        heroTag.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 50);
      }
    }

    // Start typing after a short delay
    setTimeout(typeText, 500);
  }


  // ===== COUNTER ANIMATION FOR HERO STATS =====
  var statNums = document.querySelectorAll('.stat-num');
  var statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;

    var heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    var rect = heroSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      statsAnimated = true;
      // Stats are text-based (5+, 24/7, 100%), so we just add a pop effect
      statNums.forEach(function (stat, index) {
        setTimeout(function () {
          stat.style.transform = 'scale(1.2)';
          stat.style.transition = 'transform 0.3s ease';
          setTimeout(function () {
            stat.style.transform = 'scale(1)';
          }, 200);
        }, index * 200);
      });
    }
  }

  window.addEventListener('scroll', animateStats);
  animateStats(); // Check on load


  // ===== KEYBOARD ACCESSIBILITY =====
  document.addEventListener('keydown', function (e) {
    // ESC to close mobile menu
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

});


