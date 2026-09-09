const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const exifReader = require('exif-reader');

const baseDir = 'C:\\Users\\Admin\\OneDrive\\Pictures\\for antigravity';
const outputBase = path.resolve(__dirname, '../public/images');

const tasks = [
  {
    srcFolder: 'BANGKOK THAILAND',
    destDir: path.join(outputBase, 'thailand', 'bangkok'),
    webPrefix: '/images/thailand/bangkok',
    prefix: 'bkk25',
    manifest: 'bangkok_manifest.json'
  },
  {
    srcFolder: 'BETONG THAILAND',
    destDir: path.join(outputBase, 'thailand', 'betong'),
    webPrefix: '/images/thailand/betong',
    prefix: 'betong19',
    manifest: 'betong_manifest.json'
  },
  {
    srcFolder: 'JAPAN 19',
    destDir: path.join(outputBase, 'japan19'),
    webPrefix: '/images/japan19',
    prefix: 'japan19',
    manifest: 'japan19_manifest.json'
  },
  {
    srcFolder: 'Malaysia',
    destDir: path.join(outputBase, 'malaysia'),
    webPrefix: '/images/malaysia',
    prefix: 'malaysia',
    manifest: 'malaysia_manifest.json'
  },
  {
    srcFolder: 'Vietnam 26',
    destDir: path.join(outputBase, 'vietnam'),
    webPrefix: '/images/vietnam',
    prefix: 'vietnam26',
    manifest: 'vietnam_manifest.json'
  }
];

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

async function processTask(task) {
  const srcPath = path.join(baseDir, task.srcFolder);
  if (!fs.existsSync(srcPath)) {
    console.error('Missing source folder: ' + srcPath);
    return;
  }
  
  if (!fs.existsSync(task.destDir)) {
    fs.mkdirSync(task.destDir, { recursive: true });
  }

  const rawFiles = fs.readdirSync(srcPath)
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  console.log('\n======================================================');
  console.log('Processing ' + task.srcFolder + ' (' + rawFiles.length + ' files) -> ' + task.destDir);
  console.log('======================================================');

  const manifest = [];
  let index = 1;

  for (const rawFile of rawFiles) {
    const inputFilePath = path.join(srcPath, rawFile);
    const seq = String(index).padStart(3, '0');
    const outFileName = task.prefix + '_' + seq + '.jpg';
    const outFilePath = path.join(task.destDir, outFileName);

    try {
      const meta = await sharp(inputFilePath).metadata();
      let exif = null;
      if (meta.exif) {
        try {
          exif = exifReader(meta.exif);
        } catch (e) {}
      }

      let make = '';
      let model = '';
      let fNumber = null;
      let exposureTime = null;
      let iso = null;
      let focal = null;
      let date = null;
      let gpsCoords = null;

      if (exif) {
        if (exif.Image) {
          make = (exif.Image.Make || '').toString().trim();
          model = (exif.Image.Model || '').toString().trim();
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
            date = exif.Photo.DateTimeOriginal instanceof Date 
              ? exif.Photo.DateTimeOriginal.toISOString() 
              : String(exif.Photo.DateTimeOriginal);
          }
        }
        if (exif.GPSInfo) {
          gpsCoords = parseGps(exif.GPSInfo);
        }
      }

      // Optimize image with explicit .rotate() to honor EXIF orientation and bake it upright!
      await sharp(inputFilePath)
        .rotate()
        .resize({ width: 2048, height: 2048, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true, mozjpeg: true })
        .toFile(outFilePath);

      // Verify resulting dimensions
      const outMeta = await sharp(outFilePath).metadata();
      const isPortrait = outMeta.height > outMeta.width;

      // Clean camera name
      let cameraDisplay = '';
      if (model.includes('24030PN60G') || model.includes('Xiaomi 14 Ultra')) {
        cameraDisplay = 'Xiaomi 14 Ultra';
      } else if (model.includes('ELS-NX9') || model.includes('P40 Pro')) {
        cameraDisplay = 'Huawei P40 Pro';
      } else if (model.includes('ILCE-6400')) {
        cameraDisplay = 'Sony α6400';
      } else if (model.includes('iPhone')) {
        cameraDisplay = model;
      } else if (model) {
        cameraDisplay = make ? (make + ' ' + model).trim() : model;
      }

      const exifPills = [];
      if (cameraDisplay) exifPills.push(cameraDisplay);
      if (focal) exifPills.push(focal + 'mm');
      if (fNumber) exifPills.push('ƒ/' + fNumber);
      if (exposureTime) exifPills.push(exposureTime);
      if (iso) exifPills.push('ISO ' + iso);
      const exifStr = exifPills.join(' · ') || (cameraDisplay || 'Exif Archive');

      manifest.push({
        index,
        originalFile: rawFile,
        fileName: outFileName,
        webPath: task.webPrefix + '/' + outFileName,
        width: outMeta.width,
        height: outMeta.height,
        aspectRatio: Number((outMeta.width / outMeta.height).toFixed(3)),
        isPortrait,
        camera: cameraDisplay,
        focal,
        fNumber,
        exposureTime,
        iso,
        exif: exifStr,
        date,
        gps: gpsCoords
      });

      console.log('  [' + seq + '/' + rawFiles.length + '] ' + rawFile + ' -> ' + outFileName + ' (' + outMeta.width + 'x' + outMeta.height + ', ' + (isPortrait ? 'Portrait' : 'Landscape') + ')');
    } catch (err) {
      console.error('  Error processing ' + rawFile + ': ' + err.message);
    }
    index++;
  }

  const manifestPath = path.resolve(__dirname, '../src/data', task.manifest);
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Saved manifest: ' + manifestPath + ' with ' + manifest.length + ' items.');
}

async function runAll() {
  for (const t of tasks) {
    await processTask(t);
  }
  console.log('\n======================================================');
  console.log('ALL DESTINATIONS PROCESSED SUCCESSFULLY!');
  console.log('======================================================');
}

runAll();
