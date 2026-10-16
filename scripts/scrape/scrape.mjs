#!/usr/bin/env node
/**
 * Archiver for the current hut.ac.ir (Liferay) homepage and a few first-level pages.
 *
 *   node scripts/scrape/scrape.mjs            # fetch live pages, then parse
 *   node scripts/scrape/scrape.mjs --offline  # re-parse archive/raw/*.html only
 *
 * Outputs (all under archive/):
 *   raw/<slug>.html     untouched snapshots
 *   catalog.json        structured content (nav, sections, calendar, stats, contact…)
 *   media/ + media.json downloaded key images with source-URL mapping
 *   INVENTORY.md        human-readable catalog + service entry-point audit
 *
 * Scraped HTML is treated as data only: it is parsed with cheerio and never executed.
 */
import * as cheerio from 'cheerio'
import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const OUT = path.join(ROOT, 'archive')
const RAW = path.join(OUT, 'raw')
const MEDIA = path.join(OUT, 'media')
const ORIGIN = 'https://hut.ac.ir'
const UA = 'Mozilla/5.0 (compatible; HUT-redesign-archiver/1.0; reference snapshot)'
const DELAY_MS = 1000
const OFFLINE = process.argv.includes('--offline')

const PAGES = [
  { slug: 'home', url: 'https://hut.ac.ir/' },
  { slug: 'sitemap', url: 'https://hut.ac.ir/fa/نقشه-سایت' },
  { slug: 'contact', url: 'https://hut.ac.ir/ارتباط-با-ما' },
  { slug: 'forms', url: 'https://hut.ac.ir/university-forms' },
  { slug: 'student', url: 'https://student.hut.ac.ir/' },
  { slug: 'edu', url: 'https://edu.hut.ac.ir/' },
  { slug: 'english', url: 'https://en.hut.ac.ir/en' },
]

/** Reference documents linked from homepage articles (the 4051 calendar is only published as image/PDF). */
const DOCUMENTS = [
  {
    file: 'calendar-4051.png',
    url: 'https://hut.ac.ir/documents/38165/55251/Screenshot+2026-08-18+102859.png/0f2e820c-19a2-5d4f-bfe3-1fdbc2c8ee1f',
  },
  {
    file: 'calendar-4051.pdf',
    url: 'https://hut.ac.ir/documents/38165/55251/eaxoxxpvarahqgll.pdf/f09115b7-6533-6fb7-68d2-a212b4e8c336',
  },
]

/** Asset-publisher portlet instance → homepage section (from manual inspection of the live page). */
const SECTION_BY_INSTANCE = {
  jclk: { key: 'featured', title: 'اسلایدر اصلی' },
  ekjl: { key: 'news', title: 'اخبار' },
  bnxj: { key: 'announcements', title: 'اطلاعیه‌ها' },
  smis: { key: 'growthCenter', title: 'مرکز رشد، فناوری و کارآفرینی' },
  yaez: { key: 'tabEducation', title: 'آموزش' },
  qicz: { key: 'tabGraduate', title: 'تحصیلات تکمیلی' },
  goeq: { key: 'tabIndustry', title: 'ارتباط با صنعت' },
  srha: { key: 'tabStudent', title: 'دانشجویی و فرهنگی' },
  jtsr: { key: 'tabOpenEducation', title: 'آموزش‌های آزاد' },
  djmo: { key: 'achievements', title: 'دستاوردها و افتخارات' },
  qill: { key: 'openEducationEvents', title: 'رویدادها و دوره‌های مرکز آموزش‌های آزاد و مجازی' },
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Normalise Arabic code points to Persian and collapse whitespace. */
const clean = (s = '') => s.replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/‌\s+/g, '‌').replace(/\s+/g, ' ').trim()

const abs = (href, base = ORIGIN) => {
  if (!href || href === '#' || href.startsWith('javascript:')) return null
  try {
    return new URL(href.trim(), base).href
  } catch {
    return null
  }
}

const pretty = (u) => {
  try {
    return decodeURI(u)
  } catch {
    return u
  }
}

const bgUrl = (style = '') => style.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/)?.[1] ?? null

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'fa,en;q=0.5' } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.text()
}

// ---------------------------------------------------------------- homepage parsing

