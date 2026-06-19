import { artworks } from '../data/artworks.js';
import { addToCart, toggleWishlist, isInWishlist } from '../data/state.js';

export function renderProduct(params) {
  const art = artworks.find(item => item.id === params.id);
  if (!art) {
    return `
      <div style="text-align: center; padding: 6rem 0;">
        <h2 style="font-family: var(--font-serif); font-size: 2rem; margin-bottom: 1rem;">Artwork Not Found</h2>
        <p>The painting or print you are looking for might have been sold or moved.</p>
        <a href="#/shop" class="btn-primary" style="margin-top: 2rem;">Back to Shop</a>
      </div>
    `;
  }

  const isFavorited = isInWishlist(art.id);

  // Find related artworks (same theme, excluding current one)
  const related = artworks
    .filter(item => item.theme === art.theme && item.id !== art.id)
    .slice(0, 3);

  // If we don't have enough, fill with other items
  if (related.length < 3) {
    const ids = related.map(item => item.id);
    const extras = artworks
      .filter(item => item.id !== art.id && !ids.includes(item.id))
      .slice(0, 3 - related.length);
    related.push(...extras);
  }

  const relatedHtml = related.map(item => {
    return `
      <div class="product-card">
        <div class="card-img-container">
          <a href="#/product/${item.id}">
            <img src="${item.image}" alt="${item.title}">
          </a>
        </div>
        <div class="card-content">
          <span class="card-tag">${item.category} • ${item.theme}</span>
          <h3 class="card-title">
            <a href="#/product/${item.id}">${item.title}</a>
          </h3>
          <p class="card-medium">${item.medium}</p>
          <div class="card-footer">
            <span class="card-price">$${item.price}</span>
            <a href="#/product/${item.id}" class="card-cart-btn">View Art</a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="product-detail-page">
      <!-- Breadcrumb -->
      <div style="margin-bottom: 2.5rem; font-size: 0.9rem; color: var(--text-muted);">
        <a href="#/" style="color: var(--text-muted);">Home</a> / 
        <a href="#/shop" style="color: var(--text-muted);">Shop</a> / 
        <span style="color: var(--text-dark); font-weight: 500;">${art.title}</span>
      </div>

      <div class="product-detail-layout">
        <!-- Left Column: Zoomable Image -->
        <div class="product-image-pane" id="image-zoom-pane">
          <img src="${art.image}" alt="${art.title}" id="detail-artwork-img">
          <div class="zoom-hint">
            <i class="fa-solid fa-magnifying-glass-plus"></i> Hover to examine brushstrokes
          </div>
        </div>

        <!-- Right Column: Details -->
        <div class="product-details-pane">
          <span class="product-category-tag">${art.category} • ${art.theme}</span>
          <h1 style="font-family: var(--font-serif); font-size: 3rem; font-weight: 500; line-height: 1.1; margin-bottom: 1rem;">
            ${art.title}
          </h1>
          
          <div class="product-details-price">
            $${art.price}
          </div>

          <div class="product-description">
            <p>${art.description}</p>
          </div>

          <!-- Specifications Grid -->
          <div class="product-meta-table">
            <div class="meta-row">
              <span class="meta-label">Medium</span>
              <span class="meta-value">${art.medium}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Dimensions</span>
              <span class="meta-value">${art.dimensions}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Year of Creation</span>
              <span class="meta-value">${art.year}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Availability</span>
              <span class="meta-value" style="color: var(--accent-sage); font-weight: 500;">
                ${art.stock > 0 ? 'In Stock (Ready to Ship)' : 'Sold Out'}
              </span>
            </div>
            <div class="meta-row" style="border-top: 1px solid rgba(107, 101, 95, 0.1); padding-top: 0.8rem; margin-top: 0.2rem;">
              <span class="meta-label">Framing &amp; Shipping</span>
              <span class="meta-value">${art.details}</span>
            </div>
          </div>

          <!-- Checkout actions -->
          <div class="product-actions">
            <button class="btn-primary" id="add-to-bag-btn" ${art.stock === 0 ? 'disabled' : ''}>
              ${art.stock === 0 ? 'Sold Out' : 'Add to Bag'}
            </button>
            <button class="btn-secondary" id="buy-now-btn" ${art.stock === 0 ? 'disabled' : ''}>
              Buy Now
            </button>
            <button class="wishlist-add-btn ${isFavorited ? 'active' : ''}" id="toggle-wishlist-btn" title="Add to Wishlist">
              <i class="${isFavorited ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
          </div>

          <!-- Extra details/assurances -->
          <div style="border-top: 1px solid var(--border-light); padding-top: 1.5rem; display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.85rem; color: var(--text-muted);">
            <div><i class="fa-solid fa-truck-fast" style="color: var(--accent-sage); margin-right: 0.5rem;"></i> Free, secure worldwide shipping in custom reinforced wood packaging.</div>
            <div><i class="fa-solid fa-certificate" style="color: var(--accent-terracotta); margin-right: 0.5rem;"></i> Signed and accompanied by a Certificate of Authenticity.</div>
          </div>
        </div>
      </div>

      <!-- Related Artworks section -->
      <section class="related-section">
        <h2>You Might Also Love</h2>
        <div class="product-grid">
          ${relatedHtml}
        </div>
      </section>
    </div>
  `;
}

export function initProduct(params) {
  const art = artworks.find(item => item.id === params.id);
  if (!art) return;

  const pane = document.getElementById('image-zoom-pane');
  const img = document.getElementById('detail-artwork-img');
  const addBagBtn = document.getElementById('add-to-bag-btn');
  const buyNowBtn = document.getElementById('buy-now-btn');
  const wishlistBtn = document.getElementById('toggle-wishlist-btn');

  // Interactive Magnifier Zoom
  if (pane && img) {
    pane.addEventListener('mousemove', (e) => {
      const rect = pane.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = 'scale(2.2)';
    });

    pane.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
      img.style.transformOrigin = 'center center';
    });
  }

  // Cart operations
  if (addBagBtn) {
    addBagBtn.addEventListener('click', () => {
      addToCart(art);
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      addToCart(art);
      window.location.hash = '#/checkout';
    });
  }

  // Wishlist toggle
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      toggleWishlist(art);
      const active = isInWishlist(art.id);
      wishlistBtn.classList.toggle('active', active);
      
      const icon = wishlistBtn.querySelector('i');
      if (icon) {
        icon.className = active ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      }
    });
  }
}
