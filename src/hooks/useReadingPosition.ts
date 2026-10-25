import { useEffect, useState } from 'react';
import { navigation } from '../config/site';
/** Passive native scrolling, one read batch per frame, and no added history entries. */
export function useReadingPosition() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0,
      interacted = false;
    const update = () => {
      frame = 0;
      const line = Math.min(220, innerHeight * 0.3);
      let current: string = 'home';
      for (const { id } of navigation)
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= line)
          current = id;
      if (scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 4)
        current = 'contact';
      setActive(current);
      setScrolled(scrollY > 100);
      if (interacted) {
        const hash = current === 'home' ? '' : `#${current}`;
        if (location.hash !== hash)
          history.replaceState(history.state, '', location.pathname + location.search + hash);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const scroll = () => {
      interacted = true;
      schedule();
    };
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    observer?.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return { active, scrolled };
}
