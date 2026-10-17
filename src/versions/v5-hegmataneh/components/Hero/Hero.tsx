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

/** The sky of the page: the campus at dusk under Alvand, with the name and what the university is. */
export function Hero({ name, nameEn, city, mission, image, imageAlt, aboutHref, newStudentsHref }: HeroProps) {
  return (
    <section aria-labelledby="v5-hero" className={s.hero}>
      <img src={image} alt={imageAlt} className={s.photo} fetchPriority="high" />
      <div className={s.inner}>
        <p className={s.place}>
          <Icon name="pin" size={15} />
          {city}، در دامنه الوند
        </p>
        <h1 id="v5-hero" className={s.title}>
          {name}
        </h1>
        <p className={s.nameEn} lang="en" dir="ltr">
          {nameEn}
        </p>
        <p className={s.mission}>{mission}</p>
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
    </section>
  )
}
