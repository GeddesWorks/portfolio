# PASSOFF

Last updated: July 29, 2026

## Context

This repo is a React + Vite + TypeScript hub for GeddesWorks.

The April build read as generic — glass cards, auto-scrolling carousel, "Open slot"
placeholders, chip taxonomies over four real projects. It has been rebuilt as a
single-page index with a warm, hand-set look.

What the site is now:

- one page, no routing, no carousel, no placeholders
- first-person copy with a dated "Right now" note
- link shelves grouped by where a thing lives (internet / garage / games)
- items with nothing to link to are prose in `alsoGoingOn`, never empty cards

Do not reintroduce empty slots or "Soon" status chips. That was the main thing that
made the previous version feel unfinished.

## Current Architecture

- UI: `src/App.tsx` (plain semantic markup, no component library)
- Content model: `src/data/siteContent.ts`
- Global CSS + design tokens: `src/index.css`

MUI, Emotion and Tailwind were removed; `src/theme.ts` is gone. Fonts are Fraunces
(`full.css` build — the opsz/SOFT/WONK axes are used) and JetBrains Mono, both via
Fontsource.

`siteContent.ts` is the main data source and now includes Appwrite URL resolution with local fallback:

- `appwriteFileView(fileId, fallbackPath)`
- `brandMedia.avatarCutout`

If frontend env vars are missing, media falls back to local `/media/...` paths.

## Appwrite Status

Appwrite MCP was used to upload recovered legacy assets.

- bucket id: `portfolio-assets`
- bucket permission: `read("any")` enabled
- uploaded files: `23` (legacy image set)
- upload map: `docs/appwrite-uploaded-assets.md`

Notable wired file IDs currently used by the UI:

- `legacy-geddes-cutout`
- `legacy-welcome-1`
- `legacy-welcome-2`
- `legacy-welcome-3`
- `legacy-welcome-4`
- `legacy-welcome-5`

These power:

- the masthead mark (`brandMedia.mark`)
- the five photos in the print strip

`studio-shot.jpeg` is a byte-identical duplicate of `welcome-1.jpeg` and is no
longer referenced. The strip crops to 16:10 because two of the originals have
letterbox bars baked in.

## Firebase/Legacy Recovery Status

Google/Firebase access is partially lost, but git history recovery is done.

- recovered local legacy media: `public/media/legacy/` (23 files)
- recovery index: `public/media/legacy/recovered-index.json`
- generated manifests:
  - `scripts/firebase-assets.legacy.json`
  - `scripts/firebase-assets.recovered-urls.json`

The only committed Firebase media URL found in history is the old intro video.
Other legacy media came from files committed into older Flutter-era directories.

Details: `docs/firebase-asset-migration.md`

## Env Needed For Frontend Appwrite Media

Template exists at `.env.example`.

Required:

- `VITE_APPWRITE_ENDPOINT`
- `VITE_APPWRITE_PROJECT_ID`

Optional:

- `VITE_APPWRITE_BUCKET_ID` (defaults to `portfolio-assets`)

## Scripts

From `package.json`:

- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run assets:migrate -- --manifest <path> [--execute]`

## Validation Done Recently

- `npm run lint` passes
- `npm run build` passes

## Known Open Items / Good Next Tasks

0. Copy is a first draft written from the repos — Collin should pass over it in his
   own words. Specifically unverified: the "out back" in the photo caption, and
   whether the Etsy shop and `apps.geddesworks.com/weddingpics/` should be public
   links at all. Photos are ~600–900 KB each and still served from `public/media`.
1. Confirm real frontend env vars in local/dev/prod so Appwrite URLs are actively used (not fallback).
2. Decide whether to also upload/retain historical remote URLs in `scripts/firebase-assets.recovered-urls.json` (some are likely locked/expired).
3. Decide which of the 23 uploaded legacy assets should actually be surfaced in current UI vs kept as archive.
4. If moving to a new Appwrite project later, keep file IDs/bucket structure or add a migration mapping step.

## Working Tree Note

Repo is intentionally dirty with in-progress uncommitted changes.
Do not reset/revert broadly.
There are prior unrelated changes (for example `package-lock.json`) that should be treated carefully.
