import type { SVGProps } from 'react';

type SocialName = 'GitHub' | 'LinkedIn' | 'Instagram';
export function SocialIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: SocialName }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {name === 'LinkedIn' ? (
        <>
          <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" />
          <path
            d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4"
            fill="none"
            stroke="var(--social-cutout, #07172e)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      ) : name === 'Instagram' ? (
        <g fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
        </g>
      ) : (
        <path
          fill="currentColor"
          d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.5v-2.1c-3.4.7-4.1-1.4-4.1-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.8-.3-5.6-1.4-5.6-6.2 0-1.4.5-2.5 1.3-3.3-.1-.3-.6-1.6.1-3.3 0 0 1.1-.4 3.5 1.3a12 12 0 0 1 6.3 0c2.4-1.7 3.5-1.3 3.5-1.3.7 1.7.2 3 .1 3.3.8.8 1.3 1.9 1.3 3.3 0 4.8-2.9 5.9-5.6 6.2.4.3.8 1 .8 2v3c0 .3.2.6.8.5A11.1 11.1 0 0 0 12 .9Z"
        />
      )}
    </svg>
  );
}
