import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIR = "C:\\Users\\Admin\\OneDrive\\Pictures\\for antigravity\\JAPAN 25";
const METADATA_PATH = path.resolve(__dirname, '../japan25_metadata.json');

const renameMap = {
  // Nov 22: Asakusa Night
  "DSC00166-Enhanced-NR.jpg": "japan25_1122_sensoji_hozomon_night_DSC00166.jpg",
  "DSC00181-Enhanced-NR.jpg": "japan25_1122_asakusa_nakamise_maple_DSC00181.jpg",
  "DSC00201.jpg": "japan25_1122_asakusa_kirin_vending_DSC00201.jpg",
  "DSC00207-Enhanced-NR.jpg": "japan25_1122_asakusa_starbucks_corner_DSC00207.jpg",

  // Nov 23: Tokyo Dawn, Garden, Todai, Ochanomizu, Ueno
  "DSC00222.jpg": "japan25_1123_sensoji_giant_lantern_dawn_DSC00222.jpg",
  "DSC00320-Enhanced-NR.jpg": "japan25_1123_garden_bridge_autumn_foliage_DSC00320.jpg",
  "DSC00339-Enhanced-NR.jpg": "japan25_1123_todai_ginkgo_gothic_colonnade_DSC00339.jpg",
  "DSC00368-Enhanced-NR.jpg": "japan25_1123_todai_stone_arch_ginkgo_DSC00368.jpg",
  "DSC00444.jpg": "japan25_1123_ochanomizu_hijiribashi_trains_DSC00444.jpg",
  "DSC00471-Enhanced-NR.jpg": "japan25_1123_ueno_ameyoko_neon_gate_DSC00471.jpg",

  // Nov 24: Tokyo Tower, Jingu Gaien, Shinjuku Gyoen, Odaiba Sunset
  "DSC00534.jpg": "japan25_1124_tokyo_tower_street_view_DSC00534.jpg",
  "DSC00554.jpg": "japan25_1124_tokyo_tower_intersection_frame_DSC00554.jpg",
  "DSC00576-Enhanced-NR-2.jpg": "japan25_1124_azabudai_tokyo_tower_panorama_2_DSC00576.jpg",
  "DSC00576-Enhanced-NR.jpg": "japan25_1124_azabudai_tokyo_tower_panorama_DSC00576.jpg",
  "DSC00594-Enhanced-NR.jpg": "japan25_1124_jingu_gaien_ginkgo_lamborghini_DSC00594.jpg",
  "DSC00657-Enhanced-NR.jpg": "japan25_1124_jingu_gaien_ginkgo_carpet_walk_DSC00657.jpg",
  "DSC00680-Enhanced-NR.jpg": "japan25_1124_shinjuku_gyoen_lawn_bubbles_DSC00680.jpg",
  "DSC00690-Enhanced-NR.jpg": "japan25_1124_shinjuku_gyoen_golden_canopy_sunburst_DSC00690.jpg",
  "DSC00713.jpg": "japan25_1124_odaiba_sunset_tokyo_bay_DSC00713.jpg",
  "DSC00718-Enhanced-NR.jpg": "japan25_1124_odaiba_port_cranes_sunset_DSC00718.jpg",
  "DSC00722-Enhanced-NR.jpg": "japan25_1124_ariake_skytree_framed_dusk_DSC00722.jpg",
  "DSC00730-Enhanced-NR.jpg": "japan25_1124_odaiba_sunset_deck_silhouette_DSC00730.jpg",
  "DSC00732-Enhanced-NR.jpg": "japan25_1124_odaiba_mt_fuji_sunset_skyline_DSC00732.jpg",
  "DSC00774-Enhanced-NR.jpg": "japan25_1124_odaiba_rainbow_bridge_night_DSC00774.jpg",

  // Nov 26: Fuji Five Lakes - Lake Yamanaka & Kawaguchiko Momiji Corridor
  "DSC00915-Enhanced-NR.jpg": "japan25_1126_yamanaka_predawn_blue_hour_fuji_DSC00915.jpg",
  "DSC00922-Enhanced-NR.jpg": "japan25_1126_yamanaka_predawn_pink_horizon_fuji_DSC00922.jpg",
  "DSC00924-Enhanced-NR.jpg": "japan25_1126_yamanaka_predawn_wooden_fence_fuji_DSC00924.jpg",
  "DSC00925-Enhanced-NR.jpg": "japan25_1126_yamanaka_predawn_lenticular_cloud_DSC00925.jpg",
  "DSC00929-Enhanced-NR.jpg": "japan25_1126_yamanaka_predawn_fuji_peak_cloud_DSC00929.jpg",
  "DSC00933-Enhanced-NR.jpg": "japan25_1126_yamanaka_predawn_calm_water_fuji_DSC00933.jpg",
  "DSC00938-Enhanced-NR.jpg": "japan25_1126_yamanaka_dawn_first_light_fuji_DSC00938.jpg",
  "DSC00959-Enhanced-NR.jpg": "japan25_1126_yamanaka_mute_swan_wings_morning_mist_DSC00959.jpg",
  "DSC00962-Enhanced-NR.jpg": "japan25_1126_yamanaka_swan_golden_mist_swim_DSC00962.jpg",
  "DSC00970-Enhanced-NR.jpg": "japan25_1126_yamanaka_sunrise_wedding_silhouette_DSC00970.jpg",
  "DSC00973-Enhanced-NR.jpg": "japan25_1126_yamanaka_feeding_swan_sunrise_DSC00973.jpg",
  "DSC00988-Enhanced-NR.jpg": "japan25_1126_yamanaka_vertical_sunrise_frost_shore_DSC00988.jpg",
  "DSC00989-Enhanced-NR.jpg": "japan25_1126_yamanaka_vertical_fuji_susuki_walkers_DSC00989.jpg",
  "DSC00992.jpg": "japan25_1126_yamanaka_frost_boardwalk_fuji_DSC00992.jpg",
  "DSC01001.jpg": "japan25_1126_yamanaka_two_swans_heart_shape_DSC01001.jpg",
  "DSC01050-Enhanced-NR.jpg": "japan25_1126_yamanaka_low_angle_water_ripples_fuji_DSC01050.jpg",
  "DSC01065.jpg": "japan25_1126_yamanaka_duck_on_rock_fuji_DSC01065.jpg",
  "DSC01158-Enhanced-NR.jpg": "japan25_1126_kawaguchiko_momiji_glowing_red_leaves_DSC01158.jpg",
  "DSC01171-Enhanced-NR.jpg": "japan25_1126_kawaguchiko_momiji_tunnel_bridge_crowd_DSC01171.jpg",
  "DSC01178-Enhanced-NR.jpg": "japan25_1126_kawaguchiko_momiji_canopy_sunlight_DSC01178.jpg",
  "DSC01187-Enhanced-NR.jpg": "japan25_1126_kawaguchiko_momiji_canal_stream_DSC01187.jpg",
  "DSC01206-Enhanced-NR.jpg": "japan25_1126_kawaguchiko_momiji_deep_crimson_DSC01206.jpg",

  // Nov 27: Ueno & Marunouchi
  "DSC01229-Enhanced-NR.jpg": "japan25_1127_ueno_ginkgo_leaves_wooden_bench_DSC01229.jpg",
  "DSC01253.jpg": "japan25_1127_ueno_temple_roof_gable_maple_DSC01253.jpg",
  "DSC01254-Enhanced-NR.jpg": "japan25_1127_ueno_saigo_takamori_statue_ginkgo_DSC01254.jpg",
  "DSC01317-Enhanced-NR.jpg": "japan25_1127_marunouchi_beams_corner_traffic_dusk_DSC01317.jpg",
  "DSC01332.jpg": "japan25_1127_tokyo_station_marunouchi_redbrick_DSC01332.jpg",

  // Nov 28: Tokyo Parks, Embankment & Still Life
  "DSC01380-Enhanced-NR.jpg": "japan25_1128_park_mamachari_winter_trees_DSC01380.jpg",
  "DSC01381-Enhanced-NR.jpg": "japan25_1128_park_empty_benches_morning_sun_DSC01381.jpg",
  "DSC01399-Enhanced-NR.jpg": "japan25_1128_riverbank_elderly_cyclist_expressway_DSC01399.jpg",
  "DSC01404-Enhanced-NR.jpg": "japan25_1128_park_mamachari_red_maple_canopy_DSC01404.jpg",
  "DSC01409-Enhanced-NR.jpg": "japan25_1128_still_life_crimson_leaf_wet_stone_DSC01409.jpg"
};

