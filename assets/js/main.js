/**
* Template Name: Strategy
* Template URL: https://bootstrapmade.com/strategy-bootstrap-agency-template/
* Updated: Jun 06 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/




*/


  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const img = card.getAttribute('data-img');
      const desc = card.getAttribute('data-desc');

      document.getElementById('modalBlogTitle').textContent = title;
      document.getElementById('modalBlogImage').src = img;
      document.getElementById('modalBlogDesc').textContent = desc;

      const modal = new bootstrap.Modal(document.getElementById('blogModal'));
      modal.show();
    });
  });


  const swiper = new Swiper('.blogSwiper', {
  slidesPerView: 2.5, // default for all screen sizes
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 1, // mobile view: full card
    },
    768: {
      slidesPerView: 2, // tablet view: 2 cards
    },
    992: {
      slidesPerView: 2.5 // desktop view: 2 full + 1 half
    }
  }
});


(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });


  

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();



 AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    
    // Enhanced hover effects with GSAP
    document.querySelectorAll('.client-logo').forEach(logo => {
      logo.addEventListener('mouseenter', () => {
        gsap.to(logo, {
          duration: 0.3,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          ease: 'power2.out'
        });
      });
      
      logo.addEventListener('mouseleave', () => {
        gsap.to(logo, {
          duration: 0.3,
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          ease: 'power2.out'
        });
      });
    });
    
    // Parallax effect for floating shapes
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      const shape1 = document.querySelector('.shape-1');
      const shape2 = document.querySelector('.shape-2');
      
      gsap.to(shape1, {
        y: scrollPosition * 0.2,
        rotation: scrollPosition * 0.05,
        ease: 'none'
      });
      
      gsap.to(shape2, {
        y: scrollPosition * 0.3,
        rotation: -scrollPosition * 0.03,
        ease: 'none'
      });
    });




    gsap.registerPlugin(ScrollTrigger);

const revealSection = document.getElementById("reveal-section");
const textLines = gsap.utils.toArray(".reveal-line span");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: revealSection,
    start: "top top",
    end: "+=3000",
    pin: true,
    scrub: 0.5,
    markers: false,
    onLeave: () => {
      gsap.to(revealSection, { opacity: 0.5, duration: 0.5 });
    },
    onEnterBack: () => {
      gsap.to(revealSection, { opacity: 1, duration: 0.5 });
    }
  }
});

textLines.forEach((line, i) => {
  tl.to(line, {
    backgroundSize: "100% 100%",
    color: "transparent",
    duration: 1.5,
    ease: "power2.inOut"
  }, i * 0.3);
});

// Floating bubble parallax effect
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  const bubble1 = document.querySelector('.bubble-purple');
  const bubble2 = document.querySelector('.bubble-blue');

  gsap.to(bubble1, {
    y: scrollY * 0.2,
    rotation: scrollY * 0.05,
    ease: "none"
  });

  gsap.to(bubble2, {
    y: scrollY * 0.3,
    rotation: -scrollY * 0.03,
    ease: "none"
  });
});

    
    // Dynamic logo slider speed based on mouse position
    const logoSlider = document.querySelector('.logo-slider-container');
    const primaryTrack = document.querySelector('.logo-slider-track.primary');
    const secondaryTrack = document.querySelector('.logo-slider-track.secondary');
    
    logoSlider.addEventListener('mousemove', (e) => {
      const rect = logoSlider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const speed = (x / width) * 2 + 0.5; // Speed between 0.5x and 2.5x
      
      primaryTrack.style.animationDuration = `${30 / speed}s`;
      secondaryTrack.style.animationDuration = `${30 / speed}s`;
    });
    
    logoSlider.addEventListener('mouseleave', () => {
      primaryTrack.style.animationDuration = '30s';
      secondaryTrack.style.animationDuration = '30s';
    });