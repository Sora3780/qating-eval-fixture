// answer-key/cases.json을 검증하고 줄 번호를 붙여 answer-key/answer-key.json, answer-key/ANSWER_KEY.md를 만든다.
//  - 시안 쪽: design-spec.mjs에서 그 요소를 찾아 QAting과 같은 규칙으로 값을 읽고, 정답표의 "시안 값" 문자열과 같은지 본다
//  - 코드 쪽: locate 문자열이 파일에 정확히 한 줄 있고, 그 줄에 token이 있는지 본다
// 하나라도 어긋나면 실패로 끝낸다 — 정답표가 틀리면 채점도 틀리기 때문이다.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spec } from './design-spec.mjs'
import { collect, findByPath, format, PROPERTY_OF, specTree, MAX_ELEMENTS } from './lib/facts.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = JSON.parse(readFileSync(join(root, 'answer-key/cases.json'), 'utf8'))
const errors = []
const out = []

for (const c of source.cases) {
  const fail = (msg) => errors.push(`${c.id}: ${msg}`)
  const frame = spec.frames.find((f) => f.name === c.frame)
  if (!frame) {
    fail(`시안에 화면 "${c.frame}"이 없음`)
    continue
  }
  const node = findByPath(frame, `${frame.name} > ${c.element}`, specTree)
  if (!node) {
    fail(`시안에 요소 "${c.element}"가 없음`)
    continue
  }
  const facts = specTree.facts(node)
  if (!(c.fact in facts)) {
    fail(`요소 "${c.element}"에 ${c.fact} 값이 없음`)
    continue
  }
  const figma = format(c.fact, facts[c.fact])
  if (figma !== c.figma) fail(`시안 값이 "${c.figma}"가 아니라 "${figma}"`)

  // 이 요소를 품은 각 노드(매핑될 수 있는 블록)에서 몇 번째로 비교되는지 — 40개를 넘으면 null
  const segments = c.element.split('>').map((s) => s.trim())
  const ranks = {}
  for (let i = 0; i < segments.length; i++) {
    const scope = findByPath(frame, `${frame.name} > ${segments.slice(0, i + 1).join(' > ')}`, specTree)
    const list = collect(scope, specTree)
    const at = list.findIndex((e) => e.node === node)
    ranks[segments[i].replace(/\[\d+]$/, '')] = at < 0 ? null : at + 1
  }
  // 글자 하나가 따로 매핑되지는 않으므로(QAting 노드 매핑은 블록 단위) 요소 자신을 뺀 상위 블록만 본다
  const beyondCap = segments.slice(0, -1).every((s) => ranks[s.replace(/\[\d+]$/, '')] === null)
  if (c.kind === 'P' && c.id === 'P01' && !beyondCap) fail('P01은 40개 상한 밖에 있어야 하는데 비교 범위 안에 있음')
  if (c.kind !== 'P' && Object.values(ranks).some((r) => r === null)) fail(`요소가 일부 블록에서 ${MAX_ELEMENTS}개 상한 밖 — 정답표 의도와 다름`)

  let line = null
  let lineText = ''
  try {
    const lines = readFileSync(join(root, c.file), 'utf8').split('\n')
    const hits = lines.map((t, i) => (t.includes(c.locate) ? i : -1)).filter((i) => i >= 0)
    if (hits.length !== 1) fail(`${c.file}에서 "${c.locate}"가 ${hits.length}줄에 있음(정확히 1줄이어야 함)`)
    else {
      line = hits[0] + 1
      lineText = lines[hits[0]].trim()
      if (!lineText.includes(c.token)) fail(`${c.file}:${line}에 토큰 "${c.token}"가 없음`)
    }
  } catch {
    fail(`파일 없음: ${c.file}`)
  }

  out.push({
    ...c,
    property: PROPERTY_OF[c.fact],
    element_name: segments[segments.length - 1].replace(/\[\d+]$/, ''),
    line,
    line_text: lineText,
    ranks,
  })
}

