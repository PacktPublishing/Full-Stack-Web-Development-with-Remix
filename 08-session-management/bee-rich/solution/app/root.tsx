import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node';
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
  return [{ title: 'BeeRich' }];
};

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: tailwindCSS }];

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  return { user };
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
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

  let message =
    'We are very sorry. An unexpected error occurred. Please try again or contact us if the problem persists.';
  if (isRouteErrorResponse(error)) {
    let message;
    switch (error.status) {
      case 401:
        message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
        break;
      case 404:
        message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
        break;
    }

    return (
      <Document>
        <section className="m-5 lg:m-20 flex flex-col gap-5">
          <H1>{`${error.status} ${error.statusText}`}</H1>
          {message}
          <ButtonLink to="/" isPrimary>
            Back to homepage
          </ButtonLink>
        </section>
      </Document>
    );
  }

  let errorMessage;
  if (error instanceof Error) {
    errorMessage = error.message;
    if (error.stack) {
      errorMessage = `${errorMessage}:\n${error.stack}`;
    }
  }

  return (
    <Document>
      <section className="m-5 lg:m-20 flex flex-col gap-5">
        <H1>Unexpected Error</H1>
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
