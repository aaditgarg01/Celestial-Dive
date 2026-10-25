import { event } from '../config/site';
import { Icon, StarMark } from '../components/Icon';
export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-image" aria-hidden="true">
        <img
          src="/assets/stargazing-night.webp"
          width="1672"
          height="941"
          fetchPriority="high"
          alt=""
        />
      </div>
      <div className="hero-coordinate" aria-hidden="true">
        <span>NIGHT FIELD NOTES</span>
        <span>VOLUME 05 · VIT STELLAR</span>
      </div>
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">
          <span className="status-dot" />
          VIT STELLAR’S STARGAZING EXPERIENCE
        </p>
        <h1 id="hero-title">
          The sky is calling.
          <br />
          <em>Dive a little deeper.</em>
        </h1>
        <div className="hero-description">
          <StarMark />
          <p>
            Trade the everyday for a night of wonder.
            <br />
            Celestial Dive 5.0. You, us, and the universe.
          </p>
        </div>
        <div className="hero-actions">
          <a href="#experience" className="button button-light">
            Explore the experience <Icon name="diagonal" />
          </a>
          <a href="#event-details" className="text-link">
            Plan your night <Icon name="arrow" />
          </a>
        </div>
      </div>
      <div className="hero-bottom">
        <a className="scroll-cue" href="#about">
          <span className="scroll-line" />
          SCROLL INTO THE NIGHT
        </a>
        <span className="hero-registration">
          <span className="status-dot" />
          {event.registrationLabel}
        </span>
        <span className="hero-edition">
          FIFTH EDITION <b>05</b>
        </span>
      </div>
    </section>
  );
}
