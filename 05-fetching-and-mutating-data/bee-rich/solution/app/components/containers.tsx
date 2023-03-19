import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'w-full bg-backgroundPrimary dark:bg-darkBackgroundPrimary shadow dark:shadow-black overflow-hidden sm:rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <Container
      className={clsx('lg:max-w-xl p-10 m-auto flex flex-col items-center justify-center gap-5', className)}
      {...props}
    >
      {children}
    </Container>
  );
}
