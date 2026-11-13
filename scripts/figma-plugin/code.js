// QAting 평가용 시안 생성 플러그인.
// 자동 생성 파일 — scripts/design-spec.mjs를 고친 뒤 `npm run spec`으로 다시 만든다.

const SPEC = {"version":1,"page":"QAting 평가용 - 모아룸","section":"모아룸 v1","fontFamilies":["Pretendard","Noto Sans KR","Inter"],"frames":[{"type":"FRAME","name":"HOME-01 홈","layout":"VERTICAL","padding":[0,0,48,0],"gap":32,"fill":"#f8fafc","w":1280,"counter":"CENTER","children":[{"type":"FRAME","name":"Header","layout":"HORIZONTAL","padding":[16,32,16,32],"fill":"#ffffff","stroke":"#dee2e6","strokeSides":"BOTTOM","w":"fill","primary":"SPACE_BETWEEN","counter":"CENTER","children":[{"type":"TEXT","name":"Logo","text":"모아룸","size":20,"weight":700,"color":"#3b5bdb"},{"type":"FRAME","name":"Nav","layout":"HORIZONTAL","gap":24,"counter":"CENTER","children":[{"type":"TEXT","name":"Nav Item","text":"스터디룸 찾기","size":14,"weight":500,"color":"#314158"},{"type":"TEXT","name":"Nav Item","text":"내 예약","size":14,"weight":500,"color":"#314158"}]},{"type":"FRAME","name":"Login Button","layout":"HORIZONTAL","padding":[8,16,8,16],"radius":8,"fill":"#3b5bdb","children":[{"type":"TEXT","name":"Label","text":"로그인","size":14,"weight":600,"color":"#ffffff"}]}]},{"type":"FRAME","name":"Hero","layout":"VERTICAL","padding":[48,40,48,40],"gap":16,"fill":"#edf2ff","radius":16,"w":1120,"children":[{"type":"TEXT","name":"Eyebrow","text":"이번 주 인기","size":14,"weight":600,"color":"#3b5bdb"},{"type":"TEXT","name":"Title","text":"조용한 스터디룸을 가장 빠르게","size":30,"weight":700,"color":"#0f172b"},{"type":"TEXT","name":"Subtitle","text":"역 근처 120개 공간을 시간 단위로 예약하세요","size":16,"weight":400,"color":"#62748e"},{"type":"FRAME","name":"CTA Button","layout":"HORIZONTAL","padding":[12,24,12,24],"radius":999,"fill":"#3b5bdb","children":[{"type":"TEXT","name":"Label","text":"스터디룸 둘러보기","size":16,"weight":600,"color":"#ffffff"}]}]},{"type":"FRAME","name":"Search Bar","layout":"HORIZONTAL","padding":[12,16,12,16],"gap":8,"fill":"#ffffff","stroke":"#dee2e6","radius":12,"w":1120,"counter":"CENTER","children":[{"type":"RECT","name":"Search Icon","w":20,"h":20,"fill":"#cad5e2","radius":4},{"type":"TEXT","name":"Placeholder","text":"지역, 역 이름으로 검색","size":14,"weight":400,"color":"#62748e"}]},{"type":"FRAME","name":"Recommended Rooms","layout":"VERTICAL","gap":16,"w":1120,"children":[{"type":"TEXT","name":"Section Title","text":"추천 스터디룸","size":20,"weight":700,"color":"#0f172b"},{"type":"FRAME","name":"Card Row","layout":"HORIZONTAL","gap":24,"w":"fill","children":[{"type":"FRAME","name":"Room Card","layout":"VERTICAL","padding":[16,16,16,16],"gap":12,"fill":"#ffffff","stroke":"#dee2e6","radius":12,"w":"fill","children":[{"type":"RECT","name":"Thumbnail","w":"fill","h":140,"fill":"#e2e8f0","radius":8},{"type":"TEXT","name":"Room Name","text":"강남 A룸","size":16,"weight":600,"color":"#0f172b"},{"type":"TEXT","name":"Meta","text":"4인 · 강남역 3분","size":14,"weight":400,"color":"#62748e"},{"type":"TEXT","name":"Price","text":"시간당 6,000원","size":16,"weight":700,"color":"#3b5bdb"}]},{"type":"FRAME","name":"Room Card","layout":"VERTICAL","padding":[16,16,16,16],"gap":12,"fill":"#ffffff","stroke":"#dee2e6","radius":12,"w":"fill","children":[{"type":"RECT","name":"Thumbnail","w":"fill","h":140,"fill":"#e2e8f0","radius":8},{"type":"TEXT","name":"Room Name","text":"홍대 B룸","size":16,"weight":600,"color":"#0f172b"},{"type":"TEXT","name":"Meta","text":"6인 · 홍대입구역 5분","size":14,"weight":400,"color":"#62748e"},{"type":"TEXT","name":"Price","text":"시간당 8,000원","size":16,"weight":700,"color":"#3b5bdb"}]},{"type":"FRAME","name":"Room Card","layout":"VERTICAL","padding":[16,16,16,16],"gap":12,"fill":"#ffffff","stroke":"#dee2e6","radius":12,"w":"fill","children":[{"type":"RECT","name":"Thumbnail","w":"fill","h":140,"fill":"#e2e8f0","radius":8},{"type":"TEXT","name":"Room Name","text":"잠실 C룸","size":16,"weight":600,"color":"#0f172b"},{"type":"TEXT","name":"Meta","text":"2인 · 잠실역 1분","size":14,"weight":400,"color":"#62748e"},{"type":"TEXT","name":"Price","text":"시간당 4,000원","size":16,"weight":700,"color":"#3b5bdb"}]}]}]}]},{"type":"FRAME","name":"ROOM-01 스터디룸 상세","layout":"VERTICAL","padding":[0,0,48,0],"gap":32,"fill":"#f8fafc","w":1280,"counter":"CENTER","children":[{"type":"FRAME","name":"Header","layout":"HORIZONTAL","padding":[16,32,16,32],"fill":"#ffffff","stroke":"#dee2e6","strokeSides":"BOTTOM","w":"fill","primary":"SPACE_BETWEEN","counter":"CENTER","children":[{"type":"TEXT","name":"Logo","text":"모아룸","size":20,"weight":700,"color":"#3b5bdb"},{"type":"FRAME","name":"Nav","layout":"HORIZONTAL","gap":24,"counter":"CENTER","children":[{"type":"TEXT","name":"Nav Item","text":"스터디룸 찾기","size":14,"weight":500,"color":"#314158"},{"type":"TEXT","name":"Nav Item","text":"내 예약","size":14,"weight":500,"color":"#314158"}]},{"type":"FRAME","name":"Login Button","layout":"HORIZONTAL","padding":[8,16,8,16],"radius":8,"fill":"#3b5bdb","children":[{"type":"TEXT","name":"Label","text":"로그인","size":14,"weight":600,"color":"#ffffff"}]}]},{"type":"FRAME","name":"Body","layout":"HORIZONTAL","gap":24,"w":1120,"children":[{"type":"FRAME","name":"Left Column","layout":"VERTICAL","gap":24,"w":"fill","children":[{"type":"FRAME","name":"Room Info","layout":"VERTICAL","padding":[24,24,24,24],"gap":12,"fill":"#ffffff","stroke":"#dee2e6","radius":16,"w":"fill","children":[{"type":"FRAME","name":"Badge","layout":"HORIZONTAL","padding":[4,10,4,10],"radius":999,"fill":"#ebfbee","children":[{"type":"TEXT","name":"Badge Label","text":"예약 가능","size":12,"weight":600,"color":"#2b8a3e"}]},{"type":"TEXT","name":"Room Title","text":"강남 A룸 (4인실)","size":24,"weight":700,"color":"#0f172b"},{"type":"TEXT","name":"Description","text":"창가 자리, 화이트보드, 모니터 대여 가능","size":14,"weight":400,"color":"#314158"},{"type":"FRAME","name":"Amenities","layout":"HORIZONTAL","gap":8,"children":[{"type":"FRAME","name":"Chip","layout":"HORIZONTAL","padding":[6,12,6,12],"radius":8,"fill":"#f1f5f9","children":[{"type":"TEXT","name":"Chip Label","text":"와이파이","size":13,"weight":500,"color":"#314158"}]},{"type":"FRAME","name":"Chip","layout":"HORIZONTAL","padding":[6,12,6,12],"radius":8,"fill":"#f1f5f9","children":[{"type":"TEXT","name":"Chip Label","text":"화이트보드","size":13,"weight":500,"color":"#314158"}]},{"type":"FRAME","name":"Chip","layout":"HORIZONTAL","padding":[6,12,6,12],"radius":8,"fill":"#f1f5f9","children":[{"type":"TEXT","name":"Chip Label","text":"모니터","size":13,"weight":500,"color":"#314158"}]}]}]},{"type":"FRAME","name":"Rules","layout":"VERTICAL","padding":[20,24,20,24],"gap":10,"fill":"#fff9db","radius":12,"w":"fill","children":[{"type":"TEXT","name":"Rules Title","text":"이용 규칙","size":16,"weight":700,"color":"#664d03"},{"type":"FRAME","name":"Rule List","layout":"VERTICAL","gap":6,"children":[{"type":"TEXT","name":"Rule","text":"음식물 반입 금지","size":14,"weight":400,"color":"#664d03"},{"type":"TEXT","name":"Rule","text":"퇴실 10분 전 정리","size":14,"weight":400,"color":"#664d03"},{"type":"TEXT","name":"Rule","text":"예약 시간 30분 초과 시 추가 요금","size":14,"weight":400,"color":"#664d03"}]}]}]},{"type":"FRAME","name":"Booking Box","layout":"VERTICAL","padding":[20,20,20,20],"gap":16,"fill":"#ffffff","stroke":"#dee2e6","radius":12,"w":360,"children":[{"type":"FRAME","name":"Price Row","layout":"HORIZONTAL","gap":4,"counter":"MAX","children":[{"type":"TEXT","name":"Price","text":"6,000원","size":24,"weight":700,"color":"#0f172b"},{"type":"TEXT","name":"Unit","text":"/ 시간","size":14,"weight":400,"color":"#62748e"}]},{"type":"FRAME","name":"Time Select","layout":"HORIZONTAL","padding":[10,12,10,12],"radius":8,"fill":"#ffffff","stroke":"#dee2e6","w":"fill","children":[{"type":"TEXT","name":"Time Label","text":"오늘 14:00 – 16:00","size":14,"weight":500,"color":"#314158"}]},{"type":"FRAME","name":"Reserve Button","layout":"HORIZONTAL","padding":[14,16,14,16],"radius":8,"fill":"#3b5bdb","w":"fill","primary":"CENTER","children":[{"type":"TEXT","name":"Label","text":"예약하기","size":16,"weight":700,"color":"#ffffff"}]}]}]}]},{"type":"FRAME","name":"BOOK-01 예약 확인","layout":"VERTICAL","padding":[0,0,48,0],"gap":32,"fill":"#f8fafc","w":1280,"counter":"CENTER","children":[{"type":"FRAME","name":"Header","layout":"HORIZONTAL","padding":[16,32,16,32],"fill":"#ffffff","stroke":"#dee2e6","strokeSides":"BOTTOM","w":"fill","primary":"SPACE_BETWEEN","counter":"CENTER","children":[{"type":"TEXT","name":"Logo","text":"모아룸","size":20,"weight":700,"color":"#3b5bdb"},{"type":"FRAME","name":"Nav","layout":"HORIZONTAL","gap":24,"counter":"CENTER","children":[{"type":"TEXT","name":"Nav Item","text":"스터디룸 찾기","size":14,"weight":500,"color":"#314158"},{"type":"TEXT","name":"Nav Item","text":"내 예약","size":14,"weight":500,"color":"#314158"}]},{"type":"FRAME","name":"Login Button","layout":"HORIZONTAL","padding":[8,16,8,16],"radius":8,"fill":"#3b5bdb","children":[{"type":"TEXT","name":"Label","text":"로그인","size":14,"weight":600,"color":"#ffffff"}]}]},{"type":"FRAME","name":"Summary Card","layout":"VERTICAL","padding":[24,24,24,24],"gap":16,"fill":"#ffffff","stroke":"#dee2e6","radius":12,"w":640,"children":[{"type":"TEXT","name":"Summary Title","text":"예약 정보 확인","size":20,"weight":700,"color":"#0f172b"},{"type":"FRAME","name":"Rows","layout":"VERTICAL","gap":10,"w":"fill","children":[{"type":"FRAME","name":"Row","layout":"HORIZONTAL","w":"fill","primary":"SPACE_BETWEEN","children":[{"type":"TEXT","name":"Label","text":"공간","size":14,"weight":400,"color":"#62748e"},{"type":"TEXT","name":"Value","text":"강남 A룸","size":14,"weight":600,"color":"#0f172b"}]},{"type":"FRAME","name":"Row","layout":"HORIZONTAL","w":"fill","primary":"SPACE_BETWEEN","children":[{"type":"TEXT","name":"Label","text":"일시","size":14,"weight":400,"color":"#62748e"},{"type":"TEXT","name":"Value","text":"11월 20일 (목) 14:00 – 16:00","size":14,"weight":600,"color":"#0f172b"}]},{"type":"FRAME","name":"Row","layout":"HORIZONTAL","w":"fill","primary":"SPACE_BETWEEN","children":[{"type":"TEXT","name":"Label","text":"인원","size":14,"weight":400,"color":"#62748e"},{"type":"TEXT","name":"Value","text":"4명","size":14,"weight":600,"color":"#0f172b"}]}]},{"type":"FRAME","name":"Total Row","layout":"HORIZONTAL","padding":[16,0,0,0],"stroke":"#dee2e6","strokeSides":"TOP","w":"fill","primary":"SPACE_BETWEEN","counter":"CENTER","children":[{"type":"TEXT","name":"Total Label","text":"결제 금액","size":16,"weight":600,"color":"#0f172b"},{"type":"TEXT","name":"Total Value","text":"12,000원","size":20,"weight":700,"color":"#3b5bdb"}]}]},{"type":"FRAME","name":"Confirm Actions","layout":"HORIZONTAL","gap":12,"w":640,"primary":"MAX","children":[{"type":"FRAME","name":"Cancel Button","layout":"HORIZONTAL","padding":[10,20,10,20],"radius":8,"fill":"#ffffff","stroke":"#dee2e6","children":[{"type":"TEXT","name":"Label","text":"이전 단계","size":14,"weight":600,"color":"#314158"}]},{"type":"FRAME","name":"Pay Button","layout":"HORIZONTAL","padding":[10,24,10,24],"radius":8,"fill":"#3b5bdb","children":[{"type":"TEXT","name":"Label","text":"결제하기","size":14,"weight":600,"color":"#ffffff"}]}]}]},{"type":"FRAME","name":"MY-01 내 예약","layout":"VERTICAL","padding":[0,0,48,0],"gap":32,"fill":"#f8fafc","w":1280,"counter":"CENTER","children":[{"type":"FRAME","name":"Header","layout":"HORIZONTAL","padding":[16,32,16,32],"fill":"#ffffff","stroke":"#dee2e6","strokeSides":"BOTTOM","w":"fill","primary":"SPACE_BETWEEN","counter":"CENTER","children":[{"type":"TEXT","name":"Logo","text":"모아룸","size":20,"weight":700,"color":"#3b5bdb"},{"type":"FRAME","name":"Nav","layout":"HORIZONTAL","gap":24,"counter":"CENTER","children":[{"type":"TEXT","name":"Nav Item","text":"스터디룸 찾기","size":14,"weight":500,"color":"#314158"},{"type":"TEXT","name":"Nav Item","text":"내 예약","size":14,"weight":500,"color":"#314158"}]},{"type":"FRAME","name":"Login Button","layout":"HORIZONTAL","padding":[8,16,8,16],"radius":8,"fill":"#3b5bdb","children":[{"type":"TEXT","name":"Label","text":"로그인","size":14,"weight":600,"color":"#ffffff"}]}]},{"type":"FRAME","name":"Body","layout":"HORIZONTAL","gap":24,"w":1120,"children":[{"type":"FRAME","name":"Profile Card","layout":"VERTICAL","padding":[24,24,24,24],"gap":8,"fill":"#ffffff","stroke":"#dee2e6","radius":16,"w":320,"counter":"CENTER","children":[{"type":"RECT","name":"Avatar","w":64,"h":64,"fill":"#e2e8f0","radius":999},{"type":"TEXT","name":"Name","text":"김모아","size":18,"weight":700,"color":"#0f172b"},{"type":"TEXT","name":"Email","text":"moa@example.com","size":14,"weight":400,"color":"#62748e"},{"type":"FRAME","name":"Edit Button","layout":"HORIZONTAL","padding":[8,16,8,16],"radius":8,"fill":"#ffffff","stroke":"#dee2e6","children":[{"type":"TEXT","name":"Label","text":"프로필 수정","size":14,"weight":600,"color":"#314158"}]}]},{"type":"FRAME","name":"Booking List","layout":"VERTICAL","gap":12,"w":"fill","children":[{"type":"TEXT","name":"List Title","text":"내 예약","size":20,"weight":700,"color":"#0f172b"},{"type":"FRAME","name":"Booking Item","layout":"HORIZONTAL","padding":[16,20,16,20],"gap":16,"fill":"#ffffff","stroke":"#dee2e6","radius":12,"w":"fill","counter":"CENTER","children":[{"type":"TEXT","name":"Date","text":"11월 20일 (목) 14:00","size":14,"weight":600,"color":"#0f172b","w":160},{"type":"TEXT","name":"Place","text":"강남 A룸 · 4인","size":14,"weight":400,"color":"#314158","w":"fill"},{"type":"FRAME","name":"Status Chip","layout":"HORIZONTAL","padding":[4,10,4,10],"radius":999,"fill":"#edf2ff","children":[{"type":"TEXT","name":"Status","text":"예약 확정","size":12,"weight":600,"color":"#3b5bdb"}]}]},{"type":"FRAME","name":"Booking Item","layout":"HORIZONTAL","padding":[16,20,16,20],"gap":16,"fill":"#ffffff","stroke":"#dee2e6","radius":12,"w":"fill","counter":"CENTER","children":[{"type":"TEXT","name":"Date","text":"11월 22일 (토) 10:00","size":14,"weight":600,"color":"#0f172b","w":160},{"type":"TEXT","name":"Place","text":"홍대 B룸 · 6인","size":14,"weight":400,"color":"#314158","w":"fill"},{"type":"FRAME","name":"Status Chip","layout":"HORIZONTAL","padding":[4,10,4,10],"radius":999,"fill":"#edf2ff","children":[{"type":"TEXT","name":"Status","text":"예약 확정","size":12,"weight":600,"color":"#3b5bdb"}]}]},{"type":"FRAME","name":"Booking Item","layout":"HORIZONTAL","padding":[16,20,16,20],"gap":16,"fill":"#ffffff","stroke":"#dee2e6","radius":12,"w":"fill","counter":"CENTER","children":[{"type":"TEXT","name":"Date","text":"11월 24일 (월) 19:00","size":14,"weight":600,"color":"#0f172b","w":160},{"type":"TEXT","name":"Place","text":"잠실 C룸 · 2인","size":14,"weight":400,"color":"#314158","w":"fill"},{"type":"FRAME","name":"Status Chip","layout":"HORIZONTAL","padding":[4,10,4,10],"radius":999,"fill":"#edf2ff","children":[{"type":"TEXT","name":"Status","text":"결제 대기","size":12,"weight":600,"color":"#3b5bdb"}]}]},{"type":"FRAME","name":"Booking Item","layout":"HORIZONTAL","padding":[16,20,16,20],"gap":16,"fill":"#ffffff","stroke":"#dee2e6","radius":12,"w":"fill","counter":"CENTER","children":[{"type":"TEXT","name":"Date","text":"11월 27일 (목) 13:00","size":14,"weight":600,"color":"#0f172b","w":160},{"type":"TEXT","name":"Place","text":"강남 A룸 · 4인","size":14,"weight":400,"color":"#314158","w":"fill"},{"type":"FRAME","name":"Status Chip","layout":"HORIZONTAL","padding":[4,10,4,10],"radius":999,"fill":"#edf2ff","children":[{"type":"TEXT","name":"Status","text":"예약 확정","size":12,"weight":600,"color":"#3b5bdb"}]}]},{"type":"FRAME","name":"Booking Item","layout":"HORIZONTAL","padding":[16,20,16,20],"gap":16,"fill":"#ffffff","stroke":"#dee2e6","radius":12,"w":"fill","counter":"CENTER","children":[{"type":"TEXT","name":"Date","text":"11월 29일 (토) 09:00","size":14,"weight":600,"color":"#0f172b","w":160},{"type":"TEXT","name":"Place","text":"신촌 D룸 · 8인","size":14,"weight":400,"color":"#314158","w":"fill"},{"type":"FRAME","name":"Status Chip","layout":"HORIZONTAL","padding":[4,10,4,10],"radius":999,"fill":"#edf2ff","children":[{"type":"TEXT","name":"Status","text":"예약 확정","size":12,"weight":600,"color":"#3b5bdb"}]}]},{"type":"FRAME","name":"Booking Item","layout":"HORIZONTAL","padding":[16,20,16,20],"gap":16,"fill":"#ffffff","stroke":"#dee2e6","radius":12,"w":"fill","counter":"CENTER","children":[{"type":"TEXT","name":"Date","text":"12월 1일 (월) 18:00","size":14,"weight":600,"color":"#0f172b","w":160},{"type":"TEXT","name":"Place","text":"홍대 B룸 · 6인","size":14,"weight":400,"color":"#314158","w":"fill"},{"type":"FRAME","name":"Status Chip","layout":"HORIZONTAL","padding":[4,10,4,10],"radius":999,"fill":"#edf2ff","children":[{"type":"TEXT","name":"Status","text":"결제 대기","size":12,"weight":600,"color":"#3b5bdb"}]}]},{"type":"FRAME","name":"Booking Item","layout":"HORIZONTAL","padding":[16,20,16,20],"gap":16,"fill":"#ffffff","stroke":"#dee2e6","radius":12,"w":"fill","counter":"CENTER","children":[{"type":"TEXT","name":"Date","text":"12월 4일 (목) 15:00","size":14,"weight":600,"color":"#0f172b","w":160},{"type":"TEXT","name":"Place","text":"잠실 C룸 · 2인","size":14,"weight":400,"color":"#314158","w":"fill"},{"type":"FRAME","name":"Status Chip","layout":"HORIZONTAL","padding":[4,10,4,10],"radius":999,"fill":"#edf2ff","children":[{"type":"TEXT","name":"Status","text":"예약 확정","size":12,"weight":600,"color":"#3b5bdb"}]}]},{"type":"FRAME","name":"Booking Item","layout":"HORIZONTAL","padding":[16,20,16,20],"gap":16,"fill":"#ffffff","stroke":"#dee2e6","radius":12,"w":"fill","counter":"CENTER","children":[{"type":"TEXT","name":"Date","text":"12월 6일 (토) 11:00","size":14,"weight":600,"color":"#0f172b","w":160},{"type":"TEXT","name":"Place","text":"강남 A룸 · 4인","size":14,"weight":400,"color":"#314158","w":"fill"},{"type":"FRAME","name":"Status Chip","layout":"HORIZONTAL","padding":[4,10,4,10],"radius":999,"fill":"#edf2ff","children":[{"type":"TEXT","name":"Status","text":"예약 확정","size":12,"weight":600,"color":"#3b5bdb"}]}]},{"type":"TEXT","name":"More Link","text":"지난 예약 더 보기","size":14,"weight":600,"color":"#3b5bdb"}]}]}]},{"type":"FRAME","name":"SET-01 알림 설정","layout":"VERTICAL","padding":[0,0,48,0],"gap":32,"fill":"#f8fafc","w":1280,"counter":"CENTER","children":[{"type":"FRAME","name":"Header","layout":"HORIZONTAL","padding":[16,32,16,32],"fill":"#ffffff","stroke":"#dee2e6","strokeSides":"BOTTOM","w":"fill","primary":"SPACE_BETWEEN","counter":"CENTER","children":[{"type":"TEXT","name":"Logo","text":"모아룸","size":20,"weight":700,"color":"#3b5bdb"},{"type":"FRAME","name":"Nav","layout":"HORIZONTAL","gap":24,"counter":"CENTER","children":[{"type":"TEXT","name":"Nav Item","text":"스터디룸 찾기","size":14,"weight":500,"color":"#314158"},{"type":"TEXT","name":"Nav Item","text":"내 예약","size":14,"weight":500,"color":"#314158"}]},{"type":"FRAME","name":"Login Button","layout":"HORIZONTAL","padding":[8,16,8,16],"radius":8,"fill":"#3b5bdb","children":[{"type":"TEXT","name":"Label","text":"로그인","size":14,"weight":600,"color":"#ffffff"}]}]},{"type":"FRAME","name":"Settings Panel","layout":"VERTICAL","padding":[24,24,24,24],"gap":16,"fill":"#ffffff","stroke":"#dee2e6","radius":16,"w":640,"children":[{"type":"TEXT","name":"Panel Title","text":"알림 설정","size":20,"weight":700,"color":"#0f172b"},{"type":"FRAME","name":"Setting Row","layout":"HORIZONTAL","w":"fill","primary":"SPACE_BETWEEN","counter":"CENTER","children":[{"type":"FRAME","name":"Texts","layout":"VERTICAL","gap":4,"children":[{"type":"TEXT","name":"Setting Title","text":"예약 확정 알림","size":16,"weight":600,"color":"#0f172b"},{"type":"TEXT","name":"Setting Desc","text":"예약이 확정되면 바로 알려드려요","size":14,"weight":400,"color":"#62748e"}]},{"type":"FRAME","name":"Toggle","layout":"HORIZONTAL","padding":[2,2,2,2],"radius":999,"fill":"#3b5bdb","w":44,"primary":"MAX","children":[{"type":"RECT","name":"Knob","w":20,"h":20,"fill":"#ffffff","radius":999}]}]},{"type":"FRAME","name":"Setting Row","layout":"HORIZONTAL","w":"fill","primary":"SPACE_BETWEEN","counter":"CENTER","children":[{"type":"FRAME","name":"Texts","layout":"VERTICAL","gap":4,"children":[{"type":"TEXT","name":"Setting Title","text":"이용 30분 전 알림","size":16,"weight":600,"color":"#0f172b"},{"type":"TEXT","name":"Setting Desc","text":"입실 30분 전에 알려드려요","size":14,"weight":400,"color":"#62748e"}]},{"type":"FRAME","name":"Toggle","layout":"HORIZONTAL","padding":[2,2,2,2],"radius":999,"fill":"#3b5bdb","w":44,"primary":"MAX","children":[{"type":"RECT","name":"Knob","w":20,"h":20,"fill":"#ffffff","radius":999}]}]},{"type":"FRAME","name":"Setting Row","layout":"HORIZONTAL","w":"fill","primary":"SPACE_BETWEEN","counter":"CENTER","children":[{"type":"FRAME","name":"Texts","layout":"VERTICAL","gap":4,"children":[{"type":"TEXT","name":"Setting Title","text":"마케팅 정보 수신","size":16,"weight":600,"color":"#0f172b"},{"type":"TEXT","name":"Setting Desc","text":"할인·이벤트 소식을 받아요","size":14,"weight":400,"color":"#62748e"}]},{"type":"FRAME","name":"Toggle","layout":"HORIZONTAL","padding":[2,2,2,2],"radius":999,"fill":"#cad5e2","w":44,"primary":"MIN","children":[{"type":"RECT","name":"Knob","w":20,"h":20,"fill":"#ffffff","radius":999}]}]}]}]},{"type":"FRAME","name":"Spec / Color Tokens","layout":"VERTICAL","padding":[32,32,32,32],"gap":16,"fill":"#ffffff","w":640,"children":[{"type":"TEXT","name":"Spec Title","text":"Color Tokens","size":24,"weight":700,"color":"#0f172b"},{"type":"FRAME","name":"Token","layout":"HORIZONTAL","gap":12,"counter":"CENTER","children":[{"type":"RECT","name":"Swatch","w":40,"h":40,"fill":"#3b5bdb","radius":8},{"type":"TEXT","name":"Token Name","text":"brand-600  #3b5bdb","size":14,"weight":500,"color":"#314158"}]},{"type":"FRAME","name":"Token","layout":"HORIZONTAL","gap":12,"counter":"CENTER","children":[{"type":"RECT","name":"Swatch","w":40,"h":40,"fill":"#edf2ff","radius":8},{"type":"TEXT","name":"Token Name","text":"brand-50  #edf2ff","size":14,"weight":500,"color":"#314158"}]},{"type":"FRAME","name":"Token","layout":"HORIZONTAL","gap":12,"counter":"CENTER","children":[{"type":"RECT","name":"Swatch","w":40,"h":40,"fill":"#dee2e6","radius":8},{"type":"TEXT","name":"Token Name","text":"line  #dee2e6","size":14,"weight":500,"color":"#314158"}]},{"type":"FRAME","name":"Token","layout":"HORIZONTAL","gap":12,"counter":"CENTER","children":[{"type":"RECT","name":"Swatch","w":40,"h":40,"fill":"#0f172b","radius":8},{"type":"TEXT","name":"Token Name","text":"slate-900  #0f172b","size":14,"weight":500,"color":"#314158"}]},{"type":"FRAME","name":"Token","layout":"HORIZONTAL","gap":12,"counter":"CENTER","children":[{"type":"RECT","name":"Swatch","w":40,"h":40,"fill":"#314158","radius":8},{"type":"TEXT","name":"Token Name","text":"slate-700  #314158","size":14,"weight":500,"color":"#314158"}]},{"type":"FRAME","name":"Token","layout":"HORIZONTAL","gap":12,"counter":"CENTER","children":[{"type":"RECT","name":"Swatch","w":40,"h":40,"fill":"#62748e","radius":8},{"type":"TEXT","name":"Token Name","text":"slate-500  #62748e","size":14,"weight":500,"color":"#314158"}]}]}]};

