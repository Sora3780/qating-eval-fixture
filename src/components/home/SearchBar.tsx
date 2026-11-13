export function SearchBar() {
  return (
    <div className="relative">
      <span aria-hidden className="absolute top-1/2 left-4 size-5 -translate-y-1/2 rounded-sm bg-slate-300" />
      <input type="search" placeholder="지역, 역 이름으로 검색" className="w-full rounded-xl border border-slate-300 bg-white py-3 pr-4 pl-11 text-sm text-slate-900 placeholder:text-slate-500" />
    </div>
  )
}
