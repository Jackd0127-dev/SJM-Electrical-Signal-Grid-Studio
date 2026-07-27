# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Selected direction

- This is the approved SJM Electrical rebrand of the “Signal Grid Studio” layout.
- Treat `design-source.png` as the structural and interaction reference, while the supplied SJM Electrical identity pack controls the logo, #1E1E1D primary, #C36734 accent, and white palette.
- Keep the modular hero, vertical signal word, black pinned project reel, circular journey map, service matrix, principle rail, and compact dark FAQ/footer.
- Preserve the source scroll choreography, motion quality, responsive behaviour, and interactions.
- Use only local SJM brand assets and original locally bundled trade photography. Do not restore NESH identity, portrait, client media, external links, or third-party endorsements.
- Keep the portfolio disclosure, `noindex, nofollow`, illustrative `.example` contact address, and non-submitting contact behaviour until real business details and claims are supplied and authorised.
- Do not overwrite `/Users/jackd/Desktop/Recreating Website Templates/Nesh/NESH-Signal-Grid-Studio` or `/Users/jackd/Desktop/Novas-Trade-Sites/Template-NESH`.
- On mobile, compose the team photography behind the hero copy, keep the two proof statistics followed by the SJM wordmark, omit the five working-value bullets, and drive the centred project-card rail from vertical scrolling before releasing into the next section.
- Keep the mobile menu control pinned to the header's top-right cell without a stretched tap/focus background; centre the hero CTAs and proof cards, and present Services as a natural single-column page flow rather than a pinned horizontal animation.
- Present the mobile concept-project reel as a centred vertical stack driven by ordinary page scrolling, with a mobile-specific “Scroll to explore concepts” cue; keep the Services Email and Call pills centred as an equal two-column row.
- Prioritise native mobile scrolling below the project stack: avoid scrubbed/pinned GSAP timelines at phone widths, use natural document flow for Approach, Services, Principles, and Footer, and reserve the full choreography for larger screens.
