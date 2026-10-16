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
  newsByCategory,
  newsTabs,
  researchUnits,
  semester,
  social,
  staffServices,
  stats,
  topServices,
  utilityLinks,
} from '../../content'
import { SkipLink } from '../../shared/components/SkipLink'
import { useToday } from '../../shared/hooks/useToday'
import { semesterState } from '../../shared/utils/semester'
import { Footer } from './components/Footer/Footer'
import { Glance } from './components/Glance/Glance'
import { Hero } from './components/Hero/Hero'
import { Masthead } from './components/Masthead/Masthead'
import { NewsSection } from './components/NewsSection/NewsSection'
import { Notices } from './components/Notices/Notices'
import { Research } from './components/Research/Research'
import { StaffStrip } from './components/StaffStrip/StaffStrip'
import s from './page.module.css'

const PORTAL_ID = 'v1-portal'

/**
 * V1 "Ganjnameh": public-first and authoritative.
 * Page order: identity + gateway tablets → notices & calendar → news → research → figures → staff → footer.
 */
export default function GanjnamehHome() {
  const today = useToday()
  const state = useMemo(() => semesterState(semester, today), [today])

  return (
    <div data-version="v1" id="top">
      <SkipLink />
      <Masthead
        portalHref={`#${PORTAL_ID}`}
        utility={[
          { label: 'نودانشجویان', href: 'https://edu.hut.ac.ir/ngs1403' },
          { label: 'تماس با ما', href: 'https://hut.ac.ir/ارتباط-با-ما' },
          { label: 'دفترچه تلفن', href: 'https://hut.ac.ir/تلفن-داخلی' },
          { label: 'کانال ایتا', href: 'https://eitaa.com/info_hut' },
        ]}
      />

      <main id="main" tabIndex={-1}>
        <Hero
          name={identity.name}
          mission={identity.mission}
          image={identity.images.campus}
          imageAlt={identity.images.campusAlt}
          departments={departments}
          services={topServices.slice(0, 6)}
          allServicesHref="https://hut.ac.ir/سامانه-های-دانشجویی"
          nextDeadline={state.nextMilestone}
          portalId={PORTAL_ID}
        />

        <div className={s.container}>
          <div className={s.section}>
            <Notices
              featured={featuredAnnouncement}
              announcements={newsByCategory('education').slice(0, 5)}
              moreHref="https://hut.ac.ir/web/hut/اطلاعیه-ها"
              semesterTitle={semester.title}
              semesterCode={semester.code}
              calendarHref={semester.sourceHref}
              state={state}
            />
          </div>

          <div className={s.section}>
            <NewsSection tabs={newsTabs} items={news} />
          </div>

          <div className={s.section}>
            <Research
              units={researchUnits}
              achievements={achievements.filter((a) => a.id !== 'ach-top2').slice(0, 4)}
              achievementsHref="https://hut.ac.ir/دستاوردهاو-افتخارات"
            />
          </div>
        </div>

        <Glance lead={`${identity.name} امروز:`} stats={stats} />

        <div className={s.container}>
          <StaffStrip services={staffServices} />
        </div>
      </main>

      <Footer
        name={identity.name}
        image={identity.images.campusDusk}
        contact={contact}
        utility={utilityLinks}
        affiliates={affiliates}
        social={social}
      />
    </div>
  )
}
