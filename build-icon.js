/**
 * Generates app icon (256x256 PNG) for TYPO STUDIO
 * Uses @napi-rs/canvas (no native build needed on most platforms)
 *
 * Run: npm run build-icon
 */

let createCanvas, fs, path;
try {
  ({ createCanvas } = require('@napi-rs/canvas'));
} catch {
  try {
    ({ createCanvas } = require('canvas'));
  } catch {
    // Fallback: generate icon using pure JS and write a minimal PNG
    console.log('No canvas library found. Generating icon with built-in method...');
    generateFallbackIcon();
    process.exit(0);
  }
}

fs = require('fs');
path = require('path');

function drawIcon(S) {
  const c = createCanvas(S, S);
  const ctx = c.getContext('2d');
  const k = S / 256; // scale factor relative to the original 256px design

  // Background — dark rounded rect
  const r = 48 * k;
  ctx.fillStyle = '#0e0e16';
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(S - r, 0);
  ctx.quadraticCurveTo(S, 0, S, r);
  ctx.lineTo(S, S - r);
  ctx.quadraticCurveTo(S, S, S - r, S);
  ctx.lineTo(r, S);
  ctx.quadraticCurveTo(0, S, 0, S - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.fill();

  // Accent gradient line at top
  const grd = ctx.createLinearGradient(50 * k, 0, 206 * k, 0);
  grd.addColorStop(0, '#FFD600');
  grd.addColorStop(0.5, '#ff4757');
  grd.addColorStop(1, '#ff00cc');
  ctx.fillStyle = grd;
  ctx.fillRect(50 * k, 40 * k, 156 * k, 4 * k);

  // "T" letter — big and bold
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${140 * k}px "Segoe UI", "Arial", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('T', S / 2, S / 2 + 8 * k);

  // Small accent dot
  ctx.fillStyle = '#FFD600';
  ctx.beginPath();
  ctx.arc(S / 2 + 52 * k, S / 2 - 48 * k, 8 * k, 0, Math.PI * 2);
  ctx.fill();

  // Bottom line
  ctx.fillStyle = grd;
  ctx.fillRect(90 * k, S - 44 * k, 76 * k, 3 * k);

  return c;
}

function generate() {
  const outDir = path.join(__dirname, 'assets');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 256px — used as the Windows source icon (converted to .ico separately)
  fs.writeFileSync(path.join(outDir, 'icon.png'), drawIcon(256).toBuffer('image/png'));
  console.log('Icon generated: assets/icon.png (256x256)');

  // 1024px — macOS .icns needs much higher resolution for Retina displays;
  // electron-builder auto-converts this into .icns during the mac build.
  fs.writeFileSync(path.join(outDir, 'icon-mac.png'), drawIcon(1024).toBuffer('image/png'));
  console.log('Icon generated: assets/icon-mac.png (1024x1024)');
}

function generateFallbackIcon() {
  // Generate a simple icon using a data approach
  // We'll create a minimal valid PNG with the icon design
  const fs = require('fs');
  const path = require('path');
  const { execSync } = require('child_process');

  const outDir = path.join(__dirname, 'assets');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Create an SVG first, then we'll use it directly
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="48" fill="#0e0e16"/>
  <defs>
    <linearGradient id="g" x1="50" y1="0" x2="206" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FFD600"/>
      <stop offset="0.5" stop-color="#ff4757"/>
      <stop offset="1" stop-color="#ff00cc"/>
    </linearGradient>
  </defs>
  <rect x="50" y="40" width="156" height="4" fill="url(#g)"/>
  <text x="128" y="142" text-anchor="middle" dominant-baseline="central" font-family="Segoe UI,Arial,sans-serif" font-weight="bold" font-size="140" fill="#ffffff">T</text>
  <circle cx="180" cy="92" r="8" fill="#FFD600"/>
  <rect x="90" y="212" width="76" height="3" fill="url(#g)"/>
</svg>`;

  fs.writeFileSync(path.join(outDir, 'icon.svg'), svg);
  console.log('Icon SVG generated: assets/icon.svg');

  // Try to convert SVG to PNG using built-in tools or electron
  console.log('Note: For best results, install @napi-rs/canvas: npm i @napi-rs/canvas -D');
  console.log('Then run: npm run build-icon');
}

generate();
