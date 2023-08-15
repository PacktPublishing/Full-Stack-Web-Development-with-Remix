import { clsx } from 'clsx';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useNavigation, Outlet, useLoaderData, useParams, Form, useLocation, useSearchParams } from '@remix-run/react';
import { ListLinkItem } from '~/components/links';
import { H1 } from '~/components/headings';
import { db } from '~/db.server';
import { SearchInput } from '~/components/forms';
import { useRef } from 'react';
import { requireUserId } from '~/session.server';

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const url = new URL(request.url);
  const searchString = url.searchParams.get('q');
  const expenses = await db.expense.findMany({
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
  return json(expenses);
}

export default function ExpensesPage() {
  const navigation = useNavigation();
  const expenses = useLoaderData<typeof loader>();
  const { id } = useParams();
  const location = useLocation();
  const ref = useRef<HTMLFormElement>(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  return (
    <div className="w-full">
      <H1>Your expenses</H1>
      <div className="mt-10 w-full flex flex-col-reverse lg:flex-row">
        <section className="lg:p-8 w-full lg:max-w-2xl">
          <h2 className="sr-only">All expenses</h2>
          <Form ref={ref} method="GET" action={location.pathname}>
            <SearchInput name="q" type="search" label="Search by title" formRef={ref} defaultValue={searchQuery} />
          </Form>
          <ul className="flex flex-col">
            {expenses.map((expense) => (
              <ListLinkItem
                key={expense.id}
                to={`/dashboard/expenses/${expense.id}`}
                isActive={expense.id === id}
                deleteProps={{
                  ariaLabel: `Delete expense ${expense.title}`,
                  action: `/dashboard/expenses/${expense.id}`,
                }}
              >
                <p>
                  <i>{new Date(expense.createdAt).toLocaleDateString('en-US')}</i>
                </p>
                <p className="text-xl font-semibold">{expense.title}</p>
                <p>
                  <b>
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: expense.currencyCode }).format(
                      expense.amount,
                    )}
                  </b>
                </p>
              </ListLinkItem>
            ))}
          </ul>
        </section>
        <section className={clsx('lg:p-8 w-full', navigation.state === 'loading' && 'motion-safe:animate-pulse')}>
          <Outlet />
        </section>
      </div>
    </div>
  );
}
