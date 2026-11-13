# QAting 결정적 비교 규칙 하네스 결과

QAting `main`의 실제 코드(FigmaFacts·Repo.bundle·TailwindValues·CssValues·StyleRules·judgeWith·reread)에 모아룸 시안·코드를 넣고, LLM 응답 자리에 정답표의 줄·토큰을 넣어 돌렸다. Figma 노드 JSON은 design/spec.json을 REST 형태로 바꾼 것이다.

## 1. 비교 입력

| 화면 | 매핑 노드 | 코드 | 비교 요소 | 반복이라 건너뜀 | 코드 묶음(LLM에 보내는 파일) |
| --- | --- | --- | --- | --- | --- |
| HOME-01 홈 | Header | `src/components/layout/AppHeader.tsx` | 7 | 0 | `layout/AppHeader.tsx` |
| HOME-01 홈 | Hero | `src/components/home/HeroBanner.tsx` | 6 | 0 | `home/HeroBanner.tsx` |
| HOME-01 홈 | Search Bar | `src/components/home/SearchBar.tsx` | 3 | 0 | `home/SearchBar.tsx` |
| HOME-01 홈 | Recommended Rooms | `src/components/home/RecommendedRooms.tsx` | 16 | 2 | `home/RecommendedRooms.tsx` `home/RoomCard.tsx` `src/data/rooms.ts` |
| ROOM-01 스터디룸 상세 | Header | `src/components/layout/AppHeader.tsx` | 2 | 5 | `layout/AppHeader.tsx` |
| ROOM-01 스터디룸 상세 | Body > Left Column > Room Info | `src/components/room/RoomInfoPanel.tsx` | 12 | 0 | `room/RoomInfoPanel.tsx` `room/RoomInfoPanel.module.css` |
| ROOM-01 스터디룸 상세 | Body > Left Column > Rules | `src/components/room/RulesList.tsx` | 6 | 0 | `room/RulesList.tsx` |
| ROOM-01 스터디룸 상세 | Body > Booking Box | `src/components/room/BookingBox.tsx` | 8 | 0 | `room/BookingBox.tsx` |
| BOOK-01 예약 확인 | Header | `src/components/layout/AppHeader.tsx` | 2 | 5 | `layout/AppHeader.tsx` |
| BOOK-01 예약 확인 | Summary Card | `src/components/booking/PaymentSummary.tsx` | 12 | 0 | `booking/PaymentSummary.tsx` `booking/payment-summary.css` |
| BOOK-01 예약 확인 | Confirm Actions | `src/components/booking/ConfirmActions.tsx` | 5 | 0 | `booking/ConfirmActions.tsx` |
| MY-01 내 예약 | Header | `src/components/layout/AppHeader.tsx` | 2 | 5 | `layout/AppHeader.tsx` |
| MY-01 내 예약 | Body > Profile Card | `src/components/mypage/ProfileCard.tsx` | 6 | 0 | `mypage/ProfileCard.tsx` |
| MY-01 내 예약 | Body > Booking List | `src/components/mypage/BookingList.tsx` | 31 | 9 | `mypage/BookingList.tsx` `src/data/bookings.ts` |

같은 입력이라 LLM에 다시 묻지 않은 요소: 26개

padding 배열을 내용으로 비교하도록 키를 고치면 다시 묻지 않을 요소: 49개 (차이 23개). 화면마다 같은 Header 프레임 요소의 sameInput 키가 **서로 다르다**(double[] toString이 배열 주소).

## 2. 정답표 항목별 — LLM이 이 줄·토큰을 골랐을 때 서버 판정

