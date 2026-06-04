import fs from 'node:fs'
import path from 'node:path'

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p, a)
    else if (/\.(png|jpe?g|webp|svg)$/i.test(e.name)) a.push(p)
  }
  return a
}

const files = walk('dist')
let total = 0
const over = []
for (const x of files) {
  const s = fs.statSync(x).size
  total += s
  const f = x.split(path.sep).join('/')
  if (/logo|favicon|apple-touch|\.svg$/i.test(f)) continue
  const isThumb = /\/(gallery|services)\//.test(f) || /\/portfolio\/hero\.webp$/.test(f)
  const isHero = /Tusk tales \(79\)|Extra slide/.test(f)
  const lim = isHero ? 800 : isThumb ? 120 : 300
  if (s > lim * 1024) over.push(`${(s / 1024).toFixed(0)}KB > ${lim}KB  ${f}`)
}
console.log(`dist images total: ${(total / 1048576).toFixed(2)}MB across ${files.length} files`)
console.log(over.length ? `OVER TARGET:\n  ${over.join('\n  ')}` : 'All content images within target.')
