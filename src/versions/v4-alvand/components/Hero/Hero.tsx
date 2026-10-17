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
}

/** Full-bleed Alvand photograph; the name, two actions and the next term deadline sit on a pine gradient. */
export function Hero({ name, city, image, imageAlt, aboutHref, newStudentsHref, semesterTitle, calendarHref, next }: HeroProps) {
  const lead = name.replace(city, '').trim()

  return (
    <section aria-labelledby="v4-hero" className={s.hero}>
      <img src={image} alt={imageAlt} className={s.photo} fetchPriority="high" />
      <div className={s.inner}>
        <p className={s.place}>
          <Icon name="pin" size={16} />
          {city}، در دامنه الوند
        </p>

        <div className={s.copy}>
          <p className={s.eyebrow}>دانش، فناوری، آینده</p>
          <h1 id="v4-hero" className={s.title}>
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

        <p className={s.motto} aria-hidden="true">
          <span>ریشه در دانش</span>
          <strong>نگاه به آینده</strong>
        </p>

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
      </div>
    </section>
  )
}
