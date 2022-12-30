import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { H2 } from '~/components/headings';
import { FloatingActionLink } from '~/components/links';
import { db } from '~/db.server';

export async function action({ params, request }: ActionArgs) {
  const { id } = params;
  if (!id) throw Error('id route parameter must be defined');

  const formData = await request.formData();
  const redirectPath = formData.get('redirect');
  if (typeof redirectPath !== 'string') throw Error('redirect must be a string');

  try {
    await db.expense.delete({ where: { id } });
  } catch (err) {
    throw new Response('Not found', { status: 404 });
  }

  if (redirectPath.includes(id)) {
    return redirect('/dashboard/expenses');
  }
  return redirect(redirectPath);
}

export async function loader({ params }: LoaderArgs) {
  const { id } = params;
  const expense = await db.expense.findUnique({ where: { id } });
  if (!expense) throw new Response('Not found', { status: 404 });
  return json(expense);
}

export default function ExpenseDetailsPage() {
  const expense = useLoaderData();
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
