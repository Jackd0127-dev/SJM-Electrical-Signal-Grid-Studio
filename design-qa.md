# Design QA — Footer Logo and Process Swooshes

## Comparison target

- Source visual truth:
  - `output/playwright/process-02-04-halo.png`
  - `output/playwright/footer-big-logo-bottom.png`
- Rendered implementation:
  - `output/playwright/qa-process-swoosh-1440x1000.png`
  - `output/playwright/qa-footer-logo-raised-1440x1000.png`
- Combined comparison: `output/playwright/qa-footer-process-comparison.png`
- Viewport and pixels: 1440 × 1000 CSS px and 1440 × 1000 captured px for every source/implementation pair.
- Density normalization: 1 CSS pixel to 1 captured pixel; no scaling or device-frame normalization required.
- State:
  - Approach section pinned with all four animated paths fully drawn.
  - Footer curtain fully revealed at the bottom of the page.

## Findings

- P0 blockers: none.
- P1 material mismatches: none.
- P2 visual issues: none outstanding.
- The new raised double-curves visibly clear the `02` and `04` labels before settling smoothly into their dots.
- The remaining line segments still connect dot-to-dot and retain their existing draw-on animation.
- The footer brandmark is visibly higher while the three-column directory, divider, and bottom metadata remain balanced.
- Fonts and typography: unchanged from the approved implementation; label hierarchy and footer lockup remain legible.
- Spacing and layout rhythm: the process labels now have clear negative space around the orange stroke; the footer logo has increased separation from the directory.
- Colors and visual tokens: unchanged; the existing paper, ink, acid-orange, and white tokens are preserved.
- Image quality and asset fidelity: the original SJM vector logo and approved project images remain unchanged and sharp.
- Copy and content: unchanged.
- Responsive check: 390 × 844 footer capture passed with no horizontal overflow (`scrollWidth` = `innerWidth` = 390).
- Browser console warnings/errors: none in the final desktop footer capture.

## Comparison history

1. Earlier P2: the standard cubic path passed visually through the `02` and `04` number area.
   - Fix: replaced the two incoming raised-node paths with two-stage cubic swooshes that rise above each label and return to the existing dot with a smooth horizontal tangent.
   - Post-fix evidence: `output/playwright/qa-process-swoosh-1440x1000.png`.
2. Earlier P3: the oversized footer logo sat slightly too low.
   - Fix: increased the desktop and mobile brandmark bottom spacing, moving the logo upward without changing its size.
   - Post-fix evidence: `output/playwright/qa-footer-logo-raised-1440x1000.png` and `output/playwright/footer-logo-raised-mobile-final.png`.

## Focused-region evidence

A separate crop was not needed: both requested details occupy large, clearly legible regions in the native-resolution 2880 × 2000 combined comparison.

## Verification

- `npm run build`: passed.
- `npm run test:sites`: passed, 4/4.
- `git diff --check`: passed.
- Protected Website Streamline masters: passed integrity verification before editing.

## Project Imagery and Services Iteration

- Source visual truth:
  - `/var/folders/rx/kv_n6dvd5dq1y39wb6sw25th0000gn/T/codex-clipboard-58297517-882b-428f-a976-fae46df67bd5.png`
  - `/var/folders/rx/kv_n6dvd5dq1y39wb6sw25th0000gn/T/codex-clipboard-bc54cec7-0807-4ecd-8ea1-f567786a2ddd.png`
  - `/var/folders/rx/kv_n6dvd5dq1y39wb6sw25th0000gn/T/codex-clipboard-8501caab-e575-4bdd-b0e7-09103dea116f.png`
- Rendered evidence:
  - `output/playwright/projects-new-images-mid.png`
  - `output/playwright/projects-consumer-zoom-wash-mid.png`
  - `output/playwright/approach-six-updated-images.png`
  - `output/playwright/services-roomier-layout-final-cta.png`
  - `output/playwright/services-roomier-layout-mobile-final.png`
- Viewports: 1280 × 720 desktop and 390 × 844 mobile at 1 CSS pixel per captured pixel.
- Project image crops preserve the supplied subjects: architectural lighting, wall-mounted EV charger and car, and electrician testing a consumer unit.
- The final project expands beyond the viewport while a paper-colour wash rises from 0 to 1 opacity; the next section uses the same `rgb(238, 233, 225)` paper colour.
- All six approach-stack images load successfully, including the three new user-supplied project assets.
- Services title now settles 41px below the desktop header, with increased title-to-summary, summary-to-grid, card and CTA spacing.
- Desktop CTA finishes at 699px in the 720px viewport; mobile reflows to 390px with no document-width overflow.
- Fonts, colour tokens, copy hierarchy, icons and approved interaction timing remain unchanged.
- Browser console warnings/errors: none outstanding.

