import {
  ArrowOutwardRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
  GitHub,
  LinkedIn,
  PlayCircleOutlineRounded,
  YouTube,
} from '@mui/icons-material';
import { Avatar, Box, Chip, Container, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  brandMedia,
  externalLinks,
  galleryItems,
  projectCollections,
  projectVideo,
  projects,
  sitePages,
  type AppPageId,
  type ExternalLink,
  type GalleryItem,
  type ProjectCollection,
  type ProjectLink,
  type ProjectRecord,
} from './data/siteContent.ts';

const panelSx = {
  border: '1px solid rgba(255,255,255,0.08)',
  bgcolor: 'rgba(18,19,21,0.74)',
  boxShadow: '0 24px 80px rgba(0,0,0,0.28)',
  backdropFilter: 'blur(18px)',
};

const innerPanelSx = {
  border: '1px solid rgba(255,255,255,0.08)',
  bgcolor: 'rgba(255,255,255,0.04)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
};

function getPageFromHash(hash: string): AppPageId {
  const normalized = hash.replace('#', '');
  return sitePages.some((page) => page.id === normalized)
    ? (normalized as AppPageId)
    : 'overview';
}

function getCollectionsForPage(pageId: Exclude<AppPageId, 'overview'>) {
  return projectCollections.filter((collection) => collection.pageId === pageId);
}

function getProjectsForCollection(collectionId: string) {
  return projects.filter((project) => project.collectionId === collectionId);
}

function getPlaceholderTitles(collection: ProjectCollection) {
  return Array.from({ length: collection.placeholderCount ?? 0 }, (_, index) => {
    const label = collection.placeholderLabel ?? 'Open slot';
    return (collection.placeholderCount ?? 0) > 1 ? `${label} ${index + 1}` : label;
  });
}

function HeaderLink({ link }: { link: ExternalLink }) {
  const icons: Record<string, ReactNode> = {
    GitHub: <GitHub sx={{ fontSize: '1rem' }} />,
    LinkedIn: <LinkedIn sx={{ fontSize: '1rem' }} />,
    YouTube: <YouTube sx={{ fontSize: '1rem' }} />,
  };

  if (!link.href) {
    return (
      <Box
        sx={{
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.1)',
          px: 1.4,
          py: 0.9,
          color: 'rgba(245,235,221,0.44)',
          fontSize: '0.95rem',
        }}
      >
        {link.label}
      </Box>
    );
  }

  return (
    <Box
      component="a"
      href={link.href}
      target="_blank"
      rel="noreferrer"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        borderRadius: 999,
        px: 1.4,
        py: 0.9,
        color: 'rgba(245,235,221,0.82)',
        fontSize: '0.95rem',
        textDecoration: 'none',
        transition: 'background-color 180ms ease, color 180ms ease',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.06)',
          color: 'white',
        },
      }}
    >
      {icons[link.label] ?? null}
      {link.label}
    </Box>
  );
}

function PagePill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        appearance: 'none',
        border: '1px solid',
        borderColor: active ? 'rgba(240,179,93,0.3)' : 'rgba(255,255,255,0.08)',
        borderRadius: 999,
        px: 1.5,
        py: 0.9,
        bgcolor: active ? 'rgba(240,179,93,0.14)' : 'transparent',
        color: active ? '#F5EBDD' : 'rgba(245,235,221,0.68)',
        cursor: 'pointer',
        font: 'inherit',
        transition: 'border-color 180ms ease, background-color 180ms ease, color 180ms ease',
        '&:hover': {
          borderColor: 'rgba(240,179,93,0.22)',
          color: 'white',
        },
      }}
    >
      {children}
    </Box>
  );
}

function ProjectAction({
  link,
  prominent = false,
}: {
  link: ProjectLink;
  prominent?: boolean;
}) {
  const commonSx = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.75,
    borderRadius: 999,
    px: prominent ? 1.7 : 1.35,
    py: prominent ? 1 : 0.8,
    fontSize: prominent ? '0.98rem' : '0.92rem',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'background-color 180ms ease, border-color 180ms ease, color 180ms ease',
  };

  if (!link.href) {
    return (
      <Box
        component="span"
        sx={{
          ...commonSx,
          border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(245,235,221,0.38)',
        }}
      >
        {link.label}
      </Box>
    );
  }

  return (
    <Box
      component="a"
      href={link.href}
      target="_blank"
      rel="noreferrer"
      sx={{
        ...commonSx,
        border: '1px solid rgba(255,255,255,0.08)',
        bgcolor: prominent ? 'rgba(255,255,255,0.08)' : 'transparent',
        color: 'rgba(245,235,221,0.88)',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.12)',
          borderColor: 'rgba(255,255,255,0.16)',
          color: 'white',
        },
      }}
    >
      {link.label}
      <ArrowOutwardRounded sx={{ fontSize: '1rem' }} />
    </Box>
  );
}

