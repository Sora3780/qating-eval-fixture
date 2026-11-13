// QAting에서 받은 JSON을 정답표로 채점한다.
//
//   npm run score -- --issues results/issues.json [--mappings results/mappings.json] [--reqa results/issues-after-reqa.json]
//
//  --issues    GET /api/v1/projects/{id}/qa-issues?source=first_qa  (첫 QA 직후)
//  --mappings  GET /api/v1/projects/{id}/analysis/mappings          (비교 분석 결과)
//  --reqa      GET /api/v1/projects/{id}/qa-issues?source=first_qa  (Re-QA 실행 뒤 — 상태가 바뀐 것을 본다)
// 결과는 화면에 찍고 results/score-<시각>.md로 저장한다.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = parseArgs(process.argv.slice(2))
if (!args.issues && !args.mappings && !args.reqa) {
  console.error('사용법: npm run score -- --issues results/issues.json [--mappings results/mappings.json] [--reqa results/issues-after-reqa.json]')
  process.exit(1)
}
let key
try {
  key = JSON.parse(readFileSync(join(root, 'answer-key/answer-key.json'), 'utf8'))
} catch {
  console.error('answer-key/answer-key.json이 없습니다. 먼저 `npm run key`를 실행하세요.')
  process.exit(1)
}
const cases = key.cases
const norm = (s) => String(s ?? '').trim().replace(/\s+/g, ' ').toLowerCase()
const pct = (a, b) => (b === 0 ? '-' : `${((a / b) * 100).toFixed(1)}%`)
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')
let md = `# QAting 채점 결과\n\n- 채점 시각: ${new Date().toISOString()}\n- 정답표: answer-key/answer-key.json (${key.generated_at})\n`

// ------------------------------------------------------------------ 첫 QA

