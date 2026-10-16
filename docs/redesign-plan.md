# Hamedan University of Technology: homepage redesign plan

Target: `https://hut.ac.ir/` (Liferay 7, theme `sanati-hamedan-theme`, Persian / RTL).
Snapshot: 17 Oct 2026 (25 Mehr 1405). The raw material is in [`archive/`](../archive/INVENTORY.md).

---

## 1. Audit of the current homepage

### What the archive contains

| Item | Where |
|---|---|
| Raw HTML of home, sitemap, contact, forms, student & education deputies, English home | `archive/raw/*.html` |
| Structured catalog: 6 menus / 3 levels, 11 content sections, calendar, stats, contact, affiliates | `archive/catalog.json` |
| 82 key images (logos, news, quick-link icons, footer art) + source map | `archive/media/`, `media.json` |
| Official calendar for semester 4051 (image + PDF) | `archive/documents/` |
| Human-readable inventory + service entry-point audit | `archive/INVENTORY.md` |

Re-run with `node scripts/scrape/scrape.mjs` (or `--offline` to re-parse the saved HTML).

### Findings

1. **No hierarchy.** About 12 homepage blocks have the same visual weight: slider, quick links, news, announcements, growth-centre news, calendar, a five-tab news carousel, stats, achievements, open-education events and a visitor counter. Nothing tells a visitor where to start.
2. **Students have to dig.** Golestan, Nutrition, Welfare Fund and Library sit under "سامانه‌ها" → "دانشجو", next to staff-only systems. The quick-link carousel repeats some of them, but as small icon slides.
3. **Mixed audiences in one menu.** The "سامانه‌ها" menu mixes staff (payslip, attendance, e-office), student and faculty systems. The payslip link points to a private IP (`192.168.3.230`) that cannot be reached off campus.
4. **Stale time-critical content.** The homepage calendar widget still showed the *previous* semester (Bahman 1404 to Tir 1405). The current calendar exists only as an image/PDF inside an article.
5. **Security and trust.** 12 of 15 service links use plain `http://`.
6. **Content carousels hide content.** News, growth centre, achievements and the five tabbed feeds all render as sliders. Most items are never seen, and titles are truncated with "...".
7. **Dates are rendered client-side** with moment.js. Without JavaScript, the news has no dates.
8. **The hero slider is used for ceremonial messages** rather than for orienting visitors.

---

## 2. Information architecture

Two lanes, both visible from the first screen. Neither is buried under the other.

```
                       ┌──────────────── homepage ─────────────────┐
  PUBLIC LANE          │                                           │   PORTAL LANE
  (visitors, applicants,│  identity · mission · departments         │  (students daily,
   industry, ministry)  │  research · achievements · figures        │   staff weekly)
                        │                                           │
                        │  ── time-sensitive: semester calendar,    │
                        │     announcements with deadlines ──       │
                        │                                           │
                        │  news (one module, filter tabs)           │  services grouped by task
                        └───────────────────────────────────────────┘
```

### Primary navigation (shared: `src/content/ia.ts`)

```
دانشگاه            معرفی · مدیریت · ارتباط          (absorbs «اداری و مالی»)
آموزش              ۸ گروه آموزشی · امور آموزشی · آموزش آزاد و مجازی
پژوهش و فناوری     پژوهش · فناوری و صنعت
زندگی دانشجویی     رفاه · فرهنگی · پشتیبانی
سامانه‌ها           ← portal lane (not a dropdown: a destination on the page)
```

### Services, regrouped by task (`src/content/services.ts`)

| Group | Services | Priority |
|---|---|---|
| آموزش و کلاس | Golestan (1), Courseware (1), Adobe Connect (2), Open education (3), New students (3) | 1 = daily |
| زندگی دانشجویی | Nutrition (1), Welfare fund (2), Dorm (2), Welfare services (3) | 2 = weekly |
| کتابخانه | Digital library (2), Renew/reserve (3) | 3 = occasional |
| پشتیبانی و مقررات | Counseling (2), Forms (2), Student affairs (3), Payment (3) | |
| کارکنان و اساتید | E-office, Mail, Faculty portal, Attendance, Evaluation, Staff training, Payslip (*internal only*) | separate menu |

`priority` drives prominence in every version: tile size in V2, order in V1 and V3.

### Section consolidation

