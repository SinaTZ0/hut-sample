import type { Department, IconName, NewsItem, Stat } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { faNumber } from '../../../../shared/utils/fa'
import s from './Institution.module.css'

interface InstitutionProps {
  name: string
  nameEn: string
  mission: string
  image: string
  imageAlt: string
  departments: Department[]
  stats: Stat[]
  research: { label: string; href: string; description: string; icon: IconName }[]
  achievements: NewsItem[]
}

/** The public lane: who the university is, what it teaches and researches. */
export function Institution({
  name,
  nameEn,
  mission,
  image,
  imageAlt,
  departments,
  stats,
  research,
  achievements,
}: InstitutionProps) {
  return (
    <section aria-labelledby="v3-about" className={s.wrap} id="about">
      <figure className={s.figure}>
        <img src={image} alt={imageAlt} loading="lazy" />
      </figure>

      <div className={s.intro}>
        <h2 id="v3-about" className={s.title}>
          {name}
        </h2>
        <p className={s.en} lang="en" dir="ltr">
          {nameEn}
        </p>
        <p className={s.mission}>{mission}</p>
      </div>

      <dl className={s.stats}>
        {stats.map((st) => (
          <div key={st.label}>
            <dt>{st.label}</dt>
            <dd>
              {faNumber(st.value)}
              <span aria-hidden="true">{st.suffix}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className={s.columns}>
        <section aria-labelledby="v3-depts">
          <h3 id="v3-depts" className={s.subhead}>
            گروه‌های آموزشی
          </h3>
          <ul role="list" className={s.depts}>
            {departments.map((d) => (
              <li key={d.id}>
                <a href={d.href}>{d.title}</a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="v3-research">
          <h3 id="v3-research" className={s.subhead}>
            پژوهش و فناوری
          </h3>
          <ul role="list" className={s.units}>
            {research.map((r) => (
              <li key={r.href}>
                <a href={r.href}>
                  <Icon name={r.icon} size={20} />
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="v3-honours">
          <h3 id="v3-honours" className={s.subhead}>
            افتخارات اخیر
          </h3>
          <ul role="list" className={s.honours}>
            {achievements.map((a) => (
              <li key={a.id}>{a.href ? <a href={a.href}>{a.title}</a> : a.title}</li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}
