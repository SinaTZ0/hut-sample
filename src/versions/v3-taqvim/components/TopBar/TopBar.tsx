import { useState } from 'react'
import { identity, publicNav } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { LogoMark } from '../../../../shared/components/LogoMark'
import s from './TopBar.module.css'

/** Thin header: name, public sections and account links. Time lives in the rail, not here. */
export function TopBar({ servicesHref }: { servicesHref: string }) {
  const [open, setOpen] = useState(false)
  return (
    <header className={s.bar}>
      <a href="#top" className={s.brand}>
        <LogoMark size={36} className={s.mark} />
        <span className={s.name}>{identity.name}</span>
      </a>

      <button type="button" className={s.toggle} aria-expanded={open} aria-controls="v3-nav" onClick={() => setOpen((o) => !o)}>
        <Icon name={open ? 'close' : 'menu'} size={22} />
        <span className="visually-hidden">منو</span>
      </button>

      <nav id="v3-nav" aria-label="منوی اصلی" className={s.nav} data-open={open}>
        <ul role="list" className={s.links}>
          {publicNav.map((n) => (
            <li key={n.id}>
              <a href={n.href} title={n.summary}>
                {n.title}
              </a>
            </li>
          ))}
          <li>
            <a href={servicesHref} className={s.services}>
              سامانه‌ها
            </a>
          </li>
        </ul>
        <div className={s.account}>
          <a href={identity.englishHref} lang="en">
            English
          </a>
          <a href={identity.loginHref} className={s.login}>
            <Icon name="login" size={18} />
            ورود
          </a>
        </div>
      </nav>
    </header>
  )
}
