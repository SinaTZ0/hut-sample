import { useState } from 'react'
import type { NewsItem, NewsTab } from '../../../../content'
import { Tabs } from '../../../../shared/components/Tabs'
import { formatIsoDate } from '../../../../shared/utils/fa'
import s from './Bulletin.module.css'

interface BulletinProps {
  featured: NewsItem
  tabs: NewsTab[]
  items: NewsItem[]
}

/** Featured notice on one side, all news and announcements in one tabbed list on the other. */
export function Bulletin({ featured, tabs, items }: BulletinProps) {
  const [active, setActive] = useState<NewsTab['id']>('education')
  const tab = tabs.find((t) => t.id === active) ?? tabs[0]
  const list = items.filter((n) => n.category === active).slice(0, 6)

  return (
    <div className={s.grid}>
      <section aria-labelledby="v2-featured" className={s.featured}>
        <h2 id="v2-featured" className={s.kicker}>
          اطلاعیه ویژه
        </h2>
        {featured.image && <img src={featured.image} alt="" className={s.poster} loading="lazy" />}
        <h3 className={s.featuredTitle}>
          <a href={featured.href}>{featured.title}</a>
        </h3>
        {featured.summary && <p className={s.summary}>{featured.summary}</p>}
      </section>

      <section aria-labelledby="v2-news" className={s.news} id="news">
        <h2 id="v2-news" className={s.title}>
          اطلاعیه‌ها و اخبار
        </h2>
        <Tabs
          tabs={tabs.map((t) => ({ id: t.id, label: t.title }))}
          active={active}
          onChange={(id) => setActive(id as NewsTab['id'])}
          label="دسته اطلاعیه‌ها و اخبار"
          classNames={{ list: s.tabs, tab: s.tab }}
        >
          {(_, panel) => (
            <div {...panel}>
              <ul role="list" className={s.list}>
                {list.map((n) => (
                  <li key={n.id} className={s.row}>
                    {n.image && <img src={n.image} alt="" className={s.thumb} loading="lazy" />}
                    <div>
                      <h3 className={s.rowTitle}>{n.href ? <a href={n.href}>{n.title}</a> : n.title}</h3>
                      {n.date && (
                        <time dateTime={n.date} className={s.date}>
                          {formatIsoDate(n.date)}
                        </time>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <a href={tab.moreHref} className={s.more}>
                همه موارد {tab.title}
              </a>
            </div>
          )}
        </Tabs>
      </section>
    </div>
  )
}
