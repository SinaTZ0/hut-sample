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

## 3. Design directions

All versions use the same content and IA. They differ in **which audience the first screen serves** and in visual language. Each one spends its boldness on a single element.

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

### V4 Alvand (الوند): the university's own front door

*Concept:* built from a reference mock-up (`example/localhost_5176_.png`). It reads like a conventional, polished institutional homepage: a full-bleed photograph of the campus under Alvand behind a pine-teal wash, with the name set large in white and **wheat gold**. The memorable element is the **service rail docked over the bottom edge of the hero**, which puts the six daily systems one tap from the first screen. The rest of the page alternates light sections with pine bands.

```
┌ strip (pine-950): • پایگاه رسمی دانشگاه صنعتی همدان                تماس با ما  ورود به پرتال ┐
│ [■ emblem] دانشگاه صنعتی همدان   دانشگاه▾ آموزش▾ پژوهش▾ زندگی▾ سامانه‌ها   │ 🔍  ☀  EN     │
├──────────── campus + Alvand photograph, pine gradient from inline-start ────────────────────┤
│                         ── دانش، فناوری، آینده    📍 همدان، در دامنه الوند                   │
│                              دانشگاه صنعتی                                                   │
│                              همدان (gold)                    ▌ریشه در دانش                   │
│ [آشنایی با دانشگاه ←] [راهنمای نودانشجویان ↗]                ▌نگاه به آینده                  │
│ 📅 اطلاع‌رسانی آموزشی  حذف تک‌درس · ۲۴ تا ۲۵ آذر · ۵۹ روز دیگر              مشاهده تقویم ← │
│ ┌ golestan ┬ courseware ┬ nutrition ┬ lms ┬ welfare ┬ dorm ┐  (white rail, overlaps hero) │
│ تازه‌های دانشگاه: featured story (text | photo) + 2 cards  │ اطلاعیه‌ها [tabs] date chips    │
│ تقویم آموزشی: 7 milestones evenly spaced, done = filled, next = gold + «N روز دیگر»          │
│ ── pine band: در یک نگاه · mission · 6 gold figures │ campus-life photo · 8 departments ──   │
│ دستاوردها: lead card │ 2 side cards                                                         │
│ pine panel: رویدادها و دوره‌ها + research units │ growth / open-ed list with thumbnails     │
│ welcome split card: pine-700 (new students, departments) │ feedback · counselling          │
└ footer (pine-950): brand + social · links · student systems · staff systems · contact · affiliates ┘
```

| Token | Value | Role |
|---|---|---|
| pine-950 | `#0B2F32` | utility strip, footer |
| pine-900 | `#103D40` | hero wash, glance band, learning panel, active tab |
| pine-700 | `#1B6A64` | links, welcome card |
| wheat gold | `#E7BC65` | primary buttons, figures, "next deadline" flag, kicker dash (`#9A6B14` as text on light) |
| mist | `#F6F8F5` | page (alternate sections `#FBFCFA`) |
| Type | Vazirmatn only, 800–900 for headings | |

A sun/moon button in the header switches to a dark theme (`data-theme="dark"` on the version root, remembered in `localStorage`). The pine bands stay dark in both themes.

**Departures from the reference:** the nav uses the shared IA (`زندگی دانشجویی`, `سامانه‌ها`) rather than the mock-up's labels. The mock-up's video card becomes a photo card for the graduation announcement, because the content has no video. Its "website visit statistics" footer band is replaced by the affiliates list, because there is no visitor-counter data. The announcements panel gained category tabs, staff systems got their own footer column, and the eight departments appear in the glance band, all to meet the content checklist in the project guide.

### V5 Hegmataneh (هگمتانه): the section through the mound

*Concept:* the first version built from a written taste profile rather than a reference mock-up — see
[`design-profile.md`](design-profile.md), which reads V4 as the brief. Hegmataneh, the excavated mound
of ancient Ecbatana, sits in the middle of Hamedan with the city stacked inside it in layers. The page
is a section through it: the **dusk photograph is the sky**, a **horizon bar** lies across its bottom
edge carrying the only three facts that change daily, and below that the page crosses from light to
dark exactly once — surface strata for everything that changes, deep strata for everything that
doesn't, down to the bedrock of the footer.

Herodotus describes Ecbatana as seven concentric walls, each a colour. Four of them are the palette.

