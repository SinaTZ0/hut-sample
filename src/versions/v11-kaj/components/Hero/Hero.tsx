import { ViewTransition, type ReactNode } from 'react'
import { Icon } from '../../../../shared/components/Icon'
import { formatJalaliRange, relativeDays } from '../../../../shared/utils/fa'
import type { EventWithStatus } from '../../../../shared/utils/semester'
import s from './Hero.module.css'

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
    <section aria-labelledby="v11-hero" className={s.hero}>
      <img src={image} alt={imageAlt} className={s.photo} fetchPriority="high" />
      <div className={s.inner}>
        <ViewTransition default="v11-slide">
          <div className={s.copy}>
            <h1 id="v11-hero" className={s.title}>
              <span>{lead}</span> <span className={s.city}>{city}</span>
            </h1>
            <p className={s.lede}>
              جایی برای یادگیری، پژوهش و ساختن.
              <br />
              از ایده‌های امروز، تا دنیای فردا.
            </p>
            <div className={s.actions}>
              <a href={aboutHref} className={s.primary}>
                آشنایی با دانشگاه
                <Icon name="arrow" size={18} />
              </a>
              <a href={newStudentsHref} className={s.secondary}>
                راهنمای نودانشجویان
                <Icon name="external" size={16} />
              </a>
            </div>
          </div>
        </ViewTransition>

        <ViewTransition default="v11-slide">
          <div className={s.aside}>
            <p className={s.place}>
              <Icon name="pin" size={16} />
              {city}، در دامنه الوند
            </p>
            <p className={s.motto} aria-hidden="true">
              <span>ریشه در دانش</span>
              <strong>نگاه به آینده</strong>
            </p>
          </div>
        </ViewTransition>

        <ViewTransition default="v11-slide">
          <div className={s.notice}>
            <Icon name="calendar" size={20} className={s.noticeIcon} />
            <span className={s.noticeKicker}>اطلاع‌رسانی آموزشی</span>
            <p className={s.noticeText}>
              {next ? (
                <>
                  <strong>{next.label}</strong>
                  {next.cohort && <span className={s.cohort}> ({next.cohort})</span>}
                  <span className={s.when}>
                    {formatJalaliRange(next.start, next.end)}
                    {' · '}
                    {next.status === 'current' ? 'در جریان' : relativeDays(next.daysUntil)}
                  </span>
                </>
              ) : (
                <strong>تقویم آموزشی {semesterTitle}</strong>
              )}
            </p>
            <a href={calendarHref} className={s.noticeLink}>
              مشاهده تقویم
              <Icon name="arrow" size={18} />
            </a>
          </div>
        </ViewTransition>

        {children && <div className={s.services}>{children}</div>}
      </div>
    </section>
  )
}

