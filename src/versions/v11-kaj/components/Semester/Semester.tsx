import type { CSSProperties } from 'react'
import type { Semester as SemesterData } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { faDigits, faNumber, formatJalaliRange, monthName, relativeDays } from '../../../../shared/utils/fa'
import { daysBetween } from '../../../../shared/utils/jalali'
import type { EventWithStatus, SemesterState } from '../../../../shared/utils/semester'
import { SectionHead } from '../SectionHead/SectionHead'

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

      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-be border-line p-4.5 md:px-8 md:pt-5.5 md:pb-5">
          <p className="flex items-center gap-2 font-bold text-heading">
            <Icon name="calendar" size={18} className="text-link" />
            {semester.title}
          </p>
          <ExternalLink href={semester.sourceHref} newTab className="rounded-full bg-chip px-3.5 py-1 text-step--2 font-semibold no-underline hover:underline">
            تقویم رسمی (تصویر و PDF)
          </ExternalLink>
        </div>

        <div className="relative mx-4.5 mt-13 mb-8 md:mx-8" aria-hidden="true">
          <div className="relative h-3.5 rounded-[4px] bg-line [--cell:calc(700%/var(--days))] [--gap:2px] [mask-image:repeating-linear-gradient(to_left,#000_0_calc(var(--cell)_-_var(--gap)),transparent_calc(var(--cell)_-_var(--gap))_var(--cell))] md:[--cell:calc(100%/var(--days))]" style={{ '--days': state.totalDays } as CSSProperties}>
            {segments.map((sg) => (
              <span
                key={sg.id}
                className="absolute inset-y-0 start-[calc(var(--from)*100%)] w-[calc((var(--to)_-_var(--from))*100%)] data-[status=current]:bg-accent data-[status=past]:bg-link"
                data-status={sg.status}
                style={{ '--from': sg.from, '--to': sg.to } as CSSProperties}
              />
            ))}
          </div>
          <span className="absolute -inset-y-2 start-[calc(var(--at)*100%)] w-[3px] translate-x-1/2 rounded-xs bg-heading" style={{ '--at': state.progress } as CSSProperties}>
            <span className="absolute start-1/2 bottom-[calc(100%+4px)] translate-x-1/2 rounded-full bg-heading px-2.5 py-px text-step--2 font-semibold whitespace-nowrap text-surface">امروز</span>
          </span>
        </div>

        <ol role="list" className="flex flex-wrap gap-px border-t border-line bg-line">
          {milestones.map((e) => {
            const { day, month } = dateParts(e)
            const isNext = e.id === nextId
            return (
              <li
                key={e.id}
                className="group/stop relative flex flex-[1_1_40%] cursor-default flex-col bg-surface px-5 pt-4.5 pb-5.5 transition-colors duration-150 focus-visible:-outline-offset-2 data-next:bg-accent-wash data-[status=current]:bg-accent-wash [&:not([data-next],[data-status=current]):is(:hover,:focus-visible)]:bg-chip md:flex-[1_1_136px]"
                data-status={e.status}
                data-next={isNext || undefined}
                tabIndex={0}
                aria-describedby={`v11-tip-${e.id}`}
              >
                <span id={`v11-tip-${e.id}`} role="tooltip" className="pointer-events-none absolute start-3.5 bottom-[calc(100%-6px)] z-1 translate-y-1 rounded-sm bg-heading px-3 py-1 text-step--2 font-[650] whitespace-nowrap text-surface opacity-0 shadow-card transition-[opacity,translate] duration-150 group-hover/stop:translate-y-0 group-hover/stop:opacity-100 group-focus/stop:translate-y-0 group-focus/stop:opacity-100 after:absolute after:start-3.5 after:top-full after:border-[5px] after:border-transparent after:border-t-heading">
                  {distance(e, state.today)}
                </span>
                <span className="text-step-3 leading-[1.25] font-extrabold text-heading group-data-[status=past]/stop:text-link" aria-hidden="true">
                  {day}
                </span>
                <span className="text-step--2 whitespace-nowrap text-text-muted" aria-hidden="true">
                  {month}
                </span>
                <span className="mt-1.5 text-step--1 leading-[1.6] font-bold text-text group-data-[status=past]/stop:text-text-muted">{e.label}</span>
                <span className="visually-hidden">
                  ، {formatJalaliRange(e.start, e.end, { year: true })}
                  {e.status === 'past' && '، گذشته'}
                </span>
                {(isNext || e.status === 'current') && (
                  <span className="mt-2.5 self-start rounded-full bg-accent px-2.5 py-0.5 text-step--2 font-bold whitespace-nowrap text-on-accent">{e.status === 'current' ? 'در جریان' : relativeDays(e.daysUntil)}</span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
