/*
 * One-time / on-demand optimizer for path-referenced images in public/.
 *
 * Vite image plugins only touch *imported* assets, and this project references
 * every image by URL string (incl. from mock JSON), so they live in public/ and
 * are copied to dist verbatim. The source art is also hugely oversized
 * (4000–7000px). This script downscales by role and re-encodes to WebP in place,
 * replacing the original file. References are updated separately to point at the
 * new `.webp` paths.
 *
 *   npm run optimize:images
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOTS = ['public/images', 'public/portfolio']
const RASTER = /\.(png|jpe?g)$/i

// Role → max width (never upscales). Quality tuned to land under the targets:
// hero/full-bleed < 800KB, work/section < 300KB, thumbnail < 120KB.
function roleFor(file) {
  const f = file.replace(/\\/g, '/')
  if (/\/(gallery|services)\//.test(f) || /\/portfolio\/hero\.jpg$/i.test(f))
    return { width: 800, quality: 72 } // thumbnail
  if (/Tusk tales \(79\)/.test(f) || /Extra slide/i.test(f))
    return { width: 1920, quality: 78 } // full-bleed / hero
  return { width: 1500, quality: 72 } // section / work
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, acc)
    else if (RASTER.test(e.name)) acc.push(p)
  }
  return acc
}

const files = ROOTS.flatMap((r) => walk(r))
let before = 0
let after = 0
const mapping = []

const kb = (n) => (n / 1024).toFixed(0).padStart(5) + 'KB'

for (const input of files) {
  const { width, quality } = roleFor(input)
  const out = input.replace(/\.[^.]+$/, '.webp') // swap final extension only
  const srcBytes = fs.statSync(input).size
  before += srcBytes

  const buf = await sharp(input)
    .rotate() // honor EXIF orientation, then drop the tag
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toBuffer()

  fs.writeFileSync(out, buf)
  after += buf.length
  mapping.push([input, out, srcBytes, buf.length])
  console.log(`${kb(srcBytes)} -> ${kb(buf.length)}  w${width}q${quality}  ${out.replace(/\\/g, '/')}`)
}

// Delete originals in a second pass with retries — on Windows the AV/indexer
// can briefly lock a file right after sharp reads it (EPERM on unlink).
for (const [input, out] of mapping) {
  if (out === input) continue
  fs.rmSync(input, { force: true, maxRetries: 10, retryDelay: 200 })
}

const mb = (n) => (n / 1048576).toFixed(1) + 'MB'
console.log(`\n${files.length} images: ${mb(before)} -> ${mb(after)} (saved ${mb(before - after)})`)

// Emit the rename map so the reference-update step (and verification) is exact.
fs.writeFileSync(
  'scripts/.image-map.json',
  JSON.stringify(
    mapping.map(([from, to]) => ({
      from: '/' + from.replace(/\\/g, '/').replace(/^public\//, ''),
      to: '/' + to.replace(/\\/g, '/').replace(/^public\//, ''),
    })),
    null,
    2,
  ),
)
console.log('Wrote scripts/.image-map.json')
