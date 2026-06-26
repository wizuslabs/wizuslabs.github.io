# Embergrid — Accessibility Statement

> **DRAFT — PRE-LEGAL-REVIEW**
>
> This Accessibility Statement was authored by the Vector agent on
> 2026-05-17 under the workspace's solo-dev-with-agent-team posture.
> It has NOT been reviewed by external legal counsel. The conformity
> claims below are based on Vector's documentation of Embergrid's
> implemented accessibility features and are subject to external
> verification.
>
> For internal review only until external legal sign-off.

| Field | Value |
|-------|-------|
| Author | @vector |
| Date | 2026-05-17 |
| Last Updated | 2026-05-17 |
| Game Version | 1.0.0+1 |
| Status | Draft — pending external legal review |
| Source | Mirror of the in-app statement at `app/assets/legal/accessibility-statement.en.md`. The site mirror exists for pre-install discoverability per EAA Article 9. |

---

## 1. Scope of this statement

This Accessibility Statement covers the Embergrid mobile game on
**iOS** (App Store) and **Android** (Google Play). Embergrid is
published by **WizusLabs**, an independent game studio.

The statement applies to the entire Embergrid product surface:

- All in-game screens (Title, Mode Select, Level Select, Character
  Select, Battle Setup, in-game HUD, Results, Settings, Onboarding,
  Shop, and accessibility-information screens)
- All in-game audio cues (background music, sound effects)
- All in-game text (UI labels, level objectives, error messages,
  onboarding copy)

It does **not** cover:

- The Wizuslabs publisher site at <https://wizuslabs.com>
  (the site itself has its own accessibility scope; this page is the
  Embergrid product-specific statement hosted on that site)
- Third-party SDK surfaces that Embergrid embeds (Apple App Store
  receipt validation dialogs, Google Play purchase confirmations,
  Appodeal advertising consent prompts) — these are governed by the
  third party's own accessibility commitments

---

## 2. Regulatory frame

This statement is published in anticipation of the **EU Accessibility
Act (Directive (EU) 2019/882, "EAA")** which begins enforcement for
private-sector digital products on **28 June 2025**. Mobile games are
within the EAA's scope when offered to consumers in the European Union
market.

The conformity claims below reference the technical standard
**EN 301 549 V3.2.1**, which the European Commission has designated as
the harmonised standard for EAA conformity assessment. EN 301 549
incorporates the **Web Content Accessibility Guidelines (WCAG) 2.1
Level AA** for software user-interface content.

This statement is structured per **EAA Article 9** (accessibility
statement requirements) and contemplates the **disproportionate-burden
exemption** at **EAA Article 14** where relevant.

---

## 3. Conformity status

**Embergrid claims PARTIAL CONFORMITY with EN 301 549 V3.2.1.**

Partial conformity means that some accessibility requirements are met
in full, some are met partially, and some are not yet met. Embergrid's
current state, planned roadmap, and disproportionate-burden claims for
each category are documented in sections 4, 5, 6, and 7 below.

This claim is pending external verification by an independent
accessibility auditor; Wizuslabs intends to commission such an audit
prior to formal EAA enforcement onset.

---

## 4. Accessibility features implemented in full

Embergrid currently implements the following accessibility features.
Each item cites the development sprint in which it shipped (sprints
are Wizuslabs' internal release cadence; each sprint produces a
verified, regression-tested build).

- **High-contrast bright palette (WCAG 2.1 SC 1.4.3, 1.4.11).**
  Embergrid's UI uses a hand-tuned bright palette with WCAG-AA-conformant
  contrast ratios across all text-on-background pairings and
  WCAG-AAA-conformant ratios on the primary HUD readout. Shipped
  Sprint 45 (palette pivot); applied across the 10-screen contract.
