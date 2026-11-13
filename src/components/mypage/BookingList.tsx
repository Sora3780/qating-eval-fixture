import { bookings } from '../../data/bookings'

export function BookingList() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-bold text-slate-900">내 예약</h2>
      {bookings.map((booking) => (
        <article key={booking.id} className="flex items-center gap-4 rounded-xl border border-line bg-white p-4">
          <span className="w-40 text-sm font-semibold text-slate-900">{booking.date}</span>
          <span className="flex-1 text-sm text-slate-700">{booking.place}</span>
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-600">{booking.status}</span>
        </article>
      ))}
      <a href="#/me/bookings" className="self-center text-sm font-semibold text-slate-500">지난 예약 더 보기</a>
    </section>
  )
}
