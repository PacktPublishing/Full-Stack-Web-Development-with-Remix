import { clsx } from 'clsx';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, Outlet, useLoaderData, useLocation, useParams, useTransition } from '@remix-run/react';
import { ListLinkItem } from '~/components/links';
import { H1 } from '~/components/headings';
import { db } from '~/db.server';
import { useRef } from 'react';
import { SearchInput } from '~/components/forms';
import { requireUserId } from '~/session.server';

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const url = new URL(request.url);
  const searchString = url.searchParams.get('q');
  const invoices = await db.invoice.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      userId,
      title: {
        contains: searchString ? searchString : '',
      },
    },
  });
  return json(invoices);
}

export default function IncomePage() {
  const transition = useTransition();
  const invoices = useLoaderData<typeof loader>();
  const { id } = useParams();
  const location = useLocation();
  const ref = useRef<HTMLFormElement>(null);
  return (
    <div className="w-full">
      <H1>Your income</H1>
      <div className="mt-10 w-full flex flex-col-reverse lg:flex-row">
        <section className="lg:p-8 w-full lg:max-w-2xl">
          <h2 className="sr-only">All your income</h2>
          <Form ref={ref} method="get" action={location.pathname}>
            <SearchInput name="q" type="search" label="Search by title" formRef={ref} />
          </Form>
          <ul className="flex flex-col">
            {invoices.map((invoice) => (
              <ListLinkItem
                key={invoice.id}
                to={`/dashboard/income/${invoice.id}`}
                isActive={invoice.id === id}
                deleteProps={{
                  ariaLabel: `Delete invoice ${invoice.title}`,
                  action: `/dashboard/income/${invoice.id}`,
                }}
              >
                <p>
                  <i>{new Date(invoice.createdAt).toLocaleDateString('en-US')}</i>
                </p>
                <p className="text-xl font-semibold">{invoice.title}</p>
                <p>
                  <b>
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currencyCode }).format(
                      invoice.amount,
                    )}
                  </b>
                </p>
              </ListLinkItem>
            ))}
          </ul>
        </section>
        <section className={clsx('lg:p-8 w-full', transition.state === 'loading' && 'motion-safe:animate-pulse')}>
          <Outlet />
        </section>
      </div>
    </div>
  );
}
