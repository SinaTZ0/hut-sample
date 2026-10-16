import { useState } from 'react'
import type { NewsItem, NewsTab } from '../../../../content'
import { Tabs } from '../../../../shared/components/Tabs'
import { faDigits, monthName } from '../../../../shared/utils/fa'
import { isoToJalali } from '../../../../shared/utils/jalali'
import s from './Feed.module.css'

interface FeedProps {
  tabs: NewsTab[]
  items: NewsItem[]
  featured?: NewsItem
}

/** Chronological feed with a date column: in V3 every item is placed in time first. */
export function Feed({ tabs, items, featured }: FeedProps) {
  const [active, setActive] = useState<NewsTab['id']>(tabs[0].id)
  const tab = tabs.find((t) => t.id === active) ?? tabs[0]
  const list = items.filter((n) => n.category === active).slice(0, 6)

  return (
    <section aria-labelledby="v3-feed" className={s.feed}>
      <div className={s.head}>
        <h2 id="v3-feed" className={s.title}>
          اطلاعیه‌ها و اخبار
        </h2>
        <a href={tab.moreHref}>بایگانی {tab.title}</a>
      </div>

      {featured && (
        <article className={s.featured}>
          {featured.image && <img src={featured.image} alt="" loading="lazy" />}
          <div>
            <h3 className={s.featuredTitle}>
              <a href={featured.href}>{featured.title}</a>
            </h3>
            {featured.summary && <p>{featured.summary}</p>}
          </div>
        </article>
      )}

      <Tabs
        tabs={tabs.map((t) => ({ id: t.id, label: t.title }))}
        active={active}
        onChange={(id) => setActive(id as NewsTab['id'])}
        label="دسته اطلاعیه‌ها و اخبار"
        classNames={{ list: s.tabs, tab: s.tab }}
      >
        {(_, panel) => (
          <div {...panel} className={s.list}>
            <ol role="list">
              {list.map((n) => {
                const j = n.date ? isoToJalali(n.date) : null
                return (
                  <li key={n.id} className={s.row}>
                    {j && n.date ? (
                      <time dateTime={n.date} className={s.date}>
                        <span className={s.day}>{faDigits(j[2])}</span>
                        <span className={s.month}>
                          {monthName(j[1])} {faDigits(j[0])}
                        </span>
                      </time>
                    ) : (
                      <span className={s.date} />
                    )}
                    <h3 className={s.rowTitle}>{n.href ? <a href={n.href}>{n.title}</a> : n.title}</h3>
                    {n.image && <img src={n.image} alt="" className={s.thumb} loading="lazy" />}
                  </li>
                )
              })}
            </ol>
          </div>
        )}
      </Tabs>
    </section>
  )
}