/** Liferay renders dates client-side: `getElementById("x") … moment('2026 10 13', 'YYYY MM DD')`. */
function extractScriptDates(html) {
  const map = new Map()
  const re = /getElementById\("([^"]+)"\)[\s\S]{0,500}?moment\('([^']+)',\s*'([^']+)'\)/g
  for (const m of html.matchAll(re)) {
    if (map.has(m[1])) continue
    const parts = m[2].split(/\s+/).map(Number)
    const order = m[3].split(/\s+/)
    const get = (k) => parts[order.indexOf(k)]
    const y = get('YYYY')
    const mo = get('MM')
    const d = get('DD')
    if (y && mo && d) map.set(m[1], `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`)
  }
  return map
}

function parseNav($) {
  return $('li.link.has-sub-menu')
    .map((_, li) => {
      const top = $(li).children('a').first()
      const groups = $(li)
        .find('.parent-title')
        .map((_, pt) => {
          const head = $(pt).find('a').first()
          const list = $(pt).nextAll('ul').first()
          return {
            title: clean(head.text()),
            href: abs(head.attr('href')),
            links: list
              .find('a')
              .map((_, a) => ({ title: clean($(a).text()), href: abs($(a).attr('href')) }))
              .get()
              .filter((l) => l.title),
          }
        })
        .get()
      const flat = groups.length
        ? []
        : $(li)
            .find('.sub-menu a')
            .map((_, a) => ({ title: clean($(a).text()), href: abs($(a).attr('href')) }))
            .get()
            .filter((l) => l.title)
      return { title: clean(top.text()), href: abs(top.attr('href')), groups, links: flat }
    })
    .get()
}

function parseSections($, dates, media) {
  const sections = {}
  $('[id^="p_p_id_com_liferay_asset_publisher"]').each((_, el) => {
    const id = $(el).attr('id') ?? ''
    const inst = id.match(/INSTANCE_([a-z]+)_?$/)?.[1]
    const meta = SECTION_BY_INSTANCE[inst] ?? { key: `unknown_${inst}`, title: '' }
    const items = []
    const seenTitles = new Set()
    const nodes = $(el).find('.splide__slide, .asset-abstract')
    nodes.each((_, n) => {
      const x = $(n)
      const title = clean(x.find('.title, .asset-title').first().text())
      // Carousels render clones with truncated titles; keep the first occurrence of each.
      const fp = title.replace(/\.{3}$/, '').slice(0, 30)
      if (!title || seenTitles.has(fp)) return
      seenTitles.add(fp)
      const short = x.find('.journal-short-url input').first().attr('value')
      const link = abs(x.find('a.more, a.title, a.asset-title').first().attr('href')) ?? abs(short) ?? null
      const img =
        abs(x.find('img').first().attr('src')) ?? abs(bgUrl(x.find('.img, .image, .cover-image').first().attr('style'))) ?? null
      const dateId = x.find('[id^="pDate-"], [id^="workshop-date-id-"]').first().attr('id')
      const item = {
        title,
        summary: clean(x.find('.desc, .description').first().text()) || null,
        href: link ? pretty(link) : null,
        date: (dateId && dates.get(dateId)) || null,
        image: img,
      }
      if (img && items.length < 8) media.add(img, title)
      items.push(item)
    })
    sections[meta.key] = { title: meta.title, instance: inst, items }
  })
  return sections
}

function parseCalendar($) {
  const box = $('.circle').first().closest('.splide__list')
  return box
    .find('.splide__slide')
    .map((_, s) => {
      const d = $(s).find('.date > div')
      return {
        label: clean($(s).find('.desc').text()),
        dateText: clean(
          d
            .map((_, x) => $(x).text())
            .get()
            .join(' '),
        ),
        currentOnSite: $(s).find('.circle').hasClass('active'),
      }
    })
    .get()
}

function parseStats($) {
  // Counters and their captions are sibling fragments; pair them by document order.
  const labels = $('h3[class*="addon-heading"]')
    .map((_, h) => clean($(h).text()))
    .get()
  return $('.ci-counter')
    .map((i, c) => ({
      value: Number($(c).find('.purecounter').attr('data-purecounter-end')),
      suffix: '+',
      label: labels[i] ?? '',
    }))
    .get()
}

function parseQuickLinks($, media) {
  return $('#fragment-26-bflv .splide__slide')
    .map((_, s) => {
      const a = $(s).find('a.title').first()
      const icon = abs($(s).find('img').first().attr('src'))
      if (icon) media.add(icon, clean(a.text()))
      return { title: clean(a.text()), href: pretty(abs(a.attr('href')) ?? ''), icon }
    })
    .get()
    .filter((q) => q.title)
}

