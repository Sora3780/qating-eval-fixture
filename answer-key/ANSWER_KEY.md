# 정답표 (자동 생성 — `npm run key`)

원본: `answer-key/cases.json` · 시안: `scripts/design-spec.mjs` · 기준 QAting 커밋: a5fbe4b (tjfakstn/ACJB main, 2026-11-13 확인)

시안 값·구현 값은 QAting 이슈의 `expected_value`·`actual_value`와 같은 표기다(StyleRules.format).

## D — 탐지해야 할 차이 (재현율) (17개)

| ID | 내용 | 화면 · 요소 | property | 시안 값 | 구현 값 | 코드 위치 | 작성 방식 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| D01 | 헤더 메뉴 간격 (4개 화면 공통 컴포넌트) | HOME-01 홈 · Header > Nav | spacing | `gap 24px` | `gap 20px` | `src/components/layout/AppHeader.tsx:5` | tailwind |
| D02 | 히어로 제목 글자 크기 | HOME-01 홈 · Hero > Title | font_size | `30px` | `36px` | `src/components/home/HeroBanner.tsx:5` | tailwind |
| D03 | 히어로 CTA 버튼 좌우 여백 | HOME-01 홈 · Hero > CTA Button | spacing | `padding 12px 24px` | `padding 12px 20px` | `src/components/home/HeroBanner.tsx:7` | tailwind |
| D04 | 검색창 테두리 색 | HOME-01 홈 · Search Bar | color | `테두리 #dee2e6` | `테두리 #cad5e2` | `src/components/home/SearchBar.tsx:5` | tailwind |
| D05 | 추천 카드 모서리 (같은 카드 3장) | HOME-01 홈 · Recommended Rooms > Card Row > Room Card | radius | `12px` | `8px` | `src/components/home/RoomCard.tsx:5` | tailwind |
| D06 | 추천 카드 가격 굵기 | HOME-01 홈 · Recommended Rooms > Card Row > Room Card > Price | font_weight | `700` | `500` | `src/components/home/RoomCard.tsx:9` | tailwind |
| D07 | 스터디룸 정보 패널 안쪽 여백 | ROOM-01 스터디룸 상세 · Body > Left Column > Room Info | spacing | `padding 24px` | `padding 20px` | `src/components/room/RoomInfoPanel.module.css:6` | css-module |
| D08 | 예약 가능 배지 글자색 | ROOM-01 스터디룸 상세 · Body > Left Column > Room Info > Badge > Badge Label | color | `글자 #2b8a3e` | `글자 #2f9e44` | `src/components/room/RoomInfoPanel.module.css:16` | css-module |
| D09 | 스터디룸 제목 문구 | ROOM-01 스터디룸 상세 · Body > Left Column > Room Info > Room Title | text | `강남 A룸 (4인실)` | `강남 A룸 (4인)` | `src/components/room/RoomInfoPanel.tsx:9` | css-module |
| D10 | 이용 규칙 항목 간격 | ROOM-01 스터디룸 상세 · Body > Left Column > Rules | spacing | `gap 10px` | `gap 12px` | `src/components/room/RulesList.tsx:7` | inline-style |
| D11 | 이용 규칙 두 번째 항목 문구 | ROOM-01 스터디룸 상세 · Body > Left Column > Rules > Rule List > Rule[1] | text | `퇴실 10분 전 정리` | `퇴실 5분 전 정리` | `src/components/room/RulesList.tsx:16` | inline-style |
| D12 | 시간 선택 박스 모서리 | ROOM-01 스터디룸 상세 · Body > Booking Box > Time Select | radius | `8px` | `6px` | `src/components/room/BookingBox.tsx:36` | styled-components |
| D13 | 예약하기 버튼 글자 굵기 | ROOM-01 스터디룸 상세 · Body > Booking Box > Reserve Button > Label | font_weight | `700` | `600` | `src/components/room/BookingBox.tsx:51` | styled-components |
| D14 | 결제 요약 항목명 글자 크기 (행 3개 공통) | BOOK-01 예약 확인 · Summary Card > Rows > Row > Label | font_size | `14px` | `13px` | `src/components/booking/payment-summary.css:31` | css |
| D15 | 결제 금액 글자색 | BOOK-01 예약 확인 · Summary Card > Total Row > Total Value | color | `글자 #3b5bdb` | `글자 #4c6ef5` | `src/components/booking/payment-summary.css:59` | css |
| D16 | 이전 버튼 문구 | BOOK-01 예약 확인 · Confirm Actions > Cancel Button > Label | text | `이전 단계` | `이전으로` | `src/components/booking/ConfirmActions.tsx:4` | tailwind |
| D17 | 예약 내역 항목 좌우 여백 (항목 8개 공통) | MY-01 내 예약 · Body > Booking List > Booking Item | spacing | `padding 16px 20px` | `padding 16px` | `src/components/mypage/BookingList.tsx:8` | tailwind |

## N — 같은 값·다른 표기 — 이슈가 나오면 오탐 (10개)

