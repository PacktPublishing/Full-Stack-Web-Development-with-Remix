import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Container } from '~/components/containers';
import { H2 } from '~/components/headings';

const data = [
  {
    id: 1,
    title: 'Salary October',
    amount: 2500,
    currencyCode: 'USD',
  },
  {
    id: 2,
    title: 'Salary September',
    amount: 2500,
    currencyCode: 'USD',
  },
  {
    id: 3,
    title: 'Salary August',
    amount: 2500,
    currencyCode: 'USD',
  },
];

export function loader({ params }: LoaderArgs) {
  const { id } = params;
  const income = data.find((i) => i.id === Number(id));
  if (!income) throw new Response('Not found', { status: 404 });
  return json(income);
}

export default function IncomeDetailsPage() {
  const income = useLoaderData();
  return (
    <Container className="h-full p-8">
      <H2>{income.title}</H2>
      <p>${income.amount}</p>
    </Container>
  );
}
