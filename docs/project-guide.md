# Project guide

How this project is put together and how to extend it, especially how to add a new design version.
For the design rationale (audit, information architecture, the concepts) see [`redesign-plan.md`](redesign-plan.md),
and for the taste the versions are judged against, [`design-profile.md`](design-profile.md).

---

## 1. What this project is

A Vite + React 19 + TypeScript sandbox with several homepage redesigns for **Hamedan University of Technology** (`hut.ac.ir`, currently on Liferay).
The site is Persian and right-to-left.

The project has three layers:

```
 hut.ac.ir ──scrape──▶ archive/            reference snapshot (never imported by the app)
                          │ curated by hand
                          ▼
                     src/content/          ONE typed content layer (text, links, dates, images)
                          │ props
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
   versions/v1-…    versions/v2-…    versions/v3-…     each version = its own components + tokens
```

The rule that keeps this manageable: **versions never own data.** Every version renders the same content from `src/content/`, so the versions differ only in priority, layout and visual language.

---

## 2. Running it

```sh
pnpm install
pnpm dev            # http://localhost:5173
pnpm lint           # oxlint
pnpm build          # tsc -b && vite build
pnpm preview        # serve the production build
```

| URL | What |
|---|---|
| `/` | Gallery of all registered versions |
| `/v1` … `/v6` | The versions |
| `?today=1405-09-28` | Pretend today is that Jalali date (calendar widgets, the V3 timeline, "next deadline") |

A small floating bar on every version page switches between versions and keeps the `?today=` parameter. It belongs to the review tooling, not to any design (`src/app/VersionBar.tsx`).

---

## 3. Folder map

```
archive/                      scraped snapshot of hut.ac.ir
  raw/*.html                  untouched HTML of 7 pages
  catalog.json                structured extraction (nav, sections, calendar, stats, contact…)
  media/ + media.json         82 images and their original URLs
  documents/                  official semester-4051 calendar (PNG + PDF)
  article-titles.json         full titles for items the old site truncated
  INVENTORY.md                human-readable catalog + service-link audit
scripts/scrape/scrape.mjs     the archiver
docs/                         this guide + redesign-plan.md
src/
  main.tsx                    mounts <RouterProvider>
  index.css                   global reset + a11y hooks (no visual identity)
  app/
    routes.tsx                "/" + one lazy route per registered version
    Shell.tsx                 <Outlet/> + VersionBar + ScrollRestoration
    VersionBar.tsx            reviewer switcher
  pages/VersionGallery/       the "/" page
  content/                    ◀ all university data lives here
  shared/                     behaviour shared by versions (no styling)
  assets/hut/                 images used by the app (copied from archive/media)
  versions/
    registry.ts               ◀ list of versions
    v1-ganjnameh/
    v2-lalejin/
    v3-taqvim/
```

---

## 4. The content layer (`src/content/`)

Import everything from `src/content` (the `index.ts` re-exports it all).

| File | Exports | Notes |
|---|---|---|
| `types.ts` | `Service`, `NewsItem`, `CalendarEvent`, `JDate`, `NavSection`, `Stat`… | The content model. Change the shape here first. |
| `ia.ts` | `navSections`, `publicNav`, `portalNav` | Information architecture: the public lane and the portal lane. |
| `services.ts` | `services`, `studentServices`, `staffServices`, `topServices`, `serviceGroups` | `priority` 1 = daily, 2 = weekly, 3 = occasional. `group` sets the task group. |
| `calendar.ts` | `semester` | Jalali dates as `[year, month, day]`. `milestone: true` events appear on compact timelines. |
| `news.ts` | `news`, `newsTabs`, `newsByCategory()`, `featuredAnnouncement`, `achievements` | `category` drives the tab filters. |
| `site.ts` | `identity`, `stats`, `departments`, `researchUnits`, `contact`, `social`, `utilityLinks`, `affiliates` | `identity.logo` is a **white** PNG; render it with `<LogoMark>`. |

### Common edits

- **New semester:** replace the `events` in `calendar.ts` (and update `code`, `title` and `sourceHref`). The status of each event (past, in progress, "N days left") is computed, never stored.
- **New service:** add an entry to `services`. Pick an `IconName` that exists in `shared/components/Icon.tsx`, or add a path there.
- **New news item:** add it to `news` with the right `category`, and put the image in `src/assets/hut/` and import it.
- **New field:** add it to `types.ts`. TypeScript then shows every place that needs it.

Keep copy in plain Persian, and use Persian digits in display strings (`۴۰۵۱`, not `4051`). Formatting helpers convert numbers for you.

---

## 5. The shared layer (`src/shared/`)

Shared code provides **behaviour and accessibility only, never colours or layout.** Each version styles these through `className` / `classNames` props.

