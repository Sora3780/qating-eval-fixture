import { AppHeader } from '../components/layout/AppHeader'
import { HeroBanner } from '../components/home/HeroBanner'
import { SearchBar } from '../components/home/SearchBar'
import { RecommendedRooms } from '../components/home/RecommendedRooms'

export function HomePage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto flex max-w-[1120px] flex-col gap-8 pt-8 pb-12">
        <HeroBanner />
        <SearchBar />
        <RecommendedRooms />
      </main>
    </>
  )
}
