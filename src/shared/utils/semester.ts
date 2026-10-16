import type { CalendarEvent, JDate, Semester } from '../../content/types'
import { daysBetween, jKey } from './jalali'

export type EventStatus = 'past' | 'current' | 'upcoming'

export interface EventWithStatus extends CalendarEvent {
  status: EventStatus
  /** Days from today to the event start (negative = in the past). */
  daysUntil: number
  /** Position of the event start on the semester span, 0–1. */
  position: number
  /** Position of the event end, 0–1 (same as position for one-day events). */
  positionEnd: number
}

export interface SemesterState {
  today: JDate
  /** Today's position across the semester span, clamped to 0–1. */
  progress: number
  events: EventWithStatus[]
  current: EventWithStatus[]
  upcoming: EventWithStatus[]
  /** Next milestone that has not ended yet (current or upcoming). */
  nextMilestone?: EventWithStatus
  /** Next event of any kind that has not ended yet. */
  next?: EventWithStatus
  totalDays: number
}

const statusOf = (e: CalendarEvent, today: JDate): EventStatus => {
  const t = jKey(today)
  const s = jKey(e.start)
  const end = jKey(e.end ?? e.start)
  if (t < s) return 'upcoming'
  if (t > end) return 'past'
  return 'current'
}

export function semesterState(semester: Semester, today: JDate): SemesterState {
  const first = semester.events[0].start
  const lastEvent = semester.events.at(-1)!
  const last = lastEvent.end ?? lastEvent.start
  const totalDays = Math.max(1, daysBetween(first, last))
  const pos = (j: JDate) => Math.min(1, Math.max(0, daysBetween(first, j) / totalDays))

  const events = semester.events.map<EventWithStatus>((e) => ({
    ...e,
    status: statusOf(e, today),
    daysUntil: daysBetween(today, e.start),
    position: pos(e.start),
    positionEnd: pos(e.end ?? e.start),
  }))

  const notEnded = events.filter((e) => e.status !== 'past')
  return {
    today,
    progress: pos(today),
    events,
    current: events.filter((e) => e.status === 'current'),
    upcoming: events.filter((e) => e.status === 'upcoming'),
    nextMilestone: notEnded.find((e) => e.milestone),
    next: notEnded[0],
    totalDays,
  }
}
