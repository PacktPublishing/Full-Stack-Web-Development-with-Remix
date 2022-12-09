import { clsx } from 'clsx';
import { useTransition, Outlet, useLoaderData } from '@remix-run/react';
import { ListLinkItem } from '~/components/links';
import { H1 } from '~/components/headings';
import { db } from '~/db.server';
import { json } from '@remix-run/node';

export async function loader() {
  const expenses = await db.expense.findMany({});
  return json(expenses);
}

export default function ExpensesPage() {
  const transition = useTransition();
  const expenses = useLoaderData<typeof loader>();
  return (
    <div className="w-full">
      <H1>Your expenses</H1>
      <div className="mt-10 w-full flex flex-col-reverse lg:flex-row">
        <section className="p-8 w-full">
          <h2 className="sr-only">All expenses</h2>
          <ul className="flex flex-col">
            {expenses.map((expense) => (
              <ListLinkItem key={expense.id} to={`/dashboard/expenses/${expense.id}`}>
                <p>
                  <i>{new Date(expense.amount).toLocaleDateString('en-US')}</i>
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
        <section className={clsx('w-full', transition.state === 'loading' && 'motion-safe:animate-pulse')}>
          <Outlet />
        </section>
      </div>
    </div>
  );
}
