import type { JDate, Semester } from '../../../../content'
import { faDigits, formatJalali, formatJalaliRange, monthName, relativeDays } from '../../../../shared/utils/fa'
import { daysBetween } from '../../../../shared/utils/jalali'
import type { EventWithStatus, SemesterState } from '../../../../shared/utils/semester'
import s from './SemesterTimeline.module.css'

interface SemesterTimelineProps {
  semester: Semester
  state: SemesterState
}

const pct = (n: number) => `${(n * 100).toFixed(2)}%`

const STATUS_TEXT = { past: 'گذشت', current: 'در جریان' } as const
const statusText = (e: EventWithStatus) => (e.status === 'upcoming' ? relativeDays(e.daysUntil) : STATUS_TEXT[e.status])

/** First day of each month that falls inside the semester span, with its position on the track. */
function monthTicks(state: SemesterState) {
  const first = state.events[0].start
  const ticks: { m: number; pos: number }[] = []
  let [y, m] = first
  for (let i = 0; i < 12; i++) {
    m += 1
    if (m > 12) {
      m = 1
      y += 1
    }
    const d: JDate = [y, m, 1]
    const pos = daysBetween(first, d) / state.totalDays
    if (pos > 1) break
    ticks.push({ m, pos })
  }
  return ticks
}

/**
 * Hero of V3. The track is drawn to scale (one semester = full width, time runs right-to-left),
 * so the gaps between milestones are real. Milestones are numbered because they are a sequence.
 */
export function SemesterTimeline({ semester, state }: SemesterTimelineProps) {
  const milestones = state.events.filter((e) => e.milestone)
  const minor = state.events.filter((e) => !e.milestone)
  const inTerm = state.progress > 0 && state.progress < 1

  return (
    <section aria-labelledby="v3-term" className={s.wrap}>
      <h1 id="v3-term" className={s.title}>
        <span className={s.titleThin}>{semester.title}</span>
        <span className={s.titleCode}>نیم‌سال {faDigits(semester.code)}</span>
      </h1>

      <div className={s.trackArea} aria-hidden="true">
        <div className={s.track}>
          <span className={s.elapsed} style={{ inlineSize: pct(state.progress) }} />
          {milestones
            .filter((e) => e.end)
            .map((e) => (
              <span
                key={`r-${e.id}`}
                className={s.range}
                data-status={e.status}
                style={{ insetInlineStart: pct(e.position), inlineSize: pct(e.positionEnd - e.position) }}
              />
            ))}
          {minor.map((e) => (
            <span key={e.id} className={s.tick} data-status={e.status} style={{ insetInlineStart: pct(e.position) }} />
          ))}
          {milestones.map((e, i) => (
            <span
              key={e.id}
              className={s.marker}
              data-status={e.status}
              data-lift={i % 2 === 1 || undefined}
              style={{ insetInlineStart: pct(e.position) }}
            >
              {faDigits(i + 1)}
            </span>
          ))}
          {inTerm && (
            <span className={s.today} style={{ insetInlineStart: pct(state.progress) }}>
              <span className={s.todayLabel}>امروز، {formatJalali(state.today)}</span>
            </span>
          )}
        </div>
        <div className={s.months}>
          {monthTicks(state).map((t) => (
            <span key={t.m} style={{ insetInlineStart: pct(t.pos) }}>
              {monthName(t.m)}
            </span>
          ))}
        </div>
      </div>

      <ol role="list" className={s.legend}>
        {milestones.map((e, i) => (
          <li key={e.id} className={s.item} data-status={e.status}>
            <span className={s.num} aria-hidden="true">
              {faDigits(i + 1)}
            </span>
            <span className={s.itemLabel}>{e.label}</span>
            <span className={s.itemDate}>{formatJalaliRange(e.start, e.end)}</span>
            <span className={s.itemStatus}>{statusText(e)}</span>
          </li>
        ))}
      </ol>

      <details className={s.all}>
        <summary>همه {faDigits(state.events.length)} تاریخ ترم، به تفکیک ورودی</summary>
        <table className={s.table}>
          <thead>
            <tr>
              <th scope="col">رویداد</th>
              <th scope="col">ورودی</th>
              <th scope="col">تاریخ</th>
              <th scope="col">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {state.events.map((e) => (
              <tr key={e.id} data-status={e.status}>
                <th scope="row">{e.label}</th>
                <td>{e.cohort ?? 'همه'}</td>
                <td>{formatJalaliRange(e.start, e.end)}</td>
                <td>{statusText(e)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul role="list" className={s.notes}>
          {semester.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <a href={semester.sourceHref}>تقویم رسمی (PDF) در وب‌سایت دانشگاه</a>
      </details>
    </section>
  )
}
