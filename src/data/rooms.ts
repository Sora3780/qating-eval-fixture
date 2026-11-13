export type Room = {
  id: string
  name: string
  meta: string
  priceLabel: string
}

export const rooms: Room[] = [
  { id: 'gangnam-a', name: '강남 A룸', meta: '4인 · 강남역 3분', priceLabel: '시간당 6,000원' },
  { id: 'hongdae-b', name: '홍대 B룸', meta: '6인 · 홍대입구역 5분', priceLabel: '시간당 8,000원' },
  { id: 'jamsil-c', name: '잠실 C룸', meta: '2인 · 잠실역 1분', priceLabel: '시간당 4,000원' },
]
