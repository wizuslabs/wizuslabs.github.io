# WizusLabs Site — Claude Instructions

---

## Scope

All work for this project MUST stay inside `wizuslabs-site/`.

---

## Project Overview

| Field | Value |
|-------|-------|
| Name | WizusLabs Site |
| Type | Static GitHub Pages site |
| Repo | `wizuslabs/wizuslabs.github.io` |
| URL | https://wizuslabs.github.io |
| Stack | HTML (static) |
| Contact | wizuslabs@gmail.com |

The WizusLabs developer site hosts privacy policies, support pages, and
`app-ads.txt` for all published apps. It is the **canonical source for all
store-required URLs** used in Apple App Store and Google Play submissions.

---

## Role in Store Submissions

Every app project in this workspace depends on `wizuslabs-site` for store
submission. Apple App Store and Google Play both require live, accessible URLs
for privacy policies and support pages before an app can be submitted.

### URL Pattern

```
https://wizuslabs.github.io/{app-slug}/privacy-policy.html
https://wizuslabs.github.io/{app-slug}/support.html
https://wizuslabs.github.io/app-ads.txt  (shared across all apps)
```

### Per-Project Status

| Project | App Slug | Privacy Policy | Support Page | Status |
|---------|----------|----------------|--------------|--------|
| NeuralSpark (brain-training) | `neuralspark` | `neuralspark/privacy-policy.html` | `neuralspark/support.html` | Live |
| Sudoku Game (sudoku-game) | `sudoku` | `sudoku/privacy-policy.html` | `sudoku/support.html` | Not yet created |
| Iron Blitz (tank-game) | `iron-blitz` | `iron-blitz/privacy-policy.html` | `iron-blitz/support.html` | Not yet created |
| Abyssal Dive (abyssal-dive) | `abyssal-dive` | `abyssal-dive/privacy-policy.html` | `abyssal-dive/support.html` | Not yet created |

### Workflow

1. **Privacy policy markdown** is authored in each project's `docs/release/`
   directory (source of truth for content)
2. **Chronicle** or **Prism** converts the markdown to HTML and places it in the
   corresponding `wizuslabs-site/{app-slug}/` directory
3. **Vector** verifies the live URLs return HTTP 200 before issuing a Release
   Clearance Report (RCR)
4. When pushed to `main`, GitHub Pages auto-deploys to
   `https://wizuslabs.github.io`

---

## Directory Structure

```text
wizuslabs-site/
├── CLAUDE.md                          ← project instructions (this file)
├── index.html                         ← landing page (links to all app pages)
├── app-ads.txt                        ← ad network declarations (shared)
├── neuralspark/
│   ├── privacy-policy.html            ← NeuralSpark privacy policy (LIVE)
│   └── support.html                   ← NeuralSpark support page (LIVE)
├── sudoku/                            ← (to be created before Sudoku submission)
│   ├── privacy-policy.html
│   └── support.html
├── iron-blitz/                        ← (to be created before Iron Blitz submission)
│   ├── privacy-policy.html
│   └── support.html
└── abyssal-dive/                      ← (to be created before Abyssal Dive submission)
    ├── privacy-policy.html
    └── support.html
```

---

## Agent Focus

| Agent | Role |
|-------|------|
| Prism | HTML/CSS authoring, page layout, accessibility |
| Chronicle | Content writing, policy text, support copy |
| Sentinel | Link validation, HTML validation, accessibility audit |
| Canvas | UX review, visual consistency |
| Vector | Verifies URLs are live before issuing RCRs; flags missing pages |

---

## Cross-Project Dependencies

This project is a dependency for every app's store submission. Changes here
can affect all projects:

- **Adding an ad network** → update `app-ads.txt` (affects all apps)
- **New app approaching submission** → create `{app-slug}/` directory with
  privacy policy and support page (blocks that app's RCR until done)
- **SDK or data collection change in any app** → update that app's privacy
  policy HTML to match the updated markdown in the app's `docs/release/`
- **index.html** → update to include a card/link for each new app

---

## Integration Gate

Before any change ships:

1. All HTML passes W3C validation (no errors)
2. All internal and external links are valid (no 404s)
3. Privacy policy content matches the source-of-truth markdown in the
   corresponding project's `docs/release/` directory
4. `app-ads.txt` follows IAB Tech Lab spec
5. `index.html` lists all apps with correct links

---

## Escalation

If a task falls outside `wizuslabs-site/`, escalate to Nexus.
