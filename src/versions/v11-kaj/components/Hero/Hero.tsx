import { ViewTransition, type ReactNode } from 'react'
import { Icon } from '../../../../shared/components/Icon'
import { formatJalaliRange, relativeDays } from '../../../../shared/utils/fa'
import type { EventWithStatus } from '../../../../shared/utils/semester'

const button =
  'inline-flex min-h-12 items-center gap-3 rounded-sm px-6 py-2.5 font-bold no-underline transition-colors duration-200'

interface HeroProps {
  name: string
  city: string
  image: string
  imageAlt: string
  aboutHref: string
  newStudentsHref: string
  semesterTitle: string
  calendarHref: string
  next?: EventWithStatus
  /** The systems bar, set along the photo's foot. */
  children?: ReactNode
}

/**
 * When the systems list opens above the rail, the spare height over the copy shrinks and the copy rises;
 * each block is its own v11-slide boundary so it glides there instead of jumping.
 *
 * The first screen: the Alvand photograph edge to edge. The name and two actions sit in the top start corner,
 * under the header; the place line, the next deadline and the systems bar stand on the trees at its foot.
 */
export function Hero({ name, city, image, imageAlt, aboutHref, newStudentsHref, semesterTitle, calendarHref, next, children }: HeroProps) {
  const lead = name.replace(city, '').trim()

  return (
    <section aria-labelledby="v11-hero" className="relative isolate grid min-h-(--frame) overflow-hidden bg-band-deep text-on-band [--frame:max(560px,100svh_-_var(--header-h))] before:absolute before:inset-x-0 before:top-0 before:-z-1 before:h-(--frame) before:bg-[linear-gradient(to_top,var(--band-deep)_0%,rgb(11_47_50/0.9)_28%,rgb(11_47_50/0.45)_55%,transparent_78%),linear-gradient(to_left,rgb(11_47_50/0.72)_0%,rgb(11_47_50/0.4)_40%,transparent_65%),linear-gradient(to_bottom,rgb(11_47_50/0.5)_0%,transparent_40%)]">
      <img src={image} alt={imageAlt} className="absolute inset-x-0 top-0 -z-2 h-(--frame) w-full object-cover object-[center_35%]" fetchPriority="high" />
      <div className="grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto_auto_auto] items-end px-edge pt-l pb-m [grid-template-areas:'copy'_'.'_'aside'_'notice'_'services'] md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-l md:pt-xl md:[grid-template-areas:'copy_.'_'._.'_'._aside'_'notice_notice'_'services_services']">
        <ViewTransition default="v11-slide">
          <div className="max-w-[860px] self-start [grid-area:copy]">
            <h1 id="v11-hero" className="mb-s text-step-5 leading-[1.3] font-black text-white [text-shadow:0_2px_24px_rgb(8_31_33/0.55)]">
              <span>{lead}</span> <span className="text-accent">{city}</span>
            </h1>
            <p className="text-step-1 leading-[1.9] text-[#e6efec] [text-shadow:0_1px_12px_rgb(8_31_33/0.6)]">
              جایی برای یادگیری، پژوهش و ساختن.
              <br />
              از ایده‌های امروز، تا دنیای فردا.
            </p>
            <div className="mt-m flex flex-wrap gap-3">
              <a href={aboutHref} className={`${button} bg-accent text-on-accent hover:bg-[#f0cd84]`}>
                آشنایی با دانشگاه
                <Icon name="arrow" size={18} />
              </a>
              <a href={newStudentsHref} className={`${button} border border-white/55 text-white hover:border-white hover:bg-white/8`}>
                راهنمای نودانشجویان
                <Icon name="external" size={16} />
              </a>
            </div>
          </div>
        </ViewTransition>

        <ViewTransition default="v11-slide">
          <div className="mt-l mb-s flex flex-col items-start gap-s [grid-area:aside] md:my-0">
            <p className="inline-flex items-center gap-1.5 text-step--2 text-white/88 [text-shadow:0_1px_6px_rgb(0_0_0/0.5)]">
              <Icon name="pin" size={16} className="text-accent" />
              {city}، در دامنه الوند
            </p>
            <p className="hidden flex-col border-s-2 border-accent ps-4 text-step--1 leading-[1.7] md:flex" aria-hidden="true">
              <span>ریشه در دانش</span>
              <strong className="text-step-2 font-extrabold text-white">نگاه به آینده</strong>
            </p>
          </div>
        </ViewTransition>

        <ViewTransition default="v11-slide">
          <div className="mt-m flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/18 pt-m [grid-area:notice]">
            <Icon name="calendar" size={20} className="text-accent" />
            <span className="text-step--2 font-bold text-accent">اطلاع‌رسانی آموزشی</span>
            <p className="order-1 min-w-0 flex-[1_1_100%] text-white md:order-none md:flex-1">
              {next ? (
                <>
                  <strong className="font-extrabold">{next.label}</strong>
                  {next.cohort && <span className="text-step--1 text-on-band-muted"> ({next.cohort})</span>}
                  <span className="block text-step--1 text-on-band-muted md:ms-3 md:inline">
                    {formatJalaliRange(next.start, next.end)}
                    {' · '}
                    {next.status === 'current' ? 'در جریان' : relativeDays(next.daysUntil)}
                  </span>
                </>
              ) : (
                <strong className="font-extrabold">تقویم آموزشی {semesterTitle}</strong>
              )}
            </p>
            <a href={calendarHref} className="order-2 inline-flex items-center gap-2 text-step--1 font-semibold text-white no-underline hover:underline md:order-none">
              مشاهده تقویم
              <Icon name="arrow" size={18} className="text-accent" />
            </a>
          </div>
        </ViewTransition>

        {children && <div className="mt-m [grid-area:services]">{children}</div>}
      </div>
    </section>
  )
}

