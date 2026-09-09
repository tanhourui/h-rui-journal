const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/merdeka_manifest.json'), 'utf8'));

const captions = {
  1: 'Spectator families and children resting along the curb beneath the broadcast LED screen.',
  2: '10th Parachute Brigade military skydiver trailing the Jalur Gemilang beneath a black-and-gold canopy.',
  3: 'Skydiver descending into the city center carrying the blue and red Malacca State Flag.',
  4: 'SMJK Katholik Drum Major tossing the ceremonial mace into the open blue sky above cheering crowds.',
  5: 'RMAF Su-30MKM, Hornet, and Hawk tactical jet formation streaking across cirrocumulus cloud layers.',
  6: 'F/A-18D Hornet banking in a high-G turn above thousands of spectators holding up mobile screens.',
  7: 'RMAF fighter formation deploying defensive flares with downward smoke arcs against the evening sky.',
  8: 'Solitary Su-30MKM fighter climbing vertically into the clear high-altitude atmosphere.',
  9: 'Twin-engine Su-30MKM in an acceleration climb displaying ventral camouflage and twin rudders.',
  10: 'RMAF Airbus A400M Atlas and Lockheed C-130 Hercules transport aircraft banking in close echelon.',
  11: 'Three tactical transport planes cutting across high engine contrails above stage scaffolding.',
  12: '10th Parachute Brigade soldiers in maroon berets and digital camouflage marching past spectators.',
  13: 'Multi-lingual Chingay festive banner inscribed with National Day greetings carried through the avenue.',
  14: 'Colossal ceremonial Southern Lion Dance head carried on wooden shoulder poles by youth performers.',
  15: 'Armed infantry contingent in combat rucksacks and facial camouflage marching in lockstep under the midday sun.',
  16: 'Miniature Malaysian paper flag clutched upright by a young child framed between family shoulders.'
};

const heroItem = manifest.find(m => m.fileName === 'merdeka_004.jpg');
const sub1Item = manifest.find(m => m.fileName === 'merdeka_005.jpg');
const sub2Item = manifest.find(m => m.fileName === 'merdeka_006.jpg');

const galleryIndices = [1, 2, 3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const galleryLines = galleryIndices.map(idx => {
  const item = manifest.find(m => m.index === idx);
  return `  - image: "${item.webPath}"\n    caption: "${captions[idx]}"\n    exif: "${item.exif}"\n    aspectRatio: "${item.aspectRatio}"`;
}).join('\n');

const doc = `---
country: "malaysia"
countryName: "Malaysia"
year: 2026
eraTitle: "National Sovereignty & The Malacca Crowd"
camera: "OPPO Find X9 Ultra · Hasselblad Mobile Optics"
stateName: "Malacca: Merdeka Boulevard & Historic Airspace"
title: "Merdeka Parade: Drum Majors & Jet Streams"
chapterTitle: "Merdeka Parade: Drum Majors, Jet Streams & The Malacca Crowd / 国庆游行：飞棒、战机与炽热人潮"
order: 3
coords: [102.2501, 2.1935]
coordsText: "2.194° N, 102.250° E"
date: "August 31, 2026"
time: "09:50 AM - 07:33 PM"
desc: "The sweltering asphalt of Malacca on Merdeka Day. Catholic High School drum majors tossing maces into the azure sky, 10th Parachute Brigade soldiers marching in digital camo, and the deafening sonic resonance of RMAF Su-30MKM and Hornet fighters overhead."
exif: "${heroItem.exif}"
hero: "${heroItem.webPath}"
heroCaption: "${captions[4]}"
heroAspect: "portrait"
sub1: "${sub1Item.webPath}"
sub1Caption: "${captions[5]}"
sub1Exif: "${sub1Item.exif}"
sub2: "${sub2Item.webPath}"
sub2Caption: "${captions[6]}"
sub2Exif: "${sub2Item.exif}"
gallery:
${galleryLines}
---

<div class="bilingual-block">
  <p class="en-prose">
    August 31 in Malacca carries a distinct, kinetic pulse. Under the blinding tropical sun, thousands line the road shoulder hours before the first drumbeat. When the SMJK Katholik marching band advances, the drum major flings his silver mace dozens of feet into the blue, catching it cleanly as the crowd erupts.
  </p>
  <p class="zh-prose">
    八月三十一日的马六甲弥漫着炽热而激昂的节庆声浪。正午的热浪翻滚在柏油路面上，数以千计的民众早已沿街席地而坐。公教中学军乐队行进至中心路段，指挥将手中的银棒用力掷向高空，在烈日蓝天中翻转数周后稳稳接住，引来沿街观众的一片惊呼与喝彩。
  </p>
</div>

<div class="bilingual-block">
  <p class="en-prose">
    High above the shophouses and parade scaffolding, the airspace shudders as the Royal Malaysian Air Force roars overhead. Sukhoi Su-30MKMs and F/A-18D Hornets bank in tight combat formation, releasing golden flare streams across the afternoon haze. Looking up between the silhouettes of fluttering paper flags and outstretched phone cameras, national pride feels immediate, loud, and communal.
  </p>
  <p class="zh-prose">
    老城骑楼与观礼看台上方，低空掠过的马来西亚皇家空军战机撕裂云层。苏霍伊苏-30MKM 与大黄蜂战机呈紧密楔形编队呼啸而过，尾部抛洒的热焰弹在暮色天际划出金色的弧线烟迹。穿过无数高举的手机屏幕与挥舞的小国旗缝隙仰望长空，那份属于整座小城的自豪感在轰鸣声中沉淀为清晰的集体记忆。
  </p>
</div>
`;

fs.writeFileSync(path.resolve(__dirname, '../src/content/journeys/malaysia/merdeka-parade.md'), doc, 'utf8');
console.log('Successfully written merdeka-parade.md');