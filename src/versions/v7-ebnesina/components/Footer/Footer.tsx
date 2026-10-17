import type { Contact, Link, Service, SocialLink } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { LogoMark } from '../../../../shared/components/LogoMark'
import s from './Footer.module.css'

interface FooterProps {
  name: string
  nameEn: string
  contact: Contact
  links: Link[]
  services: Service[]
  staffServices: Service[]
  affiliates: Link[]
  social: SocialLink[]
}

export function Footer({ name, nameEn, contact, links, services, staffServices, affiliates, social }: FooterProps) {
  const contactPage = links.find((l) => l.label === 'تماس با ما')

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.columns}>
          <div className={s.brandCol}>
            <p className={s.brand}>
              <span className={s.markBox}>
                <LogoMark size={30} className={s.mark} />
              </span>
              <span className={s.names}>
                <span className={s.name}>{name}</span>
                <span className={s.nameEn} lang="en" dir="ltr">
                  {nameEn}
                </span>
              </span>
            </p>
            <p className={s.about}>پایگاه اطلاع‌رسانی {name}؛ اخبار، آموزش، پژوهش و خدمات جامعه دانشگاهی.</p>
            <ul role="list" className={s.social}>
              {social
                .filter((so) => so.id !== 'email')
                .map((so) => (
                  <li key={so.id}>
                    <ExternalLink href={so.href} newTab className={s.socialLink}>
                      <Icon name="external" size={12} />
                      {so.label}
                    </ExternalLink>
                  </li>
                ))}
            </ul>
          </div>

          <nav aria-labelledby="v7-f-links">
            <h2 id="v7-f-links" className={s.colTitle}>
              پیوندهای دانشگاه
            </h2>
            <ul role="list" className={s.list}>
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="v7-f-services">
            <h2 id="v7-f-services" className={s.colTitle}>
              سامانه‌های دانشجویی
            </h2>
            <ul role="list" className={s.list}>
              {services.map((sv) => (
                <li key={sv.id}>
                  <ExternalLink href={sv.href} newTab>
                    {sv.title}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="v7-f-staff">
            <h2 id="v7-f-staff" className={s.colTitle}>
              کارکنان و اساتید
            </h2>
            <ul role="list" className={s.list}>
              {staffServices.map((sv) => (
                <li key={sv.id}>
                  <ExternalLink href={sv.href} newTab>
                    {sv.short}
                  </ExternalLink>
                  {sv.internalOnly && <span className={s.internal}> (شبکه داخلی)</span>}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={s.colTitle}>ارتباط با دانشگاه</h2>
            <address className={s.contact}>
              <p>
                <Icon name="pin" size={18} />
                <a href={contact.mapHref}>{contact.address}</a>
              </p>
              <p>
                <Icon name="phone" size={18} />
                <a href={contact.phoneHref} dir="ltr">
                  {contact.phone}
                </a>
              </p>
              <p>
                <Icon name="mail" size={18} />
                <a href={`mailto:${contact.email}`} dir="ltr">
                  {contact.email}
                </a>
              </p>
              <p className={s.fax}>
                <span>
                  دورنگار <span dir="ltr">{contact.fax}</span>
                </span>
                <span>
                  صندوق پستی <span dir="ltr">{contact.poBox}</span>
                </span>
              </p>
            </address>
            {contactPage && (
              <a href={contactPage.href} className={s.contactMore}>
                ارتباط با ما
                <Icon name="arrow" size={16} />
              </a>
            )}
          </div>
        </div>

        <nav aria-labelledby="v7-f-affiliates" className={s.affiliates}>
          <h2 id="v7-f-affiliates" className={s.colTitle}>
            پیوندها
          </h2>
          <ul role="list">
            {affiliates.map((a) => (
              <li key={a.href}>
                <ExternalLink href={a.href} newTab>
                  {a.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.bottom}>
          <p>کلیه حقوق این وب‌سایت متعلق به {name} است.</p>
          <p lang="en" dir="ltr" className={s.place}>
            HAMEDAN · IRAN
          </p>
        </div>
      </div>
    </footer>
  )
}
