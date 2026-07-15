# Storefront launch plan

This plan turns the July 2026 review into an implementation sequence while preserving Golden Grace Honey's dark, editorial, faith-led identity.

## Guardrails

- Keep maintenance mode enabled until every P0 issue is accepted.
- Use only approved products, prices, imagery, delivery terms and trust claims.
- Keep WhatsApp as the honest assisted-order path until a tested checkout exists.
- Validate every customer-facing change on a 360px-wide viewport.

## Delivery sequence

| Phase                | Outcome                                                       | GitHub issues | Exit condition                                                                         |
| -------------------- | ------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------- |
| P0 Foundation        | A truthful, navigable and testable purchase path              | #13–#17       | Approved catalogue; cart/order flow works; missing assets resolved; quality gate green |
| P1 Conversion        | Faster product discovery, stronger proof and mobile usability | #18, #20      | Products and primary CTA appear early; mobile/accessibility review passes              |
| P1/P2 Trust & growth | Verified trust content and measurable conversion              | #19           | Approved claims/content published; funnel events and operating policies live           |

The programme tracker is GitHub issue #21. Individual findings contain evidence, acceptance criteria, dependencies and implementation notes.

## First implementation slice

- Consolidate cart state, preserve size variants and persist the bag locally.
- Replace the nonexistent checkout route with an itemised WhatsApp handoff.
- Repair the hero-to-collection action and remove the forced entry delay.
- Add CI for lint, tests, static assets and production build.
- Add issue, pull-request and dependency-update automation.

Known missing commercial/content assets are baselined temporarily so CI rejects new breakage. Issue #16 owns reducing that baseline to zero; issue #13 owns catalogue approval.
