import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useNavigation } from '@remix-run/react';

import { Button } from '~/components/buttons';
import { Form, Input, Textarea } from '~/components/forms';
import { db } from '~/modules/db.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get('title');
  const description = formData.get('description');
  const amount = formData.get('amount');
  if (typeof title !== 'string' || typeof description !== 'string' || typeof amount !== 'string') {
    throw Error('something went wrong');
  }
  const amountNumber = Number.parseFloat(amount);
  if (Number.isNaN(amountNumber)) {
    throw Error('something went wrong');
  }
  const expense = await db.expense.create({
    data: {
      title,
      description,
      amount: amountNumber,
      currencyCode: 'USD',
    },
  });
  return redirect(`/dashboard/expenses/${expense.id}`);
}

export default function Component() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle' && navigation.formAction === '/dashboard/expenses/?index';
  return (
    <Form method="POST" action="/dashboard/expenses/?index">
      <Input label="Title:" type="text" name="title" placeholder="Dinner for Two" required />
      <Textarea label="Description:" name="description" />
      <Input label="Amount (in USD):" type="number" defaultValue={0} name="amount" required />
      <Button type="submit" disabled={isSubmitting} isPrimary>
        {isSubmitting ? 'Creating...' : 'Create'}
      </Button>
    </Form>
  );
}
