import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect, unstable_parseMultipartFormData } from '@remix-run/node';
import { useNavigation } from '@remix-run/react';

import { Button } from '~/components/buttons';
import { Form, Input, Textarea } from '~/components/forms';
import { uploadHandler } from '~/modules/attachments.server';
import { createExpense, parseExpense } from '~/modules/expenses.server';
import { requireUserId } from '~/modules/session/session.server';

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const expenseData = parseExpense(formData);
  const expense = await createExpense({ userId, ...expenseData });
  return redirect(`/dashboard/expenses/${expense.id}`);
}

export default function Component() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle' && navigation.formAction === '/dashboard/expenses/?index';
  return (
    <Form method="POST" action="/dashboard/expenses/?index" encType="multipart/form-data">
      <Input label="Title:" type="text" name="title" placeholder="Dinner for Two" required />
      <Textarea label="Description:" name="description" />
      <Input label="Amount (in USD):" type="number" defaultValue={0} name="amount" required />
      <Input label="Attachment" type="file" name="attachment" />
      <Button type="submit" disabled={isSubmitting} isPrimary>
        {isSubmitting ? 'Creating...' : 'Create'}
      </Button>
    </Form>
  );
}
