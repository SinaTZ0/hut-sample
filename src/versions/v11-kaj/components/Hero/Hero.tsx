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

/** Full-bleed Alvand photograph with a flag ribbon in its far corner; the name, two actions and the next term deadline sit on a pine gradient. */
export function Hero({ name, city, image, imageAlt, aboutHref, newStudentsHref, semesterTitle, calendarHref, next }: HeroProps) {
  const lead = name.replace(city, '').trim()

  return (
    <section aria-labelledby="v11-hero" className={s.hero}>
      <img src={image} alt={imageAlt} className={s.photo} fetchPriority="high" />
      <Ribbon />
      <div className={s.inner}>
        <p className={s.place}>
          <Icon name="pin" size={16} />
          {city}، در دامنه الوند
        </p>

        <div className={s.copy}>
          <p className={s.eyebrow}>دانش، فناوری، آینده</p>
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

/** Three wavy stripes in the flag's colours, folding in from the photo's far corner. */
function Ribbon() {
  const wave = (y: number) => `M-40 ${y} C 90 ${y - 70}, 200 ${y + 60}, 330 ${y - 10} S 520 ${y - 90}, 600 ${y - 150}`
  return (
    <svg className={s.ribbon} viewBox="0 0 560 300" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="v11-sheen" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.6" stopColor="#000" stopOpacity="0.18" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={wave(110)} stroke="#239f40" />
      <path d={wave(150)} stroke="#f4f4f1" />
      <path d={wave(190)} stroke="#c8102e" />
      <path d={wave(150)} stroke="url(#v11-sheen)" className={s.sheen} />
    </svg>
  )
}