function parseFooter($, media) {
  const contact = {}
  $('.main-footer p').each((_, p) => {
    const t = clean($(p).text())
    const [k, ...rest] = t.split(':')
    const v = clean(rest.join(':'))
    if (!v) return
    if (k.includes('ادرس') || k.includes('آدرس')) contact.address = v
    else if (k.includes('تلفن')) contact.phone = v
    else if (k.includes('فکس')) contact.fax = v
    else if (k.includes('صندوق')) contact.poBox = v
    else if (k.includes('ایمیل')) contact.email = v
  })
  contact.mapEmbed = $('.main-footer iframe').attr('src') ?? null

  const affiliates = $('.main-footer h5')
    .first()
    .parent()
    .find('a')
    .map((_, a) => ({ title: clean($(a).text()), href: abs($(a).attr('href')) }))
    .get()
    .filter((a) => a.title)

  const social = $('a[href*="linkedin"], a[href*="eitaa"], a[href*="aparat"], a[href^="mailto"]')
    .map((_, a) => ({ href: $(a).attr('href')?.replace('mailto: ', 'mailto:'), icon: abs($(a).find('img').attr('src')) }))
    .get()
  const seen = new Set()
  const socialUnique = social.filter((s) => (seen.has(s.href) ? false : seen.add(s.href)))
  socialUnique.forEach((s) => s.icon && media.add(s.icon, s.href))

  const utility = []
  const seenU = new Set()
  $('a').each((_, a) => {
    const t = clean($(a).text())
    const h = abs($(a).attr('href'))
    if (
      [
        'نقشه سایت',
        'منشور اخلاق',
        'تماس با ما',
        'فرم نظام پیشنهادات',
        'نو دانشجویان',
        'انجمن دانش آموختگان',
        'درگاه های پرداخت',
        'کانال ایتا',
        'تماس با دانشگاه',
      ].includes(t) &&
      !seenU.has(t)
    ) {
      seenU.add(t)
      utility.push({ title: t, href: pretty(h ?? '') })
    }
  })

  const loginMenu = $('#menu-icon-sub-menu a')
    .map((_, a) => ({ title: clean($(a).text()), href: abs($(a).attr('href')) }))
    .get()
    .filter((a) => a.title)

  const lastUpdated = clean($('p:contains("آخرین بروزرسانی")').first().text()).replace('آخرین بروزرسانی:', '').trim()
  return { contact, affiliates, social: socialUnique, utility, loginMenu, lastUpdated }
}

function parseHome(html) {
  const dates = extractScriptDates(html)
  const $ = cheerio.load(html)
  const media = new Map()
  media.add = (url, alt) => !media.has(url) && media.set(url, alt)

  ;['navbar-logo', 'site-name', 'footer-logo', 'achievements.png', 'footer-background', 'scroll-gif'].forEach((needle) => {
    $(`img[src*="${needle}"]`).each((_, i) => media.add(abs($(i).attr('src')), needle))
    $(`[style*="${needle}"]`).each((_, i) => media.add(abs(bgUrl($(i).attr('style'))), needle))
  })

  const nav = parseNav($)
  const sections = parseSections($, dates, media)
  const calendar = parseCalendar($)
  const stats = parseStats($)
  const quickLinks = parseQuickLinks($, media)
  const footer = parseFooter($, media)
  const tabs = $('[href^="#tab-"]')
    .map((_, a) => clean($(a).text()))
    .get()
  const video = abs($('source[src$=".mp4"], source[src*=".mp4"]').first().attr('src'))

  return {
    title: clean($('title').text()),
    siteName: clean($('.site-name').first().text()),
    language: $('html').attr('lang') ?? null,
    direction: $('html').attr('dir') ?? null,
    nav,
    quickLinks,
    sections,
    newsTabs: tabs,
    calendar,
    stats,
    video,
    ...footer,
    media,
  }
}

