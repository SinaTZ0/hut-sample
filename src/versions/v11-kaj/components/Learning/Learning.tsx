import type { Link, NewsItem, NewsTab } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import s from './Learning.module.css'

interface LearningProps {
  items: NewsItem[]
  categories: NewsTab[]
  /** Where the panel's one link goes. */
  centre: Link
}

/** Pine panel with one link to the growth centre; events and short courses listed beside it, each with its photo. */
export function Learning({ items, categories, centre }: LearningProps) {
  const category = (n: NewsItem) => categories.find((c) => c.id === n.category)

  return (
    <section aria-labelledby="v11-learning" className={s.layout}>
      <div className={s.panel}>
        <span className={s.badge}>
          <Icon name="book" size={24} />
        </span>
        <p className={s.kicker}>یادگیری ادامه دارد</p>
        <h2 id="v11-learning" className={s.title}>
          رویدادها و
          <br />
          دوره‌های آموزشی
        </h2>
        <p className={s.lede}>از کلاس درس تا محیط کار؛ دوره‌های مهارتی و تخصصی در همراهی دانشگاه و صنعت.</p>

        <a href={centre.href} className={s.panelMore}>
          {centre.label}
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
                  <a href={n.href ?? cat?.moreHref ?? centre.href}>{n.title}</a>
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
