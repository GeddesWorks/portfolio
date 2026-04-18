# Firebase Asset Migration

The current Appwrite project now has a dedicated storage bucket:

- Project database already present: `quotes`
- Storage bucket created for this migration: `portfolio-assets`

This repo does not contain Firebase runtime code. Asset migration is handled by a separate manifest-driven script so the site stays decoupled from the old storage layer.

## Manifest flow

1. Add Firebase download URLs or local export paths to [scripts/firebase-assets.example.json](C:/Users/colli/OneDrive/Projects/portfolio/scripts/firebase-assets.example.json:1)
2. Dry run the batch:
   `npm run assets:migrate -- --manifest ./scripts/firebase-assets.example.json`
3. Upload the batch:
   `npm run assets:migrate -- --manifest ./scripts/firebase-assets.example.json --execute`

## Required environment variables

- `APPWRITE_ENDPOINT`
- `APPWRITE_PROJECT_ID`
- `APPWRITE_API_KEY`
- Optional: `APPWRITE_BUCKET_ID`

## Notes

- The script accepts either `sourceUrl` for Firebase-hosted files or `sourcePath` for local exports.
- Uploads default to the `portfolio-assets` bucket unless a different bucket is passed.
- A JSON upload report is written to `scripts/firebase-assets.report.json`.
- This is set up for assets only. Metadata and content records can move separately later.

## Recovered legacy sources

- Git history does not contain a committed Firebase app config file such as `firebase.json`, `.firebaserc`, `google-services.json`, or `firebase_options.dart`.
- The old Firebase storage bucket is recoverable from source history: `geddesworks-394c1.appspot.com`.
- The original intro video URL is recoverable from commit `0d863a9`:
  `https://firebasestorage.googleapis.com/v0/b/geddesworks-394c1.appspot.com/o/IntroVideoHD.mp4?alt=media&token=3de30eb0-6372-4097-a86e-b9c7560cbd22`
- The legacy print photos were not fetched from Firebase in the committed app code. They were bundled locally in the old Flutter app under `portfilio/images/welcomeImages/1.jpeg` through `5.jpeg`.
- Those bundled photos have been copied into the current site at `public/media/welcome-1.jpeg` through `public/media/welcome-5.jpeg` so they can be migrated to Appwrite with the same manifest flow.

## Bulk recovery completed from git history

- Recovered legacy media files: `23`
- Recovered files folder: `public/media/legacy`
- Recovery index with source path + commit + blob metadata:
  `public/media/legacy/recovered-index.json`
- Generated local-file migration manifest:
  `scripts/firebase-assets.legacy.json`
- Generated historical remote-URL manifest (Firebase + Azure):
  `scripts/firebase-assets.recovered-urls.json`

## Run order for migration

1. Migrate all locally recovered files from git history:
   `npm run assets:migrate -- --manifest ./scripts/firebase-assets.legacy.json --execute`
2. Try historical remote URLs (some may now be locked or expired):
   `npm run assets:migrate -- --manifest ./scripts/firebase-assets.recovered-urls.json --execute`

## Current status (April 14, 2026)

- Local recovered batch has been uploaded to Appwrite bucket `portfolio-assets` as `23` files.
- Bucket permissions were updated to include `read("any")` so browser `view` URLs work publicly.
- Uploaded file IDs are listed in:
  `docs/appwrite-uploaded-assets.md`
- Frontend now supports Appwrite-hosted media via env-configured URL resolution with local fallback.

## Frontend env for Appwrite-hosted media

Use `.env.example` as a template:

- `VITE_APPWRITE_ENDPOINT`
- `VITE_APPWRITE_PROJECT_ID`
- Optional: `VITE_APPWRITE_BUCKET_ID` (defaults to `portfolio-assets`)
