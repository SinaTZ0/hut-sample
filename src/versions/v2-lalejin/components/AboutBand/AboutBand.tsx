import type { Department, IconName, Stat } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { faNumber } from '../../../../shared/utils/fa'
import s from './AboutBand.module.css'

interface AboutBandProps {
  name: string
  mission: string
  image: string
  imageAlt: string
  departments: Department[]
  stats: Stat[]
  research: { label: string; href: string; description: string; icon: IconName }[]
  aboutHref: string
}

/** The public face, kept below the student tools: identity, departments, figures and research units. */
export function AboutBand({ name, mission, image, imageAlt, departments, stats, research, aboutHref }: AboutBandProps) {
  return (
    <section aria-labelledby="v2-about" className={s.band} id="about">
      <div className={s.inner}>
        <div className={s.identity}>
          <h2 id="v2-about" className={s.title}>
            درباره {name}
          </h2>
          <p className={s.mission}>{mission}</p>
          <a href={aboutHref} className={s.aboutLink}>
            معرفی کامل دانشگاه
          </a>

          <h3 className={s.subhead}>گروه‌های آموزشی</h3>
          <ul role="list" className={s.chips}>
            {departments.map((d) => (
              <li key={d.id}>
                <a href={d.href}>{d.short}</a>
              </li>
            ))}
          </ul>
        </div>

        <figure className={s.figure}>
          <img src={image} alt={imageAlt} loading="lazy" />
        </figure>

        <dl className={s.stats}>
          {stats.slice(0, 4).map((st) => (
            <div key={st.label} className={s.stat}>
              <dt>{st.label}</dt>
              <dd>
                {faNumber(st.value)}
                {st.suffix}
              </dd>
            </div>
          ))}
        </dl>

        <ul role="list" className={s.research}>
          {research.slice(0, 4).map((r) => (
            <li key={r.href}>
              <a href={r.href} className={s.unit}>
                <Icon name={r.icon} size={26} />
                <span>
                  <span className={s.unitName}>{r.label}</span>
                  <span className={s.unitDesc}>{r.description}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
