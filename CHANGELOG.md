# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned (Milestone Roadmap P1 & P2)
- **Jar QR Verification**: Physical tamper-seal QR code linking to digital Certificate of Analysis (`/verify?batch=2026-FS-01`) showing moisture, pollination date, and beekeeper validation.
- **Bespoke Hamper Customizer UI**: Interactive 3D/visual box customizer for corporate clients in the Bespoke Gifting Suite.
- **Recurring Hive Guardian Subscription**: Automated monthly honey delivery with 10% member incentive.
- **B-BBEE Procurement Download**: Direct procurement download for B-BBEE Level 1 affidavit and SARS Tax Pin.
- **Sesotho (ST) Multi-Lingual Translation**: Complete locale strings for the Sesotho toggle in the footer.
- **Pudo Locker & The Courier Guy Live Rate Calculator**: Automated locker selection and door delivery shipping calculator.
- **SADC Regional Customs**: Dual currency display in ZAR (South African Rand) and LSL (Lesotho Loti) for cross-border logistics.

---

## [1.2.0] - 2026-10-23

### Commercial Online Store Pivot (`goldengracelegacy.co.za` / `goldengracelegacy.vercel.app`)

### Added
- **Paystack Instant 1-Click Gateway Integration** (`src/utils/paystack.js`):
  - Inline popup modal checkout supporting Capitec Pay, Ozow Instant EFT, Debit/Credit Cards (Visa / Mastercard), and Apple Pay.
  - Headless SSR safety, DOM script injection handling, and dev mode simulation fallback.
  - Multi-tier environment key resolution via `VITE_PAYSTACK_PUBLIC_KEY` with graceful staging fallbacks.
- **Sticky Mobile Add-to-Bag Bar** (`src/components/ui/sticky-mobile-cart-bar.jsx`):
  - Bottom-docked floating purchase pill activated upon scrolling past the hero showcase.
  - Quick product selector, live price formatting, and single-tap addition to the active cart session.
- **Live Batch Scarcity Engine** (`src/data/catalog.js`, `src/pages/home-page/sections/collection.jsx`):
  - Dynamic frame depletion metrics (`remainingJars`, `totalBatchJars`, `percentDepleted`).
  - Scarcity badges displaying real-time supply warnings (e.g., *"Only 34 jars remaining in Batch 2026/FS-01 before the winter bloom closes"*).
  - Low-stock warning indicators triggered automatically when batch inventory drops below threshold.
- **Post-Checkout Automated WhatsApp Waybill Hook** (`buildPostCheckoutWhatsAppUrl` in `src/utils/paystack.js`):
  - Automated WhatsApp dispatch tracking link generation connecting instant card payments with waybill tracking references.
  - Formats order reference, customer email, itemized manifest, and dispatch instructions directly into an encoded WhatsApp concierge message.
- **Free State Terroir Sampling Duo (Starter Bundle)** (`starter-bundle-duo`):
  - Entry-level dual jar discovery package (1 × 375g Aloe Ferox Reserve + 1 × 500g Welkom Wildflower Squeeze) priced at R240 to eliminate initial customer trial friction.
- **Progressive Web App (PWA) Offline Engine**:
  - Service worker (`public/sw.js`) with cache-first static asset caching and stale-while-revalidate runtime strategy for resilient browsing on rural Free State / Lesotho cellular networks.
  - Standalone web app manifests (`public/manifest.webmanifest`, `public/site.webmanifest`) configured with luxury obsidian `#050505` background and `#D4AF37` amber theme colors.
  - Tactile install banner (`src/components/common/pwa-install-banner.jsx`) hooking into the browser's native `beforeinstallprompt` event with session dismissal memory.
- **Google Rich Snippets Structured Data Schema** (`index.html`):
  - Embedded JSON-LD schema supporting Schema.org `Store`, `Product`, `Offer`, and `AggregateRating` (5.0 rating across 180+ verified reviews).
  - Maximizes organic search presence with rich star ratings and price rich snippets in Google Search.
