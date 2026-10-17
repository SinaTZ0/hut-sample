import type { Service } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import s from './ServiceBar.module.css'

interface ServiceBarProps {
  services: Service[]
  allHref: string
}

/** The daily systems, as one white rail that overlaps the bottom of the hero. */
export function ServiceBar({ services, allHref }: ServiceBarProps) {
  return (
    <nav id="v4-services" aria-labelledby="v4-services-title" className={s.wrap}>
      <h2 id="v4-services-title" className="visually-hidden">
        سامانه‌های پرکاربرد
      </h2>
      <ul role="list" className={s.bar}>
        {services.map((sv) => (
          <li key={sv.id}>
            <ExternalLink href={sv.href} newTab className={s.item}>
              <Icon name={sv.icon} size={24} className={s.icon} />
              <span className={s.title}>{sv.title}</span>
              <span className={s.desc}>{sv.description}</span>
            </ExternalLink>
          </li>
        ))}
      </ul>
      <a href={allHref} className={s.all}>
        همه سامانه‌ها
        <Icon name="arrow" size={16} />
      </a>
    </nav>
  )
}
