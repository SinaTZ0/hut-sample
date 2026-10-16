import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react'

export interface TabDef {
  id: string
  label: ReactNode
}

interface TabsProps {
  tabs: TabDef[]
  active: string
  onChange: (id: string) => void
  /** Accessible name of the tab list. */
  label: string
  classNames?: { list?: string; tab?: string }
  children: (activeId: string, panelProps: { id: string; role: 'tabpanel'; 'aria-labelledby': string; tabIndex: 0 }) => ReactNode
}

/**
 * Headless, accessible tabs (WAI-ARIA tabs pattern, RTL-aware arrow keys).
 * Each version supplies its own class names; behaviour is shared.
 */
export function Tabs({ tabs, active, onChange, label, classNames, children }: TabsProps) {
  const base = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: KeyboardEvent, i: number) => {
    const rtl = getComputedStyle(e.currentTarget).direction === 'rtl'
    const step = { ArrowLeft: rtl ? 1 : -1, ArrowRight: rtl ? -1 : 1 }[e.key as 'ArrowLeft' | 'ArrowRight']
    let next = i
    if (step) next = (i + step + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    else return
    e.preventDefault()
    onChange(tabs[next].id)
    refs.current[next]?.focus()
  }

  return (
    <>
      <div role="tablist" aria-label={label} className={classNames?.list}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${t.id}`}
            aria-selected={t.id === active}
            aria-controls={`${base}-panel`}
            tabIndex={t.id === active ? 0 : -1}
            className={classNames?.tab}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {children(active, { id: `${base}-panel`, role: 'tabpanel', 'aria-labelledby': `${base}-tab-${active}`, tabIndex: 0 })}
    </>
  )
}
