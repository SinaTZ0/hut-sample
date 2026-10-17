import { useCallback, useId, useRef, useState } from 'react'
import type { Link, NavSection, Service } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { LogoMark } from '../../../../shared/components/LogoMark'
import { useDismiss } from '../../../../shared/hooks/useDismiss'
import { useServiceSearch } from '../../../../shared/hooks/useServiceSearch'
import s from './Header.module.css'

interface HeaderProps {
  name: string
  nameEn: string
  sections: NavSection[]
  services: Service[]
  contactLink: Link
  loginHref: string
  englishHref: string
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

/** Utility strip, then brand + public sections with full-width panels, service search and theme switch. */
export function Header({ name, nameEn, sections, services, contactLink, loginHref, englishHref, theme, onToggleTheme }: HeaderProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [drawer, setDrawer] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const closeMenu = useCallback(() => setOpenId(null), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  useDismiss(navRef, openId !== null, closeMenu)
  useDismiss(searchRef, searchOpen, closeSearch)

  return (
    <header className={s.header}>
      <div className={s.strip}>
        <div className={s.stripInner}>
          <p className={s.official}>پایگاه رسمی {name}</p>
          <ul role="list" className={s.stripLinks}>
            <li>
              <a href={contactLink.href}>{contactLink.label}</a>
            </li>
            <li>
              <a href={loginHref} className={s.login}>
                ورود به پرتال
                <Icon name="login" size={16} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={s.bar}>
        <div className={s.barInner}>
          <a href="#top" className={s.brand}>
            <span className={s.markBox}>
              <LogoMark size={30} className={s.mark} />
            </span>
            <span className={s.names}>
              <span className={s.name}>{name}</span>
              <span className={s.nameEn} lang="en" dir="ltr">
                {nameEn}
              </span>
            </span>
          </a>

          <nav id="v6-nav" ref={navRef} aria-label="منوی اصلی" className={s.nav} data-open={drawer}>
            <ul role="list" className={s.navList}>
              {sections.map((section) => {
                if (!section.groups.length)
                  return (
                    <li key={section.id}>
                      <a href={section.href} className={s.navLink}>
                        {section.title}
                      </a>
                    </li>
                  )
                const open = openId === section.id
                return (
                  <li key={section.id}>
                    <button
                      type="button"
                      className={s.navLink}
                      aria-expanded={open}
                      aria-controls={`v6-panel-${section.id}`}
                      onClick={() => setOpenId(open ? null : section.id)}
                    >
                      {section.title}
                      <Icon name="chevron" size={14} className={s.chevron} />
                    </button>
                    <div id={`v6-panel-${section.id}`} className={s.panel} hidden={!open}>
                      <div className={s.panelInner}>
                        <div className={s.panelIntro}>
                          <p className={s.panelTitle}>{section.title}</p>
                          <p>{section.summary}</p>
                          <a href={section.href} className={s.panelMore}>
                            صفحه {section.title}
                            <Icon name="arrow" size={16} />
                          </a>
                        </div>
                        {section.groups.map((g) => (
                          <div key={g.title} className={s.panelGroup}>
                            <h2 className={s.groupTitle}>{g.href ? <a href={g.href}>{g.title}</a> : g.title}</h2>
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
            </ul>
          </nav>

          <div className={s.tools}>
            <div ref={searchRef} className={s.searchWrap}>
              <button
                type="button"
                className={s.tool}
                aria-expanded={searchOpen}
                aria-controls="v6-search"
                onClick={() => setSearchOpen((o) => !o)}
              >
                <Icon name="search" size={20} />
                <span className="visually-hidden">جست‌وجوی سامانه‌ها</span>
              </button>
              {searchOpen && <ServiceSearch services={services} />}
            </div>
            <button type="button" className={s.tool} aria-pressed={theme === 'dark'} onClick={onToggleTheme}>
              <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={20} />
              <span className="visually-hidden">حالت تیره</span>
            </button>
            <a href={englishHref} lang="en" className={s.lang}>
              EN
              <span className="visually-hidden"> English</span>
            </a>
            <button
              type="button"
              className={`${s.tool} ${s.menuButton}`}
              aria-expanded={drawer}
              aria-controls="v6-nav"
              onClick={() => setDrawer((d) => !d)}
            >
              <Icon name={drawer ? 'close' : 'menu'} size={22} />
              <span className="visually-hidden">{drawer ? 'بستن منو' : 'منو'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function ServiceSearch({ services }: { services: Service[] }) {
  const { query, setQuery, results } = useServiceSearch(services)
  const inputId = useId()
  return (
    <div id="v6-search" className={s.search}>
      <label htmlFor={inputId} className={s.searchLabel}>
        کدام سامانه را می‌خواهید؟
      </label>
      <input
        id={inputId}
        type="search"
        autoFocus
        className={s.searchInput}
        placeholder="مثلاً گلستان، غذا، وام…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul role="list" className={s.results} aria-live="polite">
        {results.slice(0, 7).map((r) => (
          <li key={r.id}>
            <ExternalLink href={r.href} newTab className={s.result}>
              <Icon name={r.icon} size={20} className={s.resultIcon} />
              <span>
                <span className={s.resultTitle}>{r.title}</span>
                <span className={s.resultDesc}>
                  {r.description}
                  {r.internalOnly && ' (فقط از شبکه داخلی دانشگاه)'}
                </span>
              </span>
            </ExternalLink>
          </li>
        ))}
        {!results.length && <li className={s.empty}>سامانه‌ای پیدا نشد.</li>}
      </ul>
    </div>
  )
}
