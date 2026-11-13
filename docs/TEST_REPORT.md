# QAting MVP 테스트 보고 (1차 — 운영 서비스 첫 QA 전)

- 대상: QAting (3팀) · 운영 https://acjb-qating.com · 코드 tjfakstn/ACJB `main` a5fbe4b
- 입력: 이 저장소(모아룸) — https://github.com/Sora3780/qating-eval-fixture · 배포 https://sora3780.github.io/qating-eval-fixture/
- 일시: 2026-11-13

## 무엇을 했나

| 단계 | 방법 | 상태 |
| --- | --- | --- |
| A. 결정적 비교 규칙 | QAting 백엔드의 실제 코드를 빌드해 모아룸 시안·코드·정답표를 넣음. LLM 자리에는 정답 위치를 넣음(`harness/`) | 완료 |
| B. 비교 분석 입력 | QAting `CodeSelector`·`FigmaFrames`로 매핑 LLM이 받을 입력을 만듦 | 완료 |
| C. QAting 단위 테스트 | `qa`·`analysis` 패키지 기존 테스트 실행 | 완료 |
| D. 운영 서버 점검 | 로그인 없이 확인할 수 있는 API·헤더 | 완료 |
| E. 운영 서비스 첫 QA (LLM 포함) | Figma 플러그인 → QAting 연결 → 비교 분석 → 첫 QA → `npm run score` | **남음** — Figma 데스크톱 앱과 Google 로그인이 필요 |

## 결과 요약

| 항목 | 결과 |
| --- | --- |
| D(심어 둔 차이 17개) — LLM이 정답 줄을 고르면 | **17/17** 정답표와 같은 값의 이슈 |
| N(같은 값·다른 표기 10개) | **10/10** 같음으로 판정(oklch, `var()`, rem, `rgb()`, 대문자 hex, `rounded-full`, 아이콘 여백 규칙, 고정 높이 규칙 모두 맞음) |
| S(범위 밖 5개, LLM이 그 줄을 골랐다고 가정한 응답 6가지) | 서버 규칙이 막는 것 3가지(`${}` 보간, 투명도 색, `placeholder:` 변형). **막지 못하는 것 3가지**(styled-components `:hover` 줄, 데이터 객체 문구, 같은 줄의 다른 색 클래스) — LLM이 빼 줘야만 오탐을 피함 |
| 중복 제거(헤더 4화면, 카드 3장, 행 3개, 항목 8개) | 모두 이슈 1개 |
| Re-QA(고침 4 · 잘못 고침 1 · 그대로 1) | **6/6** 기대대로(PASS 4, FAIL `10px`·`600`) |
| QAting 단위 테스트(qa·analysis) | 29개 모두 통과 |
| 운영 API | 비로그인 401, CSRF 없는 POST 403, API 응답에 HSTS·X-Frame-Options·nosniff 있음 |

자세한 표: [results/harness-qa.md](results/harness-qa.md), [results/harness-mapping.md](results/harness-mapping.md)

## 발견 사항

| # | 심각도 | 내용 | 근거 | 제안 |
| --- | --- | --- | --- | --- |
| F1 | 중 (비용) | **padding이 있는 요소는 "같은 입력" 반복 제거가 안 된다.** `ClaudeQaComparator.sameInput`이 `e.values()`를 문자열로 만들 때, padding 값이 `double[]`라 배열 주소(`[D@…`)가 들어간다. 그래서 화면마다 똑같은 헤더·버튼·목록 행도 매번 LLM에 다시 묻는다 | 모아룸: 요소 144개 중 건너뛸 수 있는 49개 중 26개만 건너뜀 → **23개(약 24%)를 불필요하게 다시 물음**. 헤더는 7개 중 padding 있는 2개(Header·Login Button)가 화면마다 다시 나감 | 키를 만들 때 `double[]`는 `Arrays.toString`으로. 이슈 단계 중복 제거는 따로 있어 이슈 수는 맞다 |
| F2 | 중 (문서) | **매핑된 블록마다 위에서부터 요소 40개만 비교한다**(`FigmaFacts.MAX_ELEMENTS`). README에 없다. 긴 목록 아래쪽 요소는 아무 표시 없이 검사되지 않는다 | P01: 예약 내역 8행 아래 "지난 예약 더 보기"(41번째 이후) 색 차이 → 비교 목록에 없음 | README "비교하지 않는 값"에 적거나, 실행 결과에 "비교하지 않은 요소 n개"를 보여 준다 |
| F3 | 중 (기능·문서) | **`@/` 같은 경로 별칭 import를 따라가지 않는다.** 코드 묶음은 `./`·`../` 상대 경로만 따른다. 별칭으로 가져온 CSS Modules는 묶음에 없어서, 그 컴포넌트의 스타일은 하나도 비교되지 않는다 | P02: `import styles from '@/styles/profile-card.module.css'` → 프로필 카드 반지름 차이(full vs 12px)를 버림. Vite·Next.js 프로젝트에서 흔한 방식 | `tsconfig` `paths`·Vite alias를 읽거나, README 지원 범위에 "상대 경로 import만"을 적는다 |
| F4 | 정보 (LLM 의존) | `:hover` 규칙(styled-components·CSS), 데이터 객체의 문자열, 같은 줄의 다른 색 클래스는 서버 규칙으로 걸러지지 않는다. LLM이 그 줄을 고르면 그대로 이슈가 된다 | S02 `background: #364fc7`(hover) → `배경 #3b5bdb → #364fc7`, S03 예시 일정 문자열 → 문구 이슈, S05 `text-slate-900` → 색 이슈 | E 단계(운영 첫 QA)에서 실제로 LLM이 빼 주는지 확인한다. 서버 쪽에서는 토큰이 `&:hover {` 블록 안 줄인지 같은 간단한 검사로 막을 수 있다 |
| F5 | 경미 (보안) | 프론트엔드 HTML 응답(Caddy 정적 파일)에는 HSTS·X-Frame-Options·X-Content-Type-Options가 없다. API 응답에는 있다 | `curl -I https://acjb-qating.com/` | Caddyfile에 `header` 지시어 추가 |
| F6 | 정보 | 비교 분석의 프레임 요약은 글자 12개까지인데, 공통 헤더 문구 4개가 모든 화면에서 그중 4칸을 차지한다 | harness-mapping.md — ROOM-01은 예약 박스 문구가 요약에 하나도 안 들어감 | QAting 스파이크도 같은 한계를 기록함. 반복되는 공통 블록 문구를 빼면 정보가 늘어난다 |

## 남은 테스트 (E) — 직접 하실 일

1. Figma 데스크톱 앱 → 새 파일 → Plugins → Development → Import plugin from manifest → `scripts/figma-plugin/manifest.json` → 실행
2. 파일 공유를 "링크가 있는 모든 사용자 → 보기 가능"으로 바꾸고, 섹션 "모아룸 v1"을 우클릭 → 링크 복사
3. https://acjb-qating.com 로그인 → 새 프로젝트 → Figma 링크 + `https://github.com/Sora3780/qating-eval-fixture` + `main`
4. 이후 `docs/EVALUATION.md` 2~7절. 저장한 JSON은 `npm run score`로 채점한다

E에서 볼 것: 비교 분석이 SET-01·Spec 보드에 파일을 지어내지 않는지, 실제 LLM이 D 17개 중 몇 개를 맞는 줄로 찾는지(A에서 서버는 17/17이므로 놓친 것은 LLM·매핑 탓이다), S02·S03·S05 함정을 피하는지.