- **Reduce-motion gate on visual effects (EN 301 549 § 11.2.5.3 /
  WCAG SC 2.3.3).** Embergrid honours the user's motion-sensitivity
  preference via an `EmbergridReduceMotion` flag, settable in
  **Settings → Accessibility → Reduced Motion**. When enabled, the
  flag suppresses screen shake, particle bursts (Sprint 47 K2 blast
  juice), combo / chain-reaction toasts (Sprint 48 K3), onboarding
  tween transitions (Sprint 49 K1), telegraph pulses, sprite
  scale-punches, soft-block crumble animations, and apprentice-death
  ember bursts. Color flash is retained as an accessibility channel
  (color is a redundant rather than sole signal). 22+ gating sites
  across the render layer (Sprints 08, 10, 12, 14, 15, 45, 47, 48, 49).
- **No flashing or strobing content (EN 301 549 § 11.2.5.1 /
  WCAG SC 2.3.1).** Embergrid contains no flashing content above 3 Hz
  and no large-area flash sequences. The bright-palette pivot
  (Sprint 45) and reduce-motion gate (Sprints 08+) collectively bound
  all on-screen color-change rates well below the WCAG threshold.
- **Localized user interface (EN 301 549 § 11.5.2.5).** Embergrid
  ships with full UI translation in **English (en)** and **Vietnamese
  (vi)** at launch. Language is settable in **Settings → Language**
  and takes effect immediately without requiring a restart.
  In-progress simulation state is preserved across a language switch.
- **No timed responses required for core gameplay
  (EN 301 549 § 11.2.2.1 / WCAG SC 2.2.1).** Embergrid's campaign
  mode is single-player and turn-paced per the player's own input;
  there are no externally imposed time limits in campaign play. (Local
  PvP rounds DO have a round timer — see § 5.)
- **No account or registration required.** Embergrid launches
  directly into gameplay with no authentication, password entry,
  email verification, or CAPTCHA gate. This eliminates an entire
  category of accessibility barriers (EN 301 549 § 11.5.2.13 form
  identification, § 11.5.2.16 input modalities) from the product
  surface.
- **Persistent state across sessions (EN 301 549 § 11.7).**
  Campaign progress, settings, language preference, and reduce-motion
  flag persist locally via Hive. A user who finds an accessible
  configuration does not need to re-establish it on every launch.
- **Configurable control modes (EN 301 549 § 11.5.2.17).** Embergrid
  offers tap-to-place, virtual joystick, and keyboard control modes,
  selectable in **Settings → Controls**. Players with different motor
  needs can choose the input modality that suits them.
- **Splash-screen semantic label (EN 301 549 § 11.5.2.5).** The
  splash screen exposes a localized `splashSemanticsLabel` to assistive
  technologies ("Embergrid is starting" / "Embergrid đang khởi động"),
  shipped Sprint 06 (T601).
- **First-launch onboarding (EN 301 549 § 11.7 — cognitive support
  affordance).** A skippable 3-step tutorial (Move → Place a charge
  → Reach the gate) runs on first launch (Sprint 49 K1). Every step
  has a "Skip" affordance.

---

## 5. Accessibility features partially implemented

These features are present in some areas of the product but not
others, or are present in a degraded form pending further work.

- **Screen reader semantic labelling (EN 301 549 § 11.5.2.5 /
  WCAG SC 1.3.1, 4.1.2) — PARTIAL.** The splash screen exposes a
  semantic label (see § 4). The wider screen surface (Title, Mode
  Select, Level Select tiles, Character Select, HUD pip, HUD timer,
  combo toast, Results screen, Settings tiles) is not yet uniformly
  labelled for VoiceOver (iOS) or TalkBack (Android) consumption.
  **Planned roadmap:** Sprint 51 Phase 6 adds `Semantics` widgets to
  the HUD timer, HUD pip, combo toast, and Level Select tiles per the
  Sprint 51 Canvas accessibility audit. Full screen-surface labelling
  is planned for a follow-up sprint (Sprint 55 candidate).
