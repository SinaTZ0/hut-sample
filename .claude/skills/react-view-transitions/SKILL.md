---
name: react-view-transitions
description: How to animate UI changes in this repo with React 19.3's stable <ViewTransition> component and the browser View Transitions API — expand/collapse, enter/exit, content that moves when something above it grows, list reorder, shared-element morphs, sliding tab indicators, route changes. Use whenever a change should animate, when the user mentions view transitions, startViewTransition, ViewTransition, startTransition-driven animation, or asks for motion without an animation library. Covers the RTL overlay fix, CSS-module naming, reduced motion, snapshot stacking and pixel-snapping pitfalls, and how to verify a transition frame by frame in headless Chromium.
---

# React view transitions (hut-sample)

Animate with the platform, not a library. The user prefers View Transitions over Motion (framer-motion) because the work happens in the browser's compositor and unsupported browsers still get the state change, just without the animation. Do not add Motion, react-spring, GSAP or similar.

## Ground truth for this repo

- React is **19.3** (`react`, `react-dom` 19.3.x). `ViewTransition` is **stable**: `import { ViewTransition } from 'react'`. Do not install `react@canary`, and do not use `unstable_ViewTransition`. Older guides (including Vercel's `react-view-transitions` skill, last edited before 19.3) still say canary is required; ignore that. Release notes: https://react.dev/blog/2026/09/09/react-19-3 (they do not cover RTL, the overlay sizing or reduced motion — those rules below come from testing in this repo).
- The site is **RTL** (`<html dir="rtl">`). See the overlay fix below; it is already in `src/index.css` and must stay there.
- Styles are **CSS modules** (Vite). View-transition class names are global identifiers, so their CSS lives in a global file (a version's `tokens.css`), never in a `*.module.css`.
- Reference implementation: the V8 hero's "همه ۱۵ سامانه" panel — `src/versions/v8-qali/components/Hero/Hero.tsx`, the `v8-unroll` / `v8-slide` rules at the end of `src/versions/v8-qali/tokens.css`, and the `<ViewTransition>` wrappers around News and Term in `src/versions/v8-qali/index.tsx`.

## The model

1. **Trigger**: a React transition — `startTransition(() => setX(…))`, `useDeferredValue`, or a Suspense reveal. A plain `setState` does not animate. `flushSync` actively **skips** the animation.
2. **Declare**: wrap what should animate in `<ViewTransition>`. React assigns a unique `view-transition-name` to the nearest DOM node(s) only for the duration of the transition, and calls `document.startViewTransition` itself (falling back to an instant update where unsupported).
3. **Style**: the props are view-transition *classes*, styled through the pseudo-elements:

| Prop | Fires when the `<ViewTransition>` … |
|---|---|
| `enter` | is **mounted** inside a transition |
| `exit` | is **unmounted** inside a transition |
| `update` | its content mutated, or it moved/resized because of a sibling |
| `share` | a same-`name` boundary unmounts elsewhere while this one mounts (morph) |
| `default` | any of the above without its own prop; `"none"` disables, `"auto"` is the browser cross-fade |

```css
/* in tokens.css (global), keyed on the class passed to the prop */
::view-transition-group(.v8-slide) { animation-duration: 0.45s; }
::view-transition-new(.v8-unroll):only-child { animation: v8-unroll 0.45s both; }  /* enter */
::view-transition-old(.v8-unroll):only-child { animation: v8-unroll 0.3s reverse both; } /* exit */
```

`:only-child` targets a pure enter (no old image) or a pure exit (no new image).

When CSS is not enough, the event props `onEnter`, `onExit`, `onUpdate`, `onShare` receive the instance and can drive the pseudo-elements with the Web Animations API; return a cleanup function.

## Patterns

**Expand / collapse (enter + exit).** Mount and unmount the panel; do not toggle `hidden` or `display`, which React sees as an update, not an enter. The `<ViewTransition>` must be the **first thing in the mounting subtree, above any DOM node** — `{open && <ViewTransition><div>…}` works, `{open && <div><ViewTransition>…}` silently never fires enter/exit.

```tsx
const toggle = () => startTransition(() => setOpen((o) => !o))

<button aria-expanded={open} aria-controls={open ? panelId : undefined} onClick={toggle}>…</button>
{open && (
  <ViewTransition enter="v8-unroll" exit="v8-unroll">
    <div id={panelId}>…</div>
  </ViewTransition>
)}
```

**Things below that move.** Content that shifts because something above grew will otherwise cross-fade inside the root snapshot (a visible jump). Wrap each visible neighbour in its own boundary so its group slides:

```tsx
<ViewTransition default="v8-slide"><News … /></ViewTransition>
<ViewTransition default="v8-slide"><Term … /></ViewTransition>
```

Only wrap what is likely on screen; React hides groups that are out of the viewport anyway.

**Shared element / morph.** Give two boundaries the same `name` (unique per page) — one unmounts, the other mounts, inside one transition. Use a `share` class to style the morph.

**Sliding indicator (tab pill).** Render the fill as its own element inside the active tab only, wrapped in a named boundary, so switching tabs morphs it from the old tab to the new one. Reference: the V11 announcements tabs, `src/versions/v11-kaj/components/NewsSection/` and the `v11-pill` rules in `src/versions/v11-kaj/tokens.css`.

```tsx
const select = (id: string) =>
  startTransition(() => {
    addTransitionType('v11-notices')
    setActive(id)
  })

label: (
  <>
    {id === active && (
      <ViewTransition name="v11-notice-pill" share="v11-pill">
        <span className={s.pill} aria-hidden="true" />
      </ViewTransition>
    )}
    <span className={s.tabLabel}>{title}</span>
  </>
)
```

A pill needs four things, each covered under Pitfalls: paint the group instead of the stretched snapshot; lift the labels into their own groups only while this transition type is active (`:global(html:active-view-transition-type(v11-notices)) .tabLabel { view-transition-name: match-element; view-transition-class: v11-tab-label; }`); keep the labels above the pill in both directions; give the tab a whole-pixel height. Pair it with a keyed `<ViewTransition>` on the panel and turn off the root cross-fade for that type. Keep the whole thing under ~0.25 s; tabs are clicked often.

**Swap content in place.** Change the `key` on a `<ViewTransition>` to play exit on the old content and enter on the new one (e.g. a carousel slide, a tab panel).

**Directional or context-specific motion.** Call `addTransitionType('next')` inside `startTransition`, then pass an object to the prop: `enter={{ next: 'from-right', previous: 'from-left', default: 'none' }}`. React also sets these as browser view-transition types, so plain CSS can branch with `:active-view-transition-type(next) ::view-transition-group(*) { … }`. Reserve directional slides for hierarchy or ordered sequences, not sibling tabs. Remember RTL: "next" moves toward the left here.

**Loading (Suspense).** `<ViewTransition update="auto" default="none"><Suspense fallback={…}>…</Suspense></ViewTransition>` shows the fallback instantly and animates only the fallback → content swap. Use sparingly; skip it for cached UI.

**Nesting.** When a parent boundary mounts or unmounts as one unit, nested boundaries do not fire their own enter/exit — only the outermost animates.

## Required global CSS

These already exist. Keep them when refactoring; replicate the per-version parts in a new version's `tokens.css`.

**RTL overlay fix** (`src/index.css`, applies to every version). React shrinks `::view-transition` to 0×0 so the page stays clickable. With the UA's `inset: 0`, an RTL root resolves that 0-width box against the right edge and every snapshot is painted one viewport-width off-screen: the animated content simply vanishes for the duration, then pops in. Pin it to the left:

```css
::view-transition {
  inset: 0 auto auto 0;
}
```

**Reduced motion** (per version, next to its transition rules):

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

## Pitfalls

- **`flushSync`** inside the update skips the transition. Use `startTransition`.
- **CSS modules** would hash `.v8-unroll` inside `::view-transition-new(.v8-unroll)`. Put these rules in global CSS and prefix class names with the version (`v8-…`) so versions don't collide.
- **Names must be unique** among elements captured in the same transition. Let React generate them; only pass `name` for shared-element morphs.
- **Start latency**: React schedules the transition, so it begins ~100–150 ms after the click. That is normal.
- **Interactivity**: during the animation, named participants are not hit-testable, and an in-flight overlay can swallow clicks. Keep reveals short (≤ 0.45 s). `::view-transition { pointer-events: none; }` passes clicks through to unnamed content if ever needed.
- **Snapshots are images**: text inside an animating group cross-fades between old and new (a button label will briefly ghost), and a changing aspect ratio stretches. Keep elements whose content changes outside named groups, or accept the brief cross-fade.
- **`useDeferredValue`** (e.g. the header service search) is a transition too. It only animates if a `<ViewTransition>` boundary's content changes, so keep boundaries off frequently-updating search UI.
- **Groups stack in the old state's paint order**, not by your intent. A moving element covers every named sibling painted before it, so the bug shows in only one direction (V11: switching back to an earlier tab hid its label under the pill until the slide ended). Put the elements that must stay on top at `z-index: 1` inside a parent with `isolation: isolate`; z-index changes paint order, and so changes group order.
- **A stretched snapshot blurs.** A rounded fill that changes width smears its ends, because the image is scaled. For a plain shape, hide the images and paint the group itself. The colour must be literal: the pseudo-elements hang off `<html>`, outside `[data-version]` where the tokens live.

  ```css
  ::view-transition-group(.v11-pill) { border-radius: 999px; background: #103d40; }
  ::view-transition-old(.v11-pill),
  ::view-transition-new(.v11-pill) { display: none; }
  ```
- **Groups are placed on whole pixels**; the live element is not. With a fractional height (e.g. a 33.594px tab) the two round to different boxes and the edge jumps 1px when the animation hands back, which reads as a crop. Give animated boxes a whole-pixel height, e.g. a `px` `line-height`.
- **Overlap looks fuzzy.** Old and new snapshots both half-transparent ghost the text. For a content swap, run exit then enter in sequence (old out in ~0.07 s, new in after a delay of the same length). The root cross-fades too: when only named parts should move, turn it off for that type with `:active-view-transition-type(x)::view-transition-old(root), :active-view-transition-type(x)::view-transition-new(root) { animation: none; }`.

## Verifying

A transition can "pass" — state updates, no errors — while drawing nothing. Always look at a frame **mid-animation**, not just the end state. Use Playwright in the scratchpad (not the repo) against `pnpm build && pnpm preview`:

```js
await page.locator(trigger).click()
// wait until the animation is actually running; React starts it a frame or two late
await page.waitForFunction(
  () => document.getAnimations().some((a) => a.animationName === 'v8-unroll' && a.currentTime > 150),
  null, { polling: 'raf' },
)
await page.screenshot({ path: `${dir}/mid.png` })
```

Playwright is not in this repo; import it from `../hut-crawler-content/node_modules/playwright/index.mjs` and pass `executablePath` for the installed headless shell under `~/.cache/ms-playwright/` if the bundled version is missing. Scroll the target into view **before** clicking and screenshot with `page.screenshot({ clip })`: an element screenshot scrolls the page under the fixed overlay and produces offset, misleading frames.

A screenshot takes longer than a short (≤ 0.3 s) animation, so the "mid" frame above is often already the end state. For short transitions, freeze or slow the animations instead:

```js
// freeze at fixed times
await page.evaluate((t) => document.getAnimations().forEach((a) => {
  if (a.effect?.pseudoElement) { a.pause(); a.currentTime = t }
}), 60)

// or play at 1/10 speed and grab a burst through the hand-off
await page.evaluate(() => {
  const start = document.startViewTransition.bind(document)
  document.startViewTransition = (...args) => {
    const t = start(...args)
    t.ready.then(() => document.getAnimations().forEach((a) => (a.playbackRate = 0.1)))
    t.finished.then(() => (window.__vtDone = true))
    return t
  }
})
```

Measure, don't eyeball: load each PNG into an `OffscreenCanvas` in the page and print the bounding box of the shape's colour. A 1px jump between the last animated frame and the first settled one is invisible in a thumbnail and obvious to the user.

Check:
1. The mid frame shows the entering content partway through, and neighbours between their old and new positions — not a blank area.
2. Closing animates too; for tabs and other ordered controls, test **both directions** (stacking bugs show in one only).
3. The frames around the moment the transition finishes match: the box doesn't move, shrink or crop when the live element takes over.
4. `reducedMotion: 'reduce'` in the page options leaves no running `::view-transition*` animations.
5. Typing in the header search triggers no stray transitions (wrap `document.startViewTransition` to count calls).
6. 360 and 1440 px have no horizontal overflow in the open state.

To inspect what React did, list `document.getAnimations().filter((a) => a.effect?.pseudoElement)` and read `getComputedStyle(document.documentElement, '::view-transition-group(_t_0_)')`. React's own WAAPI animations (on `::view-transition` size and offscreen groups' opacity) show up there with no `animationName`.
