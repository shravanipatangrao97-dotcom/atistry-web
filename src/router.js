import { renderHome, initHome } from './views/Home.js';
import { renderGallery, initGallery } from './views/Gallery.js';
import { renderShop, initShop } from './views/Shop.js';
import { renderProduct, initProduct } from './views/Product.js';
import { renderAbout } from './views/About.js';
import { renderContact, initContact } from './views/Contact.js';
import { renderCheckout, initCheckout } from './views/Checkout.js';
import { renderOrderSuccess } from './views/OrderSuccess.js';
import { renderWishlist, initWishlist } from './views/Wishlist.js';

const routes = {
  '/': { render: renderHome, init: initHome, name: 'home' },
  '/gallery': { render: renderGallery, init: initGallery, name: 'gallery' },
  '/shop': { render: renderShop, init: initShop, name: 'shop' },
  '/product/:id': { render: renderProduct, init: initProduct, name: 'shop' },
  '/about': { render: renderAbout, init: null, name: 'about' },
  '/contact': { render: renderContact, init: initContact, name: 'contact' },
  '/checkout': { render: renderCheckout, init: initCheckout, name: 'checkout' },
  '/order-success': { render: renderOrderSuccess, init: null, name: 'order-success' },
  '/wishlist': { render: renderWishlist, init: initWishlist, name: 'wishlist' }
};

export function handleRoute() {
  const hash = window.location.hash.slice(1) || '/';
  let matchedRoute = null;
  let params = {};

  // Simple route matcher
  if (hash.startsWith('/product/')) {
    const parts = hash.split('/');
    if (parts.length > 2) {
      matchedRoute = '/product/:id';
      params.id = parts[2];
    }
  } else {
    matchedRoute = routes[hash] ? hash : '/';
  }

  const routeConfig = routes[matchedRoute];
  if (!routeConfig) return;

  // Render HTML in main container
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = routeConfig.render(params);

  // Initialize interactive logic
  if (routeConfig.init) {
    routeConfig.init(params);
  }

  // Update Nav Active States
  updateActiveNavLink(routeConfig.name);
  
  // Set transparent absolute header on Home page, standard glass header on other pages
  const header = document.querySelector('header');
  if (header) {
    if (routeConfig.name === 'home') {
      header.classList.add('home-transparent');
    } else {
      header.classList.remove('home-transparent');
    }
  }

  // Scroll to top on navigation
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Initialize scroll animations
  initScrollAnimations();
}

function updateActiveNavLink(routeName) {
  const navLinks = document.querySelectorAll('#main-nav a');
  navLinks.forEach(link => {
    const routeAttr = link.getAttribute('data-route');
    if (routeAttr === routeName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Trigger only once for performance
      }
    });
  }, {
    threshold: 0.05, // Trigger as soon as 5% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Slightly offset the trigger point for a smoother entrance
  });

  elements.forEach(el => observer.observe(el));
}

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('load', handleRoute);
}
