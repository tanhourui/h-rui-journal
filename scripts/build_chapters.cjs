const fs = require('fs');
const path = require('path');

const bkkManifest = require('../src/data/bangkok_manifest.json');
const betongManifest = require('../src/data/betong_manifest.json');
const j19Manifest = require('../src/data/japan19_manifest.json');
const myManifest = require('../src/data/malaysia_manifest.json');
const vnManifest = require('../src/data/vietnam_manifest.json');

const contentDir = path.resolve(__dirname, '../src/content/journeys');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// 1. UPDATE EXISTING JAPAN CHAPTERS WITH POETIC ERAS
const j25Files = ['fuji-five-lakes.md', 'tokyo-bay-skyline.md', 'tokyo-everyday.md', 'tokyo-shitamachi.md'];
j25Files.forEach(f => {
  const p = path.join(contentDir, 'japan', f);
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/eraTitle:\s*"Mirrorless Discipline"/g, 'eraTitle: "Winter Resonances & Peak Light"');
    fs.writeFileSync(p, c, 'utf8');
  }
});

const j24Files = ['japan24-hakone-fuji-foothills.md', 'japan24-kamakura-shonan.md', 'japan24-tokyo-autumn-ginkgo.md'];
j24Files.forEach(f => {
  const p = path.join(contentDir, 'japan', f);
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/eraTitle:\s*"Leica Optics & Coastal Autumn"/g, 'eraTitle: "Autumn Tides & Golden Canopies"');
    c = c.replace(/eraTitle:\s*"Leica Optics & Mountain Ridges"/g, 'eraTitle: "Autumn Tides & Golden Canopies"');
    c = c.replace(/eraTitle:\s*"Leica Optics & Golden Ginkgo"/g, 'eraTitle: "Autumn Tides & Golden Canopies"');
    fs.writeFileSync(p, c, 'utf8');
  }
});

const j23Files = ['japan23-kawaguchiko-fuji-reeds.md', 'japan23-kyoto-ancient-capital.md', 'japan23-tokyo-first-impressions.md'];
j23Files.forEach(f => {
  const p = path.join(contentDir, 'japan', f);
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/eraTitle:\s*"Mobile Exploration & First Wonder"/g, 'eraTitle: "Rain on Cedar & Ancient Slopes"');
    c = c.replace(/eraTitle:\s*"Mobile Exploration & Lakeside Dawn"/g, 'eraTitle: "Rain on Cedar & Ancient Slopes"');
    c = c.replace(/eraTitle:\s*"Mobile Exploration & Ancient Kyoto"/g, 'eraTitle: "Rain on Cedar & Ancient Slopes"');
    fs.writeFileSync(p, c, 'utf8');
  }
});

console.log('Successfully updated existing Japan 23, 24, 25 era titles to poetic names.');

// 2. BUILD MALAYSIA CHAPTERS (Hometown Malacca + Penang)
ensureDir(path.join(contentDir, 'malaysia'));

// Malacca: items 6 to 26 (21 photos)
const malaccaItems = myManifest.slice(5); // index 5 to 25 -> 21 items
const malaccaHero = malaccaItems[0]; // malaysia_006
const malaccaSub1 = malaccaItems[1]; // malaysia_007
const malaccaSub2 = malaccaItems[2]; // malaysia_008
const malaccaGallery = malaccaItems.slice(3); // 18 items

const malaccaCaptions = [
  'Dark Sand Shoreline and Foam of the Malacca Straits',
  'Nighttime River Reflection Beneath the Old Bridge Lights',
  'Weathered Brick and Courtyard Shade of Heritage Shophouses',
  'Sliding Wooden Shutters and Vintage Morning Facade',
  'Gentle Archway Framing Ancient Alley Sunlight',
  'Weathered Terra-Cotta Tiles Overhanging Malacca River',
  'Old Town Alleyways Bathed in Warm Afternoon Humidity',
  'Quiet Shophouse Corridor and Woven Bamboo Blinds',
  'Dappled Eaves Shadow Across Vintage Textured Stucco',
  'Quiet Twilight Settling Over Historic Riverbanks',
  'Warm Tungsten Glow Illuminating Quiet Neighborhood Lane',
  'Peranakan Decorative Tiles Beside Carved Timber Door',
  'Narrow Drainage Stones and Green Moss of Old Settlement',
  'Evening Lanterns Igniting Along the Silent Waterfront',
  'Solitary Banyan Roots Embracing Red Laterite Wall',
  'Breeze from the Malacca Straits Rustling Casuarina Trees',
  'Night Fall Over Historic Straits City and Quiet Hearth',
  'Familiar Cobblestones and Enduring Spirit of Hometown Malacca'
];