| Before | After |
|---|---|
| News + Growth centre + 5 tabbed carousels + Achievements + Open-ed events | **One news module** with filter tabs, plus a short honours list |
| Calendar widget (stale) | **Semester calendar from the official 4051 PDF**, with live status (past / in progress / N days left) |
| Quick-link carousel + "سامانه‌ها" dropdown | **Student service portal** on the homepage, plus a separate staff strip |
| Counters with animation + visitor counter | Figures set as text; visitor counter removed |

---

## 3. Three design directions

All three versions use the same content and IA. They differ in **which audience the first screen serves** and in visual language. Each one spends its boldness on a single element.

### V1 Ganjnameh (گنج‌نامه): public-first, authoritative

*Concept:* the twin Achaemenid inscriptions carved into Mount Alvand above Hamedan. Two carved tablets sit on the lower edge of a photo of the campus under Alvand: **identity** on the right, the **student gateway** on the left. The dual IA becomes the hero.

```
┌ utility strip: نودانشجویان  تماس  دفترچه تلفن  ایتا           English  ورود ┐
│                    [emblem] دانشگاه صنعتی همدان                             │
│      دانشگاه   آموزش   پژوهش و فناوری   زندگی دانشجویی   ◆ سامانه‌های دانشجویی │
├──────────────── campus + Alvand photograph (full bleed) ────────────────────┤
│   ┌ tablet: identity (h1) ─────────┐                                        │
│   │ mission                        │  ┌ tablet: student gateway (lapis) ─┐  │
│   │ 8 departments index            │  │ 6 services, 2×3 grid             │  │
│   └────────────────────────────────┘  │ next deadline · all systems      │  │
│                                       └──────────────────────────────────┘  │
│ اطلاعیه‌ها (featured + dated list)        │ تقویم آموزشی (milestones, status) │
│ اخبار  [tabs]  lead story + list                                            │
│ پژوهش و فناوری (index)                   │ افتخارات                          │
│ ─── figures as one sentence (limestone band) ───                            │
│ کارکنان و اعضای هیئت علمی: inline system links                              │
└ footer: Alvand at dusk · contact · quick links · affiliates · social ──────┘
```

| Token | Value | Role |
|---|---|---|
| granite | `#2B2F33` | text, footer |
| lapis | `#1D3B6F` | links, gateway tablet |
| limestone | `#E6E7E3` | tablets, bands |
| snow | `#F7F8F6` | page |
| bronze | `#8E6A3A` | rules, focus, "in progress" |
| Type | Noto Kufi Arabic (display/UI) · Noto Naskh Arabic (body, 18/1.9) | |

### V2 Lalejin (لالجین): student-portal-first, fast

*Concept:* Lalejin, near Hamedan, is Iran's pottery capital, known for turquoise and cobalt glazes. The services are a **glazed-tile mosaic**: tile size = how often the service is used, glaze colour = group. A search box filters the tiles live, and a switch shows the staff systems instead.

```
┌ [emblem] دانشگاه صنعتی همدان   سامانه‌ها  تقویم  اطلاعیه‌ها  درباره   EN  (ورود)  ☰ همه بخش‌ها ┐
│ سلام! امروز سراغ کدام سامانه می‌روید؟                     ( دانشجو | کارکنان و اساتید ) │
│ [🔍 مثلاً انتخاب واحد، غذا یا وام                                                  ] │
│ (همه) (■ آموزش) (■ زندگی) (■ کتابخانه) (□ پشتیبانی)                                 │
│ ┌──────────┐┌──────────┐┌──────────┐                                                 │
│ │ GOLESTAN ││ COURSEW. ││ NUTRITION│   large = daily                                 │
│ │  2×2     ││  2×2     ││  2×2     │                                                 │
│ └──────────┘└──────────┘└──────────┘                                                 │
│ [ wide ][ wide ][ wide ] [s][s][s][s]   wide = weekly, small = occasional            │
│ پیش رو در این ترم: ▌۲۴ آذر حذف تک‌درس ▌۲۸ آذر ارزشیابی ▌…   (saffron)                │
│ اطلاعیه ویژه (poster)   │ اطلاعیه‌ها و اخبار [tabs] list with thumbnails             │
│ ── cobalt band: درباره دانشگاه · photo · departments · figures · research ──        │
└ footer (kiln umber) ─────────────────────────────────────────────────────────────────┘
```

| Token | Value | Role |
|---|---|---|
| turquoise | `#16858A` | living services, active tab |
| cobalt | `#22408C` | headings, education services, about band |
| white glaze | `#F5FAFA` | page |
| kiln umber | `#4E3529` | body text, footer |
| saffron | `#E1A12B` | deadlines only; focus ring |
| Type | Lalezar (headlines only) · Vazirmatn (UI/body) | |
| Shape | tiles 22px radius (fired clay), controls 14px, lists square | radius follows hierarchy |

