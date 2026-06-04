import fs from 'node:fs'
import path from 'node:path'

function pngSize(b) { return [b.readUInt32BE(16), b.readUInt32BE(20)] }
function jpegSize(b) {
  let i = 2
  while (i < b.length) {
    if (b[i] !== 0xFF) { i++; continue }
    const m = b[i + 1]
    if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC)
      return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]
    i += 2 + b.readUInt16BE(i + 2)
  }
  return null
}
function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p, acc)
    else if (/\.(png|jpe?g|webp)$/i.test(e.name)) acc.push(p)
  }
  return acc
}

const rows = walk('public').map((f) => {
  const b = fs.readFileSync(f)
  let s = null
  if (b[0] === 0x89) s = pngSize(b)
  else if (b[0] === 0xFF) s = jpegSize(b)
  return { f: f.split(path.sep).join('/'), size: b.length, dim: s }
})
rows.sort((a, b) => b.size - a.size)
let tot = 0
for (const r of rows) {
  tot += r.size
  const dim = r.dim ? `${r.dim[0]}x${r.dim[1]}` : '?'
  console.log(`${(r.size / 1048576).toFixed(2).padStart(6)}MB  ${dim.padEnd(12)}  ${r.f}`)
}
console.log(`---- TOTAL ${(tot / 1048576).toFixed(1)}MB across ${rows.length} files ----`)
