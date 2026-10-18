import { addTransitionType, startTransition, useState, ViewTransition } from 'react'
import type { JDate, NewsItem, NewsTab } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { Tabs } from '../../../../shared/components/Tabs'
import { faDigits, formatIsoDate, monthName, relativeDays } from '../../../../shared/utils/fa'
import { daysBetween, isoToJalali } from '../../../../shared/utils/jalali'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './NewsSection.module.css'

interface NewsSectionProps {
  featured: NewsItem
  stories: NewsItem[]
  /** Announcement categories shown as tabs, each with its items. */
  notices: { tab: NewsTab; items: NewsItem[] }[]
  /** Label + fallback link per category. */
  categories: NewsTab[]
  allNewsHref: string
  today: JDate
}

/** Stories on the start side (one featured, two cards); a tabbed announcements panel on the end side. */
export function NewsSection({ featured, stories, notices, categories, allNewsHref, today }: NewsSectionProps) {
  const [active, setActive] = useState<string>(notices[0]?.tab.id ?? '')
  const category = (n: NewsItem) => categories.find((c) => c.id === n.category)
  const current = notices.find((n) => n.tab.id === active) ?? notices[0]
  const select = (id: string) =>
    startTransition(() => {
      addTransitionType('v11-notices')
      setActive(id)
    })

  return (
    <section aria-labelledby="v11-news">
      <SectionHead
        id="v11-news"
        kicker="اخبار و اطلاع‌رسانی"
        title="تازه‌های دانشگاه"
        lede="روایت رویدادها، پژوهش‌ها و زندگی جامعه دانشگاهی"
        more={{ label: 'همه اخبار دانشگاه', href: allNewsHref }}
      />

      <div className={s.layout}>
        <div className={s.stories}>
          <Story item={featured} label={category(featured)} featured />
          {stories.map((n) => (
            <Story key={n.id} item={n} label={category(n)} />
          ))}
        </div>

        <aside aria-labelledby="v11-notices" className={s.panel}>
          <div className={s.panelHead}>
            <div>
              <p className={s.panelKicker}>آنچه باید بدانید</p>
              <h3 id="v11-notices" className={s.panelTitle}>
                اطلاعیه‌ها
              </h3>
            </div>
            <span className={s.bell}>
              <Icon name="bell" size={20} />
            </span>
          </div>

          <Tabs
            label="دسته اطلاعیه‌ها"
            tabs={notices.map((n) => ({
              id: n.tab.id,
              label: (
                <>
                  {n.tab.id === active && (
                    <ViewTransition name="v11-notice-pill" share="v11-pill">
                      <span className={s.pill} aria-hidden="true" />
                    </ViewTransition>
                  )}
                  <span className={s.tabLabel}>{n.tab.title}</span>
                </>
              ),
            }))}
            active={active}
            onChange={select}
            classNames={{ list: s.tabs, tab: s.tab }}
          >
            {(_, panelProps) => (
              <div {...panelProps} className={s.tabPanel}>
                <ViewTransition key={current.tab.id} enter="v11-notices-in" exit="v11-notices-out">
                  <ul role="list" className={s.notices}>
                    {current.items.slice(0, 4).map((n) => {
                      const j = n.date ? isoToJalali(n.date) : undefined
                      return (
                        <li key={n.id} className={s.notice}>
                          {j && (
                            <span className={s.chip} aria-hidden="true">
                              <span className={s.chipDay}>{faDigits(j[2])}</span>
                              <span className={s.chipMonth}>{monthName(j[1])}</span>
                            </span>
                          )}
                          <div className={s.noticeBody}>
                            <a href={n.href ?? current.tab.moreHref} className={s.noticeTitle}>
                              {n.title}
                            </a>
                            {n.date && j && (
                              <p className={s.noticeMeta}>
                                <time dateTime={n.date}>{formatIsoDate(n.date)}</time>
                                {' · '}
                                {relativeDays(daysBetween(today, j))}
                              </p>
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </ViewTransition>
              </div>
            )}
          </Tabs>

          <a href={current.tab.moreHref} className={s.panelMore}>
            همه اطلاعیه‌های {current.tab.title}
            <Icon name="arrow" size={16} />
          </a>
        </aside>
      </div>
    </section>
  )
}

function Story({ item, label, featured }: { item: NewsItem; label?: NewsTab; featured?: boolean }) {
  const href = item.href ?? label?.moreHref ?? '#'
  return (
    <article className={featured ? `${s.story} ${s.featured}` : s.story}>
      {item.image && (
        <div className={s.media}>
          <img src={item.image} alt="" loading="lazy" />
          {featured && <span className={s.badge}>خبر ویژه</span>}
        </div>
      )}
      <div className={s.body}>
        <p className={s.meta}>
          {label && <span className={s.cat}>{label.title}</span>}
          {item.date && (
            <>
              <span aria-hidden="true">/</span>
              <time dateTime={item.date} className={s.date}>
                <Icon name="clock" size={14} />
                {formatIsoDate(item.date)}
              </time>
            </>
          )}
        </p>
        <h3 className={s.title}>
          <a href={href}>{item.title}</a>
        </h3>
        {featured && item.summary && <p className={s.summary}>{item.summary}</p>}
        <span className={s.read} aria-hidden="true">
          ادامه خبر
          <Icon name="arrow" size={16} />
        </span>
      </div>
    </article>
  )
}
