const fs = require('fs');
const path = require('path');

const contentDir = path.resolve(__dirname, '../src/content/journeys/japan');

// Data for Japan 2023 (45 photos total)
const j23Tokyo = {
  hero: {
    image: '/images/japan23/japan23_1008_meiji_jingu_forest_path_013.jpg',
    caption: 'Sacred Cedar Forest Canopy and Weathered Lantern Path at Meiji Jingu',
    exif: 'Huawei P40 Pro · ƒ/1.9 · 1/200s · ISO 50',
    aspect: 'portrait'
  },
  sub1: {
    image: '/images/japan23/japan23_1008_meiji_jingu_wedding_procession_011.jpg',
    caption: 'Traditional Shinto Wedding Procession Beneath the Vermilion Parasol',
    exif: 'Huawei P40 Pro · ƒ/1.9 · 1/320s · ISO 50'
  },
  sub2: {
    image: '/images/japan23/japan23_1008_asakusa_sensoji_pagoda_004.jpg',
    caption: 'Asakusa Senso-ji Five-Story Pagoda in Clear Morning Air',
    exif: 'Huawei P40 Pro · ƒ/1.9 · 1/800s · ISO 50'
  },
  gallery: [
    { image: '/images/japan23/japan23_1007_klia_boarding_departure_001.jpg', caption: 'Departure Gate and Boarding from Kuala Lumpur International Airport', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/160s · ISO 64' },
    { image: '/images/japan23/japan23_1007_inflight_wing_clouds_002.jpg', caption: 'Pacific Cloudbreak and Aircraft Wing at 30,000 Feet', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/3200s · ISO 50' },
    { image: '/images/japan23/japan23_1007_tokyo_evening_skyline_003.jpg', caption: 'Tokyo Metropolis Skyline Arrival in October Dusk', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/50s · ISO 250' },
    { image: '/images/japan23/japan23_1008_asakusa_nakamise_street_005.jpg', caption: 'Nakamise Dori Shutters and Morning Street Awakening', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/640s · ISO 50' },
    { image: '/images/japan23/japan23_1008_asakusa_hozomon_gate_006.jpg', caption: 'Asakusa Hozomon Gate Eaves and Vermilion Roof Tiles', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/1000s · ISO 50' },
    { image: '/images/japan23/japan23_1008_asakusa_lantern_detail_007.jpg', caption: 'Chochin Giant Paper Lantern Calligraphy Detail', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/400s · ISO 50' },
    { image: '/images/japan23/japan23_1008_asakusa_temple_eaves_008.jpg', caption: 'Buddhist Temple Gables beneath Crisp October Sky', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/1200s · ISO 50' },
    { image: '/images/japan23/japan23_1008_asakusa_incense_smoke_009.jpg', caption: 'Swirling Incense Smoke at Jokoro Sacred Burner', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/500s · ISO 50' },
    { image: '/images/japan23/japan23_1008_asakusa_street_crowd_010.jpg', caption: 'Morning Pilgrim Stream Along Asakusa Arcade', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/800s · ISO 50' },
    { image: '/images/japan23/japan23_1008_meiji_jingu_red_parasol_012.jpg', caption: 'The Ceremonial Vermilion Parasol on White Courtyard Gravel', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/250s · ISO 50' },
    { image: '/images/japan23/japan23_1008_meiji_jingu_wooden_torii_014.jpg', caption: 'Grand Wooden Torii Portal Framing Cryptomeria Pines', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/160s · ISO 50' },
    { image: '/images/japan23/japan23_1008_roppongi_tokyo_tower_night_015.jpg', caption: 'Tokyo Tower Crimson Beacon Rising from Roppongi Hills', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/20s · ISO 640' },
    { image: '/images/japan23/japan23_1009_tokyo_rainy_crossing_016.jpg', caption: 'Morning Drizzle Across Tokyo Pedestrian Crosswalk', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/160s · ISO 80' },
    { image: '/images/japan23/japan23_1009_tokyo_rain_umbrella_walk_017.jpg', caption: 'Vinyl Umbrellas and Raindrops on Rainy Pavement', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/125s · ISO 100' },
    { image: '/images/japan23/japan23_1009_tokyo_tower_umbrella_view_018.jpg', caption: 'Tokyo Tower Spire Seen through Clear Vinyl Umbrella', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/250s · ISO 100' },
    { image: '/images/japan23/japan23_1009_tokyo_wet_asphalt_neon_019.jpg', caption: 'Reflections of Amber Brake Lights on Wet Asphalt', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/80s · ISO 160' },
    { image: '/images/japan23/japan23_1009_tokyo_shibuya_overpass_020.jpg', caption: 'Pedestrian Overpass Overlooking Blue Hour Shibuya', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/40s · ISO 200' },
    { image: '/images/japan23/japan23_1009_tokyo_dusk_traffic_trails_021.jpg', caption: 'Traffic Headlights Streaking through Evening Mist', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/30s · ISO 320' },
    { image: '/images/japan23/japan23_1009_tokyo_evening_commute_022.jpg', caption: 'Commuter Flow beneath Elevated Railway Tracks', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/25s · ISO 400' },
  ]
};

const j23Kawaguchiko = {
  hero: {
    image: '/images/japan23/japan23_1011_kawaguchiko_fuji_dawn_reeds_026.jpg',
    caption: 'Dawn Peak of Mount Fuji Framed with Lakeside Autumn Reeds',
    exif: 'Huawei P40 Pro · ƒ/1.9 · 1/1600s · ISO 50',
    aspect: 'portrait'
  },
  sub1: {
    image: '/images/japan23/japan23_1010_kawaguchiko_ropeway_panorama_023.jpg',
    caption: 'Tenjoyama Ropeway Overlook of Lake Kawaguchiko Basin',
    exif: 'Huawei P40 Pro · ƒ/1.9 · 1/1200s · ISO 50'
  },
  sub2: {
    image: '/images/japan23/japan23_1011_kawaguchiko_fuji_susuki_glow_027.jpg',
    caption: 'Silver Susuki Pampas Plumes Shimmering in Morning Light',
    exif: 'Huawei P40 Pro · ƒ/1.9 · 1/2000s · ISO 50'
  },
  gallery: [
    { image: '/images/japan23/japan23_1010_kawaguchiko_lake_sunset_024.jpg', caption: 'Sunset Glow Spreading Across Calm Lakeside Waters', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/640s · ISO 50' },
    { image: '/images/japan23/japan23_1010_kawaguchiko_dusk_mountains_025.jpg', caption: 'Distant Silhouette of the Southern Alps at Dusk', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/400s · ISO 64' },
    { image: '/images/japan23/japan23_1011_kawaguchiko_morning_light_reeds_028.jpg', caption: 'First Morning Rays Warming Lakeside Wetland Grasses', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/1500s · ISO 50' },
    { image: '/images/japan23/japan23_1011_kawaguchiko_fuji_clean_peak_029.jpg', caption: 'Clean Geometric Peak of Mount Fuji in October Crispness', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/2400s · ISO 50' },
    { image: '/images/japan23/japan23_1011_kawaguchiko_lakeside_autumn_grass_030.jpg', caption: 'Solitary Lakeside Footpath in Early Morning Quiet', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/1000s · ISO 50' },
    { image: '/images/japan23/japan23_1011_kawaguchiko_panoramic_shoreline_031.jpg', caption: 'Panoramic Tranquility of Northern Shoreline at Dawn', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/1800s · ISO 50' },
  ]
};

const j23Kyoto = {
  hero: {
    image: '/images/japan23/japan23_1012_kyoto_yasaka_pagoda_hokanji_035.jpg',
    caption: 'Yasaka Pagoda Hokan-ji Towering Over Higashiyama Alleys',
    exif: 'Huawei P40 Pro · ƒ/1.9 · 1/900s · ISO 50',
    aspect: 'portrait'
  },
  sub1: {
    image: '/images/japan23/japan23_1013_kyoto_kinkakuji_golden_pavilion_040.jpg',
    caption: 'Kinkaku-ji Gold Leaf Pavillion Gleaming Above Mirror Pond',
    exif: 'Huawei P40 Pro · ƒ/1.9 · 1/1600s · ISO 50'
  },
  sub2: {
    image: '/images/japan23/japan23_1014_kyoto_ninenzaka_dawn_lantern_043.jpg',
    caption: 'Wet Cobblestone Reflections and Dawn Lantern at Ninenzaka',
    exif: 'Huawei P40 Pro · ƒ/1.9 · 1/250s · ISO 64'
  },
  gallery: [
    { image: '/images/japan23/japan23_1012_kyoto_higashiyama_stone_steps_032.jpg', caption: 'Stone Steps Ascending Historic Higashiyama Hillside', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/800s · ISO 50' },
    { image: '/images/japan23/japan23_1012_kyoto_higashiyama_yukata_walk_033.jpg', caption: 'Travelers in Traditional Yukata Walking Past Machiya', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/1100s · ISO 50' },
    { image: '/images/japan23/japan23_1012_kyoto_machiya_wooden_lattice_034.jpg', caption: 'Weathered Koshi Timber Lattice and Eaves Shadow', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/600s · ISO 50' },
    { image: '/images/japan23/japan23_1012_kyoto_sannenzaka_autumn_canopy_036.jpg', caption: 'Gentle Incline of Sannenzaka Beneath Autumn Maple Leaves', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/950s · ISO 50' },
    { image: '/images/japan23/japan23_1012_kyoto_kamogawa_dusk_willows_037.jpg', caption: 'Willows Swaying Along the Kamogawa Riverbank at Dusk', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/350s · ISO 80' },
    { image: '/images/japan23/japan23_1012_kyoto_pontocho_alley_lanterns_038.jpg', caption: 'Lantern Light Glimmering in Pontocho Narrow Alley', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/30s · ISO 400' },
    { image: '/images/japan23/japan23_1013_kyoto_arashiyama_bamboo_path_039.jpg', caption: 'Morning Sunlight Filtering Through Arashiyama Bamboo Grove', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/400s · ISO 50' },
    { image: '/images/japan23/japan23_1013_kyoto_kinkakuji_mirror_pond_041.jpg', caption: 'Perfect Reliquary Reflection in Mirror Pond Waters', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/2000s · ISO 50' },
    { image: '/images/japan23/japan23_1013_kyoto_zen_garden_moss_stone_042.jpg', caption: 'Zen Temple Stepping Stones and Velvet Green Moss', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/500s · ISO 50' },
    { image: '/images/japan23/japan23_1014_kyoto_morning_quiet_slope_044.jpg', caption: 'Empty Historic Slopes in Quiet Dawn Mist', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/300s · ISO 50' },
    { image: '/images/japan23/japan23_1014_kyoto_shinkansen_farewell_045.jpg', caption: 'Shinkansen High-Speed Platform at Kyoto Station', exif: 'Huawei P40 Pro · ƒ/1.9 · 1/120s · ISO 100' },
  ]
};

// Data for Japan 2024 (99 photos total)
// Kamakura: 44 photos (1 hero + 2 sub + 41 gallery)
const j24KamakuraHero = {
  image: '/images/japan24/japan24_1122_shonan_shichirigahama_fuji_pacific_coast_034.jpg',
  caption: 'A Lone Stroll along Shichirigahama Beach with Snowcapped Mount Fuji across Sagami Bay',
  exif: 'Leica 75mm · ƒ/1.8 · 1/12400s · ISO 50',
  aspect: 'portrait'
};
const j24KamakuraSub1 = {
  image: '/images/japan24/japan24_1120_shonan_enoden_retro_train_001.jpg',
  caption: 'Enoden Retro Green Rail Car Navigating Narrow Coastal Crossings',
  exif: 'Leica 75mm · ƒ/1.8 · 1/1240s · ISO 792'
};
const j24KamakuraSub2 = {
  image: '/images/japan24/japan24_1122_shonan_shichirigahama_fuji_pacific_coast_040.jpg',
  caption: 'Winding Autumn S-Curve Path Flanked by Sloping Green Lawns',
  exif: 'Leica 75mm · ƒ/1.8 · 1/1500s · ISO 64'
};

const j24KamakuraGalleryCaptions = [
  'Twilight Reflections on the Vintage Tram Windows',
  'Drivers Cabin and Winding Seaside Iron Track',
  'Passing the Residential Timber Eaves along Enoshima Line',
  'Commuter Silhouette through Polished Brass Carriage Rails',
  'Signal Lights and Evening Glare over the Tram Crossing',
  'Quiet Morning Alley Flanked by Weathered Sugi Timber',
  'Traditional Clay Tile Eaves Against Coastal Sky',
  'Coastal Hydrangea Leaves and Paved Stone Gutter',
  'Stone Jizo Shrine Tucked Beside Narrow Residential Corner',
  'Sunlit Bamboo Screen and Stepping Stones at Garden Entry',
  'Bicycles Leaned Against Dark Cedar Fence',
  'Dappled Shade Across Kamakura Temple Wall',
  'Overhead Telephone Cables and Pine Tree Silhouettes',
  'Low Wooden Gate Framing Coastal Garden Moss',
  'Quiet Kamakura Residential Alleyways in Soft Morning Light',
  'Morning Milk Box and Woven Straw Doormat',
  'Curved Street Corner Flanked by Manicured Pines',
  'Shadows of Persimmon Branches on Stucco Wall',
  'Paved Stone Approach to Local Coastal Shrine',
  'Garden Gate Framing Sea Pine Silhouettes',
  'Weathered Shingles and Brass Door Fittings',
  'Sunlight Filtering Through Cryptomeria Cedars',
  'Narrow Alley Pathway Opening Toward Sea Breeze',
  'Traditional Wooden Rain Gutters and Clean Gravel',
  'Sun-bleached Timber Workshop and Sliding Shoji Frames',
  'Autumn Potted Ferns along Residential Porch',
  'Coastal Road Intersection beneath Clear Pacific Skies',
  'Distant Glimpse of the Sea Between Rooflines',
  'Freshly Swept Stone Pavement in Morning Quiet',
  'Autumn Breeze Stirring Garden Shrubbery',
  'Quiet Cul-de-sac Framing Sloping Hillside Greenery',
  'Sunlight Glinting on Ceramic Roof Ornaments',
  'Rhythmic White Foam Breaking on the Dark Volcanic Shore',
  'Surfers Waiting for Waves under Early Winter Sunlight',
  'Wet Volcanic Sand Reflecting Blue Sky and Cresting Tide',
  'Coastal Promenade Railings Overlooking Enoshima Headland',
  'Gulls Hovering Against the Pacific Horizon',
  'Long Shadows of Beachcombers on Wet Sand',
  'Students Navigating the Curving Hill Descent',
  'Coastal Highway Route 134 Curving Along the Bay',
  'Pale Silhouette of Mount Fuji Fading into Afternoon Haze'
];

// Hakone: 27 photos (1 hero + 2 sub + 24 gallery)
const j24HakoneHero = {
  image: '/images/japan24/japan24_1123_hakone_lake_ashi_heiwa_torii_052.jpg',
  caption: 'Hakone Shrine Heiwa no Torii Standing Imposing in the Cold Waters of Lake Ashi',
  exif: 'Leica 120mm · ƒ/2.5 · 1/870s · ISO 50',
  aspect: 'portrait'
};
const j24HakoneSub1 = {
  image: '/images/japan24/japan24_1123_hakone_hakone_mountain_slopes_047.jpg',
  caption: 'Layered Autumn Foliage across the Volcanic Slopes of Mount Hakone',
  exif: 'Leica 75mm · ƒ/1.8 · 1/640s · ISO 50'
};
const j24HakoneSub2 = {
  image: '/images/japan24/japan24_1125_hakone_kawaguchiko_fuji_dawn_susuki_063.jpg',
  caption: 'Susuki Pampas Grass Shimmering before Mount Fuji at First Light',
  exif: 'Leica 23mm · ƒ/1.6 · 1/2000s · ISO 50'
};

const j24HakoneGalleryCaptions = [
  'Autumn Color Gradients Clinging to the Upper Caldera Ridges',
  'Winding Hakone Mountain Highway Through Golden Beech',
  'Deep Cryptomeria Forest Flanking Hakone Cedar Avenue',
  'Moss-Covered Stone Lanterns on Lake Ashi Shore',
  'Mountain Mist Drifting over Hakone Caldera Basin',
  'Fallen Maple Leaves on Old Tokaido Stone Paving',
  'Submerged Timber Foundation of Heiwa no Torii',
  'Waterline Ripples Encircling the Submerged Cedar Pillars',
  'Silhouette of the Red Torii Against Lake Ashi Mountains',
  'High Elevation Observation Deck Looking Across Valleys',
  'Steaming Fumaroles of Owakudani in Late Light',
  'High Mountain Trail Framed by Golden Beech and Pines',
  'Twilight Cloud Blanket Over Hakone Mountain Passes',
  'Cold Mountain Air Settling Over Quiet Lakeside Piers',
  'First Sunlight Piercing Low Cloudbanks above Kawaguchiko',
  'Morning Frost on Lakeside Volcanic Shingle',
  'Crisp Silhouette of Mount Fuji Reflected in Still Waters',
  'Golden Reeds Swaying Against the Deep Blue Lake',
  'Early Walkers Along Oishi Park Promenade',
  'Delicate Feathery Plumes of Susuki Against the Symmetrical Peak',
  'Light Shifting Across the Northern Snowfields of Fuji',
  'Shoreline Reeds and Submerged Basalt Boulders',
  'Morning Reflections Spreading Across the Tranquil Lake Basin',
  'Pure Blue Sky Above the Solitary Stratovolcano'
];

// Tokyo Autumn: 28 photos (1 hero + 2 sub + 25 gallery)
const j24TokyoHero = {
  image: '/images/japan24/japan24_1126_tokyo_todai_hongo_ginkgo_avenue_072.jpg',
  caption: 'Golden Ginkgo Canopy Along the Historic Colonnade of Tokyo University',
  exif: 'Leica 75mm · ƒ/1.8 · 1/400s · ISO 50',
  aspect: 'portrait'
};
const j24TokyoSub1 = {
  image: '/images/japan24/japan24_1127_tokyo_meiji_jingu_gaien_ginkgo_walk_083.jpg',
  caption: 'Grand Ginkgo Avenue Perspective at Meiji Jingu Gaien',
  exif: 'Leica 75mm · ƒ/1.8 · 1/320s · ISO 64'
};
const j24TokyoSub2 = {
  image: '/images/japan24/japan24_1128_tokyo_yanaka_ginza_shitamachi_storefront_095.jpg',
  caption: 'Yanaka Ginza Nostalgic Timber Facades and Neighborhood Life',
  exif: 'Leica 23mm · ƒ/1.6 · 1/120s · ISO 125'
};

const j24TokyoGalleryCaptions = [
  'Fallen Yellow Ginkgo Carpet on Cobblestone Walkway',
  'Sunlight Pouring Through Dense Golden Canopy',
  'Gothic Arches of Yasuda Auditorium Framed by Autumn Foliage',
  'Bicycles Parked beneath Arching Yellow Leaves',
  'Students Crossing the Sunlit Campus Promenade',
  'Intricate Leaf Patterns on Historic Brick Walls',
  'Towering Ancient Ginkgo Trunk and Golden Drift',
  'Soft Afternoon Shadows Along Faculty Pathways',
  'Colonnade Perspective Beneath Canopy of Brilliant Ochre',
  'Quiet Library Approach Under Swirling Yellow Leaves',
  'Cathedral of Symmetrical Ginkgo Trees Flanking Main Boulevard',
  'Pedestrians Strolling beneath Dense Golden Vaults',
  'Autumn Sunbeams Slanting Through Four Rows of Ginkgoes',
  'Yellow Leaves Drifting Down on Pavement',
  'Distant Meiji Memorial Picture Gallery Seen Through Foliage',
  'Golden Horizon of Trees Against Deep Blue Sky',
  'Strollers and Benches Along the Shaded Promenade',
  'High Angle View of the Symmetrical Autumn Corridor',
  'Low Light Warming the Upper Foliage Crowns',
  'Evening Commuters Pausing Beneath the Golden Trees',
  'Twilight Descending on the Famous Tokyo Ginkgo Walk',
  'Hand-Painted Shop Signs and Wooden Sliding Doors',
  'Traditional Tea Merchant Shopfront with Paper Lanterns',
  'Evening Shoppers Along the Narrow Historic Street',
  'Warm Amber Light Spilling from Local Noren Curtains'
];

console.log('Writing chapters...');

// Helper to write file
function writeChapter(filename, frontmatter, prose) {
  const content = `---\n${frontmatter}\n---\n\n${prose}\n`;
  fs.writeFileSync(path.join(contentDir, filename), content, 'utf8');
  console.log('✓ Created', filename);
}

// 1. JAPAN 23 TOKYO
writeChapter('japan23-tokyo-first-impressions.md', 
`country: "japan"
countryName: "Japan"
year: 2023
eraTitle: "Mobile Exploration & First Wonder"
camera: "Huawei P40 Pro"
stateName: "Tokyo: First Impressions"
title: "Tokyo Urban Rhythms & Shinto Heritage"
chapterTitle: "Tokyo: Asakusa Dawn, Meiji Jingu Forest and Rainy Tower"
order: 1
coords: [139.6993, 35.6764]
coordsText: "35.676° N, 139.699° E"
date: "October 07-09, 2023"
time: "01:56 PM"
desc: "First encounters with the Japanese capital in early October. From the quiet morning canopy of Meiji Jingu to reverent wedding processions and rainy evening vistas of Tokyo Tower."
exif: "${j23Tokyo.hero.exif}"
hero: "${j23Tokyo.hero.image}"
heroCaption: "${j23Tokyo.hero.caption}"
heroAspect: "${j23Tokyo.hero.aspect}"
sub1: "${j23Tokyo.sub1.image}"
sub1Caption: "${j23Tokyo.sub1.caption}"
sub1Exif: "${j23Tokyo.sub1.exif}"
sub2: "${j23Tokyo.sub2.image}"
sub2Caption: "${j23Tokyo.sub2.caption}"
sub2Exif: "${j23Tokyo.sub2.exif}"
gallery:
${j23Tokyo.gallery.map(g => `  - image: "${g.image}"\n    caption: "${g.caption}"\n    exif: "${g.exif}"`).join('\n')}`,
`<div class="bilingual-block">
  <p class="en-prose">
    Walking into the forested approach of Meiji Jingu, the ceaseless roar of Harajuku dissolves into the rustle of giant camphor and cryptomeria boughs. Sunlight slants across broad gravel avenues, illuminating weathered stone lanterns that have stood watch over decades of quiet devotion. Under the cover of sudden afternoon rain, a Shinto wedding procession moves across the inner courtyard with measured solemnity, the vibrant red ceremonial parasol glowing against charcoal flagstones.
  </p>
  <p class="zh-prose">
    步入明治神宫的参道，原宿街头的喧嚣在巨大香樟与杉木林荫间悄然消融。碎石铺就的林道宽阔平整，阳光斜穿枝叶，在苔痕斑驳的石灯笼上投下疏朗的光斑。午后微雨初歇，神前结婚式的仪仗踏着白石子缓步前行，朱红的仪式大伞在苍灰的庭院殿宇间格外醒目。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    Across the city in Asakusa, dawn brings a completely different rhythm. The vermilion eaves of Senso-ji rise sharp against the clear blue sky, while incense smoke drifts lazily from the giant bronze cauldron. By nightfall, Tokyo turns into a tapestry of reflective asphalt and glowing towers, vinyl umbrellas catching the crimson beacon of Tokyo Tower cutting through the autumn drizzle.
  </p>
  <p class="zh-prose">
    转至浅草，清晨的节奏则透着下町市井的温厚。浅草寺的朱红飞檐在早秋晴空下棱角分明，常香炉青烟袅袅，在游人还未涌入前保持着一种肃穆的清朗。待到入夜，细雨落满街道，透明雨伞与湿润的沥青路面倒映着东京塔的红色光束，构成东京初遇时最为深刻的色调。
  </p>
</div>`
);

// 2. JAPAN 23 KAWAGUCHIKO
writeChapter('japan23-kawaguchiko-fuji-reeds.md',
`country: "japan"
countryName: "Japan"
year: 2023
eraTitle: "Mobile Exploration & Lakeside Dawn"
camera: "Huawei P40 Pro"
stateName: "Yamanashi: Lake Kawaguchiko"
title: "Lake Kawaguchiko & Northern Fuji"
chapterTitle: "Kawaguchiko: Dawn Silver Reeds, Lake Solitude and Mount Fuji"
order: 2
coords: [138.7554, 35.5042]
coordsText: "35.504° N, 138.755° E"
date: "October 10-11, 2023"
time: "06:02 AM"
desc: "Standing along the northern shore of Lake Kawaguchiko at dawn. Wild susuki grasses sway softly as the crisp autumn morning unveils the snowless volcanic cone in quiet stillness."
exif: "${j23Kawaguchiko.hero.exif}"
hero: "${j23Kawaguchiko.hero.image}"
heroCaption: "${j23Kawaguchiko.hero.caption}"
heroAspect: "${j23Kawaguchiko.hero.aspect}"
sub1: "${j23Kawaguchiko.sub1.image}"
sub1Caption: "${j23Kawaguchiko.sub1.caption}"
sub1Exif: "${j23Kawaguchiko.sub1.exif}"
sub2: "${j23Kawaguchiko.sub2.image}"
sub2Caption: "${j23Kawaguchiko.sub2.caption}"
sub2Exif: "${j23Kawaguchiko.sub2.exif}"
gallery:
${j23Kawaguchiko.gallery.map(g => `  - image: "${g.image}"\n    caption: "${g.caption}"\n    exif: "${g.exif}"`).join('\n')}`,
`<div class="bilingual-block">
  <p class="en-prose">
    Dawn at Lake Kawaguchiko arrives with profound chill and stillness. Along the northern shoreline near Oishi Park, tall silver susuki grasses bow gently to the lake breeze, their feathery plumes catching the very first amber glow of sunrise. Directly across the mirror-like water, Mount Fuji stands monumental, its rugged volcanic ridges etched sharply against a pale pastel sky.
  </p>
  <p class="zh-prose">
    河口湖的清晨带着山地特有的清冽与沉静。大石公园附近的北岸，银白色的芒草在湖风中微微颔首，茸茸的花穗率先捕捉到地平线上升起的第一缕晨光。隔水相望，富士山的火山锥体拔地而起，深褐色的山体肌理在微明的天幕前勾勒出极为沉稳的几何轮廓。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    As the morning advances, the mist lifting from the lake surface reveals the vast sweep of the basin. The water remains undisturbed, reflecting the sky and the dark timber boat docks that line the shore. It is a quiet study in geometry and elemental atmosphere, where the presence of the mountain commands every perspective.
  </p>
  <p class="zh-prose">
    随着日头渐高，湖面的薄雾徐徐散开，整个湖盆的开阔景象尽收眼底。水波不兴，倒映着晴空与岸边旧木栈桥的线条。这是一场关于几何秩序与自然氛围的静默注视，圣山的存在统摄着视野里的每一个角度。
  </p>
</div>`
);

// 3. JAPAN 23 KYOTO
writeChapter('japan23-kyoto-ancient-capital.md',
`country: "japan"
countryName: "Japan"
year: 2023
eraTitle: "Mobile Exploration & Ancient Kyoto"
camera: "Huawei P40 Pro"
stateName: "Kyoto: Historic Capital"
title: "Kyoto Heritage & Historic Slopes"
chapterTitle: "Kyoto: Yasaka Pagoda, Kinkaku-ji and Dawn Cobblestones"
order: 3
coords: [135.7788, 34.9986]
coordsText: "34.999° N, 135.779° E"
date: "October 12-14, 2023"
time: "12:57 PM"
desc: "Wandering through the historic quarters of Higashiyama and Arashiyama. Weathered machiya lattice, the gleaming gold of Kinkaku-ji, and Yasaka Pagoda towering over ancient cobblestone slopes."
exif: "${j23Kyoto.hero.exif}"
hero: "${j23Kyoto.hero.image}"
heroCaption: "${j23Kyoto.hero.caption}"
heroAspect: "${j23Kyoto.hero.aspect}"
sub1: "${j23Kyoto.sub1.image}"
sub1Caption: "${j23Kyoto.sub1.caption}"
sub1Exif: "${j23Kyoto.sub1.exif}"
sub2: "${j23Kyoto.sub2.image}"
sub2Caption: "${j23Kyoto.sub2.caption}"
sub2Exif: "${j23Kyoto.sub2.exif}"
gallery:
${j23Kyoto.gallery.map(g => `  - image: "${g.image}"\n    caption: "${g.caption}"\n    exif: "${g.exif}"`).join('\n')}`,
`<div class="bilingual-block">
  <p class="en-prose">
    Navigating the narrow flagstone lanes of Higashiyama, the historic capital preserves an architectural cadence that feels completely untouched by the decades. Wooden machiya townhouses with dark koshi lattices line the slope, guiding the gaze upward toward the five-story timber profile of Yasaka Pagoda rising dramatically into the autumn sky.
  </p>
  <p class="zh-prose">
    穿行在东山的石板坡道间，千年的古都保留着未曾被打乱的建筑韵律。街道两侧是紧凑排布的町家木屋，深褐色的木格窗与出檐引导着视线向前延展，八坂之塔的五重木檐在深巷尽头高高耸立，沉静地融入微云的秋空。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    At dawn, the streets of Ninenzaka are empty of visitors, the wet stones catching the golden glow of wooden wall lanterns. Across town in the north, Kinkaku-ji gleams intensely across Mirror Pond, its gold leaf surface shimmering against dark pines and manicured moss banks. The journey through Kyoto is an exercise in appreciating quiet spatial transitions, where every turn reveals centuries of aesthetic balance.
  </p>
  <p class="zh-prose">
    清晨六点，二年坂的斜坡尚无游人，微湿的青石阶上映着街角木制门灯的昏黄暖意。而在北山的镜湖池畔，金阁寺在水面的倒影璀璨而明朗，与深绿的岛松和苔庭形成浓郁的对照。京都的漫步是对空间过渡的细细品味，每一个转角都沉淀着岁月打磨出的审美平衡。
  </p>
</div>`
);

// 4. JAPAN 24 KAMAKURA (44 photos total)
const j24KamakuraGallery = [];
for (let i = 2; i <= 44; i++) {
  if (i === 34 || i === 40) continue; // 34 is hero, 40 is sub2
  const seq = String(i).padStart(3, '0');
  let file = '';
  if (i <= 6) file = `japan24_1120_shonan_enoden_retro_train_${seq}.jpg`;
  else if (i <= 33) file = `japan24_1121_shonan_kamakura_coastal_neighborhood_${seq}.jpg`;
  else file = `japan24_1122_shonan_shichirigahama_fuji_pacific_coast_${seq}.jpg`;

  const captionIdx = j24KamakuraGallery.length;
  const caption = j24KamakuraGalleryCaptions[captionIdx] || 'Coastal Study in Shonan';
  j24KamakuraGallery.push({
    image: `/images/japan24/${file}`,
    caption,
    exif: 'Leica · ƒ/1.8 · ISO 50'
  });
}

writeChapter('japan24-kamakura-shonan.md',
`country: "japan"
countryName: "Japan"
year: 2024
eraTitle: "Leica Optics & Coastal Autumn"
camera: "Xiaomi 14 Ultra"
stateName: "Kanagawa: Kamakura & Shonan Coast"
title: "Kamakura & Shonan Coast"
chapterTitle: "Kamakura: Retro Enoden, Pacific Surf and Mount Fuji across Sagami Bay"
order: 1
coords: [139.5312, 35.3055]
coordsText: "35.306° N, 139.531° E"
date: "November 20-22, 2024"
time: "09:52 AM"
desc: "Walking the black volcanic shoreline of Shichirigahama on a crisp November morning. A lone figure traces the turquoise tide while Mount Fuji looms silently beyond the sea cliffs."
exif: "${j24KamakuraHero.exif}"
hero: "${j24KamakuraHero.image}"
heroCaption: "${j24KamakuraHero.caption}"
heroAspect: "${j24KamakuraHero.aspect}"
sub1: "${j24KamakuraSub1.image}"
sub1Caption: "${j24KamakuraSub1.caption}"
sub1Exif: "${j24KamakuraSub1.exif}"
sub2: "${j24KamakuraSub2.image}"
sub2Caption: "${j24KamakuraSub2.caption}"
sub2Exif: "${j24KamakuraSub2.exif}"
gallery:
${j24KamakuraGallery.map(g => `  - image: "${g.image}"\n    caption: "${g.caption}"\n    exif: "${g.exif}"`).join('\n')}`,
`<div class="bilingual-block">
  <p class="en-prose">
    Stepping off the Enoden tram at Shichirigahama, the sea breeze brings the immediate chill of early winter. The black volcanic sand along the curve of Sagami Bay slopes down toward the turquoise surf, textured by retreating foam and the footprints of early morning walkers. Looking west across the water, the colossal silhouette of Mount Fuji stands clear of the sea haze, its snowfields glowing under direct sunlight while the coastal houses sit nestled below the headland.
  </p>
  <p class="zh-prose">
    从江之电的列车踏上七里滨，迎面是初冬太平洋微咸的冷风。相模湾弧形岸线铺着一层暗色的火山砂，退去的潮水留下一圈圈洁白的泡沫。向西望去，富士山整座雪冠毫无遮挡地耸立在远方海面之上，山脊雪线在晴空下轮廓分明，海岬下沿则是密密匝匝的木造民居。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    Further inland along the railway, the tracks run so close to front gates that residents can hear the iron rumble of the green cars passing by their kitchen windows. In the quiet residential neighborhoods of Kamakura, the light settles gently on timber walls and garden hedges. The rhythm here is unhurried, measured by the clang of level-crossing bells and the slow roll of Pacific swells breaking against the seawall.
  </p>
  <p class="zh-prose">
    顺着铁道往内陆走，江之电的铁轨离沿线住家的玄关只有几步之遥。墨绿色的老式电车每隔十几分钟缓缓驶过窄街，车轮与铁轨摩擦出沉稳的声响。镰仓的街巷没有市区的局促，阳光落在深色的杉木外墙和沿街修剪齐整的松枝上，只听得见远处道口清脆的叮咚声与海浪拍岸的起伏。
  </p>
</div>`
);

// 5. JAPAN 24 HAKONE (27 photos total)
const j24HakoneGallery = [];
for (let i = 45; i <= 71; i++) {
  if (i === 52 || i === 47 || i === 63) continue; // 52 hero, 47 sub1, 63 sub2
  const seq = String(i).padStart(3, '0');
  let file = '';
  if (i >= 61) file = `japan24_1125_hakone_kawaguchiko_fuji_dawn_susuki_${seq}.jpg`;
  else if (i >= 52 && i <= 55) file = `japan24_1123_hakone_lake_ashi_heiwa_torii_${seq}.jpg`;
  else {
    const mmdd = i <= 51 ? '1123' : '1124';
    file = `japan24_${mmdd}_hakone_hakone_mountain_slopes_${seq}.jpg`;
  }

  const captionIdx = j24HakoneGallery.length;
  const caption = j24HakoneGalleryCaptions[captionIdx] || 'Hakone Ridge Study';
  j24HakoneGallery.push({
    image: `/images/japan24/${file}`,
    caption,
    exif: 'Leica · ƒ/1.8 · ISO 50'
  });
}

writeChapter('japan24-hakone-fuji-foothills.md',
`country: "japan"
countryName: "Japan"
year: 2024
eraTitle: "Leica Optics & Mountain Ridges"
camera: "Xiaomi 14 Ultra"
stateName: "Kanagawa & Yamanashi: Hakone & Lake Ashi"
title: "Hakone Ridges & Lake Ashi"
chapterTitle: "Hakone: Torii of Peace, Volcanic Ridges and Lake Mist"
order: 2
coords: [139.0253, 35.2045]
coordsText: "35.205° N, 139.025° E"
date: "November 23-25, 2024"
time: "12:39 PM"
desc: "Drifting over the volcanic caldera of Hakone where ancient cedar forests meet the dark water of Lake Ashi. The vermilion Torii of Peace rises solitary from the cold lake surface."
exif: "${j24HakoneHero.exif}"
hero: "${j24HakoneHero.image}"
heroCaption: "${j24HakoneHero.caption}"
heroAspect: "${j24HakoneHero.aspect}"
sub1: "${j24HakoneSub1.image}"
sub1Caption: "${j24HakoneSub1.caption}"
sub1Exif: "${j24HakoneSub1.exif}"
sub2: "${j24HakoneSub2.image}"
sub2Caption: "${j24HakoneSub2.caption}"
sub2Exif: "${j24HakoneSub2.exif}"
gallery:
${j24HakoneGallery.map(g => `  - image: "${g.image}"\n    caption: "${g.caption}"\n    exif: "${g.exif}"`).join('\n')}`,
`<div class="bilingual-block">
  <p class="en-prose">
    The altitude shift climbing into the Hakone mountains cools the air dramatically. Across Lake Ashi, the water sits like polished dark glass, reflecting the rust and amber tones of the surrounding caldera slopes. Standing along the stone waterfront of Hakone Shrine, the massive Heiwa no Torii rises straight out of the water, its red lacquer weathered by decades of mountain spray and rain.
  </p>
  <p class="zh-prose">
    一路盘山进入箱根，山间的气温比平原低了数度。芦之湖的水面像一块深色的冷砚，两侧火山环岭的秋色倒映在水里，泛着焦糖与赭石的混合调。走到箱根神社临水处，和平鸟居的两根主柱扎入湖底，朱漆历经山岚雨露的浸润，在浓绿的杉林背景前显出一种沉静的力量。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    Crossing north into the Fuji foothills, dawn arrives with crystal clarity over Lake Kawaguchiko. Frost coats the shoreline rocks as the low morning sun breaks through horizontal cloud bands. The silver susuki grass catching the first amber glow forms a textured foreground, while the volcanic peak commands the entire sky in absolute silence.
  </p>
  <p class="zh-prose">
    顺着山势北上进入富士山麓，清晨的河口湖格外清澈。沿湖的基岩上结着薄薄一层晨霜，低矮的朝阳穿透横向排布的云带。芒草挂着初升暖阳的色泽，在近处交织成一片细腻的前景，而富士山整齐的山体则在彻底的静寂中统领着整片天际。
  </p>
</div>`
);

// 6. JAPAN 24 TOKYO AUTUMN (28 photos total)
const j24TokyoGallery = [];
for (let i = 73; i <= 99; i++) {
  if (i === 83 || i === 95) continue; // 72 is hero, 83 is sub1, 95 is sub2
  const seq = String(i).padStart(3, '0');
  let file = '';
  if (i <= 82) file = `japan24_1126_tokyo_todai_hongo_ginkgo_avenue_${seq}.jpg`;
  else if (i <= 94) file = `japan24_1127_tokyo_meiji_jingu_gaien_ginkgo_walk_${seq}.jpg`;
  else file = `japan24_1128_tokyo_yanaka_ginza_shitamachi_storefront_${seq}.jpg`;

  const captionIdx = j24TokyoGallery.length;
  const caption = j24TokyoGalleryCaptions[captionIdx] || 'Tokyo Autumn Study';
  j24TokyoGallery.push({
    image: `/images/japan24/${file}`,
    caption,
    exif: 'Leica · ƒ/1.8 · ISO 50'
  });
}

writeChapter('japan24-tokyo-autumn-ginkgo.md',
`country: "japan"
countryName: "Japan"
year: 2024
eraTitle: "Leica Optics & Golden Ginkgo"
camera: "Xiaomi 14 Ultra"
stateName: "Tokyo: Todai, Gaien & Yanaka"
title: "Tokyo Autumn & Old Quarters"
chapterTitle: "Tokyo: Todai Golden Colonnade, Meiji Gaien and Yanaka Alleys"
order: 3
coords: [139.7619, 35.7128]
coordsText: "35.713° N, 139.762° E"
date: "November 26-28, 2024"
time: "02:15 PM"
desc: "Late November golden hour across Tokyo. Massive ginkgo avenues blaze brilliant ochre along the University of Tokyo campus and Meiji Gaien, leading to quiet timber alleys in Yanaka."
exif: "${j24TokyoHero.exif}"
hero: "${j24TokyoHero.image}"
heroCaption: "${j24TokyoHero.caption}"
heroAspect: "${j24TokyoHero.aspect}"
sub1: "${j24TokyoSub1.image}"
sub1Caption: "${j24TokyoSub1.caption}"
sub1Exif: "${j24TokyoSub1.exif}"
sub2: "${j24TokyoSub2.image}"
sub2Caption: "${j24TokyoSub2.caption}"
sub2Exif: "${j24TokyoSub2.exif}"
gallery:
${j24TokyoGallery.map(g => `  - image: "${g.image}"\n    caption: "${g.caption}"\n    exif: "${g.exif}"`).join('\n')}`,
`<div class="bilingual-block">
  <p class="en-prose">
    Late November in Tokyo is defined by the sudden, intense turning of the ginkgo trees. Walking beneath the towering colonnades of the University of Tokyo at Hongo, the sky overhead is entirely replaced by a vaulted ceiling of luminous ochre. Fallen leaves blanket the historic cobblestones, dampening footsteps as students pass between the weathered Gothic brick arches of Yasuda Auditorium.
  </p>
  <p class="zh-prose">
    十一月下旬的东京，整座城市的节奏被陡然转黄的银杏浸染。漫步在东京大学本乡校区的古老连廊下，头顶的天空几乎被一层耀眼的赭黄穹顶所取代。金黄的落叶厚厚地铺在青石路上，走过时脚步声格外细微，学生们穿梭在安田讲堂斑驳的红砖哥特式拱券之间。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    At Meiji Jingu Gaien, the famous quadruple rows of cone-shaped ginkgoes form a ceremonial cathedral of light leading toward the Memorial Picture Gallery. A short train ride away in Yanaka Ginza, the pace slows to the hum of neighborhood shopfronts, where wooden sliding doors, paper lanterns, and steam from roadside stalls welcome the falling evening chill.
  </p>
  <p class="zh-prose">
    而在明治神宫外苑，四排经过精心修剪的圆锥形银杏树列队向前，宛如一座用光线筑成的露天大教堂，将视野一路引向远处的纪念画馆。转入谷中银座的老街，市井的温度在木格门与手写招牌间铺展开来，沿街小铺散出的热气，安抚着初冬傍晚渐沉的凉意。
  </p>
</div>`
);

console.log('All 6 chapters successfully updated with 100% of photos!');
