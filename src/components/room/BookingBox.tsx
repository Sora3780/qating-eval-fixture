import styled from 'styled-components'

const muted = '#868e96'

const Box = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 12px;
`

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`

const Price = styled.strong`
  font-size: 24px;
  font-weight: 700;
  color: #0f172b;
`

const Unit = styled.span`
  font-size: 14px;
  color: ${muted};
`

const TimeSelect = styled.button`
  display: flex;
  padding: 10px 12px;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  background: #ffffff;
  font-size: 14px;
  font-weight: 500;
  color: #314158;
  text-align: left;
`

const ReserveButton = styled.a`
  display: block;
  padding: 14px 16px;
  border-radius: 8px;
  background: #3b5bdb;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  text-align: center;

  &:hover {
    background: #364fc7;
  }
`

export function BookingBox() {
  return (
    <Box>
      <PriceRow>
        <Price>6,000원</Price>
        <Unit>/ 시간</Unit>
      </PriceRow>
      <TimeSelect type="button">오늘 14:00 – 16:00</TimeSelect>
      <ReserveButton href="#/booking/confirm">예약하기</ReserveButton>
    </Box>
  )
}