- **In-game time limits (EN 301 549 § 11.2.2.1 / WCAG SC 2.2.1) —
  PARTIAL.** Campaign mode has no time limits (see § 4). Local PvP
  rounds (Sprint 51 B.2) have a round timer with a tiebreaker. The
  PvP round timer is not currently user-extendable.
  **Planned roadmap:** an "Extended round duration" accessibility
  option in **Settings → Accessibility** is candidate for a follow-up
  PvP-polish sprint (Sprint 55+).
- **Audio-cue redundancy (EN 301 549 § 11.5.2.3 / WCAG SC 1.3.3) —
  PARTIAL.** Embergrid's core gameplay does not require audio for
  success (bomb fuse timing is conveyed visually via fuse-flicker
  animation; blast danger is conveyed visually via reduce-motion-gated
  particle bursts and color flash). Background music is muteable in
  **Settings → Audio**.
  **Planned roadmap:** an explicit "Visual cue intensity"
  accessibility option (boost visual cue salience for players who
  reduce audio further) is candidate for Sprint 55+.

---

## 6. Accessibility features not yet implemented

These EN 301 549 requirements are not currently met by Embergrid.
Each item discloses the gap honestly and cites the planned remediation
sprint, or states "no current plan" where remediation is outside the
foreseeable roadmap.

- **Full screen-reader navigation across all screens
  (EN 301 549 § 11.5.2.5 — full screen surface).** As noted in § 5,
  only the splash screen is fully labelled today. **Planned:**
  partial coverage in Sprint 51 (HUD timer, HUD pip, combo toast,
  Level Select tiles); full coverage candidate for Sprint 55.
- **External keyboard navigation on mobile
  (EN 301 549 § 11.5.2.17 / WCAG SC 2.1.1).** Embergrid supports
  keyboard control mode for in-game movement (Arrow / WASD / Space),
  but does not currently support keyboard navigation of menus and
  settings screens on iOS/Android. Desktop builds (web/macOS/Windows)
  are not officially supported at launch. **Planned:** keyboard menu
  navigation is candidate for the desktop-support sprint, which is
  currently outside the launch roadmap. **No current plan** for
  mobile-OS external-keyboard menu navigation.
- **Closed-caption / subtitle equivalents for audio cues
  (EN 301 549 § 11.5.2.7 / WCAG SC 1.2.1, 1.2.2).** Embergrid's
  audio surface contains no narrated speech, no dialogue, no story
  voice-over, and no plot-bearing audio content. All gameplay-critical
  information is conveyed visually (see § 5 audio-cue redundancy).
  **See § 7 disproportionate-burden claim 1.**
- **Sign-language interpretation (EN 301 549 § 11.5.2.8 /
  WCAG SC 1.2.6).** Embergrid contains no narrated speech or
  dialogue. **See § 7 disproportionate-burden claim 1.**
- **Personalisation of font size, font face, or letter spacing
  (EN 301 549 § 11.5.2.10).** Embergrid uses a fixed typography
  scale (Cinzel / Inter, 4dp scale per Canvas design system).
  Text size adjustment via the OS-level dynamic-type setting is
  not currently propagated into the game's UI. **Planned:** OS
  dynamic-type respect is candidate for Sprint 55+ accessibility
  polish.
- **Programmatic alternative for time-based media (EN 301 549
  § 11.5.2.7).** Embergrid contains no time-based audio or video
  media. **Not applicable.**

---

## 7. Disproportionate-burden claims (EAA Article 14)

Embergrid claims **disproportionate burden** under EAA Article 14
for the following EN 301 549 requirements. Each claim is paired with
a justification consistent with EAA Article 14's "fundamental
alteration" and "proportionate cost" tests.

