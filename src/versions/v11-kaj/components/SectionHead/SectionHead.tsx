import type { ReactNode } from 'react'
import { Icon } from '../../../../shared/components/Icon'

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
    <div className="mb-l flex flex-wrap items-end justify-between gap-x-l gap-y-s">
      <div>
        <p
          className={`flex items-center gap-2.5 text-step--1 font-semibold before:block before:h-1 before:w-4.5 before:rounded-xs before:bg-accent ${onBand ? 'text-accent' : 'text-link'}`}
        >
          {kicker}
        </p>
        <h2
          id={id}
          className={`mt-2.5 mb-1.5 text-step-4 leading-[1.45] font-extrabold ${onBand ? 'text-white' : 'text-heading'}`}
        >
          {title}
        </h2>
        {lede && (
          <p className={`text-step--1 ${onBand ? 'text-on-band-muted' : 'text-text-muted'}`}>{lede}</p>
        )}
      </div>
      {more && (
        <a
          href={more.href}
          className={`inline-flex items-center gap-2 text-step--1 font-bold no-underline hover:underline ${onBand ? 'text-accent' : ''}`}
        >
          {more.label}
          <Icon name="arrow" size={16} />
        </a>
      )}
    </div>
  )
}
