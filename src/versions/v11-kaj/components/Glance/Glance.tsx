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

/** Pine band: mission and six hairline figures beside a campus-life photo with a play link to the video channel; departments below. */
export function Glance({ name, mission, stats, departments, departmentsHref, spotlight, channel }: GlanceProps) {
  return (
    <section aria-labelledby="v11-glance" className={s.band}>
      <div className={s.inner}>
        <div className={s.copy}>
          <SectionHead
            id="v11-glance"
            kicker="جامعه‌ای برای یادگیری و ساختن"
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
          <div className={s.frame}>
            {channel && (
              <ExternalLink href={channel.href} newTab className={s.play}>
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
                </svg>
                <span className="visually-hidden">ویدیوهای دانشگاه در {channel.label}</span>
              </ExternalLink>
            )}
            <a href={spotlight.href} className={s.photo}>
              {spotlight.image && <img src={spotlight.image} alt="" loading="lazy" />}
              <span className={s.overlay}>
                <span className={s.kicker}>زندگی در دانشگاه</span>
                <span className={s.photoTitle}>{spotlight.title}</span>
              </span>
            </a>
          </div>
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
          <div className={s.deptHead}>
            <h3 className={s.deptTitle}>{faDigits(departments.length)} گروه آموزشی</h3>
            <a href={departmentsHref} className={s.deptAll}>
              همه گروه‌ها
              <Icon name="arrow" size={16} />
            </a>
          </div>
          <ul role="list" className={s.deptList}>
            {departments.map((d) => (
              <li key={d.id}>
                <ExternalLink href={d.href} newTab className={s.dept}>
                  <span className={s.deptName}>{d.short}</span>
                  <span className={s.deptFull}>{d.title}</span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
