import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = "C:\\Users\\Admin\\OneDrive\\Pictures\\for antigravity\\JAPAN 25";
const OUTPUT_DIR = path.resolve(__dirname, '../public/images/japan25');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const allFiles = fs.readdirSync(SOURCE_DIR).filter(f => f.toLowerCase().endsWith('.jpg'));

console.log(`Found ${allFiles.length} photos to optimize in ${SOURCE_DIR}...`);

async function processImages() {
  let count = 0;
  for (const file of allFiles) {
    const srcPath = path.join(SOURCE_DIR, file);
    const destPath = path.join(OUTPUT_DIR, file);

    // If destination exists and is newer than source, skip unless forced
    if (fs.existsSync(destPath)) {
      const srcMtime = fs.statSync(srcPath).mtime;
      const destMtime = fs.statSync(destPath).mtime;
      if (destMtime >= srcMtime) {
        continue;
      }
    }

    try {
      // Resize to max 2048px width, quality 85% progressive JPEG with sharp details
      await sharp(srcPath)
        .resize({ width: 2048, withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true, mozjpeg: true })
        .toFile(destPath);

      const srcSizeMb = (fs.statSync(srcPath).size / (1024 * 1024)).toFixed(2);
      const destSizeKb = (fs.statSync(destPath).size / 1024).toFixed(0);
      count++;
      console.log(`[${count}] ✓ Optimized ${file}: ${srcSizeMb}MB -> ${destSizeKb}KB`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  // Remove deleted files from OUTPUT_DIR if any
  const outputFiles = fs.readdirSync(OUTPUT_DIR);
  const currentSet = new Set(allFiles);
  for (const out of outputFiles) {
    if (!currentSet.has(out)) {
      try {
        fs.unlinkSync(path.join(OUTPUT_DIR, out));
        console.log(`Removed deleted asset: ${out}`);
      } catch (e) {}
    }
  }

  console.log(`\nBatch optimization complete. Total current photos: ${allFiles.length}`);
}

processImages();