```
┌ strip (night-950): • پایگاه رسمی دانشگاه          تماس با ما  [ورود به پرتال] ┐
│ [■ emblem] دانشگاه صنعتی همدان  دانشگاه▾ آموزش▾ …   │  🔍  EN                 │
├──────── campus at dusk under Alvand, indigo wash from the inline-start ───────┤
│ 📍 همدان، در دامنه الوند                                                       │
│ دانشگاه صنعتی همدان          (Naskh, ivory)                                    │
│ Hamedan University of Technology                                               │
│ mission, two lines  ·  [آشنایی با دانشگاه ←] [راهنمای نودانشجویان ↗]          │
│ ┌ ۲۵ مهر ۱۴۰۵ ┬ هفته ۵ از ۲۰ نیم‌سال ┬ مهلت بعدی: حذف تک‌درس… ┬ تقویم ← ┐ ← HORIZON │
│   (saffron)      straddles the bottom edge of the photograph                   │
├─ surface, dust ──────────────── سامانه‌های روزمره ────────────────────────────┤
│  one tall dark block (گلستان) + six quiet blocks on one sand field            │
├─ surface, clay ──────────────── اطلاعیه‌ها ───────────────────────────────────┤
│  tabbed list with date stamps  │  the one announcement with a poster          │
├─ surface, dust ──────────────── خبرها ────────────────────────────────────────┤
│  lead story, photo + summary   │  two kept short                              │
├─ surface, clay ──────────────── تقویم نیم‌سال ────────────────────────────────┤
│  term strip to scale with today on it, then 7 milestone rows (2 columns)      │
├━━━━━━━━━━━━━ THE CROSSOVER: saffron notch on the seam ━━━━━━━━━━━━━━━━━━━━━━━┤
├─ deep, night-900 ────────────── دانشگاه صنعتی همدان ──────────────────────────┤
│  mission · 6 figures (ivory)  │  campus-life photo   ·  ۸ گروه آموزشی         │
├─ deep, night-950 ────────────── پژوهش و فناوری · دستاوردها · رویدادها ────────┤
│  6 units (3×2) · lead achievement + 2 · 3 event cards (one without a poster)  │
│  ┌ تازه رسیده‌اید؟ — the one light block below the crossover, saffron top edge ┐│
└ footer (night-950): brand · links · student systems · staff systems · contact ┘
```

| Token | Value | Role | Wall |
|---|---|---|---|
| night-950 | `#141B30` | utility strip, deepest stratum, footer | black |
| night-900 | `#1C2543` | hero wash, institution band, lead service block | blue |
| night-800 | `#243054` | raised surfaces on the deep strata | blue |
| lapis | `#2B4CA8` | **structure**: links, tabs, icons, labels (`#A8BDF2` on the deep strata) | blue |
| saffron | `#D9822B` | **time and action only**: today, the next deadline, the primary button, the crossover notch (`#9A5611` as text on light) | orange |
| dust / clay | `#FAF7F1` / `#EFE9DC` | the two surface strata | white |
| Type | Noto Naskh Arabic (headings, 700) + Vazirmatn (everything structural) | | |

**What is deliberately different from V4**, which it is a sibling of: the tonal plan crosses once
instead of alternating four times; the photograph is the sky rather than a backdrop for the name; the
docked object is a single horizon bar rather than a six-tile rail; the accent is split by job across
two colours instead of one gold doing everything; headings are a second typeface and carry no kicker;
and the radii are 4–12px, so the blocks read as cut, not as cards.

**Departures from the content:** the open-education entry has no poster, so that event card gives the
block to its headline instead of showing a blank frame. There is no theme switch: the page already
crosses into its own night at the halfway mark.

### V6 Baba Taher (بابا طاهر): granite and glass

*Concept:* built as a second answer to the brief V4 answered — the university's own front door,
read as a *governance* site — rather than as a variation on it. The subject is the Baba Taher tower
on the north edge of Hamedan: an octagonal drum of grey Alvand granite, twelve plain columns, and
turquoise glass set between them. A modern building made out of old geometry, which is what this
page tries to be.

The one thing V6 does that none of the others do: **its dark bands are a material, not a fill.**
They carry a photographic granite grain with a girih weave over it, so the page reads as stone and
paper rather than as colour blocks. The artwork is generated and lives in `src/versions/v6-babataher/assets/`;
none of it is content. Every photograph on the page is still the university's own.

The memorable element is **«میز خدمت»**, a granite slab cut into the bottom edge of the hero. Where
V4 docks six tiles and V5 docks a horizon bar, V6 docks a *desk*: a live search over every system in
`services` (via `useServiceSearch`), the six daily ones already laid out beneath it, and the next
deadline on a hairline below. The first screen therefore carries no slogan and no statistics — only
the name, and the one object that does work.

