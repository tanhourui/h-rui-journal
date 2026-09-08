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

// Curated selection for the chapters
const curatedImages = [
  // Chapter 1: Tokyo Light & Movement
  "japan25_1123_todai_ginkgo_gothic_colonnade_DSC00339.jpg", // Hero
  "japan25_1122_sensoji_hozomon_night_DSC00166.jpg",         // Sub 1
  "japan25_1123_ochanomizu_hijiribashi_trains_DSC00444.jpg",   // Sub 2
  "japan25_1124_odaiba_mt_fuji_sunset_skyline_DSC00732.jpg",   // Extra feature

  // Chapter 2: Lake Yamanaka & Kawaguchiko
  "japan25_1126_yamanaka_mute_swan_wings_morning_mist_DSC00959.jpg", // Hero
  "japan25_1126_yamanaka_predawn_blue_hour_fuji_DSC00915.jpg",       // Sub 1
  "japan25_1126_kawaguchiko_momiji_tunnel_bridge_crowd_DSC01171.jpg", // Sub 2
  "japan25_1126_yamanaka_frost_boardwalk_fuji_DSC00992.jpg",         // Extra
  "japan25_1126_kawaguchiko_momiji_glowing_red_leaves_DSC01158.jpg", // Extra

  // Chapter 3: Tokyo Autumn Details & Everyday Moments
  "japan25_1127_tokyo_station_marunouchi_redbrick_DSC01332.jpg",      // Hero
  "japan25_1128_park_mamachari_red_maple_canopy_DSC01404.jpg",        // Sub 1
  "japan25_1128_still_life_crimson_leaf_wet_stone_DSC01409.jpg",      // Sub 2
  "japan25_1127_ueno_ginkgo_leaves_wooden_bench_DSC01229.jpg",        // Extra
  "japan25_1122_asakusa_kirin_vending_DSC00201.jpg"                   // Extra
];

console.log(`Starting image optimization for ${curatedImages.length} curated photographs...`);

async function processImages() {
  for (const file of curatedImages) {
    const srcPath = path.join(SOURCE_DIR, file);
    const destPath = path.join(OUTPUT_DIR, file);

    if (!fs.existsSync(srcPath)) {
      console.warn(`File not found: ${srcPath}`);
      continue;
    }

    try {
      // Resize to max 2048px width, quality 85% progressive JPEG with sharp details
      await sharp(srcPath)
        .resize({ width: 2048, withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true, mozjpeg: true })
        .toFile(destPath);

      const srcSizeMb = (fs.statSync(srcPath).size / (1024 * 1024)).toFixed(2);
      const destSizeKb = (fs.statSync(destPath).size / 1024).toFixed(0);
      console.log(`✓ Optimized ${file}: ${srcSizeMb}MB -> ${destSizeKb}KB`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }
  console.log(`\nAll images successfully processed into public/images/japan25/!`);
}

processImages();