final result: passed

## Services Contact Pills and Diagonal Exit — Partially Superseded

- Historical CTA QA only: the Services CTA and contact pills were removed on 29 July 2026; the diagonal exit remains current.
- Rendered evidence:
  - `output/playwright/services-contact-pills-desktop.png`
  - `output/playwright/services-contact-pills-mobile.png`
  - `output/playwright/services-diagonal-exit-desktop.png`
  - `output/playwright/services-diagonal-exit-mobile.png`
- Viewports: 1200 × 774 desktop and 390 × 844 mobile at 1 CSS pixel per captured pixel.
- Email and WhatsApp contact actions finish side by side beneath the primary project CTA at both viewport sizes.
- The Email pill exposes a visible `Copied to clipboard` success state and retains the existing live-region announcement.
- WhatsApp remains demo-safe: it leads to the portfolio contact area and does not invent a live telephone number or external destination.
- The whole dark Services scene exits toward the top-left as one foreground plane, revealing the matching paper-colour Principles surface from the bottom-right.
- The mobile CTA finishes at 749px and its contact row at 809px in the 844px viewport; neither is clipped.
- Browser console warnings/errors: none.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4/4.
- `git diff --check`: passed.
- Protected Website Streamline masters: passed integrity verification after editing.

## Direct Contact Actions and Enquiry Form — Services CTA Superseded

- The footer enquiry form and directory contact links remain current; the former Services CTA/contact row documented below was removed on 29 July 2026.
- Rendered evidence:
  - `output/playwright/services-email-call-whatsapp-desktop.png`
  - `output/playwright/services-email-call-whatsapp-mobile.png`
  - `output/playwright/footer-contact-form-desktop.png`
  - `output/playwright/footer-contact-form-mobile.png`
- Viewports: 1200 × 774 desktop and 390 × 844 mobile at 1 CSS pixel per captured pixel.
- The Approach `Explore services` button has been removed from both the visual and accessibility trees.
- Services now exposes direct `mailto:hello@sjm-electrical.example` and `tel:+441632960123` links.
- The call number is an Ofcom-reserved fictional demo number and is recorded in `REBRAND-NOTES.md`.
- A persistent WhatsApp action opens a prefilled composer URL without an invented recipient.
- On mobile, the Services contact row reserves the floating control's footprint; Email, Call and WhatsApp do not overlap.
- The footer contact heading has exactly two authored, centred lines at desktop and mobile widths.
- The contact form includes required name, required email, optional phone, required project-help detail, and a submit action.
- Submitting produces an explicit local-demo confirmation and performs no network transmission.
- Mobile form bounds are 372–716px within an 844px viewport, with no horizontal overflow.
- Browser console warnings/errors: none.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4/4.
- `git diff --check`: passed.
- Protected Website Streamline masters: passed integrity verification after editing.

## Final Project Zoom, Blur and Paper Transition — Superseded

- Historical QA only: this terminal zoom treatment was removed on 29 July 2026 in favour of a normal vertical release into Approach.
- Rendered evidence:
  - `output/playwright/projects-final-zoom-blur-transition.png`
  - `output/playwright/projects-final-paper-fill.png`
- Viewport: 1200 × 774 desktop at 1 CSS pixel per captured pixel.
- The final project media reaches a stable 1.0 inner depth scale before expanding, removing the previous right-edge gap.
- Terminal media bounds are `-132px` left, `1332px` right, `-141px` top and `915px` bottom, providing overscan on all four viewport edges.
- The image simultaneously enlarges to 1.12, fades to 0.38 opacity and increases to a 20px blur.
- The transition wash resolves to `rgb(238, 233, 225)`, exactly matching the computed `about-section` paper colour.
- The zoom position is derived from stable offsets inside the pinned canvas, so restored positions and fast scrolling do not displace the final frame.
- Browser console warnings/errors: none.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4/4.
- `git diff --check`: passed.
- Protected Website Streamline masters: passed integrity verification after editing.

## Desktop Scroll Smoothness Alignment

