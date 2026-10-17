import type { NewsItem, NewsTab } from '../../../../content'
import { formatIsoDate } from '../../../../shared/utils/fa'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Events.module.css'

interface EventsProps {
  items: NewsItem[]
  categories: NewsTab[]
  moreHref: string
}

/** Short courses and events run by the growth centre and open education. */
export function Events({ items, categories, moreHref }: EventsProps) {
  const label = (n: NewsItem) => categories.find((c) => c.id === n.category)?.title

  return (
    <section aria-labelledby="v5-events" className={s.block}>
      <SectionHead
        id="v5-events"
        title="رویدادها و دوره‌ها"
        lede="دوره‌های مهارتی، نشست‌های صنعت و برنامه‌های آموزش آزاد."
        deep
        more={{ label: 'همه دوره‌ها', href: moreHref }}
      />
      <ul role="list" className={s.grid}>
        {items.map((n) => (
          <li key={n.id}>
            <a href={n.href ?? moreHref} className={s.item}>
              {n.image && <img src={n.image} alt="" loading="lazy" className={s.image} />}
              {/* no poster: the headline takes the space the picture would have had */}
              <span className={n.image ? s.body : `${s.body} ${s.bodyOnly}`}>
                <span className={s.meta}>
                  {label(n) && <span className={s.category}>{label(n)}</span>}
                  {n.date && <span className={s.date}>{formatIsoDate(n.date)}</span>}
                </span>
                <span className={s.title}>{n.title}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
