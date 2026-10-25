import { site } from '../config/site';
import { Icon, StarMark } from './Icon';
import { SocialIcon } from './SocialIcon';
import { usePointerLight } from '../hooks/usePointerLight';
export function Footer() {
  const ref = usePointerLight<HTMLDivElement>();
  return (
    <footer id="contact" className="site-footer" aria-labelledby="contact-title">
      <div className="footer-top section reveal">
        <div className="footer-invitation">
          <p className="eyebrow">
            <StarMark /> THE UNIVERSE CAN WAIT. SAY HELLO.
          </p>
          <h2 id="contact-title">
            See you
            <br />
            <em>under the stars.</em>
          </h2>
          <a className="footer-email" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
            <Icon name="diagonal" />
          </a>
          <div className="footer-socials">
            {site.socials.map((s) => (
              <a
                href={s.url}
                key={s.label}
                target="_blank"
                rel="noreferrer"
                aria-label={`${s.label} (opens in a new tab)`}
              >
                <SocialIcon name={s.label} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-team">
          <p className="eyebrow">THE STELLAR TECH TEAM</p>
          <ul>
            {site.team.map((member) => (
              <li key={member.name}>
                <span>{member.name}</span>
                <div>
                  {member.profiles.map((p) => (
                    <a
                      key={p.label}
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} on ${p.label} (opens in a new tab)`}
                      title={`${member.name} on ${p.label}`}
                    >
                      <SocialIcon name={p.label} />
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-wordmark pointer-light" ref={ref} aria-hidden="true">
        <span>CELESTIAL DIVE</span>
        <StarMark />
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} VIT Stellar · Celestial Dive 5.0</span>
        <span>Small planet. Endless possibilities.</span>
        <a href="#home">
          Back to the stars <Icon name="arrow" />
        </a>
      </div>
    </footer>
  );
}
