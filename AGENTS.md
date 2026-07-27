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
- Render the mobile hero directly in its final state without GSAP repositioning or post-load image snapping, and account for iPhone safe-area insets in the fixed header, hero offset, and open navigation panel.
- Keep GSAP and ScrollTrigger out of the mobile download path through desktop-only dynamic imports; avoid `content-visibility` reveal bursts, decode only three Approach images on phones, and remove expensive mobile blur/shadow paint effects.
- Warm the remaining mobile project/Approach images with idle asynchronous decoding and isolate the fixed header/WhatsApp launcher into small paint-contained compositor layers to avoid cold-scroll decode and repaint stalls.
- Keep the desktop navigation in document order: Home, Projects, Approach, Services, Principles, numbered 01–05.
- Begin the desktop Approach title while the section is entering after Projects, and cap the progress velocity of the Approach, Services, and Principles timelines so fast wheel or trackpad input still resolves cinematically.
- Exit the desktop Services scene completely through the top-left corner, revealing Principles beneath it as a full diagonal transition.
- On mobile, keep “Electrical, made clear.” on one compact line below the safe-area header, place its supporting copy directly underneath, and anchor the two high-contrast hero actions near the bottom of the team image.
- Keep the mobile Approach stack compact: title, cards, five process nodes, and the following section should read as one continuous composition without large reserved gaps.
- Keep every mobile contact input and textarea at a computed font size of at least 16px so iOS Safari does not zoom the page when a field receives focus.
