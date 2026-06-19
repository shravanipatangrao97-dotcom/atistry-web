// Main entry point for the Clara Moreau Art Portfolio & E-Commerce site
import './style.css';
import { initRouter } from './router.js';
import { registerStateListener } from './data/state.js';
import { updateCartDrawerUI, initCartDrawerEvents } from './components/Cart.js';

// Initialize SPA Router
initRouter();

// Initialize Global Cart Event Listeners
initCartDrawerEvents();

// Listen to State changes (Cart & Wishlist updates)
registerStateListener(({ cart, wishlist }) => {
  // Update Navbar badges
  const cartBadge = document.getElementById('cart-badge');
  const wishlistBadge = document.getElementById('wishlist-badge');

  if (cartBadge) {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.innerText = totalQty;
  }

  if (wishlistBadge) {
    wishlistBadge.innerText = wishlist.length;
  }

  // Update Cart Drawer Items List
  updateCartDrawerUI();
});

console.log('Aachal Artistry initialized successfully ✨');
