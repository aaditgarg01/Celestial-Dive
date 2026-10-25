import { useEffect, useRef } from 'react';
/** Local pointer highlight; zero idle animation work. No touch or reduced-motion effects. */
export function usePointerLight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0,
      x = 0,
      y = 0;
    let bounds: DOMRect | null = null;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      bounds = null;
      delete element.dataset.pointer;
      ['--px', '--py', '--rx', '--ry', '--dx', '--dy'].forEach((p) =>
        element.style.removeProperty(p),
      );
    };
    const move = (e: PointerEvent) => {
      if (!fine.matches || reduced.matches || document.hidden || e.pointerType !== 'mouse') return;
      bounds ??= element.getBoundingClientRect();
      x = e.clientX;
      y = e.clientY;
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (!bounds?.width || !bounds.height) return;
          const nx = Math.max(0, Math.min(1, (x - bounds.left) / bounds.width));
          const ny = Math.max(0, Math.min(1, (y - bounds.top) / bounds.height));
          element.style.setProperty('--px', `${nx * 100}%`);
          element.style.setProperty('--py', `${ny * 100}%`);
          element.style.setProperty('--rx', `${(ny - 0.5) * -4}deg`);
          element.style.setProperty('--ry', `${(nx - 0.5) * 5}deg`);
          element.style.setProperty('--dx', `${(nx - 0.5) * 8}px`);
          element.style.setProperty('--dy', `${(ny - 0.5) * 6}px`);
          element.dataset.pointer = 'true';
        });
    };
    element.addEventListener('pointermove', move, { passive: true });
    element.addEventListener('pointerleave', reset);
    window.addEventListener('scroll', reset, { passive: true });
    window.addEventListener('resize', reset);
    document.addEventListener('visibilitychange', reset);
    fine.addEventListener('change', reset);
    reduced.addEventListener('change', reset);
    return () => {
      reset();
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset);
      window.removeEventListener('scroll', reset);
      window.removeEventListener('resize', reset);
      document.removeEventListener('visibilitychange', reset);
      fine.removeEventListener('change', reset);
      reduced.removeEventListener('change', reset);
    };
  }, []);
  return ref;
}
