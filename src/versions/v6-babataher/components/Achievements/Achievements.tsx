import type { NewsItem } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Achievements.module.css'

interface AchievementsProps {
  lead: NewsItem
  others: NewsItem[]
  /** Fallback target for items without their own page. */
  moreHref: string
}

/** One tall card for the lead achievement, the rest as image-beside-text cards. */
export function Achievements({ lead, others, moreHref }: AchievementsProps) {
  return (
    <section aria-labelledby="v6-achievements">
      <SectionHead
        id="v6-achievements"
        title="دستاوردها و افتخارات"
        lede="از پیشرفت‌های علمی تا افتخارآفرینی دانشجویان؛ روایت تلاش‌هایی که به ثمر می‌رسند."
        more={{ label: 'دستاوردهای دانشگاه', href: moreHref }}
      />
      <div className={s.grid}>
        <Card item={lead} href={lead.href ?? moreHref} lead />
        <div className={s.stack}>
          {others.map((a) => (
            <Card key={a.id} item={a} href={a.href ?? moreHref} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Card({ item, href, lead }: { item: NewsItem; href: string; lead?: boolean }) {
  return (
    <article className={lead ? `${s.card} ${s.lead}` : s.card}>
      {item.image && (
        <div className={s.media}>
          <img src={item.image} alt="" loading="lazy" />
        </div>
      )}
      <div className={s.body}>
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
