const fs = require('fs');
const path = require('path');

const dir = 'src/content/journeys';
const mdFiles = [];
function scan(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const full = path.join(d, e.name);
    if (e.isDirectory()) scan(full);
    else if (e.name.endsWith('.md')) mdFiles.push(full);
  }
}
scan(dir);

const bannedWords = ['breathtaking', 'picturesque', 'tapestry', 'enchanting', 'nestled', 'bustling', 'vibrant', 'stunning', 'marvelous', 'symphony'];

console.log(`Auditing ${mdFiles.length} markdown chapters:`);
for (const f of mdFiles) {
  const rel = path.relative(process.cwd(), f);
  const content = fs.readFileSync(f, 'utf8');
  const foundBanned = [];
  for (const w of bannedWords) {
    const regex = new RegExp(`\\b${w}\\b`, 'gi');
    if (regex.test(content)) foundBanned.push(w);
  }
  const imgCount = (content.match(/\/images\/[^\s"'()\n]+/g) || []).length;
  console.log(`${rel} (${imgCount} imgs) ${foundBanned.length > 0 ? ' [BANNED WORDS: ' + foundBanned.join(', ') + ']' : ' [CLEAN]'}`);
}
