import type { Semester as SemesterData } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { faDigits, formatJalaliRange, monthName, relativeDays } from '../../../../shared/utils/fa'
import type { EventWithStatus, SemesterState } from '../../../../shared/utils/semester'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Semester.module.css'

interface SemesterProps {
  semester: SemesterData
  state: SemesterState
  calendarHref: string
}

/** Day digits large, month small. Ranges inside one month read "۲۶–۲۹"; across months the month line names both. */
function dateParts({ start, end }: EventWithStatus) {
  const day = end ? `${start[2]}–${end[2]}` : `${start[2]}`
  const month = end && end[1] !== start[1] ? `${monthName(start[1])} تا ${monthName(end[1])}` : `${monthName(start[1])} ${start[0]}`
  return { day: faDigits(day), month: faDigits(month) }
}

/** The term's headline milestones on one evenly spaced line; done ones fill in, the next one is flagged. */
export function Semester({ semester, state, calendarHref }: SemesterProps) {
  const milestones = state.events.filter((e) => e.milestone)
  const nextId = state.nextMilestone?.id

  return (
    <section id="v7-calendar" aria-labelledby="v7-term">
      <SectionHead
        id="v7-term"
        title="تقویم آموزشی دانشگاه"
        lede="زمان‌بندی انتخاب واحد، کلاس‌ها و امتحانات"
        more={{ label: 'تقویم کامل آموزشی', href: calendarHref }}
      />

      <div className={s.card}>
        <div className={s.cardHead}>
          <p className={s.term}>
            <Icon name="calendar" size={18} />
            {semester.title}
          </p>
          <ExternalLink href={semester.sourceHref} newTab className={s.source}>
            تقویم رسمی (تصویر و PDF)
          </ExternalLink>
        </div>

        <ol role="list" className={s.line}>
          {milestones.map((e, i) => {
            const { day, month } = dateParts(e)
            const isNext = e.id === nextId
            const after = milestones[i + 1]
            return (
              <li
                key={e.id}
                className={s.stop}
                data-status={e.status}
                data-next={isNext || undefined}
                data-link={after ? (after.status === 'upcoming' ? 'todo' : 'done') : undefined}
              >
                <span className={s.day} aria-hidden="true">
                  {day}
                </span>
                <span className={s.month} aria-hidden="true">
                  {month}
                </span>
                <span className={s.track} aria-hidden="true">
                  <span className={s.dot} />
                </span>
                <span className={s.label}>{e.label}</span>
                <span className="visually-hidden">
                  ، {formatJalaliRange(e.start, e.end, { year: true })}
                  {e.status === 'past' && '، گذشته'}
                </span>
                {(isNext || e.status === 'current') && (
                  <span className={s.flag}>{e.status === 'current' ? 'در جریان' : relativeDays(e.daysUntil)}</span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
