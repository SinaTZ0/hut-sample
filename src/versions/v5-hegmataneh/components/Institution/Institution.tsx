import type { Department, NewsItem, SocialLink, Stat } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { faDigits, faNumber, formatIsoDate } from '../../../../shared/utils/fa'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Institution.module.css'

interface InstitutionProps {
  name: string
  mission: string
  stats: Stat[]
  departments: Department[]
  departmentsHref: string
  aboutHref: string
  /** Campus-life item shown as the photograph. */
  spotlight: NewsItem
  channel?: SocialLink
}

/** First deep stratum: what the university is, in figures and in its eight groups. */
export function Institution({
  name,
  mission,
  stats,
  departments,
  departmentsHref,
  aboutHref,
  spotlight,
  channel,
}: InstitutionProps) {
  return (
    <section aria-labelledby="v5-institution" data-deep className={s.band}>
      <div className={s.inner}>
        <div className={s.copy}>
          <SectionHead id="v5-institution" title={name} lede={mission} deep more={{ label: 'درباره دانشگاه', href: aboutHref }} />

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
        </div>

        <figure className={s.media}>
          <a href={spotlight.href} className={s.photo}>
            {spotlight.image && <img src={spotlight.image} alt="" loading="lazy" />}
            <span className={s.overlay}>
              <span className={s.photoKicker}>زندگی در دانشگاه</span>
              <span className={s.photoTitle}>{spotlight.title}</span>
            </span>
          </a>
          <figcaption className={s.caption}>
            {spotlight.date && <span>اطلاعیه {formatIsoDate(spotlight.date)}</span>}
            {channel && (
              <ExternalLink href={channel.href} newTab className={s.channel}>
                ویدیوهای دانشگاه در {channel.label}
                <Icon name="external" size={14} />
              </ExternalLink>
            )}
          </figcaption>
        </figure>

        <div className={s.departments}>
          <h3 className={s.deptTitle}>
            <a href={departmentsHref}>{faDigits(departments.length)} گروه آموزشی</a>
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
