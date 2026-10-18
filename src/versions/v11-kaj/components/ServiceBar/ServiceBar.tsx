import { startTransition, useId, useState, ViewTransition } from 'react'
import type { Service } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { faDigits } from '../../../../shared/utils/fa'
import s from './ServiceBar.module.css'

interface ServiceBarProps {
  services: Service[]
  /** The rest of the student systems, opened below the rail by its last cell. */
  moreServices: Service[]
  serviceCount: number
  allServicesHref: string
}

/** The daily systems, as one white rail that overlaps the bottom of the hero. */
export function ServiceBar({ services, moreServices, serviceCount, allServicesHref }: ServiceBarProps) {
  const panelId = useId()
  const [open, setOpen] = useState(false)

  // A transition, so the panel's <ViewTransition> opens it (see v11-open in tokens.css).
  const toggle = () => startTransition(() => setOpen((o) => !o))

  return (
    <nav id="v11-services" aria-labelledby="v11-services-title" className={s.wrap}>
      <h2 id="v11-services-title" className="visually-hidden">
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
        <li>
          <button type="button" className={s.all} aria-expanded={open} aria-controls={open ? panelId : undefined} onClick={toggle}>
            <Icon name="menu" size={24} className={s.icon} />
            <span className={s.title}>{open ? 'بستن فهرست' : <>همه {faDigits(serviceCount)} سامانه</>}</span>
            <Icon name="arrow" size={18} className={s.allArrow} />
          </button>
        </li>
      </ul>

      {open && (
        <ViewTransition enter="v11-open" exit="v11-open">
          <div id={panelId} className={s.more}>
            <ul role="list" className={s.moreList}>
              {moreServices.map((sv) => (
                <li key={sv.id}>
                  <ExternalLink href={sv.href} newTab className={s.moreItem}>
                    <Icon name={sv.icon} size={22} className={s.moreIcon} />
                    <span className={s.moreTitle}>{sv.title}</span>
                    <span className={s.moreDesc}>{sv.description}</span>
                  </ExternalLink>
                </li>
              ))}
              <li>
                <a href={allServicesHref} className={s.directory}>
                  راهنمای همه سامانه‌ها
                  <Icon name="arrow" size={18} />
                </a>
              </li>
            </ul>
          </div>
        </ViewTransition>
      )}
    </nav>
  )
}
