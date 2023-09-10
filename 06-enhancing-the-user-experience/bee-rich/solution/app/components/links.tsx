import type { FormProps, LinkProps as RemixLinkProps } from '@remix-run/react';
import { Link as RemixLink, NavLink as RemixNavLink, useFetcher } from '@remix-run/react';
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

type DeleteProps = {
  ariaLabel: string;
  action: FormProps['action'];
};

type ListLinkItemProps = HTMLAttributes<HTMLLIElement> & {
  children: React.ReactNode;
  to: string;
  isActive?: boolean;
  deleteProps?: DeleteProps;
};

export function ListLinkItem({ isActive, className = '', to, deleteProps, children, ...props }: ListLinkItemProps) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== 'idle';
  return (
    <li
      className={clsx(
        'w-full flex flex-row items-center border',
        isActive
          ? 'bg-secondary dark:bg-darkSecondary border-secondary dark:border-darkSecondary'
          : 'hover:bg-backgroundPrimary dark:hover:bg-darkBackgroundPrimary border-background dark:border-darkBackground hover:border-secondary dark:hover:border-darkSecondary',
        className,
      )}
      {...props}
    >
      <RemixNavLink to={to} className="block w-full p-4">
        {children}
      </RemixNavLink>
      {deleteProps && (
        <fetcher.Form className="p-8 ml-auto" method="POST" action={deleteProps.action}>
          <button
            type="submit"
            aria-label={deleteProps.ariaLabel}
            name="intent"
            value="delete"
            disabled={isSubmitting}
            className={
              isSubmitting
                ? 'animate-spin duration-1000'
                : 'hover:text-primary focus:text-primary dark:hover:text-darkPrimary dark:focus:text-darkPrimary'
            }
          >
            <svg className="w-8 h-8 " viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </fetcher.Form>
      )}
    </li>
  );
}
