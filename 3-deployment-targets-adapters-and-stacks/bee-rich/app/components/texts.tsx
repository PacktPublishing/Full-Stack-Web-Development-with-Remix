import type { HTMLAttributes } from 'react';

type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;

export function Paragraph({ className = '', children, ...props }: ParagraphProps) {
  return (
    <p className={`${className}`} {...props}>
      {children}
    </p>
  );
}
