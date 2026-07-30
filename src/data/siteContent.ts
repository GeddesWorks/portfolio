/**
 * All of the site's words and links live here.
 *
 * This is a hub, not a portfolio. Everything below should be something you can
 * actually click through to. If a thing has no link yet, put it in `offline`
 * as a sentence instead of leaving an empty slot on the page.
 *
 * Photos work the same way: a `Photo` with no `src` renders nothing in a build.
 * Its `shotNote` shows only while `npm run dev` is running, as a reminder of what
 * belongs there — so the shot list lives next to the layout, never on the site.
 *
 * PENDING: four `src` paths below are wired but the files aren't in the repo yet.
 * Run each raw photo through `scripts/prepare-photo.py` — it resizes, paints out
 * anything identifying and drops all camera metadata — then the frames light up
 * with no code change:
 *
 *   pontoon.jpeg            the dusk boat-ramp shot          (hero)
 *   print-shelf.jpeg        the printer + server shelving    (garage)
 *   couch-kart-built.jpeg   the go-kart couch parked         (no links)
 *   couch-kart-riding.jpeg  the go-kart couch in motion      (no links)
 *
 * The pontoon needs its registration number covered:
 *
 *   python3 scripts/prepare-photo.py <raw> public/media/pontoon.jpeg \
 *       --width 2000 --cover 0.424,0.492,0.590,0.558
 *
 * Until then those frames come up empty. Nothing user-facing breaks: the deploy
 * workflow only runs on `main`.
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

export interface Photo {
  id: string;
  /** Leave undefined until the photo exists. Nothing renders without it. */
  src?: string;
  alt: string;
  /** Shown under this photo. Photos that need no comment simply don't get one. */
  caption?: string;
  /** `object-position` — use it when a centre crop would cut the subject. */
  focus?: string;
  /** Dev-only reminder of what this frame should contain. Never shipped. */
  shotNote?: string;
}

export interface Shelf {
  id: string;
  /** Shown in the jump nav. */
  short: string;
  title: string;
  entries: Entry[];
  /** Evidence for the shelf, shown after its entries. */
  photos?: Photo[];
}

/** A shelf's worth of things that exist but have nothing to click. */
export interface ProseSection {
  id: string;
  short: string;
  title: string;
  paragraphs: string[];
  photos?: Photo[];
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
  strapline: 'software · homelab · 3D printing · engines',
};

export const intro = [
  "I'm Collin. I write software, run more servers than this house strictly needs, and rebuild things most people would hand to a shop.",
  'Most of what I make joins two of those together. A Raspberry Pi photographs the 3D printer. A box in the rack hosts game night. The interesting part is almost always the seam — where the software meets the thing it is pointed at.',
  'This page is an index. The actual work lives somewhere else, so here are the doors.',
];

/**
 * The thesis image. Not a computer, on purpose — the intro claims I rebuild
 * things most people would hand to a shop, and this is the receipt.
 */
