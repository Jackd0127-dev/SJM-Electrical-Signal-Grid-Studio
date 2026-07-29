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
- Keep GSAP and ScrollTrigger out of the mobile download path through desktop-only dynamic imports; avoid `content-visibility` reveal bursts and remove expensive mobile blur/shadow paint effects.
- Warm the remaining mobile project images with idle asynchronous decoding and isolate the fixed header/WhatsApp launcher into small paint-contained compositor layers to avoid cold-scroll decode and repaint stalls.
- Keep the desktop navigation in document order: Home, Projects, Approach, Services, Principles, numbered 01–05.
- Begin the desktop Approach title while the section is entering after Projects, and cap the progress velocity of the Approach, Services, and Principles timelines so fast wheel or trackpad input still resolves cinematically.
- Exit the desktop Services scene completely through the top-left corner, revealing Principles beneath it as a full diagonal transition.
- On mobile, keep “Electrical, made clear.” on one compact line below the safe-area header, place its supporting copy directly underneath, and anchor the two high-contrast hero actions near the bottom of the team image.
- Present Approach as a full-bleed, web-optimised background video assembled from the three supplied interior clips; remove the six image cards and draw the five-step linkage over the footage, positioned higher in the scene with an atmospheric SJM charcoal/burnt-orange colour treatment.
- Keep the desktop Approach heading slightly lower than the header edge, use a clearly visible charcoal/burnt-orange mask, and preserve the supplied footage at sharp 1080p quality rather than relying on a soft low-bitrate encode.
- Keep the mobile Approach composition compact: title, video, five process nodes, and the following section should read as one continuous composition without large reserved gaps.
- Keep every mobile contact input and textarea at a computed font size of at least 16px so iOS Safari does not zoom the page when a field receives focus.
- Header navigation to Approach, Services, and Principles should land on each section's completed presentation state; ordinary page scrolling should still play the full cinematic sequence.
- Keep desktop motion on one smoothing layer: match the approved reference's frame pacing by running Lenis and ScrollTrigger from the shared GSAP ticker, keeping lag smoothing disabled, applying a one-second scrub to the project rail, warming project images before the rail, and avoiding computed-style reads or CSS custom-property mutations inside its update loop. Cache geometry outside scroll loops, pause background video offscreen, and continue to use native mobile scrolling without Lenis or GSAP.
- End the desktop Projects rail on the complete fourth card, release the pinned section there, and continue downward into Approach through normal vertical scrolling; do not zoom, blur, wash over, or otherwise expand the final project image.
- Begin revealing all four “Clear from the start” words as soon as Approach crosses the bottom of the desktop viewport; do not reserve a blank paper-colour lead-in after Projects releases.
- Begin revealing all four “Useful expertise. Neatly delivered.” words as soon as Services crosses the bottom of the desktop viewport; do not reserve an empty dark lead-in after Approach.
- Keep the desktop Approach and Services word transitions deliberately low-sensitivity: a normal wheel gesture should advance one readable stage, not reveal the words and collapse them into the final heading at once. Preserve immediate section entry while using longer scroll ranges and capped animation velocity.
- Replace the former Services project/email/call CTA cluster with the SJM editorial sentence “Careful planning, precise installation, and clear communication combined — turning your electrical plans into safe, considered work that feels effortless.” Match the NESH reference’s scrubbed per-character reveal, adapted to white-on-charcoal SJM styling, but use normal selectable text spaces without oversized editorial gaps; keep mobile text fully visible without GSAP.
- Begin the footer contact fields alongside the footer heading as soon as the footer enters the viewport; do not sequence the form so late that the sticky footer has started scrolling away before the fields become readable.
- Begin revealing “Work should feel like.” and its principle cards as soon as Principles crosses the bottom of the desktop viewport. Drive the testimonial rail directly from vertical scroll with the same one-second ScrollTrigger scrub used by Projects; do not put this horizontal rail behind the slower cinematic progress cap.
