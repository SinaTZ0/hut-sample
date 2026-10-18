import { startTransition, useId, useState, ViewTransition } from 'react'
import type { Service } from '../../../../content'
import { ExternalLink } from '../../../../shared/components/ExternalLink'
import { Icon } from '../../../../shared/components/Icon'
import { faDigits } from '../../../../shared/utils/fa'

/*
 * Seams are borders on every cell, pulled 1px out so the outer ones fall outside the card's clip.
 * Borders snap to whole pixels; 1px grid gaps between fractional columns render blurred or doubled.
 */
const seam = '-mt-px -ms-px border-t border-s border-line'
const item =
  // the cells carry the white, not the rail, so none shows round the dark cell's clipped corner
  'flex h-full flex-col items-center gap-1 bg-surface px-3 pt-[22px] pb-5 text-center text-text no-underline transition-colors duration-200 hover:bg-chip'
const cell =
  'grid h-full grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 bg-surface px-5 py-4.5 text-text no-underline transition-colors duration-200 focus-visible:-outline-offset-4'

interface ServiceBarProps {
  services: Service[]
  /** The rest of the student systems, opened below the rail by its last cell. */
  moreServices: Service[]
  serviceCount: number
  allServicesHref: string
}

/** The daily systems, as one white rail that overlaps the bottom of the hero. */
export function ServiceBar({ services, moreServices, serviceCount, allServicesHref }: ServiceBarProps) {
  const panelId = useId()
  const [open, setOpen] = useState(false)

  // A transition, so the panel's <ViewTransition> opens it (see v11-open in tokens.css).
  const toggle = () => startTransition(() => setOpen((o) => !o))

  return (
    <nav id="v11-services" aria-labelledby="v11-services-title" className="relative z-2 flex flex-col md:flex-col-reverse">
      <h2 id="v11-services-title" className="visually-hidden">
        سامانه‌های پرکاربرد
      </h2>
      {/* its own group, so it slides if the open list ever pushes it down (v11-slide) */}
      <ViewTransition default="v11-slide">
        <ul role="list" className="grid grid-cols-2 overflow-hidden rounded-md shadow-card sm:grid-cols-3 lg:grid-cols-6">
          {services.map((sv) => (
            <li key={sv.id} className={seam}>
              <ExternalLink href={sv.href} newTab className={item}>
                <Icon name={sv.icon} size={24} className="mb-1.5 text-link" />
                <span className="text-step-0 font-bold text-heading">{sv.title}</span>
                <span className="line-clamp-1 overflow-hidden text-step--2 leading-[1.7] text-text-muted sm:line-clamp-2">{sv.description}</span>
              </ExternalLink>
            </li>
          ))}
          <li className={seam}>
            <button
              type="button"
              className="group/all flex size-full cursor-pointer flex-col items-center justify-center gap-1 bg-band px-3 pt-[22px] pb-5 text-center text-on-band transition-colors duration-200 hover:bg-band-deep focus-visible:-outline-offset-4 aria-expanded:bg-band-deep"
              aria-expanded={open}
              aria-controls={open ? panelId : undefined}
              onClick={toggle}
            >
              <Icon name="menu" size={24} className="mb-1.5 text-accent" />
              <span className="text-step-0 font-bold text-inherit">{open ? 'بستن فهرست' : <>همه {faDigits(serviceCount)} سامانه</>}</span>
              <Icon
                name="arrow"
                size={18}
                className="-rotate-90 text-accent transition-[rotate] duration-300 ease-in-out group-aria-expanded/all:rotate-90 md:rotate-90 md:group-aria-expanded/all:-rotate-90"
              />
            </button>
          </li>
        </ul>
      </ViewTransition>

      {open && (
        <ViewTransition enter="v11-open" exit="v11-open">
          <div id={panelId} className="mt-s md:mt-0 md:mb-s">
            <ul role="list" className="grid grid-cols-1 overflow-hidden rounded-md sm:grid-cols-2 lg:grid-cols-4">
              {moreServices.map((sv) => (
                <li key={sv.id} className={seam}>
                  <ExternalLink href={sv.href} newTab className={`${cell} hover:bg-chip`}>
                    <Icon name={sv.icon} size={22} className="row-span-2 mt-0.5 text-link" />
                    <span className="text-step--1 font-bold text-heading">{sv.title}</span>
                    <span className="text-step--2 leading-[1.7] text-text-muted">{sv.description}</span>
                  </ExternalLink>
                </li>
              ))}
              <li className={`${seam} sm:col-span-2`}>
                <a
                  href={allServicesHref}
                  className="flex h-full items-center justify-between bg-band px-5 py-4.5 font-extrabold text-on-band no-underline transition-colors duration-200 hover:bg-band-deep focus-visible:-outline-offset-4"
                >
                  راهنمای همه سامانه‌ها
                  <Icon name="arrow" size={18} className="text-accent" />
                </a>
              </li>
            </ul>
          </div>
        </ViewTransition>
      )}
    </nav>
  )
}
