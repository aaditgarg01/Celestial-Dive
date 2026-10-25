import { event } from '../config/site';
import { Icon } from '../components/Icon';
import { SectionHeading } from '../components/SectionHeading';
export function About() {
  return (
    <section id="about" className="section about-section reveal" aria-labelledby="about-title">
      <SectionHeading number="01" label="THE GATHERING" id="about-title">
        A little less city.
        <br />
        <em>A little more infinity.</em>
      </SectionHeading>
      <div className="about-grid">
        <p className="lead-copy">
          Some things are better
          <br />
          seen with your own eyes.
        </p>
        <div className="about-copy">
          <p>
            There’s a whole universe above the everyday. Celestial Dive is VIT Stellar’s invitation
            to pause, look up, and get a little closer to it.
          </p>
          <p>
            Our fifth edition brings curious minds together for an evening of stargazing,
            telescope-side discoveries, and conversations that wander well beyond Earth. No
            expertise needed. Just bring your sense of wonder.
          </p>
          <a
            href="https://vitstellar.vercel.app/"
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            Meet VIT Stellar <Icon name="diagonal" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
      <div className="event-details" id="event-details">
        <div className="event-details-title">
          <Icon name="moon" />
          <span className="eyebrow">YOUR NIGHT, AT A GLANCE</span>
          <span className="small-note">The details are taking shape.</span>
        </div>
        <dl>
          <div>
            <dt>WHEN</dt>
            <dd>{event.dates}</dd>
          </div>
          <div>
            <dt>TIME</dt>
            <dd>{event.time}</dd>
          </div>
          <div>
            <dt>WHERE</dt>
            <dd>{event.venue}</dd>
          </div>
          <div className="registration-fact">
            <dt>YOUR PLACE UNDER THE STARS</dt>
            <dd>
              {event.registrationUrl ? (
                <a href={event.registrationUrl} target="_blank" rel="noreferrer">
                  Register now <Icon name="diagonal" />
                </a>
              ) : (
                <>
                  <span className="status-dot" />
                  {event.registrationLabel}
                </>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
