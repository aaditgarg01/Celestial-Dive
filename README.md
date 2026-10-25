# Celestial Dive 5.0

**Live website:** [celestial-dive.vercel.app](https://celestial-dive.vercel.app/) · **Repository:** [aaditgarg01/Celestial-Dive](https://github.com/aaditgarg01/Celestial-Dive)

A responsive, single-page frontend for **VIT Stellar’s stargazing event**. Built with **React, TypeScript, and Vite**, adapting the useful foundation patterns from [Aerovate](https://github.com/aaditgarg01/Aerovate) to an original night-sky design.

The website includes a floating club header with a keyboard-accessible menu, event introduction and details, interactive telescope artwork, a seven-star Orion explorer, a five-edition archive with POC slots, a gallery with edition filters and a full-screen viewer, FAQs, contact channels, and team profile links.

## Run locally

Use Node 24 (see `.nvmrc`).

```bash
npm ci
npm run dev
```

```bash
npm test
npm run build
npm run preview
npm run format:check
```

The repository root is the application root. There is no second nested app folder, backend, database, secret, or required environment variable.

## Update the content

| Content                                         | File                                  |
| ----------------------------------------------- | ------------------------------------- |
| Date, time, venue and registration URL          | `src/config/site.ts` → `event`        |
| Club contact, social channels and team profiles | `src/config/site.ts` → `site`         |
| Navigation order and section IDs                | `src/config/site.ts` → `navigation`   |
| Past-edition descriptions and POC names/links   | `src/config/content.ts` → `editions`  |
| Frequently asked questions                      | `src/config/content.ts` → `faqs`      |
| Event photographs                               | `src/config/content.ts` → `photos`    |
| Colours, typography and responsive layouts      | `src/styles/global.css`               |
| Hero artwork                                    | `public/assets/stargazing-night.webp` |
| Page title and social metadata                  | `index.html`                          |

The date, time, venue, registration link, archive stories, POC details, and event photographs are **not confirmed**. The initial website clearly marks these as pending. Do not reuse Aerovate dates, partners, venues, registration links, rocket assets, or event photographs here.

When registration opens, set `event.registrationUrl` to the official HTTPS URL and update `registrationLabel`, the hero messaging and FAQ accordingly. The event-details panel automatically shows the registration link. Until then, the site directs visitors to event updates and club contact; it does not collect personal details or pretend to submit registrations.

### Add gallery photographs

Place approved, compressed images in `public/assets/gallery/`, then add entries such as:

```ts
{
  id: 'cd4-observing',
  src: '/assets/gallery/cd4-observing.webp',
  alt: 'Describe the actual photograph for someone who cannot see it',
  caption: 'An approved caption',
  edition: '4.0',
  width: 1600,
  height: 1067,
}
```

The gallery will replace its illustrative placeholders with real photos automatically. Edition filtering, full-screen viewing, arrow-key navigation, Escape/close controls, and missing-image fallbacks are already implemented. Use unique IDs and meaningful alt text. The sample above is documentation, not a fabricated archive entry.

## Team handoff

Each feature has its own component under `src/features/`. Shared layout, icons and the error boundary live under `src/components/`; interaction helpers live under `src/hooks/`. The team directory initially reuses the profile links supplied for Aerovate. Update it if the Celestial Dive team roster changes.

Suggested parallel ownership after the foundation:

1. Event introduction, confirmed programme and registration copy: `About.tsx`, `Experience.tsx`.
2. Interactive astronomy experience: `SkyGuide.tsx`.
3. Past-edition archive and POCs: `Legacy.tsx`, `config/content.ts`.
4. Approved photographs and gallery: `Gallery.tsx`, `public/assets/gallery/`.
5. Design assets and responsive polish: `styles/global.css`, `public/assets/`.
6. Navigation, motion and accessibility: `components/Header.tsx`, `hooks/`.
7. Integration, documentation and deployment: `App.tsx`, tests, workflow and this README.

Coordinate changes to shared content and styles; avoid copying a second app into a subfolder. Start feature branches from the latest `main` and open pull requests. GitHub Actions runs the tests and production build for pushes to `main` and pull requests.

## Motion and accessibility

- Native anchor navigation and scrolling; the URL and active menu follow the reading position without filling browser history.
- Native modal dialogs for menu and photo-viewer focus containment and Escape support.
- Roving keyboard tabs in the edition archive; keyboard-operable stars and gallery controls.
- One-time section reveals, reduced-motion support, visible focus indicators and a skip link.
- Pointer effects only schedule work in response to mouse movement. They cancel on scrolling, resize, backgrounding, preference changes and unmount.
- No always-running WebGL renderer, smooth-scroll wheel interception, third-party tracker, or externally loaded web font.

## Deployment

Import this GitHub repository into Vercel with the **Vite** preset, root directory `./`, install command `npm ci`, build command `npm run build`, and output directory `dist`. No environment variables are needed. `vercel.json` includes the build settings, asset-aware SPA routing and basic response headers. Keep the production branch set to `main` for automatic deployments.

## Assets and source notes

- The club logo and team/profile configuration are reused from the user-owned Aerovate project at the user’s request. Reused shared icon work is retained in `SocialIcon.tsx`; the navigation and performance patterns are adapted to this standalone site.
- The hero is original AI-generated atmosphere artwork created for this foundation. It is **not** an event photograph, an actual observing location, or a promise of sky conditions. Gallery preview scenes and telescope diagrams are original CSS/SVG illustrations. Replace them with approved event assets as they become available.
- The Orion explorer is a **simplified illustration**, not a live sky map, sky-position calculation, or prediction of event visibility. Reference: [NASA — Orion constellation](https://science.nasa.gov/asset/hubble/orion-constellation/), [SDSS SkyServer — Orion](https://preprod.skyserver.sdss.org/dr13/en/proj/games/constellation/orion.aspx). No external astronomy API is called.
- DM Sans and Space Grotesk are bundled locally through Fontsource packages and retain their package licences. Display serif typography uses the visitor’s system Georgia/Times fonts.
