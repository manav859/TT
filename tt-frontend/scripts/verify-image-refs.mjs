/* Fails if any /images, /portfolio, or /logo path referenced in code/JSON/HTML
 * does not exist in public/. Guards against broken paths after WebP conversion. */
import fs from 'node:fs'
import path from 'node:path'

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, acc)
    else if (/\.(tsx?|json|html|css)$/.test(e.name)) acc.push(p)
  }
  return acc
}

const sources = [...walk('src'), 'index.html']
const re = /\/(?:images|portfolio|logo)\/[^"')\s]+\.(?:webp|png|jpe?g|svg)/gi
const missing = []
const seen = new Set()

for (const file of sources) {
  const text = fs.readFileSync(file, 'utf8')
  for (const m of text.matchAll(re)) {
    let ref = m[0]
    // Decode %20 etc. and strip any ?v= cache-bust suffix.
    const clean = decodeURIComponent(ref).split('?')[0]
    if (seen.has(clean)) continue
    seen.add(clean)
    if (!fs.existsSync(path.join('public', clean))) missing.push(`${clean}   <- ${file}`)
  }
}

console.log(`Checked ${seen.size} unique image references.`)
if (missing.length) {
  console.error(`\nBROKEN (${missing.length}):`)
  for (const m of missing) console.error('  ' + m)
  process.exit(1)
}
console.log('All referenced images exist in public/. No broken paths.')
