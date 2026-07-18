# Food Truck Launchpad

An end-to-end mobile-first concept app for designing, costing, and launching a food truck.

Open `index.html` in a browser to start. Designed for a 440px phone shell; the
dashboard centers itself on larger screens.

## Modules

- **Dashboard** (`index.html`) — branded home with build progress, budget and module grid
- **Chassis** (`pages/chassis.html`) — pick step van, sprinter, trailer, or kei mini
- **Paint Shop** (`pages/paint.html`) — fully interactive: live SVG truck preview, body / accent / window / wheel layers, 28-color palette, custom hex, tint slider, livery patterns (solid · stripes · dots · gradient), gloss/matte/metallic/wrap finishes, curated brand presets, live brand name + tagline, decals, real-time cost breakdown, undo
- **Interior Studio** (`pages/interior.html`) — flooring / walls / counters with mood lighting controls
- **Equipment Builder** (`pages/equipment.html`) — galley loadout with live power-draw & generator-headroom calculator
- **Permits** (`pages/permits.html`) — timeline view of compliance items with status & cost
- **Regulations** (`pages/regulations.html`) — local rules grouped into accordions
- **Suppliers** (`pages/suppliers.html`) — local-first sourcing directory
- **Launch Plan** (`pages/launch.html`) — 3-phase roadmap, weekly calendar strip, post scheduler

## Architecture

- Pure static HTML — no build step
- Shared design tokens & components: `assets/styles.css`
- Shared client state (theme + selections + budget, persisted to `localStorage`): `assets/app.js`
- Material Symbols + Inter via Google Fonts CDN
- Custom 404 page (`404.html`) served by Render for unknown routes

## Deploying

`render.yaml` configures a one-click [Render](https://render.com) static site:
long-lived immutable caching for `/assets/*`, always-fresh HTML, and clean
routes (`/paint`, `/chassis`, …) that rewrite to the module pages. Any other
static host (GitHub Pages, Netlify, Vercel) works too — there is nothing to
build.

## Relationship to the master prototype

This repository is the canonical, deploy-ready home of the app. It supersedes
the single-file `FTLP_Master_Prototype.html` design prototype: the prototype's
screens were split into per-module pages with shared CSS/JS extracted into
`assets/`. New ideas can still be sketched in the single-file prototype, but
anything meant to ship should land here as a page under `pages/`.

## Notes

- A `.logoist` source file is included in the design assets but is a macOS Logoist binary; export it to SVG/PNG to drop the official logo into the dashboard's brand mark slot in `index.html`.
