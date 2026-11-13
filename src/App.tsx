import { useEffect, useState } from 'react'
import { HomePage } from './pages/HomePage'
import { RoomDetailPage } from './pages/RoomDetailPage'
import { BookingConfirmPage } from './pages/BookingConfirmPage'
import { MyBookingsPage } from './pages/MyBookingsPage'

const routes: Record<string, () => React.JSX.Element> = {
  '/': HomePage,
  '/rooms/gangnam-a': RoomDetailPage,
  '/booking/confirm': BookingConfirmPage,
  '/me/bookings': MyBookingsPage,
}

function currentPath() {
  const path = window.location.hash.replace(/^#/, '')
  return path === '' ? '/' : path
}

export function App() {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    const onChange = () => {
      setPath(currentPath())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const Page = routes[path] ?? HomePage
  return <Page />
}
