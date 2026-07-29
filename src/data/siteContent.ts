/**
 * All of the site's words and links live here.
 *
 * This is a hub, not a portfolio. Everything below should be something you can
 * actually click through to. If a thing has no link yet, put it in `alsoGoingOn`
 * as a sentence instead of leaving an empty slot on the page.
 */

export interface Link {
  label: string;
  href: string;
}

export interface Entry {
  id: string;
  name: string;
  /** One or two honest sentences. Written how you'd say it out loud. */
  blurb: string;
  /** Small technical aside, set in mono. Optional. */
  meta?: string;
  links: Link[];
}

export interface Shelf {
  id: string;
  /** Shown in the jump nav. */
  short: string;
  title: string;
  entries: Entry[];
}

export interface Photo {
  id: string;
  src?: string;
  alt: string;
}

const appwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT?.replace(/\/$/, '');
const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const appwriteBucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID || 'portfolio-assets';

/** Resolves to Appwrite when the env vars exist, otherwise the local copy. */
function appwriteFileView(fileId: string, fallbackPath?: string) {
  if (!appwriteEndpoint || !appwriteProjectId) {
    return fallbackPath;
  }

  return `${appwriteEndpoint}/storage/buckets/${appwriteBucketId}/files/${fileId}/view?project=${appwriteProjectId}`;
}

export const brandMedia = {
  mark: appwriteFileView('legacy-geddes-cutout', '/media/avatar-cutout.png'),
};

export const masthead = {
  wordmark: 'GeddesWorks',
  name: 'Collin Geddes',
  /** Keep this to one line. It sits under the wordmark in mono. */
  strapline: 'software · 3D printing · things that plug in',
};

export const intro = [
  "I'm Collin. I build web apps, mod games I like too much, and run a 3D printer that photographs itself.",
  'Most of it is small, most of it is for me or for someone I know, and a good amount of it is held together by a Raspberry Pi and stubbornness.',
  'This page is an index. The actual work lives somewhere else, so here are the doors.',
];

/**
 * Change this when it stops being true. A dated line is the cheapest way to
 * prove a person still maintains the site.
 */
export const now = {
  updated: 'July 2026',
  lines: [
    'Teaching a Nikon D40 from 2006 to take one photo per layer so the Bambu A1 can film its own timelapses.',
    'Getting eight players onto one couch in Bopl Battle, which the game did not want.',
  ],
};