const WEIGHT_STYLES = {
  400: ['Regular'],
  500: ['Medium'],
  600: ['SemiBold', 'Semi Bold', 'Semibold', 'DemiBold'],
  700: ['Bold'],
};

function paint(hex) {
  const h = hex.replace('#', '');
  return {
    type: 'SOLID',
    color: {
      r: parseInt(h.slice(0, 2), 16) / 255,
      g: parseInt(h.slice(2, 4), 16) / 255,
      b: parseInt(h.slice(4, 6), 16) / 255,
    },
  };
}

function toHex(p) {
  if (!p || p.type !== 'SOLID') return null;
  const ch = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  return '#' + ch(p.color.r) + ch(p.color.g) + ch(p.color.b);
}

function weightsIn(node, out) {
  if (node.type === 'TEXT') out.add(node.weight);
  (node.children || []).forEach((c) => weightsIn(c, out));
  return out;
}

async function pickFonts(families, weights) {
  const available = await figma.listAvailableFontsAsync();
  const tried = [];
  for (const family of families) {
    const styles = new Set(available.filter((f) => f.fontName.family === family).map((f) => f.fontName.style));
    if (styles.size === 0) {
      tried.push(family + '(없음)');
      continue;
    }
    const map = {};
    let missing = null;
    for (const w of weights) {
      const style = WEIGHT_STYLES[w].find((s) => styles.has(s));
      if (!style) {
        missing = w;
        break;
      }
      map[w] = { family: family, style: style };
    }
    if (missing === null) return map;
    tried.push(family + '(' + missing + ' 굵기 없음)');
  }
  throw new Error('필요한 굵기를 모두 가진 글꼴이 없어요: ' + tried.join(', '));
}

