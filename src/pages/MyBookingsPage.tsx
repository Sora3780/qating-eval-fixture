import { AppHeader } from '../components/layout/AppHeader'
import { ProfileCard } from '../components/mypage/ProfileCard'
import { BookingList } from '../components/mypage/BookingList'

export function MyBookingsPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto grid max-w-[1120px] grid-cols-[320px_1fr] items-start gap-6 pt-8 pb-12">
        <ProfileCard />
        <BookingList />
      </main>
    </>
  )
}
