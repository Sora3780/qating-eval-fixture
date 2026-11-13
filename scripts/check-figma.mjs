// (선택) 플러그인으로 만든 Figma 시안을 Figma REST API로 다시 읽어, QAting이 읽을 값이 정답표의 시안 값과 같은지 확인한다.
// 글꼴이 대체되어 굵기가 바뀌었거나 반올림이 생겼으면 여기서 드러난다. QAting에 연결하기 전에 한 번 돌려 두면 좋다.
//
//   PowerShell:  $env:FIGMA_TOKEN="figd_..."; npm run check-figma -- "<Figma 페이지 또는 섹션 링크>"
//   bash:        FIGMA_TOKEN=figd_... npm run check-figma -- "<링크>"
//
// 토큰: Figma → Settings → Security → Personal access tokens (File content: Read only). 토큰은 Figma API에만 보낸다.
import { spec } from './design-spec.mjs'
import { collect, format, restTree, specTree } from './lib/facts.mjs'

const url = process.argv[2]
const token = process.env.FIGMA_TOKEN
if (!url || !token) {
  console.error('사용법: FIGMA_TOKEN 환경 변수를 정하고 npm run check-figma -- "<Figma 링크>"')
  process.exit(1)
}
const m = url.match(/figma\.com\/(?:design|file)\/([A-Za-z0-9]+)/)
const nodeParam = new URL(url).searchParams.get('node-id')
if (!m || !nodeParam) {
  console.error('링크에서 파일 키나 node-id를 찾지 못했습니다. 페이지 [공유하기] 또는 섹션 우클릭 [링크 복사]로 얻은 링크를 넣으세요.')
  process.exit(1)
}
const fileKey = m[1]
const nodeId = nodeParam.replace('-', ':')

const res = await fetch(`https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`, { headers: { 'X-Figma-Token': token } })
if (!res.ok) {
  console.error(`Figma API ${res.status}: ${(await res.text()).slice(0, 200)}`)
  process.exit(1)
}
const body = await res.json()
const doc = body.nodes?.[nodeId]?.document
if (!doc) {
  console.error('노드를 읽지 못했습니다.')
  process.exit(1)
}

// 페이지 → 섹션 → 프레임처럼 섹션 안까지 내려가 이름으로 화면을 찾는다(QAting AnalysisJob과 같은 방식)
const frames = new Map()
const gather = (n) => {
  for (const c of n.children ?? []) {
    if (c.type === 'SECTION') gather(c)
    else if (['FRAME', 'COMPONENT', 'COMPONENT_SET'].includes(c.type)) frames.set(c.name, c)
  }
}
if (doc.type === 'FRAME') frames.set(doc.name, doc)
else gather(doc)

const fmt = (facts) => Object.fromEntries(Object.entries(facts).map(([k, v]) => [k, format(k, v)]))
let problems = 0
let compared = 0
for (const sf of spec.frames) {
  const rf = frames.get(sf.name)
  if (!rf) {
    console.log(`❌ 화면 없음: ${sf.name}`)
    problems++
    continue
  }
  sf.children.forEach((block, i) => {
    const rb = rf.children?.[i]
    if (!rb || rb.name !== block.name) {
      console.log(`❌ ${sf.name}: ${i + 1}번째 블록이 "${block.name}"가 아님`)
      problems++
      return
    }
    const want = collect(block, specTree)
    const got = collect(rb, restTree)
    want.forEach((w, j) => {
      const g = got[j]
      const a = fmt(w.facts)
      const b = g ? fmt(g.facts) : {}
      for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
        compared++
        if (a[k] !== b[k]) {
          problems++
          console.log(`❌ ${sf.name} · ${w.path} · ${k}: 시안 정의 "${a[k] ?? '-'}" / Figma "${b[k] ?? '-'}"`)
        }
      }
    })
  })
}
console.log(problems === 0 ? `✅ Figma 시안이 정의와 같습니다(값 ${compared}개 확인). 이 링크를 QAting에 연결하면 됩니다.` : `\n어긋난 값 ${problems}개 — 플러그인 결과를 확인하세요(글꼴 대체가 흔한 원인).`)
process.exit(problems === 0 ? 0 : 1)
