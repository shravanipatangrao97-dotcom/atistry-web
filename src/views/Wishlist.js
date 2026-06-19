import { getWishlist, toggleWishlist, addToCart, isInWishlist } from '../data/state.js';
import { openQuickView } from '../components/QuickView.js';

export function renderWishlist() {
  const items = getWishlist();

  if (items.length === 0) {
    return `
      <div class="wishlist-layout">
        <i class="fa-regular fa-heart" style="font-size: 4rem; color: var(--accent-rose); margin-bottom: 1rem;"></i>
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Your Wishlist is Empty</h1>
        <p>Keep track of paintings and prints you love by clicking the heart icon.</p>
        <a href="#/shop" class="btn-primary" style="margin-top: 1.5rem;">Explore Artworks</a>
      </div>
    `;
  }

  return `
    <div class="wishlist-page">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 3rem; margin-bottom: 0.5rem;">Favorited Artworks</h1>
        <p style="font-family: var(--font-serif); font-style: italic; color: var(--text-muted);">
          Your personal collection of pieces you love.
        </p>
      </div>

      <div class="product-grid" id="wishlist-grid-el">
        <!-- Wishlist items dynamically populated -->
      </div>
    </div>
  `;
}

export function initWishlist() {
  const container = document.getElementById('wishlist-grid-el');
  if (!container) return;

  function renderList() {
    const items = getWishlist();
    if (items.length === 0) {
      // Reload route to display empty state
      window.location.reload();
      return;
    }

    container.innerHTML = items.map(art => {
      const isFavorited = isInWishlist(art.id);
      return `
        <div class="product-card" data-id="${art.id}">
          <div class="card-img-container">
            <a href="#/product/${art.id}">
              <img src="${art.image}" alt="${art.title}">
            </a>
            <div class="card-overlay">
              <button class="overlay-btn quick-view-trigger" data-id="${art.id}" title="Quick View">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="overlay-btn wishlist-remove-trigger" data-id="${art.id}" title="Remove from Wishlist" style="background-color: var(--accent-rose); color: white;">
                <i class="fa-solid fa-heart"></i>
              </button>
            </div>
          </div>

          <div class="card-content">
            <span class="card-tag">${art.category} • ${art.theme}</span>
            <h3 class="card-title">
              <a href="#/product/${art.id}">${art.title}</a>
            </h3>
            <p class="card-medium">${art.medium} (${art.dimensions})</p>
            
            <div class="card-footer">
              <span class="card-price">$${art.price}</span>
              <button class="card-cart-btn add-to-bag-trigger" data-id="${art.id}">
                <i class="fa-solid fa-bag-shopping"></i> Add
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Bind event handlers
    bindWishlistActions();
  }

  function bindWishlistActions() {
    // Quick View
    document.querySelectorAll('.quick-view-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const items = getWishlist();
        const art = items.find(item => item.id === id);
        if (art) openQuickView(art);
      });
    });

    // Remove from Wishlist
    document.querySelectorAll('.wishlist-remove-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const items = getWishlist();
        const art = items.find(item => item.id === id);
        if (art) {
          toggleWishlist(art);
          renderList(); // Re-render local list
        }
      });
    });

    // Add to Bag
    document.querySelectorAll('.add-to-bag-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const items = getWishlist();
        const art = items.find(item => item.id === id);
        if (art) addToCart(art);
      });
    });
  }

  // Initial draw
  renderList();
}