export const heroPhoto: Photo = {
  id: 'pontoon',
  src: '/media/pontoon.jpeg',
  alt: 'Collin standing on his Voyager pontoon at a boat ramp at dusk, green LED strips lit along the hull',
  caption: 'The pontoon at the ramp, back in the water after I rebuilt the motor.',
  focus: 'center 42%',
  shotNote: 'Drop the dusk boat-ramp photo at public/media/pontoon.jpeg, ~2000px wide.',
};

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
    /* Sitting under the shelf they belong to, these are evidence. Up at the top
       of the page they were only decoration. */
    photos: [
      {
        id: 'print-shelf',
        src: '/media/print-shelf.jpeg',
        alt: 'Wire shelving holding two Bambu A1 printers, a resin printer, filament spools and a stack of servers',
        caption: 'Two A1s, a resin printer, and the servers that ended up on the shelf underneath.',
        // Square source in a 16:10 frame — bias down so the server stack survives.
        focus: 'center 58%',
        shotNote: 'Drop the printer-shelf photo at public/media/print-shelf.jpeg, ~1400px wide.',
      },
      {
        id: 'dragon-green',
        src: appwriteFileView('legacy-welcome-1', '/media/welcome-1.jpeg'),
        alt: 'Translucent green articulated dragon resting on river rocks',
        // Captions the run of dragons that follows, so the rest need no label.
        caption: 'Print-in-place dragons, various filaments, shot on the concrete out back.',
      },
      {
        id: 'dragon-salmon',
        src: appwriteFileView('legacy-welcome-2', '/media/welcome-2.jpeg'),
        alt: 'Salmon-pink spiked articulated dragon coiled over river rocks',
      },
      {
        id: 'dragon-pink',
        src: appwriteFileView('legacy-welcome-3', '/media/welcome-3.jpeg'),
        alt: 'Pink articulated dragon draped across a stack of river rocks',
      },
      {
        id: 'dragon-blue',
        src: appwriteFileView('legacy-welcome-4', '/media/welcome-4.jpeg'),
        alt: 'Translucent blue crystalline dragon perched on river rocks',
      },
      {
        id: 'dragon-magenta',
        src: appwriteFileView('legacy-welcome-5', '/media/welcome-5.jpeg'),
        alt: 'Pink and violet winged dragon standing on river rocks',
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
 * Real work that has nothing to click. Prose, not empty cards — an unfinished
 * sentence is honest, an unfinished card is filler.
 */
export const offline: ProseSection = {
  id: 'offline',
  short: 'No links',
  title: "Things that don't have links",
  paragraphs: [
    'GeddesWorksHome is a multi-node Proxmox cluster in the house — ZFS underneath, a stack of VMs and containers on top, a GPU passed through to the one box that needs it, and whatever game server we are currently playing. Most of what is listed above leans on it somewhere. The rest of the house runs on the same habit: a Steam Deck and Moonlight instead of a console, and a home assistant called JARVIS that I keep rewriting in C#, with an ESP32 audio board for ears.',
    'Away from a keyboard I have been elbow-deep in a Honda BF115A2 outboard — compression tests, thermostats, valves, a high-pressure fuel pump, and eventually a head gasket — which now pushes a 22-foot pontoon around. Before that, a leather couch went onto a wooden chassis with a generator engine and a set of four-wheeler parts under it. It drives. There is also a lifted Tundra that tows the boat, and a shop where the woodworking, the printers and a half-drawn truck-bed drawer all compete for the same bench.',
    'None of that has a URL, which is the point of putting it here rather than pretending it is a project.',
  ],
  photos: [
    {
      id: 'couch-kart-built',
      src: '/media/couch-kart-built.jpeg',
      alt: 'A leather couch mounted on a wooden go-kart chassis with handlebars, work lights and knobby wheels, parked at night',
      caption: 'Generator engine, four-wheeler parts, and a pair of work lights bolted to the front.',
      shotNote: 'Drop the parked go-kart couch photo at public/media/couch-kart-built.jpeg, ~1400px wide.',
    },
    {
      id: 'couch-kart-riding',
      src: '/media/couch-kart-riding.jpeg',
      alt: 'Three people sitting on the couch go-kart as it drives down a street at night, belt drive and engine visible',
      caption: 'It carries more people than it has any business carrying.',
      shotNote: 'Drop the go-kart-in-motion photo at public/media/couch-kart-riding.jpeg, ~1400px wide.',
    },
    {
      id: 'outboard',
      alt: 'The Honda BF115A2 outboard opened up with parts laid out',
      caption: 'The BF115A2, mid-argument.',
      shotNote:
        'Optional, but the best one still missing: the BF115A2 with the head off and parts laid out in order. Nothing says "learns the whole system" faster.',
    },
  ],
};

export const elsewhere: Link[] = [
  { label: 'GitHub', href: 'https://github.com/GeddesWorks' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/collingeddes' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCl6UJ-zSBmVH_TGAgRP-gbw' },
  { label: 'Cults3D', href: 'https://cults3d.com/en/users/GeddesWorks/3d-models' },
  { label: 'Etsy', href: 'https://geddesworks.etsy.com' },
];

export const colophon =
  'Set in Fraunces and JetBrains Mono. React and Vite, built by GitHub Actions, served from GitHub Pages. Photos are my own prints.';
