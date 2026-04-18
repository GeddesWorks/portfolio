# Appwrite Content Model

## Services

- Database: `portfolio`
- Storage bucket: `portfolio-media`

## Collections

### `categories`

- `slug`
- `title`
- `page`
- `sortOrder`
- `placeholderCount`

### `projects`

- `slug`
- `title`
- `categoryId`
- `status`
- `summary`
- `featured`
- `accent`
- `previewLabel`
- `previewFileId`
- `sortOrder`

### `projectLinks`

- `projectId`
- `label`
- `kind`
- `url`
- `sortOrder`

### `mediaAssets`

- `projectId`
- `kind`
- `fileId`
- `alt`
- `caption`
- `featured`
- `sortOrder`

### `siteLinks`

- `label`
- `url`
- `sortOrder`
- `pinned`

## Initial records

### Categories

- `open-source`
- `game-mods`
- `closed-source`
- `physical-projects`

### Projects

- `quotedump`
- `plex-list-helper`
- `cults3d-profile`
- `makerworld-profile`

## UI mapping

- Home carousel reads featured `projects`
- Home category browser reads `categories` plus matching `projects`
- QuoteDump panel reads the `quotedump` project plus its `projectLinks`
- Video panel reads the first featured `mediaAssets` record with kind `video`
- Prints page carousel reads `mediaAssets` for print images and posters

## Firebase migration order

1. Print photos
2. Project posters
3. Project summary videos
