import type { IconName, Link, NewsItem } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { SectionHead } from '../SectionHead/SectionHead'

interface AchievementsProps {
  lead: NewsItem
  others: NewsItem[]
  /** Short category line above each title, by item id. */
  tags: Record<string, string>
  /** Research and outreach units, listed under the cards. */
  units: (Link & { description: string; icon: IconName })[]
  /** The research portal, linked from the units' heading. */
  research: Link
  /** Fallback target for items without their own page. */
  moreHref: string
}

/** One tall card for the lead achievement, the rest as image-beside-text cards; the research units close the section. */
export function Achievements({ lead, others, tags, units, research, moreHref }: AchievementsProps) {
  return (
    <section aria-labelledby="v11-achievements">
      <SectionHead
        id="v11-achievements"
        kicker="ثمره تلاش جامعه دانشگاهی"
        title="دستاوردها و افتخارات"
        lede="از پیشرفت‌های علمی تا افتخارآفرینی دانشجویان؛ روایت تلاش‌هایی که به ثمر می‌رسند."
        more={{ label: 'دستاوردهای دانشگاه', href: moreHref }}
      />
      <div className="grid grid-cols-1 gap-m lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <Card item={lead} tag={tags[lead.id]} href={lead.href ?? moreHref} lead />
        <div className="grid gap-m">
          {others.map((a) => (
            <Card key={a.id} item={a} tag={tags[a.id]} href={a.href ?? moreHref} />
          ))}
        </div>
      </div>

      <div className="mt-[calc(var(--space-xl)+var(--space-s))] grid grid-cols-1 overflow-hidden rounded-lg border border-line bg-surface lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)]">
        <div className="flex flex-col items-start gap-xs border-be border-line bg-bg-alt p-[clamp(28px,4vw,44px)] lg:border-be-0 lg:border-e">
          <h3 className="text-step-3 leading-[1.4] font-extrabold text-heading">واحدهای پژوهش و فناوری</h3>
          <p className="max-w-[30ch] text-step--1 leading-[2] text-text-muted">پژوهش دانشگاه از این واحدها به صنعت و جامعه می‌رسد؛ از نشریه و آزمایشگاه تا شرکت‌های دانش‌بنیان.</p>
          <a href={research.href} className="mt-auto inline-flex items-center gap-1.5 pt-m text-step--1 font-bold text-link no-underline hover:underline">
            {research.label}
            <Icon name="arrow" size={16} />
          </a>
        </div>
        <ul role="list" className="grid grid-cols-1 overflow-hidden sm:grid-cols-2">
          {units.map((u) => (
            <li key={u.href} className="-mt-px -ms-px border-t border-s border-line">
              <ExternalLink
                href={u.href}
                newTab
                className="group/unit grid h-full grid-cols-[auto_minmax(0,1fr)_auto] content-center items-start gap-x-[18px] gap-y-1 px-5 py-5.5 text-inherit no-underline transition-colors duration-200 hover:bg-surface-2 focus-visible:-outline-offset-4 sm:px-7 sm:py-7.5"
              >
                <Icon name={u.icon} size={28} className="row-span-2 mt-0.5 text-accent-text" />
                <span className="text-step-1 leading-[1.6] font-extrabold text-heading">{u.label}</span>
                <Icon name="external" size={16} className="row-span-2 mt-1.5 text-text-muted transition-colors duration-200 group-hover/unit:text-link" />
                <span className="text-step--1 leading-[1.9] text-text-muted">{u.description}</span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Card({ item, tag, href, lead }: { item: NewsItem; tag?: string; href: string; lead?: boolean }) {
  return (
    <article
      className={`group/card relative flex overflow-hidden rounded-lg border border-line bg-surface transition-[box-shadow,border-color] duration-200 hover:border-line-strong hover:shadow-card ${lead ? 'flex-col' : 'flex-col sm:flex-row'}`}
    >
      {item.image && (
        <div className={`relative bg-chip ${lead ? 'aspect-2/1' : 'aspect-2/1 sm:order-2 sm:aspect-auto sm:flex-[0_0_38%]'}`}>
          <img src={item.image} alt="" loading="lazy" className="size-full object-cover" />
          {lead && <span className="absolute start-4 top-4 rounded-full bg-pine-950 px-3 py-[3px] text-step--2 font-bold text-white">در کانون توجه</span>}
        </div>
      )}
      <div className={`flex min-w-0 flex-1 flex-col gap-2.5 ${lead ? 'px-7 py-6.5' : 'p-6'}`}>
        {tag && <p className="flex items-center gap-2 text-step--2 font-bold text-link before:size-1.5 before:rounded-full before:bg-accent">{tag}</p>}
        <h3 className={`font-extrabold text-heading ${lead ? 'text-step-2 leading-[1.7]' : 'text-step-0 leading-[1.8]'}`}>
          <a href={href} className="text-inherit no-underline after:absolute after:inset-0">{item.title}</a>
        </h3>
        {item.summary && <p className="text-step--1 leading-[2] text-text-muted">{item.summary}</p>}
        <p className="mt-auto flex items-center justify-between border-t border-line pt-3.5 text-step--2 font-bold text-link" aria-hidden="true">
          <span>بیشتر بخوانید</span>
          <span className="grid size-8 place-items-center rounded-full bg-chip transition-colors duration-200 group-hover/card:bg-pine-900 group-hover/card:text-white">
            <Icon name="external" size={14} />
          </span>
        </p>
      </div>
    </article>
  )
}
