import { Fragment } from 'react'
import type { Stat } from '../../../../content'
import { faNumber } from '../../../../shared/utils/fa'
import s from './Glance.module.css'

interface GlanceProps {
  lead: string
  stats: Stat[]
}

/** Figures set inline as one sentence rather than a row of counters. */
export function Glance({ lead, stats }: GlanceProps) {
  return (
    <section aria-labelledby="v1-glance" className={s.band}>
      <h2 id="v1-glance" className="visually-hidden">
        دانشگاه در یک نگاه
      </h2>
      <p className={s.sentence}>
        {lead}{' '}
        {stats.map((st, i) => (
          <Fragment key={st.label}>
            {i > 0 && (i === stats.length - 1 ? ' و ' : '، ')}
            <span className={s.stat}>
              <span className={s.num}>
                {faNumber(st.value)}
                {st.suffix === '+' && (
                  <>
                    <span aria-hidden="true">+</span>
                    <span className="visually-hidden"> و بیشتر</span>
                  </>
                )}
              </span>{' '}
              {st.label}
            </span>
          </Fragment>
        ))}
        .
      </p>
    </section>
  )
}
