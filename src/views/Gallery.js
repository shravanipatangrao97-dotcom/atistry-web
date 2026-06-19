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
  const track = document.getElementById('carousel-track-el');

  if (items.length === 0) return;

  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;
  let dragThreshold = 40;
  const total = items.length;

  function updateCarousel() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 968 && window.innerWidth > 768;
    
    // Spacing radius for circular depth calculation (350px default, 250px tablet, 180px mobile)
    const radius = isMobile ? 180 : (isTablet ? 250 : 340);
    const angle = 360 / total;

    // Rotate the track cylinder to center the active card
    if (track) {
      track.style.transform = `rotateY(${-currentIndex * angle}deg)`;
    }

    items.forEach((item, index) => {
      // Clear positioning classes
      item.className = 'card';
      
      let diff = index - currentIndex;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const isCenter = (diff === 0);
      const scaleVal = isCenter ? 1.1 : 0.9;
      const opacityVal = isCenter ? 1 : 0.7;

      if (isCenter) {
        item.classList.add('active');
      } else if (diff === -1 || (currentIndex === 0 && index === total - 1)) {
        item.classList.add('left');
      } else if (diff === 1 || (currentIndex === total - 1 && index === 0)) {
        item.classList.add('right');
      } else if (diff < -1) {
        item.classList.add('far-left');
      } else {
        item.classList.add('far-right');
      }

      // Circular coordinates layout around the Y-cylinder
      const cardAngle = index * angle;
      item.style.transform = `rotateY(${cardAngle}deg) translateZ(${radius}px) scale(${scaleVal})`;
      item.style.opacity = `${opacityVal}`;
    });

    // Update dots indicators active status
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

  // Keyboard navigation listeners
  const keyHandler = (e) => {
    if (e.key === 'ArrowLeft') {
      slidePrev();
    } else if (e.key === 'ArrowRight') {
      slideNext();
    }
  };
  window.addEventListener('keydown', keyHandler);

  // Click arrow controls
  if (prevBtn) prevBtn.addEventListener('click', slidePrev);
  if (nextBtn) nextBtn.addEventListener('click', slideNext);

  // Dot indicators click logic
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.getAttribute('data-index'), 10);
      updateCarousel();
    });
  });

  // Touch and drag swipe gestures
  if (stage) {
    stage.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      stage.style.cursor = 'grabbing';
    });

    stage.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
    });

    stage.style.cursor = 'grab';

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

    // Touch Support for Mobile
    stage.addEventListener('touchstart', (e) => {
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

  // Card click triggers
  items.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      if (index === currentIndex) {
        const art = artworks[index];
        openQuickView(art);
      } else {
        currentIndex = index;
        updateCarousel();
      }
    });
  });

  // Expand button trigger specifically
  const expandBtns = document.querySelectorAll('.expand-btn');
  expandBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid double modal trigger
      const index = parseInt(btn.getAttribute('data-index'), 10);
      const art = artworks[index];
      openQuickView(art);
    });
  });

  // Bind window resize event
  const resizeHandler = () => {
    updateCarousel();
  };
  window.addEventListener('resize', resizeHandler);

  // Initial update
  updateCarousel();

  // Clean up global listeners on page navigation
  const oldHashchange = window.onhashchange;
  window.addEventListener('hashchange', function cleanup() {
    window.removeEventListener('keydown', keyHandler);
    window.removeEventListener('resize', resizeHandler);
    window.removeEventListener('hashchange', cleanup);
  });
}
