import './fonts'
import './tokens.css'
import { useMemo, useState } from 'react'
import {
  achievements,
  affiliates,
  contact,
  departments,
  featuredAnnouncement,
  identity,
  navSections,
  newsByCategory,
  newsTabs,
  researchUnits,
  semester,
  serviceById,
  services,
  social,
  stats,
  staffServices,
  topServices,
  utilityLinks,
} from '../../content'
import type { NewsItem, NewsTab } from '../../content'
import { SkipLink } from '../../shared/components/SkipLink'
import { useToday } from '../../shared/hooks/useToday'
import { semesterState } from '../../shared/utils/semester'
import { Achievements } from './components/Achievements/Achievements'
import { Footer } from './components/Footer/Footer'
import { Glance } from './components/Glance/Glance'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Learning } from './components/Learning/Learning'
import { NewsSection } from './components/NewsSection/NewsSection'
import { Semester } from './components/Semester/Semester'
import { ServiceDesk } from './components/ServiceDesk/ServiceDesk'
import { Welcome } from './components/Welcome/Welcome'
import s from './page.module.css'

const tab = (id: NewsTab['id']) => newsTabs.find((t) => t.id === id)!
const byDateDesc = (a: NewsItem, b: NewsItem) => (b.date ?? '').localeCompare(a.date ?? '')
const link = (label: string) => utilityLinks.find((l) => l.label === label)!

const CALENDAR_HREF = 'https://hut.ac.ir/web/edu/تقویم-آموزشی'
const DEPARTMENTS_HREF = 'https://hut.ac.ir/groups'
const ABOUT_HREF = navSections.find((n) => n.id === 'about')!.href
const SERVICES_HREF = navSections.find((n) => n.id === 'services')!.href
const newStudents = serviceById('new-students')!
const counseling = serviceById('counseling')!

// Stories with their own photo (the campus photo is already the hero); the one with a summary leads.
const stories = newsByCategory('university').filter((n) => n.image && n.image !== identity.images.campus)
const featuredStory = stories.find((n) => n.summary) ?? stories[0]
const otherStories = stories.filter((n) => n !== featuredStory).slice(0, 2)

const notices = (['education', 'graduate', 'student'] as const).map((id) => ({
  tab: tab(id),
  items: [...newsByCategory(id)].sort(byDateDesc),
}))

const leadAchievement = achievements.find((a) => a.id === 'ach-journal')!
const otherAchievements = ['ach-sports', 'ach-smart-city'].map((id) => achievements.find((a) => a.id === id)!)

const learningItems = [...newsByCategory('growth').filter((n) => n.image), ...newsByCategory('openEducation').slice(0, 1)]

type Theme = 'light' | 'dark'
const THEME_KEY = 'hut-v6-theme'

function storedTheme(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

/**
 * V6 "Baba Taher": granite and glass.
 * The campus photograph behind a granite wash, the «میز خدمت» slab cut into its bottom
 * edge carrying search, the daily systems and the next deadline, and then a page that
 * alternates paper sections with bands of real stone.
 */
export default function BabaTaherHome() {
  const today = useToday()
  const state = useMemo(() => semesterState(semester, today), [today])
  const [theme, setTheme] = useState<Theme>(storedTheme)

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      // Storage unavailable (private mode): the choice lasts for this visit only.
    }
  }

  return (
    <div data-version="v6" data-theme={theme} id="top">
      <SkipLink />
      <Header
        name={identity.name}
        nameEn={identity.nameEn}
        sections={navSections}
        services={services}
        contactLink={link('تماس با ما')}
        loginHref={identity.loginHref}
        englishHref={identity.englishHref}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main id="main" tabIndex={-1} className={s.main}>
        <Hero
          name={identity.name}
          nameEn={identity.nameEn}
          city={identity.city}
          mission={identity.mission}
          image={identity.images.campus}
          imageAlt={identity.images.campusAlt}
          aboutHref={ABOUT_HREF}
          newStudentsHref={newStudents.href}
        />
        <ServiceDesk
          all={services}
          top={topServices.slice(0, 6)}
          allHref={SERVICES_HREF}
          calendarHref="#v6-calendar"
          semesterTitle={semester.title}
          next={state.nextMilestone}
        />

        <div className={`${s.container} ${s.section}`}>
          <NewsSection
            featured={featuredStory}
            stories={otherStories}
            notices={notices}
            categories={newsTabs}
            allNewsHref={tab('university').moreHref}
            today={today}
          />
        </div>

        <div className={s.alt}>
          <div className={`${s.container} ${s.section}`}>
            <Semester semester={semester} state={state} calendarHref={CALENDAR_HREF} />
          </div>
        </div>

        <Glance
          name={identity.name}
          mission={identity.mission}
          stats={stats}
          departments={departments}
          departmentsHref={DEPARTMENTS_HREF}
          spotlight={featuredAnnouncement}
          channel={social.find((so) => so.id === 'aparat')}
        />

        <div className={`${s.container} ${s.section}`}>
          <Achievements lead={leadAchievement} others={otherAchievements} moreHref={tab('university').moreHref} />
        </div>

        <div className={s.alt}>
          <div className={`${s.container} ${s.section}`}>
            <Learning
              items={learningItems}
              categories={newsTabs}
              units={researchUnits.slice(0, 4)}
              coursesHref={tab('openEducation').moreHref}
            />
          </div>
        </div>

        <div className={`${s.container} ${s.section}`}>
          <Welcome
            newStudentsHref={newStudents.href}
            departmentsHref={DEPARTMENTS_HREF}
            help={[
              {
                title: 'صدای شما برای ما مهم است',
                description: 'ثبت شکایت، پیشنهاد یا انتقاد در نظام پیشنهادات دانشگاه',
                href: link('نظام پیشنهادات').href,
                icon: 'forms',
              },
              {
                title: 'همراه شما در مسیر دانشگاه',
                description: `${counseling.title}: ${counseling.description}`,
                href: counseling.href,
                icon: 'counsel',
              },
            ]}
          />
        </div>
      </main>

      <Footer
        name={identity.name}
        nameEn={identity.nameEn}
        contact={contact}
        links={utilityLinks}
        services={topServices.slice(0, 6)}
        staffServices={staffServices}
        affiliates={affiliates}
        social={social}
      />
    </div>
  )
}
