import { useEffect, useRef, useState } from 'react';
import { navigation } from '../config/site';
import { useReadingPosition } from '../hooks/useReadingPosition';
import { Icon, StarMark } from './Icon';
export function Header() {
  const { active, scrolled } = useReadingPosition();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const close = () => {
    dialog.current?.close();
    setOpen(false);
    button.current?.focus();
  };
  useEffect(() => {
    if (!open) return;
    dialog.current?.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = before;
    };
  }, [open]);
  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <a
          className="club-brand"
          href="https://vitstellar.vercel.app/"
          target="_blank"
          rel="noreferrer"
          aria-label="VIT Stellar website (opens in a new tab)"
        >
          <img src="/assets/vit-stellar.webp" width="38" height="38" alt="" />
          <span>VIT STELLAR</span>
        </a>
        <a className="event-brand" href="#home" aria-label="Celestial Dive home">
          <StarMark />
          <span>
            CELESTIAL DIVE <b>5.0</b>
          </span>
        </a>
        <button
          className="icon-button menu-trigger"
          ref={button}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-menu"
        >
          <Icon name="menu" />
        </button>
      </header>
      <dialog
        id="site-menu"
        ref={dialog}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        aria-label="Main navigation"
        className="menu-dialog"
      >
        <div className="menu-panel">
          <div className="menu-top">
            <span className="eyebrow">A little closer to the cosmos</span>
            <button className="icon-button" onClick={close} aria-label="Close menu">
              <Icon name="close" />
            </button>
          </div>
          <nav>
            {navigation.map((link, i) => (
              <a
                href={`#${link.id}`}
                key={link.id}
                aria-current={active === link.id ? 'location' : undefined}
                onClick={close}
              >
                <span className="menu-index">0{i + 1}</span>
                {link.label}
                <Icon name="diagonal" />
              </a>
            ))}
          </nav>
          <p className="menu-note">Under one sky. A little more connected.</p>
        </div>
      </dialog>
    </>
  );
}
