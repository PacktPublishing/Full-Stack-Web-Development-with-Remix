import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useTransition } from '@remix-run/react';
import { Button } from '~/components/buttons';
import { Form, Input, Textarea } from '~/components/forms';
import { db } from '~/db.server';
import { requireUserId } from '~/session.server';

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const title = formData.get('title');
  const description = formData.get('description');
  const amount = formData.get('amount');
  if (typeof title !== 'string' || typeof description !== 'string' || typeof amount !== 'string') {
    throw Error('something went wrong');
  }
  const amountNumber = Number.parseFloat(amount);
  const expense = await db.expense.create({
    data: {
      title,
      description,
      amount: amountNumber,
      currencyCode: 'USD',
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return redirect(`/dashboard/expenses/${expense.id}`);
}

export default function CreateExpensePage() {
  const transition = useTransition();
  const isSubmitting = transition.state === 'submitting';
  return (
    <Form method="post" action="/dashboard/expenses/?index">
      <Input label="Title:" type="text" name="title" placeholder="Dinner for Two" required />
      <Textarea label="Description:" name="description" />
      <Input label="Amount (in USD):" type="number" defaultValue={0} name="amount" required />
      <Button type="submit" disabled={isSubmitting} isPrimary>
        {isSubmitting ? 'Creating...' : 'Create'}
      </Button>
    </Form>
  );
}