- **Seasonal Bloom Pre-order Waitlist Modal** (`src/components/ui/waitlist-modal.jsx`):
  - Interactive lead generation modal allowing collectors to reserve allocations for out-of-season honey harvests (e.g., Highland Cosmos Reserve).
  - Integrated email and South African mobile number validation (`src/services/contracts.js`).
- **Interactive WhatsApp Concierge Floating Widget Upgrades** (`src/components/common/whatsapp-widget.jsx`):
  - Interactive quick-action navigation pills (`"Track My Order"`, `"Ask About Corporate Gifting"`, `"Bulk Honey Inquiries"`).
  - High-contrast indicator badge and accessibility enhancements.
- **Universal Store API Service & Contract Specifications**:
  - Enterprise service client (`src/services/store-api.js`) and contract validator (`src/services/contracts.js`) with client-side localStorage fallback for offline/disconnected resilience.
  - Standardized order reference generator (`GG-YYYYMMDD-XXXX`) and validation schemas.
- **PostgreSQL 15+ & Supabase Production Schema** (`docs/SCHEMA_AND_RLS.sql`):
  - Production database schema with tables for `products`, `harvest_batches`, `customers`, `orders`, `order_items`, `waitlist_leads`, `corporate_inquiries`, and `webhook_logs`.
  - Row Level Security (RLS) policies enforcing anonymous order insertion and restricted administrative access.
  - Webhook idempotency ledger preventing duplicate charge processing.
- **Extensive Field Media & Harvest Assets** (Commit `b9ecebf`):
  - 25 high-resolution raw harvest photographs (`harvest-1.jpg` through `harvest-25.jpg`) and authentic field footage from Virginia and Welkom apiaries.
  - Automated inspection and deduplication scripts (`scripts/scan_images.py`, `scripts/analyze_2026_10_20.py`, `scripts/check_short_names.py`).

### Changed
- **Sankofa Visual Template Library Component Restoration**:
  - Restored 17 modular legacy components (`src/components/`, `src/pages/`, `src/hooks/`) as the active Sankofa Visual Template Library while maintaining full archival provenance in `archive/2026-10/`.
  - Updated static asset baseline (`scripts/static-asset-baseline.json`) to track all active visual components.
- **Cart Drawer Commercial Conversion Overhaul** (`src/pages/home-page/sections/cart.jsx`):
  - Transformed the cart drawer into a dual-mode conversion powerhouse: Instant 1-Click Paystack Gateway alongside traditional WhatsApp Concierge checkout.
  - Goal-gradient free courier progress bar dynamically tracking proximity to the R500 complimentary delivery threshold.
  - Itemized quantity manipulation and persistent state synchronization.
- **Collection Section Real-Time Scarcity Display** (`src/pages/home-page/sections/collection.jsx`):
  - Integrated live stock counters, harvest season tags, and waitlist triggers on out-of-stock reserve varietals.

### Fixed
- Fixed cart state mutations during rapid quantity adjustments.
- Resolved Paystack inline script load timing and fallback handlers in headless test and browser environments.

### Security
- Added automated security and integrity verification gate (`scripts/check-security.mjs`) scanning for private keys, exposed bearer tokens, unhandled secrets, and running npm dependency audits.

---

## [1.1.1] - 2026-10-21

### Universal Navigation, Bandwidth Gating & Quality Gate Hardening

### Added
- **Universal Top Progress Bar** (`src/components/common/top-progress-bar.jsx`):
  - Fixed `z-[200]` gold progress bar providing tactile visual feedback during route changes.
  - Calibrated 250ms view transition overlay via `useNavigation` hook.
- **Sticky Backward Navigation Headers**:
  - High-contrast navigation bars (`<ArrowLeft /> Return to Storefront`) docked to the header and footer across all sub-views: `StoryPage`, `EducationHub`, and `GiftsPage`.
- **Browser History & Gesture Synchronization**:
  - Synchronized single-page view navigation with native browser history via `history.pushState` (`#full-story`, `#education`, `#gifts`).
  - Active `popstate` event listeners enabling native browser Back/Forward buttons and mobile edge-swipe gestures.