const malaccaMd = `---
country: "malaysia"
countryName: "Malaysia"
year: 2025
eraTitle: "Hometown Roots & Straits Tides"
camera: "Xiaomi 14 Ultra & Hasselblad Mobile"
stateName: "Malacca: Historic Core & Straits Coastline"
title: "Malacca: Hometown Alleys & Straits Waters"
chapterTitle: "Malacca: Hometown Alleys, Straits Tides and Red Earth / 古城马六甲"
order: 1
coords: [102.2464, 2.2056]
coordsText: "2.206° N, 102.246° E"
date: "March 2025 & August 2026"
time: "06:49 PM"
desc: "A return to my hometown Malacca. The smell of salt and wet clay drifting from the Straits, weathered red laterite stones of St. Paul's Hill, and quiet alleys bathed in tropical dusk."
exif: "${malaccaHero.exif}"
hero: "${malaccaHero.webPath}"
heroCaption: "Klebang Coastal Casuarina Pines at Twilight over the Malacca Straits"
heroAspect: "${malaccaHero.isPortrait ? 'portrait' : 'landscape'}"
sub1: "${malaccaSub1.webPath}"
sub1Caption: "Pastel Horizon and Gentle Breakers Along the Coastline"
sub1Exif: "${malaccaSub1.exif}"
sub2: "${malaccaSub2.webPath}"
sub2Caption: "Wet Clay and Receding Tides in the Evening Breeze"
sub2Exif: "${malaccaSub2.exif}"
gallery:
${malaccaGallery.map((item, idx) => `  - image: "${item.webPath}"
    caption: "${malaccaCaptions[idx] || 'Malacca Hometown Study'}"
    exif: "${item.exif}"`).join('\n')}
---

<div class="bilingual-block">
  <p class="en-prose">
    Returning to Malacca is never merely a journey of sight, it is an encounter with memory. Walking along the coast at Klebang in the late afternoon, the wind carrying the dense, briny warmth of the Malacca Straits whispers through the stands of Casuarina trees. The red laterite soil beneath my shoes, weathered by centuries of maritime monsoons and Dutch ramparts, holds a gravity that grounds every photograph taken here.
  </p>
  <p class="zh-prose">
    回到故乡马六甲，从来不只是一场视觉上的重游，而是一次与记忆的静默对话。傍晚漫步在吉里望的海边，带着咸湿与温热的海风从马六甲海峡深处拂来，穿过木麻黄树梢发出的细碎声响。脚下红褐色的红土与残砖，历经数百年季风与潮汐的冲刷，沉淀出一种唯有故土才拥有的质地。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    As night settles over the old town, the tourist clamor recedes from Jonker Street into quiet residential corridors. Weathered Peranakan tiles cool down under the night air, and the reflections of ancient timber balconies ripple gently across the dark waters of the Malacca River. Here, where every corner retains the resonance of childhood footsteps, the lens ceases to search for exotic novelty and settles into sincere, affectionate contemplation.
  </p>
  <p class="zh-prose">
    夜幕降临老城，喧嚣逐渐从鸡场街褪入深幽的居民巷弄。斑驳的娘惹花砖在夜露中褪去白日的燥热，古老的木造雕花阳台倒映在平静的马六甲河水里。在这座承载着童年步伐的小城，镜头不再追逐猎奇的异域符号，而是静静收拢那些熟悉而温厚的日常呼吸。
  </p>
</div>
`;

fs.writeFileSync(path.join(contentDir, 'malaysia', 'malacca-hometown-straits.md'), malaccaMd, 'utf8');

// Penang: items 1 to 5 (5 photos)
const penangItems = myManifest.slice(0, 5);
const penangHero = penangItems[0];
const penangSub1 = penangItems[1];
const penangSub2 = penangItems[2];
const penangGallery = penangItems.slice(3);

const penangMd = `---
country: "malaysia"
countryName: "Malaysia"
year: 2024
eraTitle: "Northern Straits & Heritage Shophouses"
camera: "Xiaomi 14 Ultra"
stateName: "Penang: George Town & Seaside Promenade"
title: "Penang: George Town Heritage"
chapterTitle: "Penang: George Town Heritage & Coastal Shadows / 槟城老城"
order: 2
coords: [100.3282, 5.4124]
coordsText: "5.412° N, 100.328° E"
date: "September 15, 2024"
time: "12:10 PM"
desc: "Drifting through the historic corridors of George Town, Penang. Crumbling colonnades, fragrant herbal tea stalls, and the sea breeze sweeping off the northern strait."
exif: "${penangHero.exif}"
hero: "${penangHero.webPath}"
heroCaption: "Colonial Five-Footway Colonnade and Morning Sunlight in George Town"
heroAspect: "${penangHero.isPortrait ? 'portrait' : 'landscape'}"
sub1: "${penangSub1.webPath}"
sub1Caption: "Historic Timber Framing and Shophouse Street Angle"
sub1Exif: "${penangSub1.exif}"
sub2: "${penangSub2.webPath}"
sub2Caption: "Courtyard Sunbeams Slicing through High Timber Ceilings"
sub2Exif: "${penangSub2.exif}"
gallery:
  - image: "${penangGallery[0].webPath}"
    caption: "Seaside Highway Curvature Facing the Northern Straits"
    exif: "${penangGallery[0].exif}"
  - image: "${penangGallery[1].webPath}"
    caption: "Esplanade Sea Wall and Golden Hour Coastal Tide"
    exif: "${penangGallery[1].exif}"
---

<div class="bilingual-block">
  <p class="en-prose">
    George Town carries the layered patina of Penang Island. Walking beneath the five-footway corridors, midday sun cuts through weathered stucco pillars in precise diagonal ribbons. The sea breeze from the northern reach of the strait cools the humidity just enough to reveal the subtle textures of peeling lime paint and hand-planed teakwood shutters.
  </p>
  <p class="zh-prose">
    乔治市带着槟岛独有的斑驳层次。穿行在老街的五脚基骑楼下，正午的烈阳在剥落的石灰立柱间切出清晰的光刃。海风从海峡北段吹拂而来，稍稍吹散了热带的湿热，空气中弥漫着老茶室与海水的微咸气息。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    At the edge of the Esplanade, dusk brings a silver cast to the water. The rhythmic slap of waves against the granite sea wall echoes the enduring heritage of a port that has received voyagers for centuries.
  </p>
  <p class="zh-prose">
    黄昏行至旧关仔角的海堤边，潮水泛起银灰色的微光。浪花拍打着百年前筑起的花岗岩海堤，沉稳的节拍呼应着这座港口几百年来见证过的南洋迁徙与归航。
  </p>
</div>
`;

