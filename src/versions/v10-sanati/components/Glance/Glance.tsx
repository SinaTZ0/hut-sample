import type { Department, IconName, NewsItem, Stat } from '../../../../content'
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

/** The line icon beside each figure, as on the daily systems; any figure not listed gets the chart. */
const statIcon: Record<string, IconName> = {
  دانشجو: 'new-student',
  'دانشجوی ارشد': 'book',
  'عضو هیئت علمی': 'faculty',
  'مقاله علمی': 'journal',
  دانش‌آموخته: 'growth',
  کارمند: 'office',
}

/**
 * One white card in the same build as the daily systems: cells meet at hairlines, with six figures,
 * the eight departments under a navy strip, and one campus event. The composition never reflows; it
 * scales with the card's own width, so a phone shows the same picture as a desktop, only smaller.
 */
export function Glance({ stats, departments, departmentsHref, spotlight }: GlanceProps) {
  return (
    <section aria-labelledby="v10-glance">
      <SectionHead id="v10-glance" title="دانشگاه در یک نگاه" />

      <div className={s.frame}>
        <div className={s.card}>
          <dl className={s.stats}>
            {stats.map((st) => (
              <div key={st.label} className={s.stat}>
                <dt>{st.label}</dt>
                <dd>
                  {faNumber(st.value)}
                  {st.suffix}
                </dd>
                <Icon name={statIcon[st.label] ?? 'chart'} size={24} className={s.statIcon} />
              </div>
            ))}
          </dl>

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

          <a href={spotlight.href} className={s.spotlight}>
            {spotlight.image && <img src={spotlight.image} alt="" loading="lazy" />}
            <span className={s.spotlightBody}>
              {spotlight.date && <span className={s.spotlightDate}>{formatIsoDate(spotlight.date)}</span>}
              <span className={s.spotlightTitle}>{spotlight.title}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
