const fs = require('fs');

const data = `---
country: "thailand"
countryName: "Thailand"
year: 2024
eraTitle: "Songkran, Temples & Yaowarat Night"
camera: "Leica / Xiaomi"
stateName: "Bangkok: Chao Phraya, S2O & Chinatown"
title: "Bangkok: Chao Phraya, S2O & Chinatown"
chapterTitle: "Bangkok: Chao Phraya, S2O & Chinatown / 曼谷"
order: 1
coords: [100.493, 13.756]
coordsText: "13.756° N, 100.493° E"
date: "April 13-16, 2024"
time: "Various"
desc: "Three days in Bangkok for Songkran. From the neon glow of Yaowarat Road to the ancient stones of Ayutthaya and the water cannons of the S2O Music Festival."
exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/50s ISO 500"
hero: "/images/thailand/bangkok/bkk25_001.jpg"
heroCaption: "Neon Signs Illuminating Yaowarat Road Traffic at Night"
heroAspect: "portrait"
sub1: "/images/thailand/bangkok/bkk25_002.jpg"
sub1Caption: "Michelin Star Street Food Stall Front on Yaowarat Road"
sub1Exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/100s ISO 640"
sub2: "/images/thailand/bangkok/bkk25_003.jpg"
sub2Caption: "Tuk-Tuk Drivers Waiting by Glowing Shop Signs in Chinatown"
sub2Exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/100s ISO 400"
gallery:
  - image: "/images/thailand/bangkok/bkk25_004.jpg"
    caption: "Chrome Front Grille of a Tuk-Tuk Reflecting Street Lights"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/50s ISO 500"
  - image: "/images/thailand/bangkok/bkk25_005.jpg"
    caption: "Tuk-Tuk Driver Waiting Beneath Bright 7-Eleven Neon Sign"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/50s ISO 400"
  - image: "/images/thailand/bangkok/bkk25_006.jpg"
    caption: "Street Chef Preparing Food at Michelin Recommended Stall"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/100s ISO 800"
  - image: "/images/thailand/bangkok/bkk25_007.jpg"
    caption: "Tuk-Tuks Navigating Under Bright Red Neon Signs of Yaowarat Road"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/100s ISO 640"
  - image: "/images/thailand/bangkok/bkk25_008.jpg"
    caption: "Pedestrians Walking Below Glowing Red Chinese Banners in Chinatown"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/100s ISO 320"
  - image: "/images/thailand/bangkok/bkk25_009.jpg"
    caption: "Large Vertical Neon Signs Looming Over Busy Yaowarat Traffic"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/100s ISO 400"
  - image: "/images/thailand/bangkok/bkk25_010.jpg"
    caption: "Top-Down View of a Tuk-Tuk Roof Speeding Through the Night"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/50s ISO 400"
  - image: "/images/thailand/bangkok/bkk25_011.jpg"
    caption: "Three Friends Sitting on the Ornate Steps of Wat Arun"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/200s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_012.jpg"
    caption: "Two Friends Posing Together on the Steep Steps of Wat Arun"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/250s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_013.jpg"
    caption: "Group Photo in Front of the Towering Central Prang of Wat Arun"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/400s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_014.jpg"
    caption: "Man Standing on High Terrace Corner Among Wat Arun Sculptures"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/500s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_015.jpg"
    caption: "Looking Up Through Dark Brick Chimney Opening at Ayutthaya Ruins"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/1000s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_016.jpg"
    caption: "Two Figures Sitting Under Large Trees Near Ayutthaya Brick Ruins"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/250s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_017.jpg"
    caption: "Ayutthaya Stone Prang Framed Perfectly Through a Ruined Brick Doorway"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/500s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_018.jpg"
    caption: "Sun Glowing Behind Ayutthaya Prang Over Dark Stone Stairs"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/2000s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_019.jpg"
    caption: "Looking Out Over Bustling Night Traffic from Elevated Concrete Walkway"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/50s ISO 640"
  - image: "/images/thailand/bangkok/bkk25_020.jpg"
    caption: "Looking Up at Stark White Ayutthaya Stupa Against Blue Sky"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/1000s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_021.jpg"
    caption: "Wide Angle View of Large White Stupa Structure at Ayutthaya"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/800s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_022.jpg"
    caption: "Steep Central Staircase Leading Up the White Ayutthaya Stupa"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/1000s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_023.jpg"
    caption: "Close-up of Golden Buddha Niche Set Into White Stupa Surface"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/1000s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_024.jpg"
    caption: "Reclining White Buddha Statue Viewed Past Brick Wall and Tourist Umbrella"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/500s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_025.jpg"
    caption: "Seated Buddha Statue Draped in Gold Cloth Against Setting Sun"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/400s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_026.jpg"
    caption: "Profile of White Seated Buddha Statue With Brick Ruins Behind"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/500s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_027.jpg"
    caption: "White Seated Buddha Profile Illuminated by Golden Sun Flare"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/400s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_028.jpg"
    caption: "Looking Straight Up at the Intricate Ceramic Tiers of Wat Arun"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/500s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_029.jpg"
    caption: "Steep Upward View of Wat Arun Ornaments Catching Afternoon Light"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/400s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_030.jpg"
    caption: "Wat Arun Glowing Bright Gold Across the Chao Phraya River at Night"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/25s ISO 800"
  - image: "/images/thailand/bangkok/bkk25_031.jpg"
    caption: "Illuminated Wat Arun Spire Viewed Down a Dark Street With Neon Signs"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/50s ISO 640"
  - image: "/images/thailand/bangkok/bkk25_032.jpg"
    caption: "Looking Up at Brightly Lit Wat Arun Ornaments Against Night Sky"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/50s ISO 400"
  - image: "/images/thailand/bangkok/bkk25_033.jpg"
    caption: "Tighter Street View Highlighting Glowing Wat Arun Spire at Night"
    exif: "xiaomi 14 Ultra | LEICA 75mm f/1.8 1/50s ISO 640"
  - image: "/images/thailand/bangkok/bkk25_034.jpg"
    caption: "Three Friends Taking a Selfie Before the S2O Festival Entrance"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/1000s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_035.jpg"
    caption: "Massive S2O Festival Main Stage Structure During Daytime"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/1200s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_036.jpg"
    caption: "Crowd Gathering Under Giant Water Cannons at S2O Festival"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/1000s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_037.jpg"
    caption: "Water Jets Spraying Over Festival Crowd in Late Afternoon Light"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/800s ISO 50"
  - image: "/images/thailand/bangkok/bkk25_038.jpg"
    caption: "Main Stage Screens Flashing as Water Sprays Over Dancing Crowd"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/500s ISO 100"
  - image: "/images/thailand/bangkok/bkk25_039.jpg"
    caption: "Night View of S2O Festival Stage With Blazing Lights and Lasers"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/100s ISO 800"
  - image: "/images/thailand/bangkok/bkk25_040.jpg"
    caption: "Bright Neon Lights Piercing Through Water Spray Over the Festival"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/100s ISO 1000"
  - image: "/images/thailand/bangkok/bkk25_041.jpg"
    caption: "Massive Fire Effects Erupting From Main Stage at Night"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/200s ISO 640"
  - image: "/images/thailand/bangkok/bkk25_042.jpg"
    caption: "Silhouette of Crowd Beneath Dazzling Lasers and Water Cannons"
    exif: "xiaomi 14 Ultra | LEICA 23mm f/1.6 1/100s ISO 1200"

---

<div class="bilingual-block">
  <div class="en-prose">
    April heat in Bangkok sits heavy on the skin, a physical weight only broken by the chaotic, joyful relief of Songkran. We navigated the saturated crowds at the S2O Music Festival, where massive water cannons swept back and forth across the dancing masses, turning the night into a neon-lit rainstorm. It was loud, intense, and completely unreserved. Leaving the thumping bass behind, we headed out to Ayutthaya the next day. The ancient stone ruins, worn by centuries of weather and war, offered a quiet contrast to the modern festival. Walking among the brick foundations and headless Buddha statues, you get a sense of deep time. The white stupas gleamed under a hard sun, shadows sharp against the stone.
  </div>
  <div class="zh-prose">
    曼谷四月的高温沉重地压在皮肤上，只有宋干节那种混乱又纯粹的快乐才能将其打破。我们在S2O音乐节湿透的人群里穿梭，巨大的水炮在跳舞的人群上空来回扫射，把夜晚变成了一场霓虹闪烁的暴雨。那里喧闹、激烈，毫无保留。第二天，我们把重低音甩在身后，前往大城府。那些历经几个世纪风雨和战火的古老石柱，与现代音乐节形成了安静的反差。走在砖墙地基和无头佛像之间，你能感受到一种深沉的岁月感。白色的佛塔在烈日下闪耀，石块上投下锋利的阴影。
  </div>
</div>

<div class="bilingual-block">
  <div class="en-prose">
    Back in the city, Wat Arun caught the late afternoon light. The steep ceramic steps feel more like a climb than a walk, forcing you to look closely at the intricate porcelain tiles pieced together to form the towering prangs. Across the river later that evening, the temple glowed gold, reflecting in the black water of the Chao Phraya.
  </div>
  <div class="zh-prose">
    回到市区，郑王庙正好披上了傍晚的阳光。攀登那些陡峭的陶瓷台阶与其说是在走，不如说是爬，这让你不得不近距离注视那些拼凑成高耸佛塔的精美瓷片。那天晚上，在河对岸看过去，整座寺庙散发着金色的光芒，倒映在湄南河黑色的河水中。
  </div>
</div>

<div class="bilingual-block">
  <div class="en-prose">
    Night fell on Yaowarat Road, instantly turning the district into a tunnel of bright neon and exhaust fumes. Tuk-tuks carved through the dense traffic, their chrome grilles catching the red glow of giant Chinese shop signs. Michelin-starred street stalls had lines snaking down the pavement, cooks working over open flames in a rhythm perfected over decades. It was a sensory overload—the smell of roasted pork, the hum of engines, the glare of the lights—a perfectly typical night in Chinatown.
  </div>
  <div class="zh-prose">
    夜幕降临耀华力路，整个街区瞬间变成了一条充满明亮霓虹灯和尾气的隧道。嘟嘟车在密集的车流中穿梭，镀铬的车头格栅映出巨大的中式招牌的红光。米其林推荐的街头摊位前排起了长龙，厨师们在明火上以几十年练就的节奏忙碌着。这是一种感官上的超载——烤猪肉的香味、引擎的轰鸣、刺眼的灯光——这就是唐人街最寻常的一个夜晚。
  </div>
</div>
`;

fs.writeFileSync('src/content/journeys/thailand/bangkok-chao-phraya.md', data);
