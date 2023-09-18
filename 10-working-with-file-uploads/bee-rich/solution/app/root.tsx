import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';

import { H1 } from './components/headings';
import { ButtonLink } from './components/links';
import { PageTransitionProgressBar } from './components/progress';
import { getUser } from './modules/session/session.server';
import tailwindCSS from './styles/tailwind.css';

export const meta: MetaFunction = () => {
  return [
    { title: 'BeeRich' },
    {
      name: 'description',
      content:
        'Bee in control of your finances with BeeRich - the buzzworthy expense and income tracker with a modern interface. Keep your finances organized and make honey with your money!',
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindCSS },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap',
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  return { user };
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-background dark:bg-darkBackground text-lg text-text dark:text-darkText">
        <PageTransitionProgressBar />
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function Component() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let heading = 'Unexpected Error';
  let message =
    'We are very sorry. An unexpected error occurred. Please try again or contact us if the problem persists.';
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 401:
        heading = '401 Unauthorized';
        message = 'Oops! Looks like you tried to visit a page that you do not have access to.';
        break;
      case 404:
        heading = '404 Not Found';
        message = 'Oops! Looks like you tried to visit a page that does not exist.';
        break;
    }
  }
  const errorMessage = error instanceof Error ? error.message : null;
  return (
    <Document>
      <section className="m-5 lg:m-20 flex flex-col gap-5">
        <H1>{heading}</H1>
        <p>{message}</p>
        {errorMessage && (
          <div className="border-4 border-red-500 p-10">
            <p>Error message: {errorMessage}</p>
          </div>
        )}
        <ButtonLink to="/" isPrimary>
          Back to homepage
        </ButtonLink>
      </section>
    </Document>
  );
}
