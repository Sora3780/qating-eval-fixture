import { AppHeader } from '../components/layout/AppHeader'
import { RoomInfoPanel } from '../components/room/RoomInfoPanel'
import { RulesList } from '../components/room/RulesList'
import { BookingBox } from '../components/room/BookingBox'

export function RoomDetailPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto grid max-w-[1120px] grid-cols-[1fr_360px] items-start gap-6 pt-8 pb-12">
        <div className="flex flex-col gap-6">
          <RoomInfoPanel />
          <RulesList />
        </div>
        <BookingBox />
      </main>
    </>
  )
}
