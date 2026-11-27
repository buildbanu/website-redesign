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

The visual language follows an engineering field journal: warm paper, black typography, fine rules, and restrained purple accents. The supplied logo is the only gradient. All page headings use solid colors.

The floor plans and system-flow diagrams explain sensing and processing. They are conceptual illustrations, not measured data or representations of verified product geometry. A compact floor plan is used on smaller screens.

Each page has a specific role: Overview introduces the operating environment; Innovations presents Resku and its design requirements; Engineering explains the signal flow; Resku describes the system functions. There are no simulated live feeds, decorative hardware renders, or repeated card grids.

Instrument Sans and IBM Plex Mono load from Google Fonts, with local fallbacks. The site has no framework, package installation, build step, or backend dependency. JavaScript supports the mobile navigation, including Escape dismissal, focus containment, and disabling background interaction while the menu is open.

Page structure, copy, drawings, and implementation are original. The site does not reproduce Anduril's design.
