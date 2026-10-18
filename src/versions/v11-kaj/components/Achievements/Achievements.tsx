import type { IconName, Link, NewsItem } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Achievements.module.css'

interface AchievementsProps {
  lead: NewsItem
  others: NewsItem[]
  /** Short category line above each title, by item id. */
  tags: Record<string, string>
  /** Research and outreach units, listed under the cards. */
  units: (Link & { description: string; icon: IconName })[]
  /** The research portal, linked from the units' heading. */
  research: Link
  /** Fallback target for items without their own page. */
  moreHref: string
}

/** One tall card for the lead achievement, the rest as image-beside-text cards; the research units close the section. */
export function Achievements({ lead, others, tags, units, research, moreHref }: AchievementsProps) {
  return (
    <section aria-labelledby="v11-achievements">
      <SectionHead
        id="v11-achievements"
        kicker="ثمره تلاش جامعه دانشگاهی"
        title="دستاوردها و افتخارات"
        lede="از پیشرفت‌های علمی تا افتخارآفرینی دانشجویان؛ روایت تلاش‌هایی که به ثمر می‌رسند."
        more={{ label: 'دستاوردهای دانشگاه', href: moreHref }}
      />
      <div className={s.grid}>
        <Card item={lead} tag={tags[lead.id]} href={lead.href ?? moreHref} lead />
        <div className={s.stack}>
          {others.map((a) => (
            <Card key={a.id} item={a} tag={tags[a.id]} href={a.href ?? moreHref} />
          ))}
        </div>
      </div>

      <div className={s.units}>
        <div className={s.unitsIntro}>
          <h3 className={s.unitsTitle}>واحدهای پژوهش و فناوری</h3>
          <p className={s.unitsLede}>پژوهش دانشگاه از این واحدها به صنعت و جامعه می‌رسد؛ از نشریه و آزمایشگاه تا شرکت‌های دانش‌بنیان.</p>
          <a href={research.href} className={s.unitsMore}>
            {research.label}
            <Icon name="arrow" size={16} />
          </a>
        </div>
        <ul role="list" className={s.unitList}>
          {units.map((u) => (
            <li key={u.href}>
              <ExternalLink href={u.href} newTab className={s.unit}>
                <Icon name={u.icon} size={28} className={s.unitIcon} />
                <span className={s.unitName}>{u.label}</span>
                <Icon name="external" size={16} className={s.unitOut} />
                <span className={s.unitDesc}>{u.description}</span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Card({ item, tag, href, lead }: { item: NewsItem; tag?: string; href: string; lead?: boolean }) {
  return (
    <article className={lead ? `${s.card} ${s.lead}` : s.card}>
      {item.image && (
        <div className={s.media}>
          <img src={item.image} alt="" loading="lazy" />
          {lead && <span className={s.badge}>در کانون توجه</span>}
        </div>
      )}
      <div className={s.body}>
        {tag && <p className={s.tag}>{tag}</p>}
        <h3 className={s.title}>
          <a href={href}>{item.title}</a>
        </h3>
        {item.summary && <p className={s.summary}>{item.summary}</p>}
        <p className={s.more} aria-hidden="true">
          <span>بیشتر بخوانید</span>
          <span className={s.circle}>
            <Icon name="external" size={14} />
          </span>
        </p>
      </div>
    </article>
  )
}
