import type { ReactNode } from 'react'
import { Icon } from '../../../../shared/components/Icon'
import s from './SectionHead.module.css'

interface SectionHeadProps {
  id: string
  kicker: string
  title: ReactNode
  lede?: string
  more?: { label: string; href: string }
  /** Light text for the pine bands. */
  onBand?: boolean
}

/** Gold dash + kicker, heading and one line of context; the section's "see all" link sits at the far end. */
export function SectionHead({ id, kicker, title, lede, more, onBand }: SectionHeadProps) {
  return (
    <div className={s.head} data-on-band={onBand || undefined}>
      <div>
        <p className={s.kicker}>{kicker}</p>
        <h2 id={id} className={s.title}>
          {title}
        </h2>
        {lede && <p className={s.lede}>{lede}</p>}
      </div>
      {more && (
        <a href={more.href} className={s.more}>
          {more.label}
          <Icon name="arrow" size={16} />
        </a>
      )}
    </div>
  )
}
