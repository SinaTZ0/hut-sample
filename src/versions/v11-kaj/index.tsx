import './fonts'
import './tokens.css'
import { useMemo, useState, ViewTransition } from 'react'
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
  studentServices,
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
import { ServiceBar } from './components/ServiceBar/ServiceBar'
import { Welcome } from './components/Welcome/Welcome'

const tab = (id: NewsTab['id']) => newsTabs.find((t) => t.id === id)!
const byDateDesc = (a: NewsItem, b: NewsItem) => (b.date ?? '').localeCompare(a.date ?? '')
const link = (label: string) => utilityLinks.find((l) => l.label === label)!

/** Centred content column used by every section. */
const container = 'mx-auto max-w-page px-gutter'
const section = 'py-xl'
/** The middle run (achievements, courses, welcome) is card-heavy, so it gets more air. */
const roomy = 'py-[calc(var(--space-xl)+var(--space-m))]'

const CALENDAR_HREF = 'https://hut.ac.ir/web/edu/تقویم-آموزشی'
const DEPARTMENTS_HREF = 'https://hut.ac.ir/groups'
const ABOUT_HREF = navSections.find((n) => n.id === 'about')!.href
const research = navSections.find((n) => n.id === 'research')!
const RESEARCH = { label: `صفحه ${research.title}`, href: research.href }
const SERVICES_HREF = navSections.find((n) => n.id === 'services')!.href

// Five daily systems on the rail; the sixth cell opens the rest below it.
const railServices = topServices.slice(0, 5)
const moreServices = studentServices.filter((sv) => !railServices.includes(sv))
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

const achievementTags: Record<string, string> = {
  'ach-journal': 'دستاورد پژوهشی',
  'ach-sports': 'افتخار دانشجویی',
  'ach-smart-city': 'دانشگاه و شهر',
}

const learningItems = [...newsByCategory('growth').filter((n) => n.image), ...newsByCategory('openEducation').slice(0, 1)]
const growthCentre = { label: 'مرکز رشد و کارآفرینی', href: tab('growth').moreHref }

type Theme = 'light' | 'dark'
const THEME_KEY = 'hut-v11-theme'

function storedTheme(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

/**
 * V11 "Kaj": V4's front door, finished. The same pine and wheat-gold on the Alvand photograph,
 * with the daily systems as one even rail, a lead story set beside its photo, a video-led glance
 * band with hairline figures, photo-led achievements and courses, and a quieter three-column footer.
 */
export default function KajHome() {
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
    <div data-version="v11" data-theme={theme} id="top">
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

      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero
          name={identity.name}
          city={identity.city}
          image={identity.images.campusHero}
          imageAlt={identity.images.campusHeroAlt}
          aboutHref={ABOUT_HREF}
          newStudentsHref={newStudents.href}
          semesterTitle={semester.title}
          calendarHref="#v11-calendar"
          next={state.nextMilestone}
        >
          <ServiceBar
            services={railServices}
            moreServices={moreServices}
            serviceCount={studentServices.length}
            allServicesHref={SERVICES_HREF}
          />
        </Hero>

        {/* When the systems panel opens, these slide down to their new place instead of jumping. */}
        <ViewTransition default="v11-slide">
          <div className={`${container} ${section}`}>
            <NewsSection
              featured={featuredStory}
              stories={otherStories}
              notices={notices}
              categories={newsTabs}
              allNewsHref={tab('university').moreHref}
              today={today}
            />
          </div>
        </ViewTransition>

        <ViewTransition default="v11-slide">
          <div className="border-block border-line bg-bg-alt">
            <div className={`${container} ${section}`}>
              <Semester semester={semester} state={state} calendarHref={CALENDAR_HREF} />
            </div>
          </div>
        </ViewTransition>

        <Glance
          name={identity.name}
          mission={identity.mission}
          stats={stats}
          departments={departments}
          departmentsHref={DEPARTMENTS_HREF}
          spotlight={featuredAnnouncement}
          channel={social.find((so) => so.id === 'aparat')}
        />

        <div className={`${container} ${roomy}`}>
          <Achievements
            lead={leadAchievement}
            others={otherAchievements}
            tags={achievementTags}
            units={researchUnits.slice(0, 4)}
            research={RESEARCH}
            moreHref={tab('university').moreHref}
          />
        </div>

        <div className="border-block border-line bg-bg-alt">
          <div className={`${container} ${roomy}`}>
            <Learning items={learningItems} categories={newsTabs} centre={growthCentre} />
          </div>
        </div>

        <div className={`${container} ${roomy}`}>
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