- Motion reference: `/Users/jackd/Desktop/Recreating Website Templates/Nesh/NESH-Azure-Edition` at `http://127.0.0.1:43113/`.
- SJM target: `http://127.0.0.1:43116/`.
- The visible layout, copy, colour, spacing, card order and project imagery remain unchanged.
- Desktop scrolling now follows the reference architecture: Lenis and ScrollTrigger share the GSAP ticker, ticker lag smoothing is disabled, and the project rail uses a one-second scrub.
- Project-card depth updates run on the rail timeline's eased clock, use cached geometry and direct compositor transforms, and perform no computed-style reads or CSS custom-property mutations in the update loop.
- All project images are warmed and asynchronously decoded before the desktop rail is reached.
- Reference and SJM wheel samples both settled document scrolling at roughly 0.4 seconds and allowed the rail to finish its eased catch-up at roughly 1 second.
- Desktop drag-to-scroll, the final-card resting state, ordinary downward release, offscreen video pause, menu/navigation interactions and browser-console checks passed.
- At 390 × 844, the site retained native document scrolling with no Lenis class, no GSAP rail transform, no Approach video element and no horizontal overflow; menu controls and all four project images also passed.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4/4.
- `git diff --check`: passed.

## Final Project Vertical Release

- Supersedes the earlier final-project zoom, blur and paper-wash transition.
- Viewports verified: 1280 × 720 desktop and 390 × 844 mobile.
- Desktop Projects pins only for the 2,391px horizontal track distance; at the endpoint, Approach begins exactly below the 720px viewport.
- The fourth card remains a normal 819 × 500px card with its 13px media radius, full-opacity image, visible project copy and no card transform.
- Scrolling another 200px moves the card upward by 200px and places Approach 200px into the viewport, confirming an ordinary vertical release rather than a zoom.
- The blurred transition image and paper-wash layers are absent from both the DOM and the runtime asset warmup.
- At 390px, the project cards remain a native vertical stack, the track transform is `none`, Approach follows 32px after the final card, and document width remains exactly 390px.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4/4.
- `git diff --check`: passed.

## Immediate Approach Word Reveal

- The desktop Approach trigger now begins when the section first crosses the bottom of the viewport instead of waiting until its top reaches 58% of the viewport.
- Before the change, all four “Clear from the start” words remained at zero opacity through the first 300px after Projects released.
- At 1280 × 720 after the change, the first word reaches 0.31 opacity after 20px of downward movement and 0.60 after 50px; by 150px, the four-word composition is visibly building across the frame.
- The rest of the Approach morph, video and process animation timeline retains its existing order, duration and cinematic progress cap.
- At 390 × 844, all four words remain statically visible at full opacity, the project track remains untransformed, no Lenis class is present, and document width remains exactly 390px.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4/4.
- `git diff --check`: passed.

## Immediate Services Word Reveal

- The desktop Services trigger now begins when the dark section first crosses the bottom of the viewport instead of waiting until its top reaches the top edge.
- Before the change, all four “Useful expertise. Neatly delivered.” words remained at zero opacity through 700px of dark scrolling.
- At 1280 × 720 after the change, the first word reaches 0.50 opacity after 20px, two words are visibly underway after 50px, and all four are visible after 150px.
- The title morph, summary, service-card, editorial statement, and diagonal exit choreography retain their intended order and cinematic progress cap.
- At 390 × 844, all four Services words remain statically visible at full opacity, the project track remains untransformed, no Lenis class is present, and document width remains exactly 390px.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4/4.
- `git diff --check`: passed.

## Reference-Matched Services Editorial Reveal

- Reference source: NESH Azure `.what_you_get-text` at `http://127.0.0.1:43113/#overview`.
- The reference uses 135 independently scrubbed characters, each moving from 10% opacity, muted colour and a 5px vertical offset to full colour, full opacity and zero offset; it also preserves deliberate inline gaps.
- The SJM replacement contains the same 135 animated-character count but uses normal selectable spaces instead of the reference’s oversized gaps: “Careful planning, precise installation, and clear communication combined — turning your electrical plans into safe, considered work that feels effortless.”
- The previous “Discuss your project”, Email and Call controls are absent from the DOM and their icon imports, timeline steps and CSS are removed.
- At 1280 × 720, the five service cards end at 528px and the completed 880 × 94px statement occupies 552–646px without clipping or horizontal overflow.
- Mid-reveal, early characters are full white at zero offset while the final character remains at 10% opacity, muted `rgb(201, 194, 184)` and a 5px offset, confirming the directional character sweep.
- The existing Services-to-Principles diagonal exit still clears the viewport and leaves Principles directly below the completed Services scroll range.
- At 390 × 844, the statement follows the service cards by 30px, occupies 354 × 177px in natural flow, remains fully visible without GSAP, and document width remains exactly 390px.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4/4.
- `git diff --check`: passed.

