import { artworks } from '../data/artworks.js';

export function renderHome() {
  // Select distinct original paintings for the homepage
  const goldenTree = artworks.find(a => a.id === 'golden-moonlit-tree') || artworks[0];
  const pinkFlowers = artworks.find(a => a.id === 'pink-relief-blossoms') || artworks[2];
  const templeSunset = artworks.find(a => a.id === 'path-of-devotion') || artworks[4];
  const motorcycle = artworks.find(a => a.id === 'vintage-wanderer') || artworks[6];
  const minimalistGold = artworks.find(a => a.id === 'golden-branch-silhouette') || artworks[8];

  return `
    <div class="scrapbook-homepage">
      <!-- HERO SECTION: Video Background + Creative Collage -->
      <section class="scrapbook-hero">
        <!-- Background Video Loop -->
        <div class="hero-video-container">
          <video autoplay loop muted playsinline id="hero-bg-video">
            <source src="/images/studio-background.mp4" type="video/mp4">
          </video>
          <div class="video-overlay"></div>
        </div>

        <div class="hero-text-content">
          <span class="intro-handwritten">Hey you! Welcome to my space</span>
          <h1 class="hero-title">
            meet the <span style="position: relative; z-index: 1;">ARTIST <span class="text-underline-doodle"></span></span><br>
            <span style="font-family: var(--font-hand); color: var(--accent-terracotta); font-size: 3.2rem;">Aachal Artistry</span>
          </h1>
          <p style="color: var(--text-dark); font-weight: 400; font-size: 1.1rem; line-height: 1.7;">I paint quiet moments, warm sunbeams, and the wild patterns of nature. Step into my visual diary and find a piece that speaks to your heart.</p>
          
          <!-- Adjusted Button Hierarchy (3D Gallery is Primary, Shop is Secondary) -->
          <div style="display: flex; gap: 1.2rem; align-items: center; margin-top: 2.2rem;">
            <a href="#/gallery" class="btn-primary" style="box-shadow: 0 8px 25px rgba(43, 76, 94, 0.22);">3D Virtual Gallery</a>
            <a href="#/shop" class="btn-secondary" style="border-radius: 2px; padding: 0.85rem 2.2rem; background-color: rgba(255, 255, 255, 0.45); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); border: 1px solid var(--text-dark);">Shop Artworks</a>
          </div>
        </div>

        <!-- Scrapbook Collage Composition overlaying video -->
        <div class="collage-container">
          <!-- Item 1: Artist Portrait Polaroid (Vertical Rectangular) -->
          <div class="collage-item collage-artist">
            <div class="tape"></div>
            <div class="polaroid">
              <img src="/images/artist_portrait.jpg" alt="Aachal with flowers">
              <div class="polaroid-caption">me & sunflowers 🌻</div>
            </div>
          </div>

          <!-- Item 2: Painting 1 Polaroid (Square) -->
          <div class="collage-item collage-art-1">
            <div class="tape-diagonal"></div>
            <div class="polaroid">
              <img src="${goldenTree.image}" alt="${goldenTree.title}">
              <div class="polaroid-caption">Moonlit Tree 🌙</div>
            </div>
          </div>

          <!-- Item 3: Painting 2 Polaroid (Square) with added Washi Tape -->
          <div class="collage-item collage-art-2">
            <div class="tape-diagonal" style="background-color: rgba(198, 139, 115, 0.48); left: auto; right: -20px; transform: rotate(45deg);"></div>
            <div class="polaroid">
              <img src="${pinkFlowers.image}" alt="${pinkFlowers.title}">
              <div class="polaroid-caption">Floral Relief 🌸</div>
            </div>
          </div>

          <!-- Item 4: Painting 3 Polaroid (Square) -->
          <div class="collage-item collage-art-3">
            <div class="tape" style="background-color: rgba(143,158,139,0.5); transform: rotate(10deg); width: 80px;"></div>
            <div class="polaroid">
              <img src="${motorcycle.image}" alt="${motorcycle.title}">
              <div class="polaroid-caption">Vintage Wanderer 🏍️</div>
            </div>
          </div>

          <!-- Decorative stickers -->
          <div class="sticker sticker-star">
            <svg viewBox="0 0 100 100" fill="var(--accent-terracotta)" width="100%" height="100%">
              <path d="M50 0 L63 37 L100 50 L63 63 L50 100 L37 63 L0 50 L37 37 Z" />
            </svg>
          </div>
          
          <div class="sticker sticker-flower">
            <svg viewBox="0 0 100 100" fill="var(--accent-rose)" width="100%" height="100%">
              <path d="M50 35 C40 20, 20 20, 20 35 C20 50, 40 50, 50 65 C60 50, 80 50, 80 35 C80 20, 60 20, 50 35 Z" transform="rotate(0 50 50)" />
              <path d="M50 35 C40 20, 20 20, 20 35 C20 50, 40 50, 50 65 C60 50, 80 50, 80 35 C80 20, 60 20, 50 35 Z" transform="rotate(90 50 50)" />
              <circle cx="50" cy="50" r="10" fill="var(--bg-cream)" />
            </svg>
          </div>
        </div>
      </section>

      <!-- Divider -->
      <div class="scrapbook-divider">
        <div class="divider-line"></div>
        <span class="divider-doodle">✦ ✦ ✦</span>
        <div class="divider-line"></div>
      </div>

      <!-- ABOUT SECTION: Story + Polaroid strip -->
      <section class="about-section">
        <!-- Photo strip styling -->
        <div class="photostrip-container">
          <div class="tape-strip-pin"></div>
          <div class="photostrip">
            <div class="photostrip-item">
              <img src="/images/artist_portrait.jpg" alt="Inspiration">
            </div>
            <div class="photostrip-item">
              <img src="${templeSunset.image}" alt="Temple Study">
            </div>
            <div class="photostrip-item">
              <img src="${minimalistGold.image}" alt="Minimalist Gold">
            </div>
            <span class="photostrip-caption">about myself</span>
          </div>
        </div>

        <div class="about-text">
          <span class="about-tag">My Story</span>
          <h2 style="font-family: var(--font-serif); margin: 0.5rem 0 1.5rem 0; font-size: 2.8rem;">Inspired by the textures of life</h2>
          <p>Hello! I'm Aachal, a painter working from a cozy, light-filled studio. Ever since I can remember, I've had some kind of brush or pencil in my hand. For me, creating art is a way of preserving feelings, quiet atmospheres, and beautiful organic memories.</p>
          <p>My work combines structured layers, sand, and heavy impasto with soft, calming, pastel color-fields. Each piece is a personal diary entry made of colors and textures, and I am so grateful to share them with you.</p>
          <span class="about-signature">Aachal Artistry</span>
        </div>
      </section>

      <!-- COLLECTIONS SECTION -->
      <section style="margin-bottom: 8rem;">
        <div class="collections-header" style="text-align: center; margin-bottom: 4rem;">
          <h2 style="font-size: 2.8rem; margin-bottom: 1rem;">Browse the Collections</h2>
          <p style="max-width: 600px; margin: 0 auto;">Each theme explores a unique emotional landscape and artistic style. Find the perfect aesthetic for your home.</p>
        </div>

        <div class="collections-grid">
          <!-- Card 1: Landscapes -->
          <a href="#/shop?theme=Landscape" class="collection-card" style="background-image: url('${templeSunset.image}')">
            <div class="collection-info">
              <h3>Landscapes</h3>
              <span>Soft Oils &amp; Horizons</span>
            </div>
          </a>

          <!-- Card 2: Florals -->
          <a href="#/shop?theme=Floral" class="collection-card" style="background-image: url('${pinkFlowers.image}')">
            <div class="collection-info">
              <h3>Florals</h3>
              <span>Watercolors &amp; Gouache</span>
            </div>
          </a>

          <!-- Card 3: Abstracts -->
          <a href="#/shop?theme=Abstract" class="collection-card" style="background-image: url('${goldenTree.image}')">
            <div class="collection-info">
              <h3>Abstracts</h3>
              <span>Textures &amp; Earth Tones</span>
            </div>
          </a>
        </div>
      </section>

      <!-- GALLERY PROMOTION SECTION: Apple Vision Pro 3D Gallery CTA -->
      <section class="gallery-teaser-section">
        <div class="gallery-teaser-card">
          <div class="gallery-teaser-content">
            <span class="teaser-tag">Virtual Experience</span>
            <h2>Step Into My 3D Art Gallery</h2>
            <p>Experience my paintings in a premium 3D virtual environment. Rotated depth, dynamic lighting focus, and immersive card details simulate walking through a physical art gallery space.</p>
            <a href="#/gallery" class="btn-primary" style="background-color: var(--accent-terracotta); color: white;">Enter 3D Gallery</a>
          </div>
          <div class="gallery-teaser-preview">
            <div class="preview-card-3d">
              <img src="${goldenTree.image}" alt="3D preview">
              <div class="preview-glass-panel">
                <h4 style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--text-dark); font-weight: 500;">Golden Moonlit Tree</h4>
                <p style="font-family: var(--font-hand); color: var(--accent-terracotta); margin-top: 0.2rem;">3D Virtual Showcase</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- NEWSLETTER SECTION -->
      <section style="margin-bottom: 6rem;">
        <div class="newsletter-card">
          <!-- Small decorative pin -->
          <div class="paper-pin"></div>
          <h2>Drop a line!</h2>
          <p>Join my studio newsletter for exclusive previews of new collection drops, behind-the-scenes studio process journals, and art styling tips for your home.</p>
          <form class="newsletter-form" id="home-newsletter-form">
            <input type="email" placeholder="Your email address..." required id="newsletter-email">
            <button type="submit" class="btn-primary" style="padding: 0 1.8rem; height: 52px;">Subscribe</button>
          </form>
          <div id="newsletter-success-msg" class="newsletter-success" style="display: none; font-family: var(--font-hand); color: var(--accent-sage); font-size: 1.2rem; margin-top: 1.5rem;">
            Yay! Thank you for subscribing. Talk to you soon! 🌸
          </div>
        </div>
      </section>
    </div>
  `;
}

export function initHome() {
  // Setup Newsletter form submission logic
  const form = document.getElementById('home-newsletter-form');
  const successMsg = document.getElementById('newsletter-success-msg');
  if (form && successMsg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      successMsg.style.display = 'block';
    });
  }
}
