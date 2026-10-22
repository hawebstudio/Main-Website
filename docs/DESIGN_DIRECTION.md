# HA Web Studio — visual and editorial direction

## Positioning
HA Web Studio designs and builds business websites, ecommerce experiences, and web applications. Its public site should make the work, services, and path to starting a project easy to understand.

## Visual system
- Luxury editorial palette: near-white ivory surfaces, ink-charcoal text, deep plum primary actions, and champagne-brass details used sparingly. No green or electric blue as core brand accents.
- Typography is the main visual device; use a serif italic sparingly as a contrast to the sans display face.
- Use grid lines, clear section rules, and deliberate asymmetry rather than a stack of translucent glass cards.
- Let real project imagery carry visual weight. Do not use fake dashboards, fabricated client marks, or synthetic metrics as proof.
- Keep motion short and purposeful; honour `prefers-reduced-motion`.
- Preserve keyboard focus, semantic sections, responsive layouts, readable contrast, and meaningful image alt text.

## Editorial rules
- Lead with the client problem, project, service, or decision—not generic claims about innovation.
- Prefer specific deliverables and process over adjectives such as best-in-class, seamless, cutting-edge, or world-class.
- Do not publish performance scores, conversion uplift, customer counts, testimonials, or time-to-delivery averages unless there is evidence and an owner responsible for keeping them current.
- Search optimisation can improve technical understanding and crawlability; do not guarantee rankings, citations, traffic, or revenue.
- Mark in-progress, personal, and internal builds honestly. Homepage work should prioritise live client projects that have public evidence.

## Page quality review
Every page should have a distinct content hierarchy appropriate to its purpose. Avoid forcing every page into the same hero + three cards + four cards sequence. Make the first viewport answer what the business does, who it helps, and what to do next. Use descriptive headings, compact paragraphs, meaningful link labels, visible proof, and scannable lists. Check mobile composition, keyboard navigation, reduced motion, link targets, metadata, alt text, broken links, and real-form delivery before launch.


## Warm editorial palette and tactile depth (Pass 2)

- Main paper: `#F3EDDF`; deeper paper: `#E7DCC8`; ink: `#302B24`.
- Primary accent: olive `#59664B`; secondary accent: clay `#B85F43`; highlight: muted brass `#B79A58`.
- Avoid generic saturated blue/purple gradients and pure-white full-page backgrounds. Use accent colors as emphasis, not as large decorative washes.
- Use “dimensional” rather than literal 3D: offset shadows, fine borders, overlapping paper-like panels, slight perspective, layered images, and small hover displacement. No WebGL/canvas scenes.
- GSAP is reserved for entrance sequencing and selected scroll reveals. Avoid pinned scrolling unless it materially helps comprehension. Keep page content visible without JavaScript, use `gsap.matchMedia()` for reduced-motion preferences, and clean up ScrollTriggers on unmount.
- Every page family should keep its own structure and content hierarchy; do not force every route into an identical hero + feature cards + CTA pattern.


## Pass 4: Palette and geometric depth

The current palette moves the paper surface closer to a warm near-white (`#FBFAF6`) and uses espresso ink, oxblood/plum, muted clay, and antique brass. Green is no longer a core brand accent. This is a deliberate editorial palette rather than a claim that one trend palette is universally best. Adobe's design trend guidance describes earthy warmth, cream/camel neutrals, and restrained accents as viable directions; its guidance also stresses that accessibility and brand fit matter more than novelty. All text/accent pairings still need contrast validation against WCAG 2.2 AA (4.5:1 for normal text, 3:1 for large text).

The M.A. Malik profile presents M.A. Malik as the owner and studio lead, without exposing the private legal identity. Decorative circles and grid lines create depth through geometry, not heavy 3D objects. Footer order is: Website Growth Assessment, M.A. Malik, Contact. The floating WhatsApp control is vertically separated above the scroll-progress button. The public `/socials` route has been removed; social-sharing UI for individual articles is separate and remains available unless explicitly removed.


## Luxury editorial system — Pass 5

- **Core palette:** near-white ivory `#FCFBF8`, ink `#211D23`, deep plum `#51283E`, champagne brass `#9B7A49`, and restrained rose-plum `#8F4D61`. The dark theme uses ink-charcoal surfaces with champagne as the action accent; green is not a brand accent.
- **Color discipline:** keep most surfaces neutral; reserve plum for primary actions and meaningful emphasis, and use brass for small labels, rules, icons, and ornamental details. Never use low-contrast gold as body copy.
- **Reading direction:** prioritize the first viewport with the business outcome, a short explanation, and clear next steps. Use descriptive headings, compact paragraphs, meaningful link labels, lists for multi-part information, and visible proof. Do not force every page into a literal F-pattern; scanning changes with task, layout, and motivation.
- **Buyer journey:** homepage sections now move from business problems to service fit, selected client work, working approach, process, principles, and technical capabilities before FAQs and insights. This puts buyer evidence ahead of implementation detail.
- **Motion:** native CSS smooth scrolling and Next.js scroll behavior are retained; reduced-motion preferences disable smooth scrolling and reveal animation overrides. Anchor targets use a top offset so headings are not hidden behind the sticky header.
- **Accessibility:** verify actual foreground/background pairs against WCAG 2.2 AA (4.5:1 normal text, 3:1 large text). Color is not the only signal for hierarchy or interaction.
