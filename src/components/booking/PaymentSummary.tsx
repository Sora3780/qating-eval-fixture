import './payment-summary.css'

const booking = {
  room: '강남 A룸',
  schedule: '11월 21일 (금) 14:00 – 16:00',
  people: '4명',
  total: '12,000원',
}

const rows = [
  { label: '공간', value: booking.room },
  { label: '일시', value: booking.schedule },
  { label: '인원', value: booking.people },
]

export function PaymentSummary() {
  return (
    <section className="summary">
      <h1 className="summary__title">예약 정보 확인</h1>
      <dl className="summary__rows">
        {rows.map((row) => (
          <div key={row.label} className="summary__row">
            <dt className="summary__label">{row.label}</dt>
            <dd className="summary__value">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="summary__total">
        <span className="summary__total-label">결제 금액</span>
        <strong className="summary__total-value">{booking.total}</strong>
      </div>
    </section>
  )
}