function PlaceholderCard({ title }: { title: string }) {
  return (
    <Box sx={{ ...innerPanelSx, borderStyle: 'dashed', borderRadius: '22px', p: 2.25 }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: '#F5EBDD' }}>
          {title}
        </Typography>
        <Chip
          size="small"
          label="Next"
          sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: 'rgba(245,235,221,0.72)' }}
        />
      </Stack>
    </Box>
  );
}

function ProjectListItem({ project }: { project: ProjectRecord }) {
  return (
    <Box sx={{ ...innerPanelSx, overflow: 'hidden', borderRadius: '24px' }}>
      <Box
        sx={{
          position: 'relative',
          minHeight: 250,
          backgroundImage: project.previewImageSrc ? undefined : project.accent,
        }}
      >
        {project.previewImageSrc ? (
          <Box
            component="img"
            src={project.previewImageSrc}
            alt={project.title}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : null}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: project.previewImageSrc
              ? 'linear-gradient(180deg, rgba(18,19,21,0.12), rgba(18,19,21,0.24) 38%, rgba(18,19,21,0.9))'
              : 'linear-gradient(180deg, rgba(18,19,21,0.08), rgba(18,19,21,0.16) 38%, rgba(18,19,21,0.9))',
          }}
        />

        {!project.previewImageSrc ? (
          <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: 0.24 }}>
            <Typography sx={{ color: 'white', fontSize: { xs: '3.4rem', md: '4rem' }, fontWeight: 700, letterSpacing: '-0.08em' }}>
              {project.previewLabel ?? project.title.slice(0, 2)}
            </Typography>
          </Box>
        ) : null}

        <Stack spacing={2} sx={{ position: 'relative', zIndex: 1, minHeight: '100%', justifyContent: 'space-between', p: { xs: 2, md: 2.25 } }}>
          <Stack direction="row" spacing={1.2} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip size="small" label={project.category} sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#F5EBDD' }} />
            <Chip size="small" label={project.status} sx={{ bgcolor: 'rgba(18,19,21,0.36)', color: '#F5EBDD' }} />
          </Stack>

          <Box
            sx={{
              mt: 'auto',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.08)',
              bgcolor: 'rgba(12,13,15,0.66)',
              backdropFilter: 'blur(16px)',
              p: 2,
            }}
          >
            <Stack spacing={1.4}>
              <Typography variant="h4" sx={{ color: '#F5EBDD' }}>
                {project.title}
              </Typography>

              <Typography
                sx={{
                  color: 'rgba(245,235,221,0.68)',
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
              >
                {project.summary}
              </Typography>

              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                {project.links.map((link) => (
                  <ProjectAction key={link.label} link={link} />
                ))}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Stack direction="row" spacing={0.9} useFlexGap sx={{ flexWrap: 'wrap', px: 2.25, py: 1.7, borderTop: '1px solid rgba(255,255,255,0.06)', bgcolor: 'rgba(255,255,255,0.02)' }}>
        {project.tags.map((tag) => (
          <Chip key={tag} size="small" label={tag} sx={{ bgcolor: 'rgba(255,255,255,0.04)', color: 'rgba(245,235,221,0.62)' }} />
        ))}
      </Stack>
    </Box>
  );
}