/** Generic extraction for secondary pages: title, headings, and content links. */
function parseGeneric(html, base) {
  const $ = cheerio.load(html)
  $('script, style, noscript, svg').remove()
  const scope = $('#main-content').length ? $('#main-content') : $('body')
  const seen = new Set()
  return {
    title: clean($('title').text()),
    headings: scope
      .find('h1, h2, h3, h4')
      .map((_, h) => clean($(h).text()))
      .get()
      .filter(Boolean)
      .slice(0, 60),
    links: scope
      .find('a')
      .map((_, a) => ({ title: clean($(a).text()), href: abs($(a).attr('href'), base) }))
      .get()
      .filter((l) => l.title && l.href && !seen.has(l.href) && seen.add(l.href))
      .map((l) => ({ ...l, href: pretty(l.href) }))
      .slice(0, 250),
    text: clean(scope.text()).slice(0, 4000),
  }
}

// ---------------------------------------------------------------- media

const EXT_BY_TYPE = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'image/webp': '.webp',
}

async function downloadMedia(media) {
  await fs.mkdir(MEDIA, { recursive: true })
  const manifest = []
  for (const [url, alt] of media) {
    if (!url) continue
    const base = pretty(new URL(url).pathname.split('/').filter(Boolean).at(-2) ?? 'file')
    const stem = base
      .replace(/\.[a-z0-9]+$/i, '')
      .replace(/[^a-z0-9-]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40)
    const hash = createHash('sha1').update(url).digest('hex').slice(0, 8)
    try {
      const res = await fetch(url, { headers: { 'user-agent': UA } })
      if (!res.ok) throw new Error(String(res.status))
      const type = (res.headers.get('content-type') ?? '').split(';')[0]
      const ext = EXT_BY_TYPE[type] ?? path.extname(base) ?? ''
      const file = `${stem || 'img'}-${hash}${ext}`
      await fs.writeFile(path.join(MEDIA, file), Buffer.from(await res.arrayBuffer()))
      manifest.push({ file, source: pretty(url), alt: typeof alt === 'string' ? alt : '', type })
      process.stdout.write('.')
    } catch (e) {
      manifest.push({ file: null, source: pretty(url), alt, error: String(e.message ?? e) })
      process.stdout.write('x')
    }
    await sleep(250)
  }
  process.stdout.write('\n')
  await fs.writeFile(path.join(MEDIA, 'media.json'), JSON.stringify(manifest, null, 2))
  return manifest
}

// ---------------------------------------------------------------- service audit

const AUDIENCE_GROUP = { کارکنان: 'staff', دانشجو: 'student', 'هیات علمی': 'faculty' }

function auditServices(home) {
  const systems = home.nav.find((n) => n.title.includes('سامانه'))
  const rows = []
  for (const g of systems?.groups ?? []) {
    for (const l of g.links) {
      const u = l.href ? new URL(l.href) : null
      const notes = []
      if (u?.protocol === 'http:') notes.push('plain HTTP')
      const privateIp = u && /^(10|127|192\.168|172\.(1[6-9]|2\d|3[01]))\./.test(u.hostname)
      if (privateIp) notes.push('private IP: unreachable off-campus')
      else if (u && u.hostname !== 'hut.ac.ir' && !u.hostname.endsWith('.hut.ac.ir')) notes.push('external domain')
      rows.push({ name: l.title, href: l.href ? pretty(l.href) : '', audience: AUDIENCE_GROUP[g.title] ?? g.title, notes })
    }
  }
  return rows
}

