# 비교 분석(매핑) 입력 — QAting CodeSelector·FigmaFrames로 만든 것

## UI 코드 파일 (CodeSelector)

20개 / 11692자 (한도 300개 · 100만 자)

- `src/App.tsx`
- `src/components/booking/ConfirmActions.tsx`
- `src/components/booking/PaymentSummary.tsx`
- `src/components/home/HeroBanner.tsx`
- `src/components/home/RecommendedRooms.tsx`
- `src/components/home/RoomCard.tsx`
- `src/components/home/SearchBar.tsx`
- `src/components/layout/AppHeader.tsx`
- `src/components/mypage/BookingList.tsx`
- `src/components/mypage/ProfileCard.tsx`
- `src/components/room/BookingBox.tsx`
- `src/components/room/RoomInfoPanel.tsx`
- `src/components/room/RulesList.tsx`
- `src/data/bookings.ts`
- `src/data/rooms.ts`
- `src/main.tsx`
- `src/pages/BookingConfirmPage.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/MyBookingsPage.tsx`
- `src/pages/RoomDetailPage.tsx`

## 프레임 요약 (프레임 단계에서 LLM이 보는 것: 자식 이름 8개 · 글자 12개)

| 프레임 | 자식 | 글자 |
| --- | --- | --- |
| HOME-01 홈 | Header > Logo, Nav, Login Button<br>Hero > Eyebrow, Title, Subtitle, CTA Button<br>Search Bar > Search Icon, Placeholder<br>Recommended Rooms > Section Title, Card Row | 모아룸 · 스터디룸 찾기 · 내 예약 · 로그인 · 이번 주 인기 · 조용한 스터디룸을 가장 빠르게 · 역 근처 120개 공간을 시간 단위로 예약하세요 · 스터디룸 둘러보기 · 지역, 역 이름으로 검색 · 추천 스터디룸 · 강남 A룸 · 4인 · 강남역 3분 |
| ROOM-01 스터디룸 상세 | Header > Logo, Nav, Login Button<br>Body > Left Column, Booking Box | 모아룸 · 스터디룸 찾기 · 내 예약 · 로그인 · 예약 가능 · 강남 A룸 (4인실) · 창가 자리, 화이트보드, 모니터 대여 가능 · 와이파이 · 화이트보드 · 모니터 · 이용 규칙 · 음식물 반입 금지 |
| BOOK-01 예약 확인 | Header > Logo, Nav, Login Button<br>Summary Card > Summary Title, Rows, Total Row<br>Confirm Actions > Cancel Button, Pay Button | 모아룸 · 스터디룸 찾기 · 내 예약 · 로그인 · 예약 정보 확인 · 공간 · 강남 A룸 · 일시 · 11월 20일 (목) 14:00 – 16:00 · 인원 · 4명 · 결제 금액 |
| MY-01 내 예약 | Header > Logo, Nav, Login Button<br>Body > Profile Card, Booking List | 모아룸 · 스터디룸 찾기 · 내 예약 · 로그인 · 김모아 · moa@example.com · 프로필 수정 · 11월 20일 (목) 14:00 · 강남 A룸 · 4인 · 예약 확정 · 11월 22일 (토) 10:00 · 홍대 B룸 · 6인 |
| SET-01 알림 설정 | Header > Logo, Nav, Login Button<br>Settings Panel > Panel Title, Setting Row, Setting Row, Setting Row | 모아룸 · 스터디룸 찾기 · 내 예약 · 로그인 · 알림 설정 · 예약 확정 알림 · 예약이 확정되면 바로 알려드려요 · 이용 30분 전 알림 · 입실 30분 전에 알려드려요 · 마케팅 정보 수신 · 할인·이벤트 소식을 받아요 |
| Spec / Color Tokens | Spec Title<br>Token > Swatch, Token Name<br>Token > Swatch, Token Name<br>Token > Swatch, Token Name<br>Token > Swatch, Token Name<br>Token > Swatch, Token Name<br>Token > Swatch, Token Name | Color Tokens · brand-600  #3b5bdb · brand-50  #edf2ff · line  #dee2e6 · slate-900  #0f172b · slate-700  #314158 · slate-500  #62748e |
