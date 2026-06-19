export function renderContact() {
  return `
    <div class="contact-page">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 3rem; margin-bottom: 0.5rem;">Contact the Studio</h1>
        <p style="font-family: var(--font-serif); font-style: italic; color: var(--text-muted);">
          Questions about custom commissions, dimensions, or framing? Write to us.
        </p>
      </div>

      <div class="contact-layout">
        <!-- Info Panel -->
        <div class="contact-info-panel">
          <h2 style="font-family: var(--font-serif); font-size: 2.2rem; margin-bottom: 1.5rem; color: var(--text-dark);">
            Let's start a conversation
          </h2>
          <p style="font-size: 1.05rem; margin-bottom: 2.5rem; max-width: 500px;">
            Whether you want to commission a custom-sized painting, discuss shipping frames, or just say hello—please get in touch. I try to reply to all queries within 24 to 48 hours.
          </p>

          <div class="contact-detail">
            <span>Studio Location</span>
            <span style="font-size: 1.1rem; color: var(--text-dark); font-weight: 500;">
              Aachal Artistry Studio<br>
              45 Rue des Beaux-Arts<br>
              75006 Paris, France
            </span>
          </div>

          <div class="contact-detail">
            <span>Direct Email</span>
            <span style="font-size: 1.1rem; color: var(--text-dark); font-weight: 500;">
              hello@aachalartistry.com
            </span>
          </div>

          <div class="contact-detail">
            <span>Press &amp; Collaborations</span>
            <span style="font-size: 1.1rem; color: var(--text-dark); font-weight: 500;">
              studio@aachalartistry.com
            </span>
          </div>
        </div>

        <!-- Form Panel -->
        <div class="contact-form-panel">
          <form id="contact-form-el" style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="form-group">
              <label for="contact-name">Your Name</label>
              <input type="text" id="contact-name" placeholder="E.g. Alexander Vance" required>
            </div>
            
            <div class="form-group">
              <label for="contact-email">Email Address</label>
              <input type="email" id="contact-email" placeholder="E.g. alex@example.com" required>
            </div>

            <div class="form-group">
              <label for="contact-subject">Subject</label>
              <select id="contact-subject" required>
                <option value="" disabled selected>Select an option...</option>
                <option value="commission">Original Commission Query</option>
                <option value="shipping">Shipping &amp; Logistics</option>
                <option value="prints">Print Inquiry</option>
                <option value="other">Just Saying Hello</option>
              </select>
            </div>

            <div class="form-group">
              <label for="contact-message">Your Message</label>
              <textarea id="contact-message" rows="5" placeholder="Write your message here..." required style="padding: 0.8rem 1.2rem; border: 1px solid var(--border-light); background-color: var(--bg-paper); font-family: var(--font-sans); font-size: 0.95rem; outline: none; border-radius: 2px; resize: vertical;"></textarea>
            </div>

            <button type="submit" class="btn-primary" style="height: 50px; text-align: center; margin-top: 1rem;">
              Send Message
            </button>
          </form>

          <div id="contact-success-msg" style="display: none; text-align: center; padding: 2rem 0;">
            <i class="fa-solid fa-heart" style="font-size: 2.5rem; color: var(--accent-rose); margin-bottom: 1.2rem;"></i>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 0.5rem;">Message Sent!</h3>
            <p style="font-family: var(--font-hand); color: var(--accent-terracotta); font-size: 1.2rem;">
              Thank you for writing! Talk to you soon. 🌸
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initContact() {
  const form = document.getElementById('contact-form-el');
  const successMsg = document.getElementById('contact-success-msg');
  if (form && successMsg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      successMsg.style.display = 'block';
    });
  }
}
