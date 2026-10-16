import type { Contact, Link, SocialLink } from '../../../../content'
import { LogoMark } from '../../../../shared/components/LogoMark'
import s from './Footer.module.css'

interface FooterProps {
  name: string
  contact: Contact
  utility: Link[]
  affiliates: Link[]
  social: SocialLink[]
}

export function Footer({ name, contact, utility, affiliates, social }: FooterProps) {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.brand}>
          <LogoMark size={48} />
          <p className={s.name}>{name}</p>
          <address className={s.address}>
            {contact.address}
            <br />
            تلفن{' '}
            <a href={contact.phoneHref} dir="ltr">
              {contact.phone}
            </a>
            <br />
            <a href={`mailto:${contact.email}`} dir="ltr">
              {contact.email}
            </a>
          </address>
          <ul role="list" className={s.social}>
            {social.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-labelledby="v2-f-util">
          <h2 id="v2-f-util" className={s.heading}>
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
        <nav aria-labelledby="v2-f-aff">
          <h2 id="v2-f-aff" className={s.heading}>
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
      </div>
      <p className={s.legal}>کلیه حقوق مادی و معنوی این وب‌سایت متعلق به {name} است.</p>
    </footer>
  )
}