- **Hardware & Bandwidth Adaptive Gating** (`src/utils/media-gating.js` - `shouldDisableAutoplay`):
  - Automatic hero background video pausing on mobile viewports (< 768px).
  - Respects operating system `prefers-reduced-motion` accessibility flags.
  - Detects Chromium `navigator.connection.saveData` (Data-Saver mode) and slow cellular networks (2G / 3G) to conserve user mobile data bundles.
- **Solid Honeycomb Favicon Suite**:
  - Pure vector SVG honeycomb mark (`public/favicon.svg`) with high-contrast amber geometry.
  - Pixel-perfect solid-fill PNG mipmaps (16x16, 32x32, 48x48, 180x180 Apple touch icon, 192x192, 512x512).
- **Comprehensive Test Suite & Quality Gates**:
  - Authored comprehensive test suite (`tests/` directory) using Node's native test runner (`node --test --experimental-test-coverage`).
  - Achieved 100% line coverage and 88.10%+ branch coverage across all business logic, cart arithmetic, navigation state, and media gating utilities.
- **Historical Archival Audit Trail**:
  - Established partitioned time-stamped directory (`archive/2026-10/`) preserving all historical plans, prototypes, and scripts.
  - Published comprehensive ledger in `archive/2026-10/AUDIT_TRAIL.md`.
  - Authoring of 30-point strategic executive growth roadmap (`docs/EXECUTIVE_SUMMARY_THOSONTULA.md`).

### Changed
- **Pure Catalog Data Decoupling**:
  - Decoupled pure data definitions into `src/data/catalog.js` (tree-shakeable, SSR/Edge compatible, JSX-free) while preserving presentation constants in `src/data/constants.jsx`.
- **Barrel Export Standardization**:
  - Established clean barrel exports across `src/components/common`, `src/components/layout`, `src/components/ui`, and `src/utils`.
- **Sovereign Brand Hierarchy Elevation**:
  - Updated document title format to *"Golden Grace Legacy | Raw Artisanal Honey & Botanical Reserves"*.
  - Added cache-busting version query parameters (`?v=20261021`) across all favicon and manifest links.
  - Mobile padding budget adjustments across hero container and typography.

### Removed
- Pruned 17 unused prototype components and duplicate drafts (`recipes-page.jsx`, `reviews-page.jsx`, `featured-recipes.jsx`, `featured-reviews.jsx`, `featured-gifts.jsx`, `founder.jsx`, `education-hub.jsx` duplicate, `breadcrumbs.jsx`, `impact-tracker.jsx`, `image-modal.jsx`, `modal.jsx`, `toast.jsx`, `video-modal-common.jsx`, `container.jsx`, `section.jsx`, `product-card.jsx`, `useScrollLock.js`).
- Removed zero-byte artifacts (`App.css`, `deployment_log.md`) and Vite default placeholders (`react.svg`).
- Reduced CSS production bundle distribution size by 5.8% (78.51 kB to 73.99 kB).

### Fixed
- Fixed dead clicks in `GiftsPage` ("Request Catalogue" connected to WhatsApp concierge; "Build Your Hamper" linked to Collection).
- Activated "Enter the Reserve" glide anchor in `ContentBreak`.
- Reconnected education conversion bridge in `Authenticity` section.
- Corrected footer view mapping mismatch (`'story'` ➔ `VIEWS.STORY`) and added Bespoke Gifting Suites (`VIEWS.GIFTS`) link.
- Resolved Vite HMR invalidation warnings during hot reload.

---

## [1.1.0] - 2026-10-20

### Storefront Re-architecture & Sovereign Brand Hierarchy Pivot

### Added
- **Sovereign Brand Hierarchy**:
  - Re-architected site-wide visual language and typography lockups to establish "Golden Grace Legacy" as the primary parent brand, with "Golden Grace Honey" positioned as the premier product line.
- **Custom Domain Integration**:
  - Integrated 1Grid custom domain `goldengracelegacy.co.za` with secondary domain routing for `goldenlegacy.co.za`.
- **Official Email Dispatch Routing**:
  - Configured corporate email dispatch routing for `info@goldengracelegacy.co.za` and `grace@goldengracelegacy.co.za`.
- **Kingdom Nexus Terroir Telemetry**:
  - Integrated geographical coordinates and terroir provenance data for Welkom Central Apiary, Virginia Veld Reserve, and the Maloti Foothills.
