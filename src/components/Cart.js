import { getCart, getCartTotal, getCartCount, updateQuantity, removeFromCart, closeCartDrawer } from '../data/state.js';

export function updateCartDrawerUI() {
  const container = document.getElementById('cart-items-list-container');
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const badgeEl = document.getElementById('cart-badge');

  if (!container || !subtotalEl || !badgeEl) return;

  const items = getCart();
  const total = getCartTotal();
  const count = getCartCount();

  // Update navbar Badge
  badgeEl.innerText = count;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <i class="fa-solid fa-bag-shopping" style="font-size: 2.5rem; display: block; margin-bottom: 1rem; color: var(--accent-rose);"></i>
        Your bag is empty
      </div>
    `;
    subtotalEl.innerText = '$0.00';
    return;
  }

  // Update subtotal
  subtotalEl.innerText = `$${total.toFixed(2)}`;

  container.innerHTML = items.map(item => {
    return `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 style="font-family: var(--font-serif);">${item.title}</h4>
          <span>$${item.price} • ${item.category}</span>
          
          <div class="cart-quantity-controls">
            <button class="cart-qty-btn qty-minus-btn" data-id="${item.id}">-</button>
            <span class="cart-qty-val">${item.quantity}</span>
            <button class="cart-qty-btn qty-plus-btn" data-id="${item.id}">+</button>
          </div>
        </div>

        <div class="cart-item-price-bin">
          <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          <button class="cart-item-remove remove-item-btn" data-id="${item.id}" title="Remove Item">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Bind click handlers for quantity adjusters
  document.querySelectorAll('.qty-minus-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = items.find(i => i.id === id);
      if (item) updateQuantity(id, item.quantity - 1);
    });
  });

  document.querySelectorAll('.qty-plus-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = items.find(i => i.id === id);
      if (item) updateQuantity(id, item.quantity + 1);
    });
  });

  // Bind click handlers for removal
  document.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      removeFromCart(id);
    });
  });
}

export function initCartDrawerEvents() {
  const toggleBtn = document.getElementById('cart-toggle-btn');
  const closeBtn = document.getElementById('cart-close-btn');
  const backdrop = document.getElementById('cart-backdrop');
  const checkoutBtn = document.getElementById('cart-checkout-link');

  const openDrawer = () => {
    const drawer = document.getElementById('cart-drawer-container');
    if (drawer && backdrop) {
      drawer.classList.add('active');
      backdrop.classList.add('active');
    }
  };

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  if (backdrop) backdrop.addEventListener('click', closeCartDrawer);
  if (checkoutBtn) checkoutBtn.addEventListener('click', closeCartDrawer);
}
