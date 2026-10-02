# Learn Anything — frontend implementation plan

## Direction
- **Movement:** cinematic developer editorial — sparse, deliberate motion on a dark canvas.
- **Principles:** signal over noise, tactile interactions, strong typography, and progressive disclosure.
- **Color:** near-black backgrounds create focus; neon green is an ownable signal for active states, progress, and code accents.
- **Layout:** asymmetric editorial sections with a centered reading rail, oversized type, and a constellation of floating syntax in the hero.
- **Signatures:** bracket-mark logo, mono eyebrow labels, and numbered section markers.
- **Interaction:** every action reveals context or advances the user; hover states are short and physical rather than decorative.
- **Animation:** staged hero entrance, viewport reveals, subtle drift, and reduced motion support.
- **Typography:** Manrope for interface and display; DM Mono for technical labels and code.
- **Brand essence:** a calm, premium field guide for people who want to make technology useful. Precise, curious, quietly bold.
- **Voice:** direct and motivating — “Build what matters.” / “Start with a question.”
- **Wordmark:** a compact bracket glyph paired with a tracked uppercase wordmark.
- **Signature color:** #00FF88, used sparingly as a signal rather than a fill.

## Structure
- `src/data.js`: static domains, course, and coming-soon content.
- `src/App.jsx`: page composition, navigation, modal state, and reusable section/card components.
- `src/styles.css`: responsive visual system, motion, hover states, and reduced-motion rules.
- `public/manus-routes.json`: single-page route declaration.

## Serving
Frontend-only Vite app on the managed preview port. No backend, auth, database, payments, or external application services.
