import type { HTMLAttributes } from 'react';

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export function H1({ className = '', ...props }: HeadingProps) {
  return (
    <h1 className={`text-5xl md:text-7xl font-bold ${className}`} {...props}>
      {props.children}
    </h1>
  );
}

export function H2({ className = '', ...props }: HeadingProps) {
  return (
    <h2 className={`text-4xl md:text-6xl font-bold ${className}`} {...props}>
      {props.children}
    </h2>
  );
}

export function H3({ className = '', ...props }: HeadingProps) {
  return (
    <h3 className={`text-3xl md:text-5xl font-bold ${className}`} {...props}>
      {props.children}
    </h3>
  );
}

export function H4({ className = '', ...props }: HeadingProps) {
  return (
    <h4 className={`text-2xl md:text-4xl font-bold ${className}`} {...props}>
      {props.children}
    </h4>
  );
}