function isAutoLayout(node) {
  return node && node.type === 'FRAME' && node.layoutMode !== 'NONE';
}

/** 고정·채우기 크기는 자식보다 먼저, 내용 맞춤(HUG)은 자식을 다 만든 뒤에 정한다 */
function sizeBefore(node, spec, parent) {
  if (spec.type === 'RECT') {
    node.resize(typeof spec.w === 'number' ? spec.w : 100, spec.h);
  } else if (typeof spec.w === 'number') {
    node.resize(spec.w, node.height);
    if (spec.type === 'TEXT' || isAutoLayout(node) || isAutoLayout(parent)) node.layoutSizingHorizontal = 'FIXED';
  } else if (spec.type === 'TEXT' && spec.w === undefined) {
    node.textAutoResize = 'WIDTH_AND_HEIGHT';
  }
  if (spec.w === 'fill' && isAutoLayout(parent)) node.layoutSizingHorizontal = 'FILL';
}

function sizeAfter(node, spec) {
  if (spec.type === 'FRAME' && isAutoLayout(node)) {
    if (spec.w === undefined) node.layoutSizingHorizontal = 'HUG';
    node.layoutSizingVertical = 'HUG';
  }
}

function build(spec, parent, fonts) {
  let node;
  if (spec.type === 'TEXT') {
    node = figma.createText();
    node.fontName = fonts[spec.weight];
    node.characters = spec.text;
    node.fontSize = spec.size;
    node.fills = [paint(spec.color)];
  } else if (spec.type === 'RECT') {
    node = figma.createRectangle();
    node.fills = spec.fill ? [paint(spec.fill)] : [];
    if (spec.radius) node.cornerRadius = spec.radius;
  } else {
    node = figma.createFrame();
    node.fills = spec.fill ? [paint(spec.fill)] : [];
    node.clipsContent = false;
    if (spec.layout && spec.layout !== 'NONE') {
      node.layoutMode = spec.layout;
      const p = spec.padding || [0, 0, 0, 0];
      node.paddingTop = p[0];
      node.paddingRight = p[1];
      node.paddingBottom = p[2];
      node.paddingLeft = p[3];
      node.itemSpacing = spec.gap || 0;
      node.primaryAxisAlignItems = spec.primary || 'MIN';
      node.counterAxisAlignItems = spec.counter || 'MIN';
    }
    if (spec.radius) node.cornerRadius = spec.radius;
    if (spec.stroke) {
      node.strokes = [paint(spec.stroke)];
      node.strokeAlign = 'INSIDE';
      if (spec.strokeSides === 'BOTTOM' || spec.strokeSides === 'TOP') {
        node.strokeTopWeight = spec.strokeSides === 'TOP' ? 1 : 0;
        node.strokeBottomWeight = spec.strokeSides === 'BOTTOM' ? 1 : 0;
        node.strokeLeftWeight = 0;
        node.strokeRightWeight = 0;
      } else {
        node.strokeWeight = 1;
      }
    }
  }
  node.name = spec.name;
  parent.appendChild(node);
  sizeBefore(node, spec, parent);
  (spec.children || []).forEach((c) => build(c, node, fonts));
  sizeAfter(node, spec);
  return node;
}

