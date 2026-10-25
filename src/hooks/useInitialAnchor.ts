import { useEffect } from 'react';
/** The browser resolves an initial fragment before React mounts; restore it once sections exist. */
export function useInitialAnchor() {
  useEffect(() => {
    const hash = location.hash;
    if (!hash || hash === '#') return;
    const frame = requestAnimationFrame(() => {
      if (location.hash !== hash) return;
      let id: string;
      try {
        id = decodeURIComponent(hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      target?.closest('.reveal')?.classList.add('is-revealed');
      target?.scrollIntoView({ behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
}
