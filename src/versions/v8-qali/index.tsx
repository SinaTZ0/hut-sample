import './fonts'
import './tokens.css'
import { useMemo } from 'react'
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
  staffServices,
  stats,
  studentServices,
  topServices,
  utilityLinks,
} from '../../content'
import type { NewsItem, NewsTab } from '../../content'
import { SkipLink } from '../../shared/components/SkipLink'
import { useToday } from '../../shared/hooks/useToday'
import { semesterState } from '../../shared/utils/semester'
import { Footer } from './components/Footer/Footer'
import { Glance } from './components/Glance/Glance'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Join } from './components/Join/Join'
import { News } from './components/News/News'
import { Research } from './components/Research/Research'
import { Term } from './components/Term/Term'
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
const leadStory = stories.find((n) => n.summary) ?? stories[0]
const otherStories = stories.filter((n) => n !== leadStory).slice(0, 3)

const notices = (['education', 'graduate', 'student'] as const).map((id) => ({
  tab: tab(id),
  items: [...newsByCategory(id)].sort(byDateDesc),
}))

const leadAchievement = achievements.find((a) => a.id === 'ach-journal')!
const otherAchievements = ['ach-sports', 'ach-rock-book', 'ach-smart-city'].map((id) => achievements.find((a) => a.id === id)!)

const courses = [...newsByCategory('growth'), ...newsByCategory('openEducation').slice(0, 2)].slice(0, 4)

/**
 * V8 "Qali": the Hamedan village rug.
 * The page is the indigo warp and every block is a compartment knotted onto it in madder, indigo,
 * weld or white, edge to edge. The first screen is the rug's field: the name, the full-colour campus
 * photo, the next deadline and the six daily systems, framed above by the woven border.
 */
export default function QaliHome() {
  const today = useToday()
  const state = useMemo(() => semesterState(semester, today), [today])

  return (
    <div data-version="v8" id="top">
      <SkipLink />
      <Header
        name={identity.name}
        nameEn={identity.nameEn}
        sections={navSections}
        services={services}
        contactLink={link('تماس با ما')}
        loginHref={identity.loginHref}
        englishHref={identity.englishHref}
      />
      <div className={s.borderBand} aria-hidden="true">
        <div className={s.border} />
      </div>

      <main id="main" tabIndex={-1} className={s.main}>
        <div className={s.rug}>
          <Hero
            name={identity.name}
            city={identity.city}
            mission={identity.mission}
            image={identity.images.campus}
            imageAlt={identity.images.campusAlt}
            aboutHref={ABOUT_HREF}
            newStudentsHref={newStudents.href}
            services={topServices.slice(0, 6)}
            serviceCount={studentServices.length}
            allServicesHref={SERVICES_HREF}
            calendarHref="#v8-calendar"
            next={state.nextMilestone}
          />

          <News
            featured={leadStory}
            stories={otherStories}
            notices={notices}
            categories={newsTabs}
            allNewsHref={tab('university').moreHref}
            today={today}
          />

          <Term semester={semester} state={state} calendarHref={CALENDAR_HREF} />

          <Glance stats={stats} departments={departments} departmentsHref={DEPARTMENTS_HREF} spotlight={featuredAnnouncement} />

          <Research
            lead={leadAchievement}
            others={otherAchievements}
            units={researchUnits}
            moreHref={tab('university').moreHref}
          />

          <Join
            courses={courses}
            categories={newsTabs}
            coursesHref={tab('openEducation').moreHref}
            newStudentsHref={newStudents.href}
            newStudentsText={newStudents.description}
            departmentsHref={DEPARTMENTS_HREF}
            help={[
              {
                title: 'صدای شما برای ما مهم است',
                description: 'ثبت شکایت، پیشنهاد یا انتقاد در نظام پیشنهادات دانشگاه',
                href: link('نظام پیشنهادات').href,
                icon: 'forms',
              },
              {
                title: counseling.title,
                description: counseling.description,
                href: counseling.href,
                icon: 'counsel',
              },
            ]}
          />
        </div>
      </main>

      <div className={s.borderBand} aria-hidden="true">
        <div className={s.border} />
      </div>
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