if (args.issues) {
  const issues = items(load(args.issues)).filter((i) => i.style_mismatch && (i.source == null || i.source === 'first_qa'))
  md += `- 첫 QA 이슈 파일: ${args.issues} (스타일 차이 이슈 ${issues.length}개)\n\n`

  const matchOf = (issue) => {
    const m = issue.style_mismatch
    const p = norm(m.property)
    const exp = norm(m.expected_value)
    const act = norm(m.actual_value)
    const exact = cases.find((c) => c.code && norm(c.property) === p && norm(c.figma) === exp && norm(c.code) === act)
    if (exact) return { case: exact, how: 'exact' }
    // D·P와 시안 값까지 같고 구현 값만 다르면 — 같은 차이를 다른 값으로 읽었다
    const sameElement = cases.find((c) => c.code && norm(c.property) === p && norm(c.figma) === exp && where(issue).includes(norm(c.element_name)))
    if (sameElement) return { case: sameElement, how: 'value-differs' }
    const ns = cases.filter((c) => !c.code && norm(c.property) === p && norm(c.figma) === exp)
    const byName = ns.find((c) => where(issue).includes(norm(c.element_name)))
    if (byName) return { case: byName, how: 'n-or-s' }
    if (ns.length > 0) return { case: ns[0], how: 'n-or-s-guess' }
    return null
  }

  const rows = issues.map((issue) => ({ issue, match: matchOf(issue) }))
  const byCase = new Map()
  for (const r of rows) {
    if (r.match) byCase.set(r.match.case.id, [...(byCase.get(r.match.case.id) ?? []), r])
  }

  const D = cases.filter((c) => c.kind === 'D')
  const detected = D.filter((c) => (byCase.get(c.id) ?? []).some((r) => r.match.how === 'exact'))
  const tp = rows.filter((r) => r.match && r.match.how === 'exact' && ['D', 'P'].includes(r.match.case.kind))
  const fpNS = rows.filter((r) => r.match && r.match.how.startsWith('n-or-s'))
  const valueOff = rows.filter((r) => r.match && r.match.how === 'value-differs')
  const unknown = rows.filter((r) => !r.match)
  const dupes = [...byCase.entries()].filter(([id, rs]) => rs.filter((r) => r.match.how === 'exact').length > 1)

  md += '## 1. 첫 QA — 요약\n\n| 지표 | 값 | 설명 |\n| --- | --- | --- |\n'
  md += `| 재현율 (D) | **${detected.length}/${D.length} = ${pct(detected.length, D.length)}** | 심어 둔 차이 중 정확한 값으로 잡힌 비율 |\n`
  md += `| 정밀도 | **${tp.length}/${rows.length} = ${pct(tp.length, rows.length)}** | 이슈 중 정답표의 차이(D·P)와 값까지 맞는 비율. 정답표 밖 이슈는 아래 4절에서 사람이 판정 |\n`
  md += `| 같음 대조군(N) 오탐 | ${fpNS.filter((r) => r.match.case.kind === 'N').length}건 | 값이 같은데 이슈가 됨 |\n`
  md += `| 범위 밖(S) 위반 | ${fpNS.filter((r) => r.match.case.kind === 'S').length}건 | README가 비교하지 않는다고 한 것을 이슈로 만듦 |\n`
  md += `| 값을 잘못 읽음 | ${valueOff.length}건 | 차이는 맞게 짚었지만 구현 값이 정답과 다름 |\n`
  md += `| 정답표 밖 이슈 | ${unknown.length}건 | 사람이 판정 필요 |\n`
  md += `| 중복 이슈 | ${dupes.length}건 | 같은 차이가 이슈 여러 개로 나옴(D01·D05·D14·D17은 1개여야 함) |\n\n`

  md += '## 2. 심어 둔 차이(D)별 결과\n\n| ID | 내용 | 작성 방식 | property | 시안 → 구현 | 결과 | 이슈 수 |\n| --- | --- | --- | --- | --- | --- | --- |\n'
  for (const c of D) {
    const rs = byCase.get(c.id) ?? []
    const exact = rs.filter((r) => r.match.how === 'exact').length
    const result = exact > 0 ? '✅ 탐지' : rs.length > 0 ? '⚠️ 값 다름' : '❌ 놓침'
    md += `| ${c.id} | ${esc(c.title)} | ${c.method} | ${c.property} | \`${esc(c.figma)}\` → \`${esc(c.code)}\` | ${result} | ${rs.length} |\n`
  }

  md += '\n### 작성 방식별 · property별 재현율\n\n'
  md += table('작성 방식', groupRecall(D, detected, (c) => c.method))
  md += '\n'
  md += table('property', groupRecall(D, detected, (c) => c.property))

  md += '\n## 3. 대조군(N) · 범위 밖(S) · 한계 탐색(P)\n\n| ID | 종류 | 내용 | 기대 | 결과 |\n| --- | --- | --- | --- | --- |\n'
  for (const c of cases.filter((c) => c.kind !== 'D')) {
    const rs = byCase.get(c.id) ?? []
    let expect
    let result
    if (c.kind === 'P') {
      expect = c.expect_detected ? '탐지' : '놓칠 것으로 예상'
      result = rs.length > 0 ? `탐지됨 (${rs.length}건)` : '탐지 안 됨'
    } else {
      expect = '이슈 없음'
      result = rs.length > 0 ? `❌ 이슈 ${rs.length}건: ${rs.map((r) => `\`${esc(r.issue.style_mismatch.actual_value)}\``).join(', ')}` : '✅ 이슈 없음'
    }
    md += `| ${c.id} | ${c.kind} | ${esc(c.title)} | ${expect} | ${result} |\n`
  }

  md += '\n## 4. 정답표와 다르게 나온 이슈 (사람이 판정)\n\n'
  const review = [...valueOff, ...fpNS, ...unknown]
  if (review.length === 0) md += '없음.\n'
  else {
    md += '판정 칸에 "실제 차이(정답표 누락) / 오탐 / 엉뚱한 요소" 중 하나를 적는다.\n\n| # | 위치 | property | 시안 → 구현 | 추정 | 판정 |\n| --- | --- | --- | --- | --- | --- |\n'
    review.forEach((r, i) => {
      const m = r.issue.style_mismatch
      const guess = !r.match ? '정답표에 없음' : r.match.how === 'value-differs' ? `${r.match.case.id}의 구현 값을 다르게 읽음(정답 \`${esc(r.match.case.code)}\`)` : `${r.match.case.id} (${r.match.case.kind}) 오탐 추정`
      md += `| ${i + 1} | ${esc(r.issue.screen_location ?? m.screen)} | ${m.property} | \`${esc(m.expected_value)}\` → \`${esc(m.actual_value)}\` | ${guess} |  |\n`
    })
  }

  console.log(`\n[첫 QA] 재현율 ${detected.length}/${D.length} (${pct(detected.length, D.length)}) · 정밀도 ${tp.length}/${rows.length} (${pct(tp.length, rows.length)}) · N 오탐 ${fpNS.filter((r) => r.match.case.kind === 'N').length} · S 위반 ${fpNS.filter((r) => r.match.case.kind === 'S').length} · 값 다름 ${valueOff.length} · 정답표 밖 ${unknown.length} · 중복 ${dupes.length}`)
  for (const c of D.filter((c) => !detected.includes(c))) console.log(`  놓침 ${c.id} ${c.title} (${c.method}, ${c.property})`)
}

// ------------------------------------------------------------------ 비교 분석(매핑)