## Early Contact Form and Natural Editorial Spacing

- The footer reveal now starts at `top bottom` instead of `top 84%`, and the kicker, heading, intro, form fields and form actions share one `footerIn` entry label.
- Contact fields begin at `footerIn+=0.12` with a 0.42-second duration and 0.045-second stagger; form actions begin at `footerIn+=0.2`, so neither waits for the heading sequence to finish.
- With the footer settled 5px below viewport entry, all fields are at zero opacity. After a 240px wheel gesture, the first three fields are already visibly progressing at 0.77, 0.59 and 0.32 opacity after 250ms; all four fields and the form actions reach full opacity by 650ms while the footer is still 485px below its sticky top position.
- At the sticky entry point, the complete heading, intro, four fields, demo disclosure and submit button are all visible together within the 1280 × 720 viewport.
- The Services sentence no longer uses empty CSS-width spacer elements. Its visual `textContent` is the exact authored sentence with ordinary spaces, it has zero legacy gap/space elements, and its desktop 880 × 94px footprint remains unchanged.
- At 390 × 844, the sentence retains the same correctly spaced text, the form remains statically visible in natural flow, Lenis is absent, and document width remains exactly 390px.
- Desktop and mobile console error checks passed.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4/4.
- `git diff --check`: passed.

## Immediate Principles Reveal and Scrubbed Testimonial Rail

- The desktop Principles trigger now starts at `top bottom`, so “Work should feel like.” begins animating as soon as the paper-coloured section crosses the bottom of the viewport instead of waiting until its top reaches 55% of the viewport.
- The testimonial rail is driven directly by ScrollTrigger with a one-second scrub, matching the Projects rail, instead of passing through the slower `0.28`-progress-per-second cinematic controller.
- At 1280 × 720, the first title line remains untouched 5px before section entry, reaches 0.27 opacity 20px after entry, and reaches 0.96 opacity 150px after entry; the second line is already at 0.86 and the rail at 0.67 by that point.
- Across four equal 700px vertical-scroll samples, the 1,948px testimonial track advances smoothly to `-210px`, `-749px`, `-1,287px`, and `-1,825px`, with no horizontal document overflow.
- The final orange principle still expands into the full-viewport takeover before the section releases naturally into the footer.
- At 390 × 844, Principles remains a native vertical composition: all five cards are 354px wide, the track is an untransformed grid at full opacity, Lenis is absent, and document width remains exactly 390px.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4/4.
- `git diff --check`: passed.

## Low-Sensitivity Approach and Services Choreography

- Desktop Approach and Services still begin at `top bottom`, preserving the immediate section entry introduced in the earlier blank-space fixes.
- Their pinned scroll ranges are now 4,720px each, increased from 3,320px for Approach and 3,220px for Services, so a normal wheel gesture advances a readable stage instead of skipping multiple stages.
- Approach’s maximum timeline velocity is reduced from `0.34` to `0.16` progress per second; Services is reduced from `0.28` to `0.14`.
- Services also gives the large-word reveal, pause and morph more timeline space: reveal duration/stagger is now `1.15 / 0.22`, the pause is `0.45`, and the morph duration/stagger is `1.8 / 0.07`.
- Before the change, one 500px wheel gesture made all four Approach words at least 0.88 opaque within 250ms. After the change, the same sample produces progressive opacities of 0.94, 0.77, 0.24 and 0.00, with no collapse into the final heading after the gesture settles.
- Before the change, Services revealed every word within 250ms and had already collapsed the heading to roughly 0.54 scale by 900ms. After the change, the fourth word remains hidden at 250ms, all four settle at their large scale after 900ms, and the morph requires a second deliberate gesture.
- The completed Services scene still exits through the top-left corner at 4% opacity, Principles begins exactly at the next viewport boundary, and desktop document width remains 1,280px.
- At 390 × 844, both sections remain natural-height, unpinned content with no GSAP word transforms, no Lenis instance, and no horizontal overflow.
- Desktop and mobile console error checks passed.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4/4.
- `git diff --check`: passed.
