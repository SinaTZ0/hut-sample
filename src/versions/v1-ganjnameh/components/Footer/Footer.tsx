import type { Contact, Link, SocialLink } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { LogoMark } from '../../../../shared/components/LogoMark'
import s from './Footer.module.css'

interface FooterProps {
  name: string
  image: string
  contact: Contact
  utility: Link[]
  affiliates: Link[]
  social: SocialLink[]
}

export function Footer({ name, image, contact, utility, affiliates, social }: FooterProps) {
  return (
    <footer className={s.footer}>
      <div className={s.horizon} style={{ backgroundImage: `url(${image})` }} aria-hidden="true" />
      <div className={s.inner}>
        <div className={s.identity}>
          <LogoMark size={56} className={s.mark} />
          <p className={s.name}>{name}</p>
          <address className={s.address}>
            <span>
              <Icon name="pin" size={18} /> {contact.address}
            </span>
            <span>
              <Icon name="phone" size={18} />{' '}
              <a href={contact.phoneHref} dir="ltr">
                {contact.phone}
              </a>
              ، دورنگار {contact.fax}
            </span>
            <span>
              <Icon name="mail" size={18} />{' '}
              <a href={`mailto:${contact.email}`} className={s.email} dir="ltr">
                {contact.email}
              </a>
              ، صندوق پستی {contact.poBox}
            </span>
          </address>
        </div>

        <nav aria-labelledby="v1-f-util">
          <h2 id="v1-f-util" className={s.heading}>
            دسترسی سریع
          </h2>
          <ul role="list" className={s.links}>
            {utility.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="v1-f-aff">
          <h2 id="v1-f-aff" className={s.heading}>
            پیوندها
          </h2>
          <ul role="list" className={s.links}>
            {affiliates.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={s.heading}>دانشگاه در شبکه‌ها</h2>
          <ul role="list" className={s.links}>
            {social.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className={s.legal}>کلیه حقوق مادی و معنوی این وب‌سایت متعلق به {name} است.</p>
    </footer>
  )
}
