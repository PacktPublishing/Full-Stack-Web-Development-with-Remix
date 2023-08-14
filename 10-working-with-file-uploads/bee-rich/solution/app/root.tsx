import type { LinksFunction, V2_MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from '@remix-run/react';
import { H1 } from './components/headings';
import { ButtonLink } from './components/links';
import { PageTransitionProgressBar } from './components/progress';
import tailwindCSS from './styles/tailwind.css';

export const meta: V2_MetaFunction = () => {
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

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <section className="m-5 lg:m-20 flex flex-col gap-5">
        <H1>Unexpected Error</H1>
        <p>We are very sorry. An unexpected error occurred. Please try again or contact us if the problem persists.</p>
        <div className="border-4 border-red-500 p-10">
          <p>Error message: {error.message}</p>
        </div>
        <ButtonLink to="/" isPrimary>
          Back to homepage
        </ButtonLink>
      </section>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
      break;
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document>
      <section className="m-5 lg:m-20 flex flex-col gap-5">
        <H1>{`${caught.status} ${caught.statusText}`}</H1>
        {message}
        <ButtonLink to="/" isPrimary>
          Back to homepage
        </ButtonLink>
      </section>
    </Document>
  );
}
