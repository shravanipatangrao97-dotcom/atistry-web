// Main entry point for the Clara Moreau Art Portfolio & E-Commerce site
import './style.css';
import { initRouter } from './router.js';
import { registerStateListener } from './data/state.js';
import { updateCartDrawerUI, initCartDrawerEvents } from './components/Cart.js';

// Initialize SPA Router
initRouter();

// Initialize Global Cart Event Listeners
initCartDrawerEvents();

// Initialize Mobile Hamburger Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');
if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mainNav.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (mainNav.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('active') && !mainNav.contains(e.target) && e.target !== mobileMenuBtn) {
      mainNav.classList.remove('active');
      mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
    }
  });

  // Close menu when navigation links are clicked
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
    });
  });
}

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
