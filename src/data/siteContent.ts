export type AppPageId = 'overview' | 'code' | 'physical';

export interface SitePage {
  id: AppPageId;
  label: string;
  title: string;
}

export interface ProjectCollection {
  id: string;
  pageId: Exclude<AppPageId, 'overview'>;
  title: string;
  placeholderCount?: number;
  placeholderLabel?: string;
}

export interface ProjectLink {
  label: string;
  href?: string;
}

export interface ProjectRecord {
  id: string;
  collectionId: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  tags: string[];
  accent: string;
  featured?: boolean;
  previewImageSrc?: string;
  previewLabel?: string;
  links: ProjectLink[];
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  imageSrc?: string;
  accent: string;
  note?: string;
}

export interface ProjectVideo {
  title: string;
  status: string;
  posterImageSrc?: string;
}

export interface ExternalLink {
  label: string;
  href?: string;
}

const appwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT?.replace(/\/$/, '');
const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const appwriteBucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID || 'portfolio-assets';

function appwriteFileView(fileId: string, fallbackPath?: string) {
  if (!appwriteEndpoint || !appwriteProjectId) {
    return fallbackPath;
  }

  return `${appwriteEndpoint}/storage/buckets/${appwriteBucketId}/files/${fileId}/view?project=${appwriteProjectId}`;
}

export const brandMedia = {
  avatarCutout: appwriteFileView('legacy-geddes-cutout', '/media/avatar-cutout.png'),
};

export const sitePages: SitePage[] = [
  {
    id: 'overview',
    label: 'Home',
    title: 'Home',
  },
  {
    id: 'code',
    label: 'Code',
    title: 'Code',
  },
  {
    id: 'physical',
    label: 'Prints',
    title: 'Prints',
  },
];

export const projectCollections: ProjectCollection[] = [
  {
    id: 'open-source',
    pageId: 'code',
    title: 'Open Source',
    placeholderCount: 1,
    placeholderLabel: 'Open slot',
  },
  {
    id: 'game-mods',
    pageId: 'code',
    title: 'Game Mods',
    placeholderCount: 3,
    placeholderLabel: 'Open slot',
  },
  {
    id: 'closed-source',
    pageId: 'code',
    title: 'Closed Source',
  },
  {
    id: 'physical-projects',
    pageId: 'physical',
    title: '3D Printing',
    placeholderCount: 2,
    placeholderLabel: 'Open slot',
  },
];

export const projects: ProjectRecord[] = [
  {
    id: 'quotedump',
    collectionId: 'closed-source',
    title: 'QuoteDump',
    category: 'Closed source',
    status: 'Live',
    summary: 'Quote sites, product pages, and launch flows.',
    tags: ['Web', 'Live'],
    accent: 'linear-gradient(135deg, #f4b264 0%, #f57f5b 52%, #de5b74 100%)',
    featured: true,
    previewLabel: 'QD',
    links: [
      { label: 'Landing', href: 'https://quotedump.com' },
      { label: 'App', href: 'https://quotedump.app' },
    ],
  },
  {
    id: 'plex-list-helper',
    collectionId: 'open-source',
    title: 'Plex List Helper',
    category: 'Open source',
    status: 'Active',
    summary: 'Plex list utility for faster library cleanup.',
    tags: ['Plex', 'Repo'],
    accent: 'linear-gradient(135deg, #87e6c7 0%, #42c6d1 48%, #2969ff 100%)',
    featured: true,
    previewLabel: 'PLH',
    links: [{ label: 'Repo', href: 'https://github.com/GeddesWorks/plexlisthelper' }],
  },
  {
    id: 'cults3d-profile',
    collectionId: 'physical-projects',
    title: 'Cults3D',
    category: '3D printing',
    status: 'Live',
    summary: 'Released print catalog and file drops.',
    tags: ['Prints', 'Files'],
    accent: 'linear-gradient(135deg, #29516f 0%, #37668f 52%, #5b89b6 100%)',
    featured: true,
    previewImageSrc: appwriteFileView('legacy-welcome-1', '/media/welcome-1.jpeg'),
    links: [{ label: 'Open', href: 'https://cults3d.com/en/users/GeddesWorks/3d-models' }],
  },
  {
    id: 'makerworld-profile',
    collectionId: 'physical-projects',
    title: 'MakerWorld',
    category: '3D printing',
    status: 'Soon',
    summary: 'Profile setup and release queue.',
    tags: ['Prints', 'Platform'],
    accent: 'linear-gradient(135deg, #3c5530 0%, #4f7541 52%, #7eb05f 100%)',
    featured: true,
    previewImageSrc: appwriteFileView('legacy-welcome-2', '/media/welcome-2.jpeg'),
    links: [{ label: 'Profile' }],
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'studio',
    title: 'Workbench',
    caption: 'Bench setup.',
    imageSrc: '/media/studio-shot.jpeg',
    accent: 'linear-gradient(135deg, #1f3557 0%, #244a7d 52%, #4f79b3 100%)',
  },
  {
    id: 'print-01',
    title: 'Print 01',
    caption: 'Archive photo.',
    imageSrc: appwriteFileView('legacy-welcome-1', '/media/welcome-1.jpeg'),
    accent: 'linear-gradient(135deg, #d6b25f 0%, #ef8f45 52%, #c96541 100%)',
  },
  {
    id: 'print-02',
    title: 'Print 02',
    caption: 'Archive photo.',
    imageSrc: appwriteFileView('legacy-welcome-2', '/media/welcome-2.jpeg'),
    accent: 'linear-gradient(135deg, #7a6ed6 0%, #5c79f0 52%, #3f97ef 100%)',
  },
  {
    id: 'print-03',
    title: 'Print 03',
    caption: 'Archive photo.',
    imageSrc: appwriteFileView('legacy-welcome-3', '/media/welcome-3.jpeg'),
    accent: 'linear-gradient(135deg, #6ebd95 0%, #37ab88 52%, #0f897a 100%)',
  },
  {
    id: 'print-04',
    title: 'Print 04',
    caption: 'Archive photo.',
    imageSrc: appwriteFileView('legacy-welcome-4', '/media/welcome-4.jpeg'),
    accent: 'linear-gradient(135deg, #e2ae7f 0%, #ea8b6d 52%, #cb5f70 100%)',
  },
  {
    id: 'print-05',
    title: 'Print 05',
    caption: 'Archive photo.',
    imageSrc: appwriteFileView('legacy-welcome-5', '/media/welcome-5.jpeg'),
    accent: 'linear-gradient(135deg, #7ca9f7 0%, #4f8dd8 52%, #3b68ba 100%)',
  },
];

export const projectVideo: ProjectVideo = {
  title: 'Project Video',
  status: 'Soon',
  posterImageSrc: appwriteFileView('legacy-welcome-3', '/media/welcome-3.jpeg'),
};

export const externalLinks: ExternalLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/GeddesWorks',
  },
  {
    label: 'MakerWorld',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/collingeddes',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCl6UJ-zSBmVH_TGAgRP-gbw',
  },
  {
    label: 'Cults3D',
    href: 'https://cults3d.com/en/users/GeddesWorks/3d-models',
  },
];