const ids = new Set()
for (const c of out) {
  if (ids.has(c.id)) errors.push(`${c.id}: 중복 id`)
  ids.add(c.id)
}
// 채점은 (property, 시안 값, 구현 값)으로 D·P를 찾는다 — 셋이 겹치면 구별할 수 없다
const triples = new Map()
for (const c of out.filter((c) => c.code)) {
  const k = `${c.property}|${c.figma}|${c.code}`
  if (triples.has(k)) errors.push(`${c.id}: ${triples.get(k)}와 (property, 시안 값, 구현 값)이 같아 채점에서 구별할 수 없음`)
  triples.set(k, c.id)
}

if (errors.length > 0) {
  console.error('정답표 검증 실패:\n- ' + errors.join('\n- '))
  process.exit(1)
}

const key = { generated_at: new Date().toISOString(), qating_commit: source.qating_commit, cases: out, mapping: source.mapping }
writeFileSync(join(root, 'answer-key/answer-key.json'), JSON.stringify(key, null, 2) + '\n')

const KIND = {
  D: '탐지해야 할 차이 (재현율)',
  N: '같은 값·다른 표기 — 이슈가 나오면 오탐',
  S: 'README가 비교하지 않는다고 밝힌 경우 — 이슈가 나오면 범위 위반',
  P: '문서에 없는 한계 탐색 — 결과만 기록',
}
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|')
let md = `# 정답표 (자동 생성 — \`npm run key\`)\n\n원본: \`answer-key/cases.json\` · 시안: \`scripts/design-spec.mjs\` · 기준 QAting 커밋: ${source.qating_commit}\n\n`
md += '시안 값·구현 값은 QAting 이슈의 `expected_value`·`actual_value`와 같은 표기다(StyleRules.format).\n\n'
for (const kind of ['D', 'N', 'S', 'P']) {
  const rows = out.filter((c) => c.kind === kind)
  md += `## ${kind} — ${KIND[kind]} (${rows.length}개)\n\n`
  md += '| ID | 내용 | 화면 · 요소 | property | 시안 값 | 구현 값 | 코드 위치 | 작성 방식 |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n'
  for (const c of rows) {
    md += `| ${c.id} | ${esc(c.title)} | ${esc(c.frame)} · ${esc(c.element)} | ${c.property} | \`${esc(c.figma)}\` | ${c.code ? `\`${esc(c.code)}\`` : '(같음)'} | \`${c.file}:${c.line}\` | ${c.method} |\n`
  }
  md += '\n'
}
md += '## Re-QA 시나리오 (`npm run reqa:apply`)\n\n| ID | 코드 변경 | 기대 판정 |\n| --- | --- | --- |\n'
for (const c of out.filter((c) => c.reqa)) {
  const change = c.reqa.action === 'keep' ? '고치지 않고 상태만 "수정 완료"' : `\`${esc(c.reqa.from)}\` → \`${esc(c.reqa.to)}\`${c.reqa.action === 'wrong-fix' ? ' (잘못 고침)' : ''}`
  md += `| ${c.id} | ${change} | ${c.reqa.expect}${c.reqa.observed ? ` (다시 읽은 값 \`${c.reqa.observed}\`)` : ''} |\n`
}
md += '\n## 비교 분석(매핑) 정답\n\n| Figma 화면 | 정답 파일 |\n| --- | --- |\n'
for (const [frame, file] of Object.entries(source.mapping.frames)) md += `| ${esc(frame)} | ${file ? `\`${file}\`` : '매핑 없음(구현 안 함 · 설명용 보드)'} |\n`
writeFileSync(join(root, 'answer-key/ANSWER_KEY.md'), md)

const count = (k) => out.filter((c) => c.kind === k).length
console.log(`정답표 OK — D ${count('D')} · N ${count('N')} · S ${count('S')} · P ${count('P')}. answer-key/answer-key.json, ANSWER_KEY.md를 만들었습니다.`)