fs.writeFileSync(path.join(contentDir, 'malaysia', 'penang-heritage-alleys.md'), penangMd, 'utf8');
console.log('Successfully generated Malaysia chapters: Malacca (21 photos) & Penang (5 photos).');

// 3. BUILD THAILAND CHAPTERS (Bangkok 43 photos + Betong 21 photos)
ensureDir(path.join(contentDir, 'thailand'));

// Bangkok: 43 photos (1 hero + 2 subs + 40 gallery)
const bkkHero = bkkManifest[0];
const bkkSub1 = bkkManifest[1];
const bkkSub2 = bkkManifest[2];
const bkkGallery = bkkManifest.slice(3);

const bkkCaptions = [
  'Chao Phraya Express Boat Navigating River Swells',
  'Wat Arun Central Prang Rising Above Shimmering Water',
  'Ornate Porcelain Mosaics on Ancient Buddhist Spire',
  'Morning Pilgrim Offering Flowers in Temple Courtyard',
  'Elevated Skytrain Gliding Between Concrete Towers',
  'Narrow Chinatown Alleyway Crowded with Herb Stalls',
  'Steam Rising from Roadside Noodle Cauldron at Dusk',
  'Tuk-Tuk Neon Streaks Beneath Sukhumvit Overpass',
  'Golden Reclining Buddha Reflected in Polished Stone',
  'Traditional Wooden Longtail Boat Carving White Foam',
  'Monks in Saffron Robes Crossing Shaded Canal Bridge',
  'Sunlight Filtering Through Ancient Banyan in Temple Grounds',
  'Street Corner Shrines Draped in Fragrant Marigolds',
  'Silhouetted Rooftops Against Amber Tropical Sunset',
  'Evening Commuter Crowd Gathering at River Pier',
  'Bustling Night Bazaar Lanterns Reflected on Wet Asphalt',
  'Colonial Architecture of Charoenkrung Road',
  'Tangled Overhead Power Lines Against Storm Clouds',
  'Quiet Backwater Khlong and Weathered Stilt Houses',
  'Temple Bell Resonance in Early Morning Heat',
  'Modern Glass Facades Mirroring Historic Riverboats',
  'Motorcycle Stream Surging Through Green Light',
  'Chinatown Gold Shop Signs Radiating Ruby Glow',
  'Solitary Alms Bowl Resting on Teakwood Table',
  'Dusk Descent Over the Great River of Kings',
  'Water Taxi Wake Illuminating Under Pier Spotlights',
  'Silent Stupa in Midday Tropical Glare',
  'Intricate Stucco Reliefs on Palace Boundary Walls',
  'Riverfront Cafe Shadows Stretching across Pier Planks',
  'Neon Reflections Dancing on Chao Phraya Waves',
  'Late Night Street Food Haven at Yaowarat',
  'Morning Monks Receiving Offerings in Quiet Alley',
  'Modern Art Gallery Hidden Within Historic Warehouse',
  'Silken Water Surface of Bangkok Canals at Dawn',
  'Lush Tropical Fronds Crowding Balcony Railings',
  'High-Speed Skytrain Station Architecture at Twilight',
  'Ancient Stone Guardian Lion Watching Temple Gate',
  'Distant Thunderhead Rolling Over Metropolis Spire',
  'Ferry Commuters Absorbed in River Horizon',
  'Last Light of Bangkok Fading Over the Emerald Water'
];

const bkkMd = `---
country: "thailand"
countryName: "Thailand"
year: 2025
eraTitle: "River of Kings & Urban Pulse"
camera: "Xiaomi 14 Ultra"
stateName: "Bangkok: Chao Phraya & Old Quarters"
title: "Bangkok: River of Kings"
chapterTitle: "Bangkok: River of Kings & Urban Density / 曼谷"
order: 1
coords: [100.5090, 13.7410]
coordsText: "13.741° N, 100.509° E"
date: "April 9-14, 2025"
time: "02:30 PM"
desc: "The electric vitality of Bangkok where sacred spires rise beside gleaming glass towers. Chao Phraya river ferries carving through brown water, incense smoke in Chinatown, and the humid dusk."
exif: "${bkkHero.exif}"
hero: "${bkkHero.webPath}"
heroCaption: "Midday Vitality and River Traffic Along the Chao Phraya"
heroAspect: "${bkkHero.isPortrait ? 'portrait' : 'landscape'}"
sub1: "${bkkSub1.webPath}"
sub1Caption: "Historic Temple Roofline Against April Cloud Formations"
sub1Exif: "${bkkSub1.exif}"
sub2: "${bkkSub2.webPath}"
sub2Caption: "River Ferry Crossing Beneath Towering Urban Skyline"
sub2Exif: "${bkkSub2.exif}"
gallery:
${bkkGallery.map((item, idx) => `  - image: "${item.webPath}"
    caption: "${bkkCaptions[idx] || 'Bangkok Urban Study'}"
    exif: "${item.exif}"`).join('\n')}
---

<div class="bilingual-block">
  <p class="en-prose">
    Bangkok moves with an unstoppable aquatic rhythm. The Chao Phraya River serves as both the city's ancient spine and its most vital stage. Standing on the rocking deck of a local commuter express boat, the spray cools the stifling April heat while towering porcelain spires of Wat Arun drift past steel-and-glass hotel monoliths.
  </p>
  <p class="zh-prose">
    曼谷的律动始终依附着水流展开。湄南河既是这座古老城市的骨架，也是它最具生命力的舞台。站在微微摇晃的水上公交甲板上，激起的浪花冲淡了四月的暑气，远处郑王庙细腻的瓷片塔尖与对岸现代的钢构高楼在视线中交错重叠。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    Venturing deeper into Yaowarat and the canal communities, the sensory intensity peaks. Saffron robes brush past steaming soup stalls, and the smell of jasmine garlands mingles with exhaust and river silt. When dusk arrives, the neon of Chinatown ignites the asphalt in deep crimson, turning every street corner into a vivid cinematic tableau.
  </p>
  <p class="zh-prose">
    转入耀华力路的老唐人街与运河弄堂，城市的感官浓度骤然升温。金黄色的袈裟擦过翻滚着热气的面摊，茉莉花环的清香与排气管的余热混合在湿润的空气里。当黄昏渐深，霓虹招牌将整片街道染成浓重的朱红，每一个转角都定格成饱含市井温度的电影画格。
  </p>
</div>
`;

