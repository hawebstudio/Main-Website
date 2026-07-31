# lib/motion

Motion owns animation tokens, variants, transitions, presets, and helper exports for Framer Motion.

Belongs here:

- Duration, delay, spring, easing, distance, opacity, scale, and viewport tokens
- Fade, slide, scale, hero, card, list, stagger, page, hover, and scroll variants
- Complete presets such as hero reveal, card reveal, grid reveal, modal, and drawer

Does not belong here:

- React UI components
- Inline one-off animation objects in feature code
- Business logic or analytics

Components should import variants from this library and avoid hardcoded animation objects so the site keeps a consistent motion language.
