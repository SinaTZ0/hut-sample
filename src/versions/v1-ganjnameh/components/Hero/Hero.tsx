import type { Department, Service } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { formatJalaliRange, relativeDays } from '../../../../shared/utils/fa'
import type { EventWithStatus } from '../../../../shared/utils/semester'
import { Tablet } from '../Tablet/Tablet'
import s from './Hero.module.css'

interface HeroProps {
  name: string
  mission: string
  image: string
  imageAlt: string
  departments: Department[]
  services: Service[]
  allServicesHref: string
  nextDeadline?: EventWithStatus
  portalId: string
}

/** Campus photograph with the twin tablets set into its lower edge: identity on the right, student gateway on the left. */
export function Hero({
  name,
  mission,
  image,
  imageAlt,
  departments,
  services,
  allServicesHref,
  nextDeadline,
  portalId,
}: HeroProps) {
  return (
    <div className={s.hero}>
      <figure className={s.photo}>
        <img src={image} alt={imageAlt} width={952} height={467} fetchPriority="high" />
      </figure>

      <div className={s.tablets}>
        <Tablet id="v1-identity" audience="دانشگاه دولتی، وابسته به وزارت علوم" headingLevel="h1" title={name}>
          <p className={s.mission}>{mission}</p>
          <h2 className={s.subhead}>گروه‌های آموزشی</h2>
          <ul role="list" className={s.departments}>
            {departments.map((d) => (
              <li key={d.id}>
                <a href={d.href}>{d.short}</a>
              </li>
            ))}
          </ul>
        </Tablet>

        <Tablet id={portalId} tone="lapis" audience="برای دانشجویان" title="سامانه‌های دانشجویی" className={s.gateway}>
          <ul role="list" className={s.services}>
            {services.map((svc) => (
              <li key={svc.id}>
                <a href={svc.href} className={s.service} target="_blank" rel="noopener noreferrer">
                  <Icon name={svc.icon} size={26} className={s.serviceIcon} />
                  <span>
                    <span className={s.serviceName}>{svc.short}</span>
                    <span className={s.serviceDesc}>{svc.description}</span>
                  </span>
                  <span className="visually-hidden"> (در زبانه جدید)</span>
                </a>
              </li>
            ))}
          </ul>

          {nextDeadline && (
            <p className={s.deadline}>
              <Icon name="calendar" size={20} />
              <span>
                <strong>{nextDeadline.status === 'current' ? 'در جریان: ' : 'مهلت بعدی: '}</strong>
                {nextDeadline.label}، {formatJalaliRange(nextDeadline.start, nextDeadline.end)}
                {nextDeadline.status === 'upcoming' && (
                  <span className={s.relative}> ({relativeDays(nextDeadline.daysUntil)})</span>
                )}
              </span>
            </p>
          )}

          <a href={allServicesHref} className={s.all}>
            همه سامانه‌ها و فرم‌ها
          </a>
        </Tablet>
      </div>
    </div>
  )
}
