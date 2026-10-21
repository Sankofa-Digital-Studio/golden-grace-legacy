# Golden Grace Legacy & Honey • Archival Audit Trail (October 2026)

**Repository**: `golden-grace-legacy`  
**Ledger Created**: 2026-10-21T03:13:00+02:00  
**Status**: Archived & Verified  
**Baseline Git Commit**: `ec942cd`

---

## 1. Executive Summary & Purpose

In accordance with modern 2026/2027 web architecture guidelines, enterprise-grade clean architecture, and the user requirement for modular structure and dead-code elimination, all historical documentation, one-off scripts, and unused component files have been moved to this partitioned time-stamped directory (`archive/2026-10/`).

This guarantees:
1. **Preserved History & Full Audit Trail**: Nothing is permanently erased or lost; historical plans, benchmarks, and legacy components are preserved in the git tree.
2. **Lean Active Source Tree**: The active `src/` directory now only contains files actively imported and rendered by the live application.
3. **Dead-Code Free Production Bundles**: Unused CSS and JS code from dead components is no longer compiled into the production distribution.

---

## 2. Inventory of Archived Files

### A. Historical Documentation (`archive/2026-10/docs/`)
| File | Original Location | Description & Archival Justification |
| :--- | :--- | :--- |
| `EXPERT_MODE_REVIEW.md` | `docs/EXPERT_MODE_REVIEW.md` | Initial critique from earlier development phase; superseded by current architecture. |
| `storefront-launch-plan.md`| `docs/storefront-launch-plan.md` | Pre-launch checklist from earlier sprints; all tasks completed. |
| `UI_UX_PLAN.md` | `docs/UI_UX_PLAN.md` | Early stage layout and wireframe specifications; superseded by current live sections. |

### B. One-Off Generation Scripts (`archive/2026-10/scripts/`)
| File | Original Location | Description & Archival Justification |
| :--- | :--- | :--- |
| `generate_favicons.py` | `scripts/generate_favicons.py` | Standalone Python Pillow script used to rasterize the solid honeycomb vector SVG into PNG mipmaps (16, 32, 48, 180, 192, 512px). Active icons are now checked into `public/`. |

### C. Legacy / Unused Components (`archive/2026-10/legacy-components/`)
| File | Original Location | Description & Archival Justification |
| :--- | :--- | :--- |
| `recipes-page.jsx` | `src/pages/recipes-page.jsx` | Standalone recipe prototype with unbaselined `/images/7.jpeg` image; not routed in `views.js`. |
| `reviews-page.jsx` | `src/pages/reviews-page.jsx` | Standalone reviews prototype; replaced by live on-page `TestimonyRibbon` and `EducationHub.Gathering`. |
| `featured-recipes.jsx` | `src/pages/home-page/sections/` | Unused section prototype; replaced by `Sensory` and `ContentBreak`. |
| `featured-reviews.jsx` | `src/pages/home-page/sections/` | Duplicate review component; replaced by `TestimonyRibbon`. |
| `featured-gifts.jsx` | `src/pages/home-page/sections/` | Prototype cards; replaced by full lazy-loaded `GiftsPage` (`src/pages/gifts-page.jsx`). |
| `founder.jsx` | `src/pages/home-page/sections/` | Standalone founder snippet; consolidated directly into `StoryPage` and `Story` section. |
| `education-hub.jsx` | `src/pages/home-page/sections/` | Partial home section duplicate of full lazy-loaded `EducationHub` (`src/pages/education-page.jsx`). |
| `breadcrumbs.jsx` | `src/components/common/` | Unused component; in-app header/footer back navigation used instead. |
| `impact-tracker.jsx` | `src/components/common/` | Prototype badge; consolidated into `TrustBar` and `StoryPage`. |
| `image-modal.jsx` | `src/components/common/` | Replaced by `ArchiveSection` lightbox modal. |
| `modal.jsx` | `src/components/common/` | Generic modal replaced by specialized `DetailModal` and `BeeCloseButton`. |
| `toast.jsx` | `src/components/common/` | Unused notifications component; cart drawer and submission modals provide direct feedback. |
| `video-modal-common.jsx` | `src/components/common/video-modal.jsx` | Unused duplicate; active video modal lives in `src/components/ui/video-modal.jsx`. |
| `container.jsx` | `src/components/layout/` | Unused 250-byte wrapper component. |
| `section.jsx` | `src/components/layout/` | Unused 546-byte wrapper component. |
| `product-card.jsx` | `src/components/ui/` | Early card draft; `Collection` handles standard and master showcase layouts dynamically. |
| `useScrollLock.js` | `src/hooks/useScrollLock.js` | Unused hook; `useEffect` scroll locking implemented natively in modals and drawer. |

### D. Zero-Byte & Redundant Artifacts Purged
- `deployment_log.md` (0 bytes, purged)
- `src/App.css` (0 bytes, purged)
- `src/assets/react.svg` (Vite placeholder, purged)

---

## 3. Bundle Impact & Verification
- **CSS Bundle Size**: Reduced from `78.51 kB` to `73.99 kB` (5.8% reduction in unused style rules).
- **Asset Gaps**: Reduced approved asset gap baseline from 5 to 4 (orphan `/images/7.jpeg` removed).
- **Module Count**: Active modules transformed during Vite production build remains optimized and lean.