1. **Closed captions / sign-language interpretation for audio cues
   (EN 301 549 § 11.5.2.7, § 11.5.2.8).** Embergrid contains no
   narrated speech, no dialogue, no plot-bearing audio, and no
   voice-acted content. The audio surface comprises non-verbal
   gameplay cues (fuse hiss, blast pop, block crumble, pickup
   sparkle, UI beeps) and instrumental background music. All
   gameplay-critical information is also conveyed visually (fuse
   flicker animation, particle bursts gated by reduce-motion,
   pickup sparkle redundant with color flash). Adding captions or
   sign-language interpretation to non-verbal sound effects and
   instrumental music would produce no additional accessibility
   benefit beyond what visual redundancy already provides, and
   the production cost (sign-language video assets, caption
   localisation across 2 launch locales) would be disproportionate
   relative to that null benefit. **Mitigation:** Embergrid's
   audio cues are non-essential to gameplay; § 4 documents that
   gameplay-critical information is conveyed visually.

2. **Real-time captioning of player-to-player communication
   (EN 301 549 § 11.5.2.7).** Embergrid does not provide a
   player-to-player text, voice, or video chat channel. Local
   PvP (Sprint 51 B.2) is shared-screen pass-and-play between
   players in the same physical room; the players communicate
   verbally with each other in person, outside the Embergrid
   product surface, by ordinary speech. Real-time captioning of
   in-person speech is outside the scope of any digital product
   accessibility commitment. **Not applicable.**

---

## 8. Feedback mechanism

Wizuslabs welcomes accessibility feedback from Embergrid players.

**Email:** <wizuslabs@gmail.com>

When reporting an accessibility issue, please include:

- The device model and OS version you are using
- The Embergrid version (visible in **Settings → About**)
- A clear description of the accessibility barrier you encountered
- If possible, steps to reproduce
- Any assistive technology you were using (VoiceOver, TalkBack,
  external keyboard, switch device, etc.)

Including the phrase **"Accessibility"** in your email subject line
helps us triage faster. Wizuslabs is a small independent studio; we
aim to respond to accessibility feedback within **5 business days**
(Vietnam business hours, UTC+7). We read every email.

### Enforcement procedure

If you are not satisfied with Wizuslabs' response to your
accessibility feedback, you may contact the competent enforcement
authority in your EU member state. The EAA designates national
enforcement bodies in each member state; the European Commission
maintains the list at
<https://ec.europa.eu/social/main.jsp?catId=1202>.

---

## 9. Assessment methodology

This statement was prepared using a **self-assessment** methodology
based on Vector agent code-trace audit of Embergrid's render layer,
settings layer, persistence layer, and per-screen widget tree against
the EN 301 549 V3.2.1 success criteria. Vector cross-referenced each
conformity claim against shipped sprints (Sprints 06 through 49) and
the Sprint 51 Canvas accessibility audit.

This statement has **not yet been verified by an independent
third-party accessibility auditor.** Wizuslabs intends to commission
such an audit prior to EAA enforcement onset; the next planned
re-assessment is scheduled for the Sprint 55+ accessibility polish
cycle.

---

## 10. Compliance status (summary)

| Item | Status |
|------|--------|
| Conformity claim | **Partial conformity with EN 301 549 V3.2.1** |
| External legal review | Pending |
| Third-party accessibility audit | Pending |
| Last self-assessment | 2026-05-17 |
| Next planned assessment | Sprint 55 (date TBD) |

---

## 11. Statement metadata

| Field | Value |
|-------|-------|
| Statement prepared by | @vector (WizusLabs agent team) |
| Statement first published | 2026-05-17 |
| Statement last reviewed | 2026-05-17 |
| Statement next review | On Sprint 55 ship or any material accessibility-affecting code change, whichever is sooner |
| Statement language | English (en) |
| Vietnamese translation | Deferred to Babel sprint 55+ batch |
| Product scope | Embergrid mobile game (iOS + Android), version 1.0.0+1 and forward |
| Publisher | WizusLabs |
| Contact | <wizuslabs@gmail.com> |