function CarouselCard({ project }: { project: ProjectRecord }) {
  return (
    <Box
      sx={{
        ...panelSx,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '32px',
        minHeight: { xs: 360, md: 420 },
        backgroundImage: project.previewImageSrc ? undefined : project.accent,
      }}
    >
      {project.previewImageSrc ? (
        <Box
          component="img"
          src={project.previewImageSrc}
          alt={project.title}
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : null}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: project.previewImageSrc
            ? 'linear-gradient(180deg, rgba(18,19,21,0.08), rgba(18,19,21,0.14) 36%, rgba(18,19,21,0.92))'
            : 'linear-gradient(180deg, rgba(18,19,21,0.08), rgba(18,19,21,0.18) 36%, rgba(18,19,21,0.94))',
        }}
      />

      {!project.previewImageSrc ? (
        <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: 0.22 }}>
          <Typography sx={{ color: 'white', fontSize: { xs: '4.6rem', md: '6rem' }, fontWeight: 700, letterSpacing: '-0.08em' }}>
            {project.previewLabel ?? project.title.slice(0, 2)}
          </Typography>
        </Box>
      ) : null}

      <Stack spacing={3} sx={{ position: 'relative', zIndex: 1, minHeight: '100%', justifyContent: 'flex-end', p: { xs: 2, md: 2.5 } }}>
        <Box
          sx={{
            maxWidth: { xs: '100%', md: 540 },
            borderRadius: '26px',
            border: '1px solid rgba(255,255,255,0.08)',
            bgcolor: 'rgba(12,13,15,0.66)',
            backdropFilter: 'blur(18px)',
            boxShadow: '0 18px 50px rgba(0,0,0,0.28)',
            p: { xs: 2.25, md: 2.75 },
          }}
        >
          <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip size="small" label={project.category} sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#F5EBDD' }} />
            <Typography sx={{ color: 'rgba(245,235,221,0.64)' }}>{project.status}</Typography>
          </Stack>

          <Typography variant="h2" sx={{ mt: 1.35, fontSize: { xs: '2.1rem', md: '3.2rem' }, color: '#F5EBDD' }}>
            {project.title}
          </Typography>
          <Typography
            sx={{
              mt: 1.1,
              maxWidth: 440,
              color: 'rgba(245,235,221,0.7)',
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
          >
            {project.summary}
          </Typography>

          <Stack direction="row" spacing={1} useFlexGap sx={{ mt: 2.2, flexWrap: 'wrap' }}>
            {project.links.map((link) => (
              <ProjectAction key={link.label} link={link} prominent />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <Box sx={{ ...panelSx, position: 'relative', overflow: 'hidden', borderRadius: '28px', minHeight: 320 }}>
      {item.imageSrc ? (
        <Box component="img" src={item.imageSrc} alt={item.title} sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', p: 3, backgroundImage: item.accent }}>
          <Typography variant="h4" sx={{ color: 'white' }}>
            {item.title}
          </Typography>
        </Box>
      )}

      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(18,19,21,0.06), rgba(18,19,21,0.18) 42%, rgba(18,19,21,0.92))' }} />

      <Stack spacing={0.9} sx={{ position: 'relative', zIndex: 1, minHeight: '100%', justifyContent: 'flex-end', p: 2.5 }}>
        {item.note ? (
          <Chip size="small" label={item.note} sx={{ width: 'fit-content', bgcolor: 'rgba(255,255,255,0.08)', color: '#F5EBDD' }} />
        ) : null}
        <Typography variant="h6" sx={{ color: '#F5EBDD' }}>
          {item.title}
        </Typography>
        <Typography sx={{ color: 'rgba(245,235,221,0.62)' }}>{item.caption}</Typography>
      </Stack>
    </Box>
  );
}

function FeaturePanel({ project }: { project: ProjectRecord }) {
  return (
    <Box sx={{ ...panelSx, borderRadius: '30px', p: { xs: 2.75, md: 3.25 } }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Stack spacing={2.5} sx={{ flex: 1 }}>
          <Box>
            <Chip size="small" label={project.category} sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#F5EBDD' }} />
            <Typography variant="h2" sx={{ mt: 2, fontSize: { xs: '2.2rem', md: '2.9rem' }, color: '#F5EBDD' }}>
              {project.title}
            </Typography>
            <Typography sx={{ mt: 1, color: 'rgba(245,235,221,0.68)', maxWidth: 420 }}>
              {project.summary}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
            {project.links.map((link) => (
              <ProjectAction key={link.label} link={link} prominent />
            ))}
          </Stack>
        </Stack>

        <Box sx={{ flex: { xs: 'none', md: '0 0 180px' }, minHeight: 180, display: 'grid', placeItems: 'center', borderRadius: '28px', backgroundImage: project.accent, boxShadow: '0 18px 42px rgba(0,0,0,0.24)' }}>
          <Typography sx={{ color: 'white', fontSize: '3.2rem', fontWeight: 700, letterSpacing: '-0.06em' }}>
            {project.previewLabel ?? project.title.slice(0, 2)}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

function VideoPanel() {
  return (
    <Box sx={{ ...panelSx, position: 'relative', overflow: 'hidden', borderRadius: '30px', minHeight: 220 }}>
      {projectVideo.posterImageSrc ? (
        <Box component="img" src={projectVideo.posterImageSrc} alt={projectVideo.title} sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }} />
      ) : null}

      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(18,19,21,0.34), rgba(18,19,21,0.94))' }} />

      <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1, minHeight: '100%', justifyContent: 'space-between', p: { xs: 2.75, md: 3.25 } }}>
        <Chip size="small" label={projectVideo.status} sx={{ width: 'fit-content', bgcolor: 'rgba(255,255,255,0.08)', color: '#F5EBDD' }} />

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ color: '#F5EBDD' }}>
            {projectVideo.title}
          </Typography>

          <Box sx={{ display: 'grid', placeItems: 'center', width: 64, height: 64, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', bgcolor: 'rgba(255,255,255,0.06)' }}>
            <PlayCircleOutlineRounded sx={{ color: '#F5EBDD', fontSize: '2rem' }} />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

function CollectionBrowser() {
  const collectionOrder = ['open-source', 'physical-projects', 'game-mods', 'closed-source'];
  const browseCollections = collectionOrder
    .map((collectionId) => projectCollections.find((collection) => collection.id === collectionId))
    .filter((collection): collection is ProjectCollection => Boolean(collection));
  const [activeCollectionId, setActiveCollectionId] = useState(browseCollections[0]?.id ?? 'open-source');
  const activeCollection =
    browseCollections.find((collection) => collection.id === activeCollectionId) ??
    browseCollections[0]!;

  return (
    <Box sx={{ ...panelSx, borderRadius: '30px', p: { xs: 2.75, md: 3.25 } }}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {browseCollections.map((collection) => (
            <PagePill key={collection.id} active={collection.id === activeCollection.id} onClick={() => setActiveCollectionId(collection.id)}>
              {collection.title}
            </PagePill>
          ))}
        </Stack>

        <Stack spacing={1.5}>
          {getProjectsForCollection(activeCollection.id).map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
          {getPlaceholderTitles(activeCollection).map((title) => (
            <PlaceholderCard key={`${activeCollection.id}-${title}`} title={title} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

function CollectionSection({ collection }: { collection: ProjectCollection }) {
  return (
    <Stack spacing={2.25}>
      <Typography variant="h3" sx={{ color: '#F5EBDD' }}>
        {collection.title}
      </Typography>

      <Stack spacing={1.5}>
        {getProjectsForCollection(collection.id).map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}
        {getPlaceholderTitles(collection).map((title) => (
          <PlaceholderCard key={`${collection.id}-${title}`} title={title} />
        ))}
      </Stack>
    </Stack>
  );
}

function HorizontalCarousel<T>({
  title,
  items,
  renderItem,
}: {
  title: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const loopItems = items.length > 1 ? [...items, ...items] : items;

  const scrollTrack = (direction: number) => {
    const node = trackRef.current;
    if (!node) {
      return;
    }

    node.scrollBy({
      left: direction * Math.max(node.clientWidth * 0.78, 320),
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const node = trackRef.current;
    if (!node || items.length < 2 || isPaused) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let frameId = 0;
    let previousTime = window.performance.now();
    const pixelsPerSecond = 28;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - previousTime;
      previousTime = currentTime;
      const resetPoint = node.scrollWidth / 2;

      if (resetPoint > 0) {
        const nextLeft = node.scrollLeft + (elapsed * pixelsPerSecond) / 1000;
        node.scrollLeft = nextLeft >= resetPoint ? nextLeft - resetPoint : nextLeft;
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [isPaused, items.length]);

  return (
    <Stack spacing={2.25}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ color: '#F5EBDD' }}>
          {title}
        </Typography>

        <Stack direction="row" spacing={1}>
          <IconButton aria-label="Scroll left" onClick={() => scrollTrack(-1)} sx={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(245,235,221,0.82)', bgcolor: 'rgba(255,255,255,0.03)' }}>
            <ChevronLeftRounded />
          </IconButton>
          <IconButton aria-label="Scroll right" onClick={() => scrollTrack(1)} sx={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(245,235,221,0.82)', bgcolor: 'rgba(255,255,255,0.03)' }}>
            <ChevronRightRounded />
          </IconButton>
        </Stack>
      </Stack>

      <Box
        ref={trackRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        sx={{
          display: 'flex',
          gap: 2.5,
          overflowX: 'auto',
          pb: 1.25,
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': { height: 8 },
          '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: 999 },
        }}
      >
        {loopItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              flex: '0 0 auto',
              width: {
                xs: '86vw',
                sm: '78vw',
                md: 'min(560px, 46vw)',
                xl: 'min(620px, 36vw)',
              },
            }}
          >
            {renderItem(item)}
          </Box>
        ))}
      </Box>
    </Stack>
  );
}

function OverviewContent() {
  const featuredProjects = projects.filter((project) => project.featured);
  const quoteDump = projects.find((project) => project.id === 'quotedump') ?? featuredProjects[0];

  return (
    <Stack spacing={{ xs: 4, md: 4.5 }}>
      <HorizontalCarousel title="Projects" items={featuredProjects} renderItem={(project) => <CarouselCard project={project} />} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', xl: 'minmax(0,1.02fr) minmax(0,0.98fr)' }, gap: 3 }}>
        <Stack spacing={3}>
          {quoteDump ? <FeaturePanel project={quoteDump} /> : null}
          <VideoPanel />
        </Stack>
        <CollectionBrowser />
      </Box>
    </Stack>
  );
}

function CodeContent() {
  return (
    <Stack spacing={{ xs: 4, md: 4.5 }}>
      {getCollectionsForPage('code').map((collection) => (
        <CollectionSection key={collection.id} collection={collection} />
      ))}
    </Stack>
  );
}

function PhysicalContent() {
  return (
    <Stack spacing={{ xs: 4, md: 4.5 }}>
      <HorizontalCarousel title="Prints" items={galleryItems} renderItem={(item) => <GalleryCard item={item} />} />

      {getCollectionsForPage('physical').map((collection) => (
        <CollectionSection key={collection.id} collection={collection} />
      ))}
    </Stack>
  );
}

function App() {
  const [activePage, setActivePage] = useState<AppPageId>(() =>
    typeof window === 'undefined' ? 'overview' : getPageFromHash(window.location.hash),
  );

  useEffect(() => {
    const handleHashChange = () => setActivePage(getPageFromHash(window.location.hash));
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, '', `#${activePage}`);
  }, [activePage]);

  const navigateToPage = (pageId: AppPageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPage = sitePages.find((page) => page.id === activePage) ?? sitePages[0];

  return (
    <Box sx={{ minHeight: '100vh', color: '#F5EBDD', background: 'radial-gradient(circle at top, rgba(240,179,93,0.16), transparent 28%), radial-gradient(circle at 82% 8%, rgba(111,165,255,0.12), transparent 20%), #121315' }}>
      <Container maxWidth="xl" sx={{ position: 'relative', py: { xs: 2.5, md: 4 } }}>
        <Stack spacing={{ xs: 3.5, md: 4.5 }}>
          <Box component="header" sx={{ ...panelSx, borderRadius: '24px', px: { xs: 2, md: 2.5 }, py: 2 }}>
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2.25} sx={{ alignItems: { xs: 'flex-start', lg: 'center' }, justifyContent: 'space-between' }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Avatar src={brandMedia.avatarCutout} alt="GeddesWorks avatar" sx={{ width: 48, height: 48, bgcolor: 'rgba(255,255,255,0.08)' }} />
                <Typography variant="h6" sx={{ color: '#F5EBDD' }}>
                  GeddesWorks
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                {sitePages.map((page) => (
                  <PagePill key={page.id} active={page.id === activePage} onClick={() => navigateToPage(page.id)}>
                    {page.label}
                  </PagePill>
                ))}
              </Stack>

              <Stack direction="row" spacing={0.6} useFlexGap sx={{ flexWrap: 'wrap' }}>
                {externalLinks.map((link) => (
                  <HeaderLink key={link.label} link={link} />
                ))}
              </Stack>
            </Stack>
          </Box>

          {activePage !== 'overview' ? (
            <Typography variant="h1" sx={{ px: 0.5, fontSize: { xs: '3rem', md: '4.75rem' }, color: '#F5EBDD' }}>
              {currentPage.title}
            </Typography>
          ) : null}

          {activePage === 'overview' ? <OverviewContent /> : null}
          {activePage === 'code' ? <CodeContent /> : null}
          {activePage === 'physical' ? <PhysicalContent /> : null}

          <Box component="footer" sx={{ pb: 0.5 }}>
            <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.08)' }} />
            <Typography sx={{ color: 'rgba(245,235,221,0.44)' }}>GeddesWorks</Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
