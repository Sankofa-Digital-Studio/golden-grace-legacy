# UI/UX Plan (Expert Mode)

Audience: current developer, next developer (junior/intern)
Goal: improve engagement and conversion while preserving the brand soul and story.

## DRAFT (Discovery + Direction)

North star
- "Not simply developing custom software, but capturing soul and story with every keystroke."
- Every interaction should feel intentional, ceremonial, and truthful.

Primary conversion paths
- Reserve collection purchase
- Gift catalogue / build-a-box inquiry
- Community proof (reviews + testimonies)

Experience gaps (before changes)
- Education Hub sections contain placeholders and no story flow.
- Missing imagery on Recipes page breaks trust.
- Story page CTA does not navigate to the collection.
- Footer background reference missing an asset (Vite warning).

## REVIEW (What to Improve Next)

UI/UX strategy
- Clarify narrative arc on all secondary pages (Education, Story, Recipes, Gifts).
- Increase credible proof points: curated testimonies, verified techniques, clarity about process.
- Reduce cognitive load by focusing each page on one promise and one action.

Engagement and conversion levers
- Hero: emphasize primary CTA with fewer distractions, keep secondary softer.
- Education Hub: structured sessions + practical application + community proof.
- Recipes: real imagery and clear categories to reduce drop-off.
- Story: direct path back to collection via guided CTA.

Content plan (no deletions)
- Add Academy sessions with level/duration and takeaways.
- Add Community Wall entries with name, role, location, and product.
- Add testimony submission modal (simple form with trust statement).
- Normalize imagery sources to existing assets.
- Fix navigation CTA in Story page.
- Provide map pattern asset to resolve footer background warning.

## PUBLISH (Implementation Notes)

What was implemented now
- Education Hub: Academy sessions grid, Community Wall, and submission modal.
- Story page: CTA now routes to the home collection section.
- Recipes page: updated to real local imagery.
- Added `public/images/ui/map-pattern.svg`.
- Added responsive `sizes` hints for hero and product images.

Conversion rationale
- Academy sessions create authority (trust).
- Community Wall creates social proof and reduces hesitation.
- Testimony modal invites engagement without forced commitment.
- Correct imagery preserves credibility and luxury positioning.

Next improvements to consider
- Add a low-bitrate loop for the hero background video (separate from documentary source).
- Create real responsive image variants and wire `srcSet` into `OptimizedImage`.
- Add structured data (Product, Organization) for SEO.
