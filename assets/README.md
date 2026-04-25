# assets/ — shared frontend scaffold

This directory holds the entire shared-asset layer for the WizusLabs site
rebrand v1. Every page in the project references these files.

## Layout

```
assets/
├── css/
│   └── style.css            ← single stylesheet; tokens + base + components + utilities + print
├── js/
│   └── app.js               ← single vanilla ES2020+ script; ≤ 4 KB gzipped
├── fonts/
│   ├── source-serif-4.woff2 ← variable serif, self-hosted, Latin subset (see placeholder)
│   └── jetbrains-mono.woff2 ← variable mono, self-hosted, Latin subset (see placeholder)
├── partials/
│   ├── nav.html             ← source of truth for nav (inlined into pages — see below)
│   └── footer.html          ← source of truth for footer (inlined into pages)
├── img/                     ← AVIF/WebP/PNG triples for app screenshots, hero imagery
└── README.md                ← this file
```

## Single-file CSS rationale

The rebrand ships on plain HTML on GitHub Pages with **no build step**. A
single `style.css` keeps the transport cost low, the cache profile simple,
and the authoring surface small. Everything traces back to a token declared
in `:root` (see `docs/design/design-system.md` §2 and §14). The file is
organized in six clearly-banner-commented sections:

1. **TOKENS** — every custom property declared in `:root`; dark overrides in
   `@media (prefers-color-scheme: dark)` and `[data-theme="dark"]`.
2. **BASE** — reset, document defaults, typography defaults, `@font-face`,
   selection, focus-visible.
3. **LAYOUT** — containers, grids, reading-measure, section rhythm.
4. **COMPONENTS** — one section per design-system §7 component, alphabetized.
5. **UTILITIES** — `.sr-only`, `.u-tabular`, `.u-caps`, reduced-motion kill
   switch.
6. **PRINT** — defensive print rules for legacy legal pages.

Gzipped budget: **≤ 20 KB** total.

## Single-file JS rationale

`app.js` runs five tiny responsibilities (theme, reveal, nav open/close,
focus trap, scroll condense, diagram hairlines) and nothing else. No
framework, no bundler, no module system. It is loaded with
`<script defer src="/assets/js/app.js"></script>`. Everything is wrapped in
a safely-guarded IIFE that returns immediately if the DOM the handler needs
is not on the page — so the same file can ship on `index.html`, a legacy
legal page, and the 404 without any of them throwing.

Gzipped budget: **≤ 4 KB** total.

## Inline partial pattern

Since there is no build step, `partials/nav.html` and `partials/footer.html`
are the **source of truth** for the shared chrome. Each page under
`projects/wizuslabs-site/wizuslabs-site-source/` copies the partial content inline into its HTML.
When the nav or footer changes, edit the partial and re-copy — every page
must reflect the change before the PR ships.

This trade-off was accepted in the plan (`docs/specs/wizuslabs-rebrand/plan.md`
§3) because the v1 page count is small (~10). The **Eleventy migration** is
the pre-committed trigger when the page count exceeds 20.

## Partials: what each contains

- `nav.html` — skip-link, `<header>`, sticky nav with wordmark + inline links
  + hamburger (mobile) + theme toggle, mobile `<dialog>`-style panel, and the
  screen-reader `aria-live` region used by the theme toggle.
- `footer.html` — the 4-column footer (Lab / Apps / Legal / Contact), the
  "Made in the Lab" centered mark, and the copyright line. **Every
  store-submission legal URL** (`/neuralspark/privacy-policy.html`,
  `/sudoku/support.html`, etc.) is enumerated here by design — this is the
  migration safety net against URL drift.

## Fonts — installed

The two WOFF2 faces referenced by `style.css` are now on disk:

- `assets/fonts/source-serif-4.woff2` — Source Serif 4 Roman (variable, 200–900)
- `assets/fonts/source-serif-4-italic.woff2` — Source Serif 4 Italic (variable, companion)
- `assets/fonts/jetbrains-mono.woff2` — JetBrains Mono Regular (static 400)
- `assets/fonts/jetbrains-mono-italic.woff2`, `jetbrains-mono-bold.woff2`,
  `jetbrains-mono-bold-italic.woff2` — companion cuts, currently unreferenced;
  retained so a future sprint can wire per-weight `@font-face` rules if the
  site starts using non-regular mono weights.

Upstream note: JetBrains Mono ships its variable master as TTF only; the v1
site uses a single static Regular weight and relies on `font-synthesis` for
the rare italic/bold metadata usage. Source Serif 4 is wired as a true variable
font for the Roman face and a separate variable italic face.

Both fonts are SIL Open Font License 1.1. The `OFL.txt` license files are not
yet committed — picking those up is a v2 housekeeping task. The fonts remain
freely redistributable under OFL in the meantime.

`font-display: swap` keeps the site legible during font load — headings fall
back to Charter/Georgia, metadata to SF Mono/Menlo — and no content is ever
hidden.

## How pages should reference this scaffold

Every page `<head>`:

```html
<link rel="preload" href="/assets/fonts/source-serif-4.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/jetbrains-mono.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/style.css">
<meta name="color-scheme" content="light dark">
```

At end of `<body>`:

```html
<script defer src="/assets/js/app.js"></script>
```

## What NOT to do

- Do not add a second CSS file, a second JS file, or any build tooling.
- Do not hardcode colors, spacing, or durations in component CSS — every
  value must resolve to a token from `docs/design/design-system.md` §2.
- Do not reference an external CDN for fonts, scripts, analytics, or
  anything else. Zero third-party requests is a locked constraint.
- Do not edit page HTML from inside this directory — that is the page
  author's job. This directory is the shared substrate.

---

See `docs/design/design-system.md` for the authoritative design rules.
