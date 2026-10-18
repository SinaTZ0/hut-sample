import { useCallback, useId, useRef, useState } from 'react'
import type { Link, NavSection, Service } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { LogoMark } from '../../../../shared/components/LogoMark'
import { useDismiss } from '../../../../shared/hooks/useDismiss'
import { useServiceSearch } from '../../../../shared/hooks/useServiceSearch'

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

const stripLink = 'text-inherit no-underline hover:underline'
const navLink =
  'group/link inline-flex w-full cursor-pointer items-center justify-between gap-1 rounded-none border-be border-line bg-transparent px-2 py-3.5 text-step-0 font-semibold text-text no-underline hover:bg-chip hover:text-heading aria-expanded:bg-chip aria-expanded:text-heading lg:w-auto lg:justify-start lg:rounded-sm lg:border-be-0 lg:px-3 lg:py-2.5 lg:text-step--1'
const panelLink = 'text-text no-underline hover:text-link hover:underline'
const tool =
  'grid size-8 cursor-pointer place-items-center rounded-full bg-transparent text-heading hover:bg-chip aria-expanded:bg-chip xs:size-9 sm:size-10'

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
    <header className="relative z-30">
      <div className="bg-band-deep text-step--2 leading-[1.6] text-on-band">
        <div className="flex min-h-9 items-center justify-end gap-s px-edge sm:justify-between">
          <p className="hidden items-center gap-xs before:size-1.5 before:rounded-full before:bg-accent sm:flex">پایگاه رسمی {name}</p>
          <ul role="list" className="flex gap-m">
            <li>
              <a href={contactLink.href} className={stripLink}>{contactLink.label}</a>
            </li>
            <li>
              <a href={loginHref} className={`${stripLink} inline-flex items-center gap-1.5`}>
                ورود به پرتال
                <Icon name="login" size={16} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-be border-line bg-bg-alt">
        <div className="flex min-h-20 items-center justify-between gap-s px-edge">
          <a href="#top" className="flex flex-none items-center gap-2 text-heading no-underline xs:gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-pine-900 sm:size-12">
              <LogoMark size={30} className="text-snow" />
            </span>
            <span className="flex flex-col leading-normal">
              <span className="text-step-0 font-extrabold sm:text-step-1">{name}</span>
              <span className="hidden text-[0.625rem] font-medium tracking-[0.06em] text-text-muted uppercase sm:block" lang="en" dir="ltr">
                {nameEn}
              </span>
            </span>
          </a>

          <nav id="v11-nav" ref={navRef} aria-label="منوی اصلی" className="absolute inset-x-0 top-full hidden max-h-[calc(100dvh-120px)] overflow-y-auto border-be border-line bg-surface px-gutter pt-xs pb-m shadow-card data-[open=true]:block lg:static lg:flex lg:max-h-none lg:flex-1 lg:justify-center lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none" data-open={drawer}>
            <ul role="list" className="flex flex-col items-stretch gap-1 lg:flex-row lg:items-center">
              {sections.map((section) => {
                if (!section.groups.length)
                  return (
                    <li key={section.id}>
                      <a href={section.href} className={navLink}>
                        {section.title}
                      </a>
                    </li>
                  )
                const open = openId === section.id
                return (
                  <li key={section.id}>
                    <button
                      type="button"
                      className={navLink}
                      aria-expanded={open}
                      aria-controls={`v11-panel-${section.id}`}
                      onClick={() => setOpenId(open ? null : section.id)}
                    >
                      {section.title}
                      <Icon name="chevron" size={14} className="text-text-muted transition-[rotate] duration-200 group-aria-expanded/link:rotate-180" />
                    </button>
                    <div id={`v11-panel-${section.id}`} className="lg:absolute lg:inset-x-0 lg:top-full lg:border-block lg:border-line lg:bg-surface lg:shadow-card" hidden={!open}>
                      <div className="mx-auto grid max-w-page grid-cols-[minmax(0,1fr)] gap-m px-2 py-s lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))] lg:gap-l lg:px-gutter lg:py-l">
                        <div className="flex flex-col gap-xs text-step--1 text-text-muted lg:border-e lg:border-line lg:pe-l">
                          <p className="hidden text-step-2 font-extrabold text-heading lg:block">{section.title}</p>
                          <p>{section.summary}</p>
                          <a href={section.href} className="mt-auto inline-flex items-center gap-1.5 font-bold no-underline">
                            صفحه {section.title}
                            <Icon name="arrow" size={16} />
                          </a>
                        </div>
                        {section.groups.map((g) => (
                          <div key={g.title}>
                            <h2 className="mb-xs text-step--1 font-extrabold text-accent-text">{g.href ? <a href={g.href} className="text-inherit">{g.title}</a> : g.title}</h2>
                            <ul role="list" className="grid gap-1.5 text-step--1">
                              {g.links.map((l) => (
                                <li key={l.href}>
                                  <a href={l.href} className={panelLink}>{l.label}</a>
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

          <div className="flex items-center gap-0 border-s border-line ps-1 xs:ps-xs sm:gap-1 sm:ps-s">
            <div ref={searchRef} className="relative">
              <button
                type="button"
                className={tool}
                aria-expanded={searchOpen}
                aria-controls="v11-search"
                onClick={() => setSearchOpen((o) => !o)}
              >
                <Icon name="search" size={20} />
                <span className="visually-hidden">جست‌وجوی سامانه‌ها</span>
              </button>
              {searchOpen && <ServiceSearch services={services} />}
            </div>
            <button type="button" className={tool} aria-pressed={theme === 'dark'} onClick={onToggleTheme}>
              <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={20} />
              <span className="visually-hidden">حالت تیره</span>
            </button>
            <a href={englishHref} lang="en" className="p-2 text-step--1 font-bold text-heading no-underline">
              EN
              <span className="visually-hidden"> English</span>
            </a>
            <button
              type="button"
              className={`${tool} lg:hidden`}
              aria-expanded={drawer}
              aria-controls="v11-nav"
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
    <div id="v11-search" className="absolute end-0 top-[calc(100%+12px)] w-[min(380px,calc(100vw-2*var(--gutter)))] rounded-md border border-line bg-surface p-s shadow-card">
      <label htmlFor={inputId} className="mb-xs block text-step--1 font-bold text-heading">
        کدام سامانه را می‌خواهید؟
      </label>
      <input
        id={inputId}
        type="search"
        autoFocus
        className="w-full rounded-sm border border-line-strong bg-bg px-3.5 py-2.5"
        placeholder="مثلاً گلستان، غذا، وام…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul role="list" className="mt-xs grid max-h-90 gap-0.5 overflow-y-auto" aria-live="polite">
        {results.slice(0, 7).map((r) => (
          <li key={r.id}>
            <ExternalLink href={r.href} newTab className="flex items-start gap-3 rounded-sm px-2.5 py-2 text-text no-underline hover:bg-chip">
              <Icon name={r.icon} size={20} className="mt-[3px] flex-none text-link" />
              <span>
                <span className="block text-step--1 font-bold">{r.title}</span>
                <span className="block text-step--2 leading-[1.6] text-text-muted">
                  {r.description}
                  {r.internalOnly && ' (فقط از شبکه داخلی دانشگاه)'}
                </span>
              </span>
            </ExternalLink>
          </li>
        ))}
        {!results.length && <li className="px-2.5 py-2 text-step--1 text-text-muted">سامانه‌ای پیدا نشد.</li>}
      </ul>
    </div>
  )
}