if (args.mappings) {
  const data = unwrap(load(args.mappings))
  const mapped = data.items ?? []
  const unmapped = data.unmapped_frames ?? []
  const expected = key.mapping.frames
  md += `\n## 5. 비교 분석(매핑)\n\n- 파일: ${args.mappings} · 커밋 ${data.commit_sha ?? '-'}\n\n| Figma 화면 | 정답 | QAting 결과 | 판정 |\n| --- | --- | --- | --- |\n`
  let ok = 0
  for (const [frame, file] of Object.entries(expected)) {
    const got = mapped.find((m) => m.frame_name === frame)
    const isUnmapped = unmapped.some((u) => u.frame_name === frame)
    const actual = got ? got.code_path : isUnmapped ? null : undefined
    const pass = actual === file
    if (pass) ok++
    md += `| ${esc(frame)} | ${file ?? '매핑 없음'} | ${actual === undefined ? '(결과에 없음)' : actual ?? '매핑 없음'} | ${pass ? '✅' : '❌'} |\n`
  }
  md += `\n화면 매핑 정확도: **${ok}/${Object.keys(expected).length}**\n\n`

  md += '### 블록(노드) 매핑\n\n| 화면 | 노드 | QAting 파일 · 심볼 | 판정 |\n| --- | --- | --- | --- |\n'
  let nodeOk = 0
  let nodeJudged = 0
  for (const m of mapped) {
    for (const n of m.nodes ?? []) {
      const answer = key.mapping.nodes[n.node_name]
      let verdict = '정답표 밖'
      if (answer) {
        nodeJudged++
        if (answer.includes(n.code_path)) {
          nodeOk++
          verdict = '✅'
        } else verdict = `❌ (정답 ${answer.join(' 또는 ')})`
      }
      md += `| ${esc(m.frame_name)} | ${esc(n.node_name)} | ${n.code_path ?? '없음'} · ${n.code_symbol ?? '-'} | ${verdict} |\n`
    }
  }
  md += `\n블록 매핑 정확도(정답표에 있는 노드만): **${nodeOk}/${nodeJudged}**\n`
  console.log(`[비교 분석] 화면 ${ok}/${Object.keys(expected).length} · 블록 ${nodeOk}/${nodeJudged}`)
}

// ------------------------------------------------------------------ Re-QA

if (args.reqa) {
  const issues = items(load(args.reqa)).filter((i) => i.style_mismatch)
  md += `\n## 6. Re-QA\n\n- 파일: ${args.reqa}\n\n| ID | 코드 변경 | 기대 상태 | QAting 상태 | 판정 |\n| --- | --- | --- | --- | --- |\n`
  let ok = 0
  const planned = cases.filter((c) => c.reqa)
  for (const c of planned) {
    const issue = issues.find((i) => norm(i.style_mismatch.property) === norm(c.property) && norm(i.style_mismatch.expected_value) === norm(c.figma) && norm(i.style_mismatch.actual_value) === norm(c.code))
    const want = c.reqa.expect === 'PASS' ? 'resolved' : 'needs_recheck'
    const got = issue?.status ?? '(이슈 없음)'
    const pass = got === want
    if (pass) ok++
    const change = c.reqa.action === 'keep' ? '변경 없음' : `${c.reqa.from} → ${c.reqa.to}`
    md += `| ${c.id} | \`${esc(change)}\` | ${want} (${c.reqa.expect}) | ${got} | ${pass ? '✅' : '❌'} |\n`
  }
  const untouched = issues.filter((i) => i.status === 'resolved' && !planned.some((c) => norm(c.figma) === norm(i.style_mismatch.expected_value) && norm(c.code) === norm(i.style_mismatch.actual_value)))
  md += `\nRe-QA 판정 정확도: **${ok}/${planned.length}**. 시나리오 밖인데 resolved가 된 이슈: ${untouched.length}건\n`
  md += '\n이슈 상세의 "재검증 기록"에서 FAIL 이슈의 다시 읽은 값이 정답표(D12 `10px`, D13 `600`)와 같은지도 확인한다.\n'
  console.log(`[Re-QA] ${ok}/${planned.length} 기대대로 · 시나리오 밖 resolved ${untouched.length}`)
}

mkdirSync(join(root, 'results'), { recursive: true })
const file = join(root, 'results', `score-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.md`)
writeFileSync(file, md)
console.log(`\n자세한 결과: ${file}`)

// ------------------------------------------------------------------ 도우미

function parseArgs(argv) {
  const out = {}
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) out[argv[i].slice(2)] = argv[i + 1]
  }
  return out
}

function load(path) {
  const text = readFileSync(path, 'utf8').replace(/^﻿/, '')
  try {
    return JSON.parse(text)
  } catch {
    console.error(`${path}가 JSON이 아닙니다. 브라우저에서 API 주소를 열고 "원본 데이터" 그대로 저장했는지 확인하세요.`)
    process.exit(1)
  }
}

function unwrap(x) {
  return x && typeof x === 'object' && !Array.isArray(x) && x.data && typeof x.data === 'object' ? x.data : x
}

function items(x) {
  const d = unwrap(x)
  if (Array.isArray(d)) return d
  if (Array.isArray(d?.items)) return d.items
  console.error('이슈 목록(items)을 찾지 못했습니다.')
  process.exit(1)
}

function where(issue) {
  return norm(`${issue.screen_location ?? ''} ${issue.description ?? ''}`)
}

function groupRecall(all, hit, keyOf) {
  const groups = new Map()
  for (const c of all) {
    const g = groups.get(keyOf(c)) ?? { total: 0, hit: 0 }
    g.total++
    if (hit.includes(c)) g.hit++
    groups.set(keyOf(c), g)
  }
  return groups
}

function table(label, groups) {
  let s = `| ${label} | 탐지 / 전체 | 재현율 |\n| --- | --- | --- |\n`
  for (const [k, g] of groups) s += `| ${k} | ${g.hit}/${g.total} | ${pct(g.hit, g.total)} |\n`
  return s
}
