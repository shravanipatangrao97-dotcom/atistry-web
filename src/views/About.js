export function renderAbout() {
  return `
    <div class="about-page">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 3rem; margin-bottom: 0.5rem;">The Artist Story</h1>
        <p style="font-family: var(--font-serif); font-style: italic; color: var(--text-muted);">
          A peek into the studio, process, and inspirations of Aachal Artistry.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 4.5rem; align-items: center; margin-bottom: 6rem;">
        <!-- Studio Portrait Polaroid -->
        <div style="position: relative; justify-self: center; width: 85%; max-width: 420px; transform: rotate(-2deg);">
          <div class="tape" style="top: -10px; width: 120px; background-color: rgba(212,178,167,0.75);"></div>
          <div class="polaroid" style="padding: 16px 16px 36px 16px;">
            <img src="/images/artist_portrait.jpg" alt="Aachal in studio" style="border-radius: 2px;">
            <div class="polaroid-caption" style="font-size: 1.25rem;">working on a landscape study, 2026</div>
          </div>
        </div>

        <div>
          <h2 style="font-family: var(--font-serif); font-size: 2.4rem; margin-bottom: 1.5rem; color: var(--text-dark);">
            Art is a quiet conversation between the canvas and the heart.
          </h2>
          <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
            Based in a sun-drenched attic studio in the countryside, I spend my days blending pigments, spreading thick oil layers with palette knives, and sketching botanical forms. I believe that our homes should be filled with items that invite us to slow down, breathe, and reflect.
          </p>
          <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
            My collections represent different chapters of my creative journey. The landscape paintings are inspired by my travels through fields of lavender and ocean cliffs at sunrise, while the floral gouache drawings represent studies of plants I gather from my studio garden.
          </p>
          <span class="about-signature" style="margin-top: 1rem;">Aachal Artistry</span>
        </div>
      </div>

      <!-- Studio Practice / Scrapbook Details grid -->
      <section style="background-color: var(--bg-sand); border: 1px dashed var(--accent-sage); border-radius: 4px; padding: 4rem 3rem; margin-bottom: 6rem;">
        <h2 style="font-family: var(--font-serif); text-align: center; margin-bottom: 3rem; font-size: 2.2rem;">My Creative Process</h2>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem;">
          <div style="background: var(--bg-paper); padding: 2rem; border-radius: 4px; box-shadow: var(--shadow-soft);">
            <div style="font-size: 2rem; color: var(--accent-terracotta); font-family: var(--font-serif); margin-bottom: 1rem;">01.</div>
            <h4 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 0.8rem; font-weight: 600;">Earthy Textures</h4>
            <p style="font-size: 0.95rem; line-height: 1.6;">I often mix sand, stucco, and marble dust into my modeling paste to create heavy organic structures. This gives the paintings a rich physical presence and plays with the natural casting of shadows.</p>
          </div>
          
          <div style="background: var(--bg-paper); padding: 2rem; border-radius: 4px; box-shadow: var(--shadow-soft);">
            <div style="font-size: 2rem; color: var(--accent-sage); font-family: var(--font-serif); margin-bottom: 1rem;">02.</div>
            <h4 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 0.8rem; font-weight: 600;">Pastel Harmony</h4>
            <p style="font-size: 0.95rem; line-height: 1.6;">My color palettes are meticulously selected to capture specific lighting conditions. I lean towards warm neutral base tones, ochres, dry clays, and muted pastels to evoke peaceful, comforting vibes.</p>
          </div>

          <div style="background: var(--bg-paper); padding: 2rem; border-radius: 4px; box-shadow: var(--shadow-soft);">
            <div style="font-size: 2rem; color: var(--accent-rose); font-family: var(--font-serif); margin-bottom: 1rem;">03.</div>
            <h4 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 0.8rem; font-weight: 600;">Archival Giclées</h4>
            <p style="font-size: 0.95rem; line-height: 1.6;">To ensure everyone can access my work, my fine art prints are reproduced using high-end pigment inks on heavy cotton paper. Each print captures every delicate wash and pencil stroke of the original painting.</p>
          </div>
        </div>
      </section>
    </div>
  `;
}
