import type { IconName, Link, NewsItem } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Research.module.css'

interface ResearchProps {
  lead: NewsItem
  others: NewsItem[]
  units: (Link & { description: string; icon: IconName })[]
  moreHref: string
}

/** One sheet: the lead achievement, three smaller ones, and the research units on the tinted end. */
export function Research({ lead, others, units, moreHref }: ResearchProps) {
  return (
    <section aria-labelledby="v9-research">
      <SectionHead id="v9-research" title="پژوهش و دستاوردها" more={{ label: 'همه دستاوردها', href: moreHref }} />

      <div className={s.grid}>
        <Achievement item={lead} lead />
        <div className={s.others}>
          {others.map((a) => (
            <Achievement key={a.id} item={a} />
          ))}
        </div>

        <nav aria-labelledby="v9-units" className={s.units}>
          <h3 id="v9-units" className={s.unitsTitle}>
            واحدهای پژوهش و فناوری
          </h3>
          <ul role="list">
            {units.map((u) => (
              <li key={u.href}>
                <ExternalLink href={u.href} newTab className={s.unit}>
                  <Icon name={u.icon} size={22} className={s.unitIcon} />
                  <span>
                    <span className={s.unitName}>{u.label}</span>
                    <span className={s.unitDesc}>{u.description}</span>
                  </span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}

function Achievement({ item, lead }: { item: NewsItem; lead?: boolean }) {
  const title = item.href ? (
    <ExternalLink href={item.href} newTab>
      {item.title}
    </ExternalLink>
  ) : (
    item.title
  )
  return (
    <article className={lead ? `${s.item} ${s.lead}` : s.item}>
      {item.image && (
        <div className={s.media}>
          <img src={item.image} alt="" loading="lazy" />
        </div>
      )}
      <div className={s.body}>
        <h3 className={s.title}>{title}</h3>
        {item.summary && <p className={s.summary}>{item.summary}</p>}
      </div>
    </article>
  )
}
