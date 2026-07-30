# GeddesWorks Hub

The React + TypeScript source for `www.geddesworks.com`.

It's a hub, not a portfolio: one page, no routing, every item points at something
you can actually open.

## Stack

- Vite + React 19 + TypeScript
- Plain CSS in `src/index.css` — no component library, no utility framework
- Fraunces (display/body) and JetBrains Mono (labels) via Fontsource
- GitHub Actions for build and `gh-pages` deploys

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Editing the site

Everything you'd want to change day to day lives in `src/data/siteContent.ts`:
the intro copy, the dated "Right now" note, the link shelves, the photo captions.
Adding a project is appending an object, not touching layout.

Two rules worth keeping:

- **Every entry links somewhere.** If a project has nothing to open yet, add it as
  a sentence in `alsoGoingOn` instead of leaving an empty slot on the page. Empty
  placeholders are what made the previous version feel unfinished.
- **Update the `now` block when it stops being true.** A dated line is the cheapest
  signal that a person still maintains the site.

## Design notes

The palette is sampled from the print photos — warm concrete, river-rock grey, and
a burnt-filament orange — rather than a stock dark UI. Light and dark both follow
`prefers-color-scheme`.

The hand-made details are deliberate and all deterministic (seeded off each item's
id, so nothing jitters between renders): photos sit at slight rotations behind a
print border, section rules are drawn SVG paths with ragged ends, and a fixed SVG
grain sits over the whole page.

## Media

`src/data/siteContent.ts` still resolves images through Appwrite when
`VITE_APPWRITE_ENDPOINT` and `VITE_APPWRITE_PROJECT_ID` are set, and falls back to
the local `/media/...` copies otherwise. See `PASSOFF.md`.

### Adding a photo

Never copy a phone photo straight in. Run it through the prep script, which
resizes it, paints over anything identifying, and re-encodes without camera
metadata:

```bash
python3 scripts/prepare-photo.py ~/IMG_1234.jpg public/media/thing.jpeg --width 1400
```

`--cover x1,y1,x2,y2` paints out a region, given as fractions of the image so the
numbers hold at any source resolution. Repeat it for several regions. Use it for
registration numbers, plates, house numbers — anything readable. The pixels are
replaced with a colour sampled from the surrounding surface, so the redaction is
invisible and, unlike a blur or a CSS overlay, cannot be undone.

### Metadata

EXIF, XMP, IPTC and PNG text chunks are stripped from every image in the repo:

```bash
npm run media:check   # report anything carrying metadata (CI runs this)
npm run media:strip   # remove it, losslessly — no re-encode, pixels unchanged
```

CI fails the deploy if this check doesn't pass. Camera metadata is invisible on
the page, so nothing that only reviews the site will ever catch a stray GPS tag.