| ID | 종류 | LLM 응답(가정) | 서버 판정 | 정답표와 | 의미 |
| --- | --- | --- | --- | --- | --- |
| D01 | D | 정답 줄 `layout/AppHeader.tsx:5` `gap-5` | 차이 `gap 24px` → `gap 20px` | ✅ 값까지 일치 |  |
| D02 | D | 정답 줄 `home/HeroBanner.tsx:5` `text-4xl` | 차이 `30px` → `36px` | ✅ 값까지 일치 |  |
| D03 | D | 정답 줄 `home/HeroBanner.tsx:7` `px-5 py-3` | 차이 `padding 12px 24px` → `padding 12px 20px` | ✅ 값까지 일치 |  |
| D04 | D | 정답 줄 `home/SearchBar.tsx:5` `border-slate-300` | 차이 `테두리 #dee2e6` → `테두리 #cad5e2` | ✅ 값까지 일치 |  |
| D05 | D | 정답 줄 `home/RoomCard.tsx:5` `rounded-lg` | 차이 `12px` → `8px` | ✅ 값까지 일치 |  |
| D06 | D | 정답 줄 `home/RoomCard.tsx:9` `font-medium` | 차이 `700` → `500` | ✅ 값까지 일치 |  |
| D07 | D | 정답 줄 `room/RoomInfoPanel.module.css:6` `padding: 20px` | 차이 `padding 24px` → `padding 20px` | ✅ 값까지 일치 |  |
| D08 | D | 정답 줄 `room/RoomInfoPanel.module.css:16` `color: #2f9e44` | 차이 `글자 #2b8a3e` → `글자 #2f9e44` | ✅ 값까지 일치 |  |
| D09 | D | 정답 줄 `room/RoomInfoPanel.tsx:9` `강남 A룸 (4인)` | 차이 `강남 A룸 (4인실)` → `강남 A룸 (4인)` | ✅ 값까지 일치 |  |
| D10 | D | 정답 줄 `room/RulesList.tsx:7` `gap: 12` | 차이 `gap 10px` → `gap 12px` | ✅ 값까지 일치 |  |
| D11 | D | 정답 줄 `room/RulesList.tsx:16` `퇴실 5분 전 정리` | 차이 `퇴실 10분 전 정리` → `퇴실 5분 전 정리` | ✅ 값까지 일치 |  |
| D12 | D | 정답 줄 `room/BookingBox.tsx:36` `border-radius: 6px` | 차이 `8px` → `6px` | ✅ 값까지 일치 |  |
| D13 | D | 정답 줄 `room/BookingBox.tsx:51` `font-weight: 600` | 차이 `700` → `600` | ✅ 값까지 일치 |  |
| D14 | D | 정답 줄 `booking/payment-summary.css:31` `font-size: 13px` | 차이 `14px` → `13px` | ✅ 값까지 일치 |  |
| D15 | D | 정답 줄 `booking/payment-summary.css:59` `color: #4c6ef5` | 차이 `글자 #3b5bdb` → `글자 #4c6ef5` | ✅ 값까지 일치 |  |
| D16 | D | 정답 줄 `booking/ConfirmActions.tsx:4` `이전으로` | 차이 `이전 단계` → `이전으로` | ✅ 값까지 일치 |  |
| D17 | D | 정답 줄 `mypage/BookingList.tsx:8` `p-4` | 차이 `padding 16px 20px` → `padding 16px` | ✅ 값까지 일치 |  |
| P01 | P | - | 비교 요소 목록에 없음(블록의 40개 상한 밖) — LLM에 묻지도 않는다 | 예상대로 | README에 없는 제한 확인 |
| P02 | P | 정답 줄 `src/styles/profile-card.module.css:15` `border-radius: 12px` | 버림 — `src/styles/profile-card.module.css`가 코드 묶음에 없음 | 예상대로 | `@/` 별칭 import는 따라가지 않음(README에 없는 제한) |
| N01 | N | 정답 줄 `home/HeroBanner.tsx:7` `rounded-full` | 같음 | ✅ 이슈 없음 |  |
| N02 | N | 정답 줄 `home/HeroBanner.tsx:3` `bg-brand-50` | 같음 | ✅ 이슈 없음 |  |
| N03 | N | 정답 줄 `home/HeroBanner.tsx:6` `text-slate-500` | 같음 | ✅ 이슈 없음 |  |
| N04 | N | 정답 줄 `home/SearchBar.tsx:5` `py-3 pr-4 pl-11` | 같음 | ✅ 이슈 없음 |  |
| N05 | N | 정답 줄 `room/RoomInfoPanel.module.css:8` `border: 1px solid var(--color-line)` | 같음 | ✅ 이슈 없음 |  |
| N06 | N | 정답 줄 `room/RoomInfoPanel.module.css:45` `background: #F1F5F9` | 같음 | ✅ 이슈 없음 |  |
| N07 | N | 정답 줄 `room/RoomInfoPanel.module.css:46` `font-size: 0.8125rem` | 같음 | ✅ 이슈 없음 |  |
| N08 | N | 정답 줄 `room/RulesList.tsx:10` `borderRadius: 12` | 같음 | ✅ 이슈 없음 |  |
| N09 | N | 정답 줄 `booking/payment-summary.css:6` `background: rgb(255, 255, 255)` | 같음 | ✅ 이슈 없음 |  |
| N10 | N | 정답 줄 `booking/ConfirmActions.tsx:4` `px-5` | 같음 | ✅ 이슈 없음 |  |
| S01 | S | 그 줄의 선언 `room/BookingBox.tsx:29` `color: ${muted}` | 읽을 수 없는 값 → 비교 안 함 | ✅ 이슈 없음 | 서버 규칙이 막아 줌 |
| S02 | S | 함정: hover 줄 `room/BookingBox.tsx:55` `background: #364fc7` | 차이 `배경 #3b5bdb` → `배경 #364fc7` | ❌ 이슈가 됨 | 서버 규칙은 못 막음 — LLM이 이 줄을 빼 줘야만 이슈가 안 됨 |
| S03 | S | 함정: 데이터 객체 문구 `booking/PaymentSummary.tsx:5` `11월 21일 (금) 14:00 – 16:00` | 차이 `11월 20일 (목) 14:00 – 16:00` → `11월 21일 (금) 14:00 – 16:00` | ❌ 이슈가 됨 | 서버 규칙은 못 막음 — LLM이 이 줄을 빼 줘야만 이슈가 안 됨 |
| S04 | S | 그 줄의 선언 `booking/payment-summary.css:39` `color: rgba(15, 23, 43, 0.9)` | 읽을 수 없는 값 → 비교 안 함 | ✅ 이슈 없음 | 서버 규칙이 막아 줌 |
| S05 | S | 정답(변형) `home/SearchBar.tsx:5` `placeholder:text-slate-500` | 읽을 수 없는 값 → 비교 안 함 | ✅ 이슈 없음 | 서버 규칙이 막아 줌 |
| S05 | S | 함정: 입력 글자색 `home/SearchBar.tsx:5` `text-slate-900` | 차이 `글자 #62748e` → `글자 #0f172b` | ❌ 이슈가 됨 | 서버 규칙은 못 막음 — LLM이 이 줄을 빼 줘야만 이슈가 안 됨 |