```
┌ strip (granite-950): • پایگاه رسمی دانشگاه صنعتی همدان      تماس با ما  [ورود به پرتال] ┐
│ [■ emblem] دانشگاه صنعتی همدان  دانشگاه▾ آموزش▾ پژوهش▾ زندگی▾ سامانه‌ها │ 🔍 ☀ EN      │
├──────── campus under Alvand, granite wash from the inline-start, girih at 4% ───────────┤
│ 📍 همدان، در دامنه الوند                                                                 │
│ دانشگاه صنعتی همدان          (Kufi, white)                                               │
│ Hamedan University of Technology                                                         │
│ mission, one sentence   ·   [آشنایی با دانشگاه] [راهنمای نودانشجویان ↗]   ▌ریشه در دانش │
│                                                                           ▌نگاه به آینده │
│ ╔═══ میز خدمت — granite slab, turquoise top edge, straddles the photo's bottom edge ═══╗│
│ ║ میز خدمت  [🔍 نام سامانه یا کاری که دارید ………]            همه سامانه‌ها ←            ║│
│ ║ گلستان │ درس‌افزار │ رزرو غذا │ کلاس مجازی │ صندوق رفاه │ خوابگاه   (live results)   ║│
│ ║ ─────────────────────────────────────────────────────────────────────────────────── ║│
│ ║ 📅 مهلت بعدی  حذف تک‌درس  ۲۴ تا ۲۵ آذر · ۵۹ روز دیگر            تقویم آموزشی ←      ║│
│ ╚══════════════════════════════════════════════════════════════════════════════════════╝│
├─ bone ─ تازه‌های دانشگاه ────────────────────────────────────────────────────────────────┤
│  lead story with its photo │ two smaller │ اطلاعیه‌ها, tabbed, with date stamps         │
├─ bone-alt ─ تقویم آموزشی دانشگاه ───────────────────────────────────────────────────────┤
│  term line to scale, 7 milestones, today and the next deadline in turquoise             │
├─ GRANITE BAND (stone + girih + seal watermark) ─ دانشگاه صنعتی همدان در یک نگاه ────────┤
│  mission · 6 figures │ campus-life photo · ۸ گروه آموزشی                                │
│  ── Alvand's two summits as a contour drawing, bled across the foot of the band ──      │
├─ bone ─ دستاوردها و افتخارات ───────────────────────────────────────────────────────────┤
│  one lead card tall │ two stacked beside it                                             │
├─ bone-alt ─ رویدادها و دوره‌های آموزشی ─────────────────────────────────────────────────┤
│  three course/event rows │ granite panel: 4 research units + a seal watermark           │
├─ bone ─ به جمع ما خوش آمدید ────────────────────────────────────────────────────────────┤
│  granite half (new students, departments) │ light half (feedback · counselling)         │
└ footer (granite-950 + girih): brand · links · student systems · staff systems · contact ┘
```

| Token | Value | Role |
|---|---|---|
| granite-950 | `#14181B` | utility strip, hero ground, footer |
| granite-900 | `#1D2328` | the institution band, the welcome block |
| granite-850 / -800 | `#232B31` / `#2A3238` | the service desk, and the tiles cut into it |
| firouzeh | `#1AA69C` | **the glass** — the only accent: primary buttons, the figures, today, the rule under each heading |
| firouzeh-deep | `#0A635D` | the same accent as text on a light ground (6.35:1) |
| bone / bone-2 | `#F4F2EE` / `#EAE7E1` | the paper sections |
| Type | Noto Kufi Arabic (headings, 700) + Vazirmatn (everything else) | |

**Generated design assets** (`assets/`, made with the image tool, then reduced to tintable
white-on-alpha WebP so CSS can colour them):

| File | Where it is used | Opacity |
|---|---|---|
| `girih.webp` | utility strip, hero, every granite band, footer | 4–4.5% |
| `granite.jpg` | the material of every dark surface, `mix-blend-mode: overlay` | 30–34% |
| `contour.webp` | Alvand's summits across the foot of the institution band | 13% |
| `seal-1…4.webp` | one medallion per dark surface, bled off a corner as a watermark | 6–10% |

The four seals came out of one generated 2×2 sheet, split and trimmed with `sharp`.

