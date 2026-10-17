import type { Service } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Services.module.css'

interface ServicesProps {
  /** First one leads: it gets the tall block. */
  services: Service[]
  allHref: string
  staffHref: string
}

/** The systems a student opens on an ordinary day, the most-used one given the tall block. */
export function Services({ services, allHref, staffHref }: ServicesProps) {
  const [lead, ...rest] = services

  return (
    <section aria-labelledby="v5-services">
      <SectionHead
        id="v5-services"
        title="سامانه‌های روزمره"
        lede="آنچه بیشتر از همه باز می‌شود؛ بقیه سامانه‌ها یک کلیک آن‌طرف‌ترند."
        more={{ label: 'همه سامانه‌ها', href: allHref }}
      />

      <ul role="list" className={s.grid}>
        <li className={s.leadCell}>
          <ExternalLink href={lead.href} newTab className={`${s.item} ${s.lead}`}>
            <Icon name={lead.icon} size={40} strokeWidth={1.3} className={s.leadIcon} />
            <span className={s.title}>{lead.title}</span>
            <span className={s.desc}>{lead.description}</span>
            <span className={s.go}>
              ورود
              <Icon name="external" size={14} />
            </span>
          </ExternalLink>
        </li>
        {rest.map((sv) => (
          <li key={sv.id}>
            <ExternalLink href={sv.href} newTab className={s.item}>
              <Icon name={sv.icon} size={22} className={s.icon} />
              <span className={s.title}>{sv.short}</span>
              <span className={s.desc}>{sv.description}</span>
            </ExternalLink>
          </li>
        ))}
      </ul>

      <p className={s.staff}>
        کارمند یا عضو هیئت علمی هستید؟ <a href={staffHref}>سامانه‌های کارکنان و اساتید</a>
      </p>
    </section>
  )
}
