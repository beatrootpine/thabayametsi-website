// Builds responsive WebP sizes + 1200x630 OpenGraph JPEGs from photos-raw/.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
const SRC = process.argv[2] || 'photos-raw';
const OUT = 'public/img', OG = 'public/og';
const widths = [480, 960, 1440, 1920];
const manifest = {};
for (const f of fs.readdirSync(SRC).filter(f => f.endsWith('.webp'))) {
  const name = f.replace('.webp', '');
  const img = sharp(path.join(SRC, f));
  const { width, height } = await img.metadata();
  const made = [];
  for (const w of widths) {
    if (w > width && made.length) continue;
    const ww = Math.min(w, width);
    await sharp(path.join(SRC, f)).resize({ width: ww }).webp({ quality: 68, effort: 5 })
      .toFile(path.join(OUT, `${name}-${ww}.webp`));
    made.push(ww);
  }
  if (width > made[made.length - 1] + 100) {
    await sharp(path.join(SRC, f)).webp({ quality: 68, effort: 5 }).toFile(path.join(OUT, `${name}-${width}.webp`));
    made.push(width);
  }
  manifest[name] = { w: width, h: height, sizes: made };
  if (width >= 1200) await sharp(path.join(SRC, f)).resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(OG, `${name}.jpg`));
}
fs.writeFileSync('src/data/images.json', JSON.stringify(manifest, null, 1));
console.log(Object.keys(manifest).length, 'images');
