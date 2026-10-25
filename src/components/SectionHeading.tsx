import type { ReactNode } from 'react';
import { Icon } from './Icon';
export function SectionHeading({
  number,
  label,
  children,
  id,
}: {
  number: string;
  label: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span>
          {number} / {label}
        </span>
        <Icon name="spark" />
      </p>
      <h2 id={id}>{children}</h2>
    </div>
  );
}
