import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { versions } from '../versions/registry'
import styles from './VersionBar.module.css'

/** Small reviewer toolbar for switching between design versions. Not part of any design. */
export function VersionBar() {
  const { pathname, search } = useLocation()
  const [open, setOpen] = useState(true)
  const current = versions.find((v) => pathname === `/${v.slug}`)
  if (!current) return null

  if (!open)
    return (
      <button type="button" className={styles.reopen} onClick={() => setOpen(true)} aria-label="نمایش نوار نسخه‌ها">
        {current.slug}
      </button>
    )

  return (
    <nav className={styles.bar} aria-label="نسخه‌های طراحی" dir="rtl">
      <Link to="/" className={styles.home}>
        همه نسخه‌ها
      </Link>
      {versions.map((v) => (
        <Link key={v.id} to={`/${v.slug}${search}`} className={styles.item} aria-current={v === current ? 'page' : undefined}>
          {v.name}
        </Link>
      ))}
      <button type="button" className={styles.hide} onClick={() => setOpen(false)} aria-label="پنهان کردن نوار نسخه‌ها">
        ×
      </button>
    </nav>
  )
}
