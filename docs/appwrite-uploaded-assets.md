# Appwrite Uploaded Assets

Bucket: `portfolio-assets`  
Visibility: bucket permissions include `read("any")` for public read access.

## Uploaded legacy file IDs

- `legacy-3dprinter`
- `legacy-accent-banner`
- `legacy-auth-seller-badge`
- `legacy-bambu-logo`
- `legacy-cashapp-logo`
- `legacy-cults-logo`
- `legacy-etsy-logo`
- `legacy-etsy-dark-logo`
- `legacy-etsy-square-logo`
- `legacy-geddes-cutout`
- `legacy-geddes-logo`
- `legacy-github-mark`
- `legacy-linkedin-logo`
- `legacy-cults-webp-logo`
- `legacy-paypal-logo`
- `legacy-venmo-logo`
- `legacy-welcome-1`
- `legacy-welcome-2`
- `legacy-welcome-3`
- `legacy-welcome-4`
- `legacy-welcome-5`
- `legacy-youtube-dark-logo`
- `legacy-youtube-logo`

## Wired into the site

Current frontend data uses Appwrite URLs (with local fallback) for:

- header avatar: `legacy-geddes-cutout`
- print project cards: `legacy-welcome-1`, `legacy-welcome-2`
- print gallery: `legacy-welcome-1` through `legacy-welcome-5`
- video poster placeholder: `legacy-welcome-3`

If `VITE_APPWRITE_ENDPOINT` and `VITE_APPWRITE_PROJECT_ID` are unset, the site falls back to local `/media/...` paths.
