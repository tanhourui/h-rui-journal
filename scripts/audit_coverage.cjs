const fs = require('fs');
const path = require('path');

const manifests = [
  { name: 'bangkok', file: 'src/data/bangkok_manifest.json' },
  { name: 'betong', file: 'src/data/betong_manifest.json' },
  { name: 'vietnam', file: 'src/data/vietnam_manifest.json' },
  { name: 'malaysia', file: 'src/data/malaysia_manifest.json' },
  { name: 'merdeka', file: 'src/data/merdeka_manifest.json' },
  { name: 'japan19', file: 'src/data/japan19_manifest.json' },
  { name: 'japan23', file: 'src/data/japan23_processed.json' },
  { name: 'japan24', file: 'src/data/japan24_processed.json' },
  { name: 'japan25', file: 'src/data/japan25_manifest.json' },
];

const contentDir = path.join(process.cwd(), 'src/content/journeys');

// Gather all referenced images
const referencedImages = new Set();
function scan(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scan(full);
    else if (entry.name.endsWith('.md')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(/\/images\/[^\s"'()\n]+/g) || [];
      for (const m of matches) {
        referencedImages.add(m);
      }
    }
  }
}
scan(contentDir);

for (const m of manifests) {
  const data = JSON.parse(fs.readFileSync(m.file, 'utf8'));
  let inMd = 0;
  const missingFromMd = [];
  for (const item of data) {
    if (referencedImages.has(item.webPath)) {
      inMd++;
    } else {
      missingFromMd.push(item.webPath);
    }
  }
  console.log(`${m.name}: manifest has ${data.length}, in markdown chapters: ${inMd}, unreferenced: ${missingFromMd.length}`);
  if (missingFromMd.length > 0 && missingFromMd.length <= 10) {
    console.log('  unreferenced:', missingFromMd.join(', '));
  }
}
