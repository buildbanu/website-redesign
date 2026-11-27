# Banu website

A buildless, responsive website using HTML, CSS, and JavaScript.

## Local preview

From this directory, run `python -m http.server 8766 --bind 127.0.0.1`, then visit `http://127.0.0.1:8766`.

## Pages

- `index.html` — Banu, its motto, and its scope across AI projects and solutions
- `innovations.html` — Projects, with Resku as the selected project
- `engineering.html` — AI, software, systems, and the engineering approach
- `Products/resku.html` — the Resku project and its architecture

## Design

The company name is **Banu**, with a capital B and no accent. Its motto is **Building what's next**.

The supplied logo is preserved at `Images/banu-mark.png`. Its silhouette uses a CSS gradient from `#b56fdc` to `#000000`. Every displayed logo sits on a light background, including on the dark Resku page. The vector favicon also has an integrated light background.

Warm paper, dark purple, solid typography, fine rules, and selected purple accents form the shared identity. The logo is the only gradient. The layouts vary with the content, and Resku is presented as one project within Banu rather than the company's entire purpose.

The floor plans and system-flow diagrams belong to the Resku project. They are conceptual illustrations, not measured data or representations of verified product geometry. A compact floor plan is used on smaller screens. No additional projects, deployments, customers, or performance statistics are implied.

Instrument Sans and IBM Plex Mono load from Google Fonts, with local fallbacks. The site has no framework, package installation, build step, or backend dependency. JavaScript supports the mobile navigation, including Escape dismissal, focus containment, and disabling background interaction while the menu is open.

Page structure, copy, drawings, and implementation are original. Anduril informs the company-first presentation and product storytelling, not the page design. Design references include [NN/G on typography and hierarchy](https://www.nngroup.com/articles/why-does-design-look-good/) and [Smashing Magazine on content-led art direction](https://www.smashingmagazine.com/2018/04/art-directing-web-css-grid/).
