# QAting 평가용 임시 프로젝트 — 모아룸

[QAting](https://github.com/tjfakstn/ACJB)(3팀 · Figma 시안 ↔ 코드 비교 QA 자동화) MVP를 **정답을 미리 아는 입력**으로 평가하기 위한 임시 프로젝트입니다.

QAting 팀이 제공한 샘플은 QAting 자기 저장소라서, 이슈가 몇 개 나와도 그게 맞는지 확인할 방법이 없습니다. 이 프로젝트에는 시안과 코드 사이에 **일부러 심은 차이 17개**와 **이슈가 나오면 안 되는 함정 15개**가 있습니다. QAting이 낸 결과를 정답표와 비교하면 재현율·정밀도를 숫자로 낼 수 있습니다.

| 구성 | 위치 | 내용 |
| --- | --- | --- |
| 가상 서비스 "모아룸"(스터디룸 예약) | `src/` | React 19 + Vite + Tailwind 4. 화면 4개. 스타일 작성 방식을 섞었습니다(Tailwind · CSS Modules · 일반 CSS · styled-components · 인라인 style) |
| Figma 시안 | `scripts/design-spec.mjs` → `design/spec.json` | 화면 6개(구현 4 + 구현 안 한 화면 1 + 설명용 보드 1) |
| Figma 시안 생성 플러그인 | `scripts/figma-plugin/` | 위 시안을 본인 Figma 파일에 그대로 만듭니다. 값이 정확해야 정답표가 성립하므로 손으로 그리지 않습니다 |
| 정답표 | `answer-key/ANSWER_KEY.md` | 차이·함정마다 시안 값, 구현 값, 코드 위치(파일:줄)를 QAting 이슈와 같은 표기로 적었습니다 |
| 채점 | `scripts/score.mjs` | QAting에서 받은 JSON → 재현율·정밀도·오탐·중복·매핑 정확도·Re-QA 판정 |
| 평가 진행표 | `docs/EVALUATION.md` | 시나리오별 기대 결과와 기록 칸 |
| QAting 코드 하네스 | `harness/` | QAting 백엔드 실제 코드에 이 프로젝트를 넣는 JUnit 테스트(LLM 없이) |
| 테스트 보고 | `docs/TEST_REPORT.md` | 1차 결과와 발견 사항 |

> 정답표는 QAting 내부 규칙(`FigmaFacts`·`StyleRules`·`TailwindValues`·`CssValues`, ACJB `main` a5fbe4b)을 읽고 만들었습니다. 시안 값 문자열은 QAting이 이슈에 적는 형식과 같아서(`padding 12px 24px`, `글자 #3b5bdb` 등) 그대로 맞춰 볼 수 있습니다.

## 정답표 요약

| 종류 | 개수 | 뜻 | 보는 지표 |
| --- | --- | --- | --- |
| **D** 탐지 대상 | 17 | README가 비교한다고 밝힌 범위 안의 실제 차이(간격·여백, 색, 굵기, 크기, 모서리, 고정 문구) | 재현율 |
| **N** 같음 대조군 | 10 | 값은 같고 표기만 다름(`rounded-full`↔999, oklch 팔레트, `var()`, rem, `rgb()`, 대문자 hex, 고정 높이 버튼 등) | 이슈가 나오면 오탐 |
| **S** 범위 밖 | 5 | README가 비교하지 않는다고 밝힌 것(`${}` 보간, `:hover`, 데이터 문구, 투명도 색, `placeholder:` 변형) | 이슈가 나오면 범위 위반 |
| **P** 한계 탐색 | 2 | 문서에 없는 제한: 블록당 요소 40개 상한, `@/` 경로 별칭 import | 결과만 기록 |

중복 제거도 함께 봅니다. 4개 화면에 같은 헤더(D01), 카드 3장(D05), 행 3개(D14), 항목 8개(D17)는 각각 **이슈 1개**여야 합니다.

## 준비 (약 20분)

준비물: Node.js 20 이상, Git, GitHub 계정, **Figma 데스크톱 앱**(개발용 플러그인은 데스크톱 앱에서만 실행됩니다).

### 1) 설치와 생성 파일 확인

```bash
npm install
npm run spec    # design/spec.json, scripts/figma-plugin/code.js 다시 생성
npm run key     # 정답표 검증 + 줄 번호 → answer-key/answer-key.json, ANSWER_KEY.md
npm run dev     # (선택) http://localhost:5173 에서 화면 확인
```

`npm run key`는 시안 값이 QAting 표기와 같은지, 코드의 그 줄에 그 값이 실제로 있는지 확인합니다. 하나라도 어긋나면 실패로 끝납니다.

### 2) GitHub 공개 저장소로 올리기

QAting은 **공개 저장소**만 읽습니다.

```bash
git init -b main
git add .
git commit -m "QAting 평가용 임시 프로젝트"
git remote add origin https://github.com/<내 계정>/qating-eval-fixture.git
git push -u origin main
```

실시간 QA까지 보려면 배포 주소가 필요합니다. 저장소 **Settings → Pages → Source: GitHub Actions**로 바꾸면 푸시할 때마다 `.github/workflows/pages.yml`이 `https://<내 계정>.github.io/qating-eval-fixture/`에 배포합니다.

### 3) Figma에 시안 만들기

1. Figma 데스크톱 앱에서 **새 디자인 파일**을 만듭니다(내 Drafts면 충분합니다).
2. 메뉴 **Plugins → Development → Import plugin from manifest…** → `scripts/figma-plugin/manifest.json`을 고릅니다.
3. **Plugins → Development → QAting Eval - 모아룸 시안 생성**을 실행합니다. "QAting 평가용 - 모아룸" 페이지와 섹션 "모아룸 v1"이 생기고 화면 6개가 그려집니다.
   - 끝나면 플러그인이 만든 값을 다시 읽어 시안 정의와 같은지 스스로 확인합니다. "다른 값이 n개" 메시지가 나오면 콘솔(Plugins → Development → Show/Hide console)을 확인하세요. 대부분 글꼴 문제입니다. 플러그인은 Pretendard → Noto Sans KR → Inter 순서로, 400·500·600·700 굵기를 모두 가진 글꼴을 고릅니다.
4. 파일 **[공유] → "링크가 있는 모든 사용자 → 보기 가능"**으로 설정합니다(QAting 서버가 읽어야 합니다).
5. 링크를 복사합니다. QAting 안내대로 **섹션 "모아룸 v1"을 우클릭 → [링크 복사]**하거나, 아무것도 선택하지 않은 채 그 페이지에서 **[공유하기] → 링크 복사**를 합니다. 링크에 `node-id=`가 있어야 하고, 프레임(화면 하나) 링크는 받지 않습니다.

(선택) QAting이 읽을 값과 정답표가 같은지 Figma API로 확인할 수 있습니다. 토큰은 Figma → Settings → Security → Personal access tokens에서 **File content: Read only**로 만듭니다.

```powershell
$env:FIGMA_TOKEN="figd_..."; npm run check-figma -- "<복사한 Figma 링크>"
```

## 평가 진행

[docs/EVALUATION.md](docs/EVALUATION.md)의 순서를 따릅니다. 요약하면 다음과 같습니다.

1. QAting에서 프로젝트 1개 생성 → 위 Figma 링크 + 저장소 + `main` 연결
2. 비교 분석 → 매핑 JSON 저장 → `npm run score -- --mappings results/mappings.json`
3. 첫 QA(검증 범위 4개 모두) → 이슈 JSON 저장 → `npm run score -- --issues results/issues.json`
4. 이슈 상세·담당 팀·권한 확인
5. `npm run reqa:apply` → 커밋·푸시 → 이슈 6개 "수정 완료" → Re-QA → `npm run score -- --reqa results/issues-after-reqa.json`
6. 실시간 QA(배포 주소) 확인

채점 결과는 `results/score-<시각>.md`로 저장됩니다.

### QAting에서 JSON 받는 법

QAting에 로그인한 브라우저 주소창에 아래 주소를 열면 JSON이 보입니다. 그대로 저장(Ctrl+S)해서 `results/` 폴더에 둡니다. 프로젝트 ID는 QAting 화면 주소 `https://acjb-qating.com/app/projects/<ID>`에 있습니다.

| 파일 | 주소 |
| --- | --- |
| `results/mappings.json` | `https://acjb-qating.com/api/v1/projects/<ID>/analysis/mappings` |
| `results/issues.json` | `https://acjb-qating.com/api/v1/projects/<ID>/qa-issues?source=first_qa` |
| `results/issues-after-reqa.json` | (Re-QA 뒤) 위와 같은 주소 |

`results/*.json`은 `.gitignore`에 들어 있어 저장소에 올라가지 않습니다.

## 주의

- **비용**: 비교 분석·첫 QA는 QAting 팀의 AI 비용으로 돕니다(샘플 10화면 기준 1회 5~7천 원). 이 프로젝트는 구현된 화면이 4개라 그보다 적게 들 것으로 보입니다. **프로젝트는 1개만** 만들고, 첫 QA는 범위 4개를 모두 골라 **한 번만** 실행하세요(프로젝트당 성공 1번 제한도 있습니다).
- **정답을 코드에 적지 않습니다.** QAting의 LLM이 `src/`의 코드를 읽으므로, 주석에 "여기 일부러 다름" 같은 말을 쓰면 평가가 오염됩니다. 정답은 `answer-key/`에만 둡니다. QAting은 `.tsx`·`.ts`·`.css` 같은 UI 코드만 읽고, `scripts/` 폴더와 `.json`·`.md`는 읽지 않습니다.
- `src/`나 `scripts/design-spec.mjs`를 고치면 `npm run spec && npm run key`를 다시 실행해 정답표 줄 번호를 맞추세요.
- Re-QA 시나리오가 끝나면 `npm run reqa:revert`로 코드를 되돌릴 수 있습니다.
- 평가가 끝나면 임시 저장소와 Figma 파일은 지워도 됩니다.
