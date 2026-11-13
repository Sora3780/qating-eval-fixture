export function ConfirmActions() {
  return (
    <div className="flex justify-end gap-3">
      <a href="#/rooms/gangnam-a" className="inline-flex h-10 items-center rounded-lg border border-line bg-white px-5 text-sm font-semibold text-slate-700">이전으로</a>
      <button type="button" className="h-10 rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white hover:bg-brand-700">결제하기</button>
    </div>
  )
}
