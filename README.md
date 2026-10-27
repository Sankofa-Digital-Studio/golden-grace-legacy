# Golden Grace Legacy & Honey 🍯

> **Official Sovereign E-Commerce Storefront & Heritage Platform**  
> Canonical Production: [https://goldengracelegacy.co.za](https://goldengracelegacy.co.za)  
> Vercel Production: [https://goldengracelegacy.vercel.app](https://goldengracelegacy.vercel.app)  
> Staging & Preview: [https://golden-grace-legacy.vercel.app](https://golden-grace-legacy.vercel.app)

[![Version](https://img.shields.io/badge/version-1.2.0-amber.svg)](CHANGELOG.md)
[![Test Coverage](https://img.shields.io/badge/branch_coverage-92.01%25-brightgreen.svg)](tests/)
[![Security Gate](https://img.shields.io/badge/security-POPIA_Compliant-gold.svg)](docs/SECURITY_AND_POPIA_COMPLIANCE.md)
[![Regulatory Code](https://img.shields.io/badge/DALRRD_Apiary-DFS194-blue.svg)](docs/SCHEMA_AND_RLS.sql)
[![B-BBEE](https://img.shields.io/badge/B--BBEE-Level_1_Compliant-emerald.svg)](docs/ARCHITECTURE_AND_USER_FLOW.md)
[![Framework](https://img.shields.io/badge/Vite-7.2-646CFF.svg)](package.json)
[![React](https://img.shields.io/badge/React-19.0-61DAFB.svg)](package.json)

---

## 1. Sovereign Brand Mandate & Overview

**Golden Grace Legacy** is the official online store for 100% pure, single-origin, raw South African honey and bespoke honey-centric / corporate gifting suites. The platform operates under registered apiaries in Welkom and Virginia, Free State (**DALRRD Registration DFS194**).

The application is engineered strictly around commercial sales conversion. All educational, botanical, biological enzyme, and heritage narratives function as sovereign authority anchors that channel visitors into product selection and frictionless checkout.

### Core Product Suites
1. **The Honey Reserve (Retail Retail Line)**:
   - *Aloe Ferox Reserve* (Welkom Central Aloe, Hexagonal Glass)
   - *Veld Wildflower* (Northern Belt Multi-Floral, BPA-Free Squeeze)
   - *Highland Cosmos Reserve* (Late Summer Bloom, Strictly Limited)
   - *The Terroir Discovery Duo* (Starter Reserve Duo, Specially Priced at R240)
2. **Bespoke & Corporate Gifting Suites**:
   - Executive & Institutional Suites (B-BBEE Level 1 compliant, custom wax seals, wooden presentation boxes)
   - Curated Celebration Hampers (Luxury weddings, bespoke hosting favors)

---

## 2. Elite Architecture & Forward-Looking Mitigators

### A. High-Conversion E-Commerce Stack (P0 Multipliers)
* **Paystack 1-Click Instant Gateway** ([`src/utils/paystack.js`](src/utils/paystack.js)): Inline popup supporting Apple Pay, Capitec Pay, Ozow Instant EFT, and Visa/Mastercard with 3D Secure. Includes dev-mode simulation and automatic script injection.
* **Sticky Mobile Add-to-Bag Bar** ([`src/components/ui/sticky-mobile-cart-bar.jsx`](src/components/ui/sticky-mobile-cart-bar.jsx)): Thumb-zone persistent purchase dock for handheld devices.
* **Live Batch Scarcity Meter** ([`src/data/catalog.js`](src/data/catalog.js)): Real-time depletion metrics (`remainingJars` / `totalBatchJars`) and progress indicators.
* **Post-Checkout Automated WhatsApp Waybill Hook** ([`src/utils/paystack.js`](src/utils/paystack.js)): Automatically formats transaction references into instant courier dispatch links.
* **PWA Offline Resilience** ([`public/sw.js`](public/sw.js)): Service worker with cache-first static caching and stale-while-revalidate strategy for rural network resilience.
* **Google Star Rating Rich Snippets** ([`index.html`](index.html)): Embedded JSON-LD schema supporting Schema.org `Store`, `Product`, and `AggregateRating` (4.9/5 stars).

### B. Enterprise Security & POPIA Vault (Top 3% Mitigators)
* **Field-Level Envelope Encryption (AES-256-GCM)** ([`src/services/security-vault.js`](src/services/security-vault.js)): Customer mobile numbers, physical addresses, and corporate notes are encrypted at rest with fresh 96-bit IVs before touching PostgreSQL. Leaked database backups contain zero plaintext PII.
* **Deterministic Blind Indexing (HMAC-SHA256)** ([`src/services/security-vault.js`](src/services/security-vault.js)): Allows exact-match searching (`WHERE phone_blind_index = ?`) without decrypting rows or storing readable PII.
* **Cryptographic Proof of Provenance (Digital Wax Seal)** ([`src/services/security-vault.js`](src/services/security-vault.js)): Deterministic HMAC-SHA256 signature binding order reference, total, batch numbers, and DALRRD DFS194 regulatory codes, eliminating invoice tampering and counterfeit claims.
* **Zero-Knowledge Ephemeral Tracking Grant Tokens** ([`src/services/security-vault.js`](src/services/security-vault.js)): 1-tap mobile tracking delivered via WhatsApp/SMS without password friction; eliminates 100% of IDOR enumeration attacks.
* **Dynamic Egress Redaction**: Automatic data masking (`082 *** *567`, `14 J** C****** St`).

---

## 3. Repository Structure & Component Hierarchy

```
golden-grace-honey/
├── .github/                      # GitHub Workflows & Issue Templates
│   └── workflows/
│       ├── quality-gate.yml      # CI Quality Gate (Lint, Test, Asset Check, Build)
│       └── release-tag.yml       # Production Release Tag & Notes Automation on origin/main
│
├── docs/                         # Sovereign Architecture & Contracts
│   ├── ARCHITECTURE_AND_USER_FLOW.md   # Conversion funnels & component tree
│   ├── API_CONTRACTS.md               # Frontend-to-backend payload contracts
│   ├── SCHEMA_AND_RLS.sql             # PostgreSQL / Supabase schema & RLS policies
│   ├── SECURITY_AND_POPIA_COMPLIANCE.md # Cryptographic algorithms & POPIA compliance
│   └── RELEASE_LOG.md                 # Production deployment checklist & runbook
│
├── src/
│   ├── config/                   # Maintenance gate & WhatsApp phone configuration
│   ├── context/                  # CartContext (Basket state & free courier calculations)
│   ├── data/                     # Pure ESM catalog data (Node/Vite tree-shakeable)
│   ├── hooks/                    # useNavigation, useAnalytics, useSEO, useScrollLock
│   ├── services/                 # store-api.js, contracts.js, security-vault.js
│   ├── utils/                    # paystack.js, whatsapp-order.js, media-gating.js
│   ├── components/
│   │   ├── layout/               # Navbar, Footer, Container, Section
│   │   ├── ui/                   # ProductCard, StickyMobileBar, WaitlistModal, etc.
│   │   └── common/               # WhatsAppWidget, TopProgressBar, PWAInstallBanner, etc.
│   └── pages/                    # HomePage, GiftsPage, StoryPage, EducationPage, etc.
│
├── tests/                        # Node.js Native Test Runner Suite (80 passing tests)
├── CHANGELOG.md                  # Keep a Changelog 1.0.0 & SemVer Record
└── README.md                     # You Are Here
```

---

## 4. Production Version Control & Deployment Protocol

All deployments to **`origin/main`** must adhere to the following governance protocol:

```mermaid
flowchart LR
    Dev["development branch<br/>(Active Work)"] -->|"Validate & Pass CI"| Prev["preview branch<br/>(Vercel Staging)"]
    Prev -->|"Smoke Test & Approval"| Main["main branch<br/>(Production Canonical)"]
    Main -->|"Tag Creation"| Tag["Annotated Git Tag<br/>v1.x.x"]
    Main -->|"Release Notes"| Rel["CHANGELOG.md &<br/>RELEASE_LOG.md"]
```

### Production Deployment Rules
1. **Zero Unvalidated Commits:** Code must never be pushed directly to `main` without running `npm run validate`.
2. **Release Documentation:** Every merge to `origin/main` MUST increment the version in `package.json`, be documented in `CHANGELOG.md` under a dated release header, and update the milestone ledger in `docs/RELEASE_LOG.md`.
3. **Annotated SemVer Git Tags:** An annotated git tag matching the version (e.g. `v1.2.0`) must be created on `main` and pushed to `origin`:
   ```bash
   git tag -a v1.2.0 -m "Release v1.2.0: Official E-Commerce Storefront Launch"
   git push origin v1.2.0
   ```
4. **Automated Promotion Script:** Use the automated release runner to synchronize branches, run quality checks, create tags, and push:
   ```bash
   npm run release:main
   ```

---

## 5. Getting Started & Development

### Prerequisites
* **Node.js**: v20.x or v22.x LTS
* **npm**: v10.x+

### Local Setup
```bash
# Clone the repository
git clone https://github.com/Sankofa-Digital-Studio/golden-grace-legacy.git
cd golden-grace-legacy/golden-grace-honey

# Install dependencies
npm ci

# Start local development server
npm run dev
```

### Environment Variables (`.env.local`)
```ini
# Paystack Payment Gateway (Public Key)
VITE_PAYSTACK_PUBLIC_KEY="pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Optional Supabase Integration (Live Database)
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 6. Testing & Quality Assurance

Golden Grace enforces strict automated validation gates before any commit or release:

```bash
# Run unit & integration tests with coverage
npm test

# Run complete 5-stage pre-deployment validation gate
npm run validate
```

### Current Validation Status
* **Test Suite**: 80/80 passed (100% pass rate)
* **Line Coverage**: **99.47%**
* **Branch Coverage**: **92.01%** (Strict requirement: >85%)
* **Function Coverage**: **100.00%**
* **Static Assets**: 0 missing catalogue gaps
* **Security Audit**: 0 secret leaks, 0 production high/critical vulnerabilities

---

## 7. License & Sovereign Ownership

© 2026 Golden Grace Legacy & Honey. All rights reserved.  
Architected in collaboration with **Sankofa Digital Studio**.
Licensed under the [MIT License](LICENSE).
