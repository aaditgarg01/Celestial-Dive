import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';
import { usePointerLight } from '../hooks/usePointerLight';
const moments = [
  {
    number: '01',
    title: 'Meet the night sky.',
    copy: 'Connect the dots, trace familiar shapes, and find your way around a sky that suddenly feels a little less distant.',
    icon: 'spark',
  },
  {
    number: '02',
    title: 'Look a little closer.',
    copy: 'Step up to the eyepiece. Telescope-led observing brings a different perspective to the objects we usually see as points of light.',
    icon: 'telescope',
  },
  {
    number: '03',
    title: 'Stay for the wonder.',
    copy: 'Bring your questions, swap stories, and share the small, unforgettable moment of discovering something together.',
    icon: 'moon',
  },
] as const;
export function Experience() {
  const ref = usePointerLight<HTMLDivElement>();
  return (
    <section
      id="experience"
      className="section experience-section reveal"
      aria-labelledby="experience-title"
    >
      <SectionHeading number="02" label="THE EXPERIENCE" id="experience-title">
        Make room for
        <br />
        <em>the extraordinary.</em>
      </SectionHeading>
      <div className="experience-layout">
        <div className="telescope-card pointer-light" ref={ref}>
          <div className="diagram-meta">
            <span>OBSERVER’S FIELD NOTES</span>
            <span>CD / 05</span>
          </div>
          <svg
            className="telescope-diagram"
            viewBox="0 0 540 440"
            role="img"
            aria-label="Illustrated telescope pointed at a star field"
          >
            <defs>
              <radialGradient id="lens">
                <stop stopColor="#9bbbd1" stopOpacity=".35" />
                <stop offset="1" stopColor="#9bbbd1" stopOpacity="0" />
              </radialGradient>
            </defs>
            <g fill="none" stroke="#9bbbd1" strokeOpacity=".17">
              <circle cx="275" cy="205" r="140" />
              <circle cx="275" cy="205" r="105" strokeDasharray="2 8" />
              <path d="M30 205H510M275 25V400" strokeDasharray="2 8" />
            </g>
            <circle cx="375" cy="94" r="65" fill="url(#lens)" />
            <g fill="#ddbd92">
              <circle cx="375" cy="94" r="3" />
              <circle cx="418" cy="140" r="1.5" />
              <circle cx="130" cy="87" r="1.8" />
              <circle cx="90" cy="187" r="1.2" />
              <circle cx="422" cy="250" r="1.4" />
            </g>
            <g className="telescope-body" stroke="#c7d5dc" strokeWidth="1.4" fill="none">
              <path d="m162 203 151-94 37 61-151 94-37-61Z" fill="#19303b" />
              <path d="m303 115 11-7 38 61-11 7-38-61ZM177 196l35 61M169 213l-22 13 18 29 22-13M239 241v45M225 286h31M241 286l-75 112M241 286l74 112M241 286v112" />
              <ellipse
                cx="332"
                cy="139"
                rx="10"
                ry="35"
                transform="rotate(-32 332 139)"
                fill="#101d27"
              />
              <path d="m351 110 18-12" stroke="#dfbc8c" strokeDasharray="3 4" />
            </g>
            <g stroke="#dfbc8c" strokeWidth=".7" fill="none">
              <path d="M365 94h20M375 84v20M125 87h10M130 82v10M94 308h90M354 305h90" />
            </g>
            <g fill="#8da5b6" fontSize="9" fontFamily="monospace" letterSpacing="2">
              <text x="53" y="326">
                CURIOSITY
              </text>
              <text x="356" y="326">
                PERSPECTIVE
              </text>
              <text x="385" y="77">
                LOOK UP
              </text>
            </g>
          </svg>
          <div className="diagram-caption">
            <span className="status-dot" />A NEW WAY TO SEE THE FAMILIAR<span>↗</span>
          </div>
        </div>
        <div className="experience-moments">
          {moments.map((m) => (
            <article key={m.number}>
              <div className="moment-top">
                <span className="eyebrow">{m.number} / THE DISCOVERY</span>
                <Icon name={m.icon} />
              </div>
              <h3>{m.title}</h3>
              <p>{m.copy}</p>
            </article>
          ))}
        </div>
      </div>
      <p className="observing-note">
        <Icon name="star" />
        What we observe will depend on the date, weather, and sky conditions. The final observing
        plan will be shared with event details.
      </p>
    </section>
  );
}
