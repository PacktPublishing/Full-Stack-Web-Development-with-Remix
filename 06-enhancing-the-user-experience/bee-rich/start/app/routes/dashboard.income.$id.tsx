import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { H2 } from '~/components/headings';
import { FloatingActionLink } from '~/components/links';
import { db } from '~/modules/db.server';

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  const invoice = await db.invoice.findUnique({ where: { id } });
  if (!invoice) throw new Response('Not found', { status: 404 });
  return json(invoice);
}

export default function Component() {
  const invoice = useLoaderData<typeof loader>();
  return (
    <>
      <section className="w-full h-full p-8">
        <H2>{invoice.title}</H2>
        <p>${invoice.amount}</p>
      </section>
      <FloatingActionLink to="/dashboard/income/">Add invoice</FloatingActionLink>
    </>
  );
}
