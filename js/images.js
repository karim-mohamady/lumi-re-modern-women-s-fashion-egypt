/**
 * Lumière | لوميير - Studio Garment Product Image Generator
 * Pure Vanilla JavaScript (ES6+) - Zero External Dependencies
 * 
 * Renders realistic ghost-mannequin / flat-lay studio product graphics
 * for 10 women's fashion categories with 3 distinct views (front, back, detail)
 * and live dynamic colorway support.
 */

(function () {
  "use strict";

  // In-memory SVG Cache for ultra-fast performance: key = `${productId}_${view}_${colorHex}`
  const svgCache = new Map();

  // Subtle studio lighting & background helper
  function getStudioBackground(defId) {
    return `
      <defs>
        <radialGradient id="studio-bg-${defId}" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#FCF8F3" />
          <stop offset="60%" stop-color="#F6EFE6" />
          <stop offset="100%" stop-color="#EBE0D2" />
        </radialGradient>
        <radialGradient id="shadow-${defId}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(50, 35, 40, 0.18)" />
          <stop offset="60%" stop-color="rgba(50, 35, 40, 0.06)" />
          <stop offset="100%" stop-color="rgba(50, 35, 40, 0)" />
        </radialGradient>
        <linearGradient id="fold-light-${defId}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(255,255,255,0)" />
          <stop offset="50%" stop-color="rgba(255,255,255,0.28)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="fold-dark-${defId}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(0,0,0,0)" />
          <stop offset="50%" stop-color="rgba(20,10,15,0.22)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0)" />
        </linearGradient>
        <linearGradient id="gold-trim-${defId}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#E4C685" />
          <stop offset="50%" stop-color="#C9A66B" />
          <stop offset="100%" stop-color="#9C773B" />
        </linearGradient>
      </defs>
      <rect width="400" height="533" fill="url(#studio-bg-${defId})" />
      <!-- Floor Contact Shadow -->
      <ellipse cx="200" cy="495" rx="110" ry="12" fill="url(#shadow-${defId})" />
    `;
  }

  // Adjust hex color brightness for realistic highlights and shadows
  function adjustColor(hex, percent) {
    if (!hex || hex[0] !== "#") hex = "#7A2E3F";
    let num = parseInt(hex.slice(1), 16);
    if (isNaN(num)) num = 0x7A2E3F;
    let r = (num >> 16) + Math.round(255 * (percent / 100));
    let g = ((num >> 8) & 0x00FF) + Math.round(255 * (percent / 100));
    let b = (num & 0x0000FF) + Math.round(255 * (percent / 100));
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  // Generate category garment artwork
  function renderGarment(product, view, colorHex, defId) {
    const baseColor = colorHex || (product.colors && product.colors[0] ? product.colors[0].hex : "#7A2E3F");
    const lightShade = adjustColor(baseColor, 18);
    const darkShade = adjustColor(baseColor, -22);
    const darkerShade = adjustColor(baseColor, -36);
    const category = product.category || "dresses";
    const style = product.style || "classic";
    const pattern = product.pattern || "solid";

    // Macro Close-Up Detail View
    if (view === "detail") {
      return `
        <!-- Macro Fabric Close-up View -->
        <g transform="translate(0, 0)">
          <rect x="50" y="70" width="300" height="380" rx="16" fill="${baseColor}" filter="drop-shadow(0 8px 24px rgba(0,0,0,0.12))" />
          <rect x="50" y="70" width="300" height="380" rx="16" fill="url(#fold-light-${defId})" opacity="0.4" />
          
          <!-- Diagonal Drapery Folds -->
          <path d="M50 140 Q 200 180 350 130" stroke="${darkShade}" stroke-width="8" fill="none" opacity="0.6" />
          <path d="M50 142 Q 200 182 350 132" stroke="${lightShade}" stroke-width="3" fill="none" opacity="0.8" />
          <path d="M50 240 Q 210 290 350 230" stroke="${darkShade}" stroke-width="10" fill="none" opacity="0.5" />
          <path d="M50 243 Q 210 293 350 233" stroke="${lightShade}" stroke-width="4" fill="none" opacity="0.7" />
          <path d="M50 340 Q 200 380 350 330" stroke="${darkerShade}" stroke-width="8" fill="none" opacity="0.6" />

          <!-- Artisan Stitching Detail -->
          <line x1="120" y1="70" x2="120" y2="450" stroke="${lightShade}" stroke-width="2" stroke-dasharray="5,4" opacity="0.8" />
          <line x1="280" y1="70" x2="280" y2="450" stroke="${lightShade}" stroke-width="2" stroke-dasharray="5,4" opacity="0.8" />
          
          <!-- Mother-of-pearl or Gold button in detail view -->
          <circle cx="200" cy="210" r="18" fill="url(#gold-trim-${defId})" stroke="#FFF" stroke-width="2" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))" />
          <circle cx="200" cy="210" r="14" fill="#FBF6EE" opacity="0.9" />
          <circle cx="196" cy="208" r="2" fill="#7A6040" />
          <circle cx="204" cy="208" r="2" fill="#7A6040" />
          <circle cx="196" cy="212" r="2" fill="#7A6040" />
          <circle cx="204" cy="212" r="2" fill="#7A6040" />
          
          <!-- Lumière Gold Tag -->
          <rect x="155" y="90" width="90" height="26" rx="4" fill="#2B2327" stroke="url(#gold-trim-${defId})" stroke-width="1.5" />
          <text x="200" y="107" font-family="'Playfair Display', serif" font-size="11" font-weight="bold" fill="#C9A66B" letter-spacing="2" text-anchor="middle">LUMIÈRE</text>
        </g>
      `;
    }

    // 1. DRESSES SILHOUETTES
    if (category === "dresses") {
      const isBack = view === "back";
      const neckline = isBack 
        ? "M170 88 Q 200 95 230 88" 
        : (style === "wrap" ? "M160 85 L 210 160 L 240 85" : "M165 85 Q 200 120 235 85");
      const waistWidth = style === "aline" ? 140 : 150;
      const hemWidth = style === "maxi" ? 330 : 290;
      const dressBottom = style === "maxi" ? 480 : 440;

      return `
        <!-- Dress Silhouette -->
        <g id="dress-body">
          <!-- Torso & Skirt -->
          <path d="M165 85 L 140 100 L 125 155 L 160 170 L ${200 - waistWidth/2} 220 
                   Q 160 330 ${200 - hemWidth/2} ${dressBottom} 
                   Q 200 ${dressBottom + 16} ${200 + hemWidth/2} ${dressBottom} 
                   Q 240 330 ${200 + waistWidth/2} 220 
                   L 240 170 L 275 155 L 260 100 L 235 85 Z" 
                fill="${baseColor}" stroke="${darkShade}" stroke-width="1.5" />
          
          <!-- Shoulder Straps / Sleeves drape -->
          <path d="M140 100 Q 120 150 125 190 Q 145 185 155 160 Z" fill="${darkShade}" opacity="0.6" />
          <path d="M260 100 Q 280 150 275 190 Q 255 185 245 160 Z" fill="${darkShade}" opacity="0.6" />

          <!-- Neckline -->
          <path d="${neckline}" fill="none" stroke="${lightShade}" stroke-width="2" />
          ${isBack ? `<path d="M200 95 L 200 170" stroke="${darkerShade}" stroke-width="2" stroke-dasharray="3,3" />` : ""}

          <!-- Draped Waistline & Belt -->
          <path d="M${200 - waistWidth/2} 220 Q 200 230 ${200 + waistWidth/2} 220 L ${200 + waistWidth/2} 234 Q 200 244 ${200 - waistWidth/2} 234 Z" 
                fill="${darkerShade}" />
          ${!isBack ? `
            <circle cx="200" cy="227" r="9" fill="url(#gold-trim-${defId})" stroke="#FFF" stroke-width="1" />
            <!-- Sash ribbon ends -->
            <path d="M200 232 Q 192 280 185 320 L 198 320 Q 204 275 204 232 Z" fill="${darkShade}" />
          ` : `
            <path d="M190 227 Q 200 240 210 227 Q 200 215 190 227" fill="url(#gold-trim-${defId})" />
          `}

          <!-- Skirt Fluting Folds (Sunray / Fluid pleats) -->
          <path d="M175 235 Q 160 350 145 ${dressBottom}" stroke="${darkShade}" stroke-width="3" fill="none" opacity="0.6" />
          <path d="M177 235 Q 162 350 147 ${dressBottom}" stroke="${lightShade}" stroke-width="1.5" fill="none" opacity="0.7" />
          <path d="M200 235 Q 200 360 200 ${dressBottom + 12}" stroke="${darkShade}" stroke-width="4" fill="none" opacity="0.5" />
          <path d="M202 235 Q 202 360 202 ${dressBottom + 12}" stroke="${lightShade}" stroke-width="1.5" fill="none" opacity="0.7" />
          <path d="M225 235 Q 240 350 255 ${dressBottom}" stroke="${darkShade}" stroke-width="3" fill="none" opacity="0.6" />
          <path d="M227 235 Q 242 350 257 ${dressBottom}" stroke="${lightShade}" stroke-width="1.5" fill="none" opacity="0.7" />

          ${pattern === "floral" ? `
            <!-- Delicate Artisan Floral Dots -->
            <g fill="${lightShade}" opacity="0.8">
              <circle cx="160" cy="270" r="3" /><circle cx="165" cy="273" r="2" />
              <circle cx="240" cy="300" r="3" /><circle cx="245" cy="303" r="2" />
              <circle cx="180" cy="380" r="3" /><circle cx="220" cy="420" r="3" />
            </g>
          ` : ""}
        </g>
      `;
    }

    // 2. ABAYAS SILHOUETTES
    if (category === "abayas") {
      const isBack = view === "back";
      return `
        <!-- Abaya Flowing Silhouette -->
        <g id="abaya-body">
          <!-- Main Sweeping Robe -->
          <path d="M165 75 L 125 110 L 70 210 L 105 235 L 140 190 L 110 480 
                   Q 200 500 290 480 L 260 190 L 295 235 L 330 210 L 275 110 L 235 75 Z" 
                fill="${baseColor}" stroke="${darkShade}" stroke-width="2" />
          
          <!-- Inner Shadow / Folds under batwing sleeves -->
          <path d="M140 190 Q 120 330 115 475" stroke="${darkerShade}" stroke-width="5" fill="none" opacity="0.6" />
          <path d="M260 190 Q 280 330 285 475" stroke="${darkerShade}" stroke-width="5" fill="none" opacity="0.6" />

          <!-- Wide Bell Sleeves Trim -->
          <path d="M70 210 L 105 235" stroke="url(#gold-trim-${defId})" stroke-width="5" stroke-linecap="round" />
          <path d="M330 210 L 295 235" stroke="url(#gold-trim-${defId})" stroke-width="5" stroke-linecap="round" />

          <!-- Front Center Placket / Gold Border Opening -->
          ${!isBack ? `
            <line x1="200" y1="85" x2="200" y2="490" stroke="url(#gold-trim-${defId})" stroke-width="4" />
            <line x1="200" y1="85" x2="200" y2="490" stroke="#FFF" stroke-width="1" stroke-dasharray="8,6" opacity="0.7" />
            
            <!-- Concealed Snap buttons -->
            <circle cx="200" cy="150" r="3.5" fill="url(#gold-trim-${defId})" />
            <circle cx="200" cy="220" r="3.5" fill="url(#gold-trim-${defId})" />
            <circle cx="200" cy="290" r="3.5" fill="url(#gold-trim-${defId})" />
            <circle cx="200" cy="360" r="3.5" fill="url(#gold-trim-${defId})" />
          ` : `
            <!-- Back inverted box pleat -->
            <line x1="200" y1="85" x2="200" y2="490" stroke="${darkerShade}" stroke-width="3" opacity="0.7" />
          `}

          <!-- Draped Vertical Folds -->
          <path d="M165 190 Q 170 340 160 485" stroke="${lightShade}" stroke-width="2" fill="none" opacity="0.5" />
          <path d="M235 190 Q 230 340 240 485" stroke="${lightShade}" stroke-width="2" fill="none" opacity="0.5" />

          <!-- Hemline Trim -->
          <path d="M110 480 Q 200 500 290 480" stroke="url(#gold-trim-${defId})" stroke-width="4" fill="none" />
        </g>
      `;
    }

    // 3. TOPS & BLOUSES SILHOUETTES
    if (category === "tops") {
      const isBack = view === "back";
      return `
        <!-- Top / Blouse Silhouette -->
        <g id="top-body">
          <!-- Torso -->
          <path d="M150 90 L 105 130 L 90 270 L 125 275 L 140 185 L 145 370 
                   Q 200 380 255 370 L 260 185 L 275 275 L 310 270 L 295 130 L 250 90 Z" 
                fill="${baseColor}" stroke="${darkShade}" stroke-width="1.5" />
          
          <!-- Puff Sleeve Cuffs -->
          <ellipse cx="108" cy="272" rx="18" ry="6" fill="${darkShade}" />
          <ellipse cx="292" cy="272" rx="18" ry="6" fill="${darkShade}" />

          <!-- Collar / Pussy-Bow -->
          ${!isBack ? `
            <path d="M150 90 Q 200 120 250 90 L 220 135 L 200 125 L 180 135 Z" fill="${lightShade}" stroke="${darkShade}" />
            <!-- Bow or Buttons -->
            <path d="M190 120 C 170 140 170 170 190 155 C 196 150 204 150 210 155 C 230 170 230 140 210 120 Z" 
                  fill="${baseColor}" stroke="${darkShade}" />
            <circle cx="200" cy="135" r="5" fill="url(#gold-trim-${defId})" />
            <path d="M195 150 L 185 220 L 198 215 L 200 150 Z" fill="${darkShade}" />
            <path d="M205 150 L 215 220 L 202 215 L 200 150 Z" fill="${darkShade}" />

            <!-- Front Button Placket -->
            <line x1="200" y1="165" x2="200" y2="370" stroke="${darkShade}" stroke-width="2" />
            <circle cx="200" cy="200" r="3" fill="url(#gold-trim-${defId})" />
            <circle cx="200" cy="250" r="3" fill="url(#gold-trim-${defId})" />
            <circle cx="200" cy="300" r="3" fill="url(#gold-trim-${defId})" />
          ` : `
            <path d="M150 90 Q 200 98 250 90" stroke="${lightShade}" stroke-width="2" fill="none" />
            <circle cx="200" cy="115" r="4" fill="url(#gold-trim-${defId})" />
            <line x1="200" y1="120" x2="200" y2="155" stroke="${darkerShade}" stroke-width="2" stroke-dasharray="2,2" />
          `}

          <!-- Gentle Fabric Highlights -->
          <path d="M165 190 Q 170 280 165 365" stroke="${lightShade}" stroke-width="2" fill="none" opacity="0.6" />
          <path d="M235 190 Q 230 280 235 365" stroke="${lightShade}" stroke-width="2" fill="none" opacity="0.6" />
        </g>
      `;
    }

    // 4. PANTS & JEANS SILHOUETTES
    if (category === "pants") {
      const isBack = view === "back";
      const isWide = style === "palazzo" || style === "wide";
      const legLeft = isWide ? 95 : 125;
      const legRight = isWide ? 305 : 275;

      return `
        <!-- Trousers / Jeans Silhouette -->
        <g id="pants-body">
          <!-- Waistband -->
          <path d="M130 90 L 270 90 L 265 125 L 135 125 Z" fill="${darkShade}" stroke="${darkerShade}" stroke-width="1.5" />
          <circle cx="200" cy="107" r="5" fill="url(#gold-trim-${defId})" stroke="#FFF" stroke-width="1" />
          <!-- Belt Loops -->
          <rect x="150" y="88" width="4" height="38" fill="${darkerShade}" />
          <rect x="246" y="88" width="4" height="38" fill="${darkerShade}" />

          <!-- Left & Right Legs -->
          <path d="M135 125 L 200 135 L 265 125 L 285 470 L 220 470 L 200 240 L 180 470 L 115 470 Z" 
                fill="${baseColor}" stroke="${darkShade}" stroke-width="2" />

          ${!isBack ? `
            <!-- Front Fly & Scoop Pockets -->
            <path d="M200 135 L 200 215 Q 190 220 185 210" stroke="${darkerShade}" stroke-width="2" fill="none" />
            <path d="M135 125 Q 165 130 160 170" stroke="${darkerShade}" stroke-width="2" stroke-dasharray="3,2" fill="none" />
            <path d="M265 125 Q 235 130 240 170" stroke="${darkerShade}" stroke-width="2" stroke-dasharray="3,2" fill="none" />
          ` : `
            <!-- Back Patch Pockets -->
            <path d="M145 140 L 180 140 L 180 180 L 162 195 L 145 180 Z" fill="${darkShade}" stroke="${darkerShade}" stroke-width="1.5" />
            <path d="M220 140 L 255 140 L 255 180 L 237 195 L 220 180 Z" fill="${darkShade}" stroke="${darkerShade}" stroke-width="1.5" />
          `}

          <!-- Crease / Inseam stitching -->
          <line x1="155" y1="130" x2="150" y2="465" stroke="${lightShade}" stroke-width="2" opacity="0.6" />
          <line x1="245" y1="130" x2="250" y2="465" stroke="${lightShade}" stroke-width="2" opacity="0.6" />
        </g>
      `;
    }

    // 5. SKIRTS SILHOUETTES
    if (category === "skirts") {
      const isBack = view === "back";
      const isPleated = style === "pleated";
      return `
        <!-- Skirt Silhouette -->
        <g id="skirt-body">
          <!-- Waistband -->
          <path d="M140 110 L 260 110 L 255 140 L 145 140 Z" fill="${darkShade}" stroke="${darkerShade}" stroke-width="1.5" />
          
          <!-- Skirt Flare -->
          <path d="M145 140 Q 130 300 100 465 Q 200 480 300 465 Q 270 300 255 140 Z" 
                fill="${baseColor}" stroke="${darkShade}" stroke-width="2" />

          <!-- Accordion / Sunray Pleats or Seams -->
          ${isPleated ? `
            <g stroke="${darkShade}" stroke-width="2.5" opacity="0.6">
              <line x1="160" y1="140" x2="135" y2="468" />
              <line x1="180" y1="140" x2="170" y2="473" />
              <line x1="200" y1="140" x2="200" y2="475" />
              <line x1="220" y1="140" x2="230" y2="473" />
              <line x1="240" y1="140" x2="265" y2="468" />
            </g>
            <g stroke="${lightShade}" stroke-width="1.5" opacity="0.8">
              <line x1="162" y1="140" x2="137" y2="468" />
              <line x1="182" y1="140" x2="172" y2="473" />
              <line x1="202" y1="140" x2="202" y2="475" />
              <line x1="222" y1="140" x2="232" y2="473" />
              <line x1="242" y1="140" x2="267" y2="468" />
            </g>
          ` : `
            <!-- Fluid Drapery Folds -->
            <path d="M175 140 Q 165 300 155 470" stroke="${darkShade}" stroke-width="3" fill="none" opacity="0.5" />
            <path d="M225 140 Q 235 300 245 470" stroke="${darkShade}" stroke-width="3" fill="none" opacity="0.5" />
          `}

          <!-- Front Walking Slit for Denim Column Skirts -->
          ${style === "slit" && !isBack ? `
            <line x1="200" y1="340" x2="200" y2="475" stroke="${darkerShade}" stroke-width="3" />
            <path d="M198 340 L 190 473 L 200 475 L 202 340 Z" fill="#FFF" opacity="0.15" />
          ` : ""}
        </g>
      `;
    }

    // 6. SETS & CO-ORDS SILHOUETTES
    if (category === "sets") {
      return `
        <!-- Co-Ord Set: Top & Wide Trousers combo -->
        <g id="sets-body">
          <!-- Pants Bottom -->
          <path d="M145 230 L 255 230 L 275 470 L 215 470 L 200 310 L 185 470 L 125 470 Z" 
                fill="${darkShade}" stroke="${darkerShade}" stroke-width="1.5" />
          
          <!-- Top / Tunic Overlay -->
          <path d="M150 75 L 110 110 L 95 240 L 130 245 L 140 170 L 140 280 
                   Q 200 295 260 280 L 260 170 L 270 245 L 305 240 L 290 110 L 250 75 Z" 
                fill="${baseColor}" stroke="${darkShade}" stroke-width="2" />
          
          <!-- Tunic V-Neck / Placket -->
          <path d="M170 75 L 200 130 L 230 75" fill="none" stroke="${lightShade}" stroke-width="2" />
          <line x1="200" y1="130" x2="200" y2="285" stroke="${darkerShade}" stroke-width="2" />
          
          <!-- Matching Sash Belt -->
          <rect x="140" y="195" width="120" height="14" rx="3" fill="url(#gold-trim-${defId})" />
          <circle cx="200" cy="202" r="7" fill="#2B2327" stroke="#FFF" stroke-width="1" />
        </g>
      `;
    }

    // 7. JACKETS & CARDIGANS SILHOUETTES
    if (category === "jackets") {
      const isBack = view === "back";
      return `
        <!-- Jacket / Blazer / Trench Silhouette -->
        <g id="jacket-body">
          <!-- Main Structure -->
          <path d="M140 80 L 95 120 L 75 320 L 115 325 L 130 200 L 125 430 
                   L 275 430 L 270 200 L 285 325 L 325 320 L 305 120 L 260 80 Z" 
                fill="${baseColor}" stroke="${darkShade}" stroke-width="2" />

          <!-- Tailored Peaked Lapels & Collar -->
          ${!isBack ? `
            <!-- Left & Right Lapels -->
            <path d="M150 80 L 180 170 L 145 195 L 175 240 L 130 200 Z" fill="${darkShade}" stroke="${darkerShade}" stroke-width="1" />
            <path d="M250 80 L 220 170 L 255 195 L 225 240 L 270 200 Z" fill="${darkShade}" stroke="${darkerShade}" stroke-width="1" />
            <path d="M175 240 L 200 310 L 200 430" stroke="${darkerShade}" stroke-width="2" />

            <!-- Flap Pockets -->
            <rect x="135" y="300" width="45" height="18" rx="2" fill="${darkShade}" stroke="${darkerShade}" />
            <rect x="220" y="300" width="45" height="18" rx="2" fill="${darkShade}" stroke="${darkerShade}" />

            <!-- Double-breasted Horn or Gold Buttons -->
            <circle cx="185" cy="260" r="5" fill="url(#gold-trim-${defId})" stroke="#FFF" stroke-width="1" />
            <circle cx="215" cy="260" r="5" fill="url(#gold-trim-${defId})" stroke="#FFF" stroke-width="1" />
            <circle cx="185" cy="305" r="5" fill="url(#gold-trim-${defId})" stroke="#FFF" stroke-width="1" />
            <circle cx="215" cy="305" r="5" fill="url(#gold-trim-${defId})" stroke="#FFF" stroke-width="1" />
          ` : `
            <!-- Back Center Vent & Storm Flap -->
            <path d="M140 80 Q 200 130 260 80 L 255 140 Q 200 160 145 140 Z" fill="${darkShade}" />
            <line x1="200" y1="320" x2="200" y2="430" stroke="${darkerShade}" stroke-width="2" stroke-dasharray="4,3" />
          `}
        </g>
      `;
    }

    // 8. HIJAB & SCARVES SILHOUETTES
    if (category === "hijab") {
      return `
        <!-- Hijab Draped Rectangular Scarf Silhouette -->
        <g id="hijab-body">
          <!-- Flowing Cascading Drape -->
          <path d="M120 90 Q 200 65 280 90 Q 320 220 290 420 Q 200 445 110 420 Q 80 220 120 90 Z" 
                fill="${baseColor}" stroke="${darkShade}" stroke-width="1.5" />
          
          <!-- Soft Fold Waves -->
          <path d="M140 130 Q 200 180 260 130" stroke="${lightShade}" stroke-width="4" fill="none" opacity="0.7" />
          <path d="M130 200 Q 205 270 270 195" stroke="${darkShade}" stroke-width="5" fill="none" opacity="0.6" />
          <path d="M132 203 Q 205 273 272 198" stroke="${lightShade}" stroke-width="2" fill="none" opacity="0.8" />
          <path d="M120 290 Q 200 360 280 290" stroke="${darkShade}" stroke-width="6" fill="none" opacity="0.5" />
          <path d="M122 293 Q 200 363 282 293" stroke="${lightShade}" stroke-width="2" fill="none" opacity="0.8" />
          <path d="M115 375 Q 200 420 285 375" stroke="${darkShade}" stroke-width="4" fill="none" opacity="0.4" />

          <!-- Fine Laser-Cut Finished Border or Eyelash Fringe -->
          <path d="M110 420 Q 200 445 290 420" stroke="url(#gold-trim-${defId})" stroke-width="3" fill="none" />
          <line x1="110" y1="422" x2="290" y2="422" stroke="${lightShade}" stroke-width="1" stroke-dasharray="2,2" />
        </g>
      `;
    }

    // 9. SLEEPWEAR SILHOUETTES
    if (category === "sleepwear") {
      const isNightdress = style === "slip" || style === "nightdress";
      if (isNightdress) {
        return `
          <!-- Satin Nightdress Slip -->
          <g id="sleepwear-slip">
            <!-- Delicate Spaghetti Straps -->
            <line x1="165" y1="80" x2="160" y2="135" stroke="url(#gold-trim-${defId})" stroke-width="2" />
            <line x1="235" y1="80" x2="240" y2="135" stroke="url(#gold-trim-${defId})" stroke-width="2" />

            <!-- Body -->
            <path d="M160 135 Q 200 155 240 135 L 255 230 Q 265 370 275 460 Q 200 475 125 460 Q 135 370 145 230 Z" 
                  fill="${baseColor}" stroke="${darkShade}" stroke-width="1.5" />
            
            <!-- French Eyelash Lace Yoke -->
            <path d="M160 135 Q 200 160 240 135 L 235 170 Q 200 185 165 170 Z" fill="${darkShade}" stroke="url(#gold-trim-${defId})" stroke-dasharray="2,2" />
            <!-- Satin Bias Fluid Highlights -->
            <path d="M170 210 Q 160 330 150 455" stroke="${lightShade}" stroke-width="3" fill="none" opacity="0.6" />
            <path d="M230 210 Q 240 330 250 455" stroke="${lightShade}" stroke-width="3" fill="none" opacity="0.6" />
          </g>
        `;
      }
      return `
        <!-- Satin PJ Two-Piece with Contrast Piping -->
        <g id="sleepwear-pj">
          <!-- Pants -->
          <path d="M145 240 L 255 240 L 270 470 L 215 470 L 200 330 L 185 470 L 130 470 Z" 
                fill="${baseColor}" stroke="${darkShade}" stroke-width="1.5" />
          
          <!-- Jacket Top -->
          <path d="M150 85 L 110 120 L 95 240 L 130 245 L 140 180 L 140 280 
                   L 260 280 L 260 180 L 270 245 L 305 240 L 290 120 L 250 85 Z" 
                fill="${baseColor}" stroke="${darkShade}" stroke-width="2" />
          
          <!-- Notch Collar & Contrast Piping -->
          <path d="M150 85 L 175 140 L 155 160 L 185 200 L 200 200 L 215 200 L 245 160 L 225 140 L 250 85" 
                stroke="#FFF" stroke-width="2.5" fill="none" />
          <!-- Pearl Buttons -->
          <circle cx="200" cy="225" r="4" fill="#FFF" stroke="${darkShade}" />
          <circle cx="200" cy="255" r="4" fill="#FFF" stroke="${darkShade}" />
          <!-- Chest Pocket -->
          <rect x="220" y="195" width="28" height="26" rx="2" fill="${darkShade}" stroke="#FFF" stroke-width="1" />
        </g>
      `;
    }

    // 10. ACTIVEWEAR SILHOUETTES
    if (category === "activewear") {
      return `
        <!-- High-Performance Activewear Set -->
        <g id="activewear-body">
          <!-- Sculpt Leggings -->
          <path d="M140 200 L 260 200 L 250 470 L 212 470 L 200 290 L 188 470 L 150 470 Z" 
                fill="${darkerShade}" stroke="${darkShade}" stroke-width="2" />
          
          <!-- Leggings Ergonomic Contour Seams -->
          <path d="M140 200 Q 185 240 188 465" stroke="${lightShade}" stroke-width="2" fill="none" opacity="0.7" />
          <path d="M260 200 Q 215 240 212 465" stroke="${lightShade}" stroke-width="2" fill="none" opacity="0.7" />

          <!-- High-Rise Band -->
          <rect x="140" y="200" width="120" height="22" rx="3" fill="${baseColor}" />

          <!-- Cropped / Full Performance Top -->
          <path d="M155 85 L 115 115 L 105 210 L 135 215 L 145 160 L 145 205 L 255 205 L 255 160 L 265 215 L 295 210 L 285 115 L 245 85 Z" 
                fill="${baseColor}" stroke="${darkShade}" stroke-width="2" />
          
          <!-- Aeration Mesh Panel -->
          <path d="M170 85 Q 200 125 230 85 L 220 135 Q 200 155 180 135 Z" fill="${darkShade}" opacity="0.8" />
          
          <!-- Thumbholes on Cuffs -->
          <circle cx="120" cy="208" r="3" fill="${darkerShade}" />
          <circle cx="280" cy="208" r="3" fill="${darkerShade}" />
        </g>
      `;
    }

    // Default fallback
    return `
      <g>
        <path d="M150 100 L 250 100 L 270 440 L 130 440 Z" fill="${baseColor}" stroke="${darkShade}" stroke-width="2" />
      </g>
    `;
  }

  /**
   * Main Generator Function:
   * renderProductImage(product, view, colorHex)
   * Returns a lightweight inline SVG string or clean data URI.
   */
  function renderProductImage(product, view = "front", colorHex = null) {
    if (!product) return "";
    
    // Check if real local image exists via config
    if (typeof STORE_CONFIG !== "undefined" && STORE_CONFIG.imageBasePath) {
      const viewNum = view === "back" ? 2 : (view === "detail" ? 3 : 1);
      return `${STORE_CONFIG.imageBasePath.replace(/\/+$/, "")}/${product.id}-${viewNum}.jpg`;
    }

    const selectedColor = colorHex || (product.colors && product.colors[0] ? product.colors[0].hex : "#7A2E3F");
    const cacheKey = `${product.id}_${view}_${selectedColor.toUpperCase()}`;

    if (svgCache.has(cacheKey)) {
      return svgCache.get(cacheKey);
    }

    const defId = `${product.id}-${view}-${selectedColor.replace("#", "")}`;
    const backgroundSvg = getStudioBackground(defId);
    const garmentSvg = renderGarment(product, view, selectedColor, defId);

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">${backgroundSvg}${garmentSvg}</svg>`;

    // Store as data-URI for zero network requests and direct <img src="..."> usage
    const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
    svgCache.set(cacheKey, dataUri);
    return dataUri;
  }

  // Clear cache for color mutations if needed
  function clearImageCache() {
    svgCache.clear();
  }

  // Expose to window
  window.LumiereImages = {
    renderProductImage,
    clearImageCache
  };

  // Global helper for simple access
  window.renderProductImage = renderProductImage;
})();
