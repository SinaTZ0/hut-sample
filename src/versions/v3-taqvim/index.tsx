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
  news,
  newsTabs,
  researchUnits,
  semester,
  social,
  stats,
  topServices,
  utilityLinks,
} from '../../content'
import type { NewsTab } from '../../content'
import { SkipLink } from '../../shared/components/SkipLink'
import { useToday } from '../../shared/hooks/useToday'
import { daysBetween } from '../../shared/utils/jalali'
import { semesterState } from '../../shared/utils/semester'
import { Feed } from './components/Feed/Feed'
import { Footer } from './components/Footer/Footer'
import { Institution } from './components/Institution/Institution'
import { NowRail } from './components/NowRail/NowRail'
import { SemesterTimeline } from './components/SemesterTimeline/SemesterTimeline'
import { TopBar } from './components/TopBar/TopBar'
import s from './page.module.css'

const TAB_ORDER: NewsTab['id'][] = ['education', 'graduate', 'student', 'university', 'industry', 'growth', 'openEducation']
const orderedTabs = TAB_ORDER.map((id) => newsTabs.find((t) => t.id === id)!).filter(Boolean)

/** Teaching week from "classes start" to "classes end", or undefined outside that window. */
function teachingWeek(today: readonly [number, number, number]) {
  const start = semester.events.find((e) => e.id === 'classes-start')?.start
  const end = semester.events.find((e) => e.id === 'classes-end')?.start
  if (!start || !end) return undefined
  const elapsed = daysBetween(start, today)
  const total = Math.ceil(daysBetween(start, end) / 7)
  if (elapsed < 0 || elapsed > daysBetween(start, end)) return undefined
  return { current: Math.floor(elapsed / 7) + 1, total }
}

/**
 * V3 "Taqvim": time-first.
 * Layout: sticky "now" rail beside a main column of timeline → feed → institution.
 */
export default function TaqvimHome() {
  const today = useToday()
  const state = useMemo(() => semesterState(semester, today), [today])
  const week = useMemo(() => teachingWeek(today), [today])

  return (
    <div data-version="v3" id="top">
      <SkipLink />
      <TopBar servicesHref="#v3-services" />
      <div className={s.layout}>
        <NowRail
          today={today}
          week={week}
          next={state.next}
          services={topServices.slice(0, 5)}
          allServicesHref="https://hut.ac.ir/سامانه-های-دانشجویی"
          staffServicesHref="https://hut.ac.ir/سامانه-های-کارکنان-و-اساتید"
        />
        <main id="main" tabIndex={-1} className={s.main}>
          <SemesterTimeline semester={semester} state={state} />
          <Feed tabs={orderedTabs} items={news} featured={featuredAnnouncement} />
          <Institution
            name={identity.name}
            nameEn={identity.nameEn}
            mission={identity.mission}
            image={identity.images.campus}
            imageAlt={identity.images.campusAlt}
            departments={departments}
            stats={stats}
            research={researchUnits}
            achievements={achievements.slice(0, 5)}
          />
        </main>
      </div>
      <Footer name={identity.name} contact={contact} utility={utilityLinks} affiliates={affiliates} social={social} />
    </div>
  )
}
