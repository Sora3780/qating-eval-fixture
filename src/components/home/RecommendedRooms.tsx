import { RoomCard } from './RoomCard'
import { rooms } from '../../data/rooms'

export function RecommendedRooms() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-slate-900">추천 스터디룸</h2>
      <div className="grid grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  )
}
