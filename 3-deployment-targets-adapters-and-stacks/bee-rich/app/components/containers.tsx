import type { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`w-full lg:max-w-xl m-auto flex flex-col items-center justify-center gap-5 p-10 bg-backgroundPrimary dark:bg-darkBackgroundPrimary shadow dark:shadow-black overflow-hidden sm:rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
