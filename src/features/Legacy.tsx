import { useRef, useState } from 'react';
import { editions } from '../config/content';
import { SectionHeading } from '../components/SectionHeading';
import { Icon, StarMark } from '../components/Icon';
export function Legacy() {
  const [selected, setSelected] = useState(4);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const edition = editions[selected];
  const select = (i: number) => {
    setSelected(i);
    tabs.current[i]?.focus();
  };
  return (
    <section id="legacy" className="section legacy-section reveal" aria-labelledby="legacy-title">
      <SectionHeading number="04" label="NIGHTS THAT BROUGHT US HERE" id="legacy-title">
        One sky.
        <br />
        <em>So many stories.</em>
      </SectionHeading>
      <div className="legacy-top">
        <p className="section-copy">
          The people, the discoveries, and the moments between them. A growing archive of Celestial
          Dive, edition by edition.
        </p>
        <span className="eyebrow">THE CELESTIAL CHRONICLES</span>
      </div>
      <div className="edition-tabs" role="tablist" aria-label="Celestial Dive editions">
        {editions.map((e, i) => (
          <button
            ref={(el) => {
              tabs.current[i] = el;
            }}
            key={e.edition}
            role="tab"
            id={`edition-${i}`}
            aria-selected={i === selected}
            aria-controls="edition-panel"
            tabIndex={i === selected ? 0 : -1}
            onClick={() => setSelected(i)}
            onKeyDown={(e) => {
              let next: number | undefined;
              if (e.key === 'ArrowRight') next = (selected + 1) % editions.length;
              if (e.key === 'ArrowLeft') next = (selected + editions.length - 1) % editions.length;
              if (e.key === 'Home') next = 0;
              if (e.key === 'End') next = editions.length - 1;
              if (next !== undefined) {
                e.preventDefault();
                select(next);
              }
            }}
          >
            <span className="edition-node" />
            <span>{e.edition}</span>
            <small>{i === 4 ? 'THE NEXT CHAPTER' : `CHAPTER 0${i + 1}`}</small>
          </button>
        ))}
      </div>
      <div
        id="edition-panel"
        className="edition-panel"
        role="tabpanel"
        aria-labelledby={`edition-${selected}`}
        key={selected}
      >
        <div className="edition-art" aria-hidden="true">
          <div className="edition-orbit" />
          <StarMark />
          <span>{String(selected + 1).padStart(2, '0')}</span>
          <small>CELESTIAL DIVE</small>
        </div>
        <div className="edition-story">
          <p className="eyebrow amber">
            CELESTIAL DIVE {edition.edition}
            <span className="tag">{edition.status}</span>
          </p>
          <h3>{edition.title}</h3>
          <p>{edition.description}</p>
          <div className="poc-slot">
            <Icon name="spark" />
            <span>
              <span className="eyebrow">THE PEOPLE BEHIND THE NIGHT</span>
              {edition.pocName ? (
                edition.pocUrl ? (
                  <a href={edition.pocUrl} target="_blank" rel="noreferrer">
                    {edition.pocName} ↗
                  </a>
                ) : (
                  edition.pocName
                )
              ) : (
                'Team and POC details coming soon.'
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
