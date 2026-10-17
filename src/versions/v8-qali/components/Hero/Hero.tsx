import type { Service } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { faDigits, formatJalaliRange, relativeDays } from '../../../../shared/utils/fa'
import type { EventWithStatus } from '../../../../shared/utils/semester'
import s from './Hero.module.css'

interface HeroProps {
  name: string
  city: string
  mission: string
  image: string
  imageAlt: string
  aboutHref: string
  newStudentsHref: string
  services: Service[]
  serviceCount: number
  allServicesHref: string
  calendarHref: string
  next?: EventWithStatus
}

/**
 * The rug's field: the name on madder with the medallion behind it, the campus photo in full colour,
 * and the six daily systems knotted into the row beneath, so the first screen has no empty ground.
 */
export function Hero({
  name,
  city,
  mission,
  image,
  imageAlt,
  aboutHref,
  newStudentsHref,
  services,
  serviceCount,
  allServicesHref,
  calendarHref,
  next,
}: HeroProps) {
  const lead = name.replace(city, '').trim()

  return (
    <section aria-labelledby="v8-hero" className={s.hero}>
      <div className={s.field}>
        <h1 id="v8-hero" className={s.title}>
          <span>{lead}</span> <span>{city}</span>
        </h1>
        <p className={s.mission}>{mission}</p>
        <div className={s.actions}>
          <a href={aboutHref} className={s.primary}>
            آشنایی با دانشگاه
          </a>
          <ExternalLink href={newStudentsHref} newTab className={s.secondary}>
            راهنمای نودانشجویان
          </ExternalLink>
        </div>
      </div>

      <figure className={s.photo}>
        <img src={image} alt={imageAlt} fetchPriority="high" />
      </figure>

      <a href={calendarHref} className={s.deadline}>
        {next ? (
          <>
            <span className={s.deadlineWhen}>{next.status === 'current' ? 'در جریان' : relativeDays(next.daysUntil)}</span>
            <span className={s.deadlineWhat}>
              <strong>{next.label}</strong>
              {next.cohort && <> ({next.cohort})</>}
              <span className={s.deadlineDate}>{formatJalaliRange(next.start, next.end)}</span>
            </span>
          </>
        ) : (
          <span className={s.deadlineWhat}>
            <strong>تقویم آموزشی نیم‌سال</strong>
          </span>
        )}
      </a>

      <nav aria-label="سامانه‌های پرکاربرد" className={s.services}>
        <ul role="list" className={s.serviceList}>
          {services.map((sv) => (
            <li key={sv.id}>
              <ExternalLink href={sv.href} newTab className={s.service}>
                <Icon name={sv.icon} size={26} className={s.serviceIcon} />
                <span className={s.serviceName}>{sv.short}</span>
                <span className={s.serviceDesc}>{sv.description}</span>
              </ExternalLink>
            </li>
          ))}
          <li>
            <a href={allServicesHref} className={s.all}>
              همه {faDigits(serviceCount)} سامانه
              <Icon name="arrow" size={18} />
            </a>
          </li>
        </ul>
      </nav>
    </section>
  )
}
