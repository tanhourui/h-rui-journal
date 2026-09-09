const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'src/content/journeys');
const publicDir = path.join(process.cwd(), 'public');
let missing = 0;
let total = 0;

function scan(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scan(full);
    else if (entry.name.endsWith('.md')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(/\/images\/[^\s"'()\n]+/g) || [];
      for (const m of matches) {
        total++;
        if (!fs.existsSync(path.join(publicDir, m))) {
          console.log(`MISSING in ${entry.name}: ${m}`);
          missing++;
        }
      }
    }
  }
}
scan(contentDir);
console.log(`Scanned ${total} image references across all chapters. Missing: ${missing}`);
