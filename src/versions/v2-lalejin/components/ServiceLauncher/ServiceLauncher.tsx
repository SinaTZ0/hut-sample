import { useMemo, useState } from 'react'
import type { Service, ServiceGroup, ServiceGroupId } from '../../../../content'
import { Icon } from '../../../../shared/components/Icon'
import { useServiceSearch } from '../../../../shared/hooks/useServiceSearch'
import { faNumber } from '../../../../shared/utils/fa'
import { Tile } from '../Tile/Tile'
import s from './ServiceLauncher.module.css'

type Audience = 'student' | 'staff'

interface ServiceLauncherProps {
  greeting: string
  studentServices: Service[]
  staffServices: Service[]
  groups: ServiceGroup[]
}

/**
 * Hero of V2: a service launcher. Search filters the mosaic live;
 * group chips narrow it further; the audience switch swaps in staff systems.
 */
export function ServiceLauncher({ greeting, studentServices, staffServices, groups }: ServiceLauncherProps) {
  const [audience, setAudience] = useState<Audience>('student')
  const [group, setGroup] = useState<ServiceGroupId | 'all'>('all')
  const pool = audience === 'student' ? studentServices : staffServices
  const { query, setQuery, results, isFiltering } = useServiceSearch(pool)

  // Most-used services first, so the large tiles lead the mosaic.
  const visible = useMemo(
    () =>
      (group === 'all' || audience === 'staff' ? results : results.filter((r) => r.group === group)).toSorted(
        (a, b) => a.priority - b.priority,
      ),
    [results, group, audience],
  )
  const studentGroups = groups.filter((g) => g.id !== 'staff')

  return (
    <section aria-labelledby="v2-launcher" className={s.launcher}>
      <div className={s.intro}>
        <h1 id="v2-launcher" className={s.greeting}>
          {greeting}
        </h1>
        <div className={s.audience} role="group" aria-label="نمایش سامانه‌های">
          {(['student', 'staff'] as const).map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={audience === a}
              onClick={() => {
                setAudience(a)
                setGroup('all')
              }}
            >
              {a === 'student' ? 'دانشجو' : 'کارکنان و اساتید'}
            </button>
          ))}
        </div>
      </div>

      <div className={s.searchRow}>
        <label className={s.search}>
          <Icon name="search" size={22} className={s.searchIcon} />
          <span className="visually-hidden">جست‌وجوی سامانه‌ها</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="مثلاً انتخاب واحد، غذا یا وام"
            autoComplete="off"
            enterKeyHint="search"
          />
        </label>
      </div>

      {audience === 'student' && (
        <div className={s.groups} role="group" aria-label="دسته سامانه‌ها">
          <button type="button" aria-pressed={group === 'all'} onClick={() => setGroup('all')}>
            همه
          </button>
          {studentGroups.map((g) => (
            <button key={g.id} type="button" aria-pressed={group === g.id} data-group={g.id} onClick={() => setGroup(g.id)}>
              <span className={s.swatch} aria-hidden="true" />
              {g.title}
            </button>
          ))}
        </div>
      )}

      <p className={s.status} aria-live="polite">
        {isFiltering || group !== 'all' ? `${faNumber(visible.length)} سامانه` : ''}
      </p>

      {visible.length ? (
        <ul role="list" className={s.mosaic}>
          {visible.map((svc) => (
            <Tile key={svc.id} service={svc} />
          ))}
        </ul>
      ) : (
        <div className={s.empty}>
          <p>
            سامانه‌ای با «{query}» پیدا نشد. واژه کوتاه‌تری مثل «گلستان»، «غذا» یا «وام» را امتحان کنید، یا{' '}
            <a href="https://hut.ac.ir/سامانه-ها">فهرست کامل سامانه‌ها</a> را ببینید.
          </p>
          <button type="button" onClick={() => setQuery('')}>
            پاک کردن جست‌وجو
          </button>
        </div>
      )}
    </section>
  )
}
