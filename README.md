# banû website

A buildless, responsive website using HTML, CSS, and JavaScript.

## Local preview

From this directory, run `python -m http.server 8766 --bind 127.0.0.1`, then visit `http://127.0.0.1:8766`.

## Pages

- `index.html` — overview, purpose, system introduction, and architecture
- `innovations.html` — Resku introduction
- `engineering.html` — system architecture and engineering approach
- `Products/resku.html` — Resku details

## Design

The supplied logo is preserved at `Images/banu-mark.png`. The header and footer use its silhouette as a CSS mask with a gradient from `#b56fdc` to `#000000`. Shared colors and typefaces are set in `style.css`.

The spatial scan, sensor illustration, and schematic are original illustrative graphics. They do not represent live telemetry or verified physical product geometry. The scan can be paused and respects the visitor's reduced-motion preference.

Fonts load from Google Fonts, with local fallbacks. The site has no framework, package installation, build step, or backend dependency.

The visual direction uses Anduril as a reference for scale and editorial pacing; page structure, copy, artwork, and implementation are original to this redesign.
