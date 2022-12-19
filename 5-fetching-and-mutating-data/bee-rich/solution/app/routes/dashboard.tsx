import { json } from '@remix-run/node';
import { Outlet, Link as RemixLink, useLoaderData } from '@remix-run/react';
import { Container } from '~/components/containers';
import { NavLink } from '~/components/links';
import { db } from '~/db.server';

export async function loader() {
  const firstExpense = await db.expense.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });
  const firstInvoice = await db.invoice.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return json({ firstExpense, firstInvoice });
}

export default function Layout() {
  const { firstExpense, firstInvoice } = useLoaderData<typeof loader>();
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
                <NavLink to={firstInvoice ? `/dashboard/income/${firstInvoice.id}` : '/dashboard/income'}>
                  Income
                </NavLink>
              </li>
              <li className="mr-auto">
                <NavLink to={firstExpense ? `/dashboard/expenses/${firstExpense.id}` : '/dashboard/expenses'}>
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
