import type { Semester } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { faDigits, formatJalaliRange, monthName, relativeDays } from '../../../../shared/utils/fa'
import type { EventWithStatus, SemesterState } from '../../../../shared/utils/semester'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Term.module.css'

interface TermProps {
  semester: Semester
  state: SemesterState
  calendarHref: string
}

/** Day digits large, month small. A range inside one month reads "۲۴–۲۵". */
function dateParts({ start, end }: EventWithStatus) {
  const day = end ? `${start[2]}–${end[2]}` : `${start[2]}`
  const month = end && end[1] !== start[1] ? `${monthName(start[1])} تا ${monthName(end[1])}` : monthName(start[1])
  return { day: faDigits(day), month: faDigits(month) }
}

const STATUS_LABEL = { past: 'گذشته', current: 'در جریان', upcoming: '' } as const

/** The term as a measured strip with today on it, then its milestones as rows. */
export function Term({ semester, state, calendarHref }: TermProps) {
  const milestones = state.events.filter((e) => e.milestone)
  const nextId = state.nextMilestone?.id
  const progress = Math.round(state.progress * 100)

  return (
    <section id="v5-calendar" aria-labelledby="v5-term">
      <SectionHead
        id="v5-term"
        title="تقویم نیم‌سال"
        lede={semester.title}
        more={{ label: 'تقویم کامل آموزشی', href: calendarHref }}
      />

      <div className={s.rail}>
        <div className={s.track}>
          <span className={s.filled} style={{ inlineSize: `${progress}%` }} />
          <span className={s.marker} style={{ insetInlineStart: `${progress}%` }} aria-hidden="true" />
        </div>
        <p className={s.railText}>
          <span className={s.railToday}>امروز</span>
          <span className={s.railProgress}>{faDigits(progress)}٪ از نیم‌سال گذشته است</span>
        </p>
      </div>

      <ol role="list" className={s.rows}>
        {milestones.map((e) => {
          const { day, month } = dateParts(e)
          const isNext = e.id === nextId
          return (
            <li key={e.id} className={s.row} data-status={e.status} data-next={isNext || undefined}>
              <span className={s.date} aria-hidden="true">
                <span className={s.day}>{day}</span>
                <span className={s.month}>{month}</span>
              </span>
              <span className={s.body}>
                <span className={s.label}>{e.label}</span>
                {e.cohort && <span className={s.cohort}>{e.cohort}</span>}
                <span className="visually-hidden">، {formatJalaliRange(e.start, e.end, { year: true })}</span>
              </span>
              <span className={s.flag}>
                {e.status === 'upcoming' ? (isNext ? relativeDays(e.daysUntil) : '') : STATUS_LABEL[e.status]}
              </span>
            </li>
          )
        })}
      </ol>

      <p className={s.source}>
        <Icon name="calendar" size={16} />
        <ExternalLink href={semester.sourceHref} newTab>
          تقویم رسمی دانشگاه (تصویر و PDF)
        </ExternalLink>
      </p>
    </section>
  )
}