console.log(`Starting rename of ${Object.keys(renameMap).length} photos in:`);
console.log(TARGET_DIR);

let successCount = 0;
let skippedCount = 0;
let errorCount = 0;

for (const [oldName, newName] of Object.entries(renameMap)) {
  const oldPath = path.join(TARGET_DIR, oldName);
  const newPath = path.join(TARGET_DIR, newName);

  if (fs.existsSync(oldPath)) {
    try {
      fs.renameSync(oldPath, newPath);
      console.log(`✓ Renamed: ${oldName} -> ${newName}`);
      successCount++;
    } catch (err) {
      console.error(`✗ Error renaming ${oldName}:`, err.message);
      errorCount++;
    }
  } else if (fs.existsSync(newPath)) {
    console.log(`- Already renamed: ${newName}`);
    skippedCount++;
  } else {
    console.warn(`! Source file not found: ${oldName}`);
    errorCount++;
  }
}

console.log(`\nRename summary: ${successCount} renamed, ${skippedCount} already renamed, ${errorCount} errors.`);

// Update metadata file with new filenames
if (fs.existsSync(METADATA_PATH)) {
  const metadata = JSON.parse(fs.readFileSync(METADATA_PATH, 'utf8'));
  const updatedMetadata = metadata.map(item => {
    const newName = renameMap[item.file] || item.file;
    return {
      ...item,
      originalFile: item.originalFile || item.file,
      file: newName
    };
  });
  fs.writeFileSync(METADATA_PATH, JSON.stringify(updatedMetadata, null, 2), 'utf8');
  console.log(`Updated ${METADATA_PATH} with new filenames.`);
}
