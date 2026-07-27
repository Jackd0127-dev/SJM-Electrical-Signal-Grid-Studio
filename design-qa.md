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

## Services Contact Pills and Diagonal Exit

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

## Direct Contact Actions and Enquiry Form

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

## Final Project Zoom, Blur and Paper Transition

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