fs.writeFileSync(path.join(contentDir, 'thailand', 'bangkok-chao-phraya.md'), bkkMd, 'utf8');

// Betong: 21 photos (1 hero + 2 subs + 18 gallery)
const betongHero = betongManifest[0];
const betongSub1 = betongManifest[1];
const betongSub2 = betongManifest[2];
const betongGallery = betongManifest.slice(3);

const betongCaptions = [
  'Winding Highland Mountain Road Flanked by Dense Tropical Canopy',
  'Early Morning Mist Settling in Valleys of Yala Province',
  'Aiyerweng Sea of Clouds Rolling Over Southern Peaks at Dawn',
  'Historic Piyamit Tunnel Entrance Carved into Rainforest Granite',
  'Sunlight Piercing Through Towering Old-Growth Fig Trees',
  'Quiet Town Square and Weathered Clock Tower in Betong',
  'Highland Rubber Plantation in Soft Morning Illumination',
  'Mountain Village Wooden Eaves Dripping with Dawn Condensation',
  'Limestone Outcrop Emerging Above the Rolling Sea of Fog',
  'Solitary Footbridge Spanning Verdant Mountain Stream',
  'Border Valley Horizon Fading Into Distant Blue Ridges',
  'Traditional Clay Tile Roof of Highland Village Shrine',
  'Twisting Rainforest Roots Enveloping Mountain Stone',
  'Cool Mountain Breeze Swaying Dense Bamboo Groves',
  'Late Afternoon Shadows Across Southern Border Crossing',
  'Quiet Tea House Terrace Overlooking Valley Mist',
  'Dusk Falling Over the Remote Peaks of Southern Thailand',
  'Silent Night Descending on the Forest Border Settlement'
];

const betongMd = `---
country: "thailand"
countryName: "Thailand"
year: 2019
eraTitle: "Southern Mist & Border Ridges"
camera: "Huawei & Leica Mobile"
stateName: "Yala: Betong Town & Aiyerweng Clouds"
title: "Betong: Southern Mist"
chapterTitle: "Betong: Southern Mist & Mountain Canopy / 勿洞"
order: 2
coords: [101.0305, 5.7480]
coordsText: "5.748° N, 101.031° E"
date: "July 19-21, 2019"
time: "08:45 AM"
desc: "The deep mountain enclave of Betong at Thailand's southernmost tip. Sea of clouds rolling across Aiyerweng, ancient rainforest tunnels, and the cool silence of border highlands."
exif: "${betongHero.exif}"
hero: "${betongHero.webPath}"
heroCaption: "Highland Forest Canopy and Serpentine Mountain Road in Betong"
heroAspect: "${betongHero.isPortrait ? 'portrait' : 'landscape'}"
sub1: "${betongSub1.webPath}"
sub1Caption: "Deep Rainforest Valley in Morning Mountain Haze"
sub1Exif: "${betongSub1.exif}"
sub2: "${betongSub2.webPath}"
sub2Caption: "Aiyerweng Cloud Horizon Sweeping Across the Mountain Ridge"
sub2Exif: "${betongSub2.exif}"
gallery:
${betongGallery.map((item, idx) => `  - image: "${item.webPath}"
    caption: "${betongCaptions[idx] || 'Betong Mountain Study'}"
    exif: "${item.exif}"`).join('\n')}
---

<div class="bilingual-block">
  <p class="en-prose">
    Tucked deep within the Sankalakhiri mountain range at the southern extremity of Thailand, Betong exists in a climate distinctly its own. Long before the morning sun crests the ridge at Aiyerweng, a vast sea of white clouds rolls through the valleys like a silent ocean, submerging peaks and rainforest canopies in pure mist.
  </p>
  <p class="zh-prose">
    深嵌在泰国最南端的三卡拉奇里山脉深处，勿洞拥有着得天独厚的高原气候。在晨光尚未翻越爱微峰之前，白茫茫的云海早已在山谷间无声翻涌，将热带雨林的冠层与远处的群峰淹没在纯净的雾霭之中。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    In town, the rhythm is deliberate and tranquil. Weathered shophouses, legacy rubber plantations, and the historical passages of Piyamit speak of decades of cross-border coexistence. The mountain air, cool and rich with wet soil, gives each photograph a softness that feels untouched by the frantic pace of the capital.
  </p>
  <p class="zh-prose">
    小镇里的节奏沉稳而舒缓。沿街斑驳的排屋、山坡上的老橡胶林，以及披着青苔的友谊村历史地道，诉说着这座边陲重镇数十年的宁静交融。山林间清冽湿润的气息，为每一张照片注入了一种远离都市喧嚣的沉静底色。
  </p>
</div>
`;

