import type { Contact, Link, Service, SocialLink } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { LogoMark } from '../../../../shared/components/LogoMark'

const link = 'text-[#e3ebe8] no-underline hover:text-white hover:underline'
const contactIcon = 'mt-[3px] flex-none text-accent'

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
    <footer className="bg-band-deep text-step--1 text-on-band-muted">
      <div className="mx-auto max-w-page px-gutter pt-xl">
        <div className="grid grid-cols-2 gap-x-m gap-y-l sm:grid-cols-3 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))_minmax(0,1.3fr)]">
          <div className="col-span-full lg:col-auto">
            <p className="flex items-center gap-3 text-white">
              <span className="grid size-12 place-items-center rounded-xl border border-white/20">
                <LogoMark size={30} className="text-white" />
              </span>
              <span className="flex flex-col leading-normal">
                <span className="text-step-1 font-extrabold">{name}</span>
                <span className="text-[0.625rem] tracking-[0.06em] text-on-band-muted uppercase" lang="en" dir="ltr">
                  {nameEn}
                </span>
              </span>
            </p>
            <p className="my-s leading-[2]">پایگاه اطلاع‌رسانی {name}؛ اخبار، آموزش، پژوهش و خدمات جامعه دانشگاهی.</p>
            <ul role="list" className="flex flex-wrap gap-2">
              {social
                .filter((so) => so.id !== 'email')
                .map((so) => (
                  <li key={so.id}>
                    <ExternalLink href={so.href} newTab className={`${link} inline-flex items-center gap-1.5 rounded-sm border border-white/16 px-3.5 py-2 text-step--2 hover:border-accent hover:no-underline`}>
                      <Icon name="external" size={12} />
                      {so.label}
                    </ExternalLink>
                  </li>
                ))}
            </ul>
          </div>

          <nav aria-labelledby="v11-f-links">
            <h2 id="v11-f-links" className="mb-s text-step-0 font-extrabold text-white">
              پیوندهای دانشگاه
            </h2>
            <ul role="list" className="grid gap-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="v11-f-services">
            <h2 id="v11-f-services" className="mb-s text-step-0 font-extrabold text-white">
              سامانه‌های دانشجویی
            </h2>
            <ul role="list" className="grid gap-2.5">
              {services.map((sv) => (
                <li key={sv.id}>
                  <ExternalLink href={sv.href} newTab className={link}>
                    {sv.title}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="v11-f-staff">
            <h2 id="v11-f-staff" className="mb-s text-step-0 font-extrabold text-white">
              کارکنان و اساتید
            </h2>
            <ul role="list" className="grid gap-2.5">
              {staffServices.map((sv) => (
                <li key={sv.id}>
                  <ExternalLink href={sv.href} newTab className={link}>
                    {sv.short}
                  </ExternalLink>
                  {sv.internalOnly && <span className="text-step--2"> (شبکه داخلی)</span>}
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-full sm:col-auto">
            <h2 className="mb-s text-step-0 font-extrabold text-white">ارتباط با دانشگاه</h2>
            <address className="grid gap-3.5 not-italic">
              <p className="flex items-start gap-2.5">
                <Icon name="pin" size={18} className={contactIcon} />
                <a href={contact.mapHref} className={link}>{contact.address}</a>
              </p>
              <p className="flex items-start gap-2.5">
                <Icon name="phone" size={18} className={contactIcon} />
                <a href={contact.phoneHref} dir="ltr" className={link}>
                  {contact.phone}
                </a>
              </p>
              <p className="flex items-start gap-2.5">
                <Icon name="mail" size={18} className={contactIcon} />
                <a href={`mailto:${contact.email}`} dir="ltr" className={link}>
                  {contact.email}
                </a>
              </p>
              <p className="flex flex-wrap items-start gap-x-4 gap-y-1 text-step--2">
                <span className="whitespace-nowrap">
                  دورنگار <span dir="ltr">{contact.fax}</span>
                </span>
                <span className="whitespace-nowrap">
                  صندوق پستی <span dir="ltr">{contact.poBox}</span>
                </span>
              </p>
            </address>
            {contactPage && (
              <a href={contactPage.href} className="mt-s inline-flex items-center gap-2 font-bold text-accent no-underline hover:text-white hover:underline">
                ارتباط با ما
                <Icon name="arrow" size={16} />
              </a>
            )}
          </div>
        </div>

        <nav aria-labelledby="v11-f-affiliates" className="mt-l border-t border-white/12 py-m">
          <h2 id="v11-f-affiliates" className="mb-s text-step-0 font-extrabold text-white">
            پیوندها
          </h2>
          <ul role="list" className="flex flex-wrap gap-x-6 gap-y-2 text-step--2">
            {affiliates.map((a) => (
              <li key={a.href}>
                <ExternalLink href={a.href} newTab className={link}>
                  {a.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-white/12 py-5 text-step--2">
          <p>کلیه حقوق این وب‌سایت متعلق به {name} است.</p>
          <p lang="en" dir="ltr" className="font-semibold tracking-[0.12em]">
            HAMEDAN · IRAN
          </p>
        </div>
      </div>
    </footer>
  )
}
