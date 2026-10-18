import type { Link, NewsItem, NewsTab } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'

interface LearningProps {
  items: NewsItem[]
  categories: NewsTab[]
  /** Where the panel's one link goes. */
  centre: Link
}

/** Pine panel with one link to the growth centre; events and short courses listed beside it, with a photo where the item has one. */
export function Learning({ items, categories, centre }: LearningProps) {
  const category = (n: NewsItem) => categories.find((c) => c.id === n.category)

  return (
    <section aria-labelledby="v11-learning" className="grid grid-cols-1 items-stretch gap-l lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
      <div className="relative isolate flex flex-col overflow-hidden rounded-lg bg-band px-5 py-6 text-on-band after:absolute after:-end-[140px] after:-bottom-[220px] after:-z-1 after:size-[420px] after:rounded-full after:border after:border-white/8 sm:p-8">
        <span className="mb-m grid size-14 place-items-center self-end rounded-[14px] border border-white/16 text-accent">
          <Icon name="book" size={24} />
        </span>
        <p className="flex items-center gap-2.5 text-step--1 font-semibold text-accent before:block before:h-1 before:w-4.5 before:rounded-xs before:bg-accent">یادگیری ادامه دارد</p>
        <h2 id="v11-learning" className="mt-2.5 mb-3.5 text-step-4 leading-[1.45] font-extrabold text-white">
          رویدادها و
          <br />
          دوره‌های آموزشی
        </h2>
        <p className="text-step--1 leading-[2.1] text-[#d3e0dd]">از کلاس درس تا محیط کار؛ دوره‌های مهارتی و تخصصی در همراهی دانشگاه و صنعت.</p>

        <a href={centre.href} className="mt-auto flex items-center justify-between border-t border-white/14 pt-5 text-step--1 font-bold text-accent no-underline hover:underline">
          {centre.label}
          <Icon name="arrow" size={18} />
        </a>
      </div>

      <ul role="list" className="grid content-start gap-s">
        {items.map((n) => {
          const cat = category(n)
          return (
            <li key={n.id} className="group/item relative flex flex-wrap items-center gap-3.5 rounded-lg border border-line bg-surface p-3.5 transition-[box-shadow,border-color] duration-200 hover:border-line-strong hover:shadow-card sm:flex-nowrap sm:gap-5 sm:p-4.5">
              {n.image && (
                <div className="grid aspect-[16/7] w-full flex-none place-items-center overflow-hidden rounded-xl bg-chip text-link sm:aspect-4/3 sm:w-44">
                  <img src={n.image} alt="" loading="lazy" className="size-full object-cover" />
                </div>
              )}
              <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                {cat && <span className="rounded-full bg-chip px-3 py-0.5 text-step--2 font-semibold text-heading">{cat.title}</span>}
                <h3 className="text-step-0 leading-[1.8] font-extrabold text-heading">
                  <a href={n.href ?? cat?.moreHref ?? centre.href} className="text-inherit no-underline after:absolute after:inset-0">{n.title}</a>
                </h3>
                {n.summary && <p className="text-step--1 text-text-muted">{n.summary}</p>}
              </div>
              <span className="hidden size-10 flex-none place-items-center rounded-full border border-line-strong text-heading transition-colors duration-200 group-hover/item:border-pine-900 group-hover/item:bg-pine-900 group-hover/item:text-white sm:grid" aria-hidden="true">
                <Icon name="arrow" size={18} />
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
