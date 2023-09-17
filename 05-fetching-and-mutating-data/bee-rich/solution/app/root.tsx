import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import { PageTransitionProgressBar } from './components/progress';
import tailwindCSS from './styles/tailwind.css';

export const meta: MetaFunction = () => {
  return [{ title: 'BeeRich' }];
};

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: tailwindCSS }];

export default function Component() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background dark:bg-darkBackground text-lg text-text dark:text-darkText">
        <PageTransitionProgressBar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
