import { json } from '@remix-run/node';
import { Link as RemixLink, Outlet, useLoaderData, useLocation } from '@remix-run/react';

import { Container } from '~/components/containers';
import { NavLink } from '~/components/links';
import { db } from '~/modules/db.server';

export async function loader() {
  const expenseQuery = db.expense.findFirst({
    orderBy: { createdAt: 'desc' },
  });
  const invoiceQuery = db.invoice.findFirst({
    orderBy: { createdAt: 'desc' },
  });

  const [firstExpense, firstInvoice] = await Promise.all([expenseQuery, invoiceQuery]);
  return json({ firstExpense, firstInvoice });
}

export default function Component() {
  const { firstExpense, firstInvoice } = useLoaderData<typeof loader>();
  const location = useLocation();
  return (
    <>
      <header>
        <Container className="p-4 mb-10">
          <nav>
            <ul className="w-full flex flex-row gap-5 font-bold text-lg lg:text-2xl">
              <li>
                <RemixLink to="/">BeeRich</RemixLink>
              </li>
              <li className="ml-auto">
                <RemixLink to="/404">Log out</RemixLink>
              </li>
            </ul>
            <ul className="mt-10 w-full flex flex-row gap-5">
              <li className="ml-auto">
                <NavLink
                  to={firstInvoice ? `/dashboard/income/${firstInvoice.id}` : '/dashboard/income'}
                  styleAsActive={location.pathname.startsWith('/dashboard/income')}
                  prefetch="intent"
                >
                  Income
                </NavLink>
              </li>
              <li className="mr-auto">
                <NavLink
                  to={firstExpense ? `/dashboard/expenses/${firstExpense.id}` : '/dashboard/expenses'}
                  styleAsActive={location.pathname.startsWith('/dashboard/expenses')}
                  prefetch="intent"
                >
                  Expenses
                </NavLink>
              </li>
            </ul>
          </nav>
        </Container>
      </header>
      <main className="p-4 w-full flex justify-center items-center">
        <Outlet />
      </main>
    </>
  );
}