**What is deliberately different from V4**, which it answers rather than extends: the dark bands are
photographic stone instead of flat pine; the accent is cool turquoise instead of a warm metal,
because it is the glass of the tower rather than a wheat field; the docked object searches instead of
listing; headings are Kufi and carry a short turquoise rule rather than a kicker above them; and the
radii drop from 10–22px to 3–10px, so every block reads as cut rather than as a card.

**Departures from the content:** the open-education entry still has no poster, so that row keeps its
headline instead of an empty frame. Below 440px the header's magnifier is hidden, because the same
search sits in «میز خدمت» a few hundred pixels further down and the brand name set in Kufi needs the
room. A sun/moon button switches to a dark theme (`data-theme="dark"`, remembered in `localStorage`);
the granite bands stay stone in both.

### V7 Ebn-e Sina (بوعلی سینا): research first

*Concept:* every version so far answers "which audience does the first screen serve" with a
visitor, a student, the semester, or the university's own front door. V7 answers it differently
again: **research and achievement lead**, right after the service desk. The subject is the Avicenna
mausoleum on the south edge of Hamedan — Hooshang Seyhoun's 1952 tower, twelve pale ribs fanning up
from an octagonal drum to a single point, built for a physician who was also a philosopher,
astronomer and poet. A technical university gets to borrow that figure directly: knowledge is the
building, not the ornament on it.

The one thing V7 does that none of the others do: **the dark bands are read as night, not stone.**
Where V6's bands are granite lit from the front, V7's are midnight blue — the sky the tower stands
against — carrying the same granite grain at low opacity for texture, the tower's ribs as a barely
visible weave, and the tower itself drawn tall and faint at the edge of the hero photograph. The
artwork is generated and lives in `src/versions/v7-ebnesina/assets/`; none of it is content. Every
photograph on the page is still the university's own.

