import type { ReactNode } from 'react'
import { Icon } from '../../../../shared/components/Icon'
import s from './SectionHead.module.css'

interface SectionHeadProps {
  id: string
  title: ReactNode
  lede?: string
  more?: { label: string; href: string }
  /** Light text for the granite bands. */
  onBand?: boolean
}

/**
 * Heading, one line of context, and the section's "see all" link.
 * No kicker above the heading: if a label is worth printing it belongs in the heading.
 */
export function SectionHead({ id, title, lede, more, onBand }: SectionHeadProps) {
  return (
    <div className={s.head} data-on-band={onBand || undefined}>
      <div className={s.text}>
        <h2 id={id} className={s.title}>
          {title}
        </h2>
        {lede && <p className={s.lede}>{lede}</p>}
      </div>
      {more && (
        <a href={more.href} className={s.more}>
          {more.label}
          <Icon name="arrow" size={15} />
        </a>
      )}
    </div>
  )
}