/** 만든 노드가 시안 정의와 같은 값을 갖는지 다시 읽어 본다(글꼴 대체·반올림 확인) */
function verify(spec, node, path, problems) {
  const where = path + ' > ' + spec.name;
  if (node.name !== spec.name) problems.push(where + ': 이름 ' + node.name);
  if (spec.type === 'TEXT') {
    if (node.fontSize !== spec.size) problems.push(where + ': 글자 크기 ' + String(node.fontSize));
    if (node.fontWeight !== spec.weight) problems.push(where + ': 굵기 ' + String(node.fontWeight) + ' (시안 ' + spec.weight + ')');
    if (toHex(node.fills[0]) !== spec.color.toLowerCase()) problems.push(where + ': 글자색 ' + toHex(node.fills[0]));
    if (node.characters !== spec.text) problems.push(where + ': 문구');
    return;
  }
  if (spec.fill && toHex(node.fills[0]) !== spec.fill.toLowerCase()) problems.push(where + ': 배경 ' + toHex(node.fills[0]));
  if (spec.radius && node.cornerRadius !== spec.radius) problems.push(where + ': 모서리 ' + String(node.cornerRadius));
  if (spec.type === 'FRAME' && spec.layout) {
    const p = spec.padding || [0, 0, 0, 0];
    const got = [node.paddingTop, node.paddingRight, node.paddingBottom, node.paddingLeft];
    if (got.join(',') !== p.join(',')) problems.push(where + ': padding ' + got.join(' '));
    if ((spec.gap || 0) !== node.itemSpacing) problems.push(where + ': gap ' + node.itemSpacing);
  }
  (spec.children || []).forEach((c, i) => verify(c, node.children[i], where, problems));
}

