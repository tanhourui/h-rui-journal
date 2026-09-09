const fs = require('fs');
const path = 'src/content/journeys/japan/japan19-dusk-reflections-departure.md';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
  ["As the five-day journey drew toward its close, Tokyo took on a poignant warmth. Standing upon pedestrian overpasses at sunset, the low horizontal rays turned the steel rails into burnished gold ribbons. Thousands of commuters moved in harmonious unison, each carrying their own narrative across the glowing crosswalks.", "As the five-day trip came to an end, the light turned warm. Standing on a pedestrian bridge at sunset, the low-angle sun lit the railway tracks into dark gold. The intersection was packed with people getting off work, everyone hurrying along their own path in the fading light."],
  ["当为期五天的旅程接近尾声，东京呈现出一种动人的暖色调。傍晚站在天桥上，低角度的阳光将铁轨变成暗金色的缎带。成千上万的通勤者在发光的十字路口前行，每个剪影都带着自己的故事。", "这趟五天的旅程快结束的时候，光线变得很暖。傍晚站在天桥上，斜阳把铁轨照成了暗金色。路口挤满了下班的人，每个人都在光影里赶着自己的路。"],
  ["Night fell rapidly over Tokyo Bay, shifting the palette to cobalt and amber. At Haneda airport, the quiet tarmac stretched into darkness beneath glowing runway markers. Looking back toward the glittering metropolis from the cabin window as the aircraft climbed into the night sky, this initial summer journey seeded an enduring artistic commitment that would span years and continents.", "Night fell quickly, and the quiet airport tarmac stretched into the dark under the runway lights. After takeoff, looking down from the cabin window at the glowing city below—this summer trip to Japan became the beginning of many more journeys to come."],
  ["夜幕迅速降落在东京湾，将调色板转变为钴蓝和琥珀色。在羽田机场，安静的停机坪在闪烁的跑道灯下延伸至黑暗。飞机爬升进入夜空，从机舱窗口回望这座闪亮的都市，这趟初夏旅程种下了跨越多年的艺术承诺的种子。", "天很快就黑了，机场的停机坪在跑道灯下一直延伸到暗处。起飞后，从舷窗往下看，那是亮着灯的城市。这趟夏天的日本之行，成了后来很多次出发的开头。"],
  ['"Late Afternoon Summer Light Glancing Across Tokyo Station District"', '"Osaka Castle Walls and Moat in Afternoon Light"'],
  ['"Urban Crosswalk Shadows Lengthening at Dusk"', '"Stone Walls of Osaka Castle"'],
  ['"Warm Sunset Highlights Along the Railway Viaduct"', '"Osaka Castle Tower Under Cloudy Sky"'],
  ['"Tokyo Metropolis Rooftops Bathed in Golden Hour Amber"', '"Osaka Castle Moat and Greenery"'],
  ['"Long Shadows Stretching Across Shibuya Crosswalk"', '"Osaka Castle Reflected in Garden Pond"'],
  ['"Pedestrian Silhouette Against Sunset Skyline"', '"Osaka Castle Architectural Details"'],
  ['"Glass Railings Reflecting the Sinking Crimson Sun"', '"Looking Up at Osaka Castle Tower"'],
  ['"Railway Tracks Gleaming with Copper Sunset Light"', '"Osaka Castle Grounds and Moat"'],
  ['"Evening Commuters Waiting for Inbound Rapid Train"', '"Red Shrine Gate Isolated Against Black and White Background"'],
  ['"Neon Billboards Flickering On as Twilight Deepens"', '"Shrine Details and Wooden Beams"'],
  ['"Blue Hour Settling Over Tokyo Bay and Port Cranes"', '"Kyoto Street or Temple View"'],
  ['"Headlight Streaks Illuminating Wet Urban Boulevard"', '"Woman in Kimono with Red Umbrella at Kiyomizu-dera"'],
  ['"Solitary Footsteps on Quiet Station Platform"', '"Kiyomizu-dera Veranda and Wooden Structure"']
];

for (const [oldStr, newStr] of replacements) {
  content = content.replace(oldStr, newStr);
}
fs.writeFileSync(path, content, 'utf8');
