export type ProjectCategory = 'Commercial' | 'Open Source' | 'Platform' | 'Maker';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectEntry {
  title: string;
  category: ProjectCategory;
  status: string;
  description: string;
  stack: string[];
  accent: string;
  links: ProjectLink[];
}

export interface SocialLink extends ProjectLink {
  blurb: string;
}

export const heroStats = [
  { value: '6+', label: 'Live surfaces across web and commerce' },
  { value: '3', label: 'Active lanes: product, maker, open source' },
  { value: '1', label: 'Hub to tie the whole ecosystem together' },
];

export const spotlightProjects: ProjectEntry[] = [
  {
    title: 'GeddesWorks Hub',
    category: 'Platform',
    status: 'Main entry point',
    description:
      'The central landing space for projects, experiments, storefronts, and open web work.',
    stack: ['React', 'TypeScript', 'MUI', 'Tailwind'],
    accent: 'from-amber-300 via-orange-400 to-rose-500',
    links: [
      { label: 'Open site', href: 'https://www.geddesworks.com' },
      { label: 'Source', href: 'https://github.com/GeddesWorks/portfolio' },
    ],
  },
  {
    title: 'QuoteDump',
    category: 'Commercial',
    status: 'Featured app',
    description:
      'The app you are actively advertising, positioned as a polished public-facing product instead of a side project.',
    stack: ['Web App', 'Product', 'Production'],
    accent: 'from-cyan-300 via-sky-400 to-blue-600',
    links: [
      { label: 'Open app', href: 'https://quotedump.com' },
      { label: 'Main hub', href: 'https://www.geddesworks.com' },
    ],
  },
  {
    title: 'Plex Watchlist',
    category: 'Open Source',
    status: 'Open-source utility',
    description:
      'An open-source helper for Plex watchlist workflows, representing the kind of practical tooling that belongs in the GeddesWorks ecosystem.',
    stack: ['Open Source', 'Plex', 'Utility'],
    accent: 'from-emerald-300 via-teal-400 to-cyan-500',
    links: [
      { label: 'GitHub repo', href: 'https://github.com/GeddesWorks/plexlisthelper' },
      { label: 'GitHub profile', href: 'https://github.com/GeddesWorks' },
    ],
  },
];

export const projectEntries: ProjectEntry[] = [
  {
    title: '3D Print Shop',
    category: 'Commercial',
    status: 'Revenue-generating',
    description:
      'A customer-facing storefront for products, fabrication work, and the business side of GeddesWorks.',
    stack: ['Flutter Web', 'Commerce', 'Product Ops'],
    accent: 'from-fuchsia-300 via-pink-400 to-rose-500',
    links: [
      { label: 'Visit shop', href: 'https://3dshop.geddesworks.com' },
      { label: 'GitHub repo', href: 'https://github.com/GeddesWorks/shop' },
    ],
  },
  {
    title: 'Hub Prototype',
    category: 'Platform',
    status: 'Archived experiment',
    description:
      'An earlier hub-style destination that helped shape the direction toward a more connected project ecosystem.',
    stack: ['Static Web', 'GitHub Pages'],
    accent: 'from-violet-300 via-indigo-400 to-blue-500',
    links: [
      { label: 'Open prototype', href: 'https://hub.geddesworks.com' },
      { label: 'GitHub repo', href: 'https://github.com/GeddesWorks/hub' },
    ],
  },
  {
    title: 'Portfolio Source',
    category: 'Platform',
    status: 'Rebuilt',
    description:
      'The original student-era portfolio, now transformed into a broader project index and launchpad.',
    stack: ['GitHub Actions', 'Custom Domain'],
    accent: 'from-slate-300 via-zinc-400 to-stone-500',
    links: [
      { label: 'Repository', href: 'https://github.com/GeddesWorks/portfolio' },
      { label: 'Resume PDF', href: '/media/resume.pdf' },
    ],
  },
  {
    title: 'Maker Presence',
    category: 'Maker',
    status: 'Ongoing',
    description:
      'Profiles, digital products, and storefront touchpoints connected to the fabrication side of the business.',
    stack: ['Cults3D', 'Etsy', 'YouTube'],
    accent: 'from-lime-300 via-green-400 to-emerald-500',
    links: [
      {
        label: 'Cults3D',
        href: 'https://cults3d.com/en/users/GeddesWorks/3d-models',
      },
      { label: 'Etsy', href: 'https://www.etsy.com/shop/geddesworks' },
    ],
  },
];

export const operatingAreas = [
  {
    title: 'Product Websites',
    description:
      'Public sites that need to feel sharp, trustworthy, and easy to navigate for real users.',
  },
  {
    title: 'Open Experiments',
    description:
      'Smaller ideas, prototypes, and utilities that are easier to ship when the hub gives them a home.',
  },
  {
    title: 'Maker Commerce',
    description:
      'The business side of GeddesWorks: custom products, 3D printing, and storefront infrastructure.',
  },
  {
    title: 'Build System',
    description:
      'A lightweight deployment flow so the site stays easy to update as new work launches.',
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/GeddesWorks',
    blurb: 'Code, experiments, and source repositories.',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/collingeddes',
    blurb: 'Professional profile and broader career context.',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCl6UJ-zSBmVH_TGAgRP-gbw',
    blurb: 'Video, demos, and maker-adjacent publishing.',
  },
  {
    label: 'Cults3D',
    href: 'https://cults3d.com/en/users/GeddesWorks/3d-models',
    blurb: '3D models and maker distribution.',
  },
];
