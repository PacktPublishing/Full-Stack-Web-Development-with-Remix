import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Button } from '~/components/buttons';
import { Form, Input, Textarea } from '~/components/forms';
import { db } from '~/db.server';

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get('title');
  const description = formData.get('description');
  const amount = formData.get('amount');
  if (typeof title !== 'string' || typeof description !== 'string' || typeof amount !== 'string') {
    throw Error('something went wrong');
  }
  const amountNumber = Number.parseFloat(amount);
  const invoice = await db.invoice.create({
    data: {
      title,
      description,
      amount: amountNumber,
      currencyCode: 'USD',
    },
  });
  return redirect(`/dashboard/income/${invoice.id}`);
}

export default function CreateIncomePage() {
  return (
    <Form method="post" action="/dashboard/income/?index">
      <Input label="Title:" type="text" name="title" placeholder="Salary December 2022" required />
      <Textarea label="Description:" name="description" />
      <Input label="Amount (in USD):" type="number" defaultValue={0} name="amount" required />
      <Button type="submit" isPrimary>
        Create
      </Button>
    </Form>
  );
}
