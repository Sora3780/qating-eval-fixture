// design-spec.mjs → design/spec.json + scripts/figma-plugin/code.js
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spec } from './design-spec.mjs'
import { collect, specTree } from './lib/facts.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

writeFileSync(join(root, 'design/spec.json'), JSON.stringify(spec, null, 2) + '\n')

const template = readFileSync(join(root, 'scripts/figma-plugin/code.template.js'), 'utf8')
if (!template.includes('__SPEC__')) throw new Error('code.template.js에 __SPEC__ 자리가 없습니다')
const code = template
  .replace('// 이 파일은 템플릿이다 — `npm run spec`이 __SPEC__ 자리에 design/spec.json을 넣어 code.js를 만든다. code.js를 직접 고치지 않는다.', '// 자동 생성 파일 — scripts/design-spec.mjs를 고친 뒤 `npm run spec`으로 다시 만든다.')
  .replace('const SPEC = __SPEC__;', `const SPEC = ${JSON.stringify(spec)};`)
writeFileSync(join(root, 'scripts/figma-plugin/code.js'), code)

// 블록(화면 프레임의 직속 자식)마다 QAting이 비교할 요소 수 — 40개 상한에 걸리는 블록을 미리 알 수 있다
console.log('design/spec.json, scripts/figma-plugin/code.js를 만들었습니다.\n')
console.log('화면 / 블록별 비교 요소 수(QAting 상한 40):')
for (const frame of spec.frames) {
  const blocks = (frame.children ?? []).map((b) => {
    const n = collect(b, specTree).length
    const all = countAll(b)
    return `${b.name} ${n}${all > n ? ` (값 있는 요소 ${all}개 중 ${n}개만 비교)` : ''}`
  })
  console.log(`- ${frame.name}: ${blocks.join(' · ')}`)
}

function countAll(node) {
  const tree = { ...specTree }
  let n = 0
  const walk = (x) => {
    if (Object.keys(tree.facts(x)).length > 0) n++
    tree.children(x).forEach(walk)
  }
  walk(node)
  return n
}
