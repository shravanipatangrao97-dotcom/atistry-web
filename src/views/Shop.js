import { artworks } from '../data/artworks.js';
import { addToCart, toggleWishlist, isInWishlist } from '../data/state.js';
import { openQuickView } from '../components/QuickView.js';

let activeFilters = {
  categories: [],
  themes: [],
  minPrice: 0,
  maxPrice: 3000,
  search: '',
  sort: 'featured'
};

export function renderShop() {
  return `
    <div class="shop-page">
      <div style="text-align: center; margin-bottom: 3rem;">
        <h1 style="font-size: 3rem; margin-bottom: 0.5rem;">Collection Shop</h1>
        <p style="font-family: var(--font-serif); font-style: italic; color: var(--text-muted);">
          Fine original paintings &amp; premium giclée prints.
        </p>
      </div>

      <div class="shop-layout">
        <!-- Sidebar Filters -->
        <aside class="shop-sidebar">
          <!-- Search -->
          <div class="search-container">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="text" id="shop-search" class="search-input" placeholder="Search paintings..." value="${activeFilters.search}">
          </div>

          <!-- Filter Category -->
          <div class="filter-group">
            <h3>Type</h3>
            <label class="filter-option">
              <input type="checkbox" class="category-filter" value="Original" ${activeFilters.categories.includes('Original') ? 'checked' : ''}>
              Original Paintings
            </label>
            <label class="filter-option">
              <input type="checkbox" class="category-filter" value="Print" ${activeFilters.categories.includes('Print') ? 'checked' : ''}>
              Archival Prints
            </label>
          </div>

          <!-- Filter Themes -->
          <div class="filter-group">
            <h3>Themes</h3>
            <label class="filter-option">
              <input type="checkbox" class="theme-filter" value="Landscape" ${activeFilters.themes.includes('Landscape') ? 'checked' : ''}>
              Landscapes
            </label>
            <label class="filter-option">
              <input type="checkbox" class="theme-filter" value="Floral" ${activeFilters.themes.includes('Floral') ? 'checked' : ''}>
              Florals
            </label>
            <label class="filter-option">
              <input type="checkbox" class="theme-filter" value="Abstract" ${activeFilters.themes.includes('Abstract') ? 'checked' : ''}>
              Abstracts
            </label>
            <label class="filter-option">
              <input type="checkbox" class="theme-filter" value="Still Life" ${activeFilters.themes.includes('Still Life') ? 'checked' : ''}>
              Still Life
            </label>
          </div>

          <!-- Price limits -->
          <div class="filter-group">
            <h3>Price Range</h3>
            <div class="price-range-inputs">
              <input type="number" id="price-min" class="price-input" placeholder="Min" value="${activeFilters.minPrice || ''}">
              <span>to</span>
              <input type="number" id="price-max" class="price-input" placeholder="Max" value="${activeFilters.maxPrice || ''}">
            </div>
          </div>
          
          <button class="btn-secondary" id="clear-filters-btn" style="padding: 0.6rem; font-size: 0.8rem; margin-top: 1rem;">
            Clear All Filters
          </button>
        </aside>

        <!-- Product Grid Main -->
        <main class="shop-main">
          <div class="shop-results-header">
            <span id="results-count">Showing 0 artworks</span>
            
            <div style="display: flex; align-items: center; gap: 0.8rem;">
              <span>Sort by:</span>
              <select id="shop-sort" class="sort-select">
                <option value="featured" ${activeFilters.sort === 'featured' ? 'selected' : ''}>Featured</option>
                <option value="price-low" ${activeFilters.sort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                <option value="price-high" ${activeFilters.sort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                <option value="title" ${activeFilters.sort === 'title' ? 'selected' : ''}>Name: A to Z</option>
              </select>
            </div>
          </div>

          <div class="product-grid" id="product-grid-container">
            <!-- Dynamically populated cards -->
          </div>
        </main>
      </div>
    </div>
  `;
}

