// Builds transparent (colour + white) versions of the logo mark by keying out the cream backdrop.
import sharp from 'sharp'
const input = 'public/images/logo-mark.png'
const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const bg = [data[0], data[1], data[2]]
const color = Buffer.from(data)
const white = Buffer.from(data)
for (let i = 0; i < data.length; i += 4) {
  const d = Math.max(Math.abs(data[i] - bg[0]), Math.abs(data[i + 1] - bg[1]), Math.abs(data[i + 2] - bg[2]))
  const a = Math.max(0, Math.min(255, (d - 18) * 4))
  color[i + 3] = a
  white[i] = white[i + 1] = white[i + 2] = 255
  white[i + 3] = a
}
const opts = { raw: { width: info.width, height: info.height, channels: 4 } }
await sharp(color, opts).png().toFile('public/images/logo-mark-color.png')
await sharp(white, opts).png().toFile('public/images/logo-mark-white.png')
console.log('bg', bg, info.width, info.height)
