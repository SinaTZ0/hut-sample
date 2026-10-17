import { useState } from 'react'
import type { NewsItem, NewsTab } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { Tabs } from '../../../../shared/components/Tabs'
import { faDigits, formatIsoDate, monthName } from '../../../../shared/utils/fa'
import { isoToJalali } from '../../../../shared/utils/jalali'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Notices.module.css'

interface NoticesProps {
  /** Announcement categories shown as tabs, each with its items. */
  groups: { tab: NewsTab; items: NewsItem[] }[]
  /** The one announcement that carries a poster. */
  featured: NewsItem
  allHref: string
}

/** Announcements, by category, beside the one announcement with a poster of its own. */
export function Notices({ groups, featured, allHref }: NoticesProps) {
  const [active, setActive] = useState<string>(groups[0]?.tab.id ?? '')
  const current = groups.find((g) => g.tab.id === active) ?? groups[0]

  return (
    <section aria-labelledby="v5-notices">
      <SectionHead
        id="v5-notices"
        title="اطلاعیه‌ها"
        lede="آنچه باید بدانید: آموزش، تحصیلات تکمیلی و امور دانشجویی."
        more={{ label: 'همه اطلاعیه‌ها', href: allHref }}
      />

      <div className={s.layout}>
        <article className={s.poster}>
          <a href={featured.href ?? allHref} className={s.posterLink}>
            {featured.image && <img src={featured.image} alt="" loading="lazy" className={s.posterImage} />}
            <span className={s.posterBody}>
              <span className={s.posterFlag}>اطلاعیه ویژه</span>
              <span className={s.posterTitle}>{featured.title}</span>
              {featured.summary && <span className={s.posterSummary}>{featured.summary}</span>}
            </span>
          </a>
        </article>

        <div className={s.list}>
          <Tabs
            tabs={groups.map((g) => ({ id: g.tab.id, label: g.tab.title }))}
            active={active}
            onChange={setActive}
            label="دسته‌بندی اطلاعیه‌ها"
            classNames={{ list: s.tabs, tab: s.tab }}
          >
            {(_, panelProps) => (
              <div {...panelProps} className={s.panel}>
                <ul role="list" className={s.items}>
                  {current.items.map((n) => {
                    const j = n.date ? isoToJalali(n.date) : null
                    return (
                      <li key={n.id}>
                        <a href={n.href ?? current.tab.moreHref} className={s.item}>
                          {j && (
                            <span className={s.stamp} aria-hidden="true">
                              <span className={s.stampDay}>{faDigits(j[2])}</span>
                              <span className={s.stampMonth}>{monthName(j[1])}</span>
                            </span>
                          )}
                          <span className={s.itemText}>
                            <span className={s.itemTitle}>{n.title}</span>
                            {n.date && <span className="visually-hidden">، {formatIsoDate(n.date)}</span>}
                          </span>
                          <Icon name="arrow" size={16} className={s.itemArrow} />
                        </a>
                      </li>
                    )
                  })}
                </ul>
                <a href={current.tab.moreHref} className={s.more}>
                  همه موارد {current.tab.title}
                  <Icon name="arrow" size={16} />
                </a>
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
