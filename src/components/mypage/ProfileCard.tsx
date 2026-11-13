import styles from '@/styles/profile-card.module.css'

export function ProfileCard() {
  return (
    <aside className={styles.card}>
      <div className={styles.avatar} />
      <strong className={styles.name}>김모아</strong>
      <span className={styles.email}>moa@example.com</span>
      <button type="button" className={styles.edit}>
        프로필 수정
      </button>
    </aside>
  )
}
