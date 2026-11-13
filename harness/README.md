# QAting 결정적 비교 규칙 하네스

QAting(tjfakstn/ACJB) 백엔드의 **실제 코드**에 모아룸 시안·코드를 넣어 돌리는 임시 JUnit 테스트입니다. LLM을 부르지 않습니다. LLM 응답 자리에는 정답표의 줄·토큰을 넣습니다. 그래서 다음 두 가지를 LLM과 떼어서 볼 수 있습니다.

- LLM이 맞는 줄을 골랐을 때 서버(값 변환·비교·중복 제거·Re-QA 판정)가 맞게 판정하는가
- LLM이 틀린 줄을 고르면 서버 규칙이 막아 주는가

| 파일 | QAting 패키지 | 쓰는 코드 |
| --- | --- | --- |
| `FixtureEvalTest.java` | `com.acjb.server.qa` | `FigmaFacts.collect`, `ClaudeQaComparator.Repo`(bundle·styleValues, 리플렉션), `sameInput`, `judgeWith`, `reread`(리플렉션), `TailwindValues`, `StyleRules` |
| `FixtureMappingInputTest.java` | `com.acjb.server.analysis` | `CodeSelector.select`, `FigmaFrames.summary` |

## 실행

JDK 21이 필요합니다(Gradle 9.7.1, Spring Boot 4.1.1). DB나 API 키는 필요 없습니다.

```bash
git clone https://github.com/tjfakstn/ACJB.git && cd ACJB/backend
cp <이 저장소>/harness/FixtureEvalTest.java src/test/java/com/acjb/server/qa/
cp <이 저장소>/harness/FixtureMappingInputTest.java src/test/java/com/acjb/server/analysis/
export QE_FIXTURE=<이 저장소 경로>   # design/spec.json, answer-key/answer-key.json, src/를 읽는다
export QE_OUT=<결과 폴더>            # harness-qa.md, harness-mapping.md를 쓴다
./gradlew test --tests 'com.acjb.server.qa.FixtureEvalTest' --tests 'com.acjb.server.analysis.FixtureMappingInputTest'
```

2026-11-13 ACJB `main`(a5fbe4b) 기준 결과는 `docs/results/`에 있습니다.

## 한계

- Figma 노드 JSON은 `design/spec.json`을 REST 형태로 바꿔 만든 것입니다. 실제 Figma 파일과 같은지는 `npm run check-figma`로 따로 확인합니다. 크기(`absoluteBoundingBox`)는 고정 폭과 사각형에만 넣었습니다.
- 노드 매핑은 정답표대로 됐다고 가정합니다(이상적인 비교 분석).
- LLM의 실제 판단(어느 줄을 고르는지, 무엇을 생략하는지)은 여기서 재지 않습니다. 그것은 운영 서비스에서 첫 QA를 돌리고 `npm run score`로 잽니다.
