import { addToCart, toggleWishlist, isInWishlist } from '../data/state.js';

export function openQuickView(artwork) {
  const backdrop = document.getElementById('quickview-backdrop');
  if (!backdrop) return;

  const isFavorited = isInWishlist(artwork.id);

  backdrop.innerHTML = `
    <div class="quickview-modal" id="quickview-modal-el">
      <button class="modal-close-btn" id="modal-close-btn-el" title="Close Panel">
        <i class="fa-solid fa-xmark"></i>
      </button>
      
      <div class="modal-img-container">
        <img src="${artwork.image}" alt="${artwork.title}">
      </div>
      
      <div class="modal-content-container">
        <span class="product-category-tag">${artwork.category} • ${artwork.theme}</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.2rem; margin-bottom: 0.8rem;">${artwork.title}</h2>
        <div style="font-size: 1.4rem; font-weight: 600; color: var(--text-dark); margin-bottom: 1.5rem;">
          $${artwork.price}
        </div>
        <p style="font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6;">${artwork.description}</p>
        
        <div class="product-meta-table" style="padding: 1rem; margin-bottom: 2rem; background-color: var(--bg-sand); font-size: 0.9rem;">
          <div class="meta-row" style="margin-bottom: 0.5rem;">
            <span class="meta-label">Medium:</span>
            <span class="meta-value">${artwork.medium}</span>
          </div>
          <div class="meta-row" style="margin-bottom: 0.5rem;">
            <span class="meta-label">Dimensions:</span>
            <span class="meta-value">${artwork.dimensions}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">Details:</span>
            <span class="meta-value">${artwork.details}</span>
          </div>
        </div>

        <div class="product-actions" style="display: flex; gap: 1rem;">
          <button class="btn-primary" id="modal-add-cart-btn" style="flex-grow: 1; height: 50px;">
            Add to Bag
          </button>
          
          <button class="wishlist-add-btn ${isFavorited ? 'active' : ''}" id="modal-wishlist-btn" title="Add to Wishlist" style="width: 50px; height: 50px;">
            <i class="${isFavorited ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  // Display Backdrop
  backdrop.classList.add('active');

  // Event handlers
  const closeBtn = document.getElementById('modal-close-btn-el');
  const addCartBtn = document.getElementById('modal-add-cart-btn');
  const wishlistBtn = document.getElementById('modal-wishlist-btn');

  const closeModal = () => {
    backdrop.classList.remove('active');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  
  // Close on backdrop click (but not modal content click)
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      addToCart(artwork);
      closeModal();
    });
  }

  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      toggleWishlist(artwork);
      const active = isInWishlist(artwork.id);
      wishlistBtn.classList.toggle('active', active);
      
      const heartIcon = wishlistBtn.querySelector('i');
      if (heartIcon) {
        heartIcon.className = active ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      }
    });
  }
}
