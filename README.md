# HUT homepage redesign

Homepage redesigns for Hamedan University of Technology ([hut.ac.ir](https://hut.ac.ir)) in Persian, right-to-left.
Every version reads the same typed content, so new versions can sit beside the existing ones.

```sh
pnpm install
pnpm dev          # http://localhost:5173  →  /  (gallery), /v1, /v2, /v3, /v4, /v5, /v6, /v7
pnpm build && pnpm preview
node scripts/scrape/scrape.mjs            # refresh the archive from the live site
node scripts/scrape/scrape.mjs --offline  # re-parse archive/raw only
```

The audit, information architecture, wireframes and tokens are in [`docs/redesign-plan.md`](docs/redesign-plan.md).
What "good" means here — the taste profile the newest version was built from — is in [`docs/design-profile.md`](docs/design-profile.md).
How the code fits together, and how to add a version step by step, is in [`docs/project-guide.md`](docs/project-guide.md).
The scraped reference material is in [`archive/INVENTORY.md`](archive/INVENTORY.md).

| Route | Version | Leads with |
|---|---|---|
| `/v1` | Ganjnameh (گنج‌نامه) | University identity and student gateway as twin carved tablets |
| `/v2` | Lalejin (لالجین) | Student service mosaic with live search |
| `/v3` | Taqvim (تقویم) | Live semester timeline and a sticky "now" rail |
| `/v4` | Alvand (الوند) | Photographic hero with the daily systems docked under it; pine and wheat-gold, light/dark |
| `/v5` | Hegmataneh (هگمتانه) | A section through the mound: dusk sky, a horizon bar carrying today, then one crossing from the surface strata into the deep ones |
| `/v6` | Baba Taher (بابا طاهر) | Granite and glass: stone bands carrying a girih weave, and a «میز خدمت» slab cut into the hero that searches every system |
| `/v7` | Ibn Sina (بوعلی سینا) | Research-first: the «میز خدمت» slab still docks on the hero, but achievements and research units follow right after it; midnight bands carry the Avicenna tower's ribs, manuscript gold marks what's worth stopping for |

Add `?today=1405-09-28` to any URL to preview the calendar widgets on another day of the term.

## Structure

```
archive/                 scraped snapshot (raw HTML, catalog.json, media, calendar PDF, INVENTORY.md)
scripts/scrape/          archiver (cheerio; parses, never executes, the scraped HTML)
src/
  content/               shared, typed content — edit university data here
    types.ts             content model
    ia.ts                navigation / information architecture
    services.ts          service entry points (group, priority, audience)
    calendar.ts          semester 4051 calendar (Jalali dates)
    news.ts, site.ts     news, achievements, identity, contact, departments, stats
  shared/                behaviour shared by all versions (no visual styling)
    components/          Icon, Tabs, ExternalLink, LogoMark, SkipLink
    hooks/               useToday, useServiceSearch, useDismiss
    utils/               jalali.ts, fa.ts (Persian digits/dates), semester.ts (status of each event)
  versions/
    registry.ts          list of versions → routes + gallery
    v1-ganjnameh/        index.tsx · tokens.css · fonts.ts · components/<Name>/<Name>.tsx + .module.css
    v2-lalejin/
    v3-taqvim/
    v4-alvand/
    v5-hegmataneh/
    v6-babataher/         + assets/ — the generated girih, granite, contour and seal artwork
    v7-ebnesina/          + assets/ — the generated tower, ribs, granite, contour and seal artwork
  pages/VersionGallery/  index page comparing versions
  app/                   router, shell, reviewer version bar
```

## Editing

- **Content** (news, services, dates): edit `src/content/*`. Every version updates.
- **A version's look**: start from its `tokens.css` (colours, type scale, spacing), which is scoped to `[data-version='vN']`.
- **A section**: each section is its own component folder with a CSS module and takes its data through props.

## Adding a version

1. Copy a version folder, e.g. `src/versions/v3-taqvim` to `src/versions/v4-<name>`.
2. Change `data-version="v4"` in its `index.tsx` and the selectors in its `tokens.css`.
3. Register it in `src/versions/registry.ts` with a `slug` of `v4` and `load: () => import('./v4-<name>')`.

The route and gallery card appear automatically.
