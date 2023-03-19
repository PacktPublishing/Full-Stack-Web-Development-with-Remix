import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { H2 } from '~/components/headings';
import { FloatingActionLink } from '~/components/links';
import { db } from '~/db.server';

export async function loader({ params }: LoaderArgs) {
  const { id } = params;
  const expense = await db.expense.findUnique({ where: { id } });
  if (!expense) throw new Response('Not found', { status: 404 });
  return json(expense);
}

export default function ExpenseDetailsPage() {
  const expense = useLoaderData<typeof loader>();
  return (
    <>
      <section className="w-full h-full p-8">
        <H2>{expense.title}</H2>
        <p>${expense.amount}</p>
      </section>
      <FloatingActionLink to="/dashboard/expenses/">Add expense</FloatingActionLink>
    </>
  );
}
