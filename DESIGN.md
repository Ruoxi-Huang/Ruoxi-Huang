# Design system — ink and paper

The visual authority for this site. Anything added here should read as a
decision made from this document rather than a preference applied on the spot.

Two references feed it, and they are not interchangeable:

- **Theme — Vercel.** Surfaces, space, elevation, radii, and the display/body/
  mono role split come from Vercel's system. Reference copy kept for Vercel-like
  work: `C:\Users\Alex\Desktop\awesome-design-md-main\design-md\vercel\DESIGN.md`.
- **Craft — impeccable.** Typography, layout and finish rules come from
  <https://github.com/pbakaus/impeccable> (`reference/typeset.md`,
  `reference/layout.md`, `reference/craft-floor.md`).

Everything below is implemented in `src/styles/global.css`, which carries the
same reasoning in comments at the point of use.

## The rule that shapes the rest

Vercel's decorative system is a colour mesh gradient, and its accent is one
blue. **This site has no hue at all.** With colour removed, the jobs that hue
used to do — emphasis, grouping, depth — move to weight, size, rules and
surface polarity:

| Was | Now |
|---|---|
| mesh gradient behind the hero | chart-paper rules at a 120px module, masked to a field around the evidence |
| blue link / highlight | ink plus an underline; `.hl` is ink, weight 600, underline |
| blue "featured" card | polarity flip to the ink surface, or a rule weight step |
| colour-coded series in charts | a three-step ink ladder (see `scripts/portfolio/p2_figures.py`) |

## What each page carries

Two page roles, and a fact or figure belongs to exactly one of them:

| Role | Carries | Does not carry |
|---|---|---|
| **Homepage** — the index | the positioning statement; site-level counts (projects, factors, tests, notes); the project register with one line each; the two components; the research notes; about and contact | any project's performance figure, holdout window, chart or architecture diagram |
| **Project page** — the report | that project's problem, method, architecture, results (metrics table and figures), reproducibility and limits | the other projects' material |
| **Note page** — one finding | one reproduction or study, in this order: what the source claims and how it does it, what this run changed and why, what it found, the control if there is one, the scope it holds under, and its limits | the other notes |
| **Component page** — one capability | what the component produces, the scope it runs at, its limits | a project's results |

The homepage is a table of contents, not a summary of the best result. Vercel's
hero band has a product-shot slot, and the tempting move is to fill it with the
strongest chart available — but a site whose hero is one project's chart reads
as a single-project site, and it duplicates the page the chart links to. The
homepage's hero slot is filled by the site-level ledger instead: statement and
numbers, closed by an ink rule.

Numbers on the homepage are counts of work, never returns. Every performance
figure lives on the project page that states its window, sample and cost
assumption, next to the site-wide disclaimer that these are backtests.

Counts on the homepage are read off the repository, not from older prose: 149
standardised factor panels is the directory count (97 price-volume + 45
fundamental + 7 ROE research factors), and 400+ automated tests is what
`pytest --collect-only` reports. When a number ages, re-check it against the
repo rather than against the last document that mentioned it.

## Tokens

```
surface   canvas #ffffff · canvas-soft #fafafa · canvas-inset #f5f5f5 · ink #171717
text      ink #171717 · ink-2 #4d4d4d · ink-3 #6f6f6f
rules     rule #ebebeb · rule-strong #d4d4d4
space     4px base: 4 8 12 16 24 32 40 48 64 96 128
radii     6 controls · 8 compact · 12 cards and figures · 100 pills
```

`--ink-3` is **#6f6f6f**, not Vercel's `#888888`: 5.02:1 on white and 4.81:1 on
`canvas-soft`, so the 11–14px labels that use it clear AA on both papers.

Elevation is declared once per level — an inset hairline ring, optionally under
stacked small shadows. Only the hero artifact floats (`--e-float`); everything
else is held by rules.

## Type

Geist with Inter behind it, and a platform CJK partner. Mono is reserved for
numbers, code, and technical labels — never for prose.

| Role | Size | Weight | Tracking |
|---|---|---|---|
| display (h1) | 34–52px | 600 | -0.03em Latin / -0.005em Han |
| section (h2) | 32px | 600 | -0.025em |
| card (h3) | 17px | 600 | -0.012em |
| lede | 18px | 400 | 0 |
| body | 16px | 400 | 0 |
| label / eyebrow / data | 11.5–12px | 400–500 | 0.06em Latin / 0.02em Han |

Measure is counted in characters, not pixels: `68ch` and `58ch` for Latin,
`38em` / `30em` for Han, where `1em` is one full-width glyph. Display tracking
fits inside the craft floor (-0.04em), and Han type gets its own leading
because full-width glyphs need more room than Latin at the same size.

No kicker sits above a heading. A `section-head` is the heading followed by a
trailing rule; a mono line above a heading is allowed only when it carries a
fact the heading cannot (the project page's "项目 01 · 研究主导").

## Structure

The page cycles surfaces `white → canvas-soft → white → ink`, with bands
separated by 96px of space and a hairline. Two repeating devices carry the
layout: the **ruled ledger** (numbers between two ink rules, hairline dividers)
and the **ruled matrix** (cards as cells of one hairline grid, with the shipped
project spanning two columns). A third, lighter device handles lists of unlike
things — notes, components, the about block: the **ruled list** (`.rows`), one
row per item with a mono tag in the left column. Cards would flatten a list of
unlike things into the same box, so lists stay lists. Nothing floats but the
evidence.

## Motion

One authored moment: the hero headline, lede and artifact rise together on
first paint, on an exponential ease-out. Everything else is state change
(hover, focus). Both are wrapped in `prefers-reduced-motion`.

## Browser surfaces

Selection (ink on white text), caret colour, focus ring (2px ink, 3px offset,
white on ink), underline offset, and tabular numerals in every numeric role are
themed from the same palette.

## Not in this system

Pure black, colour of any kind, gradient text, blur as decoration, hard offset
shadows, icons standing in for drawn marks, and a card inside a card.

## Keeping figures inside it

Data figures are generated, not hand-coloured: `scripts/portfolio/p2_figures.py`
and `scripts/portfolio/note_figures.py` hold the ink ladder and the rule that the
series a chart argues for is the darkest. Both run the same two gates before
exporting anything: the panel-alignment check, then the PDF collision audit.

The PNGs that research runs leave in `outputs/` are not site assets — they are
matplotlib defaults (blue bars, grey grid) and English-only. A note page gets its
figure by re-drawing the same results through `note_figures.py`, so the encoding,
the value ladder and the bilingual labels match the rest of the site.

Structure diagrams follow the same rule: `scripts/portfolio/site_diagrams.py`
emits the component page's data-flow SVG in both languages from one template, so
the two versions cannot drift apart.

Hatch fills were tried for the rejected alternative and removed — the
diagonal strokes of a clipped bar cross the panel title in the PDF stream and
the collision audit fails on a stroke no reader can see. The number printed on
every bar does that job instead.
