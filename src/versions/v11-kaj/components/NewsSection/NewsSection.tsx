import { addTransitionType, startTransition, useState, ViewTransition } from 'react'
import type { JDate, NewsItem, NewsTab } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { Tabs } from '../../../../shared/components/Tabs'
import { faDigits, formatIsoDate, monthName, relativeDays } from '../../../../shared/utils/fa'
import { daysBetween, isoToJalali } from '../../../../shared/utils/jalali'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './NewsSection.module.css'

const tabs =
  'isolate mx-[22px] mt-[18px] mb-1 flex gap-1.5 overflow-x-auto rounded-full border border-line bg-surface p-1 [scrollbar-width:none]'
// A whole-pixel line height. The sliding pill is drawn on whole pixels during the transition; with a fractional
// height the real pill rounded 1px shorter and its bottom edge looked cropped the moment the slide ended.
const tab =
  'relative flex-[1_0_auto] cursor-pointer rounded-full border-0 bg-transparent px-3 py-1.5 text-step--2 leading-[22px] font-semibold whitespace-nowrap text-text-muted aria-selected:text-white'

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

      <div className="grid grid-cols-1 items-stretch gap-m lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
        <div className="grid grid-cols-1 gap-m sm:grid-cols-2">
          <Story item={featured} label={category(featured)} featured />
          {stories.map((n) => (
            <Story key={n.id} item={n} label={category(n)} />
          ))}
        </div>

        <aside aria-labelledby="v11-notices" className="flex flex-col overflow-hidden rounded-md border border-line bg-surface-2">
          <div className="flex items-start justify-between px-[22px] pt-[22px]">
            <div>
              <p className="text-step--2 text-text-muted">آنچه باید بدانید</p>
              <h3 id="v11-notices" className="text-step-2 font-extrabold text-heading">
                اطلاعیه‌ها
              </h3>
            </div>
            <span className="grid size-11 place-items-center rounded-full bg-accent/22 text-heading">
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
                      <span className="absolute inset-0 rounded-[inherit] bg-pine-900" aria-hidden="true" />
                    </ViewTransition>
                  )}
                  <span className={`relative z-1 ${s.tabLabel}`}>{n.tab.title}</span>
                </>
              ),
            }))}
            active={active}
            onChange={select}
            classNames={{ list: tabs, tab }}
          >
            {(_, panelProps) => (
              <div {...panelProps} className="px-[22px]">
                <ViewTransition key={current.tab.id} enter="v11-notices-in" exit="v11-notices-out">
                  <ul role="list" className="grid">
                    {current.items.slice(0, 4).map((n) => {
                      const j = n.date ? isoToJalali(n.date) : undefined
                      return (
                        <li key={n.id} className="flex gap-3.5 py-4 not-first:border-t not-first:border-line">
                          {j && (
                            <span className="flex h-14 w-12 flex-none flex-col items-center justify-center rounded-xl border border-line bg-surface leading-[1.3]" aria-hidden="true">
                              <span className="text-step-1 font-extrabold text-heading">{faDigits(j[2])}</span>
                              <span className="text-[0.625rem] text-text-muted">{monthName(j[1])}</span>
                            </span>
                          )}
                          <div className="min-w-0">
                            <a href={n.href ?? current.tab.moreHref} className="text-step--1 leading-[1.9] font-bold text-heading no-underline hover:text-link hover:underline">
                              {n.title}
                            </a>
                            {n.date && j && (
                              <p className="mt-0.5 text-step--2 text-text-muted">
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

          <a href={current.tab.moreHref} className="mt-auto flex items-center justify-between border-t border-line px-[22px] py-4 text-step--1 font-bold no-underline hover:underline">
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
    <article
      className={`group/story relative flex flex-col overflow-hidden rounded-md border border-line bg-surface transition-[box-shadow,border-color] duration-200 hover:border-line-strong hover:shadow-card ${featured ? 'col-span-full sm:flex-row' : ''}`}
    >
      {item.image && (
        <div className={`relative bg-chip ${featured ? 'aspect-video sm:aspect-auto sm:min-h-[280px] sm:flex-1' : 'aspect-[16/7]'}`}>
          <img src={item.image} alt="" loading="lazy" className="size-full object-cover" />
          {featured && <span className="absolute start-3.5 top-3.5 rounded-full bg-white px-3 py-0.5 text-step--2 font-bold text-pine-900">خبر ویژه</span>}
        </div>
      )}
      <div
        className={`flex flex-1 flex-col gap-2.5 px-[22px] pt-[18px] pb-5 ${featured ? 'justify-center sm:px-8 sm:py-7' : ''}`}
      >
        <p className="flex flex-wrap items-center gap-2 text-step--2 text-text-muted">
          {label && <span className="font-bold text-link">{label.title}</span>}
          {item.date && (
            <>
              <span aria-hidden="true">/</span>
              <time dateTime={item.date} className="inline-flex items-center gap-1">
                <Icon name="clock" size={14} />
                {formatIsoDate(item.date)}
              </time>
            </>
          )}
        </p>
        <h3 className={`font-bold text-heading ${featured ? 'text-step-2 leading-[1.7]' : 'text-step-0 leading-[1.8]'}`}>
          <a href={href} className="text-inherit no-underline after:absolute after:inset-0">{item.title}</a>
        </h3>
        {featured && item.summary && <p className="text-step--1 leading-[2] text-text-muted">{item.summary}</p>}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-1.5 text-step--2 font-bold text-link group-hover/story:underline" aria-hidden="true">
          ادامه خبر
          <Icon name="arrow" size={16} />
        </span>
      </div>
    </article>
  )
}