export const shelves: Shelf[] = [
  {
    id: 'internet',
    short: 'On the internet',
    title: 'Things on the internet',
    entries: [
      {
        id: 'quotedump',
        name: 'QuoteDump',
        blurb: "Quoting software — a landing site and the app itself. This is the one I don't open-source.",
        meta: 'react · appwrite',
        links: [
          { label: 'quotedump.com', href: 'https://quotedump.com' },
          { label: 'quotedump.app', href: 'https://quotedump.app' },
        ],
      },
      {
        id: 'plexlists',
        name: 'Plex List Picker',
        blurb:
          'Loads a public Plex share list, lets you filter it to death, then picks something at random so nobody has to decide.',
        meta: 'react · appwrite function · tmdb',
        links: [
          { label: 'Open it', href: 'https://apps.geddesworks.com/plexlists/' },
          { label: 'Source', href: 'https://github.com/GeddesWorks/plexlisthelper' },
        ],
      },
      {
        id: 'jakeofall',
        name: 'Jake of All',
        blurb: 'A site for a handyman named Jake. He does the remodels; I did the website.',
        links: [{ label: 'Open it', href: 'https://apps.geddesworks.com/jakeofall/' }],
      },
      {
        id: 'weddingpics',
        name: 'Wedding Pics',
        blurb: "Somewhere to put the photos from Jonathan and Amanda's wedding.",
        links: [{ label: 'Open it', href: 'https://apps.geddesworks.com/weddingpics/' }],
      },
    ],
  },
  {
    id: 'garage',
    short: 'In the garage',
    title: 'Things in the garage',
    entries: [
      {
        id: 'bambucam',
        name: 'BambuCam',
        blurb:
          'A Raspberry Pi waits for the layer-change pulse off my A1, trips a Nikon D40 over gphoto2, then stitches the frames into a timelapse and uploads it. It has to survive a power cut at any point and keep going, which was most of the work.',
        meta: 'python · raspberry pi · gphoto2 · ffmpeg',
        links: [{ label: 'Source', href: 'https://github.com/GeddesWorks/bambucam' }],
      },
      {
        id: 'cults3d',
        name: 'Cults3D',
        blurb: 'Where the print files go. Mostly articulated things that come off the plate already moving.',
        links: [{ label: 'My models', href: 'https://cults3d.com/en/users/GeddesWorks/3d-models' }],
      },
      {
        id: 'etsy',
        name: 'Etsy shop',
        blurb: "The printed versions, for when you'd rather I did the printing.",
        links: [{ label: 'Shop', href: 'https://geddesworks.etsy.com' }],
      },
    ],
  },
  {
    id: 'games',
    short: 'In games',
    title: 'Things bolted onto games',
    entries: [
      {
        id: 'bopl-more-players',
        name: 'Bopl More Players',
        blurb:
          'Bopl Battle stops at four local players. This gets eight onto one couch, by way of BepInEx and a great many Harmony patches.',
        meta: 'c# · bepinex · harmony',
        links: [{ label: 'Source', href: 'https://github.com/GeddesWorks/boplMorePlayers' }],
      },
      {
        id: 'bopl-more-colors',
        name: 'Bopl More Colors',
        blurb: 'More player colors than the game ships with. Necessary once there are eight of you.',
        meta: 'c# · bepinex',
        links: [{ label: 'Source', href: 'https://github.com/GeddesWorks/BoplMoreColors' }],
      },
    ],
  },
];

/**
 * Real projects that have nothing worth linking to yet. Prose, not empty cards —
 * an unfinished sentence is honest, an unfinished card is filler.
 */
export const alsoGoingOn =
  'A few things live only on hardware in my house: JARVIS, a home assistant I keep rewriting in C#, and the ESP32 audio board that acts as its ears. There is also a pile of half-finished ESP boards, LED controllers and keyboard firmware that never made it to a README.';

export const photos: Photo[] = [
  { id: 'dragon-green', src: appwriteFileView('legacy-welcome-1', '/media/welcome-1.jpeg'), alt: 'Translucent green articulated dragon resting on river rocks' },
  { id: 'dragon-salmon', src: appwriteFileView('legacy-welcome-2', '/media/welcome-2.jpeg'), alt: 'Salmon-pink spiked articulated dragon coiled over river rocks' },
  { id: 'dragon-pink', src: appwriteFileView('legacy-welcome-3', '/media/welcome-3.jpeg'), alt: 'Pink articulated dragon draped across a stack of river rocks' },
  { id: 'dragon-blue', src: appwriteFileView('legacy-welcome-4', '/media/welcome-4.jpeg'), alt: 'Translucent blue crystalline dragon perched on river rocks' },
  { id: 'dragon-magenta', src: appwriteFileView('legacy-welcome-5', '/media/welcome-5.jpeg'), alt: 'Pink and violet winged dragon standing on river rocks' },
];

export const photoCaption = 'Print-in-place dragons, various filaments, shot on the concrete out back.';

export const elsewhere: Link[] = [
  { label: 'GitHub', href: 'https://github.com/GeddesWorks' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/collingeddes' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCl6UJ-zSBmVH_TGAgRP-gbw' },
  { label: 'Cults3D', href: 'https://cults3d.com/en/users/GeddesWorks/3d-models' },
  { label: 'Etsy', href: 'https://geddesworks.etsy.com' },
];

export const colophon =
  'Set in Fraunces and JetBrains Mono. React and Vite, built by GitHub Actions, served from GitHub Pages. Photos are my own prints.';
