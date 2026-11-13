// Figma 시안의 단일 원본. `npm run spec`이 이 파일로 design/spec.json과 Figma 플러그인(scripts/figma-plugin/code.js)을 만든다.
// 값은 "디자이너가 정한 정답"이다. 코드(src/)는 이 값대로 구현하되, answer-key/cases.json에 적은 곳만 일부러 다르게 했다.
// 노드 이름은 QAting 이슈의 위치("블록 > 요소")로 그대로 나오므로 정답표와 맞춰 둔다.

const C = {
  brand600: '#3b5bdb',
  brand50: '#edf2ff',
  line: '#dee2e6',
  white: '#ffffff',
  slate900: '#0f172b',
  slate700: '#314158',
  slate500: '#62748e',
  slate300: '#cad5e2',
  slate200: '#e2e8f0',
  slate100: '#f1f5f9',
  slate50: '#f8fafc',
}

const frame = (name, o, children = []) => ({ type: 'FRAME', name, ...o, children })
const text = (name, characters, size, weight, color, o = {}) => ({ type: 'TEXT', name, text: characters, size, weight, color, ...o })
const rect = (name, w, h, fill, radius) => ({ type: 'RECT', name, w, h, fill, radius })

const pad = (t, r = t, b = t, l = r) => [t, r, b, l]

const page = (name, children) =>
  frame(name, { layout: 'VERTICAL', padding: pad(0, 0, 48, 0), gap: 32, fill: C.slate50, w: 1280, counter: 'CENTER' }, children)

const header = () =>
  frame('Header', { layout: 'HORIZONTAL', padding: pad(16, 32), fill: C.white, stroke: C.line, strokeSides: 'BOTTOM', w: 'fill', primary: 'SPACE_BETWEEN', counter: 'CENTER' }, [
    text('Logo', '모아룸', 20, 700, C.brand600),
    frame('Nav', { layout: 'HORIZONTAL', gap: 24, counter: 'CENTER' }, [
      text('Nav Item', '스터디룸 찾기', 14, 500, C.slate700),
      text('Nav Item', '내 예약', 14, 500, C.slate700),
    ]),
    frame('Login Button', { layout: 'HORIZONTAL', padding: pad(8, 16), radius: 8, fill: C.brand600 }, [text('Label', '로그인', 14, 600, C.white)]),
  ])

const rooms = [
  { name: '강남 A룸', meta: '4인 · 강남역 3분', price: '시간당 6,000원' },
  { name: '홍대 B룸', meta: '6인 · 홍대입구역 5분', price: '시간당 8,000원' },
  { name: '잠실 C룸', meta: '2인 · 잠실역 1분', price: '시간당 4,000원' },
]

const roomCard = (r) =>
  frame('Room Card', { layout: 'VERTICAL', padding: pad(16), gap: 12, fill: C.white, stroke: C.line, radius: 12, w: 'fill' }, [
    rect('Thumbnail', 'fill', 140, C.slate200, 8),
    text('Room Name', r.name, 16, 600, C.slate900),
    text('Meta', r.meta, 14, 400, C.slate500),
    text('Price', r.price, 16, 700, C.brand600),
  ])

const bookings = [
  ['11월 20일 (목) 14:00', '강남 A룸 · 4인', '예약 확정'],
  ['11월 22일 (토) 10:00', '홍대 B룸 · 6인', '예약 확정'],
  ['11월 24일 (월) 19:00', '잠실 C룸 · 2인', '결제 대기'],
  ['11월 27일 (목) 13:00', '강남 A룸 · 4인', '예약 확정'],
  ['11월 29일 (토) 09:00', '신촌 D룸 · 8인', '예약 확정'],
  ['12월 1일 (월) 18:00', '홍대 B룸 · 6인', '결제 대기'],
  ['12월 4일 (목) 15:00', '잠실 C룸 · 2인', '예약 확정'],
  ['12월 6일 (토) 11:00', '강남 A룸 · 4인', '예약 확정'],
]

const home = page('HOME-01 홈', [
  header(),
  frame('Hero', { layout: 'VERTICAL', padding: pad(48, 40), gap: 16, fill: C.brand50, radius: 16, w: 1120 }, [
    text('Eyebrow', '이번 주 인기', 14, 600, C.brand600),
    text('Title', '조용한 스터디룸을 가장 빠르게', 30, 700, C.slate900),
    text('Subtitle', '역 근처 120개 공간을 시간 단위로 예약하세요', 16, 400, C.slate500),
    frame('CTA Button', { layout: 'HORIZONTAL', padding: pad(12, 24), radius: 999, fill: C.brand600 }, [text('Label', '스터디룸 둘러보기', 16, 600, C.white)]),
  ]),
  frame('Search Bar', { layout: 'HORIZONTAL', padding: pad(12, 16), gap: 8, fill: C.white, stroke: C.line, radius: 12, w: 1120, counter: 'CENTER' }, [
    rect('Search Icon', 20, 20, C.slate300, 4),
    text('Placeholder', '지역, 역 이름으로 검색', 14, 400, C.slate500),
  ]),
  frame('Recommended Rooms', { layout: 'VERTICAL', gap: 16, w: 1120 }, [
    text('Section Title', '추천 스터디룸', 20, 700, C.slate900),
    frame('Card Row', { layout: 'HORIZONTAL', gap: 24, w: 'fill' }, rooms.map(roomCard)),
  ]),
])

