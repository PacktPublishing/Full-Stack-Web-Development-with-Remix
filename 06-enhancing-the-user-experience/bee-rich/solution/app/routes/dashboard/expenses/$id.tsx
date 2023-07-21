import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useActionData, useLoaderData, useNavigation } from '@remix-run/react';
import { Button } from '~/components/buttons';
import { Form, Input, Textarea } from '~/components/forms';
import { FloatingActionLink } from '~/components/links';
import { db } from '~/db.server';

async function deleteExpense(request: Request, id: string): Promise<Response> {
  const referer = request.headers.get('referer');
  const redirectPath = referer || '/dashboard/expenses';

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

async function updateExpense(formData: FormData, id: string): Promise<Response> {
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
  await db.expense.update({
    where: { id },
    data: { title, description, amount: amountNumber },
  });
  return json({ success: true });
}

export async function action({ params, request }: ActionArgs) {
  const { id } = params;
  if (!id) throw Error('id route parameter must be defined');

  const formData = await request.formData();
  const intent = formData.get('intent');
  if (intent === 'delete') {
    return deleteExpense(request, id);
  }
  if (intent === 'update') {
    return updateExpense(formData, id);
  }
  throw new Response('Bad request', { status: 400 });
}

export async function loader({ params }: LoaderArgs) {
  const { id } = params;
  const expense = await db.expense.findUnique({ where: { id } });
  if (!expense) throw new Response('Not found', { status: 404 });
  return json(expense);
}

export default function ExpenseDetailsPage() {
  const expense = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const actionData = useActionData<typeof action>();

  return (
    <>
      <Form method="post" action={`/dashboard/expenses/${expense.id}`} key={expense.id}>
        <Input label="Title:" type="text" name="title" defaultValue={expense.title} required />
        <Textarea label="Description:" name="description" defaultValue={expense.description || ''} />
        <Input label="Amount (in USD):" type="number" defaultValue={expense.amount} name="amount" required />
        <Button type="submit" name="intent" value="update" disabled={isSubmitting} isPrimary>
          {isSubmitting ? 'Save...' : 'Save'}
        </Button>
        <p aria-live="polite" className="text-green-600">
          {actionData?.success && 'Changes saved!'}
        </p>
      </Form>
      <FloatingActionLink to="/dashboard/expenses/">Add expense</FloatingActionLink>
    </>
  );
}
