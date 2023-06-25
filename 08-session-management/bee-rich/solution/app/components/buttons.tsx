import { clsx } from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isPrimary?: boolean;
};

export function ActionBar({ children }: { children: React.ReactNode }) {
  return <div className="w-full flex flex-col md:flex-row gap-3 px-3 items-center justify-center">{children}</div>;
}

export function Button({ isPrimary = false, className, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'w-full md:w-min whitespace-nowrap',
        isPrimary ? 'bg-primary dark:bg-darkPrimary' : 'bg-secondary dark:bg-darkSecondary',
        disabled && 'opacity-50',
        isPrimary && !disabled && 'hover:bg-primaryAccent dark:hover:bg-darkPrimaryAccent',
        'text-xl font-bold py-2 px-4 rounded',
        !isPrimary && !disabled && 'hover:bg-secondaryAccent dark:hover:bg-darkSecondaryAccent',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
