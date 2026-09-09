import re
import sys

def process():
    file_path = 'src/content/journeys/japan/japan19-tokyo-summer-awakening.md'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We will update specific known captions, and rewrite the prose.

    # 1. Prose replacement
    content = content.replace(
        "August 2019 marked my very first visual exploration of Japan. Stepping out into the intense summer heat of Tokyo, the air was saturated with sunlight and the rhythmic chorus of cicadas. Along the Odaiba shoreline, the vast waters of Tokyo Bay sparkled beneath monumental cumulus clouds, framing the steel expanse of the Rainbow Bridge.",
        "August 2019 was my first time in Japan. Stepping out of the airport, the midsummer Tokyo sun hit immediately, accompanied by a wall of cicada noise. Out on the Odaiba waterfront, Tokyo Bay glared under heavy cumulus clouds, and the steel frame of the Rainbow Bridge stood sharp against the sky."
    )
    content = content.replace(
        "2019年八月，是我第一次用镜头记录日本的起点。踏出机舱迎面而来的是东京盛夏炽烈的日光与阵阵蝉鸣。在台场的临海步道上，东京湾湛蓝的水面在巨大的积雨云下泛着银光，彩虹大桥的钢铁桁架在清澈的高温天际线上勾勒出坚实的轮廓。",
        "2019年八月是我第一次来日本。刚出机场，东京盛夏的阳光就砸了下来，到处是蝉鸣。在台场的海边，东京湾在积雨云下反着光，彩虹大桥的钢架清晰地印在天上。"
    )
    content = content.replace(
        "Deeper in the city, the energy shifted between the hyper-dense electric billboards of Akihabara and the immaculate quiet of residential alleyways. In the shade of overhanging eaves, vending machines hummed softly while bicycles leaned patiently against wooden walls, revealing the profound balance between modern speed and domestic calm that would define every subsequent return.",
        "Moving into the city, the scenery cut back and forth between the dense electronic billboards of Akihabara and the quiet, narrow alleys of residential neighborhoods. In the shadows of eaves, vending machines hummed while bicycles leaned against wooden fences. Life settled somewhere between the speed and the stillness."
    )
    content = content.replace(
        "深入市区，视线在秋叶原层叠的电子招牌与居民区整洁安宁的巷弄之间自由切换。屋檐投下的浓厚阴影里，自动贩卖机发出微弱的运转声，自行车整齐地靠在木栅栏旁。那种在极致现代与静谧日常之间达成的精妙平衡，成为往后数次重返东瀛挥之不去的视觉印记。",
        "往市中心走，秋叶原密集的电子招牌和住宅区安静的窄巷来回交替。屋檐的阴影里，自动贩卖机嗡嗡作响，自行车停在木栅栏旁。生活就在这种快和慢之间铺开。"
    )

    # 2. Captions replacement
    captions = {
        "heroCaption": ('"Midsummer Sunlight across the Tokyo Waterfront Skyline"', '"Kiyomizu-dera Pagoda Overlooking the City under Summer Clouds"'),
        "sub1Caption": ('"Geometric Architecture and Crisp Shadows under August Sky"', '"Traditional Street View under August Sky"'),
        "sub2Caption": ('"Elevated Pedestrian Walkway Framing City Lines"', '"Traditional Architecture and Clear City Lines"'),
        "004": ('"Odaiba Seaside Promenade and Summer Breeze"', '"Kiyomizu-dera Architecture and Summer Breeze"'),
        "005": ('"Rainbow Bridge Spanning Tokyo Bay Waters"', '"Nijo Castle Moat and White Walls"'),
        "006": ('"Pedestrian Walkway Above Elevated Waterfront Railway"', '"Nijo Castle Stone Walls and Pine Trees"'),
        "007": ('"Summer Cumulus Clouds Drifting Over Modern Waterfront Towers"', '"Summer Cumulus Clouds Drifting Over Nijo Castle"'),
        "008": ('"Reflective Glass Facade of Tokyo International Exhibition Center"', '"Nijo Castle Moat Corner and Stone Base"'),
        "009": ('"Akihabara Electronic District in Bright August Afternoon"', '"Nijo Castle Gravel Path and Temple Gate"'),
        "010": ('"Multistory Billboards and Pedestrian Crossing at Chuo Dori"', '"Nijo Castle Garden Pond and Pine Trees"'),
        "011": ('"Train Overpass and Steel Girders in Quiet Side Alley"', '"Small Thatched Gate and Garden Path at Nijo Castle"'),
        "012": ('"Vintage Vending Machine Bank Humming in Shade"', '"Wooden Pavilion and Pond in Nijo Castle Gardens"'),
        "013": ('"Commuters Descending into Polished Metro Station"', '"Nijo Castle Outer Moat Corner"'),
        "014": ('"Shinjuku Skyscraper Silhouette in High Midsummer Sun"', '"Kiyomizu-dera Pagoda Overlooking Kyoto City"'),
        "015": ('"Overhead Telephone Wire Grid Against Crystal Blue Sky"', '"Kiyomizu-dera Red Niomon Gate with Stone Lions"'),
        "016": ('"Quiet Residential Alleyways of Eastern Tokyo"', '"Tourists on Kiyomizu-dera Platform Overlooking Kyoto"'),
        "020": ('"Dappled Tree Shadow Across Summer Sidewalk"', '"Woman in Kimono with Red Umbrella at Kiyomizu-dera"'),
        "023": ('"High-Speed Elevated Express Train Carving Through City"', '"Togetsukyo Bridge and Tourists at Arashiyama"'),
        "028": ('"Evening Lantern Illuminating Neighborhood Ramen Shop"', '"Large Pine Tree on Arashiyama Riverbank"'),
    }

    content = content.replace(f'heroCaption: {captions["heroCaption"][0]}', f'heroCaption: {captions["heroCaption"][1]}')
    content = content.replace(f'sub1Caption: {captions["sub1Caption"][0]}', f'sub1Caption: {captions["sub1Caption"][1]}')
    content = content.replace(f'sub2Caption: {captions["sub2Caption"][0]}', f'sub2Caption: {captions["sub2Caption"][1]}')

    for k, (old_cap, new_cap) in captions.items():
        if k in ["heroCaption", "sub1Caption", "sub2Caption"]: continue
        content = content.replace(f'caption: {old_cap}', f'caption: {new_cap}')
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    process()
