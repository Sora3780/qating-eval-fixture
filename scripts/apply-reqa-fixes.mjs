// Re-QA 시나리오용 코드 변경. 정답표의 reqa 항목대로 고치거나(fix), 일부러 잘못 고친다(wrong-fix).
//   npm run reqa:apply    — 바꾼다
//   npm run reqa:revert   — 되돌린다
// 바꾼 뒤 커밋·푸시해야 QAting Re-QA가 새 코드를 읽는다(브랜치 최신 커밋을 본다).
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const revert = process.argv.includes('--revert')
const key = JSON.parse(readFileSync(join(root, 'answer-key/answer-key.json'), 'utf8'))
const plan = key.cases.filter((c) => c.reqa)
let changed = 0

for (const c of plan) {
  if (c.reqa.action === 'keep') continue
  const path = join(root, c.file)
  const lines = readFileSync(path, 'utf8').split('\n')
  const [from, to] = revert ? [c.reqa.to, c.reqa.from] : [c.reqa.from, c.reqa.to]
  const i = c.line - 1
  if (lines[i]?.includes(from)) {
    lines[i] = lines[i].replace(from, to)
    writeFileSync(path, lines.join('\n'))
    changed++
    console.log(`${c.id} ${c.file}:${c.line}  ${from} → ${to}`)
  } else if (lines[i]?.includes(to)) {
    console.log(`${c.id} 이미 ${revert ? '되돌려' : '바뀌어'} 있음`)
  } else {
    console.error(`${c.id} ${c.file}:${c.line}에서 "${from}"를 찾지 못했습니다. 파일을 직접 고쳤다면 git checkout으로 되돌린 뒤 다시 실행하세요.`)
    process.exitCode = 1
  }
}

console.log(`\n${changed}곳을 ${revert ? '되돌렸' : '바꿨'}습니다.`)
if (!revert) {
  console.log('\n다음 순서로 진행하세요.')
  console.log('1) git commit -am "Re-QA 시나리오" && git push')
  console.log('2) QAting에서 아래 이슈를 모두 [수정 시작] → [수정 완료로 변경] (담당 팀 프론트엔드, 내 역할도 프론트엔드)')
  for (const c of plan) {
    console.log(`   - ${c.id} ${c.title}: 시안 ${c.figma} / 구현 ${c.code} → 기대 ${c.reqa.expect}${c.reqa.observed ? ` (다시 읽은 값 ${c.reqa.observed})` : ''}`)
  }
  console.log('3) [디자인 QA] → [Re-QA 실행]')
  console.log('4) 이슈 목록 JSON을 results/issues-after-reqa.json으로 저장하고 npm run score -- --reqa results/issues-after-reqa.json')
}
