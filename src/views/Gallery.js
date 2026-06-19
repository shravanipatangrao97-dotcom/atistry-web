import { artworks } from '../data/artworks.js';
import { openQuickView } from '../components/QuickView.js';

export function renderGallery() {
  const itemsHtml = artworks.map((art, index) => {
    return `
      <div class="card" data-index="${index}">
        <div class="card-inner">
          <img src="${art.image}" alt="${art.title}">
          <div class="gallery-item-info">
            <h3>${art.title}</h3>
            <p>${art.medium} • ${art.dimensions}</p>
            <div style="font-weight: 600; font-size: 1.1rem; color: var(--text-dark); margin-top: 0.3rem; margin-bottom: 0.5rem;">
              $${art.price}
            </div>
            <!-- Expand Button on Active Card -->
            <button class="expand-btn" data-index="${index}">
              Expand Details <i class="fa-solid fa-expand" style="margin-left: 5px;"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="gallery-section">
      <div class="gallery-header">
        <h1 style="font-size: 3rem; margin-bottom: 0.5rem;">The 3D Virtual Gallery</h1>
        <p class="gallery-instruction">Drag, click side cards, or use ← → keys to explore. Click expand on the center painting to inspect details.</p>
      </div>

      <!-- 3D Carousel Stage -->
      <div class="gallery-container" id="carousel-stage-el">
        <div class="carousel" id="carousel-track-el">
          ${itemsHtml}
        </div>
      </div>

      <!-- Dots Indicator -->
      <div class="carousel-dots" id="carousel-dots-el">
        ${artworks.map((_, i) => `<span class="dot" data-index="${i}"></span>`).join('')}
      </div>

      <!-- Arrows control -->
      <div class="carousel-controls">
        <button class="carousel-btn" id="prev-gallery-btn" title="Previous Painting">
          <i class="fa-solid fa-arrow-left-long"></i>
        </button>
        <button class="carousel-btn" id="next-gallery-btn" title="Next Painting">
          <i class="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>
    </div>
  `;
}

export function initGallery() {
  const items = document.querySelectorAll('.card');
  const prevBtn = document.getElementById('prev-gallery-btn');
  const nextBtn = document.getElementById('next-gallery-btn');
  const stage = document.getElementById('carousel-stage-el');
  const dots = document.querySelectorAll('.dot');

  if (items.length === 0) return;

  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;
  let dragThreshold = 50;
  const total = items.length;

  function updateCarousel() {
    const isMobile = window.innerWidth <= 600;
    const isTablet = window.innerWidth <= 968 && window.innerWidth > 600;

    items.forEach((item, index) => {
      // Clear class and reset transform
      item.className = 'card';
      
      if (isMobile) {
        // Mobile style: reset inline transforms
        item.style.transform = '';
        item.style.opacity = '1';
        item.style.filter = 'none';
        return;
      }

      // Calculate relative index diff with wrap-around
      let diff = index - currentIndex;
      
      // Normalize diff to range [-total/2, total/2]
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      // Apply class names based on position
      if (diff === 0) {
        item.classList.add('active');
      } else if (diff === -1) {
        item.classList.add('left');
      } else if (diff === 1) {
        item.classList.add('right');
      } else if (diff < -1) {
        item.classList.add('far-left');
      } else {
        item.classList.add('far-right');
      }

      // Calculate smooth visual values
      let opacity = 1;
      let blurVal = 0;
      let scaleVal = 1;
      
      if (diff !== 0) {
        opacity = Math.max(0.3, 1 - Math.abs(diff) * 0.35);
        blurVal = Math.abs(diff) * 2;
        scaleVal = Math.max(0.75, 1 - Math.abs(diff) * 0.12);
      } else {
        scaleVal = 1.1; // scale active card up
      }

      // Spacing translation factors (Dynamic responsive offsets)
      const horizontalSpacing = isTablet ? 170 : 230;
      const depthSpacing = isTablet ? 60 : 80;
      const rotateFactor = isTablet ? 20 : 25;

      const translateX = diff * horizontalSpacing;
      const rotateY = diff * -rotateFactor;
      const translateZ = -Math.abs(diff) * depthSpacing;

      item.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scaleVal})`;
      item.style.opacity = `${opacity}`;
      item.style.filter = `blur(${blurVal}px)`;
    });

    // Update dots status
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function slideNext() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  }

  function slidePrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  }

  // Keyboard navigation
  const keyHandler = (e) => {
    if (e.key === 'ArrowLeft') {
      slidePrev();
    } else if (e.key === 'ArrowRight') {
      slideNext();
    }
  };
  window.addEventListener('keydown', keyHandler);

  // Click controls
  if (prevBtn) prevBtn.addEventListener('click', slidePrev);
  if (nextBtn) nextBtn.addEventListener('click', slideNext);

  // Dots click handlers
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.getAttribute('data-index'), 10);
      updateCarousel();
    });
  });

  // Drag interaction
  if (stage) {
    // Mouse Events
    stage.addEventListener('mousedown', (e) => {
      if (window.innerWidth <= 600) return; // Disable drag on mobile layout
      isDragging = true;
      startX = e.pageX;
      stage.style.cursor = 'grabbing';
    });

    stage.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
    });

    stage.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      stage.style.cursor = 'grab';
      const endX = e.pageX;
      const dragDiff = endX - startX;

      if (dragDiff > dragThreshold) {
        slidePrev();
      } else if (dragDiff < -dragThreshold) {
        slideNext();
      }
    });

    stage.addEventListener('mouseleave', () => {
      isDragging = false;
      stage.style.cursor = 'grab';
    });

    // Touch Events for Mobile (Only triggers swipe action when not scrolling horizontally)
    stage.addEventListener('touchstart', (e) => {
      if (window.innerWidth <= 600) return;
      isDragging = true;
      startX = e.touches[0].clientX;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const dragDiff = endX - startX;

      if (dragDiff > dragThreshold) {
        slidePrev();
      } else if (dragDiff < -dragThreshold) {
        slideNext();
      }
    }, { passive: true });
  }

  // Card click mechanics
  items.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      const isMobile = window.innerWidth <= 600;
      if (isMobile) {
        // Mobile tap always opens details
        const art = artworks[index];
        openQuickView(art);
        return;
      }

      if (index === currentIndex) {
        const art = artworks[index];
        openQuickView(art);
      } else {
        currentIndex = index;
        updateCarousel();
      }
    });
  });

  // Bind click specifically on expand-btn for active card
  const expandBtns = document.querySelectorAll('.expand-btn');
  expandBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid double modal trigger
      const index = parseInt(btn.getAttribute('data-index'), 10);
      const art = artworks[index];
      openQuickView(art);
    });
  });

  // Recalculate positions on window resize
  const resizeHandler = () => {
    updateCarousel();
  };
  window.addEventListener('resize', resizeHandler);

  // Initial update
  updateCarousel();

  // Clean up global listeners on navigation
  const oldHashchange = window.onhashchange;
  window.addEventListener('hashchange', function cleanup() {
    window.removeEventListener('keydown', keyHandler);
    window.removeEventListener('resize', resizeHandler);
    window.removeEventListener('hashchange', cleanup);
  });
}
