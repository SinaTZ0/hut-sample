import { useCallback, useRef, useState } from 'react'
import { identity, publicNav } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { LogoMark } from '../../../../shared/components/LogoMark'
import { useDismiss } from '../../../../shared/hooks/useDismiss'
import s from './Masthead.module.css'

interface MastheadProps {
  /** Anchor of the student gateway on this page. */
  portalHref: string
  utility: { label: string; href: string }[]
}

/** Centred, formal masthead with a disclosure mega-menu for the public lane. */
export function Masthead({ portalHref, utility }: MastheadProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [drawer, setDrawer] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const close = useCallback(() => setOpenId(null), [])
  useDismiss(navRef, openId !== null, close)

  return (
    <header className={s.masthead}>
      <div className={s.utility}>
        <ul role="list" className={s.utilityLinks}>
          {utility.map((u) => (
            <li key={u.href}>
              <a href={u.href}>{u.label}</a>
            </li>
          ))}
        </ul>
        <div className={s.utilityEnd}>
          <a href={identity.englishHref} lang="en" dir="ltr">
            English
          </a>
          <a href={identity.loginHref} className={s.login}>
            <Icon name="login" size={18} />
            ورود به پرتال
          </a>
        </div>
      </div>

      <div className={s.brandRow}>
        <a href="#top" className={s.brand}>
          <LogoMark size={64} className={s.mark} />
          <span className={s.names}>
            <span className={s.name}>{identity.name}</span>
            <span className={s.nameEn} lang="en" dir="ltr">
              {identity.nameEn}
            </span>
          </span>
        </a>
        <a href={portalHref} className={s.portalShortcut}>
          سامانه‌ها
        </a>
        <button
          type="button"
          className={s.menuButton}
          aria-expanded={drawer}
          aria-controls="v1-nav"
          onClick={() => setDrawer((d) => !d)}
        >
          <Icon name={drawer ? 'close' : 'menu'} />
          <span className="visually-hidden">{drawer ? 'بستن منو' : 'منو'}</span>
        </button>
      </div>

      <nav id="v1-nav" ref={navRef} aria-label="منوی اصلی" className={s.nav} data-open={drawer}>
        <ul role="list" className={s.navList}>
          {publicNav.map((section) => {
            const open = openId === section.id
            return (
              <li key={section.id} className={s.navItem}>
                <button
                  type="button"
                  className={s.navButton}
                  aria-expanded={open}
                  aria-controls={`v1-panel-${section.id}`}
                  onClick={() => setOpenId(open ? null : section.id)}
                >
                  {section.title}
                </button>
                <div id={`v1-panel-${section.id}`} className={s.panel} hidden={!open}>
                  <div className={s.panelInner}>
                    <div className={s.panelIntro}>
                      <p>{section.summary}</p>
                      <a href={section.href}>صفحه {section.title}</a>
                    </div>
                    {section.groups.map((g) => (
                      <div key={g.title} className={s.panelGroup}>
                        <h2 className={s.panelTitle}>{g.href ? <a href={g.href}>{g.title}</a> : g.title}</h2>
                        <ul role="list">
                          {g.links.map((l) => (
                            <li key={l.href}>
                              <a href={l.href}>{l.label}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            )
          })}
          <li className={s.navItem}>
            <a href={portalHref} className={s.portalLink} onClick={() => setDrawer(false)}>
              سامانه‌های دانشجویی
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
