import { useId } from 'react'
import type { Service } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { useServiceSearch } from '../../../../shared/hooks/useServiceSearch'
import { faNumber, formatJalaliRange, relativeDays } from '../../../../shared/utils/fa'
import type { EventWithStatus } from '../../../../shared/utils/semester'
import s from './ServiceDesk.module.css'

interface ServiceDeskProps {
  /** Everything searchable, student and staff systems alike. */
  all: Service[]
  /** What is shown before anyone types. */
  top: Service[]
  allHref: string
  calendarHref: string
  semesterTitle: string
  next?: EventWithStatus
}

/**
 * «میز خدمت» — the one object that breaks the grid: a granite slab straddling the
 * bottom edge of the hero. It carries the three things a visitor actually came for:
 * a way to find any system by name, the daily ones already laid out, and the next deadline.
 */
export function ServiceDesk({ all, top, allHref, calendarHref, semesterTitle, next }: ServiceDeskProps) {
  const { query, setQuery, results, isFiltering } = useServiceSearch(all)
  const inputId = useId()
  const shown = isFiltering ? results.slice(0, 8) : top

  return (
    <section id="v7-services" aria-labelledby="v7-services-title" className={s.wrap}>
      <div className={s.desk}>
        <div className={s.search}>
          <h2 id="v7-services-title" className={s.deskTitle}>
            میز خدمت
          </h2>
          <div className={s.field}>
            <Icon name="search" size={18} className={s.searchIcon} />
            <input
              id={inputId}
              type="search"
              className={s.input}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="نام سامانه یا کاری که دارید"
              aria-label="جست‌وجو در سامانه‌های دانشگاه"
            />
          </div>
          <a href={allHref} className={s.all}>
            همه سامانه‌ها
            <Icon name="arrow" size={15} />
          </a>
        </div>

        <p className={s.status} role="status">
          {isFiltering
            ? results.length
              ? `${faNumber(results.length)} سامانه پیدا شد`
              : 'سامانه‌ای با این نام پیدا نشد'
            : ''}
        </p>

        {shown.length > 0 && (
          <ul role="list" className={s.grid}>
            {shown.map((sv) => (
              <li key={sv.id}>
                <ExternalLink href={sv.href} newTab className={s.item}>
                  <Icon name={sv.icon} size={22} className={s.itemIcon} />
                  <span className={s.itemTitle}>{isFiltering ? sv.title : sv.short}</span>
                  <span className={s.itemDesc}>{sv.description}</span>
                  {sv.internalOnly && <span className={s.internal}>فقط از شبکه دانشگاه</span>}
                </ExternalLink>
              </li>
            ))}
          </ul>
        )}

        <p className={s.deadline}>
          <Icon name="calendar" size={18} className={s.deadlineIcon} />
          {next ? (
            <>
              <span className={s.deadlineLabel}>مهلت بعدی</span>
              <strong className={s.deadlineName}>{next.label}</strong>
              {next.cohort && <span className={s.cohort}>({next.cohort})</span>}
              <span className={s.when}>
                {formatJalaliRange(next.start, next.end)}
                {' · '}
                <span className={s.days}>{next.status === 'current' ? 'در جریان' : relativeDays(next.daysUntil)}</span>
              </span>
            </>
          ) : (
            <strong className={s.deadlineName}>تقویم آموزشی {semesterTitle}</strong>
          )}
          <a href={calendarHref} className={s.calendarLink}>
            تقویم آموزشی
            <Icon name="arrow" size={15} />
          </a>
        </p>
      </div>
    </section>
  )
}
