import styles from './RoomInfoPanel.module.css'

const amenities = ['와이파이', '화이트보드', '모니터']

export function RoomInfoPanel() {
  return (
    <section className={styles.panel}>
      <span className={styles.badge}>예약 가능</span>
      <h1 className={styles.title}>강남 A룸 (4인)</h1>
      <p className={styles.description}>창가 자리, 화이트보드, 모니터 대여 가능</p>
      <ul className={styles.chips}>
        {amenities.map((item) => (
          <li key={item} className={styles.chip}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
