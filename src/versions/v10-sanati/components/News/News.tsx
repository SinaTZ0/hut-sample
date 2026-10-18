import { useState } from 'react'
import type { JDate, NewsItem, NewsTab } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { Tabs } from '../../../../shared/components/Tabs'
import { faDigits, formatIsoDate, monthName, relativeDays } from '../../../../shared/utils/fa'
import { daysBetween, isoToJalali } from '../../../../shared/utils/jalali'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './News.module.css'

interface NewsProps {
  featured: NewsItem
  stories: NewsItem[]
  notices: { tab: NewsTab; items: NewsItem[] }[]
  categories: NewsTab[]
  allNewsHref: string
  today: JDate
}

/** Lead story and shorter stories as white cards, the announcements on a navy card with category tabs. */
export function News({ featured, stories, notices, categories, allNewsHref, today }: NewsProps) {
  const [active, setActive] = useState<string>(notices[0]?.tab.id ?? '')
  const current = notices.find((n) => n.tab.id === active) ?? notices[0]
  const hrefOf = (n: NewsItem) => n.href ?? categories.find((c) => c.id === n.category)?.moreHref ?? allNewsHref

  return (
    <section aria-labelledby="v10-news">
      <SectionHead id="v10-news" title="تازه‌های دانشگاه" more={{ label: 'همه اخبار', href: allNewsHref }} />

      <div className={s.grid}>
        <article className={s.lead}>
          {featured.image && <img src={featured.image} alt="" loading="lazy" className={s.leadImage} />}
          <div className={s.leadBody}>
            {featured.date && (
              <time dateTime={featured.date} className={s.date}>
                {formatIsoDate(featured.date)}
              </time>
            )}
            <h3 className={s.leadTitle}>
              <a href={hrefOf(featured)}>{featured.title}</a>
            </h3>
            {featured.summary && <p className={s.summary}>{featured.summary}</p>}
          </div>
        </article>

        <ul role="list" className={s.stories}>
          {stories.map((n) => (
            <li key={n.id} className={s.story}>
              {n.image && <img src={n.image} alt="" loading="lazy" className={s.thumb} />}
              <div>
                {n.date && (
                  <time dateTime={n.date} className={s.date}>
                    {formatIsoDate(n.date)}
                  </time>
                )}
                <h3 className={s.storyTitle}>
                  <a href={hrefOf(n)}>{n.title}</a>
                </h3>
              </div>
            </li>
          ))}
        </ul>

        <aside aria-labelledby="v10-notices" className={s.notices}>
          <h3 id="v10-notices" className={s.noticesTitle}>
            اطلاعیه‌ها
          </h3>
          <Tabs
            label="دسته اطلاعیه‌ها"
            tabs={notices.map((n) => ({ id: n.tab.id, label: n.tab.title }))}
            active={active}
            onChange={setActive}
            classNames={{ list: s.tabs, tab: s.tab }}
          >
            {(_, panelProps) => (
              <div {...panelProps} className={s.panel}>
                <ul role="list" className={s.noticeList}>
                  {current.items.slice(0, 4).map((n) => {
                    const j = n.date ? isoToJalali(n.date) : undefined
                    return (
                      <li key={n.id} className={s.notice}>
                        {j && (
                          <span className={s.dateBadge} aria-hidden="true">
                            <span className={s.dateDay}>{faDigits(j[2])}</span>
                            <span>{monthName(j[1])}</span>
                          </span>
                        )}
                        <div>
                          <a href={n.href ?? current.tab.moreHref} className={s.noticeTitle}>
                            {n.title}
                          </a>
                          {n.date && j && (
                            <p className={s.noticeMeta}>
                              <time dateTime={n.date}>{formatIsoDate(n.date)}</time>، {relativeDays(daysBetween(today, j))}
                            </p>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </Tabs>
          <a href={current.tab.moreHref} className={s.noticesMore}>
            همه اطلاعیه‌های {current.tab.title}
            <Icon name="arrow" size={16} />
          </a>
        </aside>
      </div>
    </section>
  )
}
