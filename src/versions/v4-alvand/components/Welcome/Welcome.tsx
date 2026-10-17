import type { IconName } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import s from './Welcome.module.css'

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
    <section aria-labelledby="v4-welcome" className={s.card}>
      <div className={s.welcome}>
        <p className={s.kicker}>شروع یک مسیر تازه</p>
        <h2 id="v4-welcome" className={s.title}>
          به جمع ما خوش آمدید
        </h2>
        <p className={s.lede}>هر آنچه برای آغاز مسیر دانشگاهی نیاز دارید؛ از آشنایی با گروه‌های آموزشی تا راهنمای ثبت‌نام.</p>
        <div className={s.actions}>
          <ExternalLink href={newStudentsHref} newTab className={s.primary}>
            راهنمای نودانشجویان
            <Icon name="arrow" size={18} />
          </ExternalLink>
          <a href={departmentsHref} className={s.secondary}>
            گروه‌های آموزشی
            <Icon name="external" size={16} />
          </a>
        </div>
        <Icon name="open-ed" size={180} strokeWidth={0.8} className={s.watermark} />
      </div>

      <ul role="list" className={s.help}>
        {help.map((h) => (
          <li key={h.href} className={s.helpItem}>
            <span className={s.helpIcon}>
              <Icon name={h.icon} size={22} />
            </span>
            <div className={s.helpBody}>
              <h3 className={s.helpTitle}>
                <ExternalLink href={h.href} newTab>
                  {h.title}
                </ExternalLink>
              </h3>
              <p className={s.helpDesc}>{h.description}</p>
            </div>
            <Icon name="external" size={16} className={s.helpGo} />
          </li>
        ))}
      </ul>
    </section>
  )
}
