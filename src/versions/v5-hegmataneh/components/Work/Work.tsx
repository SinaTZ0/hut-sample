import type { IconName, Link, NewsItem } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Work.module.css'

type Unit = Link & { description: string; icon: IconName }

interface WorkProps {
  units: Unit[]
  researchHref: string
  /** The achievement with a photograph leads. */
  lead: NewsItem
  others: NewsItem[]
  achievementsHref: string
}

/** Deep stratum: where the work is done, and what has come of it. */
export function Work({ units, researchHref, lead, others, achievementsHref }: WorkProps) {
  return (
    <>
      <section aria-labelledby="v5-research" className={s.block}>
        <SectionHead
          id="v5-research"
          title="پژوهش و فناوری"
          lede="مرکزها، آزمایشگاه‌ها و دفترهایی که کار پژوهشی دانشگاه از آن‌ها می‌گذرد."
          deep
          more={{ label: 'معاونت پژوهش و فناوری', href: researchHref }}
        />
        <ul role="list" className={s.units}>
          {units.map((u) => (
            <li key={u.href}>
              <ExternalLink href={u.href} newTab className={s.unit}>
                <Icon name={u.icon} size={24} className={s.unitIcon} />
                <span className={s.unitName}>{u.label}</span>
                <span className={s.unitDesc}>{u.description}</span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="v5-achievements" className={s.block}>
        <SectionHead
          id="v5-achievements"
          title="دستاوردها"
          lede="از نمایه‌شدن نشریه دانشگاه تا مدال دانشجویان؛ کارهایی که به نتیجه رسیده‌اند."
          deep
          more={{ label: 'همه دستاوردها', href: achievementsHref }}
        />
        <div className={s.achievements}>
          <article className={s.lead}>
            <a href={lead.href ?? achievementsHref} className={s.leadLink}>
              {lead.image && <img src={lead.image} alt="" loading="lazy" className={s.leadImage} />}
              <span className={s.leadBody}>
                <h3 className={s.leadTitle}>{lead.title}</h3>
                {lead.summary && <span className={s.leadSummary}>{lead.summary}</span>}
              </span>
            </a>
          </article>

          <ul role="list" className={s.others}>
            {others.map((a) => (
              <li key={a.id}>
                <a href={a.href ?? achievementsHref} className={s.other}>
                  <h3 className={s.otherTitle}>{a.title}</h3>
                  {a.summary && <span className={s.otherSummary}>{a.summary}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
