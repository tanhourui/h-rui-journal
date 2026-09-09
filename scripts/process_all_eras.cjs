const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const stripBom = s => s.replace(/^\uFEFF/, '');

const p23Src = 'C:\\Users\\Admin\\OneDrive\\Pictures\\for antigravity\\JAPAN 23';
const p24Src = 'C:\\Users\\Admin\\OneDrive\\Pictures\\for antigravity\\JAPAN 24';

const p23Out = path.resolve(__dirname, '../public/images/japan23');
const p24Out = path.resolve(__dirname, '../public/images/japan24');
const dataDir = path.resolve(__dirname, '../src/data');

if (!fs.existsSync(p23Out)) fs.mkdirSync(p23Out, { recursive: true });
if (!fs.existsSync(p24Out)) fs.mkdirSync(p24Out, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Read existing metadata JSONs
const j23Meta = JSON.parse(stripBom(fs.readFileSync(path.resolve(__dirname, '../japan23_metadata.json'), 'utf8')));
const j24Meta = JSON.parse(stripBom(fs.readFileSync(path.resolve(__dirname, '../japan24_metadata.json'), 'utf8')));

// Mapping for JAPAN 23 (45 files)
const j23Files = fs.readdirSync(p23Src).filter(f => f.toLowerCase().endsWith('.jpg')).sort();

const j23Map = [
  { orig: '001-01.jpg', target: 'japan23_1007_klia_boarding_departure_001.jpg', chapter: 'tokyo-first-impressions', title: 'Departure Gate & AirAsia Wings', region: 'KLIA / Transit' },
  { orig: 'IMG_20231007_131753.jpg', target: 'japan23_1007_inflight_wing_clouds_002.jpg', chapter: 'tokyo-first-impressions', title: 'Pacific Cloudbreak at 30,000 Feet', region: 'In-Flight' },
  { orig: 'IMG_20231007_174349.jpg', target: 'japan23_1007_tokyo_evening_skyline_003.jpg', chapter: 'tokyo-first-impressions', title: 'Tokyo Metropolis Dusk Arrival', region: 'Tokyo Urban' },
  { orig: 'IMG_20231008_090435.jpg', target: 'japan23_1008_asakusa_sensoji_pagoda_004.jpg', chapter: 'tokyo-first-impressions', title: 'Five-Story Pagoda Morning Light', region: 'Asakusa' },
  { orig: 'IMG_20231008_091054.jpg', target: 'japan23_1008_asakusa_nakamise_street_005.jpg', chapter: 'tokyo-first-impressions', title: 'Nakamise Dori Shutter Awakening', region: 'Asakusa' },
  { orig: 'IMG_20231008_091243.jpg', target: 'japan23_1008_asakusa_hozomon_gate_006.jpg', chapter: 'tokyo-first-impressions', title: 'Hozomon Gate Eaves & Vermilion Tiles', region: 'Asakusa' },
  { orig: 'IMG_20231008_101954.jpg', target: 'japan23_1008_asakusa_lantern_detail_007.jpg', chapter: 'tokyo-first-impressions', title: 'Chochin Paper Craft & Calligraphy', region: 'Asakusa' },
  { orig: 'IMG_20231008_103730.jpg', target: 'japan23_1008_asakusa_temple_eaves_008.jpg', chapter: 'tokyo-first-impressions', title: 'Temple Gables & Blue October Sky', region: 'Asakusa' },
  { orig: 'IMG_20231008_104510.jpg', target: 'japan23_1008_asakusa_incense_smoke_009.jpg', chapter: 'tokyo-first-impressions', title: 'Jokoro Incense Burner Swirls', region: 'Asakusa' },
  { orig: 'IMG_20231008_113153.jpg', target: 'japan23_1008_asakusa_street_crowd_010.jpg', chapter: 'tokyo-first-impressions', title: 'Pilgrim Stream along Asakusa Arcade', region: 'Asakusa' },
  { orig: 'IMG_20231008_134040.jpg', target: 'japan23_1008_meiji_jingu_wedding_procession_011.jpg', chapter: 'tokyo-first-impressions', title: 'Meiji Jingu Shinto Wedding Procession', region: 'Meiji Jingu' },
  { orig: 'IMG_20231008_134616.jpg', target: 'japan23_1008_meiji_jingu_red_parasol_012.jpg', chapter: 'tokyo-first-impressions', title: 'The Vermilion Parasol & Courtyard Gravel', region: 'Meiji Jingu' },
  { orig: 'IMG_20231008_135613.jpg', target: 'japan23_1008_meiji_jingu_forest_path_013.jpg', chapter: 'tokyo-first-impressions', title: 'Sacred Cedar Forest Canopy', region: 'Meiji Jingu' },
  { orig: 'IMG_20231008_145503.jpg', target: 'japan23_1008_meiji_jingu_wooden_torii_014.jpg', chapter: 'tokyo-first-impressions', title: 'Grand Wooden Torii Portal', region: 'Meiji Jingu' },
  { orig: 'IMG_20231008_194923.jpg', target: 'japan23_1008_roppongi_tokyo_tower_night_015.jpg', chapter: 'tokyo-first-impressions', title: 'Tokyo Tower Crimson Beacon from Roppongi', region: 'Roppongi' },
  { orig: 'IMG_20231009_092409.jpg', target: 'japan23_1009_tokyo_rainy_crossing_016.jpg', chapter: 'tokyo-first-impressions', title: 'Morning Drizzle across the Crosswalk', region: 'Minato' },
  { orig: 'IMG_20231009_111423.jpg', target: 'japan23_1009_tokyo_rain_umbrella_walk_017.jpg', chapter: 'tokyo-first-impressions', title: 'Vinyl Umbrellas on Rainy Pavement', region: 'Minato' },
  { orig: 'IMG_20231009_115212.jpg', target: 'japan23_1009_tokyo_tower_umbrella_view_018.jpg', chapter: 'tokyo-first-impressions', title: 'Tokyo Tower Framed Through Clear Canopy', region: 'Shiba Koen' },
  { orig: 'IMG_20231009_135055.jpg', target: 'japan23_1009_tokyo_wet_asphalt_neon_019.jpg', chapter: 'tokyo-first-impressions', title: 'Reflections on Wet Asphalt', region: 'Minato' },
  { orig: 'IMG_20231009_171625.jpg', target: 'japan23_1009_tokyo_shibuya_overpass_020.jpg', chapter: 'tokyo-first-impressions', title: 'Pedestrian Overpass at Blue Hour', region: 'Shibuya' },
  { orig: 'IMG_20231009_174005.jpg', target: 'japan23_1009_tokyo_dusk_traffic_trails_021.jpg', chapter: 'tokyo-first-impressions', title: 'Traffic Light Ribbons in October Mist', region: 'Shibuya' },
  { orig: 'IMG_20231009_175954.jpg', target: 'japan23_1009_tokyo_evening_commute_022.jpg', chapter: 'tokyo-first-impressions', title: 'Rush Hour Rhythm beneath Elevated Rails', region: 'Shibuya' },
  { orig: 'IMG_20231010_114420.jpg', target: 'japan23_1010_kawaguchiko_ropeway_panorama_023.jpg', chapter: 'kawaguchiko-fuji-reeds', title: 'Tenjoyama Ropeway Lake Vista', region: 'Kawaguchiko' },
  { orig: 'IMG_20231010_171838.jpg', target: 'japan23_1010_kawaguchiko_lake_sunset_024.jpg', chapter: 'kawaguchiko-fuji-reeds', title: 'Sunset Glow over Still Lake Waters', region: 'Kawaguchiko' },
  { orig: 'IMG_20231010_173018.jpg', target: 'japan23_1010_kawaguchiko_dusk_mountains_025.jpg', chapter: 'kawaguchiko-fuji-reeds', title: 'Silhouette of the Southern Alps', region: 'Kawaguchiko' },
  { orig: 'IMG_20231011_060205.jpg', target: 'japan23_1011_kawaguchiko_fuji_dawn_reeds_026.jpg', chapter: 'kawaguchiko-fuji-reeds', title: 'Dawn Peak Framed with Autumn Reeds', region: 'Kawaguchiko' },
  { orig: 'IMG_20231011_060539.jpg', target: 'japan23_1011_kawaguchiko_fuji_susuki_glow_027.jpg', chapter: 'kawaguchiko-fuji-reeds', title: 'Silver Susuki Plumes Catching Morning Light', region: 'Kawaguchiko' },
  { orig: 'IMG_20231011_062423.jpg', target: 'japan23_1011_kawaguchiko_morning_light_reeds_028.jpg', chapter: 'kawaguchiko-fuji-reeds', title: 'First Rays Warming the Lakeside Grasses', region: 'Kawaguchiko' },
  { orig: 'IMG_20231011_065954.jpg', target: 'japan23_1011_kawaguchiko_fuji_clean_peak_029.jpg', chapter: 'kawaguchiko-fuji-reeds', title: 'Solitary Volcanic Cone in Crisp Air', region: 'Kawaguchiko' },
  { orig: 'IMG_20231011_071337.jpg', target: 'japan23_1011_kawaguchiko_lakeside_autumn_grass_030.jpg', chapter: 'kawaguchiko-fuji-reeds', title: 'Lakeside Walking Path in Morning Quiet', region: 'Kawaguchiko' },
  { orig: 'IMG_20231011_075038.jpg', target: 'japan23_1011_kawaguchiko_panoramic_shoreline_031.jpg', chapter: 'kawaguchiko-fuji-reeds', title: 'Panoramic Calm of Lake Kawaguchiko', region: 'Kawaguchiko' },
  { orig: 'IMG_20231012_110220.jpg', target: 'japan23_1012_kyoto_higashiyama_stone_steps_032.jpg', chapter: 'kyoto-ancient-capital', title: 'Higashiyama Flagstone Steps', region: 'Higashiyama' },
  { orig: 'IMG_20231012_113051.jpg', target: 'japan23_1012_kyoto_higashiyama_yukata_walk_033.jpg', chapter: 'kyoto-ancient-capital', title: 'Yukata Stroll past Wooden Machiya', region: 'Higashiyama' },
  { orig: 'IMG_20231012_113510.jpg', target: 'japan23_1012_kyoto_machiya_wooden_lattice_034.jpg', chapter: 'kyoto-ancient-capital', title: 'Koshi Lattice Windows & Eaves Shadow', region: 'Higashiyama' },
  { orig: 'IMG_20231012_125736.jpg', target: 'japan23_1012_kyoto_yasaka_pagoda_hokanji_035.jpg', chapter: 'kyoto-ancient-capital', title: 'Yasaka Pagoda Hokan-ji Rising above Alleys', region: 'Higashiyama' },
  { orig: 'IMG_20231012_131256.jpg', target: 'japan23_1012_kyoto_sannenzaka_autumn_canopy_036.jpg', chapter: 'kyoto-ancient-capital', title: 'Sannenzaka Slope beneath Maple Leaves', region: 'Sannenzaka' },
  { orig: 'IMG_20231012_165656.jpg', target: 'japan23_1012_kyoto_kamogawa_dusk_willows_037.jpg', chapter: 'kyoto-ancient-capital', title: 'Kamogawa Riverbank Willows at Sunset', region: 'Kamogawa' },
  { orig: 'IMG_20231012_210635.jpg', target: 'japan23_1012_kyoto_pontocho_alley_lanterns_038.jpg', chapter: 'kyoto-ancient-capital', title: 'Pontocho Alley Lantern Reflections', region: 'Pontocho' },
  { orig: 'IMG_20231013_091634.jpg', target: 'japan23_1013_kyoto_arashiyama_bamboo_path_039.jpg', chapter: 'kyoto-ancient-capital', title: 'Sagano Bamboo Grove Morning Path', region: 'Arashiyama' },
  { orig: 'IMG_20231013_122017.jpg', target: 'japan23_1013_kyoto_kinkakuji_golden_pavilion_040.jpg', chapter: 'kyoto-ancient-capital', title: 'Kinkaku-ji Gold Leaf above Mirror Pond', region: 'Kinkaku-ji' },
  { orig: 'IMG_20231013_123110.jpg', target: 'japan23_1013_kyoto_kinkakuji_mirror_pond_041.jpg', chapter: 'kyoto-ancient-capital', title: 'Kyoko-chi Water Reflection of the Reliquary', region: 'Kinkaku-ji' },
  { orig: 'IMG_20231013_143433.jpg', target: 'japan23_1013_kyoto_zen_garden_moss_stone_042.jpg', chapter: 'kyoto-ancient-capital', title: 'Zen Temple Moss & Stepping Stones', region: 'Kyoto Temple' },
  { orig: 'IMG_20231014_060113.jpg', target: 'japan23_1014_kyoto_ninenzaka_dawn_lantern_043.jpg', chapter: 'kyoto-ancient-capital', title: 'Ninenzaka Dawn Lantern on Wet Cobblestones', region: 'Ninenzaka' },
  { orig: 'IMG_20231014_062926.jpg', target: 'japan23_1014_kyoto_morning_quiet_slope_044.jpg', chapter: 'kyoto-ancient-capital', title: 'Empty Historic Slopes in Morning Mist', region: 'Higashiyama' },
  { orig: 'IMG_20231014_125707.jpg', target: 'japan23_1014_kyoto_shinkansen_farewell_045.jpg', chapter: 'kyoto-ancient-capital', title: 'Kyoto Station Shinkansen Platform', region: 'Kyoto Station' }
];

// Mapping for JAPAN 24 (99 files)
const j24Files = fs.readdirSync(p24Src).filter(f => f.toLowerCase().endsWith('.jpg')).sort();

const j24Map = j24Files.map((file, idx) => {
  const m = file.match(/IMG_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/);
  const mmdd = m ? `${m[2]}${m[3]}` : '1120';
  const seq = String(idx + 1).padStart(3, '0');
  
  let chapter = '';
  let location = '';
  let subject = '';
  let region = '';
  let title = '';

  if (idx < 44) {
    chapter = 'kamakura-shonan';
    location = 'shonan';
    region = 'Kamakura & Shonan';
    if (file.includes('20241120')) {
      subject = 'enoden_retro_train';
      title = 'Enoden Vintage Car Gliding Past Coastal Crossing';
    } else if (file.includes('20241121')) {
      subject = 'kamakura_coastal_neighborhood';
      title = 'Residential Lanes and Sea Pine Shadows';
    } else {
      subject = 'shichirigahama_fuji_pacific_coast';
      title = 'Mount Fuji Rising Across Shichirigahama Surf';
    }
  } else if (idx < 71) {
    chapter = 'hakone-fuji-foothills';
    location = 'hakone';
    region = 'Hakone & Lake Ashi';
    if (file.includes('20241123') && idx > 50) {
      subject = 'lake_ashi_heiwa_torii';
      title = 'Floating Torii of Peace on Misty Lake Ashi';
    } else if (file.includes('20241125')) {
      subject = 'kawaguchiko_fuji_dawn_susuki';
      title = 'Autumn Susuki Plumes at Lake Kawaguchiko Dawn';
    } else {
      subject = 'hakone_mountain_slopes';
      title = 'Layered Volcanic Ridges in Autumn Light';
    }
  } else {
    chapter = 'tokyo-autumn-ginkgo';
    location = 'tokyo';
    region = 'Tokyo Autumn';
    if (file.includes('20241126')) {
      subject = 'todai_hongo_ginkgo_avenue';
      title = 'Golden Ginkgo Canopy along Tokyo University Colonnade';
    } else if (file.includes('20241127')) {
      subject = 'meiji_jingu_gaien_ginkgo_walk';
      title = 'Grand Ginkgo Avenue Perspective at Meiji Jingu Gaien';
    } else {
      subject = 'yanaka_ginza_shitamachi_storefront';
      title = 'Yanaka Ginza Nostalgic Timber Facades and Neighborhood Life';
    }
  }

  const target = `japan24_${mmdd}_${location}_${subject}_${seq}.jpg`;
  return { orig: file, target, chapter, title, region, date: mmdd };
});

async function run() {
  console.log('--- Starting Sharp Processing for JAPAN 23 (45 photos) ---');
  const processed23 = [];

  for (let i = 0; i < j23Map.length; i++) {
    const item = j23Map[i];
    const srcPath = path.join(p23Src, item.orig);
    const destPath = path.join(p23Out, item.target);

    const meta = await sharp(srcPath).metadata();
    const aspect = (meta.height > meta.width) ? 'portrait' : 'landscape';

    await sharp(srcPath)
      .resize({ width: 2048, height: 2048, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toFile(destPath);

    processed23.push({
      ...item,
      width: meta.width,
      height: meta.height,
      aspect,
      publicPath: `/images/japan23/${item.target}`,
      camera: 'Huawei P40 Pro',
      year: 2023
    });
    console.log(`[2023 ${i+1}/45] ✓ ${item.target} (${aspect}, ${meta.width}x${meta.height})`);
  }

  fs.writeFileSync(path.join(dataDir, 'japan23_processed.json'), JSON.stringify(processed23, null, 2));

  console.log('\n--- Starting Sharp Processing for JAPAN 24 (99 photos) ---');
  const processed24 = [];

  for (let i = 0; i < j24Map.length; i++) {
    const item = j24Map[i];
    const srcPath = path.join(p24Src, item.orig);
    const destPath = path.join(p24Out, item.target);

    const meta = await sharp(srcPath).metadata();
    const aspect = (meta.height > meta.width) ? 'portrait' : 'landscape';

    await sharp(srcPath)
      .resize({ width: 2048, height: 2048, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toFile(destPath);

    processed24.push({
      ...item,
      width: meta.width,
      height: meta.height,
      aspect,
      publicPath: `/images/japan24/${item.target}`,
      camera: 'Xiaomi 14 Ultra',
      year: 2024
    });
    console.log(`[2024 ${i+1}/99] ✓ ${item.target} (${aspect}, ${meta.width}x${meta.height})`);
  }

  fs.writeFileSync(path.join(dataDir, 'japan24_processed.json'), JSON.stringify(processed24, null, 2));
  console.log('\nAll 144 images successfully optimized to public/images/japan23 and public/images/japan24!');
}

run().catch(err => {
  console.error('Fatal error in image processing:', err);
  process.exit(1);
});
