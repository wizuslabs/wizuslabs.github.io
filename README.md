# wizuslabs.github.io

Legacy secondary origin — **stripped to a redirect shell** on 2026-07-10.

The canonical site is <https://wizuslabs.com/> (Cloudflare Pages). This
hostname previously mirrored the full site; all duplicate HTML content was
removed so Google consolidates on wizuslabs.com. What remains:

- `version.json` — the in-app update manifest. **Must keep serving** for
  older field binaries that still fetch it from this origin. Do not remove.
- `app-ads.txt` — authorized mobile-ad sellers declaration.
- `index.html` — redirect stub → `https://wizuslabs.com/` (canonical +
  meta-refresh + path-preserving JS).
- `404.html` — path-preserving redirect: any removed path bounces to the
  same path on wizuslabs.com. Marked `noindex`.
- `googlef2265c9368d61f30.html` — Google Search Console verification token,
  retained so the site owner can monitor de-indexing / request removals.
- `.nojekyll` — serve files as-is, no Jekyll processing.

Source of truth for the canonical site lives in a private repository.

> WARNING for tooling: this repo is intentionally divergent from the
> `wizuslabs-site-bin` Cloudflare deploy checkout. Do NOT `git pull` this
> stripped github.io state into that checkout.