fs.writeFileSync(path.join(contentDir, 'thailand', 'betong-southern-mist.md'), betongMd, 'utf8');
console.log('Successfully generated Thailand chapters: Bangkok (43 photos) & Betong (21 photos).');

// 4. BUILD VIETNAM CHAPTER (Hanoi 29 photos)
ensureDir(path.join(contentDir, 'vietnam'));

const vnHero = vnManifest[0];
const vnSub1 = vnManifest[1];
const vnSub2 = vnManifest[2];
const vnGallery = vnManifest.slice(3);

const vnCaptions = [
  'Morning Sunlight Illuminating Narrow Old Quarter Facades',
  'Colonial Green French Shutters on Weathered Ochre Wall',
  'Tangled Overhead Wires Framing St. Joseph Cathedral Spire',
  'Quiet Coffee Drinkers on Low Stools Beside Rail Tracks',
  'Willows Weeping Over Hoan Kiem Lake in Early Morning Fog',
  'Cyclo Driver Waiting in the Shadow of Ancient Banyan Tree',
  'Steam Drifting from Pho Kettle in Historic Narrow Alley',
  'Motorcycle Convoy Navigating Old Quarter Crossroad',
  'Sunlight Slicing Across Long Bien Bridge Steel Girders',
  'Weathered French Balcony Overlooking Street Vendors',
  'Ceramic Tiles and Calligraphy at Temple of Literature',
  'Red Lacquered Huc Bridge Arcing Over Sacred Waters',
  'Solitary Florist Bicycle Laden with Fresh Morning Blooms',
  'Ancient Tube House Courtyard Drawing Natural Sky Light',
  'Afternoon Tea and Sunflower Seeds on Tiny Sidewalk Table',
  'Quiet Twilight Settling Over West Lake Horizon',
  'Warm Incense Smoke Swirling Beneath Pagoda Eaves',
  'Train Street Steel Rails Reflecting Amber Evening Light',
  'Bustling Night Street Awakening Along Hang Bac Street',
  'Old Quarter Timber Workshop with Hand-Carved Signs',
  'Tungsten Bulbs Casting Warm Amber Across Cobblestones',
  'Traditional Conical Hat Silhouette in Evening Drizzle',
  'Historic French Villa Preserving Decades of Memories',
  'Street Corner Cafe Buzzing in Cool March Evening',
  'Silent Water Reflections Along Hoan Kiem Shoreline',
  'Farewell Glimpse of Hanoi Old Quarter Night Awakening'
];

const vnMd = `---
country: "vietnam"
countryName: "Vietnam"
year: 2026
eraTitle: "Old Quarter Shadows & Colonial Eaves"
camera: "Sony α6400 & Xiaomi 14 Ultra"
stateName: "Hanoi: Old Quarter & Hoan Kiem"
title: "Hanoi: Old Quarter Shadows"
chapterTitle: "Hanoi: Old Quarter Shadows & Colonial Eaves / 河内"
order: 1
coords: [105.8464, 21.0368]
coordsText: "21.037° N, 105.846° E"
date: "March 12-15, 2026"
time: "07:15 AM"
desc: "The atmospheric density of Hanoi. Weathered ochre facades, French colonial shutters, tangled overhead wires, and the cool spring mist rising from Hoan Kiem Lake."
exif: "${vnHero.exif}"
hero: "${vnHero.webPath}"
heroCaption: "Morning Shadows and French Colonial Facades in the Old Quarter"
heroAspect: "${vnHero.isPortrait ? 'portrait' : 'landscape'}"
sub1: "${vnSub1.webPath}"
sub1Caption: "Weathered Green Shutters and Slicing Early Light"
sub1Exif: "${vnSub1.exif}"
sub2: "${vnSub2.webPath}"
sub2Caption: "Rail Track Curvature Running Past Residential Doorsteps"
sub2Exif: "${vnSub2.exif}"
gallery:
${vnGallery.map((item, idx) => `  - image: "${item.webPath}"
    caption: "${vnCaptions[idx] || 'Hanoi Street Study'}"
    exif: "${item.exif}"`).join('\n')}
---

<div class="bilingual-block">
  <p class="en-prose">
    Hanoi in March greets the traveler with a soft, cool moisture that clings to the skin and lens alike. In the labyrinthine Old Quarter, thirty-six historic guild streets weave together layers of Vietnamese heritage and French colonial ambition. Weathered ochre plaster peels to reveal century-old brickwork, while high green louvered shutters filter the pale morning sky into quiet second-story rooms.
  </p>
  <p class="zh-prose">
    三月的河内笼罩在一层清凉细腻的春霭之中。老城三十六行街的迷宫深处，百年的越南传统与法式殖民建筑在此层叠交织。斑驳的赭黄外墙剥落出深色的砖石肌理，高耸的墨绿色百叶窗将苍白的天光过滤进二楼幽静的居室。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    Life in the capital unfolds on the street. Low plastic stools cluster around sidewalk coffee stalls where robust drip coffee filters into condensed milk, accompanied by the steady hiss of steam from pho broths. As dusk falls over Hoan Kiem Lake, the willow branches brush the gray water surface in silence, while nearby neon and tungsten lamps illuminate the enduring pulse of a thousand-year-old city.
  </p>
  <p class="zh-prose">
    这座城市的生命力始终在街头舒展。低矮的塑料小凳围坐在街边咖啡摊旁，滴漏咖啡的醇厚香气与滚烫牛肉汤的白色蒸汽在薄雾中交织。黄昏降临还剑湖畔，垂柳轻拂微澜的湖面，而街巷里亮起的钨丝暖灯与霓虹光晕，点燃了这座千年古都永不沉睡的温情脉搏。
  </p>
</div>
`;

