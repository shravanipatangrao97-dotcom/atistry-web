// Global E-Commerce State Management with LocalStorage persistence

const CART_KEY = 'clara_moreau_cart';
const WISHLIST_KEY = 'clara_moreau_wishlist';

let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
let wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
let listeners = [];

function saveState() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  notifyListeners();
}

function notifyListeners() {
  listeners.forEach(cb => cb({ cart, wishlist }));
}

export function registerStateListener(cb) {
  listeners.push(cb);
  // Immediate trigger for initial sync
  cb({ cart, wishlist });
  return () => {
    listeners = listeners.filter(listener => listener !== cb);
  };
}

// --- Cart Operations ---
export function getCart() {
  return [...cart];
}

export function addToCart(product, quantity = 1) {
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex > -1) {
    // Check stock limit
    const newQty = cart[existingItemIndex].quantity + quantity;
    if (newQty <= product.stock) {
      cart[existingItemIndex].quantity = newQty;
    } else {
      cart[existingItemIndex].quantity = product.stock;
    }
  } else {
    // If it's an original painting, stock is 1
    const finalQty = Math.min(quantity, product.stock);
    if (finalQty > 0) {
      cart.push({ ...product, quantity: finalQty });
    }
  }
  
  saveState();
  
  // Auto-open cart drawer when adding an item
  setTimeout(() => {
    openCartDrawer();
  }, 100);
}

export function updateQuantity(productId, newQty) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    if (newQty <= 0) {
      removeFromCart(productId);
    } else if (newQty <= item.stock) {
      item.quantity = newQty;
      saveState();
    }
  }
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveState();
}

export function clearCart() {
  cart = [];
  saveState();
}

export function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// --- Wishlist Operations ---
export function getWishlist() {
  return [...wishlist];
}

export function toggleWishlist(product) {
  const index = wishlist.findIndex(item => item.id === product.id);
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(product);
  }
  saveState();
}

export function isInWishlist(productId) {
  return wishlist.some(item => item.id === productId);
}

export function getWishlistCount() {
  return wishlist.length;
}

// --- Cart Drawer UI Triggers ---
export function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer-container');
  const backdrop = document.getElementById('cart-backdrop');
  if (drawer && backdrop) {
    drawer.classList.add('active');
    backdrop.classList.add('active');
  }
}

export function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer-container');
  const backdrop = document.getElementById('cart-backdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
  }
}
