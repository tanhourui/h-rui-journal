const fs = require('fs');

const betong = JSON.parse(fs.readFileSync('src/data/betong_manifest.json', 'utf8'));
console.log('=== BETONG (19) ===');
betong.forEach(d => {
  const gpsStr = (d.gps && d.gps[0] != null) ? `${d.gps[0].toFixed(4)},${d.gps[1].toFixed(4)}` : 'none';
  console.log(`${d.fileName} | ${d.date ? d.date.substring(0, 16) : 'no date'} | GPS: ${gpsStr} | ${d.isPortrait ? 'portrait' : 'landscape'} | ${d.exif}`);
});

const vietnam = JSON.parse(fs.readFileSync('src/data/vietnam_manifest.json', 'utf8'));
console.log('\n=== VIETNAM (27) ===');
vietnam.forEach(d => {
  const gpsStr = (d.gps && d.gps[0] != null) ? `${d.gps[0].toFixed(4)},${d.gps[1].toFixed(4)}` : 'none';
  console.log(`${d.fileName} | ${d.date ? d.date.substring(0, 16) : 'no date'} | GPS: ${gpsStr} | ${d.isPortrait ? 'portrait' : 'landscape'} | ${d.exif}`);
});