fs.writeFileSync(path.join(contentDir, 'vietnam', 'hanoi-old-quarter.md'), vnMd, 'utf8');
console.log('Successfully generated Vietnam chapter: Hanoi (29 photos).');

// 5. BUILD JAPAN 2019 CHAPTERS (82 photos total: 28 + 28 + 26)
// Chapter 1: items 1-28 (1 hero + 2 subs + 25 gallery)
const j19Ch1Items = j19Manifest.slice(0, 28);
const j19Ch1Hero = j19Ch1Items[0];
const j19Ch1Sub1 = j19Ch1Items[1];
const j19Ch1Sub2 = j19Ch1Items[2];
const j19Ch1Gallery = j19Ch1Items.slice(3);

const j19Ch1Captions = [
  'Odaiba Seaside Promenade and Summer Breeze',
  'Rainbow Bridge Spanning Tokyo Bay Waters',
  'Pedestrian Walkway Above Elevated Waterfront Railway',
  'Summer Cumulus Clouds Drifting Over Modern Waterfront Towers',
  'Reflective Glass Facade of Tokyo International Exhibition Center',
  'Akihabara Electronic District in Bright August Afternoon',
  'Multistory Billboards and Pedestrian Crossing at Chuo Dori',
  'Train Overpass and Steel Girders in Quiet Side Alley',
  'Vintage Vending Machine Bank Humming in Shade',
  'Commuters Descending into Polished Metro Station',
  'Shinjuku Skyscraper Silhouette in High Midsummer Sun',
  'Overhead Telephone Wire Grid Against Crystal Blue Sky',
  'Quiet Residential Alleyways of Eastern Tokyo',
  'Potted Hydrangeas and Stone Steps in Neighborhood Corner',
  'Bicycles Resting Against Sunlit Timber Fence',
  'Local Soba Shop Sliding Screen and Blue Noren Curtain',
  'Dappled Tree Shadow Across Summer Sidewalk',
  'Railway Level Crossing Signal in Midday Heat',
  'Clear Horizon View from High City Overlook',
  'High-Speed Elevated Express Train Carving Through City',
  'Polished Brass Handrails and Subway Car Window',
  'Quiet Evening Incline Near Historic Shrine',
  'Golden Sunlight Glancing Off Concrete Overpass',
  'Tokyo Metropolis Street Awakening to Late August Dusk',
  'Evening Lantern Illuminating Neighborhood Ramen Shop'
];

const j19Ch1Md = `---
country: "japan"
countryName: "Japan"
year: 2019
eraTitle: "Midsummer Horizons & First Light"
camera: "Huawei & Leica Triple Optics"
stateName: "Tokyo: Summer Streets & Waterfront"
title: "Tokyo: Midsummer Awakening"
chapterTitle: "Tokyo: Midsummer Awakening, Odaiba Waterfront and City Heat / 初见东瀛"
order: 1
coords: [139.6917, 35.6895]
coordsText: "35.690° N, 139.692° E"
date: "August 21-22, 2019"
time: "11:22 AM"
desc: "The very beginning of my journeys in Japan. Intense August light washing over the Odaiba shoreline, towering electric districts, and the crisp silence of residential backstreets."
exif: "${j19Ch1Hero.exif}"
hero: "${j19Ch1Hero.webPath}"
heroCaption: "Midsummer Sunlight across the Tokyo Waterfront Skyline"
heroAspect: "${j19Ch1Hero.isPortrait ? 'portrait' : 'landscape'}"
sub1: "${j19Ch1Sub1.webPath}"
sub1Caption: "Geometric Architecture and Crisp Shadows under August Sky"
sub1Exif: "${j19Ch1Sub1.exif}"
sub2: "${j19Ch1Sub2.webPath}"
sub2Caption: "Elevated Pedestrian Walkway Framing City Lines"
sub2Exif: "${j19Ch1Sub2.exif}"
gallery:
${j19Ch1Gallery.map((item, idx) => `  - image: "${item.webPath}"
    caption: "${j19Ch1Captions[idx] || 'Tokyo Summer Study'}"
    exif: "${item.exif}"`).join('\n')}
---

<div class="bilingual-block">
  <p class="en-prose">
    August 2019 marked my very first visual exploration of Japan. Stepping out into the intense summer heat of Tokyo, the air was saturated with sunlight and the rhythmic chorus of cicadas. Along the Odaiba shoreline, the vast waters of Tokyo Bay sparkled beneath monumental cumulus clouds, framing the steel expanse of the Rainbow Bridge.
  </p>
  <p class="zh-prose">
    2019年八月，是我第一次用镜头记录日本的起点。踏出机舱迎面而来的是东京盛夏炽烈的日光与阵阵蝉鸣。在台场的临海步道上，东京湾湛蓝的水面在巨大的积雨云下泛着银光，彩虹大桥的钢铁桁架在清澈的高温天际线上勾勒出坚实的轮廓。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    Deeper in the city, the energy shifted between the hyper-dense electric billboards of Akihabara and the immaculate quiet of residential alleyways. In the shade of overhanging eaves, vending machines hummed softly while bicycles leaned patiently against wooden walls, revealing the profound balance between modern speed and domestic calm that would define every subsequent return.
  </p>
  <p class="zh-prose">
    深入市区，视线在秋叶原层叠的电子招牌与居民区整洁安宁的巷弄之间自由切换。屋檐投下的浓厚阴影里，自动贩卖机发出微弱的运转声，自行车整齐地靠在木栅栏旁。那种在极致现代与静谧日常之间达成的精妙平衡，成为往后数次重返东瀛挥之不去的视觉印记。
  </p>
</div>
`;

