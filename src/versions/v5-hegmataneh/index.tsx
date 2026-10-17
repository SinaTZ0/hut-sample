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
  stats,
  staffServices,
  topServices,
  utilityLinks,
} from '../../content'
import type { NewsItem, NewsTab } from '../../content'
import { SkipLink } from '../../shared/components/SkipLink'
import { useToday } from '../../shared/hooks/useToday'
import { semesterState } from '../../shared/utils/semester'
import { Events } from './components/Events/Events'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Horizon } from './components/Horizon/Horizon'
import { Institution } from './components/Institution/Institution'
import { News } from './components/News/News'
import { Notices } from './components/Notices/Notices'
import { Services } from './components/Services/Services'
import { Term } from './components/Term/Term'
import { Welcome } from './components/Welcome/Welcome'
import { Work } from './components/Work/Work'
import s from './page.module.css'

const tab = (id: NewsTab['id']) => newsTabs.find((t) => t.id === id)!
const byDateDesc = (a: NewsItem, b: NewsItem) => (b.date ?? '').localeCompare(a.date ?? '')
const link = (label: string) => utilityLinks.find((l) => l.label === label)!

const CALENDAR_HREF = 'https://hut.ac.ir/web/edu/تقویم-آموزشی'
const DEPARTMENTS_HREF = 'https://hut.ac.ir/groups'
const ABOUT_HREF = navSections.find((n) => n.id === 'about')!.href
const SERVICES_HREF = navSections.find((n) => n.id === 'services')!.href
const RESEARCH_HREF = navSections.find((n) => n.id === 'research')!.href
const newStudents = serviceById('new-students')!
const counseling = serviceById('counseling')!

// Stories with a photograph of their own; the one that also has a summary leads.
const stories = newsByCategory('university').filter((n) => n.image && n.image !== identity.images.campus)
const featuredStory = stories.find((n) => n.summary) ?? stories[0]
const otherStories = stories.filter((n) => n !== featuredStory).slice(0, 2)

const noticeGroups = (['education', 'graduate', 'student'] as const).map((id) => ({
  tab: tab(id),
  items: [...newsByCategory(id)].sort(byDateDesc).slice(0, 5),
}))

const leadAchievement = achievements.find((a) => a.id === 'ach-journal')!
const otherAchievements = ['ach-sports', 'ach-smart-city'].map((id) => achievements.find((a) => a.id === id)!)

const eventItems = [...newsByCategory('growth').filter((n) => n.image), ...newsByCategory('openEducation')].slice(0, 3)

/**
 * V5 "Hegmataneh": a section through the mound.
 * The dusk photograph is the sky; the horizon bar carries today; above the crossover lie the
 * surface strata — everything that changes — and below it the deep strata of the institution
 * itself, down to the bedrock of the footer.
 */
export default function HegmatanehHome() {
  const today = useToday()
  const state = useMemo(() => semesterState(semester, today), [today])

  return (
    <div data-version="v5" id="top">
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

      <main id="main" tabIndex={-1} className={s.main}>
        {/* ── the sky ─────────────────────────────────────────── */}
        <Hero
          name={identity.name}
          nameEn={identity.nameEn}
          city={identity.city}
          mission={identity.mission}
          image={identity.images.campusDusk}
          imageAlt={identity.images.campusAlt}
          aboutHref={ABOUT_HREF}
          newStudentsHref={newStudents.href}
        />
        <Horizon today={today} semester={semester} next={state.nextMilestone} calendarHref="#v5-calendar" />

        {/* ── surface strata: everything that changes ─────────── */}
        <div className={s.surface}>
          <div className={`${s.container} ${s.section}`}>
            <Services services={topServices.slice(0, 7)} allHref={SERVICES_HREF} staffHref={SERVICES_HREF} />
          </div>
        </div>

        <div className={s.clay}>
          <div className={`${s.container} ${s.section}`}>
            <Notices groups={noticeGroups} featured={featuredAnnouncement} allHref={tab('education').moreHref} />
          </div>
        </div>

        <div className={s.surface}>
          <div className={`${s.container} ${s.section}`}>
            <News
              featured={featuredStory}
              stories={otherStories}
              categories={newsTabs}
              allHref={tab('university').moreHref}
            />
          </div>
        </div>

        <div className={s.clay}>
          <div className={`${s.container} ${s.section}`}>
            <Term semester={semester} state={state} calendarHref={CALENDAR_HREF} />
          </div>
        </div>

        {/* ── the crossover: from what changes to what doesn't ── */}
        <div className={s.crossover} />

        <Institution
          name={identity.name}
          mission={identity.mission}
          stats={stats}
          departments={departments}
          departmentsHref={DEPARTMENTS_HREF}
          aboutHref={ABOUT_HREF}
          spotlight={featuredAnnouncement}
          channel={social.find((so) => so.id === 'aparat')}
        />

        {/* ── bedrock-deep: the work, and the way in ──────────── */}
        <div className={s.deeper} data-deep>
          <div className={`${s.container} ${s.section}`}>
            <Work
              units={researchUnits}
              researchHref={RESEARCH_HREF}
              lead={leadAchievement}
              others={otherAchievements}
              achievementsHref={tab('university').moreHref}
            />
            <Events items={eventItems} categories={newsTabs} moreHref={tab('openEducation').moreHref} />
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
