import type { Contact, Link, SocialLink } from '../../../../content'
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
        <address className={s.contact}>
          <p className={s.name}>{name}</p>
          <p>{contact.address}</p>
          <p>
            تلفن{' '}
            <a href={contact.phoneHref} dir="ltr">
              {contact.phone}
            </a>
            ، صندوق پستی {contact.poBox}
          </p>
          <p>
            <a href={`mailto:${contact.email}`} dir="ltr">
              {contact.email}
            </a>
          </p>
        </address>
        <nav aria-label="دسترسی سریع">
          <ul role="list" className={s.links}>
            {[...utility, ...social.filter((x) => x.id !== 'email')].map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="پیوندها">
          <ul role="list" className={s.links}>
            {affiliates.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
