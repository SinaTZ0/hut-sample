import type { Department, NewsItem, SocialLink, Stat } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { faDigits, faNumber, formatIsoDate } from '../../../../shared/utils/fa'
import { SectionHead } from '../SectionHead/SectionHead'

interface GlanceProps {
  name: string
  mission: string
  stats: Stat[]
  departments: Department[]
  departmentsHref: string
  /** Campus-life item shown as the photo card. */
  spotlight: NewsItem
  channel?: SocialLink
}

/** Pine band: mission and six hairline figures beside a campus-life photo with a play link to the video channel; departments below. */
export function Glance({ name, mission, stats, departments, departmentsHref, spotlight, channel }: GlanceProps) {
  return (
    <section aria-labelledby="v11-glance" className="relative isolate overflow-hidden bg-band text-on-band before:absolute before:-top-[300px] before:-z-1 before:size-[520px] before:rounded-full before:border before:border-white/7 before:content-[''] before:-start-40 after:absolute after:-end-[260px] after:-bottom-[420px] after:-z-1 after:size-[640px] after:rounded-full after:border after:border-white/7 after:content-['']">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-x-[clamp(32px,6vw,80px)] gap-y-l px-gutter py-xl [grid-template-areas:'copy'_'media'_'depts'] lg:grid-cols-2 lg:[grid-template-areas:'copy_media'_'depts_depts']">
        <div className="[grid-area:copy] [&>div]:mb-m">
          <SectionHead
            id="v11-glance"
            kicker="جامعه‌ای برای یادگیری و ساختن"
            title={
              <>
                {name}
                <br />
                در یک نگاه
              </>
            }
            onBand
          />
          <p className="text-step--1 leading-[2.1] text-[#d3e0dd]">{mission}</p>

          <dl className="mt-l grid grid-cols-2 gap-x-m sm:grid-cols-3">
            {stats.map((st) => (
              <div key={st.label} className="flex flex-col-reverse border-t border-white/14 py-[22px]">
                <dt className="text-step--2 text-on-band-muted">{st.label}</dt>
                <dd className="text-step-4 leading-[1.3] font-extrabold text-accent">
                  {faNumber(st.value)}
                  {st.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="self-center [grid-area:media]">
          <div className="relative">
            {channel && (
              <ExternalLink href={channel.href} newTab className="absolute start-[calc(50%-30px)] top-[calc(50%-30px)] z-1 grid size-15 place-items-center rounded-full bg-accent text-on-accent shadow-[0_0_0_8px_rgb(231_188_101/0.28)] transition-[scale,box-shadow] duration-200 hover:scale-106 hover:shadow-[0_0_0_12px_rgb(231_188_101/0.22)]">
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className="me-[-3px]">
                  <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
                </svg>
                <span className="visually-hidden">ویدیوهای دانشگاه در {channel.label}</span>
              </ExternalLink>
            )}
            <a href={spotlight.href} className="group/photo relative block aspect-[16/10] overflow-hidden rounded-lg bg-band-deep text-white no-underline">
              {spotlight.image && <img
                  src={spotlight.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-[scale] duration-400 group-hover/photo:scale-103"
                />}
              <span className="absolute inset-x-0 bottom-0 flex flex-col bg-linear-to-t from-[rgb(8_31_33/0.92)] to-transparent px-6 pt-15 pb-5">
                <span className="text-step--2 text-accent">زندگی در دانشگاه</span>
                <span className="text-step-1 font-extrabold">{spotlight.title}</span>
              </span>
            </a>
          </div>
          <figcaption className="mt-3.5 flex flex-wrap justify-between gap-x-4 gap-y-2 text-step--2 text-on-band-muted">
            <span>
              {spotlight.date && <>اطلاعیه {formatIsoDate(spotlight.date)} · </>}
              {name}
            </span>
            {channel && (
              <ExternalLink href={channel.href} newTab className="inline-flex items-center gap-1.5 text-white no-underline hover:underline">
                ویدیوهای دانشگاه در {channel.label}
                <Icon name="external" size={14} />
              </ExternalLink>
            )}
          </figcaption>
        </figure>

        <div className="border-t border-white/14 pt-l [grid-area:depts]">
          <div className="mb-m flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className="text-step-3 leading-[1.4] font-extrabold text-white">{faDigits(departments.length)} گروه آموزشی</h3>
            <a href={departmentsHref} className="inline-flex items-center gap-1.5 text-step--1 font-bold text-accent no-underline hover:underline">
              همه گروه‌ها
              <Icon name="arrow" size={16} />
            </a>
          </div>
          <ul role="list" className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/22 bg-white/22 sm:grid-cols-4">
            {departments.map((d) => (
              <li key={d.id}>
                <ExternalLink href={d.href} newTab className="group/dept flex h-full flex-col justify-center gap-0.5 bg-band px-4 py-4.5 text-white no-underline transition-colors duration-200 hover:bg-accent hover:text-on-accent sm:px-7 sm:py-6.5">
                  <span className="text-step-2 leading-normal font-extrabold">{d.short}</span>
                  <span className="text-step--2 text-on-band-muted transition-colors duration-200 group-hover/dept:text-on-accent">{d.title}</span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
