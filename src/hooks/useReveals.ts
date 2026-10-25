import { useEffect } from 'react';
export function useReveals() {
  useEffect(() => {
    if (
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    )
      return;
    const root = document.documentElement;
    const targets = [...document.querySelectorAll('.reveal')];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.04 },
    );
    targets.forEach((el) => observer.observe(el));
    root.dataset.reveals = 'true';
    const focus = (e: FocusEvent) =>
      (e.target as Element)?.closest('.reveal')?.classList.add('is-revealed');
    document.addEventListener('focusin', focus);
    return () => {
      observer.disconnect();
      delete root.dataset.reveals;
      document.removeEventListener('focusin', focus);
    };
  }, []);
}
