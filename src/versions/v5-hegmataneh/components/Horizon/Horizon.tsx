import type { JDate, Semester } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { faDigits, formatJalaliRange, monthName, relativeDays } from '../../../../shared/utils/fa'
import { daysBetween, jKey, jalaliWeekday } from '../../../../shared/utils/jalali'
import type { EventWithStatus } from '../../../../shared/utils/semester'
import s from './Horizon.module.css'

interface HorizonProps {
  today: JDate
  semester: Semester
  next?: EventWithStatus
  calendarHref: string
}

/** Where the term stands today: a week of the semester, or the reason there isn't one. */
function termWeek(semester: Semester, today: JDate) {
  const classes = semester.events.find((e) => e.kind === 'classes')
  const last = semester.events.at(-1)
  if (!classes || !last) return null

  const end = last.end ?? last.start
  const total = Math.max(1, Math.ceil(daysBetween(classes.start, end) / 7))
  if (jKey(today) > jKey(end)) return { label: 'نیم‌سال به پایان رسیده است' }
  if (jKey(today) < jKey(classes.start)) return { label: 'پیش از شروع کلاس‌ها' }

  const week = Math.min(total, Math.floor(daysBetween(classes.start, today) / 7) + 1)
  return { label: `هفته ${faDigits(week)} از ${faDigits(total)} نیم‌سال` }
}

/**
 * The horizon: one bar laid across the bottom edge of the photograph, where the sky of the page
 * meets its ground. It carries the only three things that change by the day — today, the week of
 * the term, and the next deadline.
 */
export function Horizon({ today, semester, next, calendarHref }: HorizonProps) {
  const [, month, day] = today
  const term = termWeek(semester, today)

  return (
    <section aria-labelledby="v5-horizon" className={s.wrap}>
      <h2 id="v5-horizon" className="visually-hidden">
        امروز در دانشگاه
      </h2>
      <div className={s.bar}>
        <p className={s.date}>
          <span className={s.day}>{faDigits(day)}</span>
          <span className={s.when}>
            <span className={s.month}>{faDigits(`${monthName(month)} ${today[0]}`)}</span>
            <span className={s.weekday}>{jalaliWeekday(today)}</span>
          </span>
        </p>

        {term && <p className={s.term}>{term.label}</p>}

        <p className={s.next}>
          {next ? (
            <>
              <span className={s.nextLabel}>{next.status === 'current' ? 'در جریان' : 'مهلت بعدی'}</span>
              <strong className={s.nextTitle}>{next.label}</strong>
              {next.cohort && <span className={s.cohort}>{next.cohort}</span>}
              <span className={s.nextWhen}>
                {formatJalaliRange(next.start, next.end)}
                {next.status !== 'current' && ` — ${relativeDays(next.daysUntil)}`}
              </span>
            </>
          ) : (
            <>
              <span className={s.nextLabel}>تقویم</span>
              <strong className={s.nextTitle}>{semester.title}</strong>
            </>
          )}
        </p>

        <a href={calendarHref} className={s.link}>
          تقویم آموزشی
          <Icon name="arrow" size={16} />
        </a>
      </div>
    </section>
  )
}
