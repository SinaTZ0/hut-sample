import type { JDate, Service } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { faDigits, faNumber, formatJalaliRange, monthName, relativeDays } from '../../../../shared/utils/fa'
import { jalaliWeekday } from '../../../../shared/utils/jalali'
import type { EventWithStatus } from '../../../../shared/utils/semester'
import s from './NowRail.module.css'

interface NowRailProps {
  today: JDate
  /** Teaching week, if classes are in session. */
  week?: { current: number; total: number }
  next?: EventWithStatus
  services: Service[]
  allServicesHref: string
  staffServicesHref: string
}

/** Sticky "now" column: today's date, where we are in the term, the next deadline, and the daily systems. */
export function NowRail({ today, week, next, services, allServicesHref, staffServicesHref }: NowRailProps) {
  const urgent = next && next.status === 'upcoming' && next.daysUntil <= 7
  return (
    <aside className={s.rail} aria-label="امروز در دانشگاه">
      <section className={s.today} aria-labelledby="v3-today">
        <h2 id="v3-today" className="visually-hidden">
          امروز
        </h2>
        <p className={s.weekday}>{jalaliWeekday(today)}</p>
        <p className={s.day}>{faDigits(today[2])}</p>
        <p className={s.month}>
          {monthName(today[1])} {faDigits(today[0])}
        </p>
        {week && (
          <p className={s.week}>
            هفته {faNumber(week.current)} از {faNumber(week.total)} ترم
            <span className={s.weekBar} aria-hidden="true">
              <span style={{ inlineSize: `${(week.current / week.total) * 100}%` }} />
            </span>
          </p>
        )}
      </section>

      {next && (
        <section className={s.next} data-urgent={urgent || undefined} aria-labelledby="v3-next">
          <h2 id="v3-next" className={s.label}>
            {next.status === 'current' ? 'در جریان' : 'مهلت بعدی'}
          </h2>
          <p className={s.nextTitle}>{next.label}</p>
          {next.cohort && <p className={s.cohort}>{next.cohort}</p>}
          <p className={s.nextWhen}>
            {formatJalaliRange(next.start, next.end)}
            {next.status === 'upcoming' && <strong> ({relativeDays(next.daysUntil)})</strong>}
          </p>
        </section>
      )}

      <section className={s.services} aria-labelledby="v3-quick" id="v3-services">
        <h2 id="v3-quick" className={s.label}>
          سامانه‌های پرکاربرد
        </h2>
        <ul role="list">
          {services.map((svc) => (
            <li key={svc.id}>
              <a href={svc.href} className={s.service} target="_blank" rel="noopener noreferrer">
                <Icon name={svc.icon} size={20} />
                <span className={s.serviceName}>{svc.short}</span>
                <Icon name="external" size={14} className={s.out} />
                <span className="visually-hidden"> (در زبانه جدید)</span>
              </a>
            </li>
          ))}
        </ul>
        <a href={allServicesHref} className={s.more}>
          همه سامانه‌های دانشجویی
        </a>
        <a href={staffServicesHref} className={s.more}>
          سامانه‌های کارکنان و اساتید
        </a>
      </section>
    </aside>
  )
}
