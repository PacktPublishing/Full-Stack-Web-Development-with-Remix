import type { HeadersFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { NavLink } from '~/components/links';
import { useUser } from '~/modules/session/session';

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'public, max-age=3600',
  };
};

export default function Component() {
  const user = useUser();
  return (
    <>
      <header className="mb-4 lg:mb-10">
        <nav className="p-4">
          <ul className="w-full flex flex-row gap-5 text-lg lg:text-2xl font-bold">
            <li>
              <NavLink to="/" prefetch="intent">
                Home
              </NavLink>
            </li>
            {user ? (
              <li className="ml-auto">
                <NavLink to="/dashboard" prefetch="intent">
                  Dashboard
                </NavLink>
              </li>
            ) : (
              <>
                <li className="ml-auto">
                  <NavLink to="/login" prefetch="intent">
                    Log in
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" prefetch="intent">
                    Sign up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className="p-4 w-full flex justify-center items-center">
        <Outlet />
      </main>
    </>
  );
}
