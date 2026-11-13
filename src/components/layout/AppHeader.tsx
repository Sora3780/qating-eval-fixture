export function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b border-line bg-white px-8 py-4">
      <a href="#/" className="text-xl font-bold text-brand-600">모아룸</a>
      <nav className="flex items-center gap-6">
        <a href="#/" className="text-sm font-medium text-slate-700">스터디룸 찾기</a>
        <a href="#/me/bookings" className="text-sm font-medium text-slate-700">내 예약</a>
      </nav>
      <button type="button" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">로그인</button>
    </header>
  )
}
