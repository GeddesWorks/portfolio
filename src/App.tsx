import {
  brandMedia,
  colophon,
  elsewhere,
  heroPhoto,
  intro,
  masthead,
  now,
  offline,
  shelves,
  type Entry,
  type Photo,
  type ProseSection,
  type Shelf,
} from './data/siteContent.ts';

/**
 * Photos that don't exist yet show their brief while `npm run dev` is running and
 * disappear entirely from a build — so the shot list sits next to the layout it
 * describes without ever becoming an "Open slot" on the live site.
 */
const SHOW_SHOT_NOTES = import.meta.env.DEV;

/**
 * Small deterministic hash so the "hand placed" details — photo rotations, rule
 * wobble — stay put between renders instead of jittering on every paint.
 */
function seedFrom(key: string) {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Deterministic float in [min, max) derived from a key and a salt. */
function jitter(key: string, salt: number, min: number, max: number) {
  const seed = seedFrom(`${key}:${salt}`);
  return min + ((seed % 1000) / 1000) * (max - min);
}

/**
 * A ruled line that isn't quite straight and doesn't quite start where the last
 * one did. Stretched across ~1000px the wobble is almost subliminal, so the tell
 * is the ragged ends — the same thing that gives away a line drawn against a
 * straightedge rather than one produced by `border-bottom: 1px solid`.
 */
function Rule({ seed }: { seed: string }) {
  const mid = 4.5;
  const wobble = 2.6;

  const start = jitter(seed, 90, 0, 2.2);
  const end = 100 - jitter(seed, 91, 0, 3.4);
  const span = end - start;

  const points = [0, 1, 2, 3, 4].map((i) => ({
    x: start + (span * i) / 4,
    y: mid + jitter(seed, i, -wobble, wobble),
  }));

  const d = points
    .map((point, i) =>
      i === 0
        ? `M ${point.x} ${point.y}`
        : `Q ${(points[i - 1].x + point.x) / 2} ${mid + jitter(seed, i + 10, -wobble, wobble)} ${point.x} ${point.y}`,
    )
    .join(' ');

  return (
    <svg className="rule" viewBox="0 0 100 9" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function visiblePhotos(photos: Photo[] = []) {
  return photos.filter((photo) => photo.src || (SHOW_SHOT_NOTES && photo.shotNote));
}

function PhotoFrame({ photo }: { photo: Photo }) {
  // Tilt the photo, not the figure — otherwise the caption tips over with it.
  const tilt = `rotate(${jitter(photo.id, 1, -2.2, 2.2).toFixed(2)}deg)`;

  return (
    <figure>
      {photo.src ? (
        <img
          src={photo.src}
          alt={photo.alt}
          style={{ transform: tilt, objectPosition: photo.focus }}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="shot-note" style={{ transform: tilt }}>
          <span className="mono">Shot list</span>
          <p>{photo.shotNote}</p>
        </div>
      )}

      {photo.src && photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
    </figure>
  );
}

function PhotoStrip({ photos }: { photos?: Photo[] }) {
  const shown = visiblePhotos(photos);
  if (shown.length === 0) {
    return null;
  }

  return (
    <div className="strip-wrap">
      <div className="strip">
        {shown.map((photo) => (
          <PhotoFrame key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}

function HeroPhoto() {
  if (!heroPhoto.src) {
    return SHOW_SHOT_NOTES ? (
      <div className="hero shot-note">
        <span className="mono">Shot list — hero</span>
        <p>{heroPhoto.shotNote}</p>
      </div>
    ) : null;
  }

  return (
    <figure className="hero">
      <img
        src={heroPhoto.src}
        alt={heroPhoto.alt}
        style={heroPhoto.focus ? { objectPosition: heroPhoto.focus } : undefined}
        decoding="async"
      />
      {heroPhoto.caption ? <figcaption>{heroPhoto.caption}</figcaption> : null}
    </figure>
  );
}

function EntryRow({ entry }: { entry: Entry }) {
  return (
    <div className="entry">
      <div className="entry-head">
        <h3>{entry.name}</h3>
        {entry.meta ? <span className="mono">{entry.meta}</span> : null}
      </div>

      <p className="entry-blurb">{entry.blurb}</p>

      <div className="entry-links">
        {entry.links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function ShelfSection({ shelf }: { shelf: Shelf }) {
  return (
    <section className="shelf" id={shelf.id}>
      <h2>{shelf.title}</h2>

      {shelf.entries.map((entry, index) => (
        <div key={entry.id}>
          <Rule seed={`${shelf.id}-${index}`} />
          <EntryRow entry={entry} />
        </div>
      ))}

      <Rule seed={`${shelf.id}-end`} />
      <PhotoStrip photos={shelf.photos} />
    </section>
  );
}

function ProseShelf({ section }: { section: ProseSection }) {
  return (
    <section className="shelf prose-shelf" id={section.id}>
      <h2>{section.title}</h2>
      <Rule seed={`${section.id}-0`} />

      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <PhotoStrip photos={section.photos} />
    </section>
  );
}

function App() {
  return (
    <>
      <div className="grain" />

      <main className="page">
        <header className="masthead">
          {brandMedia.mark ? (
            <span className="mark">
              <img src={brandMedia.mark} alt="" />
            </span>
          ) : null}

          <div>
            <h1 className="wordmark">{masthead.wordmark}</h1>
            <span className="mono">
              {masthead.name} — {masthead.strapline}
            </span>
          </div>
        </header>

        <div className="intro">
          {intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <HeroPhoto />

        <aside className="now">
          <span className="mono">Right now — {now.updated}</span>
          <ul>
            {now.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </aside>

        <nav aria-label="Sections">
          <ul className="jump">
            {[...shelves, offline].map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.short}</a>
              </li>
            ))}
          </ul>
        </nav>

        {shelves.map((shelf) => (
          <ShelfSection key={shelf.id} shelf={shelf} />
        ))}

        <ProseShelf section={offline} />

        <section className="elsewhere">
          <span className="mono">Elsewhere</span>
          <p>
            Find me on{' '}
            {elsewhere.map((link, index) => (
              <span key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
                {index === elsewhere.length - 2
                  ? ', and '
                  : index < elsewhere.length - 1
                    ? ', '
                    : '.'}
              </span>
            ))}
          </p>
        </section>

        <footer className="colophon">
          <Rule seed="colophon" />
          <p>{colophon}</p>
        </footer>
      </main>
    </>
  );
}

export default App;