function renderProductCards(filteredArtworks) {
  const container = document.getElementById('product-grid-container');
  const countEl = document.getElementById('results-count');
  
  if (!container) return;
  
  if (countEl) {
    countEl.innerText = `Showing ${filteredArtworks.length} artwork${filteredArtworks.length === 1 ? '' : 's'}`;
  }

  if (filteredArtworks.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 0;">
        <i class="fa-regular fa-folder-open" style="font-size: 3rem; color: var(--accent-rose); margin-bottom: 1rem;"></i>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 0.5rem;">No items matched your filters</h3>
        <p>Try clearing filters or resetting the search term.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredArtworks.map(art => {
    const isFavorited = isInWishlist(art.id);
    return `
      <div class="product-card" data-id="${art.id}">
        <div class="card-img-container">
          <a href="#/product/${art.id}">
            <img src="${art.image}" alt="${art.title}">
          </a>
          <!-- Hover Overlay -->
          <div class="card-overlay">
            <button class="overlay-btn quick-view-trigger" data-id="${art.id}" title="Quick View">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button class="overlay-btn wishlist-trigger ${isFavorited ? 'active' : ''}" data-id="${art.id}" title="Add to Wishlist" style="${isFavorited ? 'background-color: var(--accent-rose); color: white;' : ''}">
              <i class="${isFavorited ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
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

  // Bind card actions
  bindCardActions(filteredArtworks);
}

function bindCardActions(filteredList) {
  // Quick View triggers
  document.querySelectorAll('.quick-view-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const art = artworks.find(item => item.id === id);
      if (art) openQuickView(art);
    });
  });

  // Wishlist triggers
  document.querySelectorAll('.wishlist-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const art = artworks.find(item => item.id === id);
      if (art) {
        toggleWishlist(art);
        const active = isInWishlist(id);
        btn.classList.toggle('active', active);
        btn.style.backgroundColor = active ? 'var(--accent-rose)' : 'var(--bg-paper)';
        btn.style.color = active ? 'white' : 'var(--text-dark)';
        
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = active ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
        }
      }
    });
  });

  // Add to Bag triggers
  document.querySelectorAll('.add-to-bag-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const art = artworks.find(item => item.id === id);
      if (art) addToCart(art);
    });
  });
}

function applyFiltersAndSort() {
  let list = artworks.filter(art => art.isUploaded === true);

  // Search filter
  if (activeFilters.search) {
    const q = activeFilters.search.toLowerCase();
    list = list.filter(art => 
      art.title.toLowerCase().includes(q) || 
      art.description.toLowerCase().includes(q) ||
      art.medium.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (activeFilters.categories.length > 0) {
    list = list.filter(art => activeFilters.categories.includes(art.category));
  }

  // Theme filter
  if (activeFilters.themes.length > 0) {
    list = list.filter(art => activeFilters.themes.includes(art.theme));
  }

  // Price range filter
  if (activeFilters.minPrice) {
    list = list.filter(art => art.price >= activeFilters.minPrice);
  }
  if (activeFilters.maxPrice) {
    list = list.filter(art => art.price <= activeFilters.maxPrice);
  }

  // Sort
  if (activeFilters.sort === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (activeFilters.sort === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (activeFilters.sort === 'title') {
    list.sort((a, b) => a.title.localeCompare(b.title));
  }

  renderProductCards(list);
}

export function initShop() {
  // Query params handling (e.g. #/shop?theme=Landscape)
  const hash = window.location.hash;
  if (hash.includes('?')) {
    const queryPart = hash.split('?')[1];
    const urlParams = new URLSearchParams(queryPart);
    const themeParam = urlParams.get('theme');
    if (themeParam) {
      activeFilters.themes = [themeParam];
    }
  }

  // Register elements
  const searchInput = document.getElementById('shop-search');
  const sortSelect = document.getElementById('shop-sort');
  const minPriceInput = document.getElementById('price-min');
  const maxPriceInput = document.getElementById('price-max');
  const clearBtn = document.getElementById('clear-filters-btn');

  // Load initial filtering
  applyFiltersAndSort();

  // Search input event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeFilters.search = e.target.value;
      applyFiltersAndSort();
    });
  }

  // Category filter event
  document.querySelectorAll('.category-filter').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const activeCats = [];
      document.querySelectorAll('.category-filter:checked').forEach(c => {
        activeCats.push(c.value);
      });
      activeFilters.categories = activeCats;
      applyFiltersAndSort();
    });
  });

  // Theme filter event
  document.querySelectorAll('.theme-filter').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const activeThemes = [];
      document.querySelectorAll('.theme-filter:checked').forEach(c => {
        activeThemes.push(c.value);
      });
      activeFilters.themes = activeThemes;
      applyFiltersAndSort();
    });
  });

  // Price input events
  if (minPriceInput) {
    minPriceInput.addEventListener('input', (e) => {
      activeFilters.minPrice = Number(e.target.value) || 0;
      applyFiltersAndSort();
    });
  }
  if (maxPriceInput) {
    maxPriceInput.addEventListener('input', (e) => {
      activeFilters.maxPrice = Number(e.target.value) || 3000;
      applyFiltersAndSort();
    });
  }

  // Sort change event
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeFilters.sort = e.target.value;
      applyFiltersAndSort();
    });
  }

  // Clear filters
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeFilters = {
        categories: [],
        themes: [],
        minPrice: 0,
        maxPrice: 3000,
        search: '',
        sort: 'featured'
      };
      
      // Reset DOM elements
      if (searchInput) searchInput.value = '';
      if (minPriceInput) minPriceInput.value = '';
      if (maxPriceInput) maxPriceInput.value = '';
      if (sortSelect) sortSelect.value = 'featured';
      
      document.querySelectorAll('.category-filter, .theme-filter').forEach(cb => {
        cb.checked = false;
      });

      applyFiltersAndSort();
    });
  }
}
