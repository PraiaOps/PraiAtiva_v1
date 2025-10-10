// Simple icon generator using sharp
// Generates apple-touch-icon.png (180x180) and png equivalents from SVGs
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

(async () => {
  try {
    const iconsDir = path.join(__dirname, '..', 'public', 'icons');
    const svg512 = path.join(iconsDir, 'icon-512.svg');
    const svg192 = path.join(iconsDir, 'icon-192.svg');

    if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

    if (fs.existsSync(svg512)) {
      await sharp(svg512)
        .resize(512, 512)
        .png()
        .toFile(path.join(iconsDir, 'icon-512.png'));
      console.log('Generated icon-512.png');
    }

    if (fs.existsSync(svg192)) {
      await sharp(svg192)
        .resize(192, 192)
        .png()
        .toFile(path.join(iconsDir, 'icon-192.png'));
      console.log('Generated icon-192.png');
    }

    // apple-touch-icon 180x180
    if (fs.existsSync(svg512)) {
      await sharp(svg512)
        .resize(180, 180)
        .png()
        .toFile(path.join(iconsDir, 'apple-touch-icon.png'));
      console.log('Generated apple-touch-icon.png');
    }

  } catch (err) {
    console.error('Error generating icons:', err);
    process.exit(1);
  }
})();
