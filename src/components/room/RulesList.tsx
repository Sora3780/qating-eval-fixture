export function RulesList() {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: '20px 24px',
        background: '#fff9db',
        borderRadius: 12,
      }}
    >
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#664d03' }}>이용 규칙</h2>
      <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <li style={{ fontSize: 14, color: '#664d03' }}>음식물 반입 금지</li>
        <li style={{ fontSize: 14, color: '#664d03' }}>퇴실 5분 전 정리</li>
        <li style={{ fontSize: 14, color: '#664d03' }}>예약 시간 30분 초과 시 추가 요금</li>
      </ul>
    </section>
  )
}