The memorable element is the **ordering**, not a new widget: V7 reuses V6's «میز خدمت» docked
service slab (the task of finding a system doesn't change by concept), but drops straight into
دستاوردها و افتخارات and رویدادها و دوره‌های آموزشی before news, the semester, or the university-at-
a-glance band — so a visitor's first scroll after the service desk is what the university has
produced, not an announcement feed.

```
┌ strip (night-deep): • پایگاه رسمی دانشگاه صنعتی همدان         تماس با ما  [ورود به پرتال] ┐
│ [■ emblem] دانشگاه صنعتی همدان  دانشگاه▾ آموزش▾ پژوهش▾ زندگی▾ سامانه‌ها │ 🔍 ☀ EN      │
├──────── campus under Alvand, midnight wash, the tower drawn faint at the edge ───────────┤
│ 📍 همدان، در دامنه الوند                                                                 │
│ دانشگاه صنعتی همدان          (Amiri, white)                                              │
│ Hamedan University of Technology                                                         │
│ mission, one sentence   ·   [آشنایی با دانشگاه] [راهنمای نودانشجویان ↗]   ▌ریشه در دانش │
│                                                                           ▌نگاه به آینده │
│ ╔═══ میز خدمت — midnight slab, gold top edge, straddles the photo's bottom edge ══════╗│
│ ║ میز خدمت  [🔍 نام سامانه یا کاری که دارید ………]            همه سامانه‌ها ←            ║│
│ ║ گلستان │ درس‌افزار │ رزرو غذا │ کلاس مجازی │ صندوق رفاه │ خوابگاه   (live results)   ║│
│ ║ ─────────────────────────────────────────────────────────────────────────────────── ║│
│ ║ 📅 مهلت بعدی  حذف تک‌درس  ۲۴ تا ۲۵ آذر · ۵۹ روز دیگر            تقویم آموزشی ←      ║│
│ ╚══════════════════════════════════════════════════════════════════════════════════════╝│
├─ parchment ─ دستاوردها و افتخارات ──────────────────────────────────────────────────────┤
│  one lead card tall (a flask seal watermark) │ two stacked beside it                     │
├─ parchment-alt ─ رویدادها و دوره‌های آموزشی ────────────────────────────────────────────┤
│  three course/event rows │ night panel: 4 research units + an astrolabe seal watermark   │
├─ bone ─ تازه‌های دانشگاه ────────────────────────────────────────────────────────────────┤
│  lead story with its photo │ two smaller │ اطلاعیه‌ها, tabbed, with date stamps         │
├─ bone-alt ─ تقویم آموزشی دانشگاه ───────────────────────────────────────────────────────┤
│  term line to scale, 7 milestones, today and the next deadline in gold                   │
├─ NIGHT BAND (midnight + granite grain + ribs + seal) ─ دانشگاه صنعتی همدان در یک نگاه ──┤
│  mission · 6 figures │ campus-life photo · ۸ گروه آموزشی                                │
│  ── Alvand's two summits as a contour drawing, bled across the foot of the band ──      │
├─ parchment ─ به جمع ما خوش آمدید ───────────────────────────────────────────────────────┤
│  night half (new students, departments) │ light half (feedback · counselling)           │
└ footer (night-deep + ribs): brand · links · student systems · staff systems · contact  ┘
```

| Token | Value | Role |
|---|---|---|
| night-deep | `#121726` | utility strip, hero ground, footer |
| night | `#1B2338` | the institution band, the welcome block |
| night-850 / -800 | `#242E49` / `#2B3655` | the service desk, and the tiles cut into it |
| gold | `#B8903E` | **manuscript gold** — the only accent: primary buttons, the figures, today, the rule under each heading |
| gold-deep | `#7D5F24` | the same accent as text on parchment (passes AA) |
| parchment / parchment-2 | `#F6F2E7` / `#EDE6D3` | the paper sections |
| Type | Amiri (headings, 700, a manuscript naskh) + Vazirmatn (everything else) | |

**Generated design assets** (`assets/`, made with the image tool, then reduced to tintable
white-on-alpha WebP so CSS can colour them):

| File | Where it is used | Opacity |
|---|---|---|
| `tower.webp` | drawn tall at the inline-end edge of the hero | 16% |
| `ribs.webp` | utility strip, hero, every night band, footer — the tower's flutes as a weave | 4–4.5% |
| `granite.jpg` | the material of every dark surface, `mix-blend-mode: overlay` | 30–34% |
| `contour.webp` | Alvand's summits across the foot of the institution band | 13% |
| `seal-1…4.webp` | an open book and pen, an astrolabe, an alembic, a twelve-point star — one per dark surface, bled off a corner | 6–10% |

The four seals came out of one generated 2×2 sheet, split and trimmed with `sharp`, replacing V6's
girih medallions with emblems that read as Ibn Sina's own disciplines — letters, astronomy,
medicine, geometry — rather than as pure ornament.

**What is deliberately different from V6**, which it is built directly from: the section order moves
achievements and research ahead of news and the semester; the dark bands read as night instead of
daylit stone, so the same granite grain sits under a blue wash rather than a grey one; the accent is
warm manuscript gold instead of cool glass turquoise; headings are Amiri, a serif built for Arabic
script manuscripts, instead of the geometric Kufi; and the tower appears as its own drawn silhouette
in the hero, not only as a texture.

**Departures from the content:** same as V6 — the open-education entry keeps its headline instead of
an empty poster frame, the header's magnifier hides below 440px in favour of «میز خدمت»'s search, and
the light/dark toggle (`data-theme`, remembered in `localStorage`) only changes the parchment, never
the night bands.

### Self-review against generic defaults

None of the versions uses a cream page with serif and terracotta, a dark page with an acid accent, a broadsheet layout or uniform SaaS cards. They avoid all-caps eyebrows and "→" link suffixes, and they don't decorate with numbered markers: numbers appear only on the calendar sequence in V3. Colours come from the subject: Alvand granite and lapis, Lalejin glazes, calendar ink with a single red for today, Alvand's pine slopes with wheat gold, four of the seven walls Herodotus gives Ecbatana, the granite and turquoise glass of the Baba Taher tower, and the travertine, midnight and manuscript gold of the Avicenna tower.

V6 is the one to keep checking, because it answers the same brief as V4 and could have come out as a recolour of it. The things that make it a different design rather than a variant: the dark bands are a photographic material instead of a flat fill, the docked object searches instead of listing, the accent is the tower's cool glass instead of a warm metal, Kufi carries the headings, and the radii are small enough that nothing reads as a card.

V5 is worth the same check, because it was built from a profile of V4 and could have come out as a recolour of it. The things that make it a different design rather than a variant: the single light-to-dark crossover, the horizon bar in place of the service rail, a second typeface carrying the headings, two accents split by job, and no kicker above any heading.

V7 is the sharpest version of this risk, because it was copied directly from V6's files rather than built from a profile of it, so it had to earn its differences line by line instead of starting from a blank page. The things that make it a different design rather than a recolour: the section order itself changes (research and achievement lead, not news), the dark bands are night instead of daylit granite, the accent is warm gold instead of cool glass, a manuscript serif replaces the geometric one, and the one generated silhouette — the tower — appears as a drawn figure, not only as a repeating texture.

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
