import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { useDismiss } from '../shared/hooks/useDismiss'
import { versions } from '../versions/registry'
import styles from './TokenPanel.module.css'

/**
 * Reviewer tool for live-editing a version's CSS custom properties. Not part of any design.
 * Tokens are read from the stylesheet rules that target the version root (`[data-version='vN']`,
 * including theme variants), and edits are written as inline properties on that root, so
 * derived tokens such as `--surface: var(--indigo)` follow their source. Edits persist per version.
 */

type Group = 'color' | 'type' | 'size' | 'other'

interface Token {
  name: string
  /** Declared value from the stylesheet (last matching rule wins). */
  value: string
  group: Group
  /** How many `var(--name)` references the loaded CSS contains. */
  uses: number
}

const tabs: { id: Group; label: string }[] = [
  { id: 'color', label: 'رنگ' },
  { id: 'type', label: 'حروف' },
  { id: 'size', label: 'اندازه' },
  { id: 'other', label: 'سایر' },
]

/** How many of the most-referenced tokens a tab lifts into its top section. */
const keyCount: Record<Group, number> = { color: 8, type: 4, size: 4, other: 4 }

const storageKey = (slug: string) => `hut-tokens:${slug}`

function loadOverrides(slug: string): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(storageKey(slug)) ?? '{}')
  } catch {
    return {}
  }
}

function saveOverrides(slug: string, overrides: Record<string, string>) {
  try {
    if (Object.keys(overrides).length) localStorage.setItem(storageKey(slug), JSON.stringify(overrides))
    else localStorage.removeItem(storageKey(slug))
  } catch {
    /* storage unavailable: edits still apply for this visit */
  }
}

function applyOverrides(root: HTMLElement, overrides: Record<string, string>) {
  for (const [name, value] of Object.entries(overrides)) root.style.setProperty(name, value)
}

/** Every style rule in the document, skipping @media blocks that do not currently match. */
function* styleRules(rules: CSSRuleList): Generator<CSSStyleRule> {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule) yield rule
    else if (rule instanceof CSSMediaRule) {
      if (matchMedia(rule.conditionText).matches) yield* styleRules(rule.cssRules)
    } else if (rule instanceof CSSGroupingRule) yield* styleRules(rule.cssRules)
  }
}

function allStyleRules(): CSSStyleRule[] {
  const out: CSSStyleRule[] = []
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      out.push(...styleRules(sheet.cssRules))
    } catch {
      /* cross-origin sheet */
    }
  }
  return out
}

function classify(name: string, resolved: string): Group {
  if (resolved && CSS.supports('color', resolved)) return 'color'
  if (/font|step|leading|weight|tracking/.test(name)) return 'type'
  if (/space|gap|pad|gutter|max|frame|radius|width|height|size/.test(name)) return 'size'
  return 'other'
}

function scan(root: HTMLElement, slug: string): Token[] {
  const rules = allStyleRules()
  // A compound selector on the root itself: `[data-version='v8']` or `[data-version='v8'][data-theme='dark']`.
  const own = new RegExp(`^\\[data-version=["']?${slug}["']?\\][^\\s>+~]*$`)
  const declared = new Map<string, string>()
  const uses = new Map<string, number>()

  for (const rule of rules) {
    for (const m of rule.cssText.matchAll(/var\(\s*(--[\w-]+)/g)) uses.set(m[1], (uses.get(m[1]) ?? 0) + 1)
    const targetsRoot = rule.selectorText
      .split(',')
      .map((s) => s.trim())
      .some((s) => own.test(s) && root.matches(s))
    if (!targetsRoot) continue
    for (const prop of Array.from(rule.style)) {
      if (prop.startsWith('--')) declared.set(prop, rule.style.getPropertyValue(prop).trim())
    }
  }

  const cs = getComputedStyle(root)
  return Array.from(declared, ([name, value]) => ({
    name,
    value,
    group: classify(name, cs.getPropertyValue(name).trim()),
    uses: uses.get(name) ?? 0,
  }))
}

let ctx: CanvasRenderingContext2D | null = null

/** Any CSS colour (named, rgb(), color-mix()…) as 0–255 RGBA, by painting one canvas pixel. */
function toRgba(color: string): [number, number, number, number] {
  ctx ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true })
  if (!ctx) return [0, 0, 0, 255]
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
  return [r, g, b, a]
}

const hex = (n: number) => n.toString(16).padStart(2, '0')

