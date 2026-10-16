import type { IconName, NewsItem } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Research.module.css'

interface ResearchProps {
  units: { label: string; href: string; description: string; icon: IconName }[]
  achievements: NewsItem[]
  achievementsHref: string
}

/** Public-lane prestige: research units as a typographic index, achievements as a short honours list. */
export function Research({ units, achievements, achievementsHref }: ResearchProps) {
  return (
    <div className={s.grid}>
      <section aria-labelledby="v1-research">
        <SectionHead id="v1-research" title="پژوهش و فناوری" />
        <ul role="list" className={s.units}>
          {units.map((u) => (
            <li key={u.href}>
              <a href={u.href} className={s.unit}>
                <Icon name={u.icon} size={28} className={s.unitIcon} />
                <span className={s.unitName}>{u.label}</span>
                <span className={s.unitDesc}>{u.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="v1-honours">
        <SectionHead id="v1-honours" title="افتخارات" more={{ label: 'همه', href: achievementsHref }} />
        <ul role="list" className={s.honours}>
          {achievements.map((a) => (
            <li key={a.id} className={s.honour}>
              {a.image && <img src={a.image} alt="" loading="lazy" className={s.thumb} />}
              <div>
                <h3 className={s.honourTitle}>{a.href ? <a href={a.href}>{a.title}</a> : a.title}</h3>
                {a.summary && <p className={s.honourSummary}>{a.summary}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
