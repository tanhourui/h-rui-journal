const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/bangkok_manifest.json', 'utf8'));
data.forEach(d => {
  console.log(`${d.fileName} | ${d.date ? d.date.substring(0, 16) : 'no date'} | GPS: ${d.gps ? d.gps.map(n=>n.toFixed(4)).join(',') : 'none'} | ${d.focal}mm f/${d.fNumber}`);
});
