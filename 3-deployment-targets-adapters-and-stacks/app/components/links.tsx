import type { LinkProps as RemixLinkProps } from '@remix-run/react';
import { Link as RemixLink } from '@remix-run/react';

type LinkProps = RemixLinkProps;

export function Link({ className = '', children, ...props }: LinkProps) {
  return (
    <RemixLink
      className={`font-bold underline decoration-4 underline-offset-2 decoration-primary dark:decoration-darkPrimary hover:decoration-primaryAccent hover:dark:decoration-darkPrimaryAccent ${className}`}
      {...props}
    >
      {children}
    </RemixLink>
  );
}

type ButtonLinkProps = RemixLinkProps & {
  isPrimary?: boolean;
};

export function ButtonLink({ isPrimary, className = '', children, ...props }: ButtonLinkProps) {
  return (
    <RemixLink
      className={`w-full md:w-auto ${
        isPrimary
          ? 'bg-primary dark:bg-darkPrimary hover:bg-primaryAccent dark:hover:bg-darkPrimaryAccent'
          : 'bg-secondary dark:bg-darkSecondary hover:bg-secondaryAccent dark:hover:bg-darkSecondaryAccent'
      } text-xl font-bold py-2 px-4 rounded ${className}`}
      {...props}
    >
      {children}
    </RemixLink>
  );
}