export function TokenPanel() {
  const { pathname } = useLocation()
  const slug = versions.find((v) => pathname === `/${v.slug}`)?.slug
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Group>('color')
  const [root, setRoot] = useState<HTMLElement | null>(null)
  const [tokens, setTokens] = useState<Token[]>([])
  const [overrides, setOverrides] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  useDismiss(panelRef, open, () => setOpen(false))

  // Find the version root once the lazy route has rendered, and restore saved edits onto it.
  useEffect(() => {
    if (!slug) return
    const saved = loadOverrides(slug)
    const attach = () => {
      const el = document.querySelector<HTMLElement>(`[data-version="${slug}"]`)
      if (!el) return false
      applyOverrides(el, saved)
      setRoot(el)
      setOverrides(saved)
      setTokens(scan(el, slug))
      return true
    }
    if (attach()) return
    const observer = new MutationObserver(() => attach() && observer.disconnect())
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [slug])

  // Re-read while open when a theme switch swaps the declared set.
  useEffect(() => {
    if (!open || !root || !slug) return
    const observer = new MutationObserver(() => setTokens(scan(root, slug)))
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] })
    return () => observer.disconnect()
  }, [open, root, slug])

  if (!slug || !root) return null

  const update = (next: Record<string, string>) => {
    setOverrides(next)
    saveOverrides(slug, next)
  }

  const setToken = (name: string, value: string | null) => {
    const next = { ...overrides }
    if (value === null) {
      delete next[name]
      root.style.removeProperty(name)
    } else {
      next[name] = value
      root.style.setProperty(name, value)
    }
    update(next)
  }

  const resetAll = () => {
    for (const name of Object.keys(overrides)) root.style.removeProperty(name)
    update({})
  }

  const copyCss = async () => {
    const body = Object.entries(overrides)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n')
    try {
      await navigator.clipboard.writeText(`[data-version='${slug}'] {\n${body}\n}\n`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard blocked */
    }
  }

  const changed = Object.keys(overrides).length

  if (!open)
    return (
      <button type="button" className={styles.toggle} onClick={() => {
          setTokens(scan(root, slug))
          setOpen(true)
        }}
        aria-label="ویرایش توکن‌های طراحی">
        <span className={styles.toggleDot} aria-hidden="true" />
        توکن‌ها
        {changed > 0 && <span className={styles.badge}>{changed.toLocaleString('fa')}</span>}
      </button>
    )

  const cs = getComputedStyle(root)
  const inTab = tokens.filter((t) => t.group === tab)
  const key = [...inTab]
    .filter((t) => t.uses > 0)
    .sort((a, b) => b.uses - a.uses)
    .slice(0, keyCount[tab])
  const rest = inTab.filter((t) => !key.includes(t))

  const row = (t: Token) => (
    <TokenRow
      key={t.name}
      token={t}
      override={overrides[t.name]}
      resolved={cs.getPropertyValue(t.name).trim()}
      onChange={(value) => setToken(t.name, value)}
    />
  )

  return (
    <div ref={panelRef} className={styles.panel} role="dialog" aria-label="توکن‌های طراحی" dir="rtl">
      <header className={styles.head}>
        <strong className={styles.title}>توکن‌های {slug}</strong>
        <button type="button" className={styles.action} onClick={copyCss} disabled={!changed}>
          {copied ? 'کپی شد' : 'کپی CSS'}
        </button>
        <button type="button" className={styles.action} onClick={resetAll} disabled={!changed}>
          بازنشانی همه
        </button>
        <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="بستن">
          ×
        </button>
      </header>

      <div className={styles.tabs} role="tablist">
        {tabs.map((t) => {
          const count = tokens.filter((k) => k.group === t.id).length
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={styles.tab}
              onClick={() => setTab(t.id)}
              disabled={!count}
            >
              {t.label}
              <span className={styles.count}>{count.toLocaleString('fa')}</span>
            </button>
          )
        })}
      </div>

      <div className={styles.body} role="tabpanel">
        {key.length > 0 && (
          <section>
            <h3 className={styles.section}>پرکاربرد</h3>
            {key.map(row)}
          </section>
        )}
        {rest.length > 0 && (
          <section>
            <h3 className={styles.section}>{key.length ? 'بقیه' : 'همه'}</h3>
            {rest.map(row)}
          </section>
        )}
        {!inTab.length && <p className={styles.empty}>توکنی در این دسته نیست.</p>}
      </div>
    </div>
  )
}

interface RowProps {
  token: Token
  override: string | undefined
  resolved: string
  onChange: (value: string | null) => void
}

function TokenRow({ token, override, resolved, onChange }: RowProps) {
  const shown = override ?? token.value
  const isColor = token.group === 'color'
  const [r, g, b, a] = isColor ? toRgba(resolved) : [0, 0, 0, 255]

  const commit = (value: string) => {
    const v = value.trim()
    if (v === shown) return
    onChange(!v || v === token.value ? null : v)
  }

  const pick = (value: string) => {
    if (a === 255) return onChange(value)
    // Keep the token's transparency; the native picker only knows opaque colours.
    const [pr, pg, pb] = [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16))
    onChange(`rgb(${pr} ${pg} ${pb} / ${+(a / 255).toFixed(2)})`)
  }

  return (
    <div className={styles.row} data-changed={override !== undefined || undefined}>
      {isColor && (
        <label className={styles.swatch} style={{ background: resolved }}>
          <input
            type="color"
            value={`#${hex(r)}${hex(g)}${hex(b)}`}
            onChange={(e) => pick(e.target.value)}
            aria-label={`رنگ ${token.name}`}
          />
        </label>
      )}
      <span className={styles.name} dir="ltr">
        {token.name}
      </span>
      <input
        key={shown}
        className={styles.value}
        dir="ltr"
        defaultValue={shown}
        title={resolved !== shown ? resolved : undefined}
        spellCheck={false}
        aria-label={`مقدار ${token.name}`}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && commit(e.currentTarget.value)}
      />
      {override !== undefined && (
        <button type="button" className={styles.reset} onClick={() => onChange(null)} aria-label={`بازنشانی ${token.name}`} title={token.value}>
          ↺
        </button>
      )}
    </div>
  )
}
