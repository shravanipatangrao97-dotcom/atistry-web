import { getCart, getCartTotal, clearCart } from '../data/state.js';

export function renderCheckout() {
  const cartItems = getCart();
  const subtotal = getCartTotal();

  if (cartItems.length === 0) {
    return `
      <div style="text-align: center; padding: 6rem 0;">
        <i class="fa-solid fa-cart-shopping" style="font-size: 3.5rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
        <h2 style="font-family: var(--font-serif); font-size: 2.2rem; margin-bottom: 1.5rem;">Your Cart is Empty</h2>
        <p>You cannot proceed to checkout without adding items to your bag.</p>
        <a href="#/shop" class="btn-primary" style="margin-top: 2rem;">Back to Shop</a>
      </div>
    `;
  }

  const tax = Number((subtotal * 0.05).toFixed(2));
  const shipping = 0; // Free shipping
  const total = subtotal + tax + shipping;

  const itemsHtml = cartItems.map(item => {
    return `
      <div class="summary-item">
        <span class="summary-item-name">${item.title} <span style="font-size: 0.8rem; color: var(--text-muted);">x${item.quantity}</span></span>
        <span class="summary-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="checkout-page">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 3rem; margin-bottom: 0.5rem;">Secure Checkout</h1>
        <p style="font-family: var(--font-serif); font-style: italic; color: var(--text-muted);">
          Complete your information to finalize your art purchase.
        </p>
      </div>

      <div class="checkout-layout">
        <!-- Billing/Shipping Form Column -->
        <div class="checkout-form-container">
          <form id="checkout-form-el">
            <!-- Section 1: Customer Details -->
            <div class="checkout-section" style="margin-bottom: 2.5rem;">
              <h3>Shipping Information</h3>
              <div class="form-row">
                <div class="form-group">
                  <label for="ship-first-name">First Name</label>
                  <input type="text" id="ship-first-name" placeholder="E.g. Clara" required>
                </div>
                <div class="form-group">
                  <label for="ship-last-name">Last Name</label>
                  <input type="text" id="ship-last-name" placeholder="E.g. Moreau" required>
                </div>
              </div>
              
              <div class="form-group">
                <label for="ship-email">Email Address</label>
                <input type="email" id="ship-email" placeholder="E.g. clara@example.com" required>
              </div>

              <div class="form-group">
                <label for="ship-address">Street Address</label>
                <input type="text" id="ship-address" placeholder="E.g. 45 Rue des Beaux-Arts" required>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="ship-city">City</label>
                  <input type="text" id="ship-city" placeholder="E.g. Paris" required>
                </div>
                <div class="form-group">
                  <label for="ship-zip">Postal Code</label>
                  <input type="text" id="ship-zip" placeholder="E.g. 75006" required>
                </div>
              </div>

              <div class="form-group">
                <label for="ship-country">Country</label>
                <select id="ship-country" required>
                  <option value="" disabled selected>Select country...</option>
                  <option value="France">France</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Canada">Canada</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
            </div>

            <!-- Section 2: Mock Payment Info -->
            <div class="checkout-section" style="margin-bottom: 2.5rem;">
              <h3>Payment Details</h3>
              <div class="form-group">
                <label for="card-name">Cardholder Name</label>
                <input type="text" id="card-name" placeholder="Name as displayed on card" required>
              </div>
              
              <div class="form-group">
                <label for="card-number">Card Number</label>
                <input type="text" id="card-number" placeholder="4111 2222 3333 4444" pattern="\\d{16}" title="Must be a 16-digit card number" maxLength="16" required>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="card-expiry">Expiry Date</label>
                  <input type="text" id="card-expiry" placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\\/\\d{2}" title="Format: MM/YY" maxLength="5" required>
                </div>
                <div class="form-group">
                  <label for="card-cvv">CVV</label>
                  <input type="password" id="card-cvv" placeholder="123" pattern="\\d{3,4}" title="3 or 4 digits" maxLength="4" required>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn-primary" style="width: 100%; height: 54px; margin-top: 1rem;">
              Complete Purchase ($${total.toFixed(2)})
            </button>
          </form>
        </div>

        <!-- Order Summary Column -->
        <aside class="checkout-summary-pane">
          <h3>Order Summary</h3>
          
          <div class="summary-items-list">
            ${itemsHtml}
          </div>

          <div class="checkout-pricing-list">
            <div style="display: flex; justify-content: space-between; font-size: 0.95rem;">
              <span style="color: var(--text-muted);">Subtotal</span>
              <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: justify; justify-content: space-between; font-size: 0.95rem;">
              <span style="color: var(--text-muted);">Estimated Tax (5%)</span>
              <span>$${tax.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.95rem;">
              <span style="color: var(--text-muted);">Shipping</span>
              <span style="color: var(--accent-sage); font-weight: 500;">Free</span>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 1.3rem; font-weight: bold; color: var(--text-dark);">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  `;
}

export function initCheckout() {
  const form = document.getElementById('checkout-form-el');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect order details for the receipt
    const orderData = {
      orderId: 'CM-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      customerName: document.getElementById('ship-first-name').value + ' ' + document.getElementById('ship-last-name').value,
      email: document.getElementById('ship-email').value,
      address: document.getElementById('ship-address').value + ', ' + document.getElementById('ship-city').value + ', ' + document.getElementById('ship-zip').value,
      itemsCount: getCart().reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: (getCartTotal() * 1.05).toFixed(2) // Total + tax (5%)
    };

    // Store order in session storage to display on the success screen
    sessionStorage.setItem('latest_clara_moreau_order', JSON.stringify(orderData));

    // Clear E-Commerce Cart
    clearCart();

    // Redirect to Order Success screen
    window.location.hash = '#/order-success';
  });
}
