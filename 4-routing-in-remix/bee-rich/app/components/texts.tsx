import type { HTMLAttributes } from 'react';

type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;

export function Paragraph({ className = '', children, ...props }: ParagraphProps) {
  return (
    <p className={`${className}`} {...props}>
      {children}
    </p>
  );
}

export function InlineError({ className = '', children, ...props }: ParagraphProps) {
  return (
    <p className={`text-red-600 font-bold ${className}`} {...props}>
      {children}
    </p>
  );
}
