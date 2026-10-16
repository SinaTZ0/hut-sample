import type { Service } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import s from './StaffStrip.module.css'

/** Staff and faculty systems in their own compact row, so they no longer crowd the student list. */
export function StaffStrip({ services }: { services: Service[] }) {
  return (
    <section aria-labelledby="v1-staff" className={s.strip}>
      <h2 id="v1-staff" className={s.title}>
        کارکنان و اعضای هیئت علمی
      </h2>
      <ul role="list" className={s.list}>
        {services.map((svc) => (
          <li key={svc.id}>
            <a href={svc.href} className={s.link} title={svc.internalOnly ? 'فقط از شبکه داخلی دانشگاه' : undefined}>
              <Icon name={svc.icon} size={18} />
              {svc.short}
              {svc.internalOnly && <span className={s.note}>شبکه داخلی</span>}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
