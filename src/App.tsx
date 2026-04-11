import {
  ArrowOutwardRounded,
  AutoAwesomeRounded,
  GitHub,
  LinkedIn,
  OpenInNewRounded,
  RocketLaunchRounded,
  StorefrontRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import {
  heroStats,
  operatingAreas,
  projectEntries,
  socialLinks,
  spotlightProjects,
  type ProjectEntry,
} from './data/siteContent.ts';

const sectionEyebrowSx = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  px: 1.5,
  py: 0.75,
  borderRadius: 999,
  bgcolor: 'rgba(255,255,255,0.72)',
  color: 'text.secondary',
  fontSize: '0.78rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

function ProjectCard({
  project,
  compact = false,
}: {
  project: ProjectEntry;
  compact?: boolean;
}) {
  return (
    <Card
      className="group h-full overflow-hidden border border-white/60 bg-white/75 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
      sx={{ height: '100%' }}
    >
      <Box className={`h-1.5 bg-gradient-to-r ${project.accent}`} />
      <CardContent
        sx={{
          p: compact ? 3 : 3.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          height: '100%',
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Chip
            size="small"
            label={project.category}
            sx={{ bgcolor: 'rgba(22, 93, 255, 0.10)', color: 'primary.main' }}
          />
          <Typography variant="body2" color="text.secondary">
            {project.status}
          </Typography>
        </Stack>

        <Box>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {project.title}
          </Typography>
          <Typography color="text.secondary">{project.description}</Typography>
        </Box>

        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {project.stack.map((item) => (
            <Chip key={item} size="small" variant="outlined" label={item} />
          ))}
        </Stack>

        <Stack direction="row" spacing={1.5} useFlexGap sx={{ mt: 'auto', flexWrap: 'wrap' }}>
          {project.links.map((link) => (
            <Button
              key={link.href}
              component="a"
              href={link.href}
              target={link.href.startsWith('/') ? undefined : '_blank'}
              rel={link.href.startsWith('/') ? undefined : 'noreferrer'}
              endIcon={<ArrowOutwardRounded />}
              variant={link.label.toLowerCase().includes('repo') ? 'text' : 'contained'}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function App() {
  return (
    <Box className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),_rgba(246,243,236,0.98)_42%,_#efe8da_100%)] text-slate-900">
      <Box className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_15%_10%,rgba(255,122,89,0.26),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(22,93,255,0.22),transparent_24%),radial-gradient(circle_at_50%_55%,rgba(255,214,10,0.16),transparent_30%)]" />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 3, md: 5 } }}>
        <Stack spacing={{ xs: 6, md: 9 }}>
          <Box
            component="header"
            className="rounded-[2rem] border border-white/60 bg-white/65 px-5 py-4 shadow-[0_18px_70px_rgba(18,32,51,0.08)] backdrop-blur-md md:px-7"
          >
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              sx={{ alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between' }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Avatar
                  src="/media/avatar-cutout.png"
                  alt="GeddesWorks avatar"
                  sx={{ width: 52, height: 52, bgcolor: 'white' }}
                />
                <Box>
                  <Typography variant="h6" sx={{ lineHeight: 1.05 }}>
                    GeddesWorks
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Project hub for products, experiments, and maker work
                  </Typography>
                </Box>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button
                  component="a"
                  href="https://github.com/GeddesWorks"
                  target="_blank"
                  rel="noreferrer"
                  variant="text"
                  startIcon={<GitHub />}
                >
                  GitHub
                </Button>
                <Button
                  component="a"
                  href="https://www.linkedin.com/in/collingeddes"
                  target="_blank"
                  rel="noreferrer"
                  variant="text"
                  startIcon={<LinkedIn />}
                >
                  LinkedIn
                </Button>
                <Button
                  component="a"
                  href="https://3dshop.geddesworks.com"
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  startIcon={<StorefrontRounded />}
                >
                  Visit shop
                </Button>
              </Stack>
            </Stack>
          </Box>

          <Box
            component="section"
            className="rounded-[2.5rem] border border-white/60 bg-white/70 px-5 py-6 shadow-[0_28px_90px_rgba(18,32,51,0.10)] backdrop-blur-md md:px-8 md:py-8"
          >
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={{ xs: 5, md: 7 }}>
              <Stack spacing={3} sx={{ flex: 1.2 }}>
                <Box sx={sectionEyebrowSx}>
                  <AutoAwesomeRounded sx={{ fontSize: 18 }} />
                  New direction
                </Box>

                <Box>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '3rem', md: '5.2rem' },
                      lineHeight: { xs: 0.98, md: 0.9 },
                      maxWidth: '9.5ch',
                    }}
                  >
                    A better home for everything I&apos;m building.
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2.5,
                      fontSize: { xs: '1rem', md: '1.18rem' },
                      color: 'text.secondary',
                      maxWidth: 760,
                    }}
                  >
                    This site used to be a student portfolio. Now it&apos;s a cleaner, broader hub
                    for live products, open-source work, maker projects, and the business side of
                    GeddesWorks.
                  </Typography>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <Button
                    component="a"
                    href="#projects"
                    size="large"
                    variant="contained"
                    endIcon={<RocketLaunchRounded />}
                  >
                    Browse projects
                  </Button>
                  <Button
                    component="a"
                    href="/media/resume.pdf"
                    size="large"
                    variant="outlined"
                    endIcon={<OpenInNewRounded />}
                  >
                    Open resume archive
                  </Button>
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  {heroStats.map((stat) => (
                    <Box
                      key={stat.label}
                      className="min-w-[12rem] flex-1 rounded-[1.75rem] border border-white/70 bg-[#fffaf2] px-4 py-4"
                    >
                      <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.6rem' } }}>
                        {stat.value}
                      </Typography>
                      <Typography color="text.secondary">{stat.label}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>

              <Stack spacing={2.5} sx={{ flex: 0.9 }}>
                <Box className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[#10233f] p-5 text-white shadow-[0_30px_80px_rgba(16,35,63,0.24)]">
                  <Box className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,184,76,0.34),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(91,141,239,0.40),transparent_32%)]" />
                  <Stack spacing={3} sx={{ position: 'relative' }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Chip
                        label="Hub snapshot"
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.14)',
                          color: 'white',
                          backdropFilter: 'blur(12px)',
                        }}
                      />
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.72)' }}>
                        Rebuilt in React + TypeScript
                      </Typography>
                    </Stack>

                    <Box
                      component="img"
                      src="/media/studio-shot.jpeg"
                      alt="GeddesWorks studio visual"
                      className="h-64 w-full rounded-[1.5rem] object-cover"
                    />

                    <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
                      <Chip label="Projects" sx={{ bgcolor: 'rgba(255,255,255,0.10)', color: 'white' }} />
                      <Chip label="Products" sx={{ bgcolor: 'rgba(255,255,255,0.10)', color: 'white' }} />
                      <Chip label="Maker Work" sx={{ bgcolor: 'rgba(255,255,255,0.10)', color: 'white' }} />
                    </Stack>

                    <Box className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.72)' }}>
                        Carrying over one piece of the original maker identity
                      </Typography>
                      <Box
                        component="img"
                        src="/media/authorized-seller-badge.png"
                        alt="Authorized seller badge"
                        className="mt-3 h-12 w-auto object-contain"
                      />
                    </Box>
                  </Stack>
                </Box>

                <Box className="rounded-[2rem] border border-dashed border-slate-300/80 bg-white/60 p-5">
                  <Typography variant="h6">Why the rewrite?</Typography>
                  <Typography sx={{ mt: 1.5, color: 'text.secondary' }}>
                    The old site was focused on selling you as a portfolio candidate. The new one
                    is built to connect people with the actual things you ship.
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          <Box component="section">
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3, justifyContent: 'space-between' }}>
              <Box>
                <Box sx={sectionEyebrowSx}>Spotlight</Box>
                <Typography variant="h2" sx={{ mt: 2, fontSize: { xs: '2.2rem', md: '3rem' } }}>
                  The main surfaces worth opening first
                </Typography>
              </Box>
              <Typography sx={{ maxWidth: 480, alignSelf: 'end', color: 'text.secondary' }}>
                A mix of the business-facing work, the new hub direction, and the newer public web
                experiments already sitting in your ecosystem.
              </Typography>
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(3, minmax(0, 1fr))',
                },
                gap: 3,
              }}
            >
              {spotlightProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </Box>
          </Box>

          <Box
            id="projects"
            component="section"
            className="rounded-[2.5rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,248,236,0.92))] px-5 py-6 shadow-[0_22px_80px_rgba(18,32,51,0.08)] backdrop-blur-sm md:px-8"
          >
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={{ xs: 5, lg: 6 }}>
              <Stack spacing={3} sx={{ width: { xs: '100%', lg: 320 }, flexShrink: 0 }}>
                <Box sx={sectionEyebrowSx}>Project Index</Box>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3rem' } }}>
                  A project hub, not a personal brochure
                </Typography>
                <Typography color="text.secondary">
                  The content model is set up so you can keep adding newer sites, open-source apps,
                  and commercial work without rethinking the layout every time.
                </Typography>

                <Stack spacing={1.5}>
                  {operatingAreas.map((area) => (
                    <Box
                      key={area.title}
                      className="rounded-[1.5rem] border border-white/70 bg-white/80 px-4 py-4"
                    >
                      <Typography variant="h6" sx={{ mb: 0.5 }}>
                        {area.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {area.description}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: 'repeat(2, minmax(0, 1fr))',
                  },
                  gap: 3,
                  flex: 1,
                }}
              >
                {projectEntries.map((project) => (
                  <ProjectCard key={project.title} project={project} compact />
                ))}
              </Box>
            </Stack>
          </Box>

          <Box
            component="section"
            className="rounded-[2.5rem] border border-[#d2d9e6] bg-[#122033] px-5 py-6 text-white shadow-[0_28px_90px_rgba(18,32,51,0.22)] md:px-8"
          >
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={{ xs: 4, lg: 6 }}>
              <Stack spacing={3} sx={{ flex: 1 }}>
                <Box
                  sx={{
                    ...sectionEyebrowSx,
                    bgcolor: 'rgba(255,255,255,0.10)',
                    color: 'rgba(255,255,255,0.92)',
                  }}
                >
                  Network
                </Box>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.1rem', md: '2.8rem' } }}>
                  The wider GeddesWorks orbit
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.72)', maxWidth: 680 }}>
                  Not every project needs the same treatment. Some are products, some are repos,
                  some are storefront channels, and some are just places where the work keeps
                  circulating.
                </Typography>

                <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  <Button
                    component="a"
                    href="https://www.geddesworks.com"
                    target="_blank"
                    rel="noreferrer"
                    variant="contained"
                    color="secondary"
                  >
                    Open main site
                  </Button>
                  <Button
                    component="a"
                    href="https://github.com/GeddesWorks"
                    target="_blank"
                    rel="noreferrer"
                    variant="outlined"
                    sx={{ borderColor: 'rgba(255,255,255,0.22)', color: 'white' }}
                  >
                    View repos
                  </Button>
                </Stack>
              </Stack>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                  gap: 2,
                  flex: 1,
                }}
              >
                {socialLinks.map((link) => (
                  <Box
                    key={link.label}
                    component="a"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 px-4 py-4 no-underline transition-colors duration-300 hover:bg-white/10"
                  >
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      {link.label}
                    </Typography>
                    <Typography sx={{ mt: 0.75, color: 'rgba(255,255,255,0.66)' }}>
                      {link.blurb}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Box>

          <Box component="footer" sx={{ pb: 1 }}>
            <Divider sx={{ mb: 3, borderColor: 'rgba(18,32,51,0.10)' }} />
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' } }}
            >
              <Typography color="text.secondary">
                Rebuilt as a hub for live work, open projects, and commercial surfaces.
              </Typography>
              <Typography color="text.secondary">
                Project content lives in <code>src/data/siteContent.ts</code> for easy updates.
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
