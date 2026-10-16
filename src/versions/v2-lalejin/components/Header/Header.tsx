import { useRef, useState } from 'react'
import { identity, publicNav } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { LogoMark } from '../../../../shared/components/LogoMark'
import { useDismiss } from '../../../../shared/hooks/useDismiss'
import s from './Header.module.css'

interface HeaderProps {
  /** In-page anchors, in reading order. */
  anchors: { label: string; href: string }[]
}

/** Compact header. Page anchors stay visible; the full public sitemap lives in a drawer. */
export function Header({ anchors }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useDismiss(ref, open, () => setOpen(false))

  return (
    <header className={s.header}>
      <div className={s.bar}>
        <a href="#top" className={s.brand}>
          <LogoMark size={40} className={s.mark} />
          <span className={s.name}>{identity.name}</span>
        </a>

        <nav aria-label="بخش‌های این صفحه" className={s.anchors}>
          <ul role="list">
            {anchors.map((a) => (
              <li key={a.href}>
                <a href={a.href}>{a.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.end} ref={ref}>
          <a href={identity.englishHref} lang="en" className={s.en}>
            EN
          </a>
          <a href={identity.loginHref} className={s.login}>
            ورود
          </a>
          <button
            type="button"
            className={s.menu}
            aria-expanded={open}
            aria-controls="v2-drawer"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
            <span className={s.menuLabel}>همه بخش‌ها</span>
          </button>

          <div id="v2-drawer" className={s.drawer} hidden={!open}>
            <nav aria-label="نقشه سایت" className={s.drawerInner}>
              {publicNav.map((section) => (
                <details key={section.id} className={s.section}>
                  <summary>
                    <span className={s.sectionTitle}>{section.title}</span>
                    <span className={s.sectionSummary}>{section.summary}</span>
                  </summary>
                  <div className={s.groups}>
                    {section.groups.map((g) => (
                      <div key={g.title}>
                        <h2 className={s.groupTitle}>{g.title}</h2>
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
                </details>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
