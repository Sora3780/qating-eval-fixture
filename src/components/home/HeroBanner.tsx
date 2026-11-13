export function HeroBanner() {
  return (
    <section className="flex flex-col items-start gap-4 rounded-2xl bg-brand-50 px-10 py-12">
      <p className="text-sm font-semibold text-brand-600">이번 주 인기</p>
      <h1 className="text-4xl font-bold text-slate-900">조용한 스터디룸을 가장 빠르게</h1>
      <p className="text-base text-slate-500">역 근처 120개 공간을 시간 단위로 예약하세요</p>
      <a href="#/rooms/gangnam-a" className="rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white">스터디룸 둘러보기</a>
    </section>
  )
}
