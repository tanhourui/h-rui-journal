const fs = require('fs');
const path = 'src/content/journeys/japan/japan19-kansai-historic-canopy.md';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
  ["Boarding the high-speed rail toward Kansai, the geography opened across ancient capitals. At Osaka Castle, the massive dry-stone ramparts rose steeply from deep moats, their weathered granite surfaces radiating stored heat into the still summer air.", "Taking the Shinkansen toward Kansai, the landscape outside the window shifted to ancient capitals. At Osaka Castle, massive granite walls rose straight up from the moat, the stones radiating heat into the summer air."],
  ["搭乘新干线向关西腹地进发，地理景观在古都之间渐次展开。在大阪城，巨大的干砌花岗岩城垣从深邃的护城河中陡峭拔起，饱经风霜的石面在静谧的夏日空气中辐射着储蓄的热量。", "坐上新干线往关西走，窗外的风景变成了古都。在大阪城，巨大的花岗岩城墙从护城河边拔地而起，石头在夏天的空气里散发着热气。"],
  ["In Kyoto and Nara, the temperature felt softened by ancient canopies. Walking through the cryptomeria groves of Kasuga Taisha, sacred deer moved peacefully between moss-covered stone lanterns. Here, the camera learned to slow down, capturing the interplay between the deep green of summer foliage and the solemn geometry of weathered timber architecture.", "In Kyoto and Nara, the temperature dropped under the shade of ancient trees. Walking through the cedar groves of Kasuga Taisha, deer moved between moss-covered stone lanterns. Here, the pace of taking photos naturally slowed down, catching the light between the deep summer green and the old wooden architecture."],
  ["在京都和奈良，温度似乎被古老的树冠柔化了。穿行在春日大社的柳杉林中，神鹿在长满青苔的石灯笼之间安静地移动。在这里，镜头学会了慢下来，捕捉盛夏绿意的深邃与岁月侵蚀的木质建筑之间庄严的几何交响。", "到了京都和奈良，古树的树冠把温度降了下来。走在春日大社的杉树林里，鹿群在长满青苔的石灯笼间穿梭。在这里，拍照的节奏也跟着慢了下来，记录着夏天的绿意和老木头房子之间的光影。"],
  ['"Massive Granite Stone Walls of Osaka Castle Moat in Midday Light"', '"Wooden Temple Gate and Pine Trees"'],
  ['"Historic Moat Water Reflecting Summer Tree Branches"', '"Tenryuji Garden Pond and Greenery"'],
  ['"Castle Gate Approach Beneath August Sunlight"', '"Tenryuji Pond and Rocks in Sunlight"'],
  ['"Stone Moat Reflections Around Massive Castle Ramparts"', '"Wooden Temple Veranda Overlooking Garden"'],
  ['"Ancient Japanese Black Pine Framing Fortress Walls"', '"Looking Up at Arashiyama Bamboo Grove"'],
  ['"Shinkansen High-Speed Platform Gliding Through Countryside"', '"Tourists Walking Through Arashiyama Bamboo Grove"'],
  ['"Arashiyama Bamboo Culms Swaying in Mountain Draft"', '"Udon Noodles with Sansai Greens"'],
  ['"Nara Park Ancient Cedars Shading Grazing Sacred Deer"', '"Kyoto Tower Illuminated at Night"'],
  ['"Curved Temple Ridge Tiles Piercing Summer Sky"', '"Fushimi Inari Romon Gate"'],
  ['"Historic Pagoda Gables Rising Above Forest Canopy"', '"Fox Statue at Fushimi Inari"']
];

for (const [oldStr, newStr] of replacements) {
  content = content.replace(oldStr, newStr);
}
fs.writeFileSync(path, content, 'utf8');