- **Legacy Trust Drawer**:
  - Slide-out drawer displaying DALRRD apiary registration details, ethical harvesting principles, and lab analysis certificates.
- **Static Asset Verification Gate** (`scripts/check-static-assets.mjs`):
  - Pre-build script verifying asset path integrity against `scripts/static-asset-baseline.json`.

### Changed
- Elevated storefront architecture with luxury obsidian palette (`#050505`), metallic amber accents, and improved hierarchy.
- Upgraded footer with dual-brand navigation links, Kingdom Nexus coordinates, and legal disclaimers.
- Promoted `preview` branch to `main` with full storefront launch foundation, luxury UX, and core assets.

### Removed
- Cleaned up unreferenced dummy event handlers and placeholder analytics calls.

---

## [1.0.2] - 2026-01-17

### Interactive Authenticity & Sensory Suite

### Added
- **Viscosity Physics Simulator** (`ViscosityPour`):
  - Interactive tactile simulation calculating honey fluid resistance, drop rate, and thumb-zone haptic jitter dynamics.
- **Bio-Acoustic Hive Audio Component** (`TerroirCompass`, `bio-acoustic-hum`):
  - Terroir compass navigator mapping dynamic floral profiles paired with ambient apiary sound simulations.
- **Animated Marquee Trust Bar**:
  - Continuously scrolling certification display showcasing DALRRD DFS194 apiary registration, CoA compliance, and raw unheated credentials.
- **The Forager Loader**:
  - Atmospheric full-screen loader with dynamic narrative cycling and balanced oscillation compass navigator.
- **Cinematic Sanctuary Video Experience**:
  - Full-screen video modal player with narrative chaptering (`src/pages/home-page/sections/video-modal.jsx`).
- **Interactive Journey Section**:
  - Interactive process showcase with educational detail modal (`DetailModal`) and custom animated bee close button (`BeeCloseButton`).

### Changed
- **Authenticity Section Overhaul**:
  - Glass cards, honeycomb background textures, uniform section headings, and 3 empirical home purity tests (Thumb, Water, Heat).
- Enhanced responsive fluid layout and cross-browser typography scaling.

### Fixed
- Corrected jitter intensity calculation in the viscosity simulator for accurate physical resistance.
- Resolved stacking context issues and spacing optimization in the Journey section.
- Enforced dark background on native select inputs to eliminate white background flash on mobile viewports.

---

## [1.0.1] - 2025-12-25

### Mobile Readability & Layout Polish

### Added
- Dynamic mobile viewport height adjustments (`100dvh`) and mobile container padding budgeting.
- Explicit dark system theme overrides across mobile browser chrome.
- Component modularization and subfolder organization.

### Fixed
- Replaced deprecated icon components with updated Lucide React icons.
- Fixed hero container spacing and padding for compact mobile screens.
- Improved form input contrast and readability on mobile Safari and Chrome.

---

## [1.0.0] - 2025-12-25

### Initial Foundation Release

### Added
- Initial project scaffolding using Vite, React 19, and Tailwind CSS.
- Atmospheric hero section with image carousel and cinematic video player modal with "Watch Film" trigger.
- Bespoke Gifting section introducing the Sankofa cultural narrative and artisanal packaging options.
- WhatsApp Ordering Engine:
  - Dynamic generation of pre-filled WhatsApp order messages with itemized bag manifests and subtotal calculations.
- Vercel edge deployment configuration (`vercel.json`).
- Core product catalog introducing raw artisanal Free State honey varietals (Aloe Ferox Reserve, Welkom Wildflower, Blossom Squeeze).
- Basic breadcrumb navigation and responsive mobile layout foundation.

---

[Unreleased]: https://github.com/goldengracelegacy/golden-grace-honey/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/goldengracelegacy/golden-grace-honey/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/goldengracelegacy/golden-grace-honey/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/goldengracelegacy/golden-grace-honey/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/goldengracelegacy/golden-grace-honey/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/goldengracelegacy/golden-grace-honey/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/goldengracelegacy/golden-grace-honey/releases/tag/v1.0.0
