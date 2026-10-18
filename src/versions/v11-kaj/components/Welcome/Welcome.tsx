import type { IconName } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'

const button =
  'inline-flex min-h-12 items-center gap-3 rounded-sm px-5.5 py-2.5 text-step--1 font-bold no-underline transition-colors duration-200'

interface HelpLink {
  title: string
  description: string
  href: string
  icon: IconName
}

interface WelcomeProps {
  newStudentsHref: string
  departmentsHref: string
  help: HelpLink[]
}

/** Closing split card: welcome for new students on pine, ways to reach the university on the light half. */
export function Welcome({ newStudentsHref, departmentsHref, help }: WelcomeProps) {
  return (
    <section aria-labelledby="v11-welcome" className="grid grid-cols-1 overflow-hidden rounded-lg border border-line bg-surface-2 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="relative isolate overflow-hidden bg-band px-5.5 py-8 text-on-band [--focus:var(--accent)] sm:px-10 sm:py-11">
        <p className="text-step--1 text-accent">شروع یک مسیر تازه</p>
        <h2 id="v11-welcome" className="mt-2 mb-3.5 text-step-3 leading-normal font-extrabold text-white">
          به جمع ما خوش آمدید
        </h2>
        <p className="max-w-[460px] text-step--1 leading-[2.1] text-on-band-muted">هر آنچه برای آغاز مسیر دانشگاهی نیاز دارید؛ از آشنایی با گروه‌های آموزشی تا راهنمای ثبت‌نام.</p>
        <div className="mt-l flex flex-wrap gap-3">
          <ExternalLink href={newStudentsHref} newTab className={`${button} bg-accent text-on-accent hover:bg-[#f0cd84]`}>
            راهنمای نودانشجویان
            <Icon name="arrow" size={18} />
          </ExternalLink>
          <a href={departmentsHref} className={`${button} border border-white/60 text-white hover:border-white hover:bg-white/8`}>
            گروه‌های آموزشی
            <Icon name="external" size={16} />
          </a>
        </div>
        <Icon name="open-ed" size={180} strokeWidth={0.8} className="absolute end-6 -bottom-10 -z-1 -rotate-12 text-white/7" />
      </div>

      <ul role="list" className="grid auto-rows-fr">
        {help.map((h) => (
          <li key={h.href} className="group/help relative flex items-center gap-4 px-5.5 py-6 transition-colors duration-200 not-first:border-t not-first:border-line hover:bg-surface has-focus-visible:outline-2 has-focus-visible:-outline-offset-4 has-focus-visible:outline-focus sm:px-10 sm:py-7">
            <span className="grid size-11 flex-none place-items-center rounded-xl border border-line bg-surface text-link">
              <Icon name={h.icon} size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-step-0 font-extrabold text-heading group-hover/help:text-link group-hover/help:underline">
                <ExternalLink
                  href={h.href}
                  newTab
                  className="text-inherit no-underline after:absolute after:inset-0 focus-visible:outline-none"
                >
                  {h.title}
                </ExternalLink>
              </h3>
              <p className="text-step--2 text-text-muted">{h.description}</p>
            </div>
            <Icon name="external" size={16} className="mt-1.5 flex-none text-text-muted" />
          </li>
        ))}
      </ul>
    </section>
  )
}
