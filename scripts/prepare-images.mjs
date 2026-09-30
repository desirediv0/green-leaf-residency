// One-off: optimises the supplied property photographs + logo into /public/images
// and records their intrinsic sizes in lib/image-meta.json.
// Usage: node scripts/prepare-images.mjs [sourceDir]
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const src = process.argv[2] ?? path.join(process.env.USERPROFILE ?? '', 'Downloads')
const out = path.resolve('public/images')
fs.mkdirSync(out, { recursive: true })

const meta = {}
const files = fs.readdirSync(src).filter((f) => /^IMG_70\d\d\.JPG\.jpeg$/i.test(f))

for (const file of files) {
  const id = file.match(/IMG_(70\d\d)/i)[1]
  const { data, info } = await sharp(path.join(src, file))
    .rotate()
    .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer({ resolveWithObject: true })
  fs.writeFileSync(path.join(out, `img-${id}.jpg`), data)
  meta[id] = { w: info.width, h: info.height }
}

const logoSrc = path.join(src, 'CBF449E9-6C5F-4B69-9521-8F4316F50976.PNG')
if (fs.existsSync(logoSrc)) {
  const { width, height } = await sharp(logoSrc).metadata()
  // full lock-up (mark + wordmark + tagline)
  await sharp(logoSrc).png().toFile(path.join(out, 'logo-full.png'))
  // mark only (house + leaf), cropped from the artwork
  await sharp(logoSrc)
    .extract({
      left: Math.round(width * 0.2),
      top: Math.round(height * 0.06),
      width: Math.round(width * 0.54),
      height: Math.round(height * 0.56),
    })
    .png()
    .toFile(path.join(out, 'logo-mark.png'))
}

fs.writeFileSync(path.resolve('lib/image-meta.json'), JSON.stringify(meta, null, 2))
console.log(`Processed ${files.length} photos`)
