export function renderOrderSuccess() {
  const rawOrder = sessionStorage.getItem('latest_clara_moreau_order');
  
  if (!rawOrder) {
    return `
      <div style="text-align: center; padding: 6rem 0;">
        <h2 style="font-family: var(--font-serif); font-size: 2rem; margin-bottom: 1rem;">No Recent Order Found</h2>
        <p>It looks like you haven't placed an order recently.</p>
        <a href="#/" class="btn-primary" style="margin-top: 2rem;">Go to Home</a>
      </div>
    `;
  }

  const order = JSON.parse(rawOrder);

  return `
    <div class="success-layout">
      <div class="success-icon">
        <i class="fa-solid fa-check"></i>
      </div>
      
      <h1 style="font-size: 3rem; margin-bottom: 0.5rem;">Purchase Confirmed</h1>
      <p style="font-family: var(--font-serif); font-style: italic; color: var(--text-muted); font-size: 1.15rem;">
        Thank you for supporting independent art! A confirmation email has been sent.
      </p>

      <!-- Receipt Invoice Card -->
      <div class="receipt-card">
        <h3 style="font-family: var(--font-serif); margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.8rem; font-size: 1.4rem;">
          Invoice Receipt
        </h3>
        
        <div class="receipt-row">
          <span style="color: var(--text-muted); font-weight: 500;">Order Number</span>
          <span style="font-weight: 600; color: var(--text-dark);">${order.orderId}</span>
        </div>
        
        <div class="receipt-row">
          <span style="color: var(--text-muted); font-weight: 500;">Order Date</span>
          <span>${order.date}</span>
        </div>
        
        <div class="receipt-row">
          <span style="color: var(--text-muted); font-weight: 500;">Ship To</span>
          <span>${order.customerName}</span>
        </div>

        <div class="receipt-row">
          <span style="color: var(--text-muted); font-weight: 500;">Address</span>
          <span style="max-width: 250px; text-align: right;">${order.address}</span>
        </div>

        <div class="receipt-row" style="border-top: 2px solid var(--accent-sage); padding-top: 1rem; margin-top: 0.5rem; font-size: 1.15rem; font-weight: bold;">
          <span>Total Paid</span>
          <span style="color: var(--text-dark);">$${order.totalPrice}</span>
        </div>
      </div>

      <div style="background-color: var(--bg-sand); padding: 1.5rem; border-radius: 4px; font-size: 0.9rem; text-align: left; width: 100%; border: 1px dashed var(--accent-sage);">
        <h4 style="font-family: var(--font-serif); font-size: 1.1rem; margin-bottom: 0.5rem; font-weight: 600;">What Happens Next?</h4>
        <p style="line-height: 1.6;">Clara will inspect and custom-package your artwork in wooden crates or heavy-duty tubes, complete with your hand-signed Certificate of Authenticity. We will email your tracking link as soon as it leaves the studio (typically 3-5 business days).</p>
      </div>

      <a href="#/shop" class="btn-primary" style="margin-top: 1.5rem;">Continue Shopping</a>
    </div>
  `;
}