async function main() {
  const weights = [];
  SPEC.frames.forEach((f) => weightsIn(f, new Set()).forEach((w) => weights.indexOf(w) < 0 && weights.push(w)));
  const fonts = await pickFonts(SPEC.fontFamilies, weights);
  await Promise.all(Object.keys(fonts).map((w) => figma.loadFontAsync(fonts[w])));

  let pageName = SPEC.page;
  const names = figma.root.children.map((p) => p.name);
  for (let i = 2; names.indexOf(pageName) >= 0; i++) pageName = SPEC.page + ' (' + i + ')';
  const page = figma.createPage();
  page.name = pageName;
  await figma.setCurrentPageAsync(page);

  const section = figma.createSection();
  section.name = SPEC.section;
  page.appendChild(section);

  const GAP = 160;
  const PAD = 120;
  let x = PAD;
  let maxH = 0;
  const built = [];
  for (const f of SPEC.frames) {
    const node = build(f, section, fonts);
    node.x = x;
    node.y = PAD;
    x += node.width + GAP;
    maxH = Math.max(maxH, node.height);
    built.push(node);
  }
  section.resizeWithoutConstraints(x - GAP + PAD, maxH + PAD * 2);

  const problems = [];
  SPEC.frames.forEach((f, i) => verify(f, built[i], '', problems));
  figma.viewport.scrollAndZoomIntoView([section]);

  const family = fonts[weights[0]].family;
  if (problems.length > 0) {
    console.log('시안 정의와 다른 값:\n' + problems.join('\n'));
    figma.closePlugin('만들었지만 시안 정의와 다른 값이 ' + problems.length + '개 있어요. 콘솔(Plugins > Development > Show console)을 확인하세요.');
    return;
  }
  figma.closePlugin('완료: "' + pageName + '" 페이지에 화면 ' + SPEC.frames.length + '개를 만들었어요(글꼴 ' + family + '). 이 페이지 링크를 QAting에 연결하세요.');
}

main().catch((e) => figma.closePlugin('실패: ' + (e && e.message ? e.message : String(e))));
