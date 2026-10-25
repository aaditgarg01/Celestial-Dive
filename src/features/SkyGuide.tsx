import { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';
import { usePointerLight } from '../hooks/usePointerLight';
// A deliberately simplified outline, not celestial coordinates or visibility predictions.
const stars = [
  {
    name: 'Betelgeuse',
    x: 32,
    y: 22,
    detail:
      'A prominent star at one of Orion’s shoulders. Start here, then trace your way down to the belt.',
    warm: true,
  },
  {
    name: 'Bellatrix',
    x: 65,
    y: 28,
    detail:
      'The other shoulder in this outline. Together, the two shoulders frame the top of the familiar figure.',
  },
  {
    name: 'Alnitak',
    x: 42,
    y: 49,
    detail:
      'One of the three stars in Orion’s belt. Follow the short line across the middle of the figure.',
  },
  {
    name: 'Alnilam',
    x: 51,
    y: 46,
    detail:
      'The middle star in the belt. Three points of light, one of the sky’s most familiar patterns.',
  },
  {
    name: 'Mintaka',
    x: 60,
    y: 43,
    detail:
      'The third star along the belt. Notice how these three stars form a small line within the wider constellation.',
  },
  {
    name: 'Saiph',
    x: 37,
    y: 77,
    detail:
      'One of the stars at Orion’s feet. It anchors the lower-left corner in this simplified view.',
  },
  {
    name: 'Rigel',
    x: 73,
    y: 73,
    detail:
      'A bright star at one of Orion’s feet. Together with Betelgeuse, it is a prominent landmark in this constellation.',
  },
];
export function SkyGuide() {
  const [selected, setSelected] = useState(0);
  const [lines, setLines] = useState(true);
  const ref = usePointerLight<HTMLDivElement>();
  return (
    <section id="sky-guide" className="sky-section reveal" aria-labelledby="sky-title">
      <div className="section sky-inner">
        <SectionHeading number="03" label="A LITTLE SKY CURIOSITY" id="sky-title">
          There’s a story
          <br />
          <em>in every constellation.</em>
        </SectionHeading>
        <div className="sky-layout">
          <div className="sky-copy">
            <p className="eyebrow amber">THE HUNTER / ORION</p>
            <p className="section-copy">
              A few bright points. A familiar pattern. Start with Orion and discover how a
              constellation comes together.
            </p>
            <div className="star-insight" aria-live="polite" aria-atomic="true">
              <span className="eyebrow">IN THE SPOTLIGHT</span>
              <h3>{stars[selected].name}</h3>
              <p>{stars[selected].detail}</p>
            </div>
            <div className="sky-controls">
              <button
                className="outline-button"
                onClick={() => setLines(!lines)}
                aria-pressed={lines}
              >
                <Icon name="spark" />
                {lines ? 'Hide connections' : 'Connect the stars'}
              </button>
              <p>
                Tap a star to explore.
                <br />
                Keyboard explorers: use Tab and Enter.
              </p>
            </div>
            <a
              className="sky-source"
              href="https://science.nasa.gov/asset/hubble/orion-constellation/"
              target="_blank"
              rel="noreferrer"
            >
              More about Orion · NASA <Icon name="diagonal" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="star-map pointer-light" ref={ref}>
            <div className="map-top">
              <span>THE CELESTIAL ATLAS</span>
              <span>PLATE / 001</span>
            </div>
            <div className="map-field">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <pattern id="sky-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path
                      d="M10 0H0V10"
                      fill="none"
                      stroke="#a2b7c5"
                      strokeOpacity=".08"
                      strokeWidth=".15"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#sky-grid)" />
                <g fill="#d0dce4" opacity=".45">
                  {Array.from({ length: 40 }, (_, i) => (
                    <circle
                      key={i}
                      cx={(i * 37 + 6) % 100}
                      cy={(i * 53 + 4) % 100}
                      r={i % 4 === 0 ? 0.22 : 0.12}
                    />
                  ))}
                </g>
                <g
                  className={`constellation-lines${lines ? '' : ' lines-hidden'}`}
                  stroke="#cfb18b"
                  strokeWidth=".18"
                  fill="none"
                >
                  <path d="M32 22 65 28 60 43 73 73 37 77 42 49 32 22M42 49 51 46 60 43" />
                </g>
                <ellipse
                  cx="52"
                  cy="49"
                  rx="40"
                  ry="36"
                  fill="none"
                  stroke="#a2b7c5"
                  strokeOpacity=".12"
                  strokeWidth=".15"
                  strokeDasharray=".5 2"
                />
              </svg>
              {stars.map((star, i) => (
                <button
                  className={`map-star${selected === i ? ' is-selected' : ''}${star.warm ? ' warm-star' : ''}`}
                  style={{ left: `${star.x}%`, top: `${star.y}%` }}
                  onClick={() => setSelected(i)}
                  key={star.name}
                  aria-label={`Explore ${star.name}`}
                  aria-pressed={selected === i}
                >
                  <span className="star-core" />
                  <span className="star-label">{star.name}</span>
                </button>
              ))}
            </div>
            <div className="map-bottom">
              <span>
                <Icon name="spark" />
                SEVEN STARS. ONE FIRST DISCOVERY.
              </span>
              <span>ORION</span>
            </div>
          </div>
        </div>
        <p className="map-disclaimer">
          Illustrative guide, not a live sky map. Positions are simplified; visibility depends on
          the observing date, location, and conditions.
        </p>
      </div>
    </section>
  );
}
