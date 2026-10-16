import { faDigits, monthName, relativeDays } from '../../../../shared/utils/fa'
import type { SemesterState } from '../../../../shared/utils/semester'
import s from './WeekStrip.module.css'

interface WeekStripProps {
  state: SemesterState
  calendarHref: string
  /** How many upcoming dates to show. */
  limit?: number
}

/** Saffron date chips for what is happening now and next in the semester. */
export function WeekStrip({ state, calendarHref, limit = 4 }: WeekStripProps) {
  const items = [...state.current, ...state.upcoming].slice(0, limit)
  if (!items.length) return null

  return (
    <section aria-labelledby="v2-week" className={s.strip}>
      <div className={s.head}>
        <h2 id="v2-week" className={s.title}>
          پیش رو در این ترم
        </h2>
        <a href={calendarHref}>تقویم کامل آموزشی</a>
      </div>
      <ol role="list" className={s.list}>
        {items.map((e) => (
          <li key={e.id} className={s.item} data-status={e.status}>
            <span className={s.date} aria-hidden="true">
              <span className={s.day}>{faDigits(e.start[2])}</span>
              <span className={s.month}>{monthName(e.start[1])}</span>
            </span>
            <span className={s.body}>
              <span className={s.label}>{e.label}</span>
              {e.cohort && <span className={s.cohort}>{e.cohort}</span>}
              <span className={s.when}>
                <span className="visually-hidden">
                  {faDigits(e.start[2])} {monthName(e.start[1])}،{' '}
                </span>
                {e.status === 'current' ? 'در جریان' : relativeDays(e.daysUntil)}
                {e.end && ` تا ${faDigits(e.end[2])} ${monthName(e.end[1])}`}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
