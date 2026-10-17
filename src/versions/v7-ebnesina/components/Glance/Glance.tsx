import type { Department, NewsItem, SocialLink, Stat } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { faDigits, faNumber, formatIsoDate } from '../../../../shared/utils/fa'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Glance.module.css'

interface GlanceProps {
  name: string
  mission: string
  stats: Stat[]
  departments: Department[]
  departmentsHref: string
  /** Campus-life item shown as the photo card. */
  spotlight: NewsItem
  channel?: SocialLink
}

/** Pine band: mission, six figures and the eight departments beside one campus-life photo. */
export function Glance({ name, mission, stats, departments, departmentsHref, spotlight, channel }: GlanceProps) {
  return (
    <section aria-labelledby="v7-glance" className={s.band}>
      <span className={s.seal} aria-hidden="true" />
      <span className={s.contour} aria-hidden="true" />
      <div className={s.inner}>
        <div className={s.copy}>
          <SectionHead
            id="v7-glance"
            title={
              <>
                {name}
                <br />
                در یک نگاه
              </>
            }
            onBand
          />
          <p className={s.mission}>{mission}</p>

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
              <span className={s.kicker}>زندگی در دانشگاه</span>
              <span className={s.photoTitle}>{spotlight.title}</span>
            </span>
          </a>
          <figcaption className={s.caption}>
            <span>
              {spotlight.date && <>اطلاعیه {formatIsoDate(spotlight.date)} · </>}
              {name}
            </span>
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