const roomDetail = page('ROOM-01 스터디룸 상세', [
  header(),
  frame('Body', { layout: 'HORIZONTAL', gap: 24, w: 1120 }, [
    frame('Left Column', { layout: 'VERTICAL', gap: 24, w: 'fill' }, [
      frame('Room Info', { layout: 'VERTICAL', padding: pad(24), gap: 12, fill: C.white, stroke: C.line, radius: 16, w: 'fill' }, [
        frame('Badge', { layout: 'HORIZONTAL', padding: pad(4, 10), radius: 999, fill: '#ebfbee' }, [text('Badge Label', '예약 가능', 12, 600, '#2b8a3e')]),
        text('Room Title', '강남 A룸 (4인실)', 24, 700, C.slate900),
        text('Description', '창가 자리, 화이트보드, 모니터 대여 가능', 14, 400, C.slate700),
        frame(
          'Amenities',
          { layout: 'HORIZONTAL', gap: 8 },
          ['와이파이', '화이트보드', '모니터'].map((a) =>
            frame('Chip', { layout: 'HORIZONTAL', padding: pad(6, 12), radius: 8, fill: C.slate100 }, [text('Chip Label', a, 13, 500, C.slate700)]),
          ),
        ),
      ]),
      frame('Rules', { layout: 'VERTICAL', padding: pad(20, 24), gap: 10, fill: '#fff9db', radius: 12, w: 'fill' }, [
        text('Rules Title', '이용 규칙', 16, 700, '#664d03'),
        frame('Rule List', { layout: 'VERTICAL', gap: 6 }, [
          text('Rule', '음식물 반입 금지', 14, 400, '#664d03'),
          text('Rule', '퇴실 10분 전 정리', 14, 400, '#664d03'),
          text('Rule', '예약 시간 30분 초과 시 추가 요금', 14, 400, '#664d03'),
        ]),
      ]),
    ]),
    frame('Booking Box', { layout: 'VERTICAL', padding: pad(20), gap: 16, fill: C.white, stroke: C.line, radius: 12, w: 360 }, [
      frame('Price Row', { layout: 'HORIZONTAL', gap: 4, counter: 'MAX' }, [
        text('Price', '6,000원', 24, 700, C.slate900),
        text('Unit', '/ 시간', 14, 400, C.slate500),
      ]),
      frame('Time Select', { layout: 'HORIZONTAL', padding: pad(10, 12), radius: 8, fill: C.white, stroke: C.line, w: 'fill' }, [
        text('Time Label', '오늘 14:00 – 16:00', 14, 500, C.slate700),
      ]),
      frame('Reserve Button', { layout: 'HORIZONTAL', padding: pad(14, 16), radius: 8, fill: C.brand600, w: 'fill', primary: 'CENTER' }, [
        text('Label', '예약하기', 16, 700, C.white),
      ]),
    ]),
  ]),
])

const confirm = page('BOOK-01 예약 확인', [
  header(),
  frame('Summary Card', { layout: 'VERTICAL', padding: pad(24), gap: 16, fill: C.white, stroke: C.line, radius: 12, w: 640 }, [
    text('Summary Title', '예약 정보 확인', 20, 700, C.slate900),
    frame(
      'Rows',
      { layout: 'VERTICAL', gap: 10, w: 'fill' },
      [
        ['공간', '강남 A룸'],
        ['일시', '11월 20일 (목) 14:00 – 16:00'],
        ['인원', '4명'],
      ].map(([label, value]) =>
        frame('Row', { layout: 'HORIZONTAL', w: 'fill', primary: 'SPACE_BETWEEN' }, [
          text('Label', label, 14, 400, C.slate500),
          text('Value', value, 14, 600, C.slate900),
        ]),
      ),
    ),
    frame('Total Row', { layout: 'HORIZONTAL', padding: pad(16, 0, 0, 0), stroke: C.line, strokeSides: 'TOP', w: 'fill', primary: 'SPACE_BETWEEN', counter: 'CENTER' }, [
      text('Total Label', '결제 금액', 16, 600, C.slate900),
      text('Total Value', '12,000원', 20, 700, C.brand600),
    ]),
  ]),
  frame('Confirm Actions', { layout: 'HORIZONTAL', gap: 12, w: 640, primary: 'MAX' }, [
    frame('Cancel Button', { layout: 'HORIZONTAL', padding: pad(10, 20), radius: 8, fill: C.white, stroke: C.line }, [text('Label', '이전 단계', 14, 600, C.slate700)]),
    frame('Pay Button', { layout: 'HORIZONTAL', padding: pad(10, 24), radius: 8, fill: C.brand600 }, [text('Label', '결제하기', 14, 600, C.white)]),
  ]),
])

