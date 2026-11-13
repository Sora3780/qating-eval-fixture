export type Booking = {
  id: string
  date: string
  place: string
  status: string
}

export const bookings: Booking[] = [
  { id: 'b1', date: '11월 20일 (목) 14:00', place: '강남 A룸 · 4인', status: '예약 확정' },
  { id: 'b2', date: '11월 22일 (토) 10:00', place: '홍대 B룸 · 6인', status: '예약 확정' },
  { id: 'b3', date: '11월 24일 (월) 19:00', place: '잠실 C룸 · 2인', status: '결제 대기' },
  { id: 'b4', date: '11월 27일 (목) 13:00', place: '강남 A룸 · 4인', status: '예약 확정' },
  { id: 'b5', date: '11월 29일 (토) 09:00', place: '신촌 D룸 · 8인', status: '예약 확정' },
  { id: 'b6', date: '12월 1일 (월) 18:00', place: '홍대 B룸 · 6인', status: '결제 대기' },
  { id: 'b7', date: '12월 4일 (목) 15:00', place: '잠실 C룸 · 2인', status: '예약 확정' },
  { id: 'b8', date: '12월 6일 (토) 11:00', place: '강남 A룸 · 4인', status: '예약 확정' },
]
