# Expert Mode Review: Performance + Accessibility

Audience: current developer, next developer (junior/intern)
Scope: performance fixes + accessibility pass, with verification

## DRAFT (Plan + Rationale)

Goals
- Stop unnecessary image/video work on first paint.
- Reduce re-render churn in the video modal.
- Improve keyboard and screen-reader usability without changing layout.

Key decisions
- Replace DOM id-based image observation with a ref-based observer to avoid invalid ids and collisions.
- Only render the active and next hero slides to cut memory and decode cost.
- Gate background video based on "reduced motion" and "save data" signals.
- Add visible focus rings and aria-labels for icon-only controls.

## REVIEW (What Changed + Why)

Performance changes
- `src/components/ui/optimized-image.jsx`
  - Replaced `getElementById` with `ref` and `IntersectionObserver` on the element.
  - Reset loading state on `src` changes to avoid stuck transitions.
  - Added `decoding="async"` and `fetchPriority` for better loading behavior.
- `src/components/ui/image-carousel.jsx`
  - Render only the current slide and the next slide (instead of all).
  - Mark the current slide `priority` to ensure it loads first.
- `src/pages/home-page/sections/hero.jsx`
  - Gated desktop background video with `prefers-reduced-motion` and `saveData`.
  - Added a static image fallback when video is disabled.
  - Fixed hero poster path to a real asset (`/images/hero/hero-bg-slide-1.webp`).
- `src/components/ui/video-modal.jsx`
  - Removed unused `progress` state to reduce render frequency.
  - Track chapter changes using a ref to avoid state updates every `timeupdate`.
  - Set `preload="metadata"` to reduce eager video loading.

Accessibility changes
- `src/index.css`
  - Added a visible `:focus-visible` outline for keyboard users.
- `src/components/ui/video-modal.jsx`
  - Added `aria-label` and `type="button"` to icon-only controls.
- `src/components/ui/bee-close-button.jsx`
  - Added `aria-label` and `type="button"`.

Stress test & verification
- Ran `npm run build` via `cmd` (PowerShell execution policy blocked `npm.ps1`).
- Build succeeded in ~43 seconds.
- Noted a Vite warning about a missing `/images/ui/map-pattern.svg` reference (unrelated to changes).

## PUBLISH (How It Works + Maintenance Notes)

OptimizedImage (core behavior)
- The component observes its own container via `ref`.
- When the container is near the viewport (root margin 200px), it sets `currentSrc`.
- This avoids invalid ids and ensures predictable lazy-loading on all images.

ImageCarousel (resource control)
- Only two slides exist in the DOM at a time: current + next.
- This keeps the hero animation smooth but reduces memory, decoding, and layout work.
- If you add more slides, no extra work happens unless they become current/next.

Hero video gating
- If the user prefers reduced motion or has data-saver enabled, the video is skipped.
- A static image is shown instead (same composition, lower cost).
- This keeps UX respectful and reduces network/CPU overhead.

Video modal chapter tracking
- `timeupdate` fires frequently; we now update state only when the chapter changes.
- This reduces renders while keeping chapter UI accurate.

Accessibility notes
- Focus rings are visible for keyboard users and do not affect mouse users.
- Icon-only buttons now announce intent via `aria-label`.

Known issue to watch
- Build warning: `/images/ui/map-pattern.svg` is referenced but not resolved at build time.
  - If this is a real asset, add it under `public/images/ui/` or remove the reference.
