import type { NewsItem, NewsTab } from '../../../../content'
import { formatIsoDate } from '../../../../shared/utils/fa'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './News.module.css'

interface NewsProps {
  featured: NewsItem
  stories: NewsItem[]
  categories: NewsTab[]
  allHref: string
}

/** One story told at length with its photograph, the next two kept short beside it. */
export function News({ featured, stories, categories, allHref }: NewsProps) {
  const label = (n: NewsItem) => categories.find((c) => c.id === n.category)?.title

  return (
    <section aria-labelledby="v5-news">
      <SectionHead
        id="v5-news"
        title="خبرها"
        lede="آنچه این روزها در دانشگاه می‌گذرد."
        more={{ label: 'همه اخبار', href: allHref }}
      />

      <div className={s.layout}>
        <article className={s.lead}>
          <a href={featured.href ?? allHref} className={s.leadLink}>
            {featured.image && <img src={featured.image} alt="" loading="lazy" className={s.leadImage} />}
            <span className={s.leadBody}>
              <Meta item={featured} label={label(featured)} />
              <h3 className={s.leadTitle}>{featured.title}</h3>
              {featured.summary && <span className={s.summary}>{featured.summary}</span>}
            </span>
          </a>
        </article>

        <div className={s.rest}>
          {stories.map((n) => (
            <article key={n.id} className={s.card}>
              <a href={n.href ?? allHref} className={s.cardLink}>
                {n.image && <img src={n.image} alt="" loading="lazy" className={s.cardImage} />}
                <span className={s.cardBody}>
                  <Meta item={n} label={label(n)} />
                  <h3 className={s.cardTitle}>{n.title}</h3>
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Meta({ item, label }: { item: NewsItem; label?: string }) {
  return (
    <span className={s.meta}>
      {label && <span className={s.category}>{label}</span>}
      {item.date && <span className={s.date}>{formatIsoDate(item.date)}</span>}
    </span>
  )
}
