import './fonts'
import './tokens.css'
import { useMemo } from 'react'
import {
  affiliates,
  contact,
  departments,
  featuredAnnouncement,
  identity,
  news,
  newsTabs,
  researchUnits,
  semester,
  serviceGroups,
  social,
  staffServices,
  stats,
  studentServices,
  utilityLinks,
} from '../../content'
import type { NewsTab } from '../../content'
import { SkipLink } from '../../shared/components/SkipLink'
import { useToday } from '../../shared/hooks/useToday'
import { semesterState } from '../../shared/utils/semester'
import { AboutBand } from './components/AboutBand/AboutBand'
import { Bulletin } from './components/Bulletin/Bulletin'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { ServiceLauncher } from './components/ServiceLauncher/ServiceLauncher'
import { WeekStrip } from './components/WeekStrip/WeekStrip'

/** Student-relevant categories first. */
const TAB_ORDER: NewsTab['id'][] = ['education', 'student', 'graduate', 'university', 'industry', 'growth', 'openEducation']
const orderedTabs = TAB_ORDER.map((id) => newsTabs.find((t) => t.id === id)!).filter(Boolean)

/**
 * V2 "Lalejin": student-portal-first.
 * Page order: service launcher → upcoming dates → featured notice + news → about the university → footer.
 */
export default function LalejinHome() {
  const today = useToday()
  const state = useMemo(() => semesterState(semester, today), [today])

  return (
    <div data-version="v2" id="top">
      <SkipLink />
      <Header
        anchors={[
          { label: 'سامانه‌ها', href: '#main' },
          { label: 'تقویم', href: '#v2-week' },
          { label: 'اطلاعیه‌ها و اخبار', href: '#news' },
          { label: 'درباره دانشگاه', href: '#about' },
        ]}
      />
      <main id="main" tabIndex={-1}>
        <ServiceLauncher
          greeting="سلام! امروز سراغ کدام سامانه می‌روید؟"
          studentServices={studentServices}
          staffServices={staffServices}
          groups={serviceGroups}
        />
        <WeekStrip state={state} calendarHref={semester.sourceHref} />
        <Bulletin featured={featuredAnnouncement} tabs={orderedTabs} items={news} />
        <AboutBand
          name={identity.name}
          mission={identity.mission}
          image={identity.images.campus}
          imageAlt={identity.images.campusAlt}
          departments={departments}
          stats={stats}
          research={researchUnits}
          aboutHref="https://hut.ac.ir/معرفی-دانشگاه"
        />
      </main>
      <Footer name={identity.name} contact={contact} utility={utilityLinks} affiliates={affiliates} social={social} />
    </div>
  )
}
