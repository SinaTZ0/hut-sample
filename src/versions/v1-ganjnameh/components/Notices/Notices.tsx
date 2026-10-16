import type { NewsItem } from '../../../../content'
import { faDigits, formatIsoDate, formatJalaliRange } from '../../../../shared/utils/fa'
import type { SemesterState } from '../../../../shared/utils/semester'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Notices.module.css'

interface NoticesProps {
  featured: NewsItem
  announcements: NewsItem[]
  moreHref: string
  semesterTitle: string
  semesterCode: string
  calendarHref: string
  state: SemesterState
}

/** Time-sensitive band: announcements beside the semester calendar. */
export function Notices({ featured, announcements, moreHref, semesterTitle, semesterCode, calendarHref, state }: NoticesProps) {
  const milestones = state.events.filter((e) => e.milestone)
  return (
    <div className={s.grid}>
      <section aria-labelledby="v1-notices" className={s.notices}>
        <SectionHead id="v1-notices" title="اطلاعیه‌ها" more={{ label: 'همه اطلاعیه‌ها', href: moreHref }} />
        <article className={s.featured}>
          {featured.image && <img src={featured.image} alt="" className={s.featuredImg} loading="lazy" />}
          <div>
            <h3 className={s.featuredTitle}>
              <a href={featured.href}>{featured.title}</a>
            </h3>
            {featured.summary && <p className={s.summary}>{featured.summary}</p>}
          </div>
        </article>
        <ul role="list" className={s.list}>
          {announcements.map((a) => (
            <li key={a.id} className={s.row}>
              {a.date && <time dateTime={a.date}>{formatIsoDate(a.date, { year: false })}</time>}
              <a href={a.href}>{a.title}</a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="v1-calendar" className={s.calendar}>
        <SectionHead id="v1-calendar" title="تقویم آموزشی" more={{ label: 'تقویم کامل', href: calendarHref }} />
        <p className={s.term}>
          {semesterTitle} <span className={s.code}>(نیم‌سال {faDigits(semesterCode)})</span>
        </p>
        <ol role="list" className={s.timeline}>
          {milestones.map((e) => (
            <li key={e.id} className={s.event} data-status={e.status}>
              <span className={s.when}>{formatJalaliRange(e.start, e.end)}</span>
              <span className={s.what}>
                {e.label}
                {e.status === 'current' && <span className={s.now}>در جریان</span>}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
