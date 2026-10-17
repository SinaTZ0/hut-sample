import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import s from './Hero.module.css'

interface HeroProps {
  name: string
  nameEn: string
  city: string
  mission: string
  image: string
  imageAlt: string
  aboutHref: string
  newStudentsHref: string
}

/**
 * The campus under Alvand behind a granite wash. The name is the only thing set large;
 * the day's business is not here, it is on the service desk docked below.
 */
export function Hero({ name, nameEn, city, mission, image, imageAlt, aboutHref, newStudentsHref }: HeroProps) {
  return (
    <section aria-labelledby="v6-hero" className={s.hero}>
      <img src={image} alt={imageAlt} className={s.photo} fetchPriority="high" />
      <div className={s.inner}>
        <p className={s.place}>
          <Icon name="pin" size={15} />
          {city}، در دامنه الوند
        </p>

        <div className={s.copy}>
          <h1 id="v6-hero" className={s.title}>
            {name}
          </h1>
          <p className={s.titleEn} dir="ltr">
            {nameEn}
          </p>
          <p className={s.lede}>{mission}</p>
          <div className={s.actions}>
            <a href={aboutHref} className={s.primary}>
              آشنایی با دانشگاه
              <Icon name="arrow" size={18} />
            </a>
            <ExternalLink href={newStudentsHref} newTab className={s.secondary}>
              راهنمای نودانشجویان
              <Icon name="external" size={15} />
            </ExternalLink>
          </div>
        </div>

        <p className={s.motto} aria-hidden="true">
          <span>ریشه در دانش</span>
          <strong>نگاه به آینده</strong>
        </p>
      </div>
    </section>
  )
}
