import type { CSSProperties } from 'react'
import type { Semester } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { faDigits, formatJalaliRange, monthName, relativeDays } from '../../../../shared/utils/fa'
import type { EventWithStatus, SemesterState } from '../../../../shared/utils/semester'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Term.module.css'

interface TermProps {
  semester: Semester
  state: SemesterState
  calendarHref: string
}

function dateParts({ start, end }: EventWithStatus) {
  const day = end ? `${start[2]}–${end[2]}` : `${start[2]}`
  const month = end && end[1] !== start[1] ? `${monthName(start[1])} تا ${monthName(end[1])}` : monthName(start[1])
  return { day: faDigits(day), month }
}

/**
 * The term on one sheet: a rounded track where each segment runs from one milestone to the next
 * at true scale, teal once passed and amber while under way, with a dark line for today.
 * Under it the same milestones as an even row of compartments, readable at any width.
 */
export function Term({ semester, state, calendarHref }: TermProps) {
  const milestones = state.events.filter((e) => e.milestone)
  const nextId = state.nextMilestone?.id
  const stripes = milestones.map((e, i) => {
    const end = milestones[i + 1]?.position ?? 1
    const status = state.progress >= end ? 'past' : state.progress >= e.position ? 'current' : 'upcoming'
    return { id: e.id, grow: Math.max(end - e.position, 0.012), status }
  })

  return (
    <section id="v9-calendar" aria-labelledby="v9-term">
      <SectionHead id="v9-term" title="تقویم آموزشی" more={{ label: 'تقویم کامل آموزشی', href: calendarHref }} />

      <div className={s.panel}>
        <p className={s.term}>{semester.title}</p>
        <div className={s.strip} aria-hidden="true">
          {stripes.map((st) => (
            <span key={st.id} className={s.stripe} data-status={st.status} style={{ flexGrow: st.grow }} />
          ))}
          <span className={s.today} style={{ '--at': state.progress } as CSSProperties}>
            <span className={s.todayLabel}>امروز</span>
          </span>
        </div>

        <ol role="list" className={s.stops}>
          {milestones.map((e) => {
            const { day, month } = dateParts(e)
            const isNext = e.id === nextId
            return (
              <li key={e.id} className={s.stop} data-status={e.status} data-next={isNext || undefined}>
                <span className={s.day}>{day}</span>
                <span className={s.month}>{month}</span>
                <span className={s.label}>{e.label}</span>
                <span className="visually-hidden">، {formatJalaliRange(e.start, e.end, { year: true })}</span>
                {e.status === 'current' && <span className={s.flag}>در جریان</span>}
                {isNext && e.status === 'upcoming' && <span className={s.flag}>{relativeDays(e.daysUntil)}</span>}
                {e.status === 'past' && <span className="visually-hidden">، گذشته</span>}
              </li>
            )
          })}
        </ol>

        <p className={s.source}>
          <ExternalLink href={semester.sourceHref} newTab>
            تقویم رسمی نیم‌سال (تصویر و PDF)
          </ExternalLink>
        </p>
      </div>
    </section>
  )
}