function inventoryMarkdown(catalog, manifest) {
  const h = catalog.pages.home
  const lines = []
  const link = (t, u) => (u ? `[${t}](${u})` : t)
  lines.push('# hut.ac.ir content inventory', '')
  lines.push(
    `Snapshot: ${catalog.fetchedAt} · Source: ${ORIGIN} (Liferay, theme \`sanati-hamedan-theme\`) · Site "last updated": ${h.lastUpdated || 'n/a'}`,
    '',
  )
  lines.push('## Primary navigation', '')
  for (const n of h.nav) {
    lines.push(`- **${link(n.title, n.href && pretty(n.href))}**`)
    for (const g of n.groups) {
      lines.push(`  - ${link(g.title, g.href && pretty(g.href))}`)
      for (const l of g.links) lines.push(`    - ${link(l.title, l.href && pretty(l.href))}`)
    }
    for (const l of n.links) lines.push(`  - ${link(l.title, l.href && pretty(l.href))}`)
  }
  lines.push('', '## Service entry points (from the "سامانه‌ها" menu)', '')
  lines.push('| System | Audience | URL | Notes |', '|---|---|---|---|')
  for (const r of catalog.serviceAudit) lines.push(`| ${r.name} | ${r.audience} | ${r.href} | ${r.notes.join('; ')} |`)
  lines.push('', '## Homepage quick links', '')
  for (const q of h.quickLinks) lines.push(`- ${link(q.title, q.href)}`)
  lines.push('', '## Homepage sections', '')
  for (const [key, s] of Object.entries(h.sections)) {
    lines.push(`### ${s.title || key} \`${key}\` (${s.items.length} items)`, '')
    for (const it of s.items.slice(0, 12)) lines.push(`- ${it.date ? `${it.date} · ` : ''}${link(it.title, it.href)}`)
    lines.push('')
  }
  lines.push('## Academic calendar (as shown on the homepage)', '')
  for (const c of h.calendar) lines.push(`- ${c.label}: ${c.dateText}${c.currentOnSite ? ' (marked current)' : ''}`)
  lines.push('', '## Statistics', '')
  for (const s of h.stats) lines.push(`- ${s.label}: ${s.value}${s.suffix}`)
  lines.push('', '## Contact', '')
  for (const [k, v] of Object.entries(h.contact)) lines.push(`- ${k}: ${v}`)
  lines.push('', '## Footer affiliates', '')
  for (const a of h.affiliates) lines.push(`- ${link(a.title, a.href)}`)
  lines.push('', '## Secondary pages captured', '')
  for (const [slug, p] of Object.entries(catalog.pages))
    if (slug !== 'home') lines.push(`- **${slug}**: ${p.title || p.error} (${p.links?.length ?? 0} links)`)
  lines.push('', `## Media (${manifest.filter((m) => m.file).length} files in \`archive/media/\`)`, '')
  for (const m of manifest) lines.push(`- ${m.file ?? '✗ ' + m.error} ← ${m.source}`)
  lines.push('')
  return lines.join('\n')
}

// ---------------------------------------------------------------- main

async function main() {
  await fs.mkdir(RAW, { recursive: true })
  const pages = {}
  let homeMedia = new Map()
  for (const p of PAGES) {
    const file = path.join(RAW, `${p.slug}.html`)
    let html
    try {
      if (OFFLINE) html = await fs.readFile(file, 'utf8')
      else {
        console.log(`GET ${p.url}`)
        html = await fetchText(p.url)
        await fs.writeFile(file, html)
        await sleep(DELAY_MS)
      }
    } catch (e) {
      console.warn(`  ! ${p.slug}: ${e.message}`)
      pages[p.slug] = { url: p.url, error: e.message }
      continue
    }
    if (p.slug === 'home') {
      const { media, ...home } = parseHome(html)
      homeMedia = media
      pages.home = { url: p.url, ...home }
    } else {
      pages[p.slug] = { url: p.url, ...parseGeneric(html, p.url) }
    }
  }

  const manifest = OFFLINE
    ? JSON.parse(await fs.readFile(path.join(MEDIA, 'media.json'), 'utf8').catch(() => '[]'))
    : await downloadMedia(homeMedia)

  if (!OFFLINE) {
    await fs.mkdir(path.join(OUT, 'documents'), { recursive: true })
    for (const d of DOCUMENTS) {
      try {
        const res = await fetch(d.url, { headers: { 'user-agent': UA } })
        if (!res.ok) throw new Error(String(res.status))
        await fs.writeFile(path.join(OUT, 'documents', d.file), Buffer.from(await res.arrayBuffer()))
      } catch (e) {
        console.warn(`  ! document ${d.file}: ${e.message}`)
      }
      await sleep(DELAY_MS)
    }
  }

  const catalog = {
    fetchedAt: new Date().toISOString(),
    origin: ORIGIN,
    pages,
    serviceAudit: pages.home ? auditServices(pages.home) : [],
  }
  await fs.writeFile(path.join(OUT, 'catalog.json'), JSON.stringify(catalog, null, 2))
  await fs.writeFile(path.join(OUT, 'INVENTORY.md'), inventoryMarkdown(catalog, manifest))

  const h = pages.home
  console.log(
    `nav ${h?.nav.length} · sections ${Object.keys(h?.sections ?? {}).length} · calendar ${h?.calendar.length} · stats ${h?.stats.length} · services ${catalog.serviceAudit.length} · media ${manifest.length}`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
