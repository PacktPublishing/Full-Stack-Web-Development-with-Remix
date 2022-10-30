import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isPrimary?: boolean;
};

export function ActionBar({ children }: { children: React.ReactNode }) {
  return <div className="w-full flex flex-col md:flex-row gap-3 px-3 items-center justify-center">{children}</div>;
}

export function Button({ isPrimary = false, className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`w-full md:w-auto ${
        isPrimary
          ? 'bg-primary dark:bg-darkPrimary hover:bg-primaryAccent dark:hover:bg-darkPrimaryAccent'
          : 'bg-secondary dark:bg-darkSecondary hover:bg-secondaryAccent dark:hover:bg-darkSecondaryAccent'
      } text-xl font-bold py-2 px-4 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
