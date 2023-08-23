import type { LinkProps as RemixLinkProps } from '@remix-run/react';
import { Link as RemixLink, NavLink as RemixNavLink } from '@remix-run/react';
import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';

type LinkProps = RemixLinkProps;

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <RemixLink
      className={clsx(
        'font-bold underline decoration-4 underline-offset-2 decoration-primary dark:decoration-darkPrimary hover:decoration-primaryAccent hover:dark:decoration-darkPrimaryAccent',
        className,
      )}
      {...props}
    >
      {children}
    </RemixLink>
  );
}

type NavLinkProps = LinkProps & {
  styleAsActive?: boolean;
};

export function NavLink({ className, children, styleAsActive = false, ...props }: NavLinkProps) {
  return (
    <RemixNavLink
      className={({ isActive }) =>
        clsx(
          'font-bold p-2 text-lg lg:text-2xl',
          styleAsActive || isActive
            ? 'bg-primary dark:bg-darkPrimary'
            : 'border border-secondary dark:border-darkSecondary hover:bg-primaryAccent dark:hover:bg-darkPrimaryAccent',
          className,
        )
      }
      {...props}
    >
      {children}
    </RemixNavLink>
  );
}

type ButtonLinkProps = RemixLinkProps & {
  isPrimary?: boolean;
};

export function ButtonLink({ isPrimary, className = '', children, ...props }: ButtonLinkProps) {
  return (
    <RemixLink
      className={clsx(
        'block w-full md:w-min whitespace-nowrap text-center',
        isPrimary
          ? 'bg-primary dark:bg-darkPrimary hover:bg-primaryAccent dark:hover:bg-darkPrimaryAccent'
          : 'bg-secondary dark:bg-darkSecondary hover:bg-secondaryAccent dark:hover:bg-darkSecondaryAccent',
        'text-xl font-bold py-2 px-4 rounded',
        className,
      )}
      {...props}
    >
      {children}
    </RemixLink>
  );
}

export function FloatingActionLink({ className, children, ...props }: ButtonLinkProps) {
  return (
    <ButtonLink
      {...props}
      className={clsx('fixed bottom-0 right-0 md:bottom-5 md:right-5 md:rounded-full', className)}
      isPrimary
    >
      {children}
    </ButtonLink>
  );
}

type ListLinkItemProps = HTMLAttributes<HTMLLIElement> & {
  children: React.ReactNode;
  to: string;
};

export function ListLinkItem({ className = '', to, children, ...props }: ListLinkItemProps) {
  return (
    <li className={`w-full ${className}`} {...props}>
      <RemixNavLink
        to={to}
        className={({ isActive }) =>
          clsx(
            'block w-full p-4 border',
            isActive
              ? 'bg-secondary dark:bg-darkSecondary border-secondary dark:border-darkSecondary'
              : 'hover:bg-backgroundPrimary dark:hover:bg-darkBackgroundPrimary border-background dark:border-darkBackground hover:border-secondary dark:hover:border-darkSecondary',
          )
        }
      >
        {children}
      </RemixNavLink>
    </li>
  );
}
