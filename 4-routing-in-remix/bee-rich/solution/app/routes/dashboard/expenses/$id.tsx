import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { H2 } from '~/components/headings';

const data = [
  {
    id: 1,
    title: 'Food',
    amount: 100,
  },
  {
    id: 2,
    title: 'Transport',
    amount: 100,
  },
  {
    id: 3,
    title: 'Entertainment',
    amount: 100,
  },
];

export function loader({ params }: LoaderArgs) {
  const { id } = params;
  const expense = data.find((expense) => expense.id === Number(id));
  if (!expense) throw new Response('Not found', { status: 404 });
  return json(expense);
}

export default function ExpenseDetailsPage() {
  const expense = useLoaderData();
  return (
    <section className="w-full h-full p-8">
      <H2>{expense.title}</H2>
      <p>${expense.amount}</p>
    </section>
  );
}