const myBookings = page('MY-01 내 예약', [
  header(),
  frame('Body', { layout: 'HORIZONTAL', gap: 24, w: 1120 }, [
    frame('Profile Card', { layout: 'VERTICAL', padding: pad(24), gap: 8, fill: C.white, stroke: C.line, radius: 16, w: 320, counter: 'CENTER' }, [
      rect('Avatar', 64, 64, C.slate200, 999),
      text('Name', '김모아', 18, 700, C.slate900),
      text('Email', 'moa@example.com', 14, 400, C.slate500),
      frame('Edit Button', { layout: 'HORIZONTAL', padding: pad(8, 16), radius: 8, fill: C.white, stroke: C.line }, [text('Label', '프로필 수정', 14, 600, C.slate700)]),
    ]),
    frame('Booking List', { layout: 'VERTICAL', gap: 12, w: 'fill' }, [
      text('List Title', '내 예약', 20, 700, C.slate900),
      ...bookings.map(([date, place, status]) =>
        frame('Booking Item', { layout: 'HORIZONTAL', padding: pad(16, 20), gap: 16, fill: C.white, stroke: C.line, radius: 12, w: 'fill', counter: 'CENTER' }, [
          text('Date', date, 14, 600, C.slate900, { w: 160 }),
          text('Place', place, 14, 400, C.slate700, { w: 'fill' }),
          frame('Status Chip', { layout: 'HORIZONTAL', padding: pad(4, 10), radius: 999, fill: C.brand50 }, [text('Status', status, 12, 600, C.brand600)]),
        ]),
      ),
      text('More Link', '지난 예약 더 보기', 14, 600, C.brand600),
    ]),
  ]),
])

// 구현하지 않은 화면 — 비교 분석이 코드 파일을 지어내지 않고 "매핑 없음"으로 둬야 한다
const settings = page('SET-01 알림 설정', [
  header(),
  frame('Settings Panel', { layout: 'VERTICAL', padding: pad(24), gap: 16, fill: C.white, stroke: C.line, radius: 16, w: 640 }, [
    text('Panel Title', '알림 설정', 20, 700, C.slate900),
    ...[
      ['예약 확정 알림', '예약이 확정되면 바로 알려드려요', true],
      ['이용 30분 전 알림', '입실 30분 전에 알려드려요', true],
      ['마케팅 정보 수신', '할인·이벤트 소식을 받아요', false],
    ].map(([title, desc, on]) =>
      frame('Setting Row', { layout: 'HORIZONTAL', w: 'fill', primary: 'SPACE_BETWEEN', counter: 'CENTER' }, [
        frame('Texts', { layout: 'VERTICAL', gap: 4 }, [text('Setting Title', title, 16, 600, C.slate900), text('Setting Desc', desc, 14, 400, C.slate500)]),
        frame('Toggle', { layout: 'HORIZONTAL', padding: pad(2), radius: 999, fill: on ? C.brand600 : C.slate300, w: 44, primary: on ? 'MAX' : 'MIN' }, [
          rect('Knob', 20, 20, C.white, 999),
        ]),
      ]),
    ),
  ]),
])

// 설명용 보드 — 화면이 아니므로 매핑 없음이 정답
const tokens = frame('Spec / Color Tokens', { layout: 'VERTICAL', padding: pad(32), gap: 16, fill: C.white, w: 640 }, [
  text('Spec Title', 'Color Tokens', 24, 700, C.slate900),
  ...[
    ['brand-600', C.brand600],
    ['brand-50', C.brand50],
    ['line', C.line],
    ['slate-900', C.slate900],
    ['slate-700', C.slate700],
    ['slate-500', C.slate500],
  ].map(([n, c]) => frame('Token', { layout: 'HORIZONTAL', gap: 12, counter: 'CENTER' }, [rect('Swatch', 40, 40, c, 8), text('Token Name', `${n}  ${c}`, 14, 500, C.slate700)])),
])

export const spec = {
  version: 1,
  page: 'QAting 평가용 - 모아룸',
  section: '모아룸 v1',
  fontFamilies: ['Pretendard', 'Noto Sans KR', 'Inter'],
  frames: [home, roomDetail, confirm, myBookings, settings, tokens],
}