fs.writeFileSync(path.join(contentDir, 'japan', 'japan19-tokyo-summer-awakening.md'), j19Ch1Md, 'utf8');

// Chapter 2: items 29-56 (28 photos: 1 hero + 2 subs + 25 gallery)
const j19Ch2Items = j19Manifest.slice(28, 56);
const j19Ch2Hero = j19Ch2Items[0];
const j19Ch2Sub1 = j19Ch2Items[1];
const j19Ch2Sub2 = j19Ch2Items[2];
const j19Ch2Gallery = j19Ch2Items.slice(3);

const j19Ch2Captions = [
  'Stone Moat Reflections Around Massive Castle Ramparts',
  'Ancient Japanese Black Pine Framing Fortress Walls',
  'Dotonbori Canal Walk and Vibrant Commercial Facades',
  'Reflected Signs Dancing on Dark Canal Waters',
  'Shinkansen High-Speed Platform Gliding Through Countryside',
  'Kyoto Historic Machiya Eaves Under August Canopy',
  'Higashiyama Stepping Stones Warmed by Afternoon Sun',
  'Vermilion Lacquer Shrine Gate Emerging from Greenery',
  'Arashiyama Bamboo Culms Swaying in Mountain Draft',
  'Clear Running Stream beside Mossy Stone Embankment',
  'Nara Park Ancient Cedars Shading Grazing Sacred Deer',
  'Stone Lanterns Flanking the Pathway to Kasuga Taisha',
  'Weathered Cedar Bark and Lichen in Sacred Forest',
  'Curved Temple Ridge Tiles Piercing Summer Sky',
  'Traditional Tea Stall Shaded by Scarlet Parasol',
  'Gravel Courtyard Raked in Meditative Waves',
  'Wooden Veranda Overlooking Sunlit Rock Garden',
  'Ceramic Rain Water Basin Beside Bamboo Spout',
  'Historic Pagoda Gables Rising Above Forest Canopy',
  'Quiet Neighborhood Shrines Flanked by Summer Ferns',
  'Evening Light Glancing Off Gion Cobblestones',
  'Sliding Wooden Koshi Lattice Catching Amber Dusk',
  'Lantern Glow Reflecting on Wet Pavement Stones',
  'Quiet Riverbank Breeze Along the Kamogawa',
  'Night Falling Over the Thousand-Year Ancient Capital'
];

const j19Ch2Md = `---
country: "japan"
countryName: "Japan"
year: 2019
eraTitle: "Midsummer Horizons & First Light"
camera: "Huawei & Leica Triple Optics"
stateName: "Kansai: Osaka, Kyoto & Nara"
title: "Kansai: Historic Canopies"
chapterTitle: "Kansai: Castle Ramparts, Kyoto Cedar Shrines and Nara Park / 关西古都"
order: 2
coords: [135.5023, 34.6937]
coordsText: "34.694° N, 135.502° E"
date: "August 22-23, 2019"
time: "01:03 PM"
desc: "Traveling westward into the Kansai heartland. Cyclopean granite ramparts of Osaka Castle, the timeless cedar sanctuaries of Kyoto, and sacred deer resting beneath Nara's ancient woods."
exif: "${j19Ch2Hero.exif}"
hero: "${j19Ch2Hero.webPath}"
heroCaption: "Massive Granite Stone Walls of Osaka Castle Moat in Midday Light"
heroAspect: "${j19Ch2Hero.isPortrait ? 'portrait' : 'landscape'}"
sub1: "${j19Ch2Sub1.webPath}"
sub1Caption: "Historic Moat Water Reflecting Summer Tree Branches"
sub1Exif: "${j19Ch2Sub1.exif}"
sub2: "${j19Ch2Sub2.webPath}"
sub2Caption: "Castle Gate Approach Beneath August Sunlight"
sub2Exif: "${j19Ch2Sub2.exif}"
gallery:
${j19Ch2Gallery.map((item, idx) => `  - image: "${item.webPath}"
    caption: "${j19Ch2Captions[idx] || 'Kansai Historic Study'}"
    exif: "${item.exif}"`).join('\n')}
---

<div class="bilingual-block">
  <p class="en-prose">
    Boarding the high-speed rail toward Kansai, the geography opened into a tapestry of ancient capitals. At Osaka Castle, the massive dry-stone ramparts rose steeply from deep moats, their weathered granite surfaces radiating stored heat into the still summer air.
  </p>
  <p class="zh-prose">
    搭乘新干线一路向西奔赴关西，地貌在视野中徐徐展开为千年古都的织锦。大阪城巨大的花岗岩护城石垣拔地而起，巨石表面历经风霜，在静止的盛夏空气中散发着白日沉淀的余温。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    In Kyoto and Nara, the temperature felt softened by ancient canopies. Walking through the cryptomeria groves of Kasuga Taisha, sacred deer moved peacefully between moss-covered stone lanterns. Here, the camera learned to slow down, capturing the interplay between the deep green of summer foliage and the solemn geometry of weathered timber architecture.
  </p>
  <p class="zh-prose">
    而在京都与奈良，古老树冠下的空气显得格外柔和。漫步在春日大社的浓密杉林之间，神鹿缓步穿梭在布满青苔的石灯笼阵中。在这里，镜头学会了慢下来，捕捉盛夏浓绿的林木与古朴木构建筑之间深沉而永恒的对话。
  </p>
</div>
`;

fs.writeFileSync(path.join(contentDir, 'japan', 'japan19-kansai-historic-canopy.md'), j19Ch2Md, 'utf8');

