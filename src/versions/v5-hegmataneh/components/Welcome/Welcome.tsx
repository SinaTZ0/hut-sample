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

/**
 * The innermost wall: the one block of light at the bottom of the page, for the people
 * who have just arrived and the people who need to be heard.
 */
export function Welcome({ newStudentsHref, departmentsHref, help }: WelcomeProps) {
  return (
    <section aria-labelledby="v5-welcome" className={s.block}>
      <div className={s.intro}>
        <h2 id="v5-welcome" className={s.title}>
          تازه رسیده‌اید؟
        </h2>
        <p className={s.lede}>
          راهنمای نودانشجویان هر چیزی را که برای هفته‌های اول لازم دارید یک‌جا جمع کرده است: ثبت‌نام، گلستان، خوابگاه و
          گروه‌های آموزشی.
        </p>
        <div className={s.actions}>
          <ExternalLink href={newStudentsHref} newTab className={s.primary}>
            راهنمای نودانشجویان
            <Icon name="arrow" size={18} />
          </ExternalLink>
          <a href={departmentsHref} className={s.secondary}>
            گروه‌های آموزشی
          </a>
        </div>
      </div>

      <ul role="list" className={s.help}>
        {help.map((h) => (
          <li key={h.href}>
            <a href={h.href} className={s.helpLink}>
              <Icon name={h.icon} size={22} className={s.helpIcon} />
              <span>
                <span className={s.helpTitle}>{h.title}</span>
                <span className={s.helpDesc}>{h.description}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
