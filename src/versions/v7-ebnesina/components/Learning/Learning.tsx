import type { IconName, Link, NewsItem, NewsTab } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import s from './Learning.module.css'

interface LearningProps {
  items: NewsItem[]
  categories: NewsTab[]
  units: (Link & { description: string; icon: IconName })[]
  coursesHref: string
}

/** Pine panel introducing research and outreach units; events and short courses listed beside it. */
export function Learning({ items, categories, units, coursesHref }: LearningProps) {
  const category = (n: NewsItem) => categories.find((c) => c.id === n.category)

  return (
    <section aria-labelledby="v7-learning" className={s.layout}>
      <div className={s.panel}>
        <span className={s.badge}>
          <Icon name="book" size={24} />
        </span>
        <h2 id="v7-learning" className={s.title}>
          رویدادها و
          <br />
          دوره‌های آموزشی
        </h2>
        <p className={s.lede}>از کلاس درس تا محیط کار؛ دوره‌های مهارتی و تخصصی در همراهی دانشگاه و صنعت.</p>

        <ul role="list" className={s.units}>
          {units.map((u) => (
            <li key={u.href}>
              <ExternalLink href={u.href} newTab className={s.unit}>
                <Icon name={u.icon} size={20} />
                <span>
                  <span className={s.unitName}>{u.label}</span>
                  <span className={s.unitDesc}>{u.description}</span>
                </span>
              </ExternalLink>
            </li>
          ))}
        </ul>

        <a href={coursesHref} className={s.panelMore}>
          همه دوره‌های آموزش آزاد
          <Icon name="arrow" size={18} />
        </a>
      </div>

      <ul role="list" className={s.list}>
        {items.map((n) => {
          const cat = category(n)
          return (
            <li key={n.id} className={s.item}>
              <div className={s.thumb}>
                {n.image ? <img src={n.image} alt="" loading="lazy" /> : <Icon name="open-ed" size={32} />}
              </div>
              <div className={s.body}>
                {cat && <span className={s.tag}>{cat.title}</span>}
                <h3 className={s.itemTitle}>
                  <a href={n.href ?? cat?.moreHref ?? coursesHref}>{n.title}</a>
                </h3>
                {n.summary && <p className={s.summary}>{n.summary}</p>}
              </div>
              <span className={s.go} aria-hidden="true">
                <Icon name="arrow" size={18} />
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
