    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Instant Native Scroll for Anchor Links (No Lag, Natural Browser Momentum) ──
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // ── Comprehensive Premium Section Reveal System (Emil Kowalski / Apple-grade GPU) ──
    (function initSectionReveals() {
      if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

      // 1. Upward fade headings & key structural containers
      const fadeUpElements = document.querySelectorAll(
        '.s2-title, .community-heading, .method-heading, .transform-heading, .right-col, .fclock-head, .cmp-h, .accordion-title'
      );
      fadeUpElements.forEach(el => el.classList.add('scroll-reveal'));

      // 2. Scale-up hero & key visual centerpieces
      const scaleElements = document.querySelectorAll('.planner-mockup-img, .cmp-box, .showcase-container');
      scaleElements.forEach(el => el.classList.add('scroll-reveal-scale'));

      // 3. Staggered Left & Right Features (Section 2 - 90-day planner)
      const leftItems = document.querySelectorAll('.s2-left .feature-item');
      leftItems.forEach((item, idx) => {
        item.classList.add('scroll-reveal-left');
        item.style.transitionDelay = `${idx * 80}ms`;
      });

      const rightItems = document.querySelectorAll('.s2-right .feature-item');
      rightItems.forEach((item, idx) => {
        item.classList.add('scroll-reveal-right');
        item.style.transitionDelay = `${idx * 80}ms`;
      });

      // 4. Staggered FAQ items
      const faqItems = document.querySelectorAll('.accordion-card');
      faqItems.forEach((item, idx) => {
        item.classList.add('stagger-item');
        item.style.transitionDelay = `${idx * 60}ms`;
      });

      // 5. Comparison table rows cascade
      const cmpRows = document.querySelectorAll('.cmp-t tbody tr');
      cmpRows.forEach((row, idx) => {
        row.classList.add('stagger-item');
        row.style.transitionDelay = `${idx * 50}ms`;
      });

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px 20px 0px'
      });

      fadeUpElements.forEach(el => observer.observe(el));
      scaleElements.forEach(el => observer.observe(el));
      leftItems.forEach(el => observer.observe(el));
      rightItems.forEach(el => observer.observe(el));
      faqItems.forEach(el => observer.observe(el));
      cmpRows.forEach(el => observer.observe(el));
    })();

    // ── Interactive Spring Physics Mouse Parallax on Hero Card (Emil Kowalski / Linear style) ──
    (function initHeroSpringParallax() {
      if (prefersReducedMotion || window.innerWidth < 1024) return;
      const heroCard = document.querySelector('.hero-left');
      const bgText = document.querySelector('.bg-text');
      if (!heroCard) return;

      let targetX = 0, targetY = 0;
      let currentX = 0, currentY = 0;
      let rafId = null;

      function updatePhysics() {
        // Damped spring interpolation (stiffness ~0.08)
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        const tiltX = -currentY * 6;
        const tiltY = currentX * 6;
        const transY = -currentY * 3;

        heroCard.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(${transY.toFixed(2)}px)`;
        if (bgText) {
          bgText.style.transform = `translateX(${(currentX * -14).toFixed(2)}px)`;
        }

        if (Math.abs(targetX - currentX) > 0.0005 || Math.abs(targetY - currentY) > 0.0005) {
          rafId = requestAnimationFrame(updatePhysics);
        } else {
          rafId = null;
        }
      }

      window.addEventListener('mousemove', (e) => {
        if (window.scrollY > window.innerHeight) return;
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        targetX = Math.max(-0.5, Math.min(0.5, x));
        targetY = Math.max(-0.5, Math.min(0.5, y));
        if (!rafId) rafId = requestAnimationFrame(updatePhysics);
      }, { passive: true });

      window.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
        if (!rafId) rafId = requestAnimationFrame(updatePhysics);
      }, { passive: true });
    })();

    // Testimonial logic (vanilla port of StaggerTestimonials with persistent DOM elements for smooth Apple-style transitions)
    const fitnessTestimonials = [
      {
        tempId: 0,
        testimonial: "Most fitness software feels overly complex and bloated. Giving my clients these clean printables gives them absolute clarity without the app friction. Best $97 I've spent on my coaching business.",
        by: "Sarah Miller, Certified Personal Trainer",
        imgSrc: "assets/images/testimonials/avatar-0.webp"
      },
      {
        tempId: 1,
        testimonial: "My clients' compliance and results have never been better. Best investment I've made in my business!",
        by: "Ashley Davis, Group Fitness Instructor",
        imgSrc: "assets/images/testimonials/avatar-1.webp"
      },
      {
        tempId: 2,
        testimonial: "The weekly check-in printable framework alone completely solved my client drop-off issue around week 4. An essential toolkit for any serious trainer.",
        by: "Michael Johnson, Strength & Conditioning Coach",
        imgSrc: "assets/images/testimonials/avatar-2.webp"
      },
      {
        tempId: 3,
        testimonial: "My clients' compliance and results have never been better. They love filling out the physical daily habit logs rather than typing numbers into a cold spreadsheet.",
        by: "Jessica Williams, Holistic Nutritionist & Wellness Coach",
        imgSrc: "assets/images/testimonials/avatar-3.webp"
      },
      {
        tempId: 4,
        testimonial: "The workout architecture and macro blueprints save me at least 5 hours every single week on administrative programming.",
        by: "David Brown, Athletic Performance Coach",
        imgSrc: "assets/images/testimonials/avatar-4.webp"
      },
      {
        tempId: 5,
        testimonial: "Having full commercial and white-label rights means I can print and brand this as my own proprietary system. My clients think I spent thousands developing custom software!",
        by: "Emily Taylor, Pilates & Mobility Specialist",
        imgSrc: "assets/images/testimonials/avatar-5.webp"
      },
      {
        tempId: 6,
        testimonial: "Clean, minimal, and straight to the point. If you want your clients to stay consistent for 90 days straight using physical sheets, you need this system in your arsenal.",
        by: "Chris Anderson, Online Fitness Coach",
        imgSrc: "assets/images/testimonials/avatar-6.webp"
      }
    ];

    let activeIndex = 0;
    let isMobile = window.innerWidth < 640;
    let cardW = isMobile ? Math.min(280, Math.floor(window.innerWidth * 0.72)) : 365;
    let cardH = isMobile ? 340 : 365;
    const container = document.getElementById('testimonials-container');
    const cardElements = [];

    // shortcut: statically mounted card elements with index offsets, upgrade to virtual list if items exceed 30
    if (container) {
      container.innerHTML = '';
      fitnessTestimonials.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.style.width = `${cardW}px`;
        card.style.height = `${cardH}px`;
        card.innerHTML = `
          <img src="${item.imgSrc}" alt="${item.by.split(',')[0]}" class="test-avatar" width="50" height="50">
          <h3 class="test-quote">"${item.testimonial}"</h3>
          <p class="test-by">- ${item.by}</p>
        `;
        card.addEventListener('click', () => {
          const total = fitnessTestimonials.length;
          let diff = index - activeIndex;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;
          if (diff !== 0) handleMove(diff);
        });
        container.appendChild(card);
        cardElements.push(card);
      });
      updateTestimonialPositions();
    }

    function updateTestimonialPositions() {
      const total = fitnessTestimonials.length;
      const isMob = window.innerWidth < 640;
      // High-end spacing: immediate neighbors sit cleanly beside center card without text overlap
      const offsetMultiplier = isMob ? (cardW * 0.72) : (cardW * 0.92);

      cardElements.forEach((card, index) => {
        // Calculate circular offset relative to activeIndex
        let pos = index - activeIndex;
        while (pos > total / 2) pos -= total;
        while (pos < -total / 2) pos += total;

        const isCenter = pos === 0;
        const absPos = Math.abs(pos);

        card.className = `testimonial-card ${isCenter ? 'card-center' : 'card-side'}`;
        card.style.width = `${cardW}px`;
        card.style.height = `${cardH}px`;

        const translateX = offsetMultiplier * pos;
        // Clean concave arc: subtle 3D depth
        const translateY = isCenter ? 0 : (absPos * (isMob ? 10 : 14));
        const translateZ = isCenter ? 30 : -absPos * (isMob ? 30 : 36);
        const rotateY = pos * (isMob ? -6 : -7);
        const scale = isCenter ? 1 : Math.max(isMob ? 0.88 : 0.86, 1 - absPos * 0.12);

        card.style.transform = `translate3d(-50%, -50%, 0) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.zIndex = isCenter ? 10 : (10 - absPos);

        // Hide distant cards (absPos > 1) so their text doesn't overlap into a messy jumble
        if (absPos > 1) {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
        } else if (isCenter) {
          card.style.opacity = '1';
          card.style.pointerEvents = 'auto';
        } else {
          card.style.opacity = isMob ? '0.4' : '0.6';
          card.style.pointerEvents = 'auto';
        }
      });
    }

    function handleMove(steps) {
      const total = fitnessTestimonials.length;
      activeIndex = (activeIndex + steps + total * 100) % total;
      updateTestimonialPositions();
    }

    document.getElementById('btn-prev-test')?.addEventListener('click', () => handleMove(-1));
    document.getElementById('btn-next-test')?.addEventListener('click', () => handleMove(1));

    // Touch / Swipe Gestures on Testimonials
    (function initTestimonialsSwipe() {
      if (!container) return;
      let startX = 0;
      let startY = 0;
      let isSwiping = false;

      container.addEventListener('touchstart', e => {
        if (!e.touches || !e.touches[0]) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = true;
      }, { passive: true });

      container.addEventListener('touchend', e => {
        if (!isSwiping || !e.changedTouches || !e.changedTouches[0]) return;
        isSwiping = false;
        const diffX = e.changedTouches[0].clientX - startX;
        const diffY = e.changedTouches[0].clientY - startY;
        // Check if horizontal intent dominates
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
          handleMove(diffX > 0 ? -1 : 1);
        }
      }, { passive: true });
    })();

    window.addEventListener('resize', () => {
      const isMob = window.innerWidth < 640;
      const newW = isMob ? Math.min(280, Math.floor(window.innerWidth * 0.72)) : 365;
      const newH = isMob ? 340 : 365;
      if (newW !== cardW || newH !== cardH) {
        cardW = newW;
        cardH = newH;
        updateTestimonialPositions();
      }
    });

    // S4
    // (Consolidated into unified inView block above)

    // Dots
    document.querySelectorAll('.dot').forEach(d => {
      d.addEventListener('click', () => {
        document.querySelectorAll('.dot').forEach(x => x.classList.remove('active'));
        d.classList.add('active');
      });
    });

    // Accordion
    document.querySelectorAll('.accordion-header').forEach(h => {
      const card = h.closest('.accordion-card');
      const body = card?.querySelector('.accordion-body');
      if (body && !body.classList.contains('hidden')) {
        card.classList.add('is-open');
      }

      h.addEventListener('click', () => {
        const isOpen = card.classList.contains('is-open');

        // Close all cards smoothly
        document.querySelectorAll('.accordion-card').forEach(c => {
          c.classList.remove('is-open');
          c.querySelector('.accordion-body')?.classList.add('hidden');
          const icon = c.querySelector('.accordion-icon');
          if (icon) {
            icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><line x1="12" y1="5" x2="12" y2="19"/></svg>`;
          }
        });

        // Toggle clicked card
        if (!isOpen && body) {
          card.classList.add('is-open');
          body.classList.remove('hidden');
          card.querySelector('.accordion-icon').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#de2b70" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
        }
      });
    });

    // Showcase Slider Logic
    let currentShowcaseIndex = 0;
    const showcaseSlides = document.getElementById('showcase-slides');
    const showcaseIndicators = document.querySelectorAll('.showcase-indicator');
    const totalShowcaseSlides = 6;
    let showcaseAutoPlayInterval;

    function updateShowcaseSlider(index) {
      if (!showcaseSlides) return;
      currentShowcaseIndex = (index + totalShowcaseSlides) % totalShowcaseSlides;
      showcaseSlides.style.transform = `translateX(-${currentShowcaseIndex * 16.6667}%)`;
      
      showcaseIndicators.forEach((ind, idx) => {
        if (idx === currentShowcaseIndex) {
          ind.classList.add('active');
          ind.style.width = '24px';
          ind.style.borderRadius = '9999px';
          ind.style.background = '#de2b70';
        } else {
          ind.classList.remove('active');
          ind.style.width = '8px';
          ind.style.borderRadius = '50%';
          ind.style.background = 'rgba(255,255,255,0.6)';
        }
      });
      resetShowcaseAutoPlay();
    }

    function startShowcaseAutoPlay() {
      showcaseAutoPlayInterval = setInterval(() => {
        updateShowcaseSlider(currentShowcaseIndex + 1);
      }, 4000);
    }

    function resetShowcaseAutoPlay() {
      if (showcaseAutoPlayInterval) {
        clearInterval(showcaseAutoPlayInterval);
      }
      startShowcaseAutoPlay();
    }

    // Lightbox modal logic (Apple-style smooth spring-like entrance & navigation)
    const lightboxModal = document.createElement('div');
    lightboxModal.id = 'lightbox-modal-container';
    lightboxModal.innerHTML = `
      <button id="lightbox-prev" class="lightbox-nav-btn" aria-label="Previous image">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="lightbox-content-wrapper">
        <img id="lightbox-img" src="" alt="Detail View">
        <div id="lightbox-counter" class="lightbox-counter">1 / 6</div>
      </div>
      <button id="lightbox-next" class="lightbox-nav-btn" aria-label="Next image">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
      <button id="lightbox-close" class="lightbox-close-btn" aria-label="Close modal">&times;</button>
    `;
    document.body.appendChild(lightboxModal);

    const lightboxImgSources = [
      'assets/images/slide-0.webp',
      'assets/images/slide-1.webp',
      'assets/images/slide-2.webp',
      'assets/images/slide-3.webp',
      'assets/images/slide-4.webp',
      'assets/images/slide-5.webp'
    ];
    let currentLightboxList = lightboxImgSources;
    let currentLightboxIndex = 0;

    function renderLightbox(idx) {
      if (idx < 0) idx = currentLightboxList.length - 1;
      if (idx >= currentLightboxList.length) idx = 0;
      currentLightboxIndex = idx;
      const targetImg = document.getElementById('lightbox-img');
      const counter = document.getElementById('lightbox-counter');
      if (targetImg) {
        targetImg.src = currentLightboxList[idx];
      }
      if (counter) {
        counter.textContent = (idx + 1) + ' / ' + currentLightboxList.length;
        counter.style.display = currentLightboxList.length > 1 ? 'block' : 'none';
      }
      const prevBtn = document.getElementById('lightbox-prev');
      const nextBtn = document.getElementById('lightbox-next');
      if (prevBtn && nextBtn) {
        const showNav = currentLightboxList.length > 1;
        prevBtn.style.display = showNav ? 'flex' : 'none';
        nextBtn.style.display = showNav ? 'flex' : 'none';
      }
    }

    function closeLightbox() {
      lightboxModal.classList.remove('is-active');
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-content-wrapper')) {
        closeLightbox();
      }
    });

    document.getElementById('lightbox-close')?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });

    document.getElementById('lightbox-prev')?.addEventListener('click', (e) => {
      e.stopPropagation();
      renderLightbox(currentLightboxIndex - 1);
    });

    document.getElementById('lightbox-next')?.addEventListener('click', (e) => {
      e.stopPropagation();
      renderLightbox(currentLightboxIndex + 1);
    });

    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('is-active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') renderLightbox(currentLightboxIndex - 1);
      if (e.key === 'ArrowRight') renderLightbox(currentLightboxIndex + 1);
    });

    // Touch swipe support for lightbox
    let touchStartX = 0;
    let touchEndX = 0;
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        renderLightbox(currentLightboxIndex + 1);
      } else if (touchEndX - touchStartX > 45) {
        renderLightbox(currentLightboxIndex - 1);
      }
    }, { passive: true });

    window.openShowcaseLightbox = function(index) {
      currentLightboxList = lightboxImgSources;
      renderLightbox(index);
      lightboxModal.classList.add('is-active');
    };

    window.openCustomLightbox = function(list, index) {
      currentLightboxList = list;
      renderLightbox(index);
      lightboxModal.classList.add('is-active');
    };

    document.getElementById('showcase-prev')?.addEventListener('click', () => updateShowcaseSlider(currentShowcaseIndex - 1));
    document.getElementById('showcase-next')?.addEventListener('click', () => updateShowcaseSlider(currentShowcaseIndex + 1));
    showcaseIndicators.forEach((ind, idx) => {
      ind.addEventListener('click', () => updateShowcaseSlider(idx));
    });

    startShowcaseAutoPlay();

    // Founding seats live countdown timer
    (function () {
      var dEl = document.getElementById('fcD');
      var hEl = document.getElementById('fcH');
      var mEl = document.getElementById('fcM');
      var sEl = document.getElementById('fcS');
      if (!dEl || !hEl || !mEl || !sEl) return;

      var ends = Date.UTC(2026, 10, 15, 8, 0, 0); // Nov 14 end of day Pacific time
      function pad(n) { return (n < 10 ? '0' : '') + n; }
      function tick() {
        var diff = ends - Date.now();
        if (diff <= 0) {
          dEl.textContent = '00'; hEl.textContent = '00'; mEl.textContent = '00'; sEl.textContent = '00';
          return;
        }
        var s = Math.floor(diff / 1000);
        var d = Math.floor(s / 86400);
        var h = Math.floor((s % 86400) / 3600);
        var m = Math.floor((s % 3600) / 60);
        var sec = s % 60;
        dEl.textContent = pad(d);
        hEl.textContent = pad(h);
        mEl.textContent = pad(m);
        sEl.textContent = pad(sec);
      }
      setInterval(tick, 1000);
      tick();
    })();

    // Comparison table animation trigger (Gentle stagger, no missing text)
    (function () {
      var t = document.getElementById('compare');
      if (!t || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var rows = [].slice.call(t.querySelectorAll('tbody tr'));
      new IntersectionObserver(function (entries, observer) {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        t.classList.add('cm-on');
      }, { threshold: 0.15 }).observe(t.querySelector('.cmp-box') || t);
    })();

    // Dodo Payments Gateway Integration — Plan Your Life ($97.00 / 50% Auto Discount)
    const DODO_API_KEY = "kmE8_Bv2OM39uP1B.x6Zl2yvnUqyKp4-5vgWaYK1pnUvxTvNXdkgwPhw8kOn7ARYb";
    const DODO_PRODUCT_ID = "pdt_0Nrl6ma9oHEXd41P1f4FR"; // Brand: Plan Your Life ($194.00)

    async function openDodoCheckout(newTab = false) {
      const fallbackUrl = "https://checkout.dodopayments.com/buy/" + DODO_PRODUCT_ID + "?quantity=1";
      
      let targetWindow = null;
      if (newTab) {
        // Open blank tab immediately to prevent popup blockers
        targetWindow = window.open('about:blank', '_blank');
      }

      try {
        const res = await fetch("https://live.dodopayments.com/checkouts", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + DODO_API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            product_cart: [{
              product_id: DODO_PRODUCT_ID,
              quantity: 1
            }],
            discount_codes: ["LAUNCH50"],
            billing_currency: "USD",
            feature_flags: {
              allow_phone_number_collection: false
            }
          })
        });

        const data = await res.json();
        const checkoutUrl = data.checkout_url || fallbackUrl;

        if (newTab && targetWindow) {
          targetWindow.location.href = checkoutUrl;
        } else {
          window.location.href = checkoutUrl;
        }
      } catch (err) {
        if (newTab && targetWindow) {
          targetWindow.location.href = fallbackUrl;
        } else {
          window.location.href = fallbackUrl;
        }
      }
    }

    function smoothScrollToShowcase() {
      const target = document.getElementById('showcase-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // 1. Hero CTA & Section 3 CTA: Scroll down to #showcase-section
    const heroBtn = document.getElementById('hero-cta-btn');
    if (heroBtn) {
      heroBtn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToShowcase();
      });
    }

    const sec3Btn = document.getElementById('sec3-cta-btn');
    if (sec3Btn) {
      sec3Btn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToShowcase();
      });
    }

    // 2. Section 4 ("And that's not all") bottom return button: Scroll up to #showcase-section
    const sec4ReturnBtn = document.getElementById('sec4-return-btn');
    if (sec4ReturnBtn) {
      sec4ReturnBtn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToShowcase();
      });
    }

    // 3. FAQ Right Column Button ("Get Started Now"): Scroll up to #showcase-section
    const faqBtn = document.getElementById('faq-cta-btn');
    if (faqBtn) {
      faqBtn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToShowcase();
      });
    }

    // 4. Showcase Buy Button ("Get the Coach System now"): Directly open checkout
    const showcaseBuyBtn = document.getElementById('showcase-buy-btn');
    if (showcaseBuyBtn) {
      showcaseBuyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openDodoCheckout(false);
      });
    }

    // 5. Floating Bottom Bar Button ("Get System"): Open checkout in a NEW TAB
    const floatingBtn = document.getElementById('floating-buy-btn');
    if (floatingBtn) {
      floatingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openDodoCheckout(true);
      });
    }

    // Apple-Style Floating Promo Bar: reveals smoothly once user passes "Transform Your Clients in 90 Days"
    const floatingBar = document.getElementById('floating-buy-bar');
    const showcaseSection = document.getElementById('showcase-section');
    if (floatingBar && showcaseSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // If showcase is still in view or above it, hide. Once showcase is scrolled past (bounding rect top < 0 and not intersecting), reveal.
          const isPast = entry.boundingClientRect.bottom < 0;
          if (isPast) {
            floatingBar.classList.add('is-visible');
          } else {
            floatingBar.classList.remove('is-visible');
          }
        });
      }, {
        threshold: 0,
        rootMargin: '0px 0px -100px 0px'
      });
      observer.observe(showcaseSection);

      // Also listen to passive scroll for immediate responsive feedback
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const rect = showcaseSection.getBoundingClientRect();
            // User has scrolled through / past the showcase section
            const isScrolledPast = rect.bottom < 80;
            if (isScrolledPast) {
              floatingBar.classList.add('is-visible');
            } else {
              floatingBar.classList.remove('is-visible');
            }
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }

/* ════════════════════════════════════════════════════════════
   BEVEL imported sections
   1) "Join over 2.5 million" — accolades marquee (play in view)
   2) "And that's not all"  — auto-advancing video tabs w/ rings
   (ported from Bevel's GSAP engine — no GSAP dependency here)
   ════════════════════════════════════════════════════════════ */

// ── 1) Accolades marquee: pause while out of view ──
(function () {
  const marquees = document.querySelectorAll('.marquee.cc-accolades');
  if (!marquees.length) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-paused', !entry.isIntersecting || reduced.matches);
    });
  }, { threshold: 0 });
  marquees.forEach(m => io.observe(m));
  reduced.addEventListener?.('change', () => {
    marquees.forEach(m => m.classList.toggle('is-paused', reduced.matches));
  });
})();

// ── 2) Video tabs (lazy-loading, auto-advancing, scroll-to-active) ──
(function () {
  const ACTIVE_CLASS = 'is-active';

  let currentIndex = -1;
  let ringAnim = null;          // { ring, duration, elapsed, raf, lastTs, paused }
  let isHovering = false;
  let isInView = false;
  let hasStarted = false;

  const wrapper = document.querySelector('[data-tabs-wrapper]');
  if (!wrapper) return;

  const tabs = [...wrapper.querySelectorAll('[data-tab]')];
  let mediaPanels = [...wrapper.querySelectorAll('[data-tab-media]')];
  if (mediaPanels.length === 0) {
    mediaPanels = [...document.querySelectorAll('[data-tab-media]')];
  }
  const scrollContainer = document.querySelector('.extra-features_list');
  const totalTabs = tabs.length;
  if (!totalTabs) return;

  // ── per-tab rings + pause icons ──
  const rings = tabs.map(tab => tab.querySelector('[data-tabs-ring] circle:last-child') || null);
  const pauseIcons = tabs.map(tab => tab.querySelector('[data-tabs-pause]'));

  let circumference = 0;
  rings.forEach((ring, i) => {
    if (!ring || ring.tagName !== 'circle') return;
    const c = 2 * Math.PI * parseFloat(ring.getAttribute('r'));
    if (i === 0) circumference = c;
    ring.style.strokeDasharray = c;
    ring.style.strokeDashoffset = c;
    ring.style.transformOrigin = 'center';
    ring.style.transform = 'rotate(-90deg)';
  });

  pauseIcons.forEach(icon => { if (icon) icon.style.opacity = '0'; });

  // ── video helpers ──
  function getVideo(index) {
    const panel = mediaPanels[index];
    return panel ? panel.querySelector('video') : null;
  }

  function loadVideo(index) {
    const video = getVideo(index);
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    const src = video.getAttribute('data-src');
    if (!src) return;
    video.innerHTML = '';
    const source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';
    video.appendChild(source);
    video.load();
  }

  function unloadVideo(index) {
    const video = getVideo(index);
    if (!video) return;
    video.pause();
    video.removeAttribute('src');
    video.innerHTML = '';
    video.load();
  }

  // ── ring animation (rAF port of the original GSAP tween) ──
  function cancelRing() {
    if (ringAnim) { cancelAnimationFrame(ringAnim.raf); ringAnim = null; }
  }

  function resetRings() {
    rings.forEach(r => {
      if (r && r.tagName === 'circle') r.style.strokeDashoffset = circumference;
    });
  }

  function ringFrame(ts) {
    if (!ringAnim) return;
    if (!ringAnim.paused) {
      const dt = ts - ringAnim.lastTs;
      ringAnim.lastTs = ts;
      ringAnim.elapsed += dt;
    } else {
      ringAnim.lastTs = ts;
    }
    const p = Math.min(ringAnim.elapsed / ringAnim.duration, 1);
    ringAnim.ring.style.strokeDashoffset = circumference * (1 - p);
    if (p >= 1 && !getVideo(currentIndex)) {
      cancelRing();
      activateTab((currentIndex + 1) % totalTabs);
      return;
    }
    ringAnim.raf = requestAnimationFrame(ringFrame);
  }

  function startRing(index, duration) {
    cancelRing();
    resetRings();
    const ring = rings[index];
    if (!ring || ring.tagName !== 'circle' || !circumference || !duration || !isFinite(duration)) return;
    ringAnim = { ring, duration: duration * 1000, elapsed: 0, lastTs: performance.now(), paused: false, raf: 0 };
    ringAnim.raf = requestAnimationFrame(ringFrame);
  }

  function pauseRing() { if (ringAnim) ringAnim.paused = true; }
  function resumeRing() { if (ringAnim) { ringAnim.paused = false; ringAnim.lastTs = performance.now(); } }

  // ── scroll the tab list to the active tab ──
  function scrollToTab(index) {
    const tab = tabs[index];
    if (!tab || !scrollContainer) return;
    tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }

  // ── activate tab ──
  const mockupPanels = [...document.querySelectorAll('[data-tab-panel]')];
  const TAB_DURATION = 5; // 5 seconds per tab for image mockup mode

  function activateTab(index) {
    const prevIndex = currentIndex;
    currentIndex = index;

    tabs.forEach((tab, i) => tab.classList.toggle(ACTIVE_CLASS, i === index));

    mockupPanels.forEach((panel, i) => {
      panel.classList.toggle(ACTIVE_CLASS, i === index);
    });

    mediaPanels.forEach((panel, i) => {
      panel.style.display = i === index ? 'block' : 'none';
      panel.classList.toggle(ACTIVE_CLASS, i === index);
    });

    pauseIcons.forEach(icon => { if (icon) icon.style.opacity = '0'; });

    if (prevIndex >= 0 && prevIndex !== index) unloadVideo(prevIndex);

    const video = getVideo(index);
    if (video) {
      function attemptPlay(retries) {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise) {
          playPromise
            .then(() => startRing(index, video.duration))
            .catch(() => { if (retries > 0) setTimeout(() => attemptPlay(retries - 1), 200); });
        }
      }

      function onReady() { attemptPlay(5); }

      video.setAttribute('webkit-playsinline', '');
      video.setAttribute('playsinline', '');

      if (video.readyState >= 3) onReady();
      else video.addEventListener('canplay', onReady, { once: true });

      loadVideo(index);
    } else {
      // 5-second timer ring running, then auto-advance to next subtopic
      startRing(index, TAB_DURATION);
    }

    scrollToTab(index);
  }

  // ── video ended → advance ──
  mediaPanels.forEach((panel, i) => {
    panel.addEventListener('ended', (e) => {
      if (e.target.tagName !== 'VIDEO') return;
      if (i !== currentIndex) return;
      activateTab((currentIndex + 1) % totalTabs);
    }, true);
  });

  // ── hover pause / resume ──
  wrapper.addEventListener('mouseenter', () => {
    isHovering = true;
    if (!isInView) return;
    const v = getVideo(currentIndex);
    if (v) v.pause();
    pauseRing();
    const icon = pauseIcons[currentIndex];
    if (icon) icon.style.opacity = '1';
  });

  wrapper.addEventListener('mouseleave', () => {
    isHovering = false;
    if (!isInView) return;
    const v = getVideo(currentIndex);
    if (v) v.play();
    resumeRing();
    const icon = pauseIcons[currentIndex];
    if (icon) icon.style.opacity = '0';
  });

  // ── manual tab clicks ──
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const clickedIndex = parseInt(tab.getAttribute('data-tab'), 10);
      if (clickedIndex === currentIndex) return;
      cancelRing();
      activateTab(clickedIndex);
    });
  });

  // ── visibility observer ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isInView = true;
        if (!hasStarted) {
          hasStarted = true;
          activateTab(0);
        } else if (!isHovering) {
          const v = getVideo(currentIndex);
          if (v) v.play();
          resumeRing();
        }
      } else {
        isInView = false;
        if (currentIndex >= 0) {
          const v = getVideo(currentIndex);
          if (v) v.pause();
          pauseRing();
        }
      }
    });
  }, { threshold: 0.2 });

  
  // ── Mockup Card Click -> Zoom Forward Lightbox ──
  document.querySelectorAll('.mockup-cards-stack').forEach(stack => {
    const cards = Array.from(stack.querySelectorAll('.mockup-card img')).map(img => img.src);
    stack.querySelectorAll('.mockup-card').forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.openCustomLightbox) {
          window.openCustomLightbox(cards, idx);
        }
      });
    });
  });

  observer.observe(wrapper);
})();
