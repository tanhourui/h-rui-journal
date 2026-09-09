const fs = require("fs");
const path = require("path");

function getJpgSize(filePath) {
  const buf = fs.readFileSync(filePath);
  let offset = 2;
  while (offset < buf.length) {
    if (buf[offset] !== 0xFF) break;
    const marker = buf[offset + 1];
    if (marker === 0xC0 || marker === 0xC2) {
      const height = buf.readUInt16BE(offset + 5);
      const width = buf.readUInt16BE(offset + 7);
      return { width, height, aspect: width >= height ? "landscape" : "portrait" };
    }
    const len = buf.readUInt16BE(offset + 2);
    offset += 2 + len;
  }
  return { width: 0, height: 0, aspect: "unknown" };
}

const targets = [
  { name: "bangkok", dir: "public/images/thailand/bangkok" },
  { name: "betong", dir: "public/images/thailand/betong" },
  { name: "vietnam", dir: "public/images/vietnam/vietnam26" }
];

targets.forEach(t => {
  const files = fs.readdirSync(t.dir).filter(f => f.endsWith(".jpg")).sort();
  console.log(`\n=== ${t.name} (${files.length} images) ===`);
  files.forEach(f => {
    const s = getJpgSize(path.join(t.dir, f));
    console.log(`${f}: ${s.width}x${s.height} [${s.aspect}]`);
  });
});
