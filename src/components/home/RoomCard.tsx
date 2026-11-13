import type { Room } from '../../data/rooms'

export function RoomCard({ room }: { room: Room }) {
  return (
    <a href={`#/rooms/${room.id}`} className="flex flex-col gap-3 rounded-lg border border-line bg-white p-4">
      <div className="h-[140px] rounded-lg bg-slate-200" />
      <h3 className="text-base font-semibold text-slate-900">{room.name}</h3>
      <p className="text-sm text-slate-500">{room.meta}</p>
      <p className="text-base font-medium text-brand-600">{room.priceLabel}</p>
    </a>
  )
}
