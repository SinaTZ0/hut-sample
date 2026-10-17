import type { IconName, NewsItem, NewsTab } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { SectionHead } from '../SectionHead/SectionHead'
import s from './Join.module.css'

interface JoinProps {
  courses: NewsItem[]
  categories: NewsTab[]
  coursesHref: string
  newStudentsHref: string
  newStudentsText: string
  departmentsHref: string
  help: { title: string; description: string; href: string; icon: IconName }[]
}

/** Events and courses on white, the welcome for new students on weld, and two ways to get help. */
export function Join({ courses, categories, coursesHref, newStudentsHref, newStudentsText, departmentsHref, help }: JoinProps) {
  const category = (n: NewsItem) => categories.find((c) => c.id === n.category)

  return (
    <section aria-labelledby="v8-join">
      <SectionHead id="v8-join" title="رویدادها، دوره‌ها و همراهی" more={{ label: 'همه دوره‌ها', href: coursesHref }} />

      <div className={s.grid}>
        <ul role="list" className={s.courses}>
          {courses.map((n) => (
            <li key={n.id} className={s.course}>
              {n.image ? (
                <img src={n.image} alt="" loading="lazy" className={s.thumb} />
              ) : (
                <span className={s.thumb} aria-hidden="true">
                  <Icon name="open-ed" size={28} />
                </span>
              )}
              <div>
                <p className={s.cat}>{category(n)?.title}</p>
                <a href={n.href ?? category(n)?.moreHref ?? coursesHref} className={s.courseTitle}>
                  {n.title}
                </a>
              </div>
            </li>
          ))}
        </ul>

        <div className={s.welcome}>
          <h3 className={s.welcomeTitle}>به دانشگاه خوش آمدید</h3>
          <p>{newStudentsText}</p>
          <div className={s.welcomeActions}>
            <ExternalLink href={newStudentsHref} newTab className={s.welcomePrimary}>
              راهنمای نودانشجویان
            </ExternalLink>
            <a href={departmentsHref} className={s.welcomeSecondary}>
              گروه‌های آموزشی
            </a>
          </div>
        </div>

        <ul role="list" className={s.help}>
          {help.map((h) => (
            <li key={h.href}>
              <a href={h.href} className={s.helpItem}>
                <Icon name={h.icon} size={24} className={s.helpIcon} />
                <span>
                  <span className={s.helpTitle}>{h.title}</span>
                  <span className={s.helpDesc}>{h.description}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
