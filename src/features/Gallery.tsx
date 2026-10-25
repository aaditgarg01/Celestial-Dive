import { useEffect, useMemo, useRef, useState } from 'react';
import type { Photo } from '../config/content';
import { photos } from '../config/content';
import { SectionHeading } from '../components/SectionHeading';
import { Icon, StarMark } from '../components/Icon';
export function Gallery({ items = photos }: { items?: Photo[] }) {
  const [edition, setEdition] = useState('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const [failed, setFailed] = useState(new Set<string>());
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered = useMemo(
    () => items.filter((p) => edition === 'all' || p.edition === edition),
    [items, edition],
  );
  const index = filtered.findIndex((p) => p.id === openId);
  const current = filtered[index];
  const change = (amount: number) =>
    setOpenId(filtered[(index + amount + filtered.length) % filtered.length]?.id ?? null);
  useEffect(() => {
    if (!current) return;
    dialog.current?.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = before;
    };
  }, [Boolean(current)]);
  const close = () => {
    dialog.current?.close();
    setOpenId(null);
  };
  const error = (id: string) => setFailed((prev) => new Set([...prev, id]));
  return (
    <section
      id="glimpses"
      className="section gallery-section reveal"
      aria-labelledby="glimpses-title"
    >
      <div className="gallery-heading">
        <SectionHeading number="05" label="LITTLE MOMENTS, BIG UNIVERSE" id="glimpses-title">
          Wish you were
          <br />
          <em>under this sky.</em>
        </SectionHeading>
        <p className="section-copy">
          A collection of nights that made us stop, look up, and forget about the time.
        </p>
      </div>
      {items.length > 0 ? (
        <>
          <div className="photo-filters" aria-label="Filter photographs">
            {['all', ...new Set(items.map((p) => p.edition))].map((v) => (
              <button
                className="outline-button"
                key={v}
                aria-pressed={edition === v}
                onClick={() => setEdition(v)}
              >
                {v === 'all' ? 'All editions' : `Edition ${v}`}
              </button>
            ))}
          </div>
          <div className="photo-grid">
            {filtered.map((p) => (
              <button
                key={p.id}
                className="photo-card"
                onClick={() => setOpenId(p.id)}
                aria-label={`View ${p.caption}`}
              >
                <div>
                  {failed.has(p.id) ? (
                    <span className="photo-unavailable">Photograph unavailable</span>
                  ) : (
                    <img
                      src={p.src}
                      alt={p.alt}
                      width={p.width}
                      height={p.height}
                      loading="lazy"
                      onError={() => error(p.id)}
                    />
                  )}
                </div>
                <span>
                  {p.caption}
                  <Icon name="diagonal" />
                </span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            className="gallery-placeholders"
            aria-label="Gallery preview artwork; event photographs coming soon"
          >
            <div className="gallery-scene scene-stars" aria-hidden="true">
              <div className="scene-constellation">
                <svg viewBox="0 0 200 180">
                  <path
                    d="M35 30 150 55 110 100 160 150 55 145 75 90 35 30M75 90 110 100"
                    fill="none"
                    stroke="#d2b18c"
                    strokeWidth=".7"
                  />
                  {[
                    [35, 30],
                    [150, 55],
                    [110, 100],
                    [160, 150],
                    [55, 145],
                    [75, 90],
                  ].map(([x, y]) => (
                    <circle key={x} cx={x} cy={y} r="2" fill="#eddbbf" />
                  ))}
                </svg>
              </div>
              <span>THE VIEW ABOVE</span>
            </div>
            <div className="gallery-scene scene-moon" aria-hidden="true">
              <div className="moon-art" />
              <span>A CLOSER LOOK</span>
            </div>
            <div className="gallery-scene scene-together" aria-hidden="true">
              <div className="scene-orbits">
                <StarMark />
              </div>
              <span>THE MOMENTS BETWEEN</span>
            </div>
          </div>
          <div className="gallery-pending">
            <span className="eyebrow">
              <span className="status-dot" />
              THE PHOTO ARCHIVE IS COMING TOGETHER
            </span>
            <p>Real event photographs will appear here. For now, a little night-sky inspiration.</p>
          </div>
        </>
      )}
      {current && (
        <dialog
          ref={dialog}
          className="lightbox"
          aria-label="Photograph viewer"
          onCancel={(e) => {
            e.preventDefault();
            close();
          }}
          onClick={(e) => {
            if (e.target === dialog.current) close();
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              change(1);
            }
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              change(-1);
            }
          }}
        >
          <div className="lightbox-inner">
            <button className="icon-button" aria-label="Close photograph" onClick={close}>
              <Icon name="close" />
            </button>
            <div className="lightbox-image">
              {failed.has(current.id) ? (
                <p role="status">This photograph could not be loaded.</p>
              ) : (
                <img src={current.src} alt={current.alt} onError={() => error(current.id)} />
              )}
            </div>
            <div className="lightbox-caption">
              <button
                className="icon-button"
                aria-label="Previous photograph"
                onClick={() => change(-1)}
                disabled={filtered.length < 2}
              >
                ←
              </button>
              <p>
                {current.caption}
                <span>
                  {index + 1} / {filtered.length}
                </span>
              </p>
              <button
                className="icon-button"
                aria-label="Next photograph"
                onClick={() => change(1)}
                disabled={filtered.length < 2}
              >
                →
              </button>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}