// Chapter 3: items 57-82 (26 photos: 1 hero + 2 subs + 23 gallery)
const j19Ch3Items = j19Manifest.slice(56);
const j19Ch3Hero = j19Ch3Items[0];
const j19Ch3Sub1 = j19Ch3Items[1];
const j19Ch3Sub2 = j19Ch3Items[2];
const j19Ch3Gallery = j19Ch3Items.slice(3);

const j19Ch3Captions = [
  'Tokyo Metropolis Rooftops Bathed in Golden Hour Amber',
  'Long Shadows Stretching Across Shibuya Crosswalk',
  'Pedestrian Silhouette Against Sunset Skyline',
  'Glass Railings Reflecting the Sinking Crimson Sun',
  'Railway Tracks Gleaming with Copper Sunset Light',
  'Evening Commuters Waiting for Inbound Rapid Train',
  'Neon Billboards Flickering On as Twilight Deepens',
  'Blue Hour Settling Over Tokyo Bay and Port Cranes',
  'Headlight Streaks Illuminating Wet Urban Boulevard',
  'Solitary Footsteps on Quiet Station Platform',
  'Overhead Cable Network Silhouetted Against Violet Dusk',
  'Distant Glow of Tokyo Tower Igniting in Night Sky',
  'Cozy Izakaya Lantern Glow Welcoming Late Commuters',
  'Polished Carriage Doors Reflecting Passing City Lights',
  'Airport Terminal Windows Overlooking Tarmac Lights',
  'Refueling Trucks Moving Around Resting Jetliners',
  'Runway Signal Markers Glowing in Warm Evening Air',
  'Departure Gate Lounge in Quiet Midnight Stillness',
  'Boarding Bridge Approaching the Waiting Aircraft',
  'Aircraft Wing Silhouetted Against Deep Blue Night Sky',
  'Last Reflections of Tokyo City Lights from the Ascending Window',
  'Enduring Memories of Midsummer First Exploration',
  'Homeward Flight Across the Dark Pacific Ocean'
];

const j19Ch3Md = `---
country: "japan"
countryName: "Japan"
year: 2019
eraTitle: "Midsummer Horizons & First Light"
camera: "Huawei & Leica Triple Optics"
stateName: "Tokyo & Departure: Dusk & Tarmac"
title: "Tokyo: Dusk & Farewell"
chapterTitle: "Tokyo: Dusk Reflections, Twilight City and Tarmac Departure / 夏夜归途"
order: 3
coords: [139.7671, 35.6812]
coordsText: "35.681° N, 139.767° E"
date: "August 24-25, 2019"
time: "07:30 PM"
desc: "The final days of the 2019 summer journey. Amber sunset falling over Tokyo crossroads, blue hour settling across the bay, and the midnight tarmac departure."
exif: "${j19Ch3Hero.exif}"
hero: "${j19Ch3Hero.webPath}"
heroCaption: "Late Afternoon Summer Light Glancing Across Tokyo Station District"
heroAspect: "${j19Ch3Hero.isPortrait ? 'portrait' : 'landscape'}"
sub1: "${j19Ch3Sub1.webPath}"
sub1Caption: "Urban Crosswalk Shadows Lengthening at Dusk"
sub1Exif: "${j19Ch3Sub1.exif}"
sub2: "${j19Ch3Sub2.webPath}"
sub2Caption: "Warm Sunset Highlights Along the Railway Viaduct"
sub2Exif: "${j19Ch3Sub2.exif}"
gallery:
${j19Ch3Gallery.map((item, idx) => `  - image: "${item.webPath}"
    caption: "${j19Ch3Captions[idx] || 'Tokyo Farewell Study'}"
    exif: "${item.exif}"`).join('\n')}
---

<div class="bilingual-block">
  <p class="en-prose">
    As the five-day journey drew toward its close, Tokyo took on a poignant warmth. Standing upon pedestrian overpasses at sunset, the low horizontal rays turned the steel rails into burnished gold ribbons. Thousands of commuters moved in harmonious unison, each carrying their own narrative across the glowing crosswalks.
  </p>
  <p class="zh-prose">
    当为期五天的盛夏旅程临近尾声，东京在暮色中显出一种动人的温存。黄昏站在过街天桥上俯瞰，斜阳将交错的铁轨镀成发亮的铜金色缎带。千百名归途中的行人步伐轻快而协调，在泛着金光的斑马线上交汇又分离。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    Night fell rapidly over Tokyo Bay, shifting the palette to cobalt and amber. At Haneda airport, the quiet tarmac stretched into darkness beneath glowing runway markers. Looking back toward the glittering metropolis from the cabin window as the aircraft climbed into the night sky, this initial summer journey seeded an enduring artistic commitment that would span years and continents.
  </p>
  <p class="zh-prose">
    夜色迅速吞没了东京湾，将天际染成深邃的钴蓝与焦糖。羽田机场静谧的停机坪在跑道指示灯的微光下向黑暗延展。随着飞机腾空爬升，从舷窗回望脚下璀璨如星河的城市灯火，这场盛夏的初见，已然为未来数年的光影跋涉埋下了最深沉的伏笔。
  </p>
</div>
`;

fs.writeFileSync(path.join(contentDir, 'japan', 'japan19-dusk-reflections-departure.md'), j19Ch3Md, 'utf8');
console.log('Successfully generated Japan 2019 chapters: Tokyo (28 photos), Kansai (28 photos), Departure (26 photos).');

console.log('\n========================================================');
console.log('ALL NEW CHAPTERS GENERATED WITH 100% PHOTO INCLUSION!');
console.log('========================================================');