| ID | 내용 | 화면 · 요소 | property | 시안 값 | 구현 값 | 코드 위치 | 작성 방식 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| N01 | rounded-full ↔ 반지름 999 | HOME-01 홈 · Hero > CTA Button | radius | `full` | (같음) | `src/components/home/HeroBanner.tsx:7` | tailwind |
| N02 | 저장소 @theme 사용자 색 (bg-brand-50) | HOME-01 홈 · Hero | color | `배경 #edf2ff` | (같음) | `src/components/home/HeroBanner.tsx:3` | tailwind |
| N03 | Tailwind 기본 팔레트 oklch (text-slate-500) | HOME-01 홈 · Hero > Subtitle | color | `글자 #62748e` | (같음) | `src/components/home/HeroBanner.tsx:6` | tailwind |
| N04 | absolute 아이콘 + pl-11 ↔ padding 16 + 아이콘 20 + gap 8 | HOME-01 홈 · Search Bar | spacing | `padding 12px 16px` | (같음) | `src/components/home/SearchBar.tsx:5` | tailwind |
| N05 | CSS 변수 var(--color-line) | ROOM-01 스터디룸 상세 · Body > Left Column > Room Info | color | `테두리 #dee2e6` | (같음) | `src/components/room/RoomInfoPanel.module.css:8` | css-module |
| N06 | 대문자 hex (#F1F5F9) | ROOM-01 스터디룸 상세 · Body > Left Column > Room Info > Amenities > Chip | color | `배경 #f1f5f9` | (같음) | `src/components/room/RoomInfoPanel.module.css:45` | css-module |
| N07 | rem 단위 (0.8125rem = 13px) | ROOM-01 스터디룸 상세 · Body > Left Column > Room Info > Amenities > Chip > Chip Label | font_size | `13px` | (같음) | `src/components/room/RoomInfoPanel.module.css:46` | css-module |
| N08 | 인라인 style 단위 없는 숫자 (borderRadius: 12) | ROOM-01 스터디룸 상세 · Body > Left Column > Rules | radius | `12px` | (같음) | `src/components/room/RulesList.tsx:10` | inline-style |
| N09 | rgb() 배경 · font-weight: bold · 1.25rem | BOOK-01 예약 확인 · Summary Card | color | `배경 #ffffff` | (같음) | `src/components/booking/payment-summary.css:6` | css |
| N10 | 고정 높이(h-10) 버튼의 세로 여백 | BOOK-01 예약 확인 · Confirm Actions > Cancel Button | spacing | `padding 10px 20px` | (같음) | `src/components/booking/ConfirmActions.tsx:4` | tailwind |

## S — README가 비교하지 않는다고 밝힌 경우 — 이슈가 나오면 범위 위반 (5개)

| ID | 내용 | 화면 · 요소 | property | 시안 값 | 구현 값 | 코드 위치 | 작성 방식 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S01 | styled-components 보간 ${muted} | ROOM-01 스터디룸 상세 · Body > Booking Box > Price Row > Unit | color | `글자 #62748e` | (같음) | `src/components/room/BookingBox.tsx:29` | styled-components |
| S02 | styled-components :hover 배경 | ROOM-01 스터디룸 상세 · Body > Booking Box > Reserve Button | color | `배경 #3b5bdb` | (같음) | `src/components/room/BookingBox.tsx:55` | styled-components |
| S03 | 데이터 객체의 문구 (예시 일정) | BOOK-01 예약 확인 · Summary Card > Rows > Row[1] > Value | text | `11월 20일 (목) 14:00 – 16:00` | (같음) | `src/components/booking/PaymentSummary.tsx:5` | data |
| S04 | 투명도 있는 글자색 rgba(…, 0.9) | BOOK-01 예약 확인 · Summary Card > Rows > Row > Value | color | `글자 #0f172b` | (같음) | `src/components/booking/payment-summary.css:39` | css |
| S05 | placeholder: 변형으로만 정한 색 | HOME-01 홈 · Search Bar > Placeholder | color | `글자 #62748e` | (같음) | `src/components/home/SearchBar.tsx:5` | tailwind |

## P — 문서에 없는 한계 탐색 — 결과만 기록 (2개)

| ID | 내용 | 화면 · 요소 | property | 시안 값 | 구현 값 | 코드 위치 | 작성 방식 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P01 | 블록 안 41번째 이후 요소 (요소 40개 상한) | MY-01 내 예약 · Body > Booking List > More Link | color | `글자 #3b5bdb` | `글자 #62748e` | `src/components/mypage/BookingList.tsx:14` | tailwind |
| P02 | 경로 별칭(@/)으로 import한 스타일시트 | MY-01 내 예약 · Body > Profile Card > Avatar | radius | `full` | `12px` | `src/styles/profile-card.module.css:15` | css-module |

## Re-QA 시나리오 (`npm run reqa:apply`)

| ID | 코드 변경 | 기대 판정 |
| --- | --- | --- |
| D01 | `gap-5` → `gap-6` | PASS |
| D03 | `px-5 py-3` → `px-6 py-3` | PASS |
| D07 | `padding: 20px;` → `padding: 24px;` | PASS |
| D10 | `gap: 12,` → `gap: 10,` | PASS |
| D12 | `border-radius: 6px;` → `border-radius: 10px;` (잘못 고침) | FAIL (다시 읽은 값 `10px`) |
| D13 | 고치지 않고 상태만 "수정 완료" | FAIL (다시 읽은 값 `600`) |

## 비교 분석(매핑) 정답

| Figma 화면 | 정답 파일 |
| --- | --- |
| HOME-01 홈 | `src/pages/HomePage.tsx` |
| ROOM-01 스터디룸 상세 | `src/pages/RoomDetailPage.tsx` |
| BOOK-01 예약 확인 | `src/pages/BookingConfirmPage.tsx` |
| MY-01 내 예약 | `src/pages/MyBookingsPage.tsx` |
| SET-01 알림 설정 | 매핑 없음(구현 안 함 · 설명용 보드) |
| Spec / Color Tokens | 매핑 없음(구현 안 함 · 설명용 보드) |
