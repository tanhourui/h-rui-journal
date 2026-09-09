const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '../src/content/journeys');
let totalPhotos = 0;
let chapterCount = 0;
const countryStats = {};

function scanDir(d) {
  const items = fs.readdirSync(d);
  for (const item of items) {
    const full = path.join(d, item);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
    } else if (item.endsWith('.md')) {
      chapterCount++;
      const content = fs.readFileSync(full, 'utf8');
      const countryMatch = content.match(/country:\s*"([^"]+)"/);
      const country = countryMatch ? countryMatch[1] : 'unknown';
      
      const galleryMatches = content.match(/  - image:/g) || [];
      const hasHero = content.includes('hero:');
      const hasSub1 = content.includes('sub1:');
      const hasSub2 = content.includes('sub2:');
      
      const count = (hasHero ? 1 : 0) + (hasSub1 ? 1 : 0) + (hasSub2 ? 1 : 0) + galleryMatches.length;
      totalPhotos += count;
      countryStats[country] = (countryStats[country] || 0) + count;
      console.log(`${item} (${country}): ${count} exposures`);
    }
  }
}

scanDir(dir);
console.log('\nTotal Chapters:', chapterCount);
console.log('Country Breakdown:', countryStats);
console.log('Grand Total Exposures across portfolio:', totalPhotos);
