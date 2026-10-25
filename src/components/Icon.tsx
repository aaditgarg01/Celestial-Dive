import type { SVGProps } from 'react';
type Name =
  | 'arrow'
  | 'diagonal'
  | 'menu'
  | 'close'
  | 'spark'
  | 'mail'
  | 'pin'
  | 'moon'
  | 'clock'
  | 'plus'
  | 'telescope'
  | 'star';
const paths: Record<Name, string> = {
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  diagonal: 'M6 18 18 6M6 6h12v12',
  menu: 'M4 8h16M4 16h16',
  close: 'm6 6 12 12M6 18 18 6',
  spark: 'm12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4Z',
  mail: 'M3 5h18v14H3zM3 5l9 8 9-8',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  moon: 'M20.8 13a9 9 0 0 1-9.8-9.8A9 9 0 1 0 20.8 13Z',
  clock: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  plus: 'M5 12h14M12 5v14',
  telescope: 'm5 10 12-6 3 6-12 6-3-6ZM5 10l-3 1 2 4 3-1M12 15l-4 7M12 15l5 7M12 15v7',
  star: 'm12 2 3 7 7 .5-5.3 4.8 1.6 7.7L12 18l-6.3 4 1.6-7.7L2 9.5 9 9l3-7Z',
};
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: Name }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
export function StarMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 2 23.5 16.5 38 20l-14.5 3.5L20 38l-3.5-14.5L2 20l14.5-3.5L20 2Z"
        fill="currentColor"
      />
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeOpacity=".4" />
    </svg>
  );
}
