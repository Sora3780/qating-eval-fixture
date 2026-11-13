import { AppHeader } from '../components/layout/AppHeader'
import { PaymentSummary } from '../components/booking/PaymentSummary'
import { ConfirmActions } from '../components/booking/ConfirmActions'

export function BookingConfirmPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto flex max-w-[640px] flex-col gap-6 pt-8 pb-12">
        <PaymentSummary />
        <ConfirmActions />
      </main>
    </>
  )
}