D 항목: LLM이 정답 줄을 고르면 17/17개가 정답표와 같은 값의 이슈가 된다.

## 3. 반복 요소의 중복 제거 — 같은 컴포넌트를 여러 번 그린 경우

| ID | 시안의 반복 | LLM에 묻는 요소 | 차이 판정 | 이슈(중복 제거 뒤) |
| --- | --- | --- | --- | --- |
| D01 | 4곳 | 1 | 1 | ✅ 1개 |
| D05 | 3곳 | 3 | 3 | ✅ 1개 |
| D06 | 3곳 | 3 | 3 | ✅ 1개 |
| D14 | 3곳 | 3 | 3 | ✅ 1개 |
| D17 | 8곳 | 8 | 8 | ✅ 1개 |

## 4. Re-QA — `npm run reqa:apply`를 푸시한 커밋을 다시 읽었을 때

| ID | 바뀐 줄의 토큰(LLM 응답 가정) | 다시 읽은 값 | 판정 | 기대 | 결과 |
| --- | --- | --- | --- | --- | --- |
| D01 | `gap-6` | gap 24px | PASS | PASS | ✅ |
| D03 | `px-6 py-3` | padding 12px 24px | PASS | PASS | ✅ |
| D07 | `padding: 24px` | padding 24px | PASS | PASS | ✅ |
| D10 | `gap: 10` | gap 10px | PASS | PASS | ✅ |
| D12 | `border-radius: 10px` | 10px | FAIL | FAIL (10px) | ✅ |
| D13 | `font-weight: 600` | 600 | FAIL | FAIL (600) | ✅ |

Re-QA: 6/6 기대대로