### V3 Taqvim (تقویم): time-first, the semester as the spine

*Concept:* a student's week is governed by the academic calendar. The hero is a **to-scale semester timeline** with a red "today" line. A sticky **now rail** keeps today's date, the teaching week, the next deadline and the daily systems on screen at all times. Numbers are used because milestones really are a sequence.

```
┌ [emblem] دانشگاه صنعتی همدان   دانشگاه  آموزش  پژوهش  زندگی  سامانه‌ها      English  [ورود] ┐
│ ┌ NOW rail (sticky) ┐ │ نیم‌سال اول سال تحصیلی ۱۴۰۶–۱۴۰۵   (thin 200)                   │
│ │ شنبه              │ │ نیم‌سال ۴۰۵۱                        (black 900)                   │
│ │ ۲۵   (red, 900)   │ │        امروز، ۲۵ مهر                                             │
│ │ مهر ۱۴۰۵          │ │ ⑦━━━━⑥━━⑤━━━━④━━━━━━━━━━━━━━━━│━━━━③━━②━①   (to scale, RTL)    │
│ │ هفته ۵ از ۱۶ ▬▬── │ │ بهمن    دی     آذر     آبان      مهر                             │
│ │ ┌ مهلت بعدی ────┐ │ │ ① انتخاب واحد │ ② شروع کلاس‌ها │ … │ ⑦ امتحانات  (status each) │
│ │ │ حذف تک‌درس    │ │ │ ▸ همه ۱۵ تاریخ ترم، به تفکیک ورودی (table + rules)               │
│ │ └ ۵۹ روز دیگر ─┘ │ │ ━━ اطلاعیه‌ها و اخبار: featured + dated feed (big day numerals) │
│ │ سامانه‌های پرکاربرد│ │ ━━ دانشگاه صنعتی همدان: photo · mission · figures · 3 columns    │
│ └───────────────────┘ │                                                                   │
└ footer (ink) ─────────────────────────────────────────────────────────────────────────────┘
```

| Token | Value | Role |
|---|---|---|
| ink | `#1C2430` | text, footer |
| paper | `#FCFCFB` | page |
| Hamedan sky | `#2F6FB5` | links, "in progress", next-deadline card |
| today red | `#C62F3B` | today only (date numeral and timeline line); urgent deadline ≤ 7 days |
| sage | `#7C8F7A` | elapsed time, past events |
| Type | Vazirmatn only: 200 vs 900 weight contrast, oversized Persian numerals | |

Use `?today=1405-09-28` (any Jalali date) to see V3 and the deadline widgets on another day of the term.

### Self-review against generic defaults

None of the versions uses a cream page with serif and terracotta, a dark page with an acid accent, a broadsheet layout or uniform SaaS cards. They avoid all-caps eyebrows and "→" link suffixes, and they don't decorate with numbered markers: numbers appear only on the calendar sequence in V3. Colours come from the subject: Alvand granite and lapis, Lalejin glazes, and calendar ink with a single red for today.

---

## 4. Quality floor (all versions)

- `lang="fa" dir="rtl"`. CSS uses logical properties throughout, and arrow keys in tabs follow RTL.
- Skip link, visible focus ring per version, `prefers-reduced-motion` honoured globally.
- Accessible tabs (WAI-ARIA pattern), disclosure menus closing on Escape or outside click, and native `<details>` for drawers.
- External systems open in a new tab and say so to screen readers. The internal-only payslip system is labelled.
- Persian digits and Jalali dates everywhere (`Intl` Persian calendar, Tehran time zone).
- Responsive down to 360px. Verified with no horizontal overflow at 390px and 1440px.
- Fonts are self-hosted (`@fontsource`), with no dependency on Google Fonts.
- Each version's CSS and fonts load only on its own route (lazy routes).

## 5. Recommendations beyond the homepage

1. Move every service to `https://`, and replace the private-IP payslip link with a VPN or SSO entry point.
2. Publish the semester calendar as structured content in Liferay (a web-content structure), not as an image, so the homepage and Golestan reminders can share it.
3. Replace the carousels with list templates in the asset publishers. The title truncation ("...") comes from the slider templates.
4. Render dates server-side in the Liferay templates instead of with moment.js.
5. One sign-in (SSO) across Golestan, LMS, Courseware and Nutrition would let the portal lane show personal deadlines.
