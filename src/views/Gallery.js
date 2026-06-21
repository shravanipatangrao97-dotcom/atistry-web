import { artworks } from '../data/artworks.js';
import { openQuickView } from '../components/QuickView.js';

export function renderGallery() {
  // Show only uploaded paintings in the 3D Virtual Gallery showcase
  const galleryArtworks = artworks.filter(art => art.isUploaded === true);

  const itemsHtml = galleryArtworks.map((art, index) => {
    return `
      <div class="gallery-card" data-index="${index}">
        <img src="${art.image}" alt="${art.title}">
        <div class="card-info">
          <h3>${art.title}</h3>
          <p>${art.medium} • ${art.dimensions}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px;">
            <span style="font-weight: bold; font-size: 1.1rem; color: var(--text-dark);">$${art.price}</span>
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
        ${itemsHtml}
      </div>

      <!-- Dots Indicator -->
      <div class="carousel-dots" id="carousel-dots-el">
        ${galleryArtworks.map((_, i) => `<span class="dot" data-index="${i}"></span>`).join('')}
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
  const galleryArtworks = artworks.filter(art => art.isUploaded === true);
  const items = document.querySelectorAll('.gallery-card');
  const prevBtn = document.getElementById('prev-gallery-btn');
  const nextBtn = document.getElementById('next-gallery-btn');
  const stage = document.getElementById('carousel-stage-el');
  const dots = document.querySelectorAll('.dot');

  if (items.length === 0) return;

  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;
  let dragThreshold = 40;
  const total = items.length;

  function updateCarousel() {
    items.forEach((item, index) => {
      // Clear positioning classes
      item.className = 'gallery-card';
      
      if (index === currentIndex) {
        item.classList.add('active');
      } else if (index === (currentIndex - 1 + total) % total) {
        item.classList.add('prev');
      } else if (index === (currentIndex + 1) % total) {
        item.classList.add('next');
      } else {
        item.classList.add('hidden');
      }
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
    currentIndex = (currentIndex + 1) % total;
    updateCarousel();
  }

  function slidePrev() {
    currentIndex = (currentIndex - 1 + total) % total;
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
        const art = galleryArtworks[index];
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
      const art = galleryArtworks[index];
      openQuickView(art);
    });
  });

  // Initial update
  updateCarousel();

  // Clean up global listeners on page navigation
  window.addEventListener('hashchange', function cleanup() {
    window.removeEventListener('keydown', keyHandler);
    window.removeEventListener('hashchange', cleanup);
  });
}
