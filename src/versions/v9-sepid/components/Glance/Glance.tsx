import type { Department, NewsItem, Stat } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { faDigits, faNumber, formatIsoDate } from '../../../../shared/utils/fa'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Glance.module.css'

interface GlanceProps {
  stats: Stat[]
  departments: Department[]
  departmentsHref: string
  spotlight: NewsItem
}

/** One sheet: six figures, the eight departments in a row of cells, and one campus event beside them. */
export function Glance({ stats, departments, departmentsHref, spotlight }: GlanceProps) {
  return (
    <section aria-labelledby="v9-glance">
      <SectionHead id="v9-glance" title="دانشگاه در یک نگاه" />

      <div className={s.grid}>
        <dl className={s.stats}>
          {stats.map((st) => (
            <div key={st.label} className={s.stat}>
              <dt>{st.label}</dt>
              <dd>
                {faNumber(st.value)}
                {st.suffix}
              </dd>
            </div>
          ))}
        </dl>

        <a href={spotlight.href} className={s.spotlight}>
          {spotlight.image && <img src={spotlight.image} alt="" loading="lazy" />}
          <span className={s.spotlightBody}>
            {spotlight.date && <span className={s.spotlightDate}>{formatIsoDate(spotlight.date)}</span>}
            <span className={s.spotlightTitle}>{spotlight.title}</span>
          </span>
        </a>

        <div className={s.departments}>
          <h3 className={s.deptTitle}>
            <a href={departmentsHref}>
              {faDigits(departments.length)} گروه آموزشی
              <Icon name="arrow" size={16} />
            </a>
          </h3>
          <ul role="list" className={s.deptList}>
            {departments.map((d) => (
              <li key={d.id}>
                <ExternalLink href={d.href} newTab className={s.dept}>
                  {d.short}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
