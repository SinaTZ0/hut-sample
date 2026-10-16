import { useState } from 'react'
import type { NewsItem, NewsTab } from '../../../../content'
import { Tabs } from '../../../../shared/components/Tabs'
import { formatIsoDate } from '../../../../shared/utils/fa'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './NewsSection.module.css'

interface NewsSectionProps {
  tabs: NewsTab[]
  items: NewsItem[]
}

/** One news module with filter tabs, replacing five separate homepage carousels. */
export function NewsSection({ tabs, items }: NewsSectionProps) {
  const [active, setActive] = useState(tabs[0].id)
  const tab = tabs.find((t) => t.id === active) ?? tabs[0]
  const list = items.filter((n) => n.category === active)
  const [lead, ...rest] = list

  return (
    <section aria-labelledby="v1-news">
      <SectionHead id="v1-news" title="اخبار" more={{ label: `بایگانی ${tab.title}`, href: tab.moreHref }} />
      <Tabs
        tabs={tabs.map((t) => ({ id: t.id, label: t.title }))}
        active={active}
        onChange={(id) => setActive(id as NewsTab['id'])}
        label="دسته‌بندی اخبار"
        classNames={{ list: s.tabs, tab: s.tab }}
      >
        {(_, panel) => (
          <div {...panel} className={s.panel}>
            {lead && (
              <article className={s.lead}>
                {lead.image && <img src={lead.image} alt="" className={s.leadImg} loading="lazy" />}
                {lead.date && <time dateTime={lead.date}>{formatIsoDate(lead.date)}</time>}
                <h3 className={s.leadTitle}>{lead.href ? <a href={lead.href}>{lead.title}</a> : lead.title}</h3>
                {lead.summary && <p className={s.summary}>{lead.summary}</p>}
              </article>
            )}
            <ul role="list" className={s.list}>
              {rest.map((n) => (
                <li key={n.id} className={s.item}>
                  {n.date && <time dateTime={n.date}>{formatIsoDate(n.date)}</time>}
                  <h3 className={s.itemTitle}>{n.href ? <a href={n.href}>{n.title}</a> : n.title}</h3>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Tabs>
    </section>
  )
}