| Module | Use it for |
|---|---|
| `components/Icon` | `<Icon name="golestan" size={24} />`: inline SVG, `currentColor`, decorative unless given a `label` |
| `components/Tabs` | Accessible tabs (WAI-ARIA, RTL arrow keys). Render-prop child receives `panelProps`. |
| `components/LogoMark` | University emblem tinted with `currentColor`. Resize from CSS with `--logo-size`. |
| `components/ExternalLink` | Link with safe `rel` and a screen-reader "opens in new tab" hint |
| `components/SkipLink` | First element of every version page; target is `#main` |
| `hooks/useToday` | Today's Jalali date in Tehran, or the `?today=` override |
| `hooks/useServiceSearch` | Live, Persian-normalised filter over a `Service[]` |
| `hooks/useDismiss` | Close a menu or popover on Escape or an outside click |
| `utils/jalali` | `toJalali`, `fromJalali`, `daysBetween`, `jalaliWeekday`, `isoToJalali` (built on `Intl`'s Persian calendar) |
| `utils/fa` | `faDigits`, `faNumber`, `formatJalali`, `formatJalaliRange`, `formatIsoDate`, `relativeDays`, `normalizeFa` |
| `utils/semester` | `semesterState(semester, today)` → `{ events (with status/daysUntil/position), current, upcoming, next, nextMilestone, progress }` |

When two versions need the same *behaviour*, move it here. When they need the same *look*, don't: copy it into each version so they can drift apart.

---

## 6. Anatomy of a version

```
src/versions/v2-lalejin/
  index.tsx            default export = the page. Imports fonts + tokens, reads content, composes sections.
  tokens.css           design tokens, scoped to [data-version='v2']
  fonts.ts             @fontsource imports for this version only
  page.module.css      (optional) page-level layout: containers, section spacing
  components/
    Header/Header.tsx + Header.module.css
    ServiceLauncher/…
    Tile/…
    …
```

Conventions every version follows:

1. **Root wrapper.** `index.tsx` returns `<div data-version="vN" id="top">` containing `<SkipLink />`, a header, `<main id="main" tabIndex={-1}>` and a footer.
2. **Tokens are scoped.** `tokens.css` starts with `[data-version='vN'] { … }`. Lazy-loaded CSS stays in the page after you navigate away, so unscoped rules would leak into other versions.
3. **Element defaults use `:where()`.** For example `:where([data-version='vN']) a { … }`, which has zero specificity so component classes always win. (Without it, `[data-version] a` outranks `.myLink` and you end up reaching for `!important`.)
4. **Components take data through props.** Only UI words (button labels, headings such as «اطلاعیه‌ها») live inside components.
5. **One folder per component**, holding a `.tsx` and a `.module.css`. CSS modules keep class names local.
6. **Fonts per version.** Import them in `fonts.ts`, not globally, so each route downloads only its own fonts. Use `@fontsource` packages, not Google Fonts, because Google Fonts is unreliable from Iran.
7. **Heading ids are prefixed** with the version (`v2-news`, `v3-term`) to avoid clashes and keep `aria-labelledby` unique.

---

## 7. Creating a new version, step by step

The example below adds **v4**. Replace `v4-hegmataneh` with your concept name.

### Step 1: Decide the concept before writing code

Read [`design-profile.md`](design-profile.md) first: it records which design decisions this project
keeps making, and a new version is expected to hold to it. Then write these down (and later add them
to `redesign-plan.md`):

- **Which audience does the first screen serve?** V1 serves visitors, V2 serves students' services and V3 serves the semester's timing. A new version should answer this differently, or answer it in a clearly different way.
- **One memorable element.** V1 has the carved tablets, V2 the tile mosaic and V3 the to-scale timeline. Keep everything else quiet.
- **Palette:** 4–6 named hex values with roles. Derive them from the subject (Hamedan, Alvand, the university), not from trends.
- **Type:** one or two families that support Persian. Check that `@fontsource` has the font (good options: Vazirmatn, Noto Kufi/Naskh/Sans Arabic, Lalezar, Markazi Text, Amiri, Reem Kufi).
- **ASCII wireframe** for desktop and a note on mobile.

Avoid the generic defaults: a cream page with serif and terracotta, a dark page with an acid accent, identical rounded cards with soft shadows, ALL-CAPS eyebrow labels, a "→" after every link, and numbered markers on content that isn't a sequence.

### Step 2: Copy an existing version as a skeleton

Copy the version whose *structure* is closest to your idea:

```sh
cp -r src/versions/v3-taqvim src/versions/v4-hegmataneh
```

Then, inside the new folder:

- In `index.tsx`, change `data-version="v3"` to `data-version="v4"`, rename the component (e.g. `HegmatanehHome`) and update its doc comment.
- In `tokens.css`, replace every `[data-version='v3']` with `[data-version='v4']`, including the `:where(...)` rules.
- Search for `v3-` id prefixes and rename them to `v4-`:
  ```sh
  grep -rn "v3-" src/versions/v4-hegmataneh
  ```
- Delete the components you won't use.

### Step 3: Register it

Add an entry to `src/versions/registry.ts`:

```ts
{
  id: 'v4-hegmataneh',
  slug: 'v4',                       // → route /v4
  name: 'هگمتانه',
  nameEn: 'Hegmataneh',
  emphasis: 'اول …',                // which audience leads
  concept: 'One or two sentences in Persian describing the idea.',
  swatches: ['#…', '#…', '#…', '#…', '#…'],
  fonts: 'Font A / Font B',
  load: () => import('./v4-hegmataneh'),
},
```

The route, the gallery card and the switcher-bar entry now appear automatically.

### Step 4: Set fonts and tokens

```sh
pnpm add @fontsource-variable/<family>     # or @fontsource/<family> for static fonts
```

```ts
// src/versions/v4-hegmataneh/fonts.ts
import '@fontsource-variable/<family>'
```

Look up the exact `font-family` name the package registers before using it in tokens:

```sh
grep -o "font-family: '[^']*'" node_modules/@fontsource-variable/<family>/index.css | sort -u
```

A minimal `tokens.css`:

```css
[data-version='v4'] {
  /* palette */
  --c-ink: #…;
  --c-page: #…;
  --c-accent: #…;

  /* roles: components use these, not the raw palette */
  --bg: var(--c-page);
  --text: var(--c-ink);
  --text-muted: #…;
  --line: #…;
  --focus: var(--c-accent);

  /* type */
  --font-display: '<Family> Variable', system-ui, sans-serif;
  --font-body: '<Family> Variable', system-ui, sans-serif;
  --step-0: 1rem;
  /* …type scale… */

  /* space */
  --gutter: clamp(16px, 4vw, 40px);
  --max: 1240px;

  --skip-bg: var(--c-ink);
  --skip-fg: var(--c-page);

  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
}

:where([data-version='v4']) :focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}

:where([data-version='v4']) a {
  color: var(--c-accent);
}
```

### Step 5: Build the sections

Every homepage should cover the same content, in whatever order and form the concept calls for:

| Content | Source | Must include |
|---|---|---|
| Header / navigation | `publicNav`, `identity` | Public sections, a way to reach **services**, English link, login |
| Student services | `studentServices` / `topServices`, `serviceGroups` | At least the priority-1 services in the first screen or one tap away |
| Staff systems | `staffServices` | Separate from student services |
| Calendar / deadlines | `semester` + `semesterState(semester, useToday())` | Next deadline with relative days |
| Announcements & news | `news`, `newsTabs`, `featuredAnnouncement` | One module with category filters (use `<Tabs>`) |
| Identity | `identity`, `departments`, `stats`, `researchUnits`, `achievements` | Mission, 8 departments, research units |
| Footer | `contact`, `utilityLinks`, `affiliates`, `social` | Address, phone, email, affiliates |

A typical page component:

```tsx
import './fonts'
import './tokens.css'
import { useMemo } from 'react'
import { identity, semester, topServices } from '../../content'
import { SkipLink } from '../../shared/components/SkipLink'
import { useToday } from '../../shared/hooks/useToday'
import { semesterState } from '../../shared/utils/semester'
import { Hero } from './components/Hero/Hero'

export default function HegmatanehHome() {
  const today = useToday()
  const state = useMemo(() => semesterState(semester, today), [today])

  return (
    <div data-version="v4" id="top">
      <SkipLink />
      {/* <Header … /> */}
      <main id="main" tabIndex={-1}>
        <Hero name={identity.name} services={topServices.slice(0, 6)} next={state.nextMilestone} />
        {/* … */}
      </main>
      {/* <Footer … /> */}
    </div>
  )
}
```

A typical component:

```tsx
// components/Hero/Hero.tsx
import type { Service } from '../../../../content'
import type { EventWithStatus } from '../../../../shared/utils/semester'
import { formatJalaliRange, relativeDays } from '../../../../shared/utils/fa'
import s from './Hero.module.css'

interface HeroProps {
  name: string
  services: Service[]
  next?: EventWithStatus
}

export function Hero({ name, services, next }: HeroProps) {
  return (
    <section aria-labelledby="v4-hero" className={s.hero}>
      <h1 id="v4-hero">{name}</h1>
      {/* … */}
      {next && (
        <p>
          {next.label}، {formatJalaliRange(next.start, next.end)} ({relativeDays(next.daysUntil)})
        </p>
      )}
    </section>
  )
}
```

### Step 6: Check it

```sh
pnpm lint && pnpm build
pnpm dev
```

Then go through the checklist in section 9.

### Step 7: Document it

Add a section for the new version to `docs/redesign-plan.md`, covering its concept, wireframe, token table and self-review. Add a row to the routes table in the root `README.md`.

---

## 8. RTL and Persian rules

- `index.html` sets `lang="fa" dir="rtl"`. Don't set `dir` again on version wrappers.
- **Use logical properties**: `margin-inline-start`, `padding-inline`, `inset-inline-start`, `border-inline-end`, `inset-block-*`, never `left` or `right`. In RTL, "start" means the right-hand side.
- **Centring an absolutely positioned element** at `inset-inline-start: X%` in RTL needs `translate: 50% …` (positive), not `-50%`. See `SemesterTimeline.module.css`.
- **Directional icons**: `Icon` paths are drawn for RTL. Flip them with `scale: -1 1` if needed.
- **Numbers inside Persian text**: phone numbers, e-mails and Latin codes need `dir="ltr"` on their element, or bidi will reorder them (`۰۸۱-۳۸۴۱۱۰۰۰`).
- **Digits**: always display through `faDigits` / `faNumber` / `formatJalali*`.
- **Dates**: store calendar dates as `JDate` (Jalali) and publication dates as ISO Gregorian strings (`'2026-10-13'`). Display both via `utils/fa`.
- **Search**: use `normalizeFa`, which unifies Arabic and Persian ی/ک and removes zero-width non-joiners (ZWNJ).

---

## 9. Quality checklist for any version

- [ ] Skip link works, and `#main` receives focus.
- [ ] Every interactive element shows a visible focus ring.
- [ ] Tabs work with the arrow keys; menus close on Escape and on an outside click.
- [ ] Links to external systems open in a new tab and say so to screen readers. The payslip link is marked as internal-only.
- [ ] Headings form a sensible outline (one `h1`, sections use `aria-labelledby`).
- [ ] Images have `alt`: descriptive for meaningful images, `""` for decorative ones.
- [ ] Contrast is at least WCAG AA (4.5:1 for body text).
- [ ] No horizontal scroll at **360–390px**.
- [ ] Single-column grids use `minmax(0, 1fr)`, not `1fr`. With `1fr`, long tab rows or `nowrap` text push the page wider than the screen.
- [ ] No `!important`. If you need it, fix the specificity instead (see the `:where()` rule).
- [ ] Animation is limited to responses to user actions. `prefers-reduced-motion` is already handled globally in `index.css`.
- [ ] `pnpm lint` and `pnpm build` are clean.
- [ ] Try `?today=` with a date before the term, mid-term (`1405-10-01`) and after the term (`1405-11-20`).

### Screenshots for review (optional)

There is no screenshot tooling in the repo. One approach that works on this machine is `playwright-core` installed in a scratch folder, using its cached Chromium:

```js
const { chromium } = require('playwright-core')
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 390, height: 844 } })
await p.goto('http://localhost:5173/v4', { waitUntil: 'networkidle' })
await p.screenshot({ path: 'v4-mobile.png', fullPage: true })
// overflow check:
console.log(await p.evaluate(() => document.documentElement.scrollWidth > innerWidth))
```

---

## 10. Refreshing the archive

```sh
node scripts/scrape/scrape.mjs            # fetch live pages (1 s between requests), media, documents
node scripts/scrape/scrape.mjs --offline  # re-parse archive/raw without network
```

- The scraper parses the HTML with cheerio and **never executes** it.
- Homepage sections are matched by Liferay asset-publisher **instance ids** (`SECTION_BY_INSTANCE` in the script). If the university rebuilds its homepage, these ids change. The script then reports `unknown_<id>` sections, and you update the map.
- Liferay renders news dates with client-side scripts. The script extracts them from the inline `moment('…')` calls.
- The archive is **reference material**. The app never imports from `archive/`. To use new content, copy it into `src/content/` (and images into `src/assets/hut/`).
- Re-encode large images before adding them to `src/assets/hut/` (aim for under 150 KB). The archive keeps the originals.

---

## 11. Known gotchas

| Symptom | Cause | Fix |
|---|---|---|
| Padding on a `<ul role="list">` ignored | The reset selector outranked the module class | The reset now uses `:where(…)`. Keep it that way. |
| Version link colours overriding component colours | `[data-version] a` beats `.class` | Use `:where([data-version='vN']) a` |
| Page wider than the phone screen | Grid `1fr` column grew to fit a `nowrap` child | `minmax(0, 1fr)` |
| Logo invisible on light backgrounds | `logo.png` is white | `<LogoMark>` (CSS mask with `currentColor`) |
| Phone number reversed | Bidi reordering in RTL | `dir="ltr"` on the number |
| Tab panel spread onto `<ol>` replaced its list role | `panelProps` includes `role="tabpanel"` | Wrap the list in a `<div {...panelProps}>` |
