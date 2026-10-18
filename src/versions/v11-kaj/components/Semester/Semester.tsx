import type { CSSProperties } from 'react'
import type { Semester as SemesterData } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { faDigits, faNumber, formatJalaliRange, monthName, relativeDays } from '../../../../shared/utils/fa'
import { daysBetween } from '../../../../shared/utils/jalali'
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

/** The tip on a milestone: how far away it starts, how long it still runs, or how long ago it ended. */
function distance(e: EventWithStatus, today: SemesterState['today']) {
  const ranged = Boolean(e.end)
  if (e.status === 'upcoming') {
    if (!ranged) return relativeDays(e.daysUntil)
    return e.daysUntil === 1 ? 'فردا شروع می‌شود' : `${faNumber(e.daysUntil)} روز تا شروع`
  }
  const toEnd = daysBetween(today, e.end ?? e.start)
  if (e.status === 'past') {
    if (!ranged) return relativeDays(toEnd)
    return toEnd === -1 ? 'دیروز تمام شد' : `${faNumber(-toEnd)} روز پیش تمام شد`
  }
  if (toEnd === 0) return 'در جریان · روز آخر'
  return toEnd === 1 ? 'در جریان · فردا تمام می‌شود' : `در جریان · ${faNumber(toEnd)} روز تا پایان`
}

/**
 * The term on one card: a thin track at true scale, cut into one cell per day, pine once passed and
 * gold while under way, with a line for today. Under it the same milestones as large cells.
 */
export function Semester({ semester, state, calendarHref }: SemesterProps) {
  const milestones = state.events.filter((e) => e.milestone)
  const nextId = state.nextMilestone?.id
  const segments = milestones.map((e, i) => {
    const end = milestones[i + 1]?.position ?? 1
    const status = state.progress >= end ? 'past' : state.progress >= e.position ? 'current' : 'upcoming'
    return { id: e.id, from: e.position, to: end, status }
  })

  return (
    <section id="v11-calendar" aria-labelledby="v11-term">
      <SectionHead
        id="v11-term"
        kicker="مسیر نیم‌سال"
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

        <div className={s.strip} aria-hidden="true">
          <div className={s.bar} style={{ '--days': state.totalDays } as CSSProperties}>
            {segments.map((sg) => (
              <span
                key={sg.id}
                className={s.segment}
                data-status={sg.status}
                style={{ '--from': sg.from, '--to': sg.to } as CSSProperties}
              />
            ))}
          </div>
          <span className={s.today} style={{ '--at': state.progress } as CSSProperties}>
            <span className={s.todayLabel}>امروز</span>
          </span>
        </div>

        <ol role="list" className={s.stops}>
          {milestones.map((e) => {
            const { day, month } = dateParts(e)
            const isNext = e.id === nextId
            return (
              <li
                key={e.id}
                className={s.stop}
                data-status={e.status}
                data-next={isNext || undefined}
                tabIndex={0}
                aria-describedby={`v11-tip-${e.id}`}
              >
                <span id={`v11-tip-${e.id}`} role="tooltip" className={s.tip}>
                  {distance(e, state.today)}
                </span>
                <span className={s.day} aria-hidden="true">
                  {day}
                </span>
                <span className={s.month} aria-hidden="true">
                  {month}
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
