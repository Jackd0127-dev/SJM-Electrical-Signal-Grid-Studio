# Design QA — SJM Electrical Signal Grid Studio

## Visual target

- Structural reference: `design-source.png`
- Brand source: the supplied SJM Electrical vector identity pack
- Direction retained: modular hero, vertical signal word, pinned project reel, circular journey map, service matrix, horizontal principle rail, compact FAQ, and dark footer
- Rebrand changes: SJM logo system, #1E1E1D primary, #C36734 accent, local electrician imagery, electrical-service copy, noindex metadata, and portfolio-safe contact behaviour

## Evidence reviewed

- Desktop: 1440 × 900 and 1024 × 768
- Tablet: 768 × 1024
- Mobile: 390 × 844 and 320 × 700
- Captures: `output/playwright/`
- Surfaces: hero, project reel, approach map, services, principles, FAQ, footer, mobile menu, and expanded mobile FAQ

## Findings

- P0 blockers: none.
- P1 material mismatches: none.
- P2 polish issues: none outstanding after the 768 px footer overflow fix.
- Document horizontal overflow: 0 px at 1440, 1024, 768, 390, and 320 px.
- All local images, fonts, favicon, and SJM vectors loaded successfully.
- Browser console errors: 0 after the testimonial-key correction.
- Failed runtime requests: 0; all observed local assets returned 200 or cache-valid 304 responses.
- Desktop project pinning and progress state remain active.
- Mobile project rail reaches project 04 and updates the counter to `04 — 04`.
- Principle next/previous controls scroll by one card.
- Mobile menu opens, closes, and navigates to the requested section.
- FAQ items expand independently with correct `aria-expanded` and `aria-hidden` state.
- The portfolio disclosure, illustrative `.example` address, `noindex, nofollow`, and non-submitting contact behaviour are present.
- Skip navigation, visible focus, semantic controls, descriptive image text, and reduced-motion CSS remain present.

## Verification

- `npm run build`: passed.
- `npm run test:sites`: passed, 4/4.
- Playwright responsive and interaction QA: passed.
- Original NESH project: untouched.

final result: passed
