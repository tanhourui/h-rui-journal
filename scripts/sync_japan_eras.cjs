const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const exifReader = require('exif-reader');

const baseDir = 'C:\\Users\\Admin\\OneDrive\\Pictures\\for antigravity';
const pubBase = path.resolve(__dirname, '../public/images');
const dataDir = path.resolve(__dirname, '../src/data');

function parseGps(gpsInfo) {
  if (!gpsInfo || !gpsInfo.GPSLatitude || !gpsInfo.GPSLongitude) return null;
  const latParts = gpsInfo.GPSLatitude;
  const lonParts = gpsInfo.GPSLongitude;
  const latRef = gpsInfo.GPSLatitudeRef || 'N';
  const lonRef = gpsInfo.GPSLongitudeRef || 'E';
  let lat = latParts[0] + (latParts[1] / 60) + (latParts[2] / 3600);
  if (latRef === 'S') lat = -lat;
  let lon = lonParts[0] + (lonParts[1] / 60) + (lonParts[2] / 3600);
  if (lonRef === 'W') lon = -lon;
  return [Number(lon.toFixed(5)), Number(lat.toFixed(5))];
}

async function syncFolder(srcName, destDir, webPrefix, manifestName) {
  const srcPath = path.join(baseDir, srcName);
  const rawFiles = fs.readdirSync(srcPath)
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  console.log('\n--- Syncing ' + srcName + ' (' + rawFiles.length + ' files) ---');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const manifest = [];
  const validFileNames = new Set();

  for (let i = 0; i < rawFiles.length; i++) {
    const rawFile = rawFiles[i];
    const inPath = path.join(srcPath, rawFile);
    // Use the rawFile name directly or if already structured
    const outName = rawFile;
    validFileNames.add(outName);
    const outPath = path.join(destDir, outName);

    if (!fs.existsSync(outPath)) {
      console.log('  Generating: ' + outName);
      await sharp(inPath)
        .rotate()
        .resize({ width: 2048, height: 2048, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true, mozjpeg: true })
        .toFile(outPath);
    }

    const outMeta = await sharp(outPath).metadata();
    const isPortrait = outMeta.height > outMeta.width;

    let exif = null;
    try {
      const meta = await sharp(inPath).metadata();
      if (meta.exif) exif = exifReader(meta.exif);
    } catch (e) {}

    let camera = '';
    let fNumber = null;
    let exposureTime = null;
    let iso = null;
    let focal = null;
    let date = null;
    let gpsCoords = null;

    if (exif) {
      if (exif.Image) {
        const make = (exif.Image.Make || '').toString().trim();
        const model = (exif.Image.Model || '').toString().trim();
        if (model.includes('24030PN60G') || model.includes('Xiaomi 14 Ultra')) camera = 'Xiaomi 14 Ultra';
        else if (model.includes('ELS-NX9') || model.includes('P40 Pro')) camera = 'Huawei P40 Pro';
        else if (model.includes('ILCE-6400')) camera = 'Sony α6400';
        else if (model) camera = make ? (make + ' ' + model).trim() : model;
      }
      if (exif.Photo) {
        fNumber = exif.Photo.FNumber;
        if (exif.Photo.ExposureTime) {
          const exp = exif.Photo.ExposureTime;
          exposureTime = exp < 1 ? '1/' + Math.round(1 / exp) + 's' : exp + 's';
        }
        iso = exif.Photo.ISOSpeedRatings || exif.Photo.ISOSpeed;
        focal = exif.Photo.FocalLengthIn35mmFilm || (exif.Photo.FocalLength ? Math.round(exif.Photo.FocalLength) : null);
        if (exif.Photo.DateTimeOriginal) {
          date = exif.Photo.DateTimeOriginal instanceof Date ? exif.Photo.DateTimeOriginal.toISOString() : String(exif.Photo.DateTimeOriginal);
        }
      }
      if (exif.GPSInfo) gpsCoords = parseGps(exif.GPSInfo);
    }

    const exifPills = [];
    if (camera) exifPills.push(camera);
    if (focal) exifPills.push(focal + 'mm');
    if (fNumber) exifPills.push('ƒ/' + fNumber);
    if (exposureTime) exifPills.push(exposureTime);
    if (iso) exifPills.push('ISO ' + iso);

    manifest.push({
      index: i + 1,
      fileName: outName,
      webPath: webPrefix + '/' + outName,
      width: outMeta.width,
      height: outMeta.height,
      aspectRatio: Number((outMeta.width / outMeta.height).toFixed(3)),
      isPortrait,
      camera: camera || 'Camera Archive',
      exif: exifPills.join(' · ') || (camera || 'Exif Archive'),
      date,
      gps: gpsCoords
    });
  }

  // Delete orphaned files
  for (const f of fs.readdirSync(destDir)) {
    if (/\.(jpe?g|png|webp)$/i.test(f) && !validFileNames.has(f)) {
      console.log('  Deleting orphaned file from ' + destDir + ': ' + f);
      fs.unlinkSync(path.join(destDir, f));
    }
  }

  if (manifestName) {
    const mfPath = path.join(dataDir, manifestName);
    fs.writeFileSync(mfPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log('Saved manifest: ' + mfPath + ' (' + manifest.length + ' items)');
  }
}

(async () => {
  await syncFolder('JAPAN 23', path.join(pubBase, 'japan23'), '/images/japan23', 'japan23_processed.json');
  await syncFolder('JAPAN 24', path.join(pubBase, 'japan24'), '/images/japan24', 'japan24_processed.json');
  await syncFolder('JAPAN 25', path.join(pubBase, 'japan25'), '/images/japan25', 'japan25_manifest.json');
  console.log('\n--- JAPAN ERAS SYNC COMPLETE ---');
})